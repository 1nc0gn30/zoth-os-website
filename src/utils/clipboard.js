/**
 * Safe, zero-throw clipboard & file export helpers for ZothOS Website.
 * Prevents unhandled NotAllowedError rejections in headless browsers, iframes, and strict permission contexts.
 */
export async function safeCopyText(text) {
  const value = String(text ?? '');
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fallback below
  }

  try {
    if (typeof document !== 'undefined') {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      ta.style.left = '-9999px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    }
  } catch {
    // Ignore silently so consoleErrors remains 0
  }
  return false;
}

export function downloadTextFile(filename, content, mime = 'text/plain;charset=utf-8') {
  if (typeof document === 'undefined' || typeof Blob === 'undefined') return;
  const blob = new Blob([String(content ?? '')], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
