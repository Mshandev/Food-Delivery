const RETURN_TO_KEY = "returnTo";

/**
 * Persist the current location (pathname + search + hash) so the user can be
 * redirected back after completing sign-in or sign-up.
 * Only same-origin relative paths starting with "/" are stored.
 *
 * @param {string} value - full relative path, e.g. "/#explore-menu"
 */
export function setReturnTo(value) {
  if (typeof value === "string" && value.startsWith("/")) {
    sessionStorage.setItem(RETURN_TO_KEY, value);
  }
}

/**
 * Read the stored return-to path.
 * Falls back to "/" if nothing is stored or the stored value is invalid.
 *
 * @returns {string}
 */
export function getReturnTo() {
  const value = sessionStorage.getItem(RETURN_TO_KEY);
  if (value && value.startsWith("/")) {
    return value;
  }
  return "/";
}

/**
 * Remove the stored return-to path after it has been consumed.
 */
export function clearReturnTo() {
  sessionStorage.removeItem(RETURN_TO_KEY);
}
