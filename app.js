// Sky Runes - Static Chapter Engine

// ---------------- Story Data ----------------
const STORY = {
  nodes: {
    // Title & Overview
    title: {
      title: "Sky Runes - Chapter 1",
      html: [
        '<div class="hero"><h1 class="logo-main">sky runes</h1><div class="logo-sub">（失われた風の欠片）</div></div>',
        "浮島〈スカイフィールド〉は祠のルーンで空に留まっている。",
        "だが〈勇気のルーン〉が欠け、島はゆっくりと不安定になりつつあった。",
        "見習い探索者のあなたは、祠『風の間』で欠片を回収する任務を受ける。",
        "<hr>",
        "進み方: 道を選び、クイズに正解して先へ進もう（ミスでHP-1）。",
      ].join("<br>"),
      choices: [
        { label: "はじめる", to: "start" },
        { label: "操作説明", to: "howto" },
        { label: "物語の背景", to: "lore" },
        { label: "章の流れ", to: "map" },
      ],
    },
    howto: {
      title: "操作説明",
      html: [
        "・四択クイズ: 正解で前進、誤答でHP-1（HP=0で敗北）",
        "・分岐: 選んだ道で出題内容が変わる",
        "・自動セーブ: 位置とHPは localStorage に保存",
        "・再開/やり直し: タイトルの『続きから』『セーブ消去』で管理",
      ].join("<br>"),
      choices: [ { label: "戻る", to: "title" }, { label: "はじめる", to: "start" } ],
    },
    lore: {
      title: "物語の背景",
      html: [
        "島を巡る風はルーンの加護で保たれている。",
        "欠けたのは〈勇気〉の欠片。祠の内奥に落ちたとも、奪われたとも噂される。",
        "道中の魔物は言葉の力に反応する。正しい語を選び、風の加護を取り戻せ。",
      ].join("<br>"),
      choices: [ { label: "戻る", to: "title" } ],
    },
    map: {
      title: "章の流れ",
      html: [
        "Start（道中）→ Gate（祠の門）→ Shrine（試練）→ Boss（小ボス）→ Ending",
        "誤答でHP-1。HPが0になると敗北（タイトルから再挑戦可）",
      ].join("<br>"),
      choices: [ { label: "戻る", to: "title" } ],
    },

    // Main path (single-question nodes)
    start: { title: "Skyfield", text: "浮島の祠へ向かう。道中に敵がいる。", choices: [
      { label: "北の道へ", to: "enemy1" }, { label: "東の谷へ", to: "enemy2" }
    ] },
    enemy1: { title: "Slime A", text: "英単語で攻撃！正解でダメージ、ミスでHP-1。", type: "quiz",
      quiz: [ { q: "book の意味は？", options:["本","犬","川","箱"], a:"本" }, { q:"run の過去形は？", options:["ran","runed","runned","run"], a:"ran" } ],
      next: { ok:"fork", ng:"fork" } },
    enemy2: { title: "Slime B", text: "基礎文法クイズ。", type: "quiz",
      quiz: [ { q:"I ___ a student.", options:["am","is","are","be"], a:"am" }, { q:"She ___ tennis.", options:["plays","play","played（今）","to play"], a:"plays" } ],
      next: { ok:"fork", ng:"fork" } },
    fork: { title: "Shrine Gate", text: "祠の入り口。ミニボス前に謎を解け。", choices: [
      { label: "祠に入る", to: "shrine" }, { label: "引き返す", to: "start" }
    ] },
    shrine: { title: "Shrine Puzzle", text: "正解で通過。失敗するとHP-1で再挑戦。", type: "quiz",
      quiz: [ { q:"because の意味は？", options:["なぜなら","しかし","それゆえ","それにもかかわらず"], a:"なぜなら" }, { q:"much の比較級は？", options:["more","most","many","more than"], a:"more" }, { q:"There ___ a pen on the desk.", options:["is","are","be","was"], a:"is" } ],
      next: { ok:"boss", ng:"shrine" } },
    boss: { title: "Mini Boss", text: "最後の一問！", type: "quiz",
      quiz: [ { q:"「彼は昨日ここに来た」を英訳せよ。", options:["He came here yesterday.","He comes here yesterday.","He is here yesterday.","He was come here yesterday."], a:"He came here yesterday." } ],
      next: { ok:"good_end", ng:"bad_end" } },
    good_end: { title: "Clear!", text: "勇気の欠片が光り、風が安定した。祠は静けさを取り戻す。次章で残る欠片を探そう。" },
    bad_end: { title: "Game Over", text: "力尽きた… 島の風はまだ不安定だ。準備を整えて、もう一度挑戦しよう。" },
  }
};

// ---------------- Engine ----------------
const state = {
  hp: Number(localStorage.getItem('hp')) || 5,
  node: 'title',
  data: STORY,
  intro: {},
};

const $ = (s) => document.querySelector(s);
const scene = $('#scene'), dialog = $('#dialog'), choices = $('#choices'), status = $('#status');

function save(){ localStorage.setItem('hp', state.hp); localStorage.setItem('node', state.node); }
function clearSave(){ try { localStorage.removeItem('hp'); localStorage.removeItem('node'); } catch {} }

// ---------------- Sound (WebAudio, tiny beeps) ----------------
const sound = {
  enabled: (()=>{ try { return localStorage.getItem('se') !== '0'; } catch { return true; } })(),
  ctx: null,
  play(type){
    try {
      if (!this.enabled) return;
      if (!this.ctx) this.ctx = new (window.AudioContext||window.webkitAudioContext)();
      const now = this.ctx.currentTime;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      o.frequency.value = type==='ok'? 880 : type==='ng'? 220 : 440;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.12, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + (type==='ng'? 0.25 : 0.12));
      o.connect(g).connect(this.ctx.destination);
      o.start(now);
      o.stop(now + (type==='ng'? 0.28 : 0.14));
    } catch {}
  },
  toggle(){ this.enabled = !this.enabled; try { localStorage.setItem('se', this.enabled? '1':'0'); } catch {} }
};

function stepIndex(id){
  if (id==='start' || id==='enemy1' || id==='enemy2') return 0; // 道中扱い
  if (id==='fork') return 1;
  if (id==='shrine') return 2;
  if (id==='boss') return 3;
  return 4;
}
function stepLabel(id){
  if (id==='start' || id==='enemy1' || id==='enemy2') return 'Start';
  if (id==='fork') return 'Gate';
  if (id==='shrine') return 'Shrine';
  if (id==='boss') return 'Boss';
  return 'End';
}

// Artwork mapping per node (optional)
const ART = {
  start: 'image/sky runes.jpg',
  enemy1: 'image/stone-stair-snake_idle_v2.jpeg',
  enemy2: 'image/stone-block-golem_idle_v2.jpeg',
  fork: 'image/sky runes.jpg',
  shrine: 'image/syujinkou.jpg',
  boss: 'image/stone-block-golem_idle_v2.jpeg',
  good_end: 'image/sky runes.jpg',
  bad_end: 'image/sky runes.jpg',
};

// Short flavor lines for each scene
const FLAVOR = {
  start: '風が路を描き、浮島の草がささやく。',
  enemy1: '言葉に反応する粘体が道をふさぐ。',
  enemy2: '谷間に冷たい気流。耳を澄ませ。',
  fork: '祠の門は静かに風を吐き出している。',
  shrine: '石壁に刻まれた古い符、かすかな囁き。',
  boss: '薄明かりの中、影がこちらを見ている。',
  good_end: '風は落ち着き、空は澄みわたった。',
  bad_end: '暗い気流が島を覆う――まだ終わらない。',
};

function render(){
  const n = state.data.nodes[state.node];
  // header + progress
  scene.innerHTML = `<span class="badge">Scene: ${n.title}</span>`;
  const flowNodes = ['start','enemy1','enemy2','fork','shrine','boss','good_end','bad_end'];
  if (flowNodes.includes(state.node)) {
    const cur = stepIndex(state.node);
    const labels = ['Start','Gate','Shrine','Boss','End'];
    const parts = labels.map((lb,i)=> i<cur?`<span class="crumb done">${lb}</span>`: i===cur?`<span class="crumb cur">${lb}</span>`:`<span class="crumb">${lb}</span>`);
    scene.insertAdjacentHTML('beforeend', `<div class="crumbs">${parts.join(' <span class="sep">→</span> ')}</div>`);
    // scene artwork
    const artSrc = ART[state.node] || null;
    const old = scene.querySelector('.illust');
    if (old) old.remove();
    if (artSrc) {
      const fig = document.createElement('figure');
      fig.className = 'illust';
      const img = document.createElement('img');
      img.id = 'artimg';
      img.alt = stepLabel(state.node);
      img.src = artSrc;
      fig.appendChild(img);
      scene.appendChild(fig);
    }
    // flavor line
    const fl = FLAVOR[state.node];
    const oldF = scene.querySelector('.flavor');
    if (oldF) oldF.remove();
    if (fl) {
      const p = document.createElement('div');
      p.className = 'flavor';
      p.textContent = fl;
      scene.appendChild(p);
    }
  }

  // body
  if (n && n.html) dialog.innerHTML = n.html; else dialog.textContent = n?.text || '';
  // status
  status.innerHTML = `<span class="badge">HP:${state.hp}</span>`;

  // intro gate: once per session for key nodes
  const __introTargets = { start:1, fork:1, shrine:1, boss:1 };
  if (__introTargets[state.node] && !state.intro[state.node]) {
    const text = FLAVOR[state.node] || '';
    if (text) dialog.innerHTML = `<p>${text}</p>`;
    choices.innerHTML = '';
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = '進む';
    btn.onclick = ()=>{ state.intro[state.node] = true; render(); };
    choices.appendChild(btn);
    const firstBtn = choices.querySelector('button');
    if (firstBtn) try { firstBtn.focus({ preventScroll:true }); } catch {}
    return;
  }

  // choices
  choices.innerHTML = '';
  if (n && n.type === 'quiz') return renderQuiz(n);
  (n?.choices || []).forEach(c => {
    const b = document.createElement('button');
    b.textContent = c.label;
    b.onclick = () => { sound.play('nav'); state.node = c.to; save(); render(); };
    choices.appendChild(b);
  });

  // title: show Continue if a save exists, and Clear
  if (state.node === 'title') {
    try {
      const sn = localStorage.getItem('node');
      const sh = Number(localStorage.getItem('hp')) || 0;
      if (sn && sn !== 'title') {
        const c = document.createElement('button');
        c.className = 'btn btn-primary';
        const t = STORY.nodes[sn]?.title || sn;
        c.textContent = `続きから（${t} / HP:${sh}）`;
        c.onclick = () => { sound.play('nav'); state.node = sn; state.hp = sh || state.hp; save(); render(); };
        choices.appendChild(c);
        // also attach a small note under dialog
        const note = document.createElement('div');
        note.className = 'muted';
        note.textContent = `前回到達: ${stepLabel(sn)}`;
        dialog.appendChild(note);
      }
    } catch {}
    // sound toggle
    const tgl = document.createElement('button');
    tgl.className = 'btn';
    tgl.textContent = `サウンド: ${sound.enabled? 'ON':'OFF'}`;
    tgl.onclick = () => { sound.toggle(); tgl.textContent = `サウンド: ${sound.enabled? 'ON':'OFF'}`; sound.play('nav'); };
    choices.appendChild(tgl);
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'セーブ消去';
    b.onclick = () => { clearSave(); state.hp = 5; state.node = 'title'; render(); };
    choices.appendChild(b);
  }

  // endings: add back-to-title button
  if (!n?.choices || n.choices.length === 0) {
    const b = document.createElement('button');
    b.textContent = (state.node === 'good_end' || state.node === 'bad_end') ? '最初から' : 'タイトル';
    b.onclick = () => { state.node = 'title'; state.hp = 5; save(); render(); };
    choices.appendChild(b);
  }

  // focus first actionable button for accessibility
  const firstBtn = choices.querySelector('button');
  if (firstBtn) try { firstBtn.focus({ preventScroll: true }); } catch {}
}

function renderQuiz(n){
  const q = n.quiz[Math.floor(Math.random()*n.quiz.length)];
  dialog.textContent = q.q;
  q.options.forEach(opt => {
    const b = document.createElement('button');
    b.textContent = opt;
    b.onclick = () => {
      const ok = (opt === q.a);
      if (!ok) state.hp -= 1;
      sound.play(ok? 'ok' : 'ng');
      state.node = (state.hp <= 0) ? 'bad_end' : (ok ? n.next.ok : n.next.ng);
      save(); render();
    };
    choices.appendChild(b);
  });

  // show number hints 1..n for keyboard users
  const hint = document.createElement('div');
  hint.className = 'muted';
  hint.textContent = '数字キー 1-4 で選択';
  choices.appendChild(hint);
}

// keyboard shortcuts for choices (1..9)
window.addEventListener('keydown', (e)=>{
  if (!/^[1-9]$/.test(e.key)) return;
  const idx = Number(e.key) - 1;
  const btns = Array.from(choices.querySelectorAll('button'));
  if (btns[idx]) { e.preventDefault(); btns[idx].click(); }
});

window.addEventListener('DOMContentLoaded', () => {
  // ARIA roles for dialog/status
  try {
    dialog.setAttribute('role','region');
    dialog.setAttribute('aria-live','polite');
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    choices.setAttribute('role','group');
  } catch {}
  render();
});
