Sky Runes - Static MVP

- Single-file static chapter with inline story and quiz branching.
- Works locally by opening `index.html` in a browser.
- Saves `hp` and `node` in `localStorage`.

Files
- `index.html` — Layout with `#scene/#dialog/#choices/#status`
- `app.js` — Story data + game core (quiz/branch/HP/localStorage)
- `style.css` — Minimal theme
- `image/` — Assets (gallery optional)

Dev
- Open `index.html` directly in a browser (no build required)
- Saves: `localStorage` keys `hp`, `node`
- Reset: click "最初から" in the UI, or clear those keys from DevTools

Deploy (Vercel)
- Import this repo on Vercel as a static site (no build command).
- Output directory: repo root (contains `index.html`).
