// Lightweight question bank (HS entrance level leaning)
// Global `QUESTIONS` consumed by app.js; no fetch (works file://)
// d: 'E' | 'M' | 'H'
// Keep options to 4 items for keyboard hints 1-4

window.QUESTIONS = {
  categories: {
    vocab_basic: [
      { q: "book の意味は？", options:["本","犬","川","箱"], a:"本", d:'E' },
      { q: "river の意味は？", options:["川","山","海","森"], a:"川", d:'E' },
      { q: "courage の意味は？", options:["勇気","知識","正義","友情"], a:"勇気", d:'M' },
      { q: "ancient の意味は？", options:["古代の","現代の","危険な","静かな"], a:"古代の", d:'M' },
    ],
    grammar_basic: [
      { q:"I ___ a student.", options:["am","is","are","be"], a:"am", d:'E' },
      { q:"She ___ tennis.", options:["plays","play","played（今）","to play"], a:"plays", d:'E' },
      { q:"This is ___ pen.", options:["a","an","the","one"], a:"a", d:'E' },
      { q:"Those ___ my books.", options:["are","is","be","was"], a:"are", d:'E' },
    ],
    grammar_tense: [
      { q:"run の過去形は？", options:["ran","runed","runned","run"], a:"ran", d:'E' },
      { q:"彼は昨日ここに来た の英訳は？", options:["He came here yesterday.","He comes here yesterday.","He is here yesterday.","He was come here yesterday."], a:"He came here yesterday.", d:'E' },
      { q:"I have ___ the book.", options:["read","reads","reading","to read"], a:"read", d:'M' },
    ],
    connector_reason: [
      { q:"because の意味は？", options:["なぜなら","しかし","それゆえ","それにもかかわらず"], a:"なぜなら", d:'E' },
      { q:"although の意味は？", options:["〜だけれども","〜にもかかわらず","それゆえ","ところが"], a:"〜だけれども", d:'M' },
      { q:"therefore の意味は？", options:["それゆえ","それにもかかわらず","なぜなら","しかし"], a:"それゆえ", d:'M' },
    ],
  }
};

