/* Real teaching content only. Claude's modules use docs/pronunciation-module.schema.json.
 * Add approved content here with LU.pronunciation.registerModules([...]); do not edit Core for a student.
 *
 * PILOT (2026-10): Module 1.1 only. Standard = General American. The schema field `ipa` is a constant "en-GB" in
 * schema v1 and in the validator (js/pronunciation.js); it is kept as required and does NOT describe this module's
 * IPA: every transcription below is General American (e.g. /oʊ/, /ɝː/, /ɑː/).
 * Evidence link: the taxonomy only has third-person -s evidence for the word "asks" (issue final_s), so this module
 * links to final_s only. final_z / plural_iz are deliberately NOT linked: they belong to plural nouns
 * ("places", "advantages") and would send plural-noun errors into a verb lesson. */
window.LU.pronunciation.registerModules([
  {
    schemaVersion: 1,
    id: 'pron-1-1-third-person-s',
    ipa: 'en-GB',
    title: 'Module 1.1 — Đuôi -s/-es của động từ ngôi thứ ba số ít (/s/, /z/, /ɪz/)',
    category: 'Word endings',
    target: 'Đọc đúng đuôi -s/-es của động từ ngôi thứ ba số ít (he/she/it) theo âm cuối của động từ gốc. Chuẩn phát âm: General American.',
    rules: [
      {
        id: 'third-person-s-endings',
        title: 'Đuôi -s/-es đọc /s/, /z/ hoặc /ɪz/ tùy âm cuối của động từ gốc',
        issueIds: ['final_s'],
        evidenceRuleIds: ['final_s']
      }
    ],
    core: {
      theory: [
        {
          id: 'th-three-sounds',
          title: 'Một đuôi, ba cách đọc',
          text: 'Ở thì hiện tại đơn, động từ đi với he/she/it thêm -s hoặc -es (works, plays, teaches). Đuôi này có ba cách đọc: /s/, /z/ hoặc /ɪz/. Cách đọc phụ thuộc vào ÂM cuối của động từ gốc, không phụ thuộc chữ cái cuối. Module này dùng phát âm General American (Anh-Mỹ).'
        },
        {
          id: 'th-rule',
          title: 'Cách chọn âm: kiểm tra theo thứ tự này',
          text: '1) Động từ gốc kết thúc bằng âm rít /s z ʃ ʒ tʃ dʒ/ → thêm một âm tiết ngắn, KHÔNG nhấn: /ɪz/ (khi nói nhanh có thể nghe gần /əz/). Ví dụ: miss → misses /ˈmɪsɪz/; fix → fixes /ˈfɪksɪz/; teach → teaches /ˈtiːtʃɪz/; change → changes /ˈtʃeɪndʒɪz/; finish → finishes /ˈfɪnɪʃɪz/.\n2) Nếu không, mà động từ gốc kết thúc bằng phụ âm vô thanh /p t k f θ/ → đọc /s/. Ví dụ: stop → stops /stɑːps/; write → writes /raɪts/; work → works /wɝːks/; laugh → laughs /læfs/; help → helps /helps/.\n3) Tất cả các trường hợp còn lại (sau nguyên âm hoặc phụ âm hữu thanh) → đọc /z/. Ví dụ: play → plays /pleɪz/; go → goes /ɡoʊz/; learn → learns /lɝːnz/; live → lives /lɪvz/; need → needs /niːdz/.'
        },
        {
          id: 'th-voicing-tip',
          title: 'Mẹo: vô thanh hay hữu thanh?',
          text: 'Đặt nhẹ ngón tay lên cổ họng. Khi kéo dài âm /s/, cổ họng không rung (vô thanh). Khi kéo dài âm /z/, cổ họng rung (hữu thanh). Đọc âm cuối của động từ gốc (không đọc chữ) rồi đoán: nếu âm đó vô thanh như /p t k f/ thì đuôi là /s/; nếu hữu thanh thì đuôi là /z/ (trừ âm rít → /ɪz/).'
        },
        {
          id: 'th-contrasts',
          title: 'Các cặp so sánh cần nghe',
          text: 'writes /raɪts/ (âm cuối /t/ vô thanh) – rides /raɪdz/ (âm cuối /d/ hữu thanh)\nlaughs /læfs/ (/f/ vô thanh) – lives /lɪvz/ (/v/ hữu thanh)\nchews /tʃuːz/ (kết thúc bằng nguyên âm, đuôi /z/, 1 âm tiết) – chooses /ˈtʃuːzɪz/ (gốc kết thúc bằng /z/, thêm âm tiết /ɪz/, 2 âm tiết)\npicks /pɪks/ – begins /bɪˈɡɪnz/'
        },
        {
          id: 'th-spelling-traps',
          title: 'Nghe âm, đừng nhìn chữ',
          text: 'goes /ɡoʊz/ chỉ có 1 âm tiết dù viết -es, vì go kết thúc bằng nguyên âm. likes /laɪks/ (chữ e là chữ câm) và lives /lɪvz/ (âm /v/ hữu thanh nên đuôi là /z/, dù chữ cuối là s). Chỉ khi âm cuối của động từ gốc là âm rít /s z ʃ ʒ tʃ dʒ/ thì mới có thêm một âm tiết.'
        },
        {
          id: 'th-vietnamese-tips',
          title: 'Lưu ý cho người học Việt Nam',
          text: 'Tiếng Việt không có phụ âm cuối /s/, /z/ nên người học dễ bỏ luôn đuôi này khi nói (She work… thay vì She works). Hãy đọc rõ đuôi, nhưng nhẹ và ngắn.\nĐừng thêm nguyên âm vào /s/ và /z/: stops là /stɑːps/ (một âm tiết), không phải "stop-sơ". Chỉ đuôi /ɪz/ mới thêm một âm tiết.\nÂm tiết /ɪz/ không được nhấn. Trọng âm vẫn nằm ở động từ gốc: TEACHes, FINishes.\nKhi nói IELTS Speaking, hãy kiểm tra đuôi -s/-es mỗi khi chủ ngữ là he/she/it hoặc một danh từ số ít.'
        }
      ],
      practice: [
        { id: 'pr-s-1', ruleId: 'third-person-s-endings', target: 'stops /stɑːps/ → đuôi -s đọc /s/', sentence: 'The bus stops right outside my house every morning.' },
        { id: 'pr-s-2', ruleId: 'third-person-s-endings', target: 'writes /raɪts/ → đuôi -s đọc /s/', sentence: 'My brother writes a short note before every exam.' },
        { id: 'pr-s-3', ruleId: 'third-person-s-endings', target: 'works /wɝːks/ → đuôi -s đọc /s/', sentence: 'My father works at a small company near the station.' },
        { id: 'pr-s-4', ruleId: 'third-person-s-endings', target: 'laughs /læfs/ → đuôi -s đọc /s/', sentence: 'My best friend laughs at every joke I tell.' },
        { id: 'pr-s-5', ruleId: 'third-person-s-endings', target: 'helps /helps/ → đuôi -s đọc /s/', sentence: 'My mother helps me with my English homework.' },
        { id: 'pr-z-1', ruleId: 'third-person-s-endings', target: 'plays /pleɪz/ → đuôi -s đọc /z/', sentence: 'He plays football after school every day.' },
        { id: 'pr-z-2', ruleId: 'third-person-s-endings', target: 'goes /ɡoʊz/ → đuôi -es đọc /z/ (1 âm tiết)', sentence: 'She goes to the gym before work.' },
        { id: 'pr-z-3', ruleId: 'third-person-s-endings', target: 'learns /lɝːnz/ → đuôi -s đọc /z/', sentence: 'My cousin learns Spanish online in the evening.' },
        { id: 'pr-z-4', ruleId: 'third-person-s-endings', target: 'lives /lɪvz/ → đuôi -s đọc /z/', sentence: 'My grandmother lives in a small village near the sea.' },
        { id: 'pr-z-5', ruleId: 'third-person-s-endings', target: 'needs /niːdz/ → đuôi -s đọc /z/', sentence: 'Everyone needs enough sleep to stay healthy.' },
        { id: 'pr-iz-1', ruleId: 'third-person-s-endings', target: 'teaches /ˈtiːtʃɪz/ → đuôi -es đọc /ɪz/ (2 âm tiết)', sentence: 'My neighbor teaches music at a local school.' },
        { id: 'pr-iz-2', ruleId: 'third-person-s-endings', target: 'misses /ˈmɪsɪz/ → đuôi -es đọc /ɪz/ (2 âm tiết)', sentence: 'He often misses the early bus.' },
        { id: 'pr-iz-3', ruleId: 'third-person-s-endings', target: 'changes /ˈtʃeɪndʒɪz/ → đuôi -es đọc /ɪz/ (2 âm tiết)', sentence: 'My sister changes her hairstyle very often.' },
        { id: 'pr-iz-4', ruleId: 'third-person-s-endings', target: 'fixes /ˈfɪksɪz/ → đuôi -es đọc /ɪz/ (2 âm tiết)', sentence: 'My uncle fixes the broken printer at the office.' },
        { id: 'pr-iz-5', ruleId: 'third-person-s-endings', target: 'finishes /ˈfɪnɪʃɪz/ → đuôi -es đọc /ɪz/ (3 âm tiết)', sentence: 'She finishes her homework before dinner.' }
      ]
    },
    media: [
      {
        id: 'video-english-with-kim-s-es',
        type: 'video',
        label: 'English with Kim — How to Pronounce -S and -ES Endings in English (12:08, giọng Mỹ). Xem từ 1:00 đến 10:05: cách chọn /s/, /z/, /ɪz/. Video nói chung cho cả danh từ số nhiều và động từ ngôi thứ ba; có thể bỏ qua phần viết tắt (contractions).',
        url: 'https://www.youtube.com/watch?v=JhgsxJupxiQ'
      }
    ],
    retest: [
      { id: 'rt-s-new-words', ruleId: 'third-person-s-endings', prompt: 'Đọc to các từ chưa học: keeps /kiːps/, jumps /dʒʌmps/, sits /sɪts/, drops /drɑːps/. Với mỗi từ, nói đuôi đọc /s/, /z/ hay /ɪz/ và âm cuối của động từ gốc là gì.' },
      { id: 'rt-z-new-words', ruleId: 'third-person-s-endings', prompt: 'Đọc to: reads /riːdz/, shows /ʃoʊz/, travels /ˈtrævəlz/, runs /rʌnz/. Đuôi là /z/ (cổ họng rung) và không thêm âm tiết.' },
      { id: 'rt-iz-new-words', ruleId: 'third-person-s-endings', prompt: 'Đọc to: pushes /ˈpʊʃɪz/, judges /ˈdʒʌdʒɪz/, reaches /ˈriːtʃɪz/, passes /ˈpæsɪz/. Có thêm một âm tiết ngắn không nhấn, trọng âm ở động từ gốc.' },
      { id: 'rt-spelling-traps', ruleId: 'third-person-s-endings', prompt: 'Đọc likes /laɪks/, lives /lɪvz/, goes /ɡoʊz/. Giải thích vì sao likes và lives có đuôi khác nhau, và vì sao goes chỉ có một âm tiết.' },
      { id: 'rt-contrast-pairs', ruleId: 'third-person-s-endings', prompt: 'Đọc các cặp: writes – rides, laughs – lives, chews – chooses. Nói đuôi của từng từ là /s/, /z/ hay /ɪz/ trước khi nhìn lại bảng quy tắc.' },
      { id: 'rt-free-speaking', ruleId: 'third-person-s-endings', prompt: 'Nói khoảng 30 giây về một người thân (what he/she does every day) và dùng ít nhất 5 động từ ngôi thứ ba số ít. Chú ý không bỏ đuôi -s/-es và đọc đúng /s/, /z/, /ɪz/.' }
    ]
  }
]);
