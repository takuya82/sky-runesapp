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
- Pause/Save: Game auto-saves HP/node on every step. Use the in-game "中断（タイトルへ）" button or press `q`/`Esc` to save-and-return; resume via "続きから" on the title.

Quiz sessions
- Each quiz node now asks multiple questions per encounter.
- Defaults: enemy=2 questions (need 2 correct), shrine=3 (need 2), boss=1 (need 1).
- Boss is now 2 questions, need 1 correct (mini-boss感)。
- Progress shows like: `Q 1/2 • 正解 0/2 (合格: 2)`; pass/fail then routes via node.next.
- Authoring: optional difficulty `d: 'E'|'M'|'H'` on each question renders a label.
- Optional `exp` (explanation) shows briefly after answer, especially for誤答。

Randomization
- Shuffles choice order on every question render.
- Avoids repeating recently used questions across encounters (per node) via a small recent-history persisted in `localStorage`.

Question bank
- File: `questions/questions.js` — exposes global `QUESTIONS` (no fetch; works on file:// and Vercel)
- Categories used by nodes:
  - enemy1: `vocab_basic`, `grammar_tense`
  - enemy2: `grammar_basic`
  - shrine: `connector_reason`, `grammar_basic`, `grammar_tense`
- To add: append items to categories or create new category, then list it in a node’s `bank.use` array in `app.js`.

Visual mapping (images)
- Key visual: `image/image/Generated-Image-September-06,-2025---5_17PM.jpeg` (title, endings, chapter title/prologue)
- Path scenes: `...5_38PM` and `...5_39PM` (start/fork and c2_start/c2_fork)
- Party (protagonist/companions): `image/image/party/` (e.g., `syujinkou.jpg`)
- Companions: Fairy=`wisp.jpeg`, Mage=`humingbard.jpeg`
- Bosses: Chapter1=`stone-stair-snake_idle_v2.jpeg`, Chapter2=`iwagolem.jpeg`（`tsuta.jpeg` は今後のボス予定）

Deploy (Vercel)
- Import this repo on Vercel as a static site (no build command).
- Output directory: repo root (contains `index.html`).
- Story extensions
- Flags: set on node entry via `actions: [{ set: { flag:'gateKey', value:true } }]`
- Requirements: gate a choice via `require: { flags:['gateKey'] }` with fallback message `locked: '...'`
- Sequences: `type:'seq'` + `steps:[...]` + `next:'nodeId'` for簡易ノベル演出
