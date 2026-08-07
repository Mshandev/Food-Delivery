# Food Delivery Frontend

React 18 + Vite 5 frontend for the Food Delivery application.

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Diagnostics / Export Page

### Overview

The Diagnostics/Export page (`/diagnostics/export`) generates and downloads a
ZIP archive containing:

| File in ZIP | Contents |
|---|---|
| `snapshots/home.html` | Sanitized HTML snapshot of the Home (`/`) route |
| `metadata/metadata.json` | Build mode, base URL, origin, userAgent, timestamp |
| `metadata/connectivity-report.json` | GET latency and status for key API endpoints |

### Enabling the Feature

The page is **disabled by default** and controlled by an environment variable.

1. Copy `.env.example` to `.env` (if you have not already done so).
2. Set the flag:

   ```
   VITE_DIAGNOSTICS_EXPORT_ENABLED=true
   ```

3. Restart the dev server (`npm run dev`).

Navigate to `http://localhost:5173/diagnostics/export` to access the page.

### Production Safety

The feature is **automatically disabled in production** builds unless you also
set:

```
VITE_DIAGNOSTICS_EXPORT_ALLOW_PROD=true
```

This guard prevents accidental exposure of the diagnostics surface in
production environments.

### What Is Included

- Sanitized HTML snapshot of the Home (`/`) route only (MVP allowlist).
- Build and runtime metadata (mode, origin, userAgent, timestamp).
- API connectivity report (HTTP status + latency for root and food-list
  endpoints).

### What Is Excluded

| Category | Reason |
|---|---|
| Auth pages (`/login`, `/register`, `/myorders`, `/order`, `/verify`) | Not in the MVP allowlist — contain user-specific data |
| `localStorage` / `sessionStorage` contents | Never collected |
| Auth tokens | Stripped from HTML snapshots; export aborted if found |
| `<script>` tags | Removed from all HTML snapshots |
| Inline event handlers (`on*` attributes) | Removed from all elements |
| `<iframe>` elements | Removed |
| `<input value>` / `<textarea>` content | Blanked out |
| Screenshots | Out of MVP scope (stub flag only, not implemented) |

### Screenshot Flag (Stub)

A screenshot flag variable is reserved for future use but is not implemented
in this release:

```
VITE_DIAGNOSTICS_EXPORT_SCREENSHOTS_ENABLED=false
```

Do **not** set this to `true` — it has no effect and is present only to
document the intended future extension point.

---

## Running Tests

The project uses [Vitest](https://vitest.dev/) with jsdom and
`@testing-library/react`.

```bash
npm run test
```

Test files are located at:

```
src/diagnostics/export/__tests__/
  sanitizeHtml.test.js
  collectMetadata.test.js
  connectivityChecks.test.js
```

---

## Lint & Build

```bash
npm run lint   # ESLint — must pass with 0 warnings
npm run build  # Vite production build
```
