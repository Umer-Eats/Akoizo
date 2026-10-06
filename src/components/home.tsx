'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Check, BookOpen, Zap, FolderOpen } from 'lucide-react';
import { Moth, Orbit, PixelStar, Reveal, WireGlobe } from './art';
export function Home() {
  const [answer, setAnswer] = useState('');
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="tiny-square" /> A LITTLE CURIOSITY. ENDLESS POSSIBILITIES.
        </div>
        <h1 className="hero-title chrome" aria-label="Akoizo">
          AKOIZO
        </h1>
        <div className="hero-art">
          <Orbit />
          <div className="holo-orb orb-one" />
          <div className="holo-orb orb-two" />
          <PixelStar className="hero-star star-one" />
          <PixelStar className="hero-star star-two" />
          <Moth />
          <span className="art-coordinate left">FIG. 01 / CURIOSITY</span>
          <span className="art-coordinate right">
            MEET AKO
            <br />
            YOUR STUDY COMPANION
          </span>
        </div>
        <div className="hero-copy">
          <h2>
            Stay curious. <span>Go further.</span>
          </h2>
          <p>
            Your Science Olympiad journey, with a little more wonder.
            <br className="desktop-only" /> Learn, practice, and grow. Always free.
          </p>
          <Link className="button button-primary" href="/login/student">
            Find your starting point
            <PixelStar />
          </Link>
        </div>
        <a className="scroll-cue" href="#discover">
          <span>THERE’S A WHOLE WORLD TO DISCOVER</span>
          <ChevronDown size={16} />
        </a>
        <span className="hero-side-note">MADE FOR THE WAY YOU LEARN</span>
      </section>
      <div className="marquee-strip" aria-hidden="true">
        <span>CURIOUS MINDS</span>
        <PixelStar />
        <span>BRIGHTER POSSIBILITIES</span>
        <PixelStar />
        <span>SCIENCE, TOGETHER</span>
        <PixelStar />
        <span>ALWAYS FREE</span>
        <PixelStar />
      </div>
      <section id="discover" className="section-intro container">
        <Reveal>
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>
            Big ambitions.
            <br />
            <span className="muted">One small step at a time.</span>
          </h2>
          <p>
            You bring the curiosity. We’re building a space
            <br className="desktop-only" /> for everything that comes next.
          </p>
        </Reveal>
        <WireGlobe />
      </section>
      <section className="feature-section container">
        <Reveal className="feature-copy">
          <p className="eyebrow">
            <span>01</span> FIND YOUR SPARK
          </p>
          <h2>
            Make sense
            <br />
            of the <span className="serif-word">science.</span>
          </h2>
          <p>
            From your first “why?” to your next “I get it.” Explore lessons built around your event,
            at your pace.
          </p>
          <Link href="/preview/student" className="text-link">
            Explore the study space <span>↗</span>
          </Link>
          <div className="mini-label">
            <BookOpen size={15} /> LESSONS & CONCEPTS
          </div>
        </Reveal>
        <Reveal className="lesson-art">
          <div className="holo-sheet" />
          <div className="study-window glass">
            <div className="window-top">
              <span>THE CURIOSITY LAB</span>
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="lesson-orbit">
              <WireGlobe />
              <div className="holo-orb" />
              <PixelStar />
            </div>
            <span className="eyebrow">A WHOLE UNIVERSE OF IDEAS</span>
            <h3>
              Everything starts
              <br />
              with a question.
            </h3>
            <div className="window-foot">
              <span>LEARN AT YOUR OWN PACE</span>
              <span>01 / 03</span>
            </div>
          </div>
          <PixelStar className="floating-star" />
        </Reveal>
      </section>
      <section className="feature-section reverse container">
        <Reveal className="practice-art">
          <div className="practice-window glass">
            <div className="window-top">
              <span>TRY A LITTLE SCIENCE</span>
              <span className="tag">SAMPLE QUESTION</span>
            </div>
            <span className="question-index">QUESTION 01</span>
            <h3>
              Which quantity is
              <br />
              measured in newtons?
            </h3>
            <div className="answer-options">
              {['Force', 'Energy', 'Power'].map((a, i) => (
                <button
                  className={`answer ${answer === a ? 'selected' : ''}`}
                  key={a}
                  onClick={() => setAnswer(a)}
                  aria-pressed={answer === a}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {a}
                  {answer === a && a === 'Force' && <Check size={17} />}
                </button>
              ))}
            </div>
            <p className="answer-feedback" aria-live="polite">
              {answer
                ? answer === 'Force'
                  ? 'Exactly. A newton is the SI unit of force.'
                  : 'Try again. Think about a push or a pull.'
                : 'A small challenge. A new connection.'}
            </p>
          </div>
          <span className="pixel-caption">PRESS CURIOSITY TO CONTINUE_</span>
        </Reveal>
        <Reveal className="feature-copy">
          <p className="eyebrow">
            <span>02</span> GET INTO YOUR ORBIT
          </p>
          <h2>
            A little practice.
            <br />A lot more <span className="serif-word">possibility.</span>
          </h2>
          <p>
            Find your rhythm with practice tests and question banks. Make mistakes, connect the
            dots, and watch your confidence grow.
          </p>
          <Link href="/preview/student" className="text-link">
            Take a look inside <span>↗</span>
          </Link>
          <div className="mini-label">
            <Zap size={15} /> PRACTICE, THEN PROGRESS
          </div>
        </Reveal>
      </section>
      <section className="tools-band container">
        <Reveal>
          <p className="eyebrow">A PLACE FOR ALL YOUR IDEAS</p>
          <div className="tools-band-content">
            <h2>
              Less scattered.
              <br />
              More <span className="serif-word">prepared.</span>
            </h2>
            <div>
              <p>
                Your vocabulary, notes, binders, and cheatsheets.
                <br />
                One study space that grows with you.
              </p>
              <div className="tool-pills">
                <span>
                  <Zap size={14} /> Vocab rush
                </span>
                <span>
                  <FolderOpen size={14} /> Notes & binders
                </span>
                <span>
                  <BookOpen size={14} /> Cheatsheets
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="community-section">
        <div className="community-orbit">
          <WireGlobe />
        </div>
        <Reveal className="container community-copy">
          <p className="eyebrow">
            <span>03</span> BETTER, TOGETHER
          </p>
          <h2>
            Your school.
            <br />A whole <span className="chrome">universe</span>
            <br />
            of curious minds.
          </h2>
          <p>
            Challenge yourself, cheer each other on, and see how
            <br className="desktop-only" /> far your curiosity can take you.
          </p>
          <Link className="button button-glass" href="/rankings">
            Explore global rankings
          </Link>
          <span className="community-note">GROWTH IS BETTER WHEN IT’S SHARED.</span>
        </Reveal>
      </section>
      <section className="closing-section container">
        <div>
          <p className="eyebrow">NO PAYWALLS. JUST POSSIBILITIES.</p>
          <h2>
            A brighter journey.
            <br />
            <span className="serif-word">For everyone.</span>
          </h2>
        </div>
        <div>
          <p>
            Good study tools should open doors.
            <br />
            That’s why Akoizo will always be free to learn.
          </p>
          <Link className="text-link" href="/mission">
            Get to know our mission <span>↗</span>
          </Link>
        </div>
        <PixelStar />
      </section>
    </main>
  );
}
