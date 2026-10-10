/* =====================================================================
   Lexical Resource — Recommended Practice library (public teaching content; no student data).
   Loaded by index.html AFTER js/practice.js.

   Guided flow:  LEARN → USE → REUSE → RETRIEVE → FINISHED   (rendered by js/guided.js — one generic renderer for every module)

   A READY module has content:
     learn:    [{ basic: ['nice','good'], unique: 'pleasant', meaning: '…', example: '…' }]   // "You might say" | "More unique" | "Meaning" | "Example"
     use:      ['question', …]            // + optional  useWords: ['pleasant', …]  (the suggested-language line; defaults to the learn words)
     reuse:    ['question', …]
     retrieve: [{ term: 'peaceful', meaning: 'calm and free from noise' }]   // matched by the student; meaning order is shuffled
   A DRAFT module (status: 'draft') is metadata only. The teacher can see and assign it; the student cannot launch it. Never put
   invented teaching content in a draft — add the real content later and remove `status: 'draft'`.
   ===================================================================== */
window.LU.practice.register([
  {
    id: 'lex_atmosphere_01', category: 'lexical', subcategory: 'tier-1', topic: 'Atmosphere', title: 'Atmosphere',
    focus: 'Describing the atmosphere of places naturally', level: '5.5–6.5', bestFor: 'IELTS Speaking Part 1',
    lessonTitle: 'Make your language more unique',
    learnInstruction: 'Learn natural alternatives to words you may use too often.',
    useTitle: 'Use more unique language', useInstruction: 'Answer the questions below with more unique language.',
    reuseTitle: 'Reuse the language', reuseInstruction: 'Answer the questions below with more unique language.',
    retrieveTitle: 'Retrieve the language', retrieveInstruction: 'Match the words with their meanings.',
    addresses: ['vocabulary.limited_range', 'vocabulary.word_retrieval'], recommendedRepetitions: 1,
    learn: [
      { basic: ['nice', 'good'], unique: 'pleasant', meaning: 'enjoyable, comfortable, or relaxing', example: 'It has a really pleasant atmosphere.' },
      { basic: ['quiet'], unique: 'peaceful', meaning: 'calm and free from noise or disturbance', example: 'My neighborhood is quite peaceful.' },
      { basic: ['quiet', 'relaxing'], unique: 'laid-back', meaning: 'relaxed and not busy or stressful', example: "It's a pretty laid-back area." },
      { basic: ['busy'], unique: 'lively', meaning: 'full of energy and activity', example: 'The area is quite lively in the evening.' },
      { basic: ['very busy', 'crowded'], unique: 'packed', meaning: 'completely or very full of people', example: 'The café gets absolutely packed in the evening.' },
      { basic: ['boring'], unique: 'dull', meaning: 'not interesting, exciting, or lively', example: 'The neighborhood can feel a bit dull at night.' }
    ],
    use: ["What's your neighborhood like?", 'Do you like the area where you live?'],
    useWords: ['pleasant', 'peaceful', 'lively', 'laid-back', 'packed', 'dull'],
    reuse: ['Do you prefer living in a quiet place or a busy place? Why?', 'What kind of places do you enjoy visiting?'],
    retrieve: [
      { term: 'peaceful', meaning: 'calm and free from noise' },
      { term: 'lively', meaning: 'full of energy and activity' },
      { term: 'laid-back', meaning: 'relaxed and not stressful' },
      { term: 'packed', meaning: 'completely full of people' },
      { term: 'pleasant', meaning: 'enjoyable and comfortable' },
      { term: 'dull', meaning: 'not interesting or exciting' }
    ]
  },
  /* ---- TIER 1 (placeholders: metadata only) ---- */
  { id: 'lex_personality_01', category: 'lexical', subcategory: 'tier-1', topic: 'People & Personality', title: 'Positive & Negative Personalities', status: 'draft' },
  { id: 'lex_landscape_01', category: 'lexical', subcategory: 'tier-1', topic: 'Natural Views / Landscape', title: 'Natural Views / Landscape', status: 'draft' },
  { id: 'lex_feelings_01', category: 'lexical', subcategory: 'tier-1', topic: 'Feelings', title: 'Describing Feelings', status: 'draft' },
  { id: 'lex_reasons_01', category: 'lexical', subcategory: 'tier-1', topic: 'Giving Reasons', title: 'Giving Reasons', status: 'draft' },
  { id: 'lex_opinions_01', category: 'lexical', subcategory: 'tier-1', topic: 'Giving Opinions', title: 'Giving Opinions Naturally', status: 'draft' },
  { id: 'lex_frequency_01', category: 'lexical', subcategory: 'tier-1', topic: 'Frequency', title: 'Frequency Naturally', status: 'draft' },
  { id: 'lex_activities_01', category: 'lexical', subcategory: 'tier-1', topic: 'Activities', title: 'Describing Activities', status: 'draft' },
  { id: 'lex_comparison_01', category: 'lexical', subcategory: 'tier-1', topic: 'Comparison', title: 'Comparison', status: 'draft' },
  { id: 'lex_change_01', category: 'lexical', subcategory: 'tier-1', topic: 'Change', title: 'Describing Change', status: 'draft' },
  /* ---- TIER 2 ---- */
  { id: 'lex_food_01', category: 'lexical', subcategory: 'tier-2', topic: 'Food & Taste', title: 'Food & Taste', status: 'draft' },
  { id: 'lex_weather_01', category: 'lexical', subcategory: 'tier-2', topic: 'Weather', title: 'Weather', status: 'draft' },
  { id: 'lex_appearance_01', category: 'lexical', subcategory: 'tier-2', topic: 'Appearance', title: 'Appearance', status: 'draft' },
  { id: 'lex_technology_01', category: 'lexical', subcategory: 'tier-2', topic: 'Technology', title: 'Technology', status: 'draft' },
  { id: 'lex_study_work_01', category: 'lexical', subcategory: 'tier-2', topic: 'Study & Work', title: 'Study & Work', status: 'draft' }
]);
