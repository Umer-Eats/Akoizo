'use client';
// The notebook page editor: rich text with highlights, checklists, callouts, pasted images
// and [[wikilinks]]. It owns its DOM; the parent hears about changes through onChange (debounced)
// and can insert content through the handle (clips from lessons, generated notes).
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import {
  Bold,
  Brackets,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImagePlus,
  Italic,
  Lightbulb,
  Link2,
  List,
  ListChecks,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Trash2,
  Underline,
  Undo2,
  X,
} from 'lucide-react';
import { useAuth } from './auth-context';
import { compressImage, hydrateImages, imageCache } from './notes-store';
import {
  escapeHtml,
  highlightColors,
  sanitizeNoteHtml,
  type HighlightColor,
} from '@/lib/note-html';

export type EditorHandle = {
  insertHtml: (html: string) => void;
  appendHtml: (html: string) => void;
  replaceHtml: (html: string) => void;
  focus: () => void;
  flush: () => void;
  getHtml: () => string;
};

export const highlightHex: Record<HighlightColor, string> = {
  yellow: '#fde047',
  green: '#86efac',
  blue: '#93c5fd',
  pink: '#f9a8d4',
  orange: '#fdba74',
};
const rgbOf = (hex: string) =>
  `rgb(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)})`;
const colorByRgb = Object.fromEntries(
  highlightColors.map((color) => [rgbOf(highlightHex[color]), color]),
) as Record<string, HighlightColor>;

const unwrap = (el: Element) => el.replaceWith(...el.childNodes);
const blockSelector = 'h1,h2,h3,p,li,blockquote,pre';
// Typed at the start of a line, then a space.
const shortcuts: Record<string, string> = {
  '#': 'h1',
  '##': 'h2',
  '###': 'h3',
  '-': 'ul',
  '*': 'ul',
  '1.': 'ol',
  '[]': 'check',
  '[ ]': 'check',
  '>': 'quote',
  '!': 'callout',
  '```': 'pre',
};

type Suggest = { query: string; x: number; y: number; index: number };

export function NoteEditor({
  ref,
  html,
  titles,
  onChange,
  onOpenLink,
  onImage,
  onError,
  compact = false,
  placeholder = 'Start writing. Type [[ to link a page, # for a heading, - for a list.',
  label,
}: {
  ref?: Ref<EditorHandle>;
  html: string;
  titles: string[];
  onChange: (html: string) => void;
  onOpenLink: (title: string) => void;
  onImage: (id: string, data: string) => void;
  onError: (message: string) => void;
  compact?: boolean;
  placeholder?: string;
  label: string;
}) {
  const { request } = useAuth();
  const box = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const timer = useRef(0);
  const dirty = useRef(false);
  const range = useRef<Range | null>(null);
  const linkStart = useRef<{ node: Text; offset: number } | null>(null);
  const latest = useRef({ onChange, onOpenLink, onImage, onError, titles });
  latest.current = { onChange, onOpenLink, onImage, onError, titles };
  const [state, setState] = useState<Record<string, boolean | string>>({});
  const [palette, setPalette] = useState(false);
  const [lastColor, setLastColor] = useState<HighlightColor>('yellow');
  const [link, setLink] = useState<string | null>(null);
  const [suggest, setSuggest] = useState<Suggest | null>(null);
  const [imageMenu, setImageMenu] = useState<{
    img: HTMLImageElement;
    x: number;
    y: number;
  } | null>(null);
  const [empty, setEmpty] = useState(false);

  const isEmpty = () => {
    const el = box.current;
    return !!el && !el.textContent?.trim() && !el.querySelector('img,hr,li');
  };
  const flush = () => {
    window.clearTimeout(timer.current);
    if (!dirty.current || !box.current) return;
    dirty.current = false;
    latest.current.onChange(sanitizeNoteHtml(box.current.innerHTML));
  };
  const schedule = () => {
    dirty.current = true;
    setEmpty(isEmpty());
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(flush, 700);
  };

  // The page's HTML is read once; the parent remounts the editor (by key) for another page.
  useEffect(() => {
    const el = box.current!;
    el.innerHTML = html || '<p><br></p>';
    setEmpty(isEmpty());
    hydrateImages(el, request);
    const onSelection = () => {
      const sel = document.getSelection();
      if (!sel?.rangeCount || !el.contains(sel.anchorNode)) return;
      range.current = sel.getRangeAt(0).cloneRange();
      const block = closest(blockSelector);
      setState({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strike: document.queryCommandState('strikeThrough'),
        ul: !!closest('ul:not([data-checklist])'),
        ol: !!closest('ol'),
        check: !!closest('ul[data-checklist]'),
        block: closest('blockquote')
          ? (closest('blockquote') as HTMLElement).dataset.callout
            ? 'callout'
            : 'quote'
          : (block?.tagName.toLowerCase() ?? 'p'),
      });
    };
    const leave = () => flush();
    document.addEventListener('selectionchange', onSelection);
    window.addEventListener('beforeunload', leave);
    return () => {
      document.removeEventListener('selectionchange', onSelection);
      window.removeEventListener('beforeunload', leave);
      flush();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closest(selector: string) {
    const sel = document.getSelection();
    let node = sel?.anchorNode ?? null;
    if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
    const found = (node as Element | null)?.closest?.(selector);
    return found && box.current?.contains(found) ? (found as HTMLElement) : null;
  }
  function restore() {
    const el = box.current!;
    const sel = document.getSelection()!;
    if (document.activeElement !== el) el.focus({ preventScroll: true });
    if (sel.rangeCount && el.contains(sel.anchorNode)) return;
    if (range.current && el.contains(range.current.startContainer)) {
      sel.removeAllRanges();
      sel.addRange(range.current);
    } else {
      const end = document.createRange();
      end.selectNodeContents(el);
      end.collapse(false);
      sel.removeAllRanges();
      sel.addRange(end);
    }
  }
  function exec(command: string, value?: string) {
    restore();
    document.execCommand('defaultParagraphSeparator', false, 'p');
    document.execCommand(command, false, value);
    schedule();
  }
  function block(tag: string) {
    restore();
    const current = closest(blockSelector);
    exec('formatBlock', `<${current?.tagName.toLowerCase() === tag ? 'p' : tag}>`);
  }
  function checklist() {
    restore();
    const list = closest('ul');
    if (list?.dataset.checklist) {
      delete list.dataset.checklist;
      list.querySelectorAll('li').forEach((li) => delete li.dataset.checked);
      schedule();
      return;
    }
    if (!list) document.execCommand('insertUnorderedList');
    const ul = closest('ul');
    if (!ul) return;
    ul.dataset.checklist = 'true';
    ul.querySelectorAll(':scope > li').forEach((li) => {
      (li as HTMLElement).dataset.checked ??= 'false';
    });
    schedule();
  }
  function quote(kind?: 'key') {
    restore();
    const current = closest('blockquote');
    if (current && (kind ? current.dataset.callout === kind : !current.dataset.callout)) {
      exec('outdent');
      if (closest('blockquote') === current) exec('formatBlock', '<p>');
      return;
    }
    if (current) {
      if (kind) current.dataset.callout = kind;
      else delete current.dataset.callout;
      schedule();
      return;
    }
    exec('formatBlock', '<blockquote>');
    const made = closest('blockquote');
    if (made && kind) made.dataset.callout = kind;
    schedule();
  }
  function highlight(color: HighlightColor | null) {
    setPalette(false);
    restore();
    const sel = document.getSelection();
    if (!sel?.rangeCount || sel.isCollapsed) {
      latest.current.onError('Select some text to highlight it.');
      return;
    }
    const selected = sel.getRangeAt(0);
    const el = box.current!;
    if (!color) {
      [...el.querySelectorAll('mark')].filter((m) => selected.intersectsNode(m)).forEach(unwrap);
      schedule();
      return;
    }
    setLastColor(color);
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('hiliteColor', false, highlightHex[color]);
    document.execCommand('styleWithCSS', false, 'false');
    // The browser paints with inline styles; the notebook stores <mark data-color>.
    for (const node of [...el.querySelectorAll<HTMLElement>('[style]')]) {
      const found = colorByRgb[node.style.backgroundColor];
      node.style.backgroundColor = '';
      if (found) {
        if (node.tagName === 'MARK') node.dataset.color = found;
        else {
          const mark = document.createElement('mark');
          mark.dataset.color = found;
          if (node.tagName === 'SPAN') {
            mark.append(...node.childNodes);
            node.replaceWith(mark);
          } else {
            mark.append(...node.childNodes);
            node.append(mark);
          }
        }
      }
      if (!node.getAttribute('style')) node.removeAttribute('style');
      if (node.isConnected && node.tagName === 'SPAN' && !node.attributes.length) unwrap(node);
    }
    // A highlight inside another highlight takes over that stretch.
    el.querySelectorAll('mark mark').forEach((inner) => {
      const outer = inner.parentElement?.closest('mark');
      if (outer && outer.textContent === inner.textContent) {
        (outer as HTMLElement).dataset.color = (inner as HTMLElement).dataset.color;
        unwrap(inner);
      }
    });
    sel.collapseToEnd();
    schedule();
  }
  function applyLink(url: string) {
    setLink(null);
    const value = url.trim();
    if (!value) return;
    const href = /^(https?:|mailto:|\/)/i.test(value) ? value : `https://${value}`;
    restore();
    const sel = document.getSelection();
    if (!sel || sel.isCollapsed)
      exec('insertHTML', `<a href="${escapeHtml(href)}">${escapeHtml(value)}</a>&nbsp;`);
    else exec('createLink', href);
  }
  function wikilink() {
    restore();
    const sel = document.getSelection();
    const text = sel?.toString().replace(/\s+/g, ' ').trim();
    if (text) exec('insertHTML', `<a data-wikilink="${escapeHtml(text)}">${escapeHtml(text)}</a>`);
    else {
      exec('insertText', '[[');
      detect();
    }
  }

  async function insertImages(files: File[]) {
    restore();
    const at = document.getSelection()?.getRangeAt(0).cloneRange();
    for (const file of files) {
      try {
        const data = await compressImage(file);
        const id = crypto.randomUUID();
        imageCache.set(id, data);
        if (at) {
          const sel = document.getSelection()!;
          sel.removeAllRanges();
          sel.addRange(at);
        }
        exec(
          'insertHTML',
          `<img data-img="${id}" data-size="l" alt="${escapeHtml(file.name && file.name !== 'image.png' ? file.name : 'Pasted image')}" src="${data}"><p><br></p>`,
        );
        at?.setStartAfter(box.current!.querySelector(`img[data-img="${id}"]`) ?? box.current!);
        latest.current.onImage(id, data);
      } catch (error) {
        latest.current.onError(
          error instanceof Error ? error.message : 'That image could not be added.',
        );
      }
    }
  }

  // [[ opens page suggestions; a closed [[Title]] becomes a link.
  function detect() {
    const sel = document.getSelection();
    const node = sel?.focusNode;
    if (
      !sel?.isCollapsed ||
      !node ||
      node.nodeType !== Node.TEXT_NODE ||
      !box.current!.contains(node)
    ) {
      setSuggest(null);
      return;
    }
    if (node.parentElement?.closest('a,pre,code')) return setSuggest(null);
    const before = node.textContent!.slice(0, sel.focusOffset);
    const closed = /\[\[([^[\]\n]{1,120})\]\]$/.exec(before);
    if (closed) {
      linkStart.current = { node: node as Text, offset: sel.focusOffset - closed[0].length };
      choose(closed[1].trim());
      return;
    }
    const open = /\[\[([^[\]\n]{0,60})$/.exec(before);
    if (!open) return setSuggest(null);
    linkStart.current = { node: node as Text, offset: sel.focusOffset - open[0].length };
    const rect =
      sel.getRangeAt(0).getClientRects()[0] ??
      (node.parentElement as Element).getBoundingClientRect();
    setSuggest((s) => ({
      query: open[1],
      x: rect.left,
      y: rect.bottom + 6,
      index: s?.query === open[1] ? s.index : 0,
    }));
  }
  const matches = (query: string) => {
    const q = query.trim().toLowerCase();
    const found = latest.current.titles
      .filter((title, i, all) => all.indexOf(title) === i && title.toLowerCase().includes(q))
      .sort(
        (a, b) => Number(!a.toLowerCase().startsWith(q)) - Number(!b.toLowerCase().startsWith(q)),
      )
      .slice(0, 7);
    if (q && !found.some((t) => t.toLowerCase() === q)) found.push(query.trim());
    return found;
  };
  function choose(title: string) {
    const start = linkStart.current;
    const sel = document.getSelection();
    setSuggest(null);
    if (!start || !sel?.focusNode || !title) return;
    const r = document.createRange();
    r.setStart(start.node, Math.max(0, start.offset));
    r.setEnd(sel.focusNode, sel.focusOffset);
    sel.removeAllRanges();
    sel.addRange(r);
    exec('insertHTML', `<a data-wikilink="${escapeHtml(title)}">${escapeHtml(title)}</a>&nbsp;`);
    linkStart.current = null;
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (suggest) {
      const items = matches(suggest.query);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const step = event.key === 'ArrowDown' ? 1 : -1;
        setSuggest({ ...suggest, index: (suggest.index + step + items.length) % items.length });
        return;
      }
      if ((event.key === 'Enter' || event.key === 'Tab') && items.length) {
        event.preventDefault();
        choose(items[suggest.index] ?? items[0]);
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        setSuggest(null);
        return;
      }
    }
    const mod = event.ctrlKey || event.metaKey;
    if (mod && event.shiftKey && event.key.toLowerCase() === 'h') {
      event.preventDefault();
      highlight(lastColor);
      return;
    }
    if (mod && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      event.stopPropagation();
      setLink('');
      return;
    }
    if (event.key === 'Tab' && closest('li')) {
      event.preventDefault();
      exec(event.shiftKey ? 'outdent' : 'indent');
      return;
    }
    if (event.key === ' ' && !mod) {
      const current = closest('h1,h2,h3,p,li');
      const sel = document.getSelection();
      if (
        !current ||
        !sel?.focusNode ||
        current.tagName === 'LI' ||
        current.tagName.startsWith('H')
      )
        return;
      const r = document.createRange();
      r.selectNodeContents(current);
      r.setEnd(sel.focusNode, sel.focusOffset);
      const rule = shortcuts[r.toString()];
      if (!rule) return;
      event.preventDefault();
      sel.removeAllRanges();
      sel.addRange(r);
      document.execCommand('delete');
      if (rule === 'ul') exec('insertUnorderedList');
      else if (rule === 'ol') exec('insertOrderedList');
      else if (rule === 'check') checklist();
      else if (rule === 'quote') quote();
      else if (rule === 'callout') quote('key');
      else exec('formatBlock', `<${rule}>`);
    }
  }

  function onInput(event: React.FormEvent<HTMLDivElement>) {
    const type = (event.nativeEvent as InputEvent).inputType;
    if (type === 'insertParagraph') {
      const li = closest('ul[data-checklist] > li');
      if (li) li.dataset.checked = 'false';
    }
    detect();
    schedule();
  }

  function onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    const li = (event.target as Element).closest('ul[data-checklist] > li') as HTMLElement | null;
    if (li && event.clientX - li.getBoundingClientRect().left < 26) {
      event.preventDefault();
      li.dataset.checked = li.dataset.checked === 'true' ? 'false' : 'true';
      schedule();
    }
  }
  function onClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const img = target.closest('img[data-img]') as HTMLImageElement | null;
    if (img) {
      const rect = img.getBoundingClientRect();
      setImageMenu({ img, x: rect.left + 8, y: Math.max(rect.top + 8, 72) });
      return;
    }
    setImageMenu(null);
    const wiki = target.closest('a[data-wikilink]') as HTMLElement | null;
    if (wiki) {
      event.preventDefault();
      flush();
      latest.current.onOpenLink(wiki.dataset.wikilink!);
      return;
    }
    const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
    if (anchor && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      window.open(anchor.href, '_blank', 'noopener,noreferrer');
    }
  }
  function onPaste(event: React.ClipboardEvent<HTMLDivElement>) {
    const files = [...event.clipboardData.files].filter((file) => file.type.startsWith('image/'));
    if (files.length) {
      event.preventDefault();
      insertImages(files);
      return;
    }
    const pasted = event.clipboardData.getData('text/html');
    if (!pasted) return;
    event.preventDefault();
    const clean = sanitizeNoteHtml(pasted).trim();
    exec('insertHTML', clean || escapeHtml(event.clipboardData.getData('text/plain')));
    hydrateImages(box.current!, request);
  }
  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    const files = [...event.dataTransfer.files].filter((file) => file.type.startsWith('image/'));
    if (!files.length) return;
    event.preventDefault();
    const at = document.caretRangeFromPoint?.(event.clientX, event.clientY);
    if (at) {
      const sel = document.getSelection()!;
      sel.removeAllRanges();
      sel.addRange(at);
      range.current = at;
    }
    insertImages(files);
  }

  useImperativeHandle(ref, () => ({
    insertHtml(markup) {
      exec('insertHTML', sanitizeNoteHtml(markup));
      hydrateImages(box.current!, request);
    },
    appendHtml(markup) {
      const el = box.current!;
      const last = el.lastElementChild;
      if (last?.tagName === 'P' && !last.textContent?.trim() && !last.querySelector('img'))
        last.remove();
      el.insertAdjacentHTML('beforeend', `${sanitizeNoteHtml(markup)}<p><br></p>`);
      hydrateImages(el, request);
      schedule();
      el.lastElementChild?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    },
    replaceHtml(markup) {
      box.current!.innerHTML = sanitizeNoteHtml(markup) || '<p><br></p>';
      hydrateImages(box.current!, request);
      schedule();
    },
    focus: () => box.current?.focus(),
    flush,
    getHtml: () => sanitizeNoteHtml(box.current?.innerHTML ?? ''),
  }));

  const tool = (
    name: string,
    icon: React.ReactNode,
    action: () => void,
    on?: boolean,
    hide?: boolean,
  ) =>
    hide ? null : (
      <button
        type="button"
        className="nb-tool"
        title={name}
        aria-label={name}
        aria-pressed={on === undefined ? undefined : on}
        onMouseDown={(e) => e.preventDefault()}
        onClick={action}
      >
        {icon}
      </button>
    );
  const items = suggest ? matches(suggest.query) : [];

  return (
    <div className="nb-editor-wrap" data-compact={compact}>
      <div className="nb-toolbar" role="toolbar" aria-label="Formatting">
        {link !== null ? (
          <form
            className="nb-link-form"
            onSubmit={(e) => {
              e.preventDefault();
              applyLink(link);
            }}
          >
            <Link2 size={14} aria-hidden="true" />
            <input
              autoFocus
              value={link}
              placeholder="Paste a web address, then press Enter"
              aria-label="Link address"
              onChange={(e) => setLink(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setLink(null)}
            />
            <button
              type="button"
              className="nb-tool"
              aria-label="Cancel link"
              onClick={() => setLink(null)}
            >
              <X size={14} />
            </button>
          </form>
        ) : (
          <>
            {tool('Undo', <Undo2 size={15} />, () => exec('undo'), undefined, compact)}
            {tool('Redo', <Redo2 size={15} />, () => exec('redo'), undefined, compact)}
            {!compact && <i className="nb-tool-sep" aria-hidden="true" />}
            {tool(
              'Text',
              <Pilcrow size={15} />,
              () => exec('formatBlock', '<p>'),
              state.block === 'p',
            )}
            {tool('Heading 1', <Heading1 size={15} />, () => block('h1'), state.block === 'h1')}
            {tool('Heading 2', <Heading2 size={15} />, () => block('h2'), state.block === 'h2')}
            {tool(
              'Heading 3',
              <Heading3 size={15} />,
              () => block('h3'),
              state.block === 'h3',
              compact,
            )}
            <i className="nb-tool-sep" aria-hidden="true" />
            {tool('Bold (Ctrl+B)', <Bold size={15} />, () => exec('bold'), !!state.bold)}
            {tool('Italic (Ctrl+I)', <Italic size={15} />, () => exec('italic'), !!state.italic)}
            {tool(
              'Underline (Ctrl+U)',
              <Underline size={15} />,
              () => exec('underline'),
              !!state.underline,
            )}
            {tool(
              'Strikethrough',
              <Strikethrough size={15} />,
              () => exec('strikeThrough'),
              !!state.strike,
              compact,
            )}
            <span className="nb-highlight">
              <button
                type="button"
                className="nb-tool nb-tool-mark"
                title="Highlight (Ctrl+Shift+H)"
                aria-label={`Highlight ${lastColor}`}
                data-color={lastColor}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => highlight(lastColor)}
              >
                <Highlighter size={15} />
              </button>
              <button
                type="button"
                className="nb-tool nb-tool-caret"
                aria-label="Choose highlight colour"
                aria-expanded={palette}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setPalette(!palette)}
              />
              {palette && (
                <span className="nb-palette" role="menu">
                  {highlightColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      role="menuitem"
                      data-color={color}
                      aria-label={`Highlight ${color}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => highlight(color)}
                    />
                  ))}
                  <button
                    type="button"
                    role="menuitem"
                    className="nb-palette-clear"
                    aria-label="Remove highlight"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => highlight(null)}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </span>
            <i className="nb-tool-sep" aria-hidden="true" />
            {tool(
              'Bulleted list',
              <List size={15} />,
              () => exec('insertUnorderedList'),
              !!state.ul,
            )}
            {tool(
              'Numbered list',
              <ListOrdered size={15} />,
              () => exec('insertOrderedList'),
              !!state.ol,
            )}
            {tool('Checklist', <ListChecks size={15} />, checklist, !!state.check)}
            {tool('Quote', <Quote size={15} />, () => quote(), state.block === 'quote', compact)}
            {tool(
              'Key idea callout',
              <Lightbulb size={15} />,
              () => quote('key'),
              state.block === 'callout',
            )}
            {tool(
              'Code block',
              <Code size={15} />,
              () => block('pre'),
              state.block === 'pre',
              compact,
            )}
            {tool(
              'Divider',
              <Minus size={15} />,
              () => exec('insertHorizontalRule'),
              undefined,
              compact,
            )}
            <i className="nb-tool-sep" aria-hidden="true" />
            {tool('Link to a page ([[)', <Brackets size={15} />, wikilink)}
            {tool('Web link (Ctrl+K)', <Link2 size={15} />, () => setLink(''))}
            {tool('Add image (or paste one)', <ImagePlus size={15} />, () =>
              fileInput.current?.click(),
            )}
            {tool(
              'Clear formatting',
              <RemoveFormatting size={15} />,
              () => exec('removeFormat'),
              undefined,
              compact,
            )}
          </>
        )}
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            insertImages([...(e.target.files ?? [])]);
            e.target.value = '';
          }}
        />
      </div>
      <div
        ref={box}
        className="nb-content"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label={label}
        spellCheck
        data-empty={empty}
        data-placeholder={placeholder}
        onKeyDown={onKeyDown}
        onInput={onInput}
        onMouseDown={onMouseDown}
        onClick={onClick}
        onPaste={onPaste}
        onDrop={onDrop}
        onBlur={() => {
          flush();
          window.setTimeout(() => setSuggest(null), 150);
        }}
      />
      {suggest && items.length > 0 && (
        <ul className="nb-suggest" role="listbox" style={{ left: suggest.x, top: suggest.y }}>
          {items.map((title, i) => (
            <li key={title + i} role="option" aria-selected={i === suggest.index}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(title);
                }}
              >
                {latest.current.titles.some((t) => t.toLowerCase() === title.toLowerCase())
                  ? title
                  : `New page “${title}”`}
              </button>
            </li>
          ))}
        </ul>
      )}
      {imageMenu && (
        <div
          className="nb-image-menu"
          style={{ left: imageMenu.x, top: imageMenu.y }}
          role="toolbar"
          aria-label="Image size"
        >
          {(['s', 'm', 'l', 'full'] as const).map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={(imageMenu.img.dataset.size ?? 'l') === size}
              onClick={() => {
                imageMenu.img.dataset.size = size;
                setImageMenu({ ...imageMenu });
                schedule();
              }}
            >
              {size === 'full' ? 'Full' : size.toUpperCase()}
            </button>
          ))}
          <button
            type="button"
            aria-label="Remove image"
            onClick={() => {
              imageMenu.img.remove();
              setImageMenu(null);
              schedule();
            }}
          >
            <Trash2 size={13} />
          </button>
          <button type="button" aria-label="Close" onClick={() => setImageMenu(null)}>
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
