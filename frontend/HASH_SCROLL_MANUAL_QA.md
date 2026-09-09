# Hash Scroll Manual QA

## Setup

```
cd frontend
npm install
npm run dev
```

## Test Cases

### TC-1: Direct entry via hash URL

1. Open a new browser tab and navigate to `http://localhost:5173/#explore-menu`.
2. Expected: The page loads and the viewport automatically scrolls to the Explore Menu section.

### TC-2: Refresh on hash URL

1. While on `http://localhost:5173/#explore-menu`, press F5 or Ctrl+R to refresh.
2. Expected: After reload, the viewport scrolls to the Explore Menu section again.

### TC-3: Navbar anchor click

1. Navigate to `http://localhost:5173/` (no hash).
2. Click the "menu" link in the Navbar.
3. Expected: The viewport scrolls smoothly to the Explore Menu section.

### TC-4: Unknown hash (no match)

1. Navigate to `http://localhost:5173/#nonexistent-section`.
2. Expected: No scroll occurs. A warning is logged in the browser console:
   `[scrollToHash] Target not found: #nonexistent-section`

### TC-5: Unsafe hash (sanitization)

1. Navigate to `http://localhost:5173/#<script>alert(1)</script>`.
2. Expected: No scroll, no error, and no console warning (silently ignored).

## Build Validation

```
npm run build
npm run lint
```

Both commands must complete without errors or warnings.
