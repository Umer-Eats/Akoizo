'use client';
import { useMemo, useRef, useState } from 'react';
import { Download, Printer } from 'lucide-react';
import type { BuildCourse } from '@/lib/build-events';
import { courseDocument, fitCourseDocument } from '@/lib/course-document';
import { exportPreview, saveFile, type ExportFormat } from '@/lib/document-export';
import './cheatsheets.css';

export function CoursePreview({ course }: { course: BuildCourse }) {
  const html = useMemo(() => courseDocument(course), [course]);
  const frame = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false),
    [error, setError] = useState(''),
    [exporting, setExporting] = useState('');
  const [format, setFormat] = useState<ExportFormat>('html');
  async function download() {
    const doc = frame.current?.contentDocument;
    if (!doc || !ready || exporting) return;
    setExporting('Preparing…');
    setError('');
    try {
      if (format === 'html')
        saveFile(
          new Blob(['<!doctype html>' + doc.documentElement.outerHTML], {
            type: 'text/html;charset=utf-8',
          }),
          `${course.eventId}-course.html`,
        );
      else
        await exportPreview(doc, format, `${course.eventId}-course`, course.title, (n, total) =>
          setExporting(`Exporting page ${n} of ${total}…`),
        );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The course could not be exported.');
    } finally {
      setExporting('');
    }
  }
  return (
    <section className="sheet-viewer" aria-label="Printable course preview">
      <div className="sheet-actions">
        <button
          type="button"
          className="button button-secondary"
          disabled={!ready || !!exporting}
          onClick={() => frame.current?.contentWindow?.print()}
        >
          <Printer size={16} /> Print / save PDF
        </button>
        <label>
          Export format{' '}
          <select
            aria-label="Course export format"
            value={format}
            onChange={(e) => setFormat(e.target.value as ExportFormat)}
          >
            <option value="html">HTML</option>
            <option value="pdf">PDF</option>
            <option value="png">PNG images (ZIP)</option>
            <option value="docx">Word (DOCX)</option>
          </select>
        </label>
        <button
          type="button"
          className="button button-secondary"
          disabled={!ready || !!exporting}
          onClick={() => void download()}
        >
          <Download size={16} />
          {exporting || `Download ${format.toUpperCase()}`}
        </button>
      </div>
      {error && (
        <p role="alert" className="sheet-error">
          {error}
        </p>
      )}
      <div
        style={{
          overflow: 'auto',
          maxHeight: 620,
          border: '1px solid var(--line)',
          borderRadius: 8,
        }}
      >
        <iframe
          key={html}
          ref={frame}
          title={`${course.title} — printable course`}
          srcDoc={html}
          sandbox="allow-same-origin allow-modals"
          style={{ display: 'block', width: 816, height: 1120, border: 0, maxWidth: 'none' }}
          onLoad={() => {
            const doc = frame.current?.contentDocument;
            if (!doc) return;
            const fits = fitCourseDocument(doc);
            frame.current!.style.height = `${doc.querySelectorAll('.page').length * 1074}px`;
            setReady(fits);
            setError(fits ? '' : 'A course section is too long to fit on a readable page.');
          }}
        />
      </div>
    </section>
  );
}
