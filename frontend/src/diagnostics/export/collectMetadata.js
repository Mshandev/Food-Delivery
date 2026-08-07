/**
 * Collects build and runtime metadata for the diagnostics export.
 *
 * SECURITY: does NOT include localStorage, sessionStorage, cookies,
 * auth tokens, or any user-identifying information.
 *
 * @returns {{
 *   mode: string,
 *   baseUrl: string,
 *   origin: string,
 *   userAgent: string,
 *   exportTimestamp: string,
 *   performanceTimeOrigin: number,
 * }}
 */
export function collectMetadata() {
  return {
    mode: import.meta.env.MODE,
    baseUrl: import.meta.env.BASE_URL,
    origin: window.location.origin,
    userAgent: navigator.userAgent,
    exportTimestamp: new Date().toISOString(),
    performanceTimeOrigin: performance.timeOrigin,
  };
}
