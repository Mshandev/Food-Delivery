import { getDiagnosticsConfig } from './config.js';
import { collectMetadata } from './collectMetadata.js';
import { runConnectivityChecks } from './connectivityChecks.js';
import { sanitizeHtml } from './sanitizeHtml.js';

/**
 * Waits for two animation frames to allow the DOM to settle after navigation.
 *
 * @returns {Promise<void>}
 */
function waitTwoFrames() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

/**
 * Derives a safe filename slug from a route path.
 *
 * @param {string} path - Route path (e.g. '/').
 * @returns {string} Filename without extension (e.g. 'home').
 */
function pathToFilename(path) {
  if (path === '/') return 'home';
  return path
    .replace(/^\//, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-_]/gi, '_')
    .toLowerCase();
}

/**
 * Runs the full diagnostics export:
 *   1. Collects build/runtime metadata.
 *   2. Checks API connectivity.
 *   3. Captures and sanitizes HTML snapshots of each allowlisted route.
 *   4. Restores the original path.
 *
 * @param {{
 *   apiBaseUrl: string,
 *   token?: string,
 *   onProgress?: (step: number, total: number) => void,
 * }} options
 *
 * @returns {Promise<{
 *   files: Array<{path: string, content: string}>,
 *   metadata: object,
 *   connectivityReport: object[],
 * }>}
 */
export async function runExport({ apiBaseUrl, token = '', onProgress }) {
  const { allowedRoutes } = getDiagnosticsConfig();
  const originalPath = window.location.pathname + window.location.search;

  // Total steps: metadata + connectivity + one per route + restore
  const totalSteps = 2 + allowedRoutes.length;
  let currentStep = 0;

  const progress = (label) => {
    currentStep += 1;
    if (typeof onProgress === 'function') {
      onProgress(currentStep, totalSteps, label);
    }
  };

  // Step 1: Collect metadata.
  const metadata = collectMetadata();
  progress('Collecting metadata');

  // Step 2: Run connectivity checks.
  const connectivityReport = await runConnectivityChecks(apiBaseUrl);
  progress('Running connectivity checks');

  // Step 3: Capture HTML snapshots for each allowed route.
  const files = [];

  for (const route of allowedRoutes) {
    // Navigate to the route without a full page reload.
    window.history.pushState({}, '', route.path);
    await waitTwoFrames();

    const rawHtml = document.documentElement.outerHTML;
    const sanitized = sanitizeHtml(rawHtml, token);

    files.push({
      path: `snapshots/${pathToFilename(route.path)}.html`,
      content: sanitized,
    });

    progress(`Snapshot: ${route.label}`);
  }

  // Restore original path.
  window.history.pushState({}, '', originalPath);

  return { files, metadata, connectivityReport };
}
