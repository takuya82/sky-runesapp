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
        { label: "第2章（準備中）", to: "c2_title" },
        { label: "第3章（準備中）", to: "c3_title" },
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
      { label: "北の道へ", to: "enemy1" }, { label: "東の谷へ", to: "enemy2" },
      { label: "風の囁きを聞く", to: "meet_fairy" }
    ] },
    // Companion: Fairy encounter
    meet_fairy: { title: "Wind Fairy", type:'seq', steps:[
      'かすかな鈴の音。小さな妖精が風の縁に現れた。',
      '『旅の人、言葉の迷いがあれば、そっと手を貸すよ』',
    ], next:'meet_fairy_join' },
    meet_fairy_join: { title:'Fairy Joins', text:'〈風の妖精〉が同行した。困ったとき、選択肢を少し絞ってくれる。', actions:[{ set:{ flag:'allyFairy', value:true } }], choices:[
      { label:'道へ戻る', to:'start' }
    ] },
    enemy1: { title: "Slime A", text: "英単語・時制クイズ！正解で前進、ミスでHP-1。", type: "quiz",
      bank: { use: ['vocab_basic','grammar_tense'] },
      next: { ok:"fork", ng:"fork" } },
    enemy2: { title: "Slime B", text: "基礎文法クイズ。", type: "quiz",
      bank: { use: ['grammar_basic'] },
      next: { ok:"fork", ng:"fork" } },
    fork: { title: "Shrine Gate", text: "祠の入り口。ミニボス前に謎を解け。", choices: [
      { label: "祠に入る", to: "shrine", require: { flags:['gateKey'] }, locked: '扉は固く閉ざされている。風の鍵が必要だ。' },
      { label: "鍵を探す", to: "ruins" },
      { label: "引き返す", to: "start" }
    ] },
    // Small side story to obtain a key
    ruins: { title: "Old Ruins", type: 'seq', steps: [
      '門の脇に、古びた祠への小道が延びている。',
      '蔦をかき分けると、石碑に風のルーンが刻まれていた。',
      'あなたが手を触れると、淡い光が走る――',
    ], next: 'ruins_key' },
    ruins_key: { title: "Wind Key", text: "〈風の鍵〉を手に入れた。祠の門で使えそうだ。", actions:[{ set:{ flag:'gateKey', value:true } }], choices:[
      { label: '門へ戻る', to: 'fork' }
    ] },
    shrine: { title: "Shrine Puzzle", text: "正解で通過。失敗するとHP-1で再挑戦。", type: "quiz",
      bank: { use: ['connector_reason','grammar_basic','grammar_tense'] },
      next: { ok:"boss", ng:"shrine" } },
    boss: { title: "Mini Boss", text: "最後の勝負。正解で突破、ミスでHP-1。", type: "quiz",
      bank: { use: ['exam_hard'] },
      next: { ok:"good_end", ng:"bad_end" } },
    good_end: { title: "Clear!", text: "勇気の欠片が光り、風が安定した。祠は静けさを取り戻す。次章で残る欠片を探そう。", actions:[{ set:{ flag:'ch1_clear', value:true } }] },
    bad_end: { title: "Game Over", text: "力尽きた… 島の風はまだ不安定だ。準備を整えて、もう一度挑戦しよう。" },
    
    // ---------- Chapter 2 (Skeleton) ----------
    c2_title: {
      title: "Sky Runes - Chapter 2",
      html: [
        '<div class="hero"><h1 class="logo-main">sky runes</h1><div class="logo-sub">（風の行方、遠征編）</div></div>',
        "祠の静けさの奥で、別の風が目を覚ます。",
        "あなたは北東の浮島帯〈ミストコースト〉へ向かうことになった。",
        "<hr>",
        "第2章はひな型。道中→門→試練→小ボス→結末の流れは同じだが、難度が少し上がる。",
      ].join('<br>'),
      choices: [
        { label: "第2章をはじめる", to: "c2_prologue" },
        { label: "タイトルへ", to: "title" },
      ],
    },
    // Chapter 2 prologue (seq)
    c2_prologue: { title: "Mist Coast - Prologue", type:'seq', steps:[
      '浮島帯〈ミストコースト〉。薄い霧が風に巻かれて、空の道を流れていく。',
      'あなたは風の痕跡を追い、対岸の門へ向かう――',
    ], next: 'c2_start' },
    c2_start: { title: "Mist Coast", text: "霧のかかる浮島帯。まずは偵察だ。", choices: [
      { label: "東へ進む", to: "c2_enemy1" }, { label: "南の断崖へ", to: "c2_enemy2" }
    ] },
    c2_enemy1: { title: "Wisp Pack", text: "語彙・時制の確認。", type: 'quiz', bank:{ use:['vocab_basic','grammar_tense'] }, next:{ ok:'c2_fork', ng:'c2_fork' } },
    c2_enemy2: { title: "Stone Imp", text: "基礎文法の確認。", type: 'quiz', bank:{ use:['grammar_basic'] }, next:{ ok:'c2_fork', ng:'c2_fork' } },
    c2_fork: { title: "Sea Gate", text: "潮の門。対岸へ渡るには試練を越えよ。", choices:[
      { label: "試練へ", to: 'c2_shrine_intro' },
      { label: "霧の碑を調べる", to: 'c2_side' },
      { label: "灯台に立ち寄る", to: 'c2_meet_mage' },
      { label: "戻る", to: 'c2_start' }
    ] },
    // Shrine intro (seq)
    c2_shrine_intro: { title: "Before the Trial", type:'seq', steps:[
      '潮の音が霧に吸い込まれていく。',
      '門の前で、あなたは深呼吸をした。',
      '（霧の護符があれば、少しだけ楽になるはずだ）',
    ], next:'c2_shrine' },
    // Companion: Mage encounter with one-time shield
    c2_meet_mage: { title:'Lighthouse Mage', type:'seq', steps:[
      '朽ちた灯台に灯がともる。外套の人物があなたを見つめた。',
      '『風の巡りを正す旅か。ならば一時の護りを授けよう』',
    ], next:'c2_meet_mage_gift' },
    c2_meet_mage_gift: { title:'Mage’s Ward', text:'〈灯台の魔導〉が同行した。次に受けるはずのダメージを一度だけ無効化する。', actions:[{ set:{ flag:'allyMage', value:true } }, { set:{ flag:'mageShield', value:true } }], choices:[
      { label:'門へ戻る', to:'c2_fork' }
    ] },
    // Side event: obtain Mist Charm that eases the shrine trial
    c2_side: { title: 'Fog Shrine', type:'seq', steps:[
      '門の足元に、霧の碑が埋もれている。',
      '微かな符が浮かび、風が円を描いた。',
    ], next:'c2_side_charm' },
    c2_side_charm: { title:'Mist Charm', text:'〈霧の護符〉を手に入れた。霧を裂く加護で、試練が少し楽になる。', actions:[{ set:{ flag:'mistCharm', value:true } }], choices:[
      { label:'門へ戻る', to:'c2_fork' }
    ] },
    c2_shrine: { title: "Mist Trial", text: "接続詞と時制の応用。霧の護符があれば合格基準が少し下がる。", type:'quiz', bank:{ use:['connector_reason','grammar_tense'] }, next:{ ok:'c2_boss_intro', ng:'c2_shrine' } },
    // Boss intro (seq)
    c2_boss_intro: { title:"Mist Guardian - Arrival", type:'seq', steps:[
      '霧がほどけ、石像の目に蒼い光が灯る。',
      '『問おう。風はどこから来て、どこへ還る？』',
    ], next:'c2_boss' },
    c2_boss: { title: "Mist Guardian", text: "守護者の問い。", type:'quiz', bank:{ use:['exam_hard'] }, next:{ ok:'c2_good_end', ng:'c2_bad_end' } },
    c2_good_end: { title: "Chapter 2 Clear (Template)", text: "霧が晴れ、遠くに光の筋が見えた。第3章へ続く。", actions:[{ set:{ flag:'ch2_clear', value:true } }], choices:[ { label:'タイトルへ', to:'title' } ] },
    c2_bad_end: { title: "Chapter 2 Failed (Template)", text: "霧に迷い込んだ…体勢を立て直そう。", choices:[ { label:'第2章タイトル', to:'c2_title' } ] },

    // ---------- Chapter 3 (Skeleton) ----------
    c3_title: {
      title: "Sky Runes - Chapter 3",
      html: [
        '<div class="hero"><h1 class="logo-main">sky runes</h1><div class="logo-sub">（蔦の迷宮、南縁）</div></div>',
        "南縁〈サウスリム〉。蔦と岩が絡み合う迷宮帯。",
        "風の巡りは複雑で、ときに戻り、ときに絡む――",
        "<hr>",
        "第3章はひな型。道中→門→試練→小ボス→結末の流れは同じだが、守護は『蔦』の気配を帯びている。",
      ].join('<br>'),
      choices: [
        { label: "第3章をはじめる", to: "c3_prologue" },
        { label: "タイトルへ", to: "title" },
      ],
    },
    c3_prologue: { title: "Vine Labyrinth - Prologue", type:'seq', steps:[
      '南縁。大小の岩が浮かび、蔦が橋のように島を繋ぐ。',
      'あなたは絡まる風の筋をほどきながら、迷宮帯へ踏み入れた。',
    ], next: 'c3_start' },
    c3_start: { title: "South Rim", text: "視界の端で、蔦が生きもののように揺れた。", choices:[
      { label: '西の茂みへ', to:'c3_enemy1' }, { label:'南の裂け目へ', to:'c3_enemy2' }
    ] },
    c3_enemy1: { title: 'Sky Fish', text:'語彙・基礎文法。', type:'quiz', bank:{ use:['vocab_basic','grammar_basic'] }, next:{ ok:'c3_fork', ng:'c3_fork' } },
    c3_enemy2: { title: 'Cobolt', text:'時制・接続。', type:'quiz', bank:{ use:['grammar_tense','connector_reason'] }, next:{ ok:'c3_fork', ng:'c3_fork' } },
    c3_fork: { title:'Vine Gate', text:'蔦で編まれた門。向こう側に風の綾が見える。', choices:[
      { label:'試練へ', to:'c3_shrine_intro' }, { label:'戻る', to:'c3_start' }
    ] },
    c3_shrine_intro: { title:'Before the Trial', type:'seq', steps:[
      '蔦のざわめき。風は道を示すのか、それとも惑わすのか。',
    ], next:'c3_shrine' },
    c3_shrine: { title:'Vine Trial', text:'比較や関係の基礎を問う。', type:'quiz', bank:{ use:['exam_hard','grammar_tense'] }, next:{ ok:'c3_boss_intro', ng:'c3_shrine' } },
    c3_boss_intro: { title:'Vine Warden - Arrival', type:'seq', steps:[
      '門上の蔦が一斉にほどけ、形を成す。',
      '『道は一つではない。では、今はどの道を選ぶ？』',
    ], next:'c3_boss' },
    c3_boss: { title:'Vine Warden', text:'守護の問い。', type:'quiz', bank:{ use:['exam_hard'] }, next:{ ok:'c3_good_end', ng:'c3_bad_end' } },
    c3_good_end: { title:'Chapter 3 Clear (Template)', text:'蔦の迷いはほどけ、南縁に静かな風が戻った。', actions:[{ set:{ flag:'ch3_clear', value:true } }], choices:[ { label:'タイトルへ', to:'title' } ] },
    c3_bad_end: { title:'Chapter 3 Failed (Template)', text:'蔦のざわめきに呑まれた…もう一度挑もう。', choices:[ { label:'第3章タイトル', to:'c3_title' } ] },
  }
};

// ---------------- Engine ----------------
const state = {
  hp: Number(localStorage.getItem('hp')) || 5,
  node: 'title',
  data: STORY,
  intro: {},
  flags: (()=>{ try { return JSON.parse(localStorage.getItem('flags')||'{}'); } catch { return {}; } })(),
  visited: {},
  lastNode: null,
  seq: {},
  session: null, // quiz session state
};

const $ = (s) => document.querySelector(s);
const scene = $('#scene'), dialog = $('#dialog'), choices = $('#choices'), status = $('#status');

function save(){
  localStorage.setItem('hp', state.hp);
  localStorage.setItem('node', state.node);
  try { localStorage.setItem('flags', JSON.stringify(state.flags||{})); } catch {}
}
function clearSave(){
  try { localStorage.removeItem('hp'); localStorage.removeItem('node'); localStorage.removeItem('flags'); } catch {}
}

// flags helpers
function setFlag(k,v){ state.flags[k] = (v===undefined? true : v); save(); }
function hasFlag(k){ return !!state.flags[k]; }

// pause helper
function pauseToTitle(){
  try { save(); } catch {}
  sound.play('nav');
  state.node = 'title';
  render();
}

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

function normId(id){ return (id||'').replace(/^c\d+_/, ''); }
function stepIndex(id){
  const x = normId(id);
  if (x==='start' || x==='enemy1' || x==='enemy2') return 0; // 道中扱い
  if (x==='fork') return 1;
  if (x==='shrine') return 2;
  if (x==='boss') return 3;
  return 4;
}
function stepLabel(id){
  const x = normId(id);
  if (x==='start' || x==='enemy1' || x==='enemy2') return 'Start';
  if (x==='fork') return 'Gate';
  if (x==='shrine') return 'Shrine';
  if (x==='boss') return 'Boss';
  return 'End';
}

// Artwork mapping per node (optional)
const ART = {
  // Opening / key visual
  title: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  start: 'image/image/Generated-Image-September-06,-2025---5_38PM.jpeg',
  // Enemies
  enemy1: 'image/image/fuwakumo-slaim.jpeg', // fluffy cloud slime
  enemy2: 'image/image/wisp.jpeg',            // wisp
  // Gate / Shrine / Boss
  fork: 'image/image/Generated-Image-September-06,-2025---5_39PM.jpeg',
  ruins: 'image/image/tsuta.jpeg',
  ruins_key: 'image/image/syujinkou.jpg',
  meet_fairy: 'image/image/party/Generated-Image-September-06,-2025---5_50PM.jpeg',
  meet_fairy_join: 'image/image/party/Generated-Image-September-06,-2025---5_50PM.jpeg',
  shrine: 'image/image/syujinkou.jpg',        // protagonist at shrine
  boss: 'image/image/stone-stair-snake_idle_v2.jpeg',          // boss (snake)
  // Endings
  good_end: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  bad_end:  'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  // Chapter 2
  c2_title: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  c2_start: 'image/image/Generated-Image-September-06,-2025---5_38PM.jpeg',
  c2_enemy1: 'image/image/wisp.jpeg',
  c2_enemy2: 'image/image/stone-block-golem_idle_v2.jpeg',
  c2_fork: 'image/image/Generated-Image-September-06,-2025---5_39PM.jpeg',
  c2_shrine: 'image/image/syujinkou.jpg',
  c2_boss: 'image/image/iwagolem.jpeg',
  c2_good_end: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  c2_bad_end: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  c2_prologue: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  c2_side: 'image/image/tsuta.jpeg',
  c2_side_charm: 'image/image/syujinkou.jpg',
  c2_meet_mage: 'image/image/humingbard.jpeg',
  c2_meet_mage_gift: 'image/image/humingbard.jpeg',
  c2_shrine_intro: 'image/image/syujinkou.jpg',
  c2_boss_intro: 'image/image/iwagolem.jpeg',
  // Chapter 3
  c3_title: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  c3_prologue: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  c3_start: 'image/image/Generated-Image-September-06,-2025---5_38PM.jpeg',
  c3_enemy1: 'image/image/skyfish.jpeg',
  c3_enemy2: 'image/image/cobolt.jpeg',
  c3_fork: 'image/image/Generated-Image-September-06,-2025---5_39PM.jpeg',
  c3_shrine_intro: 'image/image/syujinkou.jpg',
  c3_shrine: 'image/image/syujinkou.jpg',
  c3_boss_intro: 'image/image/tsuta.jpeg',
  c3_boss: 'image/image/tsuta.jpeg',
  c3_good_end: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
  c3_bad_end: 'image/image/Generated-Image-September-06,-2025---5_17PM.jpeg',
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

// Utility: Fisher-Yates shuffle (in place)
function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Quiz session config per node (count = questions per session, pass = min correct)
const QUIZ_CFG = {
  // Chapter 1
  enemy1: { count: 2, pass: 2 },
  enemy2: { count: 2, pass: 2 },
  shrine: { count: 3, pass: 2 },
  boss:   { count: 2, pass: 1 }, // little mini-boss: 2問中1正解で突破
  // Chapter 2
  c2_enemy1: { count: 2, pass: 2 },
  c2_enemy2: { count: 2, pass: 2 },
  c2_shrine: { count: 3, pass: 2 },
  c2_boss:   { count: 2, pass: 1 },
  // Chapter 3
  c3_enemy1: { count: 2, pass: 2 },
  c3_enemy2: { count: 2, pass: 2 },
  c3_shrine: { count: 3, pass: 2 },
  c3_boss:   { count: 2, pass: 1 },
};
function getQuizCfg(id, poolLen){
  const cfg = QUIZ_CFG[id] || { count: 1, pass: 1 };
  const count = Math.max(1, Math.min(cfg.count, poolLen||1));
  let pass = Math.max(1, Math.min(cfg.pass, count));
  // Example: if player obtained the Mist Charm, ease the c2_shrine requirement by 1
  if (id === 'c2_shrine' && hasFlag('mistCharm')) pass = Math.max(1, pass - 1);
  return { count, pass };
}

// Persisted recent-avoidance per node to reduce repetition across runs
function getRecent(id){
  try { return JSON.parse(localStorage.getItem('recent_'+id) || '[]'); } catch { return []; }
}
function pushRecent(id, asked, poolLen){
  try {
    const cap = Math.max(1, Math.min(poolLen-1, Math.ceil(poolLen/2)));
    const prev = getRecent(id);
    const merged = prev.concat(Array.isArray(asked)? asked : []);
    const uniq = Array.from(new Set(merged));
    const tail = uniq.slice(-cap);
    localStorage.setItem('recent_'+id, JSON.stringify(tail));
  } catch {}
}

function render(){
  const n = state.data.nodes[state.node];
  // run onEnter actions once per visit
  if (n && !state.visited[state.node] && n.actions) {
    try {
      n.actions.forEach(act=>{
        if (!act) return;
        if (act.set) setFlag(act.set.flag, act.set.value!==false);
        if (act.hp) { state.hp = Math.max(0, state.hp + (Number(act.hp.add)||0)); }
      });
    } catch {}
  }
  state.visited[state.node] = true;
  // header + progress
  scene.innerHTML = `<span class="badge">Scene: ${n.title}</span>`;
  const flowBase = ['start','enemy1','enemy2','fork','shrine','boss','good_end','bad_end'];
  const isFlow = (id)=> flowBase.includes(normId(id));
  if (isFlow(state.node)) {
    const cur = stepIndex(state.node);
    const crumbs = [
      { label: 'Start',  tip: '道中：start / enemy1 / enemy2' },
      { label: 'Gate',   tip: '祠の門：fork' },
      { label: 'Shrine', tip: '試練：shrine' },
      { label: 'Boss',   tip: '小ボス：boss' },
      { label: 'End',    tip: '結果：good_end / bad_end' },
    ];
    const parts = crumbs.map((c,i)=>{
      const cls = i<cur? 'crumb done' : (i===cur? 'crumb cur' : 'crumb');
      const tip = c.tip.replace(/"/g,'&quot;');
      return `<span class="${cls}" title="${tip}" aria-label="${tip}">${c.label}</span>`;
    });
    scene.insertAdjacentHTML('beforeend', `<div class="crumbs">${parts.join(' <span class="sep">→</span> ')}</div>`);
    // scene artwork (flow nodes)
    const artSrc = ART[state.node] || null;
    const old = scene.querySelector('.illust');
    if (old) old.remove();
    if (artSrc) {
      const fig = document.createElement('figure');
      fig.className = 'illust';
      const img = document.createElement('img');
      img.id = 'artimg';
      img.alt = stepLabel(state.node);
      try { img.loading = 'lazy'; img.decoding = 'async'; } catch {}
      img.src = artSrc;
      // apply saved fit preference
      try { if ((localStorage.getItem('artfit')||'contain') === 'cover') img.classList.add('cover'); } catch {}
      fig.appendChild(img);
      // small control to toggle fit
      const ctrl = document.createElement('div');
      ctrl.className = 'art-controls';
      const btn = document.createElement('button');
      btn.className = 'btn';
      const updateLabel = ()=>{ btn.textContent = `画像表示: ${img.classList.contains('cover')? '拡大（トリミング）':'全体（レターボックス）'}`; };
      updateLabel();
      btn.onclick = () => {
        img.classList.toggle('cover');
        try { localStorage.setItem('artfit', img.classList.contains('cover')? 'cover':'contain'); } catch {}
        updateLabel();
      };
      ctrl.appendChild(btn);
      fig.appendChild(ctrl);
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
  } else if (state.node === 'title') {
    // title artwork (no crumbs on title)
    const artSrc = ART.title || ART[state.node] || null;
    const old = scene.querySelector('.illust');
    if (old) old.remove();
    if (artSrc) {
      const fig = document.createElement('figure');
      fig.className = 'illust title';
      const img = document.createElement('img');
      img.id = 'artimg';
      img.alt = 'Title';
      try { img.loading = 'lazy'; img.decoding = 'async'; } catch {}
      img.src = artSrc;
      try { if ((localStorage.getItem('artfit')||'contain') === 'cover') img.classList.add('cover'); } catch {}
      fig.appendChild(img);
      const ctrl = document.createElement('div');
      ctrl.className = 'art-controls';
      const btn = document.createElement('button');
      btn.className = 'btn';
      const updateLabel = ()=>{ btn.textContent = `画像表示: ${img.classList.contains('cover')? '拡大（トリミング）':'全体（レターボックス）'}`; };
      updateLabel();
      btn.onclick = () => {
        img.classList.toggle('cover');
        try { localStorage.setItem('artfit', img.classList.contains('cover')? 'cover':'contain'); } catch {}
        updateLabel();
      };
      ctrl.appendChild(btn);
      fig.appendChild(ctrl);
      scene.appendChild(fig);
    }
  } else {
    // generic artwork for non-flow scenes if defined
    const artSrc = ART[state.node] || null;
    const old = scene.querySelector('.illust');
    if (old) old.remove();
    if (artSrc) {
      const fig = document.createElement('figure');
      fig.className = 'illust';
      const img = document.createElement('img');
      img.id = 'artimg';
      img.alt = n?.title || 'Scene';
      try { img.loading = 'lazy'; img.decoding = 'async'; } catch {}
      img.src = artSrc;
      // apply saved fit preference
      try { if ((localStorage.getItem('artfit')||'contain') === 'cover') img.classList.add('cover'); } catch {}
      fig.appendChild(img);
      scene.appendChild(fig);
    }
  }

  // body
  if (n && n.type === 'seq') return renderSeq(n);
  if (n && n.html) dialog.innerHTML = n.html; else dialog.textContent = n?.text || '';
  // small context notes for certain flags
  try {
    if (state.node === 'c2_shrine' && hasFlag('mistCharm')) {
      const note = document.createElement('div');
      note.className = 'muted';
      note.textContent = '霧の護符の加護を受けている（合格基準が緩和）。';
      dialog.appendChild(note);
    }
  } catch {}
  // status (numeric + hearts up to 5)
  try {
    const maxHp = 5;
    const hp = Math.max(0, Math.min(maxHp, Number(state.hp)||0));
    const hearts = '♥'.repeat(hp) + '♡'.repeat(Math.max(0, maxHp - hp));
    let allies = [];
    try { if (hasFlag('allyFairy')) allies.push('妖精'); if (hasFlag('allyMage')) allies.push('魔導'); } catch {}
    const allyTxt = allies.length? ` <span class="badge">仲間:${allies.join('・')}</span>` : '';
    const shieldTxt = hasFlag('mageShield') ? ` <span class="badge">盾:1</span>` : '';
    status.innerHTML = `<span class="badge">HP:${state.hp}</span> <span class="hearts" aria-hidden="true">${hearts}</span>${allyTxt}${shieldTxt}`;
  } catch {
    status.innerHTML = `<span class="badge">HP:${state.hp}</span>`;
  }

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
    const gate = checkRequire(c.require);
    if (!gate.ok) {
      b.disabled = true;
      b.title = c.locked || gate.why || '';
    } else {
      b.onclick = () => { sound.play('nav'); state.node = c.to; save(); render(); };
    }
    choices.appendChild(b);
  });

  // pause button (non-title nodes)
  if (state.node !== 'title') {
    const p = document.createElement('button');
    p.className = 'btn';
    p.textContent = '中断（タイトルへ）';
    p.onclick = () => { pauseToTitle(); };
    choices.appendChild(p);
  }

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
    // new game (clear save then start from beginning)
    const ng = document.createElement('button');
    ng.className = 'btn btn-primary';
    ng.textContent = 'ニューゲーム';
    ng.onclick = () => { sound.play('nav'); clearSave(); state.hp = 5; state.node = 'start'; save(); render(); };
    choices.appendChild(ng);
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'セーブ消去';
    b.onclick = () => { clearSave(); state.hp = 5; state.node = 'title'; render(); };
    choices.appendChild(b);

    // chapter select tiles
    try {
      const wrap = document.createElement('div');
      wrap.className = 'card';
      const h = document.createElement('div');
      h.className = 'muted';
      h.textContent = '章選択';
      wrap.appendChild(h);
      const grid = document.createElement('div');
      grid.className = 'grid';
      function tile(label, to, img, badge){
        const t = document.createElement('div');
        t.className = 'tile';
        const im = document.createElement('img'); im.src = img; im.alt = label; t.appendChild(im);
        const cap = document.createElement('div'); cap.className = 'cap'; cap.textContent = label + (badge? ` ／ ${badge}`: ''); t.appendChild(cap);
        t.onclick = ()=>{ sound.play('nav'); state.node = to; render(); };
        return t;
      }
      const b1 = hasFlag('ch1_clear')? 'Clear' : '';
      const b2 = hasFlag('ch2_clear')? 'Clear' : '';
      const b3 = hasFlag('ch3_clear')? 'Clear' : '';
      grid.appendChild(tile('第1章', 'start', ART.start || ART.title, b1));
      grid.appendChild(tile('第2章', 'c2_title', ART.c2_title || ART.title, b2));
      grid.appendChild(tile('第3章', 'c3_title', ART.c3_title || ART.title, b3));
      wrap.appendChild(grid);
      dialog.appendChild(wrap);
    } catch {}
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

function renderSeq(n){
  const id = state.node;
  const steps = n.steps || [];
  const idx = state.seq[id] ?? 0;
  const step = steps[idx] || '';
  dialog.innerHTML = Array.isArray(step) ? step.join('<br>') : step;
  choices.innerHTML = '';
  const more = document.createElement('button');
  more.className = 'btn btn-primary';
  more.textContent = (idx < steps.length-1) ? '続ける' : (n.finalLabel || '進む');
  more.onclick = ()=>{
    if (idx < steps.length-1) { state.seq[id] = idx+1; render(); }
    else { state.seq[id] = 0; state.node = n.next || 'title'; save(); render(); }
  };
  choices.appendChild(more);
}

function selectFromBank(nodeId, n){
  const B = (window.QUESTIONS && window.QUESTIONS.categories) || {};
  const wants = (n.bank && n.bank.use) || [];
  let pool = [];
  wants.forEach(cat=>{ if (Array.isArray(B[cat])) pool = pool.concat(B[cat]); });
  // fallback: if bank empty, use any inline quiz pool
  if (!pool.length && Array.isArray(n.quiz)) pool = n.quiz.slice();
  return pool;
}

function renderQuiz(n){
  // init or resume session
  let pool = Array.isArray(n.quiz) && n.quiz.length ? n.quiz.slice() : selectFromBank(state.node, n);
  const { count, pass } = getQuizCfg(state.node, pool.length);
  if (!state.session || state.session.id !== state.node) {
    state.session = { id: state.node, left: count, ok: 0, asked: [] };
  }
  const sess = state.session;

  // pick a question not asked yet
  const recent = getRecent(state.node);
  let remain = pool.map((_,i)=>i).filter(i=>!sess.asked.includes(i) && !recent.includes(i));
  if (!remain.length) remain = pool.map((_,i)=>i).filter(i=>!sess.asked.includes(i));
  const pickIndex = remain[Math.floor(Math.random()*remain.length)] ?? 0;
  const q = pool[pickIndex];
  sess.asked.push(pickIndex);

  // header/progress
  const solved = count - sess.left;
  const prog = `Q ${solved+1}/${count} ・ 正解 ${sess.ok}/${count} （合格: ${pass}）`;
  dialog.textContent = `${prog}\n${q.q}`;

  // difficulty badge if present (q.d: 'E'|'M'|'H')
  if (q.d) {
    const badge = document.createElement('div');
    badge.className = 'label ' + (q.d==='H'?'label-ng':q.d==='E'?'label-ok':'');
    badge.textContent = `難度: ${q.d}`;
    dialog.appendChild(badge);
  }

  const opts = shuffle((q.options||[]).slice());
  opts.forEach(opt => {
    const b = document.createElement('button');
    b.textContent = opt;
    b.onclick = () => {
      const ok = (opt === q.a);
      if (ok) sess.ok += 1; else {
        // Mage shield prevents damage once
        if (hasFlag('mageShield')) { setFlag('mageShield', false); }
        else { state.hp -= 1; }
        try {
          document.body.classList.remove('hurt');
          void document.body.offsetWidth; // restart animation
          document.body.classList.add('hurt');
          setTimeout(()=>{ document.body.classList.remove('hurt'); }, 320);
        } catch {}
      }
      sound.play(ok? 'ok' : 'ng');
      // button feedback and lock
      try {
        const btns = Array.from(choices.querySelectorAll('button'));
        btns.forEach(x => x.disabled = true);
        b.classList.add(ok ? 'choice-ok' : 'choice-ng');
      } catch {}

      // show brief explanation on wrong answer (or when provided)
      try {
        if (!ok || q.exp) {
          const info = document.createElement('div');
          info.className = 'muted';
          const correct = `正解: ${q.a}`;
          const extra = q.exp ? `　解説: ${q.exp}` : '';
          info.textContent = (!ok ? `${correct}${extra}` : extra);
          choices.appendChild(info);
        }
      } catch {}

      // advance session or finish
      sess.left -= 1;
      const goBad = (state.hp <= 0);
      const delay = ok ? 220 : (q.exp ? 1100 : 420);
      if (!goBad && sess.left > 0) {
        setTimeout(()=>{ render(); }, delay);
        return;
      }
      const passed = (sess.ok >= pass);
      const nextNode = goBad ? 'bad_end' : (passed ? n.next.ok : n.next.ng);
      // persist asked indices to avoid immediate repeats in next encounters
      pushRecent(state.node, sess.asked, pool.length);
      state.session = null;
      setTimeout(()=>{ state.node = nextNode; save(); render(); }, delay);
    };
    choices.appendChild(b);
  });

  const hint = document.createElement('div');
  hint.className = 'muted';
  hint.textContent = '数字キー 1-4 で選択';
  choices.appendChild(hint);

  // Fairy ally: one-click hint to eliminate two wrong options
  try {
    if (hasFlag('allyFairy')) {
      const hb = document.createElement('button');
      hb.className = 'btn';
      hb.textContent = '妖精にヒントを聞く';
      hb.onclick = () => {
        hb.disabled = true;
        const btns = Array.from(choices.querySelectorAll('button'));
        const wrong = btns.filter(b=>b.textContent!==q.a);
        shuffle(wrong).slice(0, Math.max(0, wrong.length - 2)).forEach(b=> b.remove());
      };
      choices.appendChild(hb);
    }
  } catch {}

  // pause button inside quiz
  const p = document.createElement('button');
  p.className = 'btn';
  p.textContent = '中断（タイトルへ）';
  p.onclick = () => { pauseToTitle(); };
  choices.appendChild(p);
}

// keyboard shortcuts for choices (1..9)
window.addEventListener('keydown', (e)=>{
  // Number keys: select choices 1..9
  if (/^[1-9]$/.test(e.key)) {
    const idx = Number(e.key) - 1;
    const btns = Array.from(choices.querySelectorAll('button'));
    if (btns[idx]) { e.preventDefault(); btns[idx].click(); }
    return;
  }
  const k = (e.key||'').toLowerCase();
  // 'm' = mute/unmute
  if (k === 'm') { e.preventDefault(); sound.toggle(); sound.play('nav'); render(); return; }
  // 'q' or 'Escape' = pause to title (save and go title)
  if ((k === 'q') || (e.key === 'Escape')) { e.preventDefault(); pauseToTitle(); return; }
  // At title only: 'c' = continue if save exists
  if (k === 'c' && state.node === 'title') {
    try {
      const sn = localStorage.getItem('node');
      const sh = Number(localStorage.getItem('hp')) || 0;
      if (sn && sn !== 'title') { e.preventDefault(); sound.play('nav'); state.node = sn; state.hp = sh || state.hp; save(); render(); }
    } catch {}
    return;
  }
  // At title only: 'r' = clear save
  if (k === 'r' && state.node === 'title') { e.preventDefault(); clearSave(); state.hp = 5; state.node = 'title'; render(); return; }
  // At title only: 'n' = new game (clear + start)
  if (k === 'n' && state.node === 'title') { e.preventDefault(); clearSave(); state.hp = 5; state.node = 'start'; save(); render(); return; }
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
  // Optional: reset save via URL flag (?reset)
  try {
    const params = new URLSearchParams(window.location.search || '');
    if (params.has('reset')) { clearSave(); state.hp = 5; state.node = 'title'; }
  } catch {}
  render();
});
// Choice requirement check
function checkRequire(req){
  if (!req) return { ok:true };
  if (req.minHp!=null && state.hp < req.minHp) return { ok:false, why:`HPが足りない（必要:${req.minHp}）` };
  if (req.maxHp!=null && state.hp > req.maxHp) return { ok:false, why:`HPが高すぎる（上限:${req.maxHp}）` };
  const need = req.flags||req.require||[];
  for (const f of need) if (!hasFlag(f)) return { ok:false, why:`${f} が必要` };
  const forbid = req.forbid||[];
  for (const f of forbid) if (hasFlag(f)) return { ok:false, why:`${f} を所持中は進めない` };
  return { ok:true };
}
