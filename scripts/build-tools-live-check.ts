// Explicit smoke test: calls Gemini with the configured key; never uses student media.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { blankCourse, type BuildCourse, type BuildGrade } from '../src/lib/build-events.ts';
import { provider, runBuildAI } from '../src/lib/build-ai.ts';

if (!process.env.GEMINI_API_KEY)
  throw new Error('Configure GEMINI_API_KEY before running this check.');
await mkdir('tmp/build-tools', { recursive: true });
const results = await Promise.allSettled(
  (['C/electric-vehicle', 'B/scrambler'] as const).map(async (key) => {
    const [division, eventId] = key.split('/') as ['B' | 'C', string];
    if (process.argv.includes('--video-only'))
      return JSON.parse(
        await readFile(`tmp/build-tools/live-${division}-${eventId}.json`, 'utf8'),
      ) as BuildCourse;
    const course = (await runBuildAI(blankCourse(division, eventId), 'course')) as BuildCourse;
    await writeFile(
      `tmp/build-tools/live-${division}-${eventId}.json`,
      JSON.stringify(course, null, 2),
    );
    console.log(
      `${key}: generated ${course.diagram.nodes.length} diagram points with ${course.ruleReferences.length} rule references`,
    );
    return course;
  }),
);
for (const result of results)
  if (result.status === 'rejected')
    console.log(
      'Generation failed:',
      result.reason instanceof Error ? result.reason.message : 'unknown error',
    );
const generated = results.find((result) => result.status === 'fulfilled');
if (!generated || generated.status !== 'fulfilled') process.exit(1);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
let name = '';
try {
  const page = await browser.newPage();
  const video = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d')!;
    const recorder = new MediaRecorder(canvas.captureStream(10), { mimeType: 'video/webm' });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => chunks.push(e.data);
    const done = new Promise<Blob>((resolve) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }));
    });
    recorder.start();
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = '#17202e';
      ctx.fillRect(0, 0, 640, 360);
      ctx.fillStyle = '#fff';
      ctx.font = '24px sans-serif';
      ctx.fillText('Synthetic test recording', 40, 140);
      ctx.fillText(`No build or run is shown. Frame ${i}`, 40, 190);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    recorder.stop();
    return Array.from(new Uint8Array(await (await done).arrayBuffer()));
  });
  const start = await provider('/upload/v1beta/files', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Upload-Protocol': 'resumable',
      'X-Goog-Upload-Command': 'start',
      'X-Goog-Upload-Header-Content-Length': String(video.length),
      'X-Goog-Upload-Header-Content-Type': 'video/webm',
    },
    body: JSON.stringify({ file: { display_name: 'Akoizo synthetic QA video' } }),
  });
  const url = start.headers.get('x-goog-upload-url');
  if (!url) throw new Error('Missing upload URL');
  const upload = await fetch(url, {
    method: 'POST',
    headers: { 'X-Goog-Upload-Offset': '0', 'X-Goog-Upload-Command': 'upload, finalize' },
    body: new Uint8Array(video),
  });
  if (!upload.ok) throw new Error(`Upload failed: ${upload.status}`);
  const file = (await upload.json()).file;
  name = file.name;
  console.log('Files API: synthetic WebM upload succeeded');
  let ready = false;
  for (let i = 0; i < 60; i++) {
    const current = await (await provider(`/v1beta/${name}`)).json();
    if (current.state === 'ACTIVE') {
      ready = true;
      break;
    }
    if (current.state === 'FAILED') throw new Error('Processing failed');
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  if (!ready) throw new Error('Video processing timed out');
  const grade = (await runBuildAI(generated.value, 'grade', [
    { videoMetadata: { fps: 10 }, fileData: { mimeType: 'video/webm', fileUri: file.uri } },
  ])) as BuildGrade;
  if (grade.score !== null || grade.missing.length === 0)
    throw new Error('Model invented a score for a video with no run.');
  await writeFile('tmp/build-tools/live-unverifiable-grade.json', JSON.stringify(grade, null, 2));
  console.log('Live video grade: correctly withheld score and identified missing evidence');
} finally {
  if (name) await provider(`/v1beta/${name}`, { method: 'DELETE' }).catch(() => undefined);
  await browser.close();
}
if (results.some((result) => result.status === 'rejected')) process.exitCode = 1;
