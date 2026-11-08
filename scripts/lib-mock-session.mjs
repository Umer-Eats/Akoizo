import { expect } from '@playwright/test';
import { practiceTests, publicPracticePaper } from '../src/lib/practice-catalog.ts';

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
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    if (api) {
      const json = await api(url, route.request());
      if (json !== undefined) return route.fulfill({ json });
    }
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

export async function signIn(page, base, role = 'student') {
  await page.goto(`${base}/login/${role}`);
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.test');
  await page.getByLabel('Password', { exact: true }).fill('qa-browser-only-password');
  await page.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`dashboard/${role}$`));
}
