'use client';
import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import {
  phetAttribution,
  phetPage,
  phetPreview,
  phetUrl,
  type PhetEmbed,
} from '@/lib/lesson-extras';
import './lesson-extras.css';

// The simulation is loaded only after the student asks for it, so a lesson page with several
// embeds stays light. PhET's own page chrome and logo are left untouched inside the frame.
export function PhetSim({ embed, lessonId }: { embed: PhetEmbed; lessonId: string }) {
  const [running, setRunning] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [previewFailed, setPreviewFailed] = useState(false);
  const id = `phet-${lessonId}-${embed.sim}`;
  return (
    <section className="phet-sim" id={id} aria-labelledby={`${id}-title`}>
      <header>
        <p className="eyebrow">GUIDED INVESTIGATION · PHET SIMULATION</p>
        <h4 id={`${id}-title`}>{embed.title}</h4>
        <p>{embed.why}</p>
      </header>
      <div className="phet-frame" data-running={running}>
        {running ? (
          <iframe
            src={phetUrl(embed.sim)}
            title={`${embed.title} — PhET interactive simulation`}
            loading="lazy"
            allow="fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            className="phet-launch"
            onClick={() => setRunning(true)}
            aria-label={`Start the ${embed.title} simulation`}
          >
            {!previewFailed && (
              // Remote preview image from PhET; the launch control works without it.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={phetPreview(embed.sim)}
                alt=""
                loading="lazy"
                onError={() => setPreviewFailed(true)}
              />
            )}
            <span>
              <Play size={18} aria-hidden="true" /> Start simulation
            </span>
          </button>
        )}
      </div>
      <div className="lesson-actions">
        {running && (
          <button
            type="button"
            className="button button-small button-glass"
            onClick={() => setRunning(false)}
          >
            Close simulation
          </button>
        )}
        <a
          className="button button-small button-glass"
          href={phetUrl(embed.sim)}
          target="_blank"
          rel="noreferrer"
        >
          Open full screen <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
      <fieldset className="phet-tasks">
        <legend>
          Investigate in order · {checked.length} of {embed.tasks.length} done
        </legend>
        {embed.tasks.map((task, i) => (
          <label key={task}>
            <input
              type="checkbox"
              checked={checked.includes(i)}
              onChange={(e) =>
                setChecked((current) =>
                  e.target.checked ? [...current, i] : current.filter((n) => n !== i),
                )
              }
            />
            <span>{task}</span>
          </label>
        ))}
      </fieldset>
      <p className="phet-credit">
        {phetAttribution.replace(' (https://phet.colorado.edu).', '')} (
        <a href={phetPage(embed.sim)} target="_blank" rel="noreferrer">
          https://phet.colorado.edu
        </a>
        ). Runs from PhET’s servers; investigation prompts are original to this lesson.
      </p>
    </section>
  );
}
