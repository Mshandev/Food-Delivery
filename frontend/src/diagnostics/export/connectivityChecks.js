/**
 * Runs lightweight HTTP connectivity checks against known API endpoints.
 *
 * Each check is non-destructive (GET only) and records latency.
 * Results are included in the diagnostics export — they never contain
 * auth tokens or request bodies.
 *
 * @param {string} apiBaseUrl - Base URL of the backend API (no trailing slash).
 * @returns {Promise<Array<{
 *   url: string,
 *   success: boolean,
 *   statusCode: number|null,
 *   errorMessage: string|null,
 *   latencyMs: number,
 *   timestamp: string,
 * }>>}
 */
export async function runConnectivityChecks(apiBaseUrl) {
  const endpoints = [
    `${apiBaseUrl}/`,
    `${apiBaseUrl}/api/food/list`,
  ];

  const results = await Promise.all(
    endpoints.map(async (url) => {
      const start = Date.now();
      const timestamp = new Date().toISOString();
      try {
        const response = await fetch(url, { method: 'GET' });
        const latencyMs = Date.now() - start;
        return {
          url,
          success: response.ok,
          statusCode: response.status,
          errorMessage: response.ok ? null : `HTTP ${response.status}`,
          latencyMs,
          timestamp,
        };
      } catch (err) {
        const latencyMs = Date.now() - start;
        return {
          url,
          success: false,
          statusCode: null,
          errorMessage: err instanceof Error ? err.message : String(err),
          latencyMs,
          timestamp,
        };
      }
    })
  );

  return results;
}
