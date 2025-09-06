// Sky Runes - Static Chapter Engine (single-question per node)

const STORY = {
  nodes: {
    // Title & Overview
    title: {
      title: "Sky Runes - Chapter 1",
      html: [
        "豬ｮ蟲ｶ縲医せ繧ｫ繧､繝輔ぅ繝ｼ繝ｫ繝峨峨・縲∫･縺ｮ繝ｫ繝ｼ繝ｳ縺ｧ遨ｺ縺ｫ逡吶∪縺｣縺ｦ縺・ｋ縲・,
        "縺励°縺励亥窮豌励・繝ｫ繝ｼ繝ｳ縲峨′谺縺代∝ｳｶ縺ｯ謠ｺ繧峨℃蟋九ａ縺溪ｦ縲・,
        "縺ゅ↑縺滂ｼ郁ｦ狗ｿ偵＞謗｢邏｢閠・ｼ峨・莉ｻ蜍吶・縲∫･縲朱｢ｨ縺ｮ髢薙上〒繝ｫ繝ｼ繝ｳ縺ｮ谺迚・ｒ蜿悶ｊ謌ｻ縺吶％縺ｨ縲・,
        "<hr>",
        "騾ｲ縺ｿ譁ｹ: 驕薙ｒ驕ｸ縺ｳ縲√け繧､繧ｺ縺ｫ豁｣隗｣縺励※蜈医∈騾ｲ繧ゅ≧・医Α繧ｹ縺ｧHP-1・峨・,
      ].join("<br>"),
      choices: [
        { label: "縺ｯ縺倥ａ繧・, to: "start" },
        { label: "謫堺ｽ懆ｪｬ譏・, to: "howto" },
        { label: "迚ｩ隱槭・閭梧勹", to: "lore" },
        { label: "遶縺ｮ豬√ｌ", to: "map" },
      ],
    },
    howto: {
      title: "謫堺ｽ懆ｪｬ譏・,
      html: [
        "繝ｻ蝗帶萱繧ｯ繧､繧ｺ・壽ｭ｣隗｣縺ｧ蜑埼ｲ縲∬ｪ､遲斐〒HP-1・・P=0縺ｧ謨怜圏・・,
        "繝ｻ繝ｫ繝ｼ繝亥・蟯撰ｼ夐∈繧薙□驕薙〒蜃ｺ鬘後′螟牙喧",
        "繝ｻ閾ｪ蜍輔そ繝ｼ繝厄ｼ夐ｲ陦御ｽ咲ｽｮ縺ｨHP縺ｯ localStorage 縺ｫ菫晏ｭ・,
        "繝ｻ譛蛻昴°繧会ｼ壹お繝ｳ繝・ぅ繝ｳ繧ｰ逕ｻ髱｢縺九√ち繧､繝医Ν縺九ｉ蜀埼幕縺ｧ縺阪∪縺・,
      ].join("<br>"),
      choices: [ { label: "謌ｻ繧・, to: "title" }, { label: "縺ｯ縺倥ａ繧・, to: "start" } ],
    },
    lore: {
      title: "迚ｩ隱槭・閭梧勹",
      html: [
        "蟲ｶ繧貞ｷ｡繧矩｢ｨ縺ｯ繝ｫ繝ｼ繝ｳ縺ｮ蜉隴ｷ縺ｧ菫昴◆繧後ｋ縲・,
        "隕狗ｿ偵＞謗｢邏｢閠・〒縺ゅｋ縺ゅ↑縺溘・縲∫･縲朱｢ｨ縺ｮ髢薙上〒谺迚・ｒ謗｢縺吶％縺ｨ縺ｫ縺ｪ縺｣縺溘・,
        "驕謎ｸｭ縺ｮ繧ｹ繝ｩ繧､繝縺ｯ險闡峨・鬲泌鴨縺ｫ蜿榊ｿ懊☆繧九よｭ｣縺励＞隱槭ｒ驕ｸ縺ｳ縲∝燕縺ｸ騾ｲ繧ゅ≧縲・,
      ].join("<br>"),
      choices: [ { label: "謌ｻ繧・, to: "title" } ],
    },
    map: {
      title: "遶縺ｮ豬√ｌ",
      html: [
        "start・磯％荳ｭ・俄・ fork・育･縺ｮ髢・俄・ shrine・郁ｩｦ邱ｴ・俄・ boss・医Α繝九・繧ｹ・俄・ ending",
        "騾比ｸｭ縺ｧ隱､遲斐☆繧九→HP縺梧ｸ帛ｰ代・P=0縺ｧ謨怜圏・亥・謖第姶蜿ｯ・・,
      ].join("<br>"),
      choices: [ { label: "謌ｻ繧・, to: "title" } ],
    },

    // Main path (single-question nodes)
    start: { title: "Skyfield", text: "豬ｮ蟲ｶ縺ｮ逾縺ｸ蜷代°縺・る％荳ｭ縺ｫ謨ｵ縺後＞繧九・, choices: [
      { label: "蛹励・驕薙∈", to: "enemy1" }, { label: "譚ｱ縺ｮ隹ｷ縺ｸ", to: "enemy2" }
    ] },
    enemy1: { title: "Slime A", text: "闍ｱ蜊倩ｪ槭〒謾ｻ謦・ｼ∵ｭ｣隗｣縺ｧ繝繝｡繝ｼ繧ｸ縲√Α繧ｹ縺ｧHP-1縲・, type: "quiz",
      quiz: [ { q: "book 縺ｮ諢丞袖縺ｯ・・, options:["譛ｬ","迥ｬ","蟾・,"邂ｱ"], a:"譛ｬ" }, { q:"run 縺ｮ驕主悉蠖｢縺ｯ・・, options:["ran","runed","runned","run"], a:"ran" } ],
      next: { ok:"fork", ng:"fork" } },
    enemy2: { title: "Slime B", text: "蝓ｺ遉取枚豕輔け繧､繧ｺ縲・, type: "quiz",
      quiz: [ { q:"I ___ a student.", options:["am","is","are","be"], a:"am" }, { q:"She ___ tennis.", options:["plays","play","played・井ｻ奇ｼ・,"to play"], a:"plays" } ],
      next: { ok:"fork", ng:"fork" } },
    fork: { title: "Shrine Gate", text: "逾縺ｮ蜈･繧雁哨縲ゅΑ繝九・繧ｹ蜑阪↓隰弱ｒ隗｣縺代・, choices: [
      { label: "逾縺ｫ蜈･繧・, to: "shrine" }, { label: "蠑輔″霑斐☆", to: "start" }
    ] },
    shrine: { title: "Shrine Puzzle", text: "豁｣隗｣縺ｧ騾夐℃縲ょ､ｱ謨励☆繧九→HP-1縺ｧ蜀肴倦謌ｦ縲・, type: "quiz",
      quiz: [ { q:"because 縺ｮ諢丞袖縺ｯ・・, options:["縺ｪ縺懊↑繧・,"縺励°縺・,"縺昴ｌ繧・∴","縺昴ｌ縺ｫ繧ゅ°縺九ｏ繧峨★"], a:"縺ｪ縺懊↑繧・ }, { q:"much 縺ｮ豈碑ｼ・ｴ壹・・・, options:["more","most","many","more than"], a:"more" }, { q:"There ___ a pen on the desk.", options:["is","are","be","was"], a:"is" } ],
      next: { ok:"boss", ng:"shrine" } },
    boss: { title: "Mini Boss", text: "譛蠕後・荳蝠擾ｼ・, type: "quiz",
      quiz: [ { q:"縲悟ｽｼ縺ｯ譏ｨ譌･縺薙％縺ｫ譚･縺溘阪ｒ闍ｱ險ｳ縺帙ｈ縲・, options:["He came here yesterday.","He comes here yesterday.","He is here yesterday.","He was come here yesterday."], a:"He came here yesterday." } ],
      next: { ok:"good_end", ng:"bad_end" } },
    good_end: { title: "Clear!", text: "蜍・ｰ励・谺迚・′蜈峨ｊ縲・｢ｨ縺悟ｮ牙ｮ壹＠縺溘ら･縺ｯ髱吶￠縺輔ｒ蜿悶ｊ謌ｻ縺吶よｬ｡遶縺ｧ谿九ｋ谺迚・ｒ謗｢縺昴≧縲・ },
    bad_end: { title: "Game Over", text: "蜉帛ｰｽ縺阪◆窶ｦ 蟲ｶ縺ｮ鬚ｨ縺ｯ縺ｾ縺荳榊ｮ牙ｮ壹□縲よｺ門ｙ繧呈紛縺医※縲√ｂ縺・ｸ蠎ｦ謖第姶縺励ｈ縺・・ },
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
    scene.insertAdjacentHTML('beforeend', `<div class="crumbs">${parts.join(' <span class="sep">竊・/span> ')}</div>`);
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

  // title actions: offer Continue if a save exists
  if (state.node === 'title') {
    try {
      const sn = localStorage.getItem('node');
      const sh = Number(localStorage.getItem('hp')) || 0;
      if (sn && sn !== 'title') {
        const c = document.createElement('button');
        c.className = 'btn btn-primary';
        const t = STORY.nodes[sn]?.title || sn;
        c.textContent = `続きから（${t} / HP:${sh}）`;
        c.onclick = () => { state.node = sn; state.hp = sh || state.hp; save(); render(); };
        choices.appendChild(c);
      }
    } catch {}
  }
  // extra action on title: clear save
  if (state.node === 'title') {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = '繧ｻ繝ｼ繝匁ｶ亥悉';
    b.onclick = () => { clearSave(); state.hp = 5; state.node = 'title'; render(); };
    choices.appendChild(b);
  }
  if (!n?.choices || n.choices.length === 0) {
    const b = document.createElement('button');
    b.textContent = (state.node === 'good_end' || state.node === 'bad_end') ? '譛蛻昴°繧・ : '繧ｿ繧､繝医Ν';
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
