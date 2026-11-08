'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  FlaskConical,
  LayoutGrid,
  Pause,
  Play,
} from 'lucide-react';
import { slotForEvent } from '@/lib/event-slots';
import { useSettings } from './providers';

// Clips are recorded from a signed-in student account by scripts/home-videos.mjs.
// Each one follows a real event, so it carries that event's timeslot colour.
export const clips = [
  {
    id: 'dashboard',
    label: 'Your events',
    icon: LayoutGrid,
    event: null,
    title: 'Every event, colour-coded by timeslot.',
    body: 'Filter your study space by tournament timeslot, then open an event and its toolkit of lessons, tests, labs and rules.',
    address: 'akoizo / dashboard',
  },
  {
    id: 'lessons',
    label: 'Lessons',
    icon: BookOpen,
    event: { id: 'anatomy-and-physiology', name: 'Anatomy and Physiology' },
    title: 'Read it, see it, then try it.',
    body: 'Every lesson moves from Learn to Practice to Labs to a Checkpoint. Key ideas, diagrams and step-by-step examples come first, then models you push and pull yourself.',
    address: 'akoizo / anatomy-and-physiology / lessons',
  },
  {
    id: 'test',
    label: 'Past tests',
    icon: FileText,
    event: { id: 'astronomy', name: 'Astronomy' },
    title: 'The real paper, next to your answer sheet.',
    body: 'Past competition tests open beside a timed answer sheet. Drafts save as you go, and scoring follows the published key.',
    address: 'akoizo / astronomy / practice-tests',
  },
  {
    id: 'lab',
    label: 'Labs',
    icon: FlaskConical,
    event: { id: 'chemistry-lab', name: 'Chemistry Lab' },
    title: 'Change a variable. Record what happens.',
    body: 'Write a hypothesis, move the controls, and keep every trial in a lab notebook you can export.',
    address: 'akoizo / chemistry-lab / lab-practice',
  },
] as const;

export function ClipPlayer({ id, label }: { id: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const { motion } = useSettings();
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Plays only while on screen, and never on its own when motion is off.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduce = !motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce && !userPaused) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, motion, userPaused]);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      setUserPaused(false);
      el.play().catch(() => {});
    } else {
      setUserPaused(true);
      el.pause();
    }
  };

  return (
    <div className="vx-clip">
      <video
        ref={video}
        key={id}
        src={`/home/videos/${id}.mp4`}
        poster={`/home/videos/${id}.jpg`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${label}: a screen recording from a demo student account`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="vx-clip-toggle"
        onClick={toggle}
        aria-label={playing ? `Pause ${label} clip` : `Play ${label} clip`}
      >
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </div>
  );
}

export function HomeShowcase() {
  const [active, setActive] = useState(0);
  const clip = clips[active];
  const slot = clip.event ? slotForEvent(clip.event.id) : undefined;
  return (
    <div className="vx-showcase" data-slot={slot?.color}>
      <div className="vx-showcase-tabs" role="tablist" aria-label="Study formats">
        {clips.map((item, index) => {
          const itemSlot = item.event ? slotForEvent(item.event.id) : undefined;
          return (
            <button
              key={item.id}
              id={`showcase-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={index === active}
              aria-controls="showcase-panel"
              tabIndex={index === active ? 0 : -1}
              data-slot={itemSlot?.color}
              onKeyDown={(event) => {
                const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
                if (!keys.includes(event.key)) return;
                event.preventDefault();
                const next =
                  event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? clips.length - 1
                      : (index + (event.key === 'ArrowRight' ? 1 : -1) + clips.length) %
                        clips.length;
                setActive(next);
                document.getElementById(`showcase-tab-${clips[next].id}`)?.focus();
              }}
              onClick={() => setActive(index)}
            >
              <item.icon size={15} aria-hidden="true" />
              {item.label}
              {item.event && <i aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <div
        id="showcase-panel"
        className="vx-showcase-panel"
        role="tabpanel"
        aria-labelledby={`showcase-tab-${clip.id}`}
      >
        <figure className="vx-window">
          <div className="vx-window-bar" aria-hidden="true">
            <span className="vx-lights">
              <i />
              <i />
              <i />
            </span>
            <span className="vx-window-address">{clip.address}</span>
            <span className="vx-window-live">
              <i /> Recorded in Akoizo
            </span>
          </div>
          <ClipPlayer id={clip.id} label={clip.label} />
        </figure>
        <div className="vx-showcase-side" key={clip.id}>
          {clip.event && slot ? (
            <p className="vx-showcase-event">
              <i aria-hidden="true" /> {clip.event.name} · {slot.label} timeslot
            </p>
          ) : (
            <p className="vx-showcase-event">
              <i aria-hidden="true" /> Student dashboard
            </p>
          )}
          <h3>{clip.title}</h3>
          <p>{clip.body}</p>
          <Link href="/login/student" className="lx-link">
            Open your study space <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
