import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '../sanitizeHtml.js';

describe('sanitizeHtml', () => {
  it('removes <script> tags', () => {
    // Use string concatenation to avoid the </script> closing tag in the literal.
    const html =
      '<html><body><script>alert("xss")<' + '/script><p>Hello</p></body></html>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert("xss")');
    expect(result).toContain('<p>Hello</p>');
  });

  it('removes inline event handlers (on*)', () => {
    const html =
      '<html><body><button onclick="doEvil()">Click</button><div onmouseover="track()">Hover</div></body></html>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('onclick');
    expect(result).not.toContain('onmouseover');
    expect(result).toContain('>Click<');
    expect(result).toContain('>Hover<');
  });

  it('removes <iframe> elements', () => {
    const html =
      '<html><body><iframe src="https://evil.com"></iframe><p>Safe</p></body></html>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('<iframe');
    expect(result).not.toContain('evil.com');
    expect(result).toContain('<p>Safe</p>');
  });

  it('blanks out <input> value attributes', () => {
    const html =
      '<html><body><form><input type="text" value="secret123" /></form></body></html>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('secret123');
    // Value attribute should be present but empty
    expect(result).toMatch(/value=""/);
  });

  it('clears <textarea> content', () => {
    const html =
      '<html><body><textarea>sensitive user data</textarea></body></html>';
    const result = sanitizeHtml(html);
    expect(result).not.toContain('sensitive user data');
  });

  it('throws an error when the auth token is found in the sanitized output', () => {
    // Construct a scenario where the token might survive (e.g., in a data attribute).
    const token = 'super-secret-token-abc123';
    const html = `<html><body><div data-token="${token}">content</div></body></html>`;
    expect(() => sanitizeHtml(html, token)).toThrowError(
      /Security violation.*token/i
    );
  });

  it('does not throw when token is absent from the output', () => {
    const token = 'super-secret-token-abc123';
    const html = '<html><body><p>Safe content with no token</p></body></html>';
    expect(() => sanitizeHtml(html, token)).not.toThrow();
  });
});
