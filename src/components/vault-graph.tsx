'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { eventsForDivision } from '@/lib/events';
import { eventPagePath } from '@/lib/seo';
import { useSettings } from './providers';

// A live knowledge graph: category hubs, event notes, and small concept notes around each event.
type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: 'hub' | 'event' | 'dust';
  label?: string;
  href?: string;
  parent: number;
  // Concept notes orbit their event.
  angle?: number;
  orbit?: number;
};

function buildGraph(width: number, height: number) {
  const events = eventsForDivision('C');
  const categories = [...new Set(events.map((e) => e.category))];
  const nodes: Node[] = [];
  const links: [number, number][] = [];
  const cx = width < 720 ? width * 0.5 : width * 0.66;
  const cy = width < 720 ? height * 0.3 : height * 0.47;
  const spread = Math.min(width, height) * 0.36;
  // Seeded so the server-free first frame is the same on every visit.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  categories.forEach((category, i) => {
    const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
    nodes.push({
      x: cx + Math.cos(angle) * spread * 0.55,
      y: cy + Math.sin(angle) * spread * 0.55,
      vx: 0,
      vy: 0,
      r: 5,
      kind: 'hub',
      label: category,
      parent: -1,
    });
  });
  for (let i = 1; i < categories.length; i++) links.push([i - 1, i]);
  links.push([categories.length - 1, 0]);
  events.forEach((event) => {
    const hub = categories.indexOf(event.category);
    const index = nodes.length;
    nodes.push({
      x: nodes[hub].x + (rand() - 0.5) * spread * 0.8,
      y: nodes[hub].y + (rand() - 0.5) * spread * 0.8,
      vx: 0,
      vy: 0,
      r: 3,
      kind: 'event',
      label: event.name,
      href: eventPagePath('C', event.id),
      parent: hub,
    });
    links.push([hub, index]);
    const dust = 5 + Math.floor(rand() * 8);
    for (let d = 0; d < dust; d++) {
      nodes.push({
        x: nodes[index].x + (rand() - 0.5) * 40,
        y: nodes[index].y + (rand() - 0.5) * 40,
        vx: 0,
        vy: 0,
        r: 1 + rand() * 1,
        kind: 'dust',
        parent: index,
        angle: rand() * Math.PI * 2,
        orbit: 10 + rand() * 26,
      });
      links.push([index, nodes.length - 1]);
    }
  });
  // A few cross links make it read as a web of ideas rather than a tree.
  const eventIndexes = nodes.flatMap((n, i) => (n.kind === 'event' ? [i] : []));
  for (let i = 0; i < 8; i++) {
    const a = eventIndexes[Math.floor(rand() * eventIndexes.length)];
    const b = eventIndexes[Math.floor(rand() * eventIndexes.length)];
    if (a !== b) links.push([a, b]);
  }
  const stars = Array.from({ length: 160 }, () => ({
    x: rand() * width,
    y: rand() * height,
    z: 0.2 + rand() * 0.8,
  }));
  return { nodes, links, cx, cy, stars };
}

export function VaultGraph() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const { motion } = useSettings();

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let still = !motion || reducedMotion.matches;
    let width = 0;
    let height = 0;
    let graph = buildGraph(1, 1);
    let neighbours: Set<number>[] = [];
    let hover = -1;
    let pointer = { x: -9999, y: -9999 };
    let frame = 0;
    let tick = 0;
    let previousTime = 0;
    let anchors: { x: number; y: number }[] = [];
    const offset = { x: 0, y: 0 };
    let inView = false;
    let colors = { ink: '#fff', accent: '#8b9cff', faint: '#888' };

    const readColors = () => {
      const style = getComputedStyle(el);
      colors = {
        ink: style.getPropertyValue('--vx-ink').trim() || '#f5f5f5',
        accent: style.getPropertyValue('--vx-accent').trim() || '#8b9cff',
        faint: style.getPropertyValue('--vx-graph').trim() || '#ffffff40',
      };
    };

    const resize = () => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // ResizeObserver also fires on attachment. Do not rebuild an unchanged layout.
      if (width === rect.width && height === rect.height) return;
      width = rect.width;
      height = rect.height;
      el.width = width * dpr;
      el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      graph = buildGraph(width, height);
      neighbours = graph.nodes.map(() => new Set<number>());
      graph.links.forEach(([a, b]) => {
        neighbours[a].add(b);
        neighbours[b].add(a);
      });
      // Settle the layout before the first paint.
      for (let i = 0; i < 260; i++) step(1);
      if (width < 720) {
        // Keep the complete web and its category labels inside the mobile artwork.
        const xs = graph.nodes.map((node) => node.x);
        const ys = graph.nodes.map((node) => node.y);
        const left = Math.min(...xs);
        const top = Math.min(...ys);
        const spanX = Math.max(...xs) - left;
        const spanY = Math.max(...ys) - top;
        const scale = Math.max(0.1, Math.min(1, (width - 120) / spanX, (height - 70) / spanY));
        for (const node of graph.nodes) {
          node.x = width / 2 + (node.x - left - spanX / 2) * scale;
          node.y = height / 2 + (node.y - top - spanY / 2) * scale;
          if (node.orbit) node.orbit *= scale;
        }
      }
      anchors = graph.nodes.map(({ x, y }) => ({ x, y }));
      animate(0);
      readColors();
      draw();
    };

    const step = (heat: number) => {
      const { nodes, links, cx, cy } = graph;
      const mobile = width < 720;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.kind === 'dust') continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.kind === 'dust') continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = Math.max(dx * dx + dy * dy, 400);
          if (d2 > 40000) continue;
          const f = (mobile ? 110 : 220) / d2;
          a.vx += dx * f;
          a.vy += dy * f;
          b.vx -= dx * f;
          b.vy -= dy * f;
        }
      }
      for (const [ia, ib] of links) {
        const a = nodes[ia];
        const b = nodes[ib];
        if (b.kind === 'dust') continue;
        const rest = a.kind === 'hub' && b.kind === 'hub' ? 190 : 84;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = ((d - (mobile ? rest * 0.55 : rest)) / d) * 0.04;
        a.vx += dx * f;
        a.vy += dy * f;
        b.vx -= dx * f;
        b.vy -= dy * f;
      }
      for (const n of nodes) {
        if (n.kind === 'dust') {
          const p = nodes[n.parent];
          n.angle! += 0.004 + 0.06 / n.orbit!;
          n.x = p.x + Math.cos(n.angle!) * n.orbit!;
          n.y = p.y + Math.sin(n.angle!) * n.orbit! * 0.8;
          continue;
        }
        n.vx += (cx - n.x) * 0.0016;
        n.vy += (cy - n.y) * 0.002;
        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x += n.vx * heat;
        n.y += n.vy * heat;
      }
    };

    // Physics is only used to arrange the initial graph. Bounded, time-based drift
    // keeps close nodes from repeatedly repelling and snapping back on every frame.
    const animate = (dt: number) => {
      const ease = 1 - Math.exp(-dt * 4);
      const targetX = !still && pointer.x > -999 ? (pointer.x / width - 0.5) * 8 : 0;
      const targetY = !still && pointer.y > -999 ? (pointer.y / height - 0.5) * 8 : 0;
      offset.x += (targetX - offset.x) * ease;
      offset.y += (targetY - offset.y) * ease;
      graph.nodes.forEach((n, i) => {
        if (n.kind === 'dust') {
          const parent = graph.nodes[n.parent];
          const angle = n.angle! + tick * 0.0006;
          n.x = parent.x + Math.cos(angle) * n.orbit!;
          n.y = parent.y + Math.sin(angle) * n.orbit! * 0.8;
        } else {
          n.x = anchors[i].x + Math.sin(tick / 240 + i) * 3 + offset.x;
          n.y = anchors[i].y + Math.cos(tick / 300 + i) * 3 + offset.y;
        }
      });
    };

    const draw = () => {
      const { nodes, links } = graph;
      ctx.clearRect(0, 0, width, height);
      // Depth: faint particles drift at different speeds and lean away from the pointer.
      ctx.fillStyle = colors.ink;
      const ox = offset.x;
      const oy = offset.y;
      for (const s of graph.stars) {
        const x = (((s.x - ox * s.z + tick * 0.08 * s.z) % width) + width) % width;
        const y = s.y - oy * s.z;
        ctx.globalAlpha = 0.08 + s.z * 0.22;
        ctx.fillRect(x, y, s.z * 1.6, s.z * 1.6);
      }
      const focus = hover >= 0 ? neighbours[hover] : null;
      ctx.lineWidth = 1;
      for (const [a, b] of links) {
        const lit = focus && (a === hover || b === hover);
        ctx.strokeStyle = lit ? colors.accent : colors.faint;
        ctx.globalAlpha = focus ? (lit ? 0.9 : 0.12) : nodes[b].kind === 'dust' ? 0.35 : 0.55;
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      }
      ctx.font = '500 11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      nodes.forEach((n, i) => {
        const lit = i === hover || (focus?.has(i) ?? false);
        ctx.globalAlpha = focus ? (lit ? 1 : 0.18) : n.kind === 'dust' ? 0.7 : 1;
        const pulse = n.kind === 'hub' ? Math.sin(tick / 40 + i) * 0.8 : 0;
        if (n.kind === 'hub' || i === hover) {
          ctx.fillStyle = colors.accent;
          ctx.globalAlpha *= 0.14;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3.4 + pulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = focus ? (lit ? 1 : 0.18) : 1;
        }
        ctx.fillStyle = i === hover || n.kind === 'hub' ? colors.accent : colors.ink;
        ctx.beginPath();
        ctx.arc(n.x, n.y, i === hover ? n.r + 2 : n.r, 0, Math.PI * 2);
        ctx.fill();
        // Category captions become crowded in the compact mobile artwork.
        if ((n.kind === 'hub' && width >= 720) || (n.kind === 'event' && lit && n.label)) {
          ctx.fillStyle = n.kind === 'hub' ? colors.ink : colors.ink;
          ctx.globalAlpha = focus && !lit ? 0.18 : n.kind === 'hub' ? 0.8 : 1;
          ctx.fillText(n.label!.toUpperCase(), n.x, n.y - n.r - 12);
        }
      });
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      tick += dt * 60;
      animate(dt);
      draw();
      frame = requestAnimationFrame(loop);
    };

    const updatePlayback = () => {
      cancelAnimationFrame(frame);
      previousTime = 0;
      still = !motion || reducedMotion.matches;
      if (inView && !document.hidden && !still) frame = requestAnimationFrame(loop);
    };

    const nearest = (x: number, y: number) => {
      let best = -1;
      let bestD = 400;
      graph.nodes.forEach((n, i) => {
        if (n.kind === 'dust') return;
        const d = (n.x - x) ** 2 + (n.y - y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      hover = nearest(pointer.x, pointer.y);
      el.style.cursor = hover >= 0 && graph.nodes[hover].href ? 'pointer' : '';
      if (label.current) {
        const n = graph.nodes[hover];
        label.current.hidden = !(n && n.href);
        if (n?.href) {
          label.current.href = n.href;
          label.current.textContent = `Open ${n.label} →`;
        }
      }
      if (still) draw();
    };
    const onLeave = () => {
      pointer = { x: -9999, y: -9999 };
      hover = -1;
      if (label.current) label.current.hidden = true;
      if (still) draw();
    };
    const onClick = () => {
      const href = graph.nodes[hover]?.href;
      if (href) router.push(href);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] });
    // Pause off-screen to save battery.
    const visible = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    visible.observe(el);
    reducedMotion.addEventListener('change', updatePlayback);
    document.addEventListener('visibilitychange', updatePlayback);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      visible.disconnect();
      reducedMotion.removeEventListener('change', updatePlayback);
      document.removeEventListener('visibilitychange', updatePlayback);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('click', onClick);
    };
  }, [motion, router]);

  return (
    <div className="vx-graph">
      <canvas
        ref={canvas}
        role="img"
        aria-label="A knowledge graph of every Division C event, grouped by subject."
      />
      {/* Keyboard and screen reader users reach events through the explorer below. */}
      <a ref={label} className="vx-graph-label" hidden tabIndex={-1} aria-hidden="true" />
    </div>
  );
}
