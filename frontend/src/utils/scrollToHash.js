export function scrollToHash(hash, options = {}) {
  const raw = typeof hash === "string" ? hash.replace(/^#/, "") : "";
  if (!raw || !/^[a-zA-Z0-9_-]+$/.test(raw)) return;

  const id = raw;
  const timeout = options.timeout != null ? options.timeout : 2000;
  const intervalMs = 33;
  const maxAttempts = Math.ceil(timeout / intervalMs);
  let attempts = 0;

  const timer = setInterval(() => {
    const el = document.getElementById(id);
    if (el) {
      clearInterval(timer);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    attempts += 1;
    if (attempts >= maxAttempts) {
      clearInterval(timer);
      console.warn("[scrollToHash] Target not found: #" + id);
      // Fallback pending product decision — currently no-op
    }
  }, intervalMs);
}
