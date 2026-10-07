import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const errors = [];
await mkdir('documents/qa', { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base);
  await expect(page.locator('.ako-pixel')).toHaveCount(1);
  const body = page.locator('.ako-companion-body'),
    buddy = page.getByTestId('ako-companion');
  const original = await body.boundingBox();
  await page.mouse.move(original.x + 48, original.y + 40);
  await page.mouse.down();
  await page.mouse.move(330, 400, { steps: 12 });
  await page.mouse.up();
  await expect(buddy).toHaveAttribute('data-anchored', 'true');
  await expect(page.locator('#ako-controls')).toHaveCount(0);
  const placed = await body.boundingBox();
  await page.reload();
  await expect(buddy).toHaveAttribute('data-anchored', 'true');
  const restored = await body.boundingBox();
  if (Math.abs(restored.x - placed.x) > 1 || Math.abs(restored.y - placed.y) > 1)
    throw Error('Position not restored');
  await page.mouse.click(600, 500, { clickCount: 3 });
  await expect(buddy).toHaveAttribute('data-action', 'eat');
  await expect(buddy).toHaveAttribute('data-action', 'happy');
  if ((await body.boundingBox()).x !== restored.x) throw Error('Anchored feeding moved Ako');
  await body.click();
  await expect(page.getByRole('button', { name: 'Release anchor' })).toBeVisible();
  await page.getByRole('button', { name: 'Release anchor' }).click();
  await expect(buddy).toHaveAttribute('data-anchored', 'false');
  await page.getByRole('button', { name: 'Close Ako controls' }).click();
  for (const path of ['/mission', '/rankings', '/login/student', '/login/instructor']) {
    await page.goto(base + path);
    await expect(page.locator('.ako-pixel')).toHaveCount(1);
  }
  await page.close();
  for (const role of ['student', 'instructor']) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await context.newPage();
    p.on('pageerror', (e) => errors.push(e.message));
    let profile = {
      id: 'qa-' + role,
      role,
      displayName: 'Test Learner',
      schoolId: 'qa-school',
      schoolName: 'School-QA',
      schoolCommunityName: 'Test school',
      schoolCommunityId: 'ppchs',
      division: role === 'student' ? 'B' : null,
    };
    let roster = [
      {
        ...profile,
        id: 'qa-learner',
        points: 0,
        lessons: 0,
        practice: 0,
        ranked: 0,
        role: 'student',
        displayName: 'Ada Student',
        division: 'B',
      },
    ];
    const payload = Buffer.from(
      JSON.stringify({
        sub: 'qa-' + role,
        user_id: 'qa-' + role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        aud: 'qa',
        iss: 'https://securetoken.google.com/qa',
        firebase: { sign_in_provider: 'password' },
      }),
    ).toString('base64url');
    const token =
      Buffer.from('{"alg":"none"}').toString('base64url') + '.' + payload + '.signature';
    await p.route('https://identitytoolkit.googleapis.com/**', (route) =>
      route.fulfill({
        json: route.request().url().includes('signInWithPassword')
          ? {
              localId: 'qa-' + role,
              email: 'qa@example.test',
              idToken: token,
              refreshToken: 'qa-refresh',
              expiresIn: '3600',
              registered: true,
            }
          : {
              users: [
                {
                  localId: 'qa-' + role,
                  email: 'qa@example.test',
                  emailVerified: true,
                  providerUserInfo: [
                    {
                      providerId: 'password',
                      email: 'qa@example.test',
                      federatedId: 'qa@example.test',
                    },
                  ],
                },
              ],
            },
      }),
    );
    await p.route('**/api/**', async (route) => {
      const url = new URL(route.request().url()),
        method = route.request().method();
      if (url.pathname === '/api/auth/profile')
        return route.fulfill({
          status: profile ? 200 : 404,
          json: profile || { error: 'Finish enrollment' },
        });
      if (url.pathname === '/api/settings') {
        if (method === 'GET') return route.fulfill({ json: { profile, students: roster } });
        const body = route.request().postDataJSON();
        if (method === 'PATCH') {
          if (role === 'student') profile.displayName = body.displayName;
          else roster[0].displayName = body.displayName;
          return route.fulfill({ json: { displayName: body.displayName } });
        }
        if (method === 'DELETE') {
          profile = null;
          return route.fulfill({ json: { success: true } });
        }
      }
      if (url.pathname === '/api/school/password')
        return route.fulfill({
          json: { schoolName: 'School-QA', joiningPassword: 'QA-ONLY-JOINING-PASSWORD' },
        });
      if (url.pathname === '/api/dashboard')
        return route.fulfill({
          json: {
            profile,
            students: roster,
            stats: { lessons: 0, practice: 0, ranked: 0, points: 0 },
            progress: {},
            assignments: [],
          },
        });
      return route.fulfill({ json: [] });
    });
    await p.goto(base + '/login/' + role);
    await p.getByLabel('Email address', { exact: true }).fill('qa@example.test');
    await p.getByLabel('Password', { exact: true }).fill('qa-test-password');
    await p.locator('form').getByRole('button', { name: 'Log in', exact: true }).click();
    await expect(p).toHaveURL(new RegExp('/dashboard/' + role + '$'));
    await p.getByRole('link', { name: 'Settings', exact: true }).click();
    await expect(p).toHaveURL(new RegExp('/settings/' + role + '$'));
    if (role === 'student') {
      await p.getByLabel('Full name', { exact: true }).fill('Ada Lovelace');
      await p.getByRole('button', { name: 'Save name' }).click();
      await expect(p.getByText('Name saved.', { exact: true })).toBeVisible();
      await p.getByRole('checkbox', { name: 'Show Ako' }).uncheck();
      await expect(p.locator('.ako-companion')).toHaveCount(0);
      await p.getByRole('checkbox', { name: 'Show Ako' }).check();
      await p.getByRole('checkbox', { name: 'Anchor in place' }).check();
      await expect(p.getByTestId('ako-companion')).toHaveAttribute('data-anchored', 'true');
    } else {
      await p.getByRole('button', { name: 'Create new joining password' }).click();
      await expect(p.getByLabel('Student joining password')).toHaveValue(
        'QA-ONLY-JOINING-PASSWORD',
      );
      await p.getByLabel('Ada Student · Division B').fill('Ada Updated');
      await p.getByRole('button', { name: 'Save name' }).click();
      await expect(p.getByText('Name saved.', { exact: true })).toBeVisible();
    }
    await p.screenshot({ path: `documents/qa/settings-${role}-desktop.png`, fullPage: true });
    await p.setViewportSize({ width: 390, height: 844 });
    if (await p.evaluate(() => document.documentElement.scrollWidth > innerWidth))
      throw Error('Settings overflow');
    await p.screenshot({ path: `documents/qa/settings-${role}-mobile.png`, fullPage: true });
    await p
      .getByRole('button', {
        name: role === 'student' ? 'Leave community' : 'Delete community',
        exact: true,
      })
      .click();
    await p.locator('#confirm-community').fill(role === 'student' ? 'LEAVE' : 'School-QA');
    await p
      .getByRole('button', {
        name: role === 'student' ? 'Confirm leave' : 'Permanently close community',
      })
      .click();
    await expect(p).toHaveURL(new RegExp('/login/' + role + '$'));
    await context.close();
  }
  if (errors.length) throw Error(errors.join('\n'));
  console.log(
    'Passed: drag/anchor persistence, stationary feeding, single mascot, role settings UI, name saves, preferences, passwords, departure, mobile layout. Account UI uses mocked services; database authorization tested separately.',
  );
} finally {
  await browser.close();
}
