'use client';
import { useEffect, useRef, useState } from 'react';
import { AkoCharacter } from './ako-character';
import { useSettings } from './providers';
import {
  AKO_ACTIONS,
  AKO_SIZE,
  boundAko,
  stepAko,
  type AkoAction,
  type Point,
} from '@/lib/ako-motion';

const encouragement = [
  'One small step still counts. You’ve got this.',
  'A tricky question is a chance to discover something.',
  'Take a breath. Try the next tiny step.',
  'Progress takes practice. I’m cheering for you!',
  'Stay curious. Your next discovery is waiting.',
  'How about a sip of water and a stretch? Even lab rats take breaks.',
];
type Scene = {
  position: Point;
  target: Point | null;
  cheese: Point | null;
  action: AkoAction;
  until: number;
  facing: number;
  message: string;
  messageUntil: number;
  nextTalk: number;
  nextWalk: number;
};
export function AkoCompanion() {
  const { motion, ako, updateAko } = useSettings();
  const [reduced, setReduced] = useState(false);
  const muted = ako.muted;
  const preferences = useRef(ako);
  preferences.current = ako;
  const drag = useRef<{ x: number; y: number; origin: Point; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [menu, setMenu] = useState(false);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<Scene | null>(null);
  const scene = useRef<Scene | null>(null);
  const mutedRef = useRef(false);
  const held = useRef(false);
  const menuRef = useRef(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const canMove = motion && !reduced;
  const canMoveRef = useRef(canMove);
  canMoveRef.current = canMove;
  menuRef.current = menu;
  const publish = () => {
    const next = scene.current;
    if (next)
      setView((previous) =>
        previous &&
        previous.position === next.position &&
        previous.action === next.action &&
        previous.facing === next.facing &&
        previous.message === next.message &&
        previous.cheese === next.cheese
          ? previous
          : { ...next },
      );
  };
  const say = (message: string) => {
    if (!scene.current || mutedRef.current) return;
    scene.current.message = message;
    scene.current.messageUntil = performance.now() + 6500;
  };
  const toggleTalking = () => {
    const value = !mutedRef.current;
    mutedRef.current = value;
    updateAko({ muted: value });
    try {
      localStorage.setItem('ako-talking-muted', String(value));
    } catch {}
    if (scene.current) {
      scene.current.message = '';
      scene.current.nextTalk = performance.now() + 60000;
    }
    if (!value) say('I’m cheering for you again!');
    publish();
  };
  const react = (action: AkoAction, duration = 4500) => {
    const s = scene.current;
    if (!s) return;
    s.target = null;
    s.cheese = null;
    s.action = action;
    s.until = performance.now() + duration;
    s.nextWalk = s.until + 4000;
    publish();
  };
  const feed = (point?: Point) => {
    const s = scene.current;
    if (!s || !preferences.current.visible) return;
    if (preferences.current.anchored) {
      s.cheese = { ...s.position };
      s.target = null;
      s.action = 'eat';
      s.until = performance.now() + 1700;
      setMenu(false);
      publish();
      return;
    }
    const target = boundAko(
      point ?? { x: s.position.x + (s.position.x > innerWidth / 2 ? -180 : 180), y: s.position.y },
      innerWidth,
      innerHeight,
    );
    s.cheese = target;
    s.target = target;
    s.action = 'run';
    s.until = 0;
    say('Cheese! This little snack gives me a big boost.');
    setMenu(false);
    publish();
  };
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    try {
      const value = localStorage.getItem('ako-talking-muted') === 'true';
      mutedRef.current = value;
    } catch {}
    const now = performance.now();
    scene.current = {
      position: boundAko({ x: innerWidth - 140, y: innerHeight - 130 }, innerWidth, innerHeight),
      target: null,
      cheese: null,
      action: 'wave',
      until: now + 2800,
      facing: -1,
      message: mutedRef.current ? '' : 'Hi, I’m Ako! Click me for a little study break.',
      messageUntil: now + 8000,
      nextTalk: now + 60000,
      nextWalk: now + 10000,
    };
    try {
      const saved = JSON.parse(localStorage.getItem('ako-position') || 'null');
      if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y))
        scene.current.position = boundAko(saved, innerWidth, innerHeight);
    } catch {}
    setReady(true);
    publish();
    const triple = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.detail !== 3 ||
        (event.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')
      )
        return;
      clearTimeout(clickTimer.current);
      feed({ x: event.clientX - AKO_SIZE / 2, y: event.clientY - AKO_SIZE + 16 });
    };
    const mood = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail && AKO_ACTIONS.includes(detail.action))
        react(
          detail.action,
          Number.isFinite(detail.duration)
            ? Math.max(500, Math.min(120000, detail.duration))
            : 5000,
        );
    };
    const resize = () => {
      const s = scene.current!;
      s.position = boundAko(s.position, innerWidth, innerHeight);
      if (s.target) s.target = boundAko(s.target, innerWidth, innerHeight);
      if (s.cheese) s.cheese = boundAko(s.cheese, innerWidth, innerHeight);
      publish();
    };
    document.addEventListener('click', triple);
    window.addEventListener('ako:mood', mood);
    window.addEventListener('resize', resize);
    let frame = 0,
      previous = performance.now(),
      lastPaint = 0,
      talkIndex = 0,
      roamIndex = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      const s = scene.current!;
      if (!document.hidden && preferences.current.visible && !drag.current?.moved) {
        if (s.message && now > s.messageUntil) s.message = '';
        if (!menuRef.current && (!held.current || s.cheese)) {
          if (s.target) {
            s.facing = s.target.x < s.position.x ? -1 : 1;
            s.position = canMoveRef.current
              ? stepAko(s.position, s.target, dt, s.action === 'run' ? 230 : 45)
              : { ...s.target };
            if (Math.hypot(s.position.x - s.target.x, s.position.y - s.target.y) < 1) {
              s.target = null;
              s.action = s.cheese ? 'eat' : 'idle';
              s.until = s.cheese ? now + 1700 : 0;
              s.nextWalk = now + 9000;
            }
          } else if (s.until && now >= s.until) {
            if (s.action === 'eat') {
              s.cheese = null;
              s.action = 'happy';
              s.until = now + 3000;
              say('That was great! Are you ready for another small win?');
            } else {
              s.action = 'idle';
              s.until = 0;
            }
          } else if (
            !s.until &&
            now > s.nextWalk &&
            canMoveRef.current &&
            !preferences.current.anchored
          ) {
            roamIndex++;
            s.target = boundAko(
              {
                x: 20 + Math.random() * (innerWidth - 120),
                y: innerHeight - 110 - Math.random() * Math.min(150, innerHeight * 0.22),
              },
              innerWidth,
              innerHeight,
            );
            s.action = roamIndex % 4 === 0 ? 'run' : 'walk';
          }
        }
        if (now > s.nextTalk && !s.cheese && !menuRef.current) {
          say(encouragement[talkIndex++ % encouragement.length]);
          s.nextTalk = now + 75000;
        }
        if (now - lastPaint > 33) {
          publish();
          lastPaint = now;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(clickTimer.current);
      media.removeEventListener('change', update);
      document.removeEventListener('click', triple);
      window.removeEventListener('ako:mood', mood);
      window.removeEventListener('resize', resize);
    };
  }, []);
  useEffect(() => {
    mutedRef.current = ako.muted;
    if (scene.current) {
      if (ako.muted) scene.current.message = '';
      if (ako.anchored) {
        scene.current.target = null;
        if (scene.current.cheese) {
          scene.current.cheese = { ...scene.current.position };
          scene.current.action = 'eat';
          scene.current.until = performance.now() + 1700;
        } else if (['walk', 'run'].includes(scene.current.action)) scene.current.action = 'idle';
        try {
          localStorage.setItem('ako-position', JSON.stringify(scene.current.position));
        } catch {}
      }
      publish();
    }
    if (!ako.visible) setMenu(false);
  }, [ako.muted, ako.anchored, ako.visible]);
  if (!ready || !view || !ako.visible) return null;
  const panelLeft = Math.max(
    8,
    Math.min(view.position.x - 100, typeof window !== 'undefined' ? innerWidth - 248 : 0),
  );
  const panelTop = view.position.y < 240 ? view.position.y + AKO_SIZE : view.position.y - 230;
  return (
    <div
      className="ako-companion"
      data-testid="ako-companion"
      data-action={view.action}
      data-muted={muted}
      data-anchored={ako.anchored}
    >
      {view.cheese && (
        <div
          className={`ako-cheese ${view.action === 'eat' ? 'is-eating' : ''}`}
          style={{ left: view.cheese.x + 38, top: view.cheese.y + 76 }}
          role="img"
          aria-label="Cheese for Ako"
        >
          <svg viewBox="0 0 16 12" width="32" height="24" shapeRendering="crispEdges">
            <path fill="#996037" d="M1 4L11 0l4 5v7H0V5z" />
            <path fill="#ffe59b" d="M1 5l10-4 3 4z" />
            <path fill="#f6bd50" d="M1 6h13v5H1z" />
            <path fill="#c98a36" d="M3 7h2v2H3zM9 8h3v2H9zM9 3h2v1H9z" />
          </svg>
        </div>
      )}
      {view.message && !muted && !menu && (
        <div
          className="ako-bubble"
          role="status"
          style={{
            left: panelLeft,
            top: view.position.y < 110 ? view.position.y + 100 : view.position.y - 86,
          }}
        >
          {view.message}
        </div>
      )}
      <button
        className="ako-companion-body"
        style={{ left: view.position.x, top: view.position.y }}
        aria-label={`Ako, your study buddy. ${muted ? 'Talking muted.' : 'Talking enabled.'} Click for controls; right-click to toggle talking.`}
        aria-expanded={menu}
        aria-controls="ako-controls"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          drag.current = {
            x: event.clientX,
            y: event.clientY,
            origin: { ...scene.current!.position },
            moved: false,
          };
          suppressClick.current = false;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const d = drag.current;
          if (!d) return;
          const dx = event.clientX - d.x,
            dy = event.clientY - d.y;
          if (!d.moved && Math.hypot(dx, dy) < 5) return;
          d.moved = true;
          suppressClick.current = true;
          clearTimeout(clickTimer.current);
          setMenu(false);
          const s = scene.current!;
          s.position = boundAko(
            { x: d.origin.x + dx, y: d.origin.y + dy },
            innerWidth,
            innerHeight,
          );
          s.target = null;
          s.cheese = null;
          s.action = 'idle';
          s.until = 0;
          publish();
        }}
        onLostPointerCapture={() => {
          if (drag.current?.moved) {
            updateAko({ anchored: true });
            try {
              localStorage.setItem('ako-position', JSON.stringify(scene.current!.position));
            } catch {}
          }
          drag.current = null;
          held.current = false;
        }}
        onPointerEnter={() => {
          held.current = true;
        }}
        onPointerLeave={() => {
          held.current = false;
        }}
        onFocus={() => {
          held.current = true;
        }}
        onBlur={() => {
          held.current = false;
        }}
        onContextMenu={(event) => {
          event.preventDefault();
          toggleTalking();
        }}
        onKeyDown={(event) => {
          if (event.key.toLowerCase() === 'm') toggleTalking();
          if (event.key.toLowerCase() === 'f') feed();
          if (event.key === 'Escape') setMenu(false);
        }}
        onClick={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
            return;
          }
          clearTimeout(clickTimer.current);
          if (event.detail <= 1)
            clickTimer.current = setTimeout(
              () => setMenu((value) => !value),
              event.detail === 0 ? 0 : 400,
            );
        }}
      >
        <AkoCharacter action={view.action} look={view.facing} motion={canMove} paused={false} />
        <span className="ako-nameplate">
          AKO <span>{muted ? '· quiet' : '· your lab pal'}</span>
        </span>
      </button>
      {menu && (
        <div
          id="ako-controls"
          className="ako-controls"
          role="region"
          aria-label="Ako controls"
          style={{ left: panelLeft, top: Math.max(8, Math.min(innerHeight - 290, panelTop)) }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setMenu(false);
          }}
        >
          <div className="ako-controls-title">
            <strong>A little lab buddy.</strong>
            <button aria-label="Close Ako controls" onClick={() => setMenu(false)}>
              ×
            </button>
          </div>
          <p>
            Drag Ako to place and anchor him.
            <br />
            Triple-click anywhere to leave cheese.
            <br />
            Right-click Ako to toggle his pep talks.
          </p>
          <div className="ako-controls-actions">
            <button onClick={() => feed()}>Give cheese</button>
            <button aria-pressed={muted} onClick={toggleTalking}>
              {muted ? 'Unmute talks' : 'Mute talks'}
            </button>
          </div>
          <button
            className="ako-anchor"
            aria-pressed={ako.anchored}
            onClick={() => {
              updateAko({ anchored: !ako.anchored });
              try {
                localStorage.setItem('ako-position', JSON.stringify(scene.current!.position));
              } catch {}
            }}
          >
            {ako.anchored ? 'Release anchor' : 'Anchor in place'}
          </button>
          <div className="ako-moods" aria-label="Try an expression">
            {(
              ['thinking', 'happy', 'sad', 'angry', 'wave', 'sleep', 'surprised'] as AkoAction[]
            ).map((action) => (
              <button
                key={action}
                onClick={() => react(action)}
                aria-pressed={view.action === action}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
