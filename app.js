// ====== story data (inline) ======
const STORY = {
  "nodes": {
    "start": {
      "title": "Skyfield",
      "text": "浮島の祠へ向かう。道中に敵がいる。",
      "choices": [
        {"label": "北の道へ", "to": "enemy1"},
        {"label": "東の谷へ", "to": "enemy2"}
      ]
    },
    "enemy1": {
      "title": "Slime A",
      "text": "英単語で攻撃！正解でダメージ、ミスでHP-1。",
      "type": "quiz",
      "quiz": [
        {"q":"book の意味は？","options":["本","犬","川","箱"],"a":"本"},
        {"q":"run の過去形は？","options":["ran","runed","runned","run"],"a":"ran"}
      ],
      "next": {"ok":"fork", "ng":"fork"}
    },
    "enemy2": {
      "title": "Slime B",
      "text": "基礎文法クイズ。",
      "type": "quiz",
      "quiz": [
        {"q":"I ___ a student.","options":["am","is","are","be"],"a":"am"},
        {"q":"She ___ tennis.","options":["plays","play","played（今）","to play"],"a":"plays"}
      ],
      "next": {"ok":"fork", "ng":"fork"}
    },
    "fork": {
      "title": "Shrine Gate",
      "text": "祠の入り口。ミニボス前に謎を解け（2/3正解で通過）。",
      "choices": [
        {"label": "祠に入る", "to": "shrine"},
        {"label": "引き返す", "to": "start"}
      ]
    },
    "shrine": {
      "title": "Shrine Puzzle",
      "text": "3問中2問正解で通過。失敗するとHP-1で再挑戦。",
      "type": "quiz",
      "quiz": [
        {"q":"because の意味は？","options":["なぜなら","しかし","それゆえ","それにもかかわらず"],"a":"なぜなら"},
        {"q":"much の比較級は？","options":["more","most","many","more than"],"a":"more"},
        {"q":"There ___ a pen on the desk.","options":["is","are","be","was"],"a":"is"}
      ],
      "next": {"ok":"boss", "ng":"shrine"}
    },
    "boss": {
      "title": "Mini Boss",
      "text": "最後の一問！",
      "type": "quiz",
      "quiz": [
        {"q":"「彼は昨日ここに来た」を英訳せよ。","options":["He came here yesterday.","He comes here yesterday.","He is here yesterday.","He was come here yesterday."],"a":"He came here yesterday."}
      ],
      "next": {"ok":"good_end", "ng":"bad_end"}
    },
    "good_end": {"title":"Clear!","text":"章クリア！もう一度遊ぶ？"},
    "bad_end": {"title":"Game Over","text":"また挑戦しよう。"}
  }
};

// ====== game core ======
const state = {
  hp: Number(localStorage.getItem("hp")) || 5,
  node: localStorage.getItem("node") || "start",
  data: STORY
};
const $ = s => document.querySelector(s);
const scene = $("#scene"), dialog = $("#dialog"), choices = $("#choices"), status = $("#status");

function save(){ localStorage.setItem("hp", state.hp); localStorage.setItem("node", state.node); }

function render(){
  const n = state.data.nodes[state.node];
  scene.innerHTML = `<div class="badge">Scene: ${n.title}</div>`;
  dialog.textContent = n.text;
  status.innerHTML = `<span class="badge">HP:${state.hp}</span>`;
  choices.innerHTML = "";

  if(n.type === "quiz"){ return renderQuiz(n); }

  (n.choices||[]).forEach(c=>{
    const b = document.createElement("button");
    b.textContent = c.label;
    b.onclick = ()=>{ state.node = c.to; save(); render(); };
    choices.appendChild(b);
  });

  if(!n.choices || n.choices.length===0){
    const b = document.createElement("button");
    b.textContent = "最初から";
    b.onclick = ()=>{ state.node="start"; state.hp=5; save(); render(); };
    choices.appendChild(b);
  }
}

function renderQuiz(n){
  const q = n.quiz[Math.floor(Math.random()*n.quiz.length)];
  dialog.textContent = q.q;
  q.options.forEach(opt=>{
    const b = document.createElement("button");
    b.textContent = opt;
    b.onclick = ()=>{
      const ok = (opt === q.a);
      state.hp += ok ? 0 : -1;
      if(state.hp<=0){ state.node="bad_end"; }
      else { state.node = ok ? n.next.ok : n.next.ng; }
      save(); render();
    };
    choices.appendChild(b);
  });
}

window.addEventListener("DOMContentLoaded", render);

