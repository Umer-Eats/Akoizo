'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mascot, Orbit } from '@/components/art';
import { useAuth } from '@/components/auth-context';

interface AuthPageClientProps {
  role: 'student' | 'instructor';
}

export function AuthPageClient({ role }: AuthPageClientProps) {
  return role === 'student' ? <StudentAuth /> : <InstructorAuth />;
}

function StudentAuth() {
  const router = useRouter();
  const { signIn, signUp, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    division: 'C' as 'A' | 'B' | 'C',
    schoolPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!formData.displayName.trim()) {
        setError('Display name is required');
        return;
      }
      if (!formData.schoolPassword.trim()) {
        setError('School password is required');
        return;
      }

      try {
        await signUp(formData.email, formData.password, formData.displayName, 'student', {
          division: formData.division,
          schoolPassword: formData.schoolPassword,
        });
        setSuccess('Account created! Redirecting...');
        router.push('/dashboard/student');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Signup failed');
      }
    } else {
      try {
        await signIn(formData.email, formData.password);
        router.push('/dashboard/student');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
      }
    }
  };

  const redirectToPreview = () => {
    router.push('/preview/student');
  };

  return (
    <main id="main" className="auth-page">
      <section className="auth-art">
        <Orbit />
        <Mascot />
        <h1>
          Your next chapter
          <br />
          starts with curiosity.
        </h1>
        <p>One place to learn, practice, and grow alongside your team.</p>
      </section>
      <div>
        <section className="auth-card">
          <span className="tag">OLYMPIAD / STUDENT</span>
          <h2>{mode === 'signup' ? 'Make room for possibility.' : 'Welcome to your orbit.'}</h2>
          <p>{mode === 'signup' ? 'Your learning journey starts here.' : 'Pick up where your curiosity left off.'}</p>
          
          <form onSubmit={handleSubmit} className="auth-fields">
            <div className="tabs" aria-label="Account options">
              <button type="button" aria-pressed={mode === 'login'} onClick={() => setMode('login')}>
                Log in
              </button>
              <button type="button" aria-pressed={mode === 'signup'} onClick={() => setMode('signup')}>
                Create account
              </button>
            </div>

            {mode === 'signup' && (
              <label>
                Display name
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="What should we call you?"
                  autoComplete="off"
                  required
                />
              </label>
            )}

            <label>
              Email address
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />
            </label>

            {mode === 'signup' && (
              <label>
                Confirm password
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />
              </label>
            )}

            {mode === 'signup' && (
              <>
                <label>
                  Your division
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    required
                  >
                    <option value="A">Division A</option>
                    <option value="B">Division B</option>
                    <option value="C">Division C</option>
                  </select>
                </label>
                <label>
                  School password
                  <input
                    name="schoolPassword"
                    type="password"
                    value={formData.schoolPassword}
                    onChange={handleChange}
                    placeholder="Provided by your instructor"
                    autoComplete="off"
                    required
                  />
                </label>
              </>
            )}

            {error && <p className="form-error" role="alert">{error}</p>}
            {success && <p className="form-success" role="status">{success}</p>}

            <button type="submit" className="button button-primary" disabled={loading}>
              {mode === 'signup' ? 'Create account' : 'Log in'}
            </button>
          </form>

          <p className="preview-explainer">
            Or <button onClick={redirectToPreview} className="text-link">explore the student preview</button> with fictional data.
          </p>
        </section>
        <p className="auth-footer">
          Here to guide your team?{' '}
          <Link href="/login/instructor">Instructor login</Link>
        </p>
      </div>
    </main>
  );
}

function InstructorAuth() {
  const router = useRouter();
  const { signIn, signUp, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    instructorInvitePassword: '',
    division: 'C' as 'A' | 'B' | 'C',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!formData.displayName.trim()) {
        setError('Display name is required');
        return;
      }
      if (!formData.instructorInvitePassword.trim()) {
        setError('Instructor invitation password is required');
        return;
      }

      try {
        await signUp(formData.email, formData.password, formData.displayName, 'instructor', {
          division: formData.division,
          instructorInvitePassword: formData.instructorInvitePassword,
        });
        setSuccess('Account created! Redirecting...');
        router.push('/dashboard/instructor');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Signup failed');
      }
    } else {
      try {
        await signIn(formData.email, formData.password);
        router.push('/dashboard/instructor');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
      }
    }
  };

  const redirectToPreview = () => {
    router.push('/preview/instructor');
  };

  return (
    <main id="main" className="auth-page">
      <section className="auth-art">
        <Orbit />
        <Mascot />
        <h1>
          Help curious
          <br />
          minds take flight.
        </h1>
        <p>A little guidance. A world of possibility for your students.</p>
      </section>
      <div>
        <section className="auth-card">
          <span className="tag">INSTRUCTOR / TEACHER</span>
          <h2>{mode === 'signup' ? 'Make room for possibility.' : 'Welcome to your orbit.'}</h2>
          <p>{mode === 'signup' ? 'Your teaching journey starts here.' : 'Pick up where your curiosity left off.'}</p>
          
          <form onSubmit={handleSubmit} className="auth-fields">
            <div className="tabs" aria-label="Account options">
              <button type="button" aria-pressed={mode === 'login'} onClick={() => setMode('login')}>
                Log in
              </button>
              <button type="button" aria-pressed={mode === 'signup'} onClick={() => setMode('signup')}>
                Create account
              </button>
            </div>

            {mode === 'signup' && (
              <label>
                Display name
                <input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="What should we call you?"
                  autoComplete="off"
                  required
                />
              </label>
            )}

            <label>
              Email address
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />
            </label>

            {mode === 'signup' && (
              <label>
                Confirm password
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                />
              </label>
            )}

            {mode === 'signup' && (
              <>
                <label>
                  Default division for your school
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    required
                  >
                    <option value="C">Division C</option>
                    <option value="B">Division B</option>
                    <option value="A">Division A</option>
                  </select>
                </label>
                <label>
                  Instructor invitation password
                  <input
                    name="instructorInvitePassword"
                    type="password"
                    value={formData.instructorInvitePassword}
                    onChange={handleChange}
                    placeholder="Provided by Akoizo"
                    autoComplete="off"
                    required
                  />
                </label>
              </>
            )}

            {error && <p className="form-error" role="alert">{error}</p>}
            {success && <p className="form-success" role="status">{success}</p>}

            <button type="submit" className="button button-primary" disabled={loading}>
              {mode === 'signup' ? 'Create account' : 'Log in'}
            </button>
          </form>

          <p className="preview-explainer">
            Or <button onClick={redirectToPreview} className="text-link">explore the instructor preview</button> with fictional data.
          </p>
        </section>
        <p className="auth-footer">
          Here to study?{' '}
          <Link href="/login/student">Student login</Link>
        </p>
      </div>
    </main>
  );
}