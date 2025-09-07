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
    exam_hard: [
      { q:"比較級: She is ( ) than me.", options:["taller","tallest","as tall","more tall"], a:"taller", d:'M', exp:"比較級は tall → taller。more tall は不可。" },
      { q:"受動態: The window ( ) by Ken.", options:["was opened","opened","was open","is opening"], a:"was opened", d:'M', exp:"be + 過去分詞 → was opened。" },
      { q:"関係代名詞: This is the book ( ) I bought.", options:["which","who","whom","where"], a:"which", d:'H', exp:"先行詞book（物）→ which。省略可だが which が基本。" },
      { q:"不定詞: I went to the library ( ) study.", options:["to","for","in order","that"], a:"to", d:'M', exp:"目的の不定詞 to + 動詞の原形（to study）。" },
      { q:"完了: I have ( ) the homework already.", options:["finished","finish","finishing","to finish"], a:"finished", d:'M', exp:"have + 過去分詞 → have finished。" },
      { q:"前置詞: He is good ( ) math.", options:["at","in","for","with"], a:"at", d:'E', exp:"good at ~（～が得意）。" },
    ],
  }
};
