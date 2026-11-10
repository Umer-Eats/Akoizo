import test from 'node:test';
import assert from 'node:assert/strict';
import { isWorkspacePath, navKind } from '../src/lib/page-transition.ts';

test('workspace routes are told apart from the public site', () => {
  assert.equal(isWorkspacePath('/dashboard/student'), true);
  assert.equal(isWorkspacePath('/notes'), true);
  assert.equal(isWorkspacePath('/settings/student'), true);
  assert.equal(isWorkspacePath('/'), false);
  assert.equal(isWorkspacePath('/study-tools/c/anatomy'), false);
  assert.equal(isWorkspacePath('/login/student'), false);
});

test('crossing between the site and the workspace zooms', () => {
  assert.equal(navKind('/', '/dashboard/student'), 'zone-in');
  assert.equal(navKind('/login/student', '/dashboard/student'), 'zone-in');
  assert.equal(navKind('/attendance', '/mission'), 'zone-out');
});

test('moving between sections follows nav-bar order', () => {
  assert.equal(navKind('/', '/study-tools'), 'next');
  assert.equal(navKind('/study-tools', '/mission'), 'next');
  assert.equal(navKind('/contact', '/rankings'), 'prev');
  assert.equal(navKind('/dashboard/student', '/notes'), 'next');
  assert.equal(navKind('/attendance', '/dashboard/student'), 'prev');
});

test('deeper pages go forward and shallower pages go back', () => {
  assert.equal(navKind('/dashboard/student', '/dashboard/student/events/anatomy'), 'forward');
  assert.equal(
    navKind('/dashboard/student/events/anatomy/lessons', '/dashboard/student/events/anatomy'),
    'back',
  );
  assert.equal(navKind('/study-tools', '/study-tools/c/anatomy'), 'forward');
});

test('siblings at the same depth swap in place', () => {
  assert.equal(
    navKind('/dashboard/student/events/anatomy', '/dashboard/student/events/forensics'),
    'swap',
  );
  assert.equal(navKind('/dashboard/binders', '/dashboard/courses'), 'swap');
});
