/**
 * Sanitizes a raw HTML string before including it in a diagnostics export.
 *
 * Removes:
 *   - <script> elements
 *   - Inline event-handler attributes (on*)
 *   - <iframe> elements
 *   - <input> value attributes
 *   - <textarea> content
 *
 * Throws if the provided auth token appears anywhere in the serialized output,
 * acting as a last-resort guard against accidental token leakage.
 *
 * @param {string} htmlString - Raw outer HTML to sanitize.
 * @param {string} [token]    - Auth token that must NOT appear in the output.
 * @returns {string} Sanitized HTML string.
 * @throws {Error} If the token is found in the sanitized output.
 */
export function sanitizeHtml(htmlString, token) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Remove all <script> elements.
  doc.querySelectorAll('script').forEach((el) => el.remove());

  // Remove all <iframe> elements.
  doc.querySelectorAll('iframe').forEach((el) => el.remove());

  // Remove inline event handlers (on*) from every element.
  const allElements = doc.querySelectorAll('*');
  allElements.forEach((el) => {
    const attrsToRemove = [];
    for (const attr of el.attributes) {
      if (attr.name.toLowerCase().startsWith('on')) {
        attrsToRemove.push(attr.name);
      }
    }
    attrsToRemove.forEach((name) => el.removeAttribute(name));
  });

  // Blank out <input> value attributes so form data is not exported.
  doc.querySelectorAll('input').forEach((el) => {
    if (el.hasAttribute('value')) {
      el.setAttribute('value', '');
    }
  });

  // Clear <textarea> content.
  doc.querySelectorAll('textarea').forEach((el) => {
    el.textContent = '';
  });

  const serialized = doc.documentElement.outerHTML;

  // Guard: the auth token must never appear in exported HTML.
  if (token && token.length > 0 && serialized.includes(token)) {
    throw new Error(
      'Security violation: auth token found in sanitized HTML output. Export aborted.'
    );
  }

  return serialized;
}
