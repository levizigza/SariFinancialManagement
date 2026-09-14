/**
 * Escape untrusted strings for HTML email bodies (output encoding).
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Strip control characters that can break email headers / log lines.
 */
export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n\0]/g, "").trim();
}
