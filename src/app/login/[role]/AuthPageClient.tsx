'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mascot, Orbit } from '@/components/art';
import { useAuth, authMessage } from '@/components/auth-context';
import type { Enrollment, Profile, Role } from '@/lib/domain';
import type { Division } from '@/lib/events';
import { schoolCommunities, getSchoolCommunity } from '@/lib/school-communities';

export function AuthPageClient({ role }: { role: Role }) {
  const router = useRouter();
  const auth = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    division: 'C' as Division,
    schoolPassword: '',
    instructorInvitePassword: '',
    schoolCommunityId: '',
  });
  useEffect(() => {
    if (auth.user?.displayName) {
      setForm((current) => ({
        ...current,
        displayName: current.displayName || auth.user!.displayName!,
      }));
    }
  }, [auth.user?.uid, auth.user?.displayName]);
  const student = role === 'student';
  const completing = !!auth.user && !auth.profile && !auth.sessionError;
  const creating = mode === 'signup' || completing;
  const disabled = busy || auth.loading;
  const data: Enrollment = {
    role,
    displayName: form.displayName || auth.user?.displayName || '',
    division: form.division,
    schoolPassword: form.schoolPassword.trim(),
    instructorInvitePassword: form.instructorInvitePassword,
    schoolCommunityId: student ? undefined : form.schoolCommunityId,
  };
  function change(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError('');
  }
  function finish(profile: Profile | null) {
    setForm((previous) => ({
      ...previous,
      password: '',
      confirmPassword: '',
      schoolPassword: '',
      instructorInvitePassword: '',
    }));
    if (profile) router.replace(`/dashboard/${profile.role}`);
    else setNotice('One more step: enter your enrollment details to open your dashboard.');
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setNotice('');
    if (creating && !completing && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      finish(
        completing
          ? await auth.completeEnrollment(data)
          : creating
            ? await auth.signUp(form.email, form.password, data)
            : await auth.signIn(form.email, form.password, role),
      );
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  async function google() {
    setError('');
    setNotice('');
    if (creating && !student && !getSchoolCommunity(form.schoolCommunityId)) {
      setError('Choose a school community before continuing with Google.');
      return;
    }
    if (
      creating &&
      (!data.displayName.trim() || !(student ? data.schoolPassword : data.instructorInvitePassword))
    ) {
      setError('Enter your name and enrollment password before continuing with Google.');
      return;
    }
    setBusy(true);
    try {
      finish(await auth.googleSignIn(role, creating ? data : undefined));
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  async function reset() {
    if (!form.email.trim()) {
      setError('Enter your email address first.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await auth.resetPassword(form.email);
      setNotice('If this email has an account, a password reset link is on its way.');
    } catch (error) {
      setError(authMessage(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <main id="main" className="auth-page">
      <section className="auth-art">
        <Orbit />
        <Mascot />
        <h1>
          {student ? 'Your next chapter starts with curiosity.' : 'Help your team take flight.'}
        </h1>
        <p>
          {student
            ? 'One place to learn, practice, and grow alongside your team.'
            : 'A shared school. A clear view of every student’s progress.'}
        </p>
      </section>
      <div>
        <section className="auth-card">
          <span className="tag">{student ? 'OLYMPIAD / STUDENT' : 'INSTRUCTOR / TEACHER'}</span>
          <h2>
            {completing
              ? 'Finish joining your school.'
              : creating
                ? 'Start your next chapter.'
                : 'Welcome to your orbit.'}
          </h2>
          <p>
            {student
              ? 'Join your instructor’s school and choose your division.'
              : 'Choose your school community and guide your students.'}
          </p>
          {auth.profile ? (
            <div className="account-ready">
              <p>Signed in as {auth.profile.displayName}.</p>
              <Link className="button button-primary" href={`/dashboard/${auth.profile.role}`}>
                Open {auth.profile.role} dashboard
              </Link>
              <button
                className="text-link"
                onClick={() => auth.logOut().catch((error) => setError(authMessage(error)))}
              >
                Use another account
              </button>
            </div>
          ) : (
            <>
              {!completing && (
                <div className="tabs" aria-label="Account options">
                  <button
                    aria-pressed={mode === 'login'}
                    onClick={() => {
                      setMode('login');
                      setError('');
                      setNotice('');
                    }}
                  >
                    Log in
                  </button>
                  <button
                    aria-pressed={mode === 'signup'}
                    onClick={() => {
                      setMode('signup');
                      setError('');
                      setNotice('');
                    }}
                  >
                    Create account
                  </button>
                </div>
              )}
              {completing && (
                <p className="enrollment-note">
                  Signed in with {auth.user?.email}. Your dashboard opens after your enrollment
                  password is verified.
                </p>
              )}
              <form onSubmit={submit} className="auth-fields">
                {creating && (
                  <label>
                    Display name
                    <input
                      name="displayName"
                      value={form.displayName}
                      onChange={change}
                      autoComplete="nickname"
                      maxLength={80}
                      required
                    />
                  </label>
                )}
                {!completing && (
                  <>
                    <label>
                      Email address
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={change}
                        autoComplete="email"
                        required
                      />
                    </label>
                    <label>
                      Password
                      <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={change}
                        autoComplete={creating ? 'new-password' : 'current-password'}
                        minLength={creating ? 8 : undefined}
                        required
                      />
                    </label>
                    {creating && (
                      <label>
                        Confirm password
                        <input
                          name="confirmPassword"
                          type="password"
                          value={form.confirmPassword}
                          onChange={change}
                          autoComplete="new-password"
                          minLength={8}
                          required
                        />
                      </label>
                    )}
                  </>
                )}
                {creating &&
                  (student ? (
                    <>
                      <label>
                        Your division
                        <select
                          aria-label="Your division"
                          name="division"
                          value={form.division}
                          onChange={change}
                        >
                          <option value="A">Division A · Elementary</option>
                          <option value="B">Division B · Middle school</option>
                          <option value="C">Division C · High school</option>
                        </select>
                      </label>
                      <label>
                        School password
                        <input
                          name="schoolPassword"
                          type="password"
                          value={form.schoolPassword}
                          onChange={change}
                          autoComplete="off"
                          required
                          placeholder="Provided by your instructor"
                        />
                      </label>
                    </>
                  ) : (
                    <>
                      <label>
                        School community
                        <select
                          name="schoolCommunityId"
                          aria-label="School community"
                          value={form.schoolCommunityId}
                          onChange={change}
                          required
                          disabled={disabled}
                        >
                          <option value="" disabled>
                            Choose your school community
                          </option>
                          {schoolCommunities.map((community) => (
                            <option key={community.id} value={community.id}>
                              {community.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Instructor invitation password
                        <input
                          name="instructorInvitePassword"
                          type="password"
                          value={form.instructorInvitePassword}
                          onChange={change}
                          autoComplete="off"
                          required
                        />
                      </label>
                      <p className="enrollment-note">
                        Your school community will be saved with your account. A private study group
                        and student joining password will be created for you.
                      </p>
                    </>
                  ))}
                <button className="button button-primary" type="submit" disabled={disabled}>
                  {disabled
                    ? 'Please wait…'
                    : completing
                      ? 'Finish enrollment'
                      : creating
                        ? 'Create account'
                        : 'Log in'}
                </button>
                {!creating && (
                  <button type="button" className="text-link" disabled={disabled} onClick={reset}>
                    Forgot password?
                  </button>
                )}
              </form>
              {!completing && (
                <>
                  <div className="divider">
                    <span>or</span>
                  </div>
                  <button
                    type="button"
                    className="button button-google"
                    disabled={disabled}
                    onClick={google}
                  >
                    Continue with Google
                  </button>
                </>
              )}
              {completing && (
                <button
                  className="text-link"
                  disabled={disabled}
                  onClick={() => auth.logOut().catch((error) => setError(authMessage(error)))}
                >
                  Use another account
                </button>
              )}
            </>
          )}
          {(error || auth.sessionError) && (
            <p className="form-error" role="alert">
              {error || auth.sessionError}
            </p>
          )}
          {auth.sessionError && auth.user && (
            <div className="account-actions">
              <button
                className="text-link"
                onClick={() => auth.refreshProfile().catch((error) => setError(authMessage(error)))}
              >
                Retry connection
              </button>
              <button
                className="text-link"
                onClick={() => auth.logOut().catch((error) => setError(authMessage(error)))}
              >
                Sign out
              </button>
            </div>
          )}
          {notice && (
            <p className="form-success" role="status">
              {notice}
            </p>
          )}
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
