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

   Currently empty: the guided Lexical Resource modules live in data/lexical-modules.js.
   ===================================================================== */
window.LU.practice.register([]);
