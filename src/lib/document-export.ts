export type ExportFormat = 'html' | 'pdf' | 'png' | 'docx';

export function saveFile(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

async function embedImages(doc: Document) {
  const images = Array.from(doc.querySelectorAll<HTMLImageElement>('img[src^="https:"]'));
  const originals = images.map((image) => image.src);
  let next = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (next < images.length) {
        const image = images[next++];
        try {
          const response = await fetch(image.src, { referrerPolicy: 'no-referrer' });
          if (!response.ok) {
            image.removeAttribute('src');
            continue;
          }
          const blob = await response.blob();
          image.src = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        } catch {
          image.removeAttribute('src');
        }
      }
    }),
  );
  return () => images.forEach((image, index) => (image.src = originals[index]));
}

function pages(doc: Document) {
  const result = Array.from(doc.querySelectorAll<HTMLElement>('.page'));
  if (!result.length)
    throw new Error('The preview has no pages to export. Reopen it and try again.');
  return result;
}

async function exportImagePages(
  doc: Document,
  format: 'pdf' | 'png',
  filename: string,
  progress: (page: number, total: number) => void,
) {
  const { toJpeg, toPng } = await import('html-to-image');
  const all = pages(doc);
  const restoreImages = await embedImages(doc);
  try {
    if (format === 'pdf') {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
        compress: true,
      });
      for (let i = 0; i < all.length; i++) {
        progress(i + 1, all.length);
        const image = await toJpeg(all[i], {
          backgroundColor: '#fff',
          pixelRatio: 1.5,
          quality: 0.83,
        });
        if (i) pdf.addPage();
        pdf.addImage(image, 'JPEG', 0, 0, 8.5, 11);
      }
      saveFile(pdf.output('blob'), `${filename}.pdf`);
    } else {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      for (let i = 0; i < all.length; i++) {
        progress(i + 1, all.length);
        const image = await toPng(all[i], { backgroundColor: '#fff', pixelRatio: 1.5 });
        zip.file(`${filename}-page-${String(i + 1).padStart(3, '0')}.png`, image.split(',')[1], {
          base64: true,
        });
      }
      saveFile(
        await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }),
        `${filename}-png.zip`,
      );
    }
  } finally {
    restoreImages();
  }
}

async function imageBytes(
  element: Element,
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  const src =
    element.tagName.toLowerCase() === 'img'
      ? (element as HTMLImageElement).src
      : `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(element))}`;
  try {
    const response = await fetch(src, { referrerPolicy: 'no-referrer' });
    if (!response.ok) return null;
    const bitmap = await createImageBitmap(await response.blob());
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 900 / bitmap.width, 900 / bitmap.height);
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) return null;
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const png = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    return png
      ? {
          bytes: new Uint8Array(await png.arrayBuffer()),
          width: canvas.width,
          height: canvas.height,
        }
      : null;
  } catch {
    return null;
  }
}

async function exportWord(
  doc: Document,
  filename: string,
  title: string,
  progress: (page: number, total: number) => void,
) {
  const {
    Document: WordDocument,
    HeadingLevel,
    ImageRun,
    Packer,
    Paragraph,
    Table,
    TableCell,
    TableRow,
  } = await import('docx');
  type WordBlock = InstanceType<typeof Paragraph> | InstanceType<typeof Table>;
  const children: WordBlock[] = [new Paragraph({ text: title, heading: HeadingLevel.TITLE })];
  const all = pages(doc);
  for (let i = 0; i < all.length; i++) {
    progress(i + 1, all.length);
    const page = all[i];
    if (i) children.push(new Paragraph({ pageBreakBefore: true }));
    const nodes = Array.from(
      page.querySelectorAll<HTMLElement>('h1,h2,h3,p,li,table,figure,.toc-section,.toc-topic'),
    ).filter((node) => !node.closest('figure') || node.tagName === 'FIGURE');
    for (const node of nodes) {
      if (node.tagName === 'TABLE') {
        const rows = Array.from(node.querySelectorAll('tr'));
        if (!rows.length) continue;
        children.push(
          new Table({
            rows: rows.map(
              (row) =>
                new TableRow({
                  children: Array.from(row.querySelectorAll('th,td')).map(
                    (cell) =>
                      new TableCell({
                        children: [new Paragraph({ text: cell.textContent?.trim() ?? '' })],
                      }),
                  ),
                }),
            ),
          }),
        );
      } else if (node.tagName === 'FIGURE') {
        const graphic = node.querySelector('img,svg');
        if (graphic) {
          const image = await imageBytes(graphic);
          if (image) {
            const scale = Math.min(420 / image.width, 350 / image.height, 1);
            children.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: image.bytes,
                    type: 'png',
                    transformation: {
                      width: Math.round(image.width * scale),
                      height: Math.round(image.height * scale),
                    },
                  }),
                ],
              }),
            );
          }
        }
        const caption = node.querySelector('figcaption')?.textContent?.trim();
        if (caption) children.push(new Paragraph({ text: caption }));
      } else {
        const text = node.textContent?.trim();
        if (!text) continue;
        children.push(
          new Paragraph({
            text,
            ...(node.tagName === 'H1'
              ? { heading: HeadingLevel.HEADING_1 }
              : node.tagName === 'H2'
                ? { heading: HeadingLevel.HEADING_2 }
                : node.tagName === 'H3'
                  ? { heading: HeadingLevel.HEADING_3 }
                  : {}),
          }),
        );
      }
    }
  }
  const word = new WordDocument({ sections: [{ children }] });
  saveFile(await Packer.toBlob(word), `${filename}.docx`);
}

export async function exportPreview(
  doc: Document,
  format: Exclude<ExportFormat, 'html'>,
  filename: string,
  title: string,
  progress: (page: number, total: number) => void,
) {
  if (format === 'docx') await exportWord(doc, filename, title, progress);
  else await exportImagePages(doc, format, filename, progress);
}
