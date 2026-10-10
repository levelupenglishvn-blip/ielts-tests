/* =====================================================================
   Master Practice Library — static teaching content (public; no student data here).
   Loaded by index.html AFTER js/practice.js.

   TO ADD A MODULE: add one object to the list below (or call LU.practice.register([...]) from another file).
   No other code changes are needed — the engine renders cards, filters and practice steps from this metadata.

   {
     id: "p1-hometown-atmosphere",     // unique, stable, A-Z a-z 0-9 _ . -  (students' history refers to it: never rename)
     category: "part1",                 // part1 | language | any new category you invent (it just appears in the browser)
     topic: "hometown",                 // free text
     subcategory: "atmosphere",         // part1: atmosphere, landscape, people, feelings, places, activities, appearance, frequency, comparison, change
                                        // language: giving-reasons, describing-change, describing-feelings, giving-examples, comparing,
                                        //           speculating, reflecting, giving-opinions     (new values also work)
     title: "Hometown — Atmosphere",
     target: "",                        // what the student should be able to do afterwards
     targetLanguage: [],                // strings, or { text, note }
     examples: [],                      // strings, or { text, note }
     practiceSteps: {                   // any subset, any number of tasks per step; extra step names are rendered too
       recognise: [], retrieve: [], use: [], reuse: []     // task = string, or { text, hint, answer, options, note }
     },
     commonMistakes: [],
     recommendedRepetitions: 3,
     // optional:
     addresses: [],                     // diagnostic issues this module helps, e.g. "vocabulary.limited_range" or a whole criterion "grammar"
     tags: []                           // free tags
   }

   The two modules below are SAMPLE/DEMO data (sample:true) used to try the interface. Delete them when real content arrives.
   Their text is placeholder only — it is not teaching material.
   ===================================================================== */
window.LU.practice.register([
  {
    sample: true,
    id: 'p1-hometown-atmosphere', category: 'part1', topic: 'hometown', subcategory: 'atmosphere', title: 'Hometown — Atmosphere',
    target: '[DEMO] Mục tiêu của module sẽ do Level Up cung cấp.',
    targetLanguage: ['[DEMO] target phrase 1', { text: '[DEMO] target phrase 2', note: '[DEMO] ghi chú' }],
    examples: ['[DEMO] Câu ví dụ sẽ do Level Up cung cấp.'],
    practiceSteps: {
      recognise: ['[DEMO] Task mẫu — chỉ để thử giao diện.'],
      retrieve: [{ text: '[DEMO] Task mẫu có gợi ý và đáp án.', hint: '[DEMO] gợi ý', answer: '[DEMO] đáp án' }],
      use: ['[DEMO] Task mẫu 1.', '[DEMO] Task mẫu 2.'],
      reuse: []
    },
    commonMistakes: ['[DEMO] Lỗi thường gặp sẽ do Level Up cung cấp.'],
    recommendedRepetitions: 3,
    addresses: ['vocabulary.limited_range', 'vocabulary.word_retrieval']
  },
  {
    sample: true,
    id: 'lf-giving-opinions', category: 'language', topic: '', subcategory: 'giving-opinions', title: 'Giving Opinions',
    target: '[DEMO] Dùng các cách nêu quan điểm một cách tự nhiên — không nhét vào mọi câu trả lời.',
    targetLanguage: ['Personally, I think...', 'I would say that...', 'I guess...', 'To be honest,...', 'Frankly speaking,...', 'In my opinion,...', "As far as I'm concerned,..."],
    examples: [],
    practiceSteps: { recognise: ['[DEMO] Task mẫu.'], use: ['[DEMO] Task mẫu.'] },
    commonMistakes: [],
    recommendedRepetitions: 2,
    addresses: ['fluency.unclear_ideas']
  }
]);
