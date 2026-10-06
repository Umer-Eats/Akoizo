'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Moth, Orbit } from './art';
export function AuthPreview({ role }: { role: 'student' | 'instructor' }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const student = role === 'student';
  return (
    <main id="main" className="auth-page">
      <section className="auth-art">
        <Orbit />
        <Moth />
        <h1>
          {student ? (
            <>
              Your next chapter
              <br />
              starts with <span className="serif-word">curiosity.</span>
            </>
          ) : (
            <>
              Help curious
              <br />
              minds <span className="serif-word">take flight.</span>
            </>
          )}
        </h1>
        <p>
          {student
            ? 'One place to learn, practice, and grow alongside your team.'
            : 'A little guidance. A world of possibility for your students.'}
        </p>
      </section>
      <div>
        <section className="auth-card">
          <span className="tag">{student ? 'OLYMPIAD / STUDENT' : 'INSTRUCTOR / TEACHER'}</span>
          <h2>{mode === 'signup' ? 'Make room for possibility.' : 'Welcome to your orbit.'}</h2>
          <p>
            {mode === 'signup'
              ? 'Your learning journey starts here.'
              : 'Pick up where your curiosity left off.'}
          </p>
          <div className="auth-fields">
            <div className="tabs" aria-label="Account options">
              <button aria-pressed={mode === 'login'} onClick={() => setMode('login')}>
                Log in
              </button>
              <button aria-pressed={mode === 'signup'} onClick={() => setMode('signup')}>
                Create account
              </button>
            </div>
            <fieldset disabled aria-describedby="preview-auth-note">
              {mode === 'signup' && (
                <label>
                  Display name
                  <input placeholder="What should we call you?" autoComplete="off" />
                </label>
              )}
              <label>
                Email address
                <input type="email" placeholder="you@example.com" autoComplete="off" />
              </label>
              <label>
                Password
                <input type="password" placeholder="Your password" autoComplete="off" />
              </label>
              {mode === 'signup' && student && (
                <>
                  <label>
                    Your division
                    <select defaultValue="C">
                      <option value="A">Division A</option>
                      <option value="B">Division B</option>
                      <option value="C">Division C</option>
                    </select>
                  </label>
                  <label>
                    School password
                    <input
                      type="password"
                      placeholder="Provided by your instructor"
                      autoComplete="off"
                    />
                  </label>
                </>
              )}
              {mode === 'signup' && !student && (
                <label>
                  Instructor invitation password
                  <input type="password" placeholder="Provided by Akoizo" autoComplete="off" />
                </label>
              )}
            </fieldset>
          </div>
          <p id="preview-auth-note" className="preview-explainer">
            This is a design preview. Accounts aren’t connected yet, so no passwords or personal
            information are collected. You can explore the dashboard with fictional sample data.
          </p>
          <Link className="button button-primary" href={`/preview/${role}`}>
            Explore {role} preview
          </Link>
        </section>
        <p className="auth-footer">
          {student ? 'Here to guide your team?' : 'Here to study?'}{' '}
          <Link href={`/login/${student ? 'instructor' : 'student'}`}>
            {student ? 'Instructor login' : 'Student login'}
          </Link>
        </p>
      </div>
    </main>
  );
}
