// Sky Runes - Static Chapter Engine (single-question per node)

const STORY = {
  nodes: {
    // Title & Overview
    title: {
      title: "Sky Runes - Chapter 1",
      html: [
        "浮島〈スカイフィールド〉は、祠のルーンで空に留まっている。",
        "しかし〈勇気のルーン〉が欠け、島は揺らぎ始めた…。",
        "あなた（見習い探索者）の任務は、祠『風の間』でルーンの欠片を取り戻すこと。",
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
        "・四択クイズ：正解で前進、誤答でHP-1（HP=0で敗北）",
        "・ルート分岐：選んだ道で出題が変化",
        "・自動セーブ：進行位置とHPは localStorage に保存",
        "・最初から：エンディング画面か、タイトルから再開できます",
      ].join("<br>"),
      choices: [ { label: "戻る", to: "title" }, { label: "はじめる", to: "start" } ],
    },
    lore: {
      title: "物語の背景",
      html: [
        "島を巡る風はルーンの加護で保たれる。",
        "見習い探索者であるあなたは、祠『風の間』で欠片を探すことになった。",
        "道中のスライムは言葉の魔力に反応する。正しい語を選び、前へ進もう。",
      ].join("<br>"),
      choices: [ { label: "戻る", to: "title" } ],
    },
    map: {
      title: "章の流れ",
      html: [
        "start（道中）→ fork（祠の門）→ shrine（試練）→ boss（ミニボス）→ ending",
        "途中で誤答するとHPが減少。HP=0で敗北（再挑戦可）",
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

// Engine ----------------------------------------------------
const state = {
  hp: Number(localStorage.getItem('hp')) || 5,
  node: localStorage.getItem('node') || 'title',
  data: STORY,
};

const $ = (s) => document.querySelector(s);
const scene = $('#scene'), dialog = $('#dialog'), choices = $('#choices'), status = $('#status');

function save(){ localStorage.setItem('hp', state.hp); localStorage.setItem('node', state.node); }
function clearSave(){ try { localStorage.removeItem('hp'); localStorage.removeItem('node'); } catch {} }

function render(){
  const n = state.data.nodes[state.node];
  // header + progress
  scene.innerHTML = `<span class="badge">Scene: ${n.title}</span>`;
  const flowNodes = ['start','enemy1','enemy2','fork','shrine','boss','good_end','bad_end'];
  if (flowNodes.includes(state.node)) {
    const idx = (id)=> id==='start'?0:id==='fork'?1:id==='shrine'?2:id==='boss'?3:4;
    const cur = idx(state.node);
    const labels = ['Start','Gate','Shrine','Boss','End'];
    const parts = labels.map((lb,i)=> i<cur?`<span class="crumb done">${lb}</span>`: i===cur?`<span class="crumb cur">${lb}</span>`:`<span class="crumb">${lb}</span>`);
    scene.insertAdjacentHTML('beforeend', `<div class="crumbs">${parts.join(' <span class="sep">→</span> ')}</div>`);
  }
  // body
  if (n && n.html) dialog.innerHTML = n.html; else dialog.textContent = n?.text || '';
  // status
  status.innerHTML = `<span class="badge">HP:${state.hp}</span>`;
  // choices
  choices.innerHTML = '';
  if (n && n.type === 'quiz') return renderQuiz(n);
  (n?.choices || []).forEach(c => {
    const b = document.createElement('button');
    b.textContent = c.label;
    b.onclick = () => { state.node = c.to; save(); render(); };
    choices.appendChild(b);
  });
  // extra action on title: clear save
  if (state.node === 'title') {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'セーブ消去';
    b.onclick = () => { clearSave(); state.hp = 5; state.node = 'title'; render(); };
    choices.appendChild(b);
  }
  if (!n?.choices || n.choices.length === 0) {
    const b = document.createElement('button');
    b.textContent = (state.node === 'good_end' || state.node === 'bad_end') ? '最初から' : 'タイトル';
    b.onclick = () => { state.node = 'title'; state.hp = 5; save(); render(); };
    choices.appendChild(b);
  }
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
      if (state.hp <= 0) state.node = 'bad_end'; else state.node = ok ? n.next.ok : n.next.ng;
      save(); render();
    };
    choices.appendChild(b);
  });
}

window.addEventListener('DOMContentLoaded', render);
