/**
 * Diagnostics/Export feature flag configuration.
 *
 * Feature flags are driven by Vite environment variables so they are
 * resolved at build time and never shipped as secrets.
 */

/**
 * Route allowlist for MVP — only safe, public, unauthenticated routes.
 * Extend this list in future iterations after security review.
 */
const ALLOWED_ROUTES = [
  { path: '/', label: 'Home' },
];

/**
 * Returns the current diagnostics configuration.
 *
 * @returns {{
 *   enabled: boolean,
 *   allowedRoutes: Array<{path: string, label: string}>,
 *   screenshotsEnabled: boolean,
 * }}
 */
export function getDiagnosticsConfig() {
  const flagEnabled =
    import.meta.env.VITE_DIAGNOSTICS_EXPORT_ENABLED === 'true';

  const isProduction = import.meta.env.MODE === 'production';
  const allowProd =
    import.meta.env.VITE_DIAGNOSTICS_EXPORT_ALLOW_PROD === 'true';

  // Disabled in production unless explicitly opted in.
  const enabled = flagEnabled && (!isProduction || allowProd);

  // Screenshot support is a stub — disabled by default, not implemented in MVP.
  const screenshotsEnabled =
    import.meta.env.VITE_DIAGNOSTICS_EXPORT_SCREENSHOTS_ENABLED === 'true';

  return {
    enabled,
    allowedRoutes: ALLOWED_ROUTES,
    screenshotsEnabled,
  };
}
