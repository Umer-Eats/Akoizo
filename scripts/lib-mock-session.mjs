import { expect } from '@playwright/test';
import { practiceTests, publicPracticePaper } from '../src/lib/practice-catalog.ts';
import { lessonsForEvent } from '../src/lib/lessons-registry.ts';

// Browser-only sign-in for QA and marketing captures. Firebase and every /api call are mocked
// in the page, so no real account or database is touched.
export const profiles = {
  student: {
    id: 'qa-student',
    role: 'student',
    displayName: 'Ada',
    schoolId: 'qa-school',
    schoolName: 'Science Team',
    schoolCommunityName: 'Science Team',
    schoolCommunityId: 'ppchs',
    division: 'C',
  },
  instructor: {
    id: 'qa-coach',
    role: 'instructor',
    displayName: 'Coach Lee',
    schoolId: 'qa-school',
    schoolName: 'Science Team',
    schoolCommunityName: 'Science Team',
    schoolCommunityId: 'ppchs',
    division: 'C',
  },
};

const token = (id) =>
  Buffer.from('{"alg":"none"}').toString('base64url') +
  '.' +
  Buffer.from(
    JSON.stringify({
      sub: id,
      user_id: id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      aud: 'qa',
      iss: 'https://securetoken.google.com/qa',
      firebase: { sign_in_provider: 'password' },
    }),
  ).toString('base64url') +
  '.signature';

export async function mockSession(page, { role = 'student', theme = 'dark', api } = {}) {
  const profile = profiles[role];
  await page.addInitScript((theme) => {
    // Preferences belong to the app document, not Chrome's embedded PDF viewer.
    if (window.self !== window.top || !window.localStorage) return;
    localStorage.setItem('ako-preferences', JSON.stringify({ visible: false, muted: true }));
    localStorage.setItem('akoizo-theme', theme);
  }, theme);
  await page.route('https://identitytoolkit.googleapis.com/**', (route) =>
    route.fulfill({
      json: route.request().url().includes('signInWithPassword')
        ? {
            localId: profile.id,
            email: 'qa@example.test',
            idToken: token(profile.id),
            refreshToken: 'qa-refresh',
            expiresIn: '3600',
            registered: true,
          }
        : {
            users: [
              {
                localId: profile.id,
                email: 'qa@example.test',
                emailVerified: true,
                providerUserInfo: [{ providerId: 'password', email: 'qa@example.test' }],
              },
            ],
          },
    }),
  );
  const lessonAnswers = [];
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    if (api) {
      const json = await api(url, route.request());
      if (json !== undefined) return route.fulfill({ json });
    }
    if (url.pathname.startsWith('/api/lessons/') && url.pathname !== '/api/lessons/ako')
      return route.fulfill({
        json: mockLessonApi(url, route.request(), profile.division, lessonAnswers),
      });
    if (url.pathname === '/api/auth/profile') return route.fulfill({ json: profile });
    if (url.pathname === '/api/dashboard')
      return route.fulfill({
        json: {
          profile,
          students: [],
          stats: { lessons: 0, practice: 0, ranked: 0, points: 0 },
          assignments: [],
          progress: {},
        },
      });
    if (url.pathname === '/api/practice' && url.searchParams.get('testId')) {
      const test = practiceTests.find((t) => t.id === url.searchParams.get('testId'));
      return route.fulfill({ json: { test: publicPracticePaper(test), attempts: [] } });
    }
    return route.fulfill({ json: [] });
  });
  return profile;
}

/**
 * Lesson checkpoint API, held in memory for one page. Multiple choice is marked by the key; a
 * written answer stands in for AI marking (six or more words count as correct), unless the
 * answer starts with "self:" which exercises the self-mark path.
 */
export function mockLessonApi(url, request, division, answers, drafts = []) {
  const body = request.method() === 'GET' ? {} : JSON.parse(request.postData() || '{}');
  if (url.pathname === '/api/lessons/progress')
    return request.method() === 'GET' ? { answers, parts: [], drafts } : { recorded: body.part };
  const lesson = lessonsForEvent(body.eventId, division)?.lessons.find((l) => l.id === body.lessonId);
  if (!lesson) return { error: 'Lesson not found.' };
  if (request.method() === 'DELETE') {
    for (let i = answers.length - 1; i >= 0; i--)
      if (answers[i].lessonId === lesson.id) answers.splice(i, 1);
    for (let i = drafts.length - 1; i >= 0; i--)
      if (drafts[i].lessonId === lesson.id) drafts.splice(i, 1);
    return { reset: true };
  }
  const q = lesson.practice.find((item) => item.id === body.questionId);
  const dropDraft = () => {
    const at = drafts.findIndex((d) => d.lessonId === lesson.id && d.questionId === q.id);
    if (at >= 0) drafts.splice(at, 1);
  };
  // Unchecked answers are saved as drafts, newest last, like the lesson_drafts table.
  if (request.method() === 'PUT') {
    if (answers.some((a) => a.lessonId === lesson.id && a.questionId === q.id))
      return { saved: false };
    dropDraft();
    if (!body.answer.trim()) return { saved: false };
    drafts.push({
      lessonId: lesson.id,
      questionId: q.id,
      answer: body.answer,
      updatedAt: new Date().toISOString(),
    });
    return { saved: true };
  }
  const existing = answers.find((a) => a.lessonId === lesson.id && a.questionId === q.id);
  if (existing)
    return { status: 'checked', result: { correct: existing.correct, by: existing.by } };
  let result;
  if (q.type === 'mcq') result = { correct: body.answer === q.answer, by: 'key' };
  else if (typeof body.selfMark === 'boolean') result = { correct: body.selfMark, by: 'self' };
  else if (body.answer.startsWith('self:')) return { status: 'self-mark' };
  else {
    const correct = body.answer.trim().split(/\s+/).length >= 6;
    result = {
      correct,
      by: 'ai',
      feedback: correct
        ? 'You named the key idea and gave a reason for it.'
        : 'This names the topic but not the mechanism. Say why it happens, not just what.',
    };
  }
  answers.push({ lessonId: lesson.id, questionId: q.id, answer: body.answer, ...result });
  dropDraft();
  const done = answers.filter((a) => a.lessonId === lesson.id);
  return done.length === lesson.practice.length
    ? {
        status: 'checked',
        result,
        lesson: { score: done.filter((a) => a.correct).length, maxScore: done.length },
      }
    : { status: 'checked', result };
}

export async function signIn(page, base, role = 'student') {
  await page.goto(`${base}/login/${role}`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`dashboard/${role}$`));
}
