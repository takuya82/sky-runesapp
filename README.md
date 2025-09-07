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
- Reset: click "最初から" in the UI, clear those keys from DevTools, or open `index.html?reset`

Usage tips
- Keyboard: `1-4` selects choices; `m` toggles sound.
- At Title: `c` continues if a save exists; `r` clears save; `n` starts a new game (clear + start).
- UI: HP shows as a number and hearts (♥ up to 5).
- Feedback: Wrong answers briefly flash a red tint (damage cue).
- Breadcrumbs: Hover each step to see a short description.
- Choices: Selected answer briefly highlights green (OK) or red (NG).

Quiz sessions
- Each quiz node now asks multiple questions per encounter.
- Defaults: enemy=2 questions (need 2 correct), shrine=3 (need 2), boss=1 (need 1).
- Progress shows like: `Q 1/2 • 正解 0/2 (合格: 2)`; pass/fail then routes via node.next.
- Authoring: optional difficulty `d: 'E'|'M'|'H'` on each question renders a label.

Deploy (Vercel)
- Import this repo on Vercel as a static site (no build command).
- Output directory: repo root (contains `index.html`).
