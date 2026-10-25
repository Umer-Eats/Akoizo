'use client';

import { useEffect, useRef, type DragEvent } from 'react';

/** Text-only native drag feedback and continuous scrolling at scroll-container edges. */
export function useLessonDrag() {
  const cleanup = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanup.current?.(), []);

  return (event: DragEvent<HTMLElement>, name: string) => {
    // The buttons remain clickable; only the item's text starts a drag.
    if ((event.target as HTMLElement).closest('button')) {
      event.preventDefault();
      return false;
    }
    cleanup.current?.();
    event.dataTransfer.setData('text/plain', name);
    event.dataTransfer.effectAllowed = 'move';
    const preview = document.createElement('div');
    preview.className = 'lesson-drag-preview';
    preview.textContent = name;
    document.body.append(preview);
    event.dataTransfer.setDragImage(preview, 16, 16);

    let y = event.clientY;
    let target: Element = event.currentTarget;
    let frame = 0;
    let previousTime = 0;
    const track = (e: globalThis.DragEvent) => {
      y = e.clientY;
      if (e.target instanceof Element) target = e.target;
    };
    const scroll = (time: number) => {
      const elapsed = Math.min(32, previousTime ? time - previousTime : 16);
      previousTime = time;
      const containers: Element[] = [];
      for (let element: Element | null = target; element; element = element.parentElement) {
        if (element === document.scrollingElement) continue;
        if (
          /auto|scroll/.test(getComputedStyle(element).overflowY) &&
          element.scrollHeight > element.clientHeight
        ) {
          containers.push(element);
        }
      }
      if (document.scrollingElement) containers.push(document.scrollingElement);
      for (const container of containers) {
        const viewport = container === document.scrollingElement;
        const bounds = container.getBoundingClientRect();
        const top = viewport ? 0 : Math.max(0, bounds.top);
        const bottom = viewport ? window.innerHeight : Math.min(window.innerHeight, bounds.bottom);
        const edge = Math.min(96, (bottom - top) / 3);
        if (edge <= 0) continue;
        const speed =
          y < top + edge
            ? -Math.min(1, (top + edge - y) / edge)
            : y > bottom - edge
              ? Math.min(1, (y - bottom + edge) / edge)
              : 0;
        if (!speed) continue;
        const before = container.scrollTop;
        container.scrollTop += speed * elapsed * 0.8;
        if (container.scrollTop !== before) break;
      }
      frame = requestAnimationFrame(scroll);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      preview.remove();
      document.removeEventListener('dragover', track);
      document.removeEventListener('drop', stop, true);
      document.removeEventListener('dragend', stop, true);
      window.removeEventListener('blur', stop);
      cleanup.current = null;
    };
    cleanup.current = stop;
    document.addEventListener('dragover', track);
    document.addEventListener('drop', stop, true);
    document.addEventListener('dragend', stop, true);
    window.addEventListener('blur', stop);
    frame = requestAnimationFrame(scroll);
    return true;
  };
}
