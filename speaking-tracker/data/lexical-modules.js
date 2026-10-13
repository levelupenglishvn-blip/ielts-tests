/* =====================================================================
   Lexical Resource — Recommended Practice library (public teaching content; no student data).
   Loaded by index.html AFTER js/practice.js.

   Guided flow:  LEARN → USE → REUSE → RETRIEVE → FINISHED   (rendered by js/guided.js — one generic renderer for every module)
   Extra Practice is optional and appears after Finished; it never blocks completion.

   A READY module has content (add one object to the list below — no code change is needed):
     learnGroups: [{ id: 'A', title: 'Quiet atmosphere', titleVi: 'Không khí yên tĩnh', note: '(optional, Vietnamese)',
                     items: [{ word: 'Peaceful', meaning: '(Vietnamese)', example: 'English example.' }] }]
     learnNotes:  ['…']                       // optional "Lưu ý phân biệt" list shown after the groups
     use:         ['question', …]             // up to 3 open speaking questions
     useHints:    [['word', 'word', …], …]    // optional: 3–5 words/phrases (taken from the learn list) for each question, same order. No hints → the renderer picks a few learn words per question.
     reuse:       ['question', …]             // up to 3 NEW questions (hints stay hidden until the student taps "Cần gợi ý?")
     reuseHints:  [['word', …], …]            // optional, same idea as useHints
     quiz:        [{ prompt: 'Sentence with ______.', options: [{ id: 'A', text: 'cozy' }, …], answer: 'A', explain: '(Vietnamese)' }]
                                              // multiple choice, shown one by one; answer + explanation after each; retry allowed; no pass mark
     extra:       [{ prompt: 'Describe …', words: ['hint', …] }]   + optional extraNote
   Titles/instructions are optional: learnTitle/learnInstruction, useTitle/useInstruction, reuseTitle/reuseInstruction, retrieveTitle/retrieveInstruction.
   Older shapes still work: learn: [{ basic, unique, meaning, example }] and retrieve: [{ term, meaning }] (matching).
   A DRAFT module (status: 'draft') is metadata only. The teacher can see and assign it; the student cannot launch it. Never put
   invented teaching content in a draft — add the real content later and remove `status: 'draft'`.
   Ids never change (students' progress refers to them).
   ===================================================================== */
window.LU.practice.register([
  {
    id: "lex_atmosphere_01", category: 'lexical', subcategory: 'tier-1', topic: "Atmosphere", title: "Describing Atmosphere",
    focus: "Describing the atmosphere of a place or an event",
    target: "Giúp học viên mô tả bầu không khí của một địa điểm hoặc sự kiện chính xác hơn, thay vì chỉ dùng những từ chung chung như “good”, “bad”, “nice” hoặc “boring”.",
    learnTitle: 'Learn the language', learnInstruction: "Đọc nghĩa và ví dụ của từng nhóm từ. Nên ghi lại vào sổ tay để dùng khi luyện nói.",
    useTitle: 'Use the language', useInstruction: "Trả lời thành tiếng. Dùng từ đã học khi phù hợp.",
    reuseTitle: 'Reuse the language', reuseInstruction: "Trả lời thành tiếng trong ngữ cảnh mới.",
    retrieveTitle: 'Retrieve the language', retrieveInstruction: "Chọn đáp án phù hợp nhất với ngữ cảnh. Sau mỗi câu, bạn sẽ thấy đáp án và lời giải thích.",
    addresses: ['vocabulary.limited_range', 'vocabulary.word_retrieval'], recommendedRepetitions: 1,
    learnGroups: [
      {
        id: "A", title: "Quiet atmosphere", titleVi: "Không khí yên tĩnh",
        note: "Peaceful, calm và tranquil có phần nghĩa giao nhau nhưng không phải lúc nào cũng thay thế cho nhau được.",
        items: [
          { word: "Peaceful", meaning: "Yên bình, không bị quấy nhiễu.", example: "The park is peaceful early in the morning." },
          { word: "Calm", meaning: "Yên tĩnh, không có nhiều hoạt động hoặc sự xáo trộn.", example: "I prefer a calm atmosphere when I'm studying." },
          { word: "Tranquil", meaning: "Thanh bình, tĩnh lặng, thường gợi cảm giác thư thái.", example: "The countryside is tranquil and far removed from city life." }
        ]
      },
      {
        id: "B", title: "Busy atmosphere", titleVi: "Không khí nhộn nhịp",
        items: [
          { word: "Lively", meaning: "Sôi động, có nhiều hoạt động và sức sống.", example: "The streets are lively during the festival." },
          { word: "Bustling", meaning: "Nhộn nhịp với nhiều người và hoạt động diễn ra liên tục.", example: "The market is bustling with shoppers." },
          { word: "Vibrant", meaning: "Sôi nổi, tràn đầy sức sống, thường gắn với văn hóa hoặc đời sống xã hội.", example: "I love the vibrant atmosphere of Hanoi's Old Quarter." }
        ]
      },
      {
        id: "C", title: "Warm and welcoming atmosphere", titleVi: "Không khí ấm áp, thân thiện",
        items: [
          { word: "Welcoming", meaning: "Khiến mọi người cảm thấy được chào đón.", example: "The restaurant has a warm and welcoming atmosphere." },
          { word: "Cozy", meaning: "Ấm cúng, dễ chịu, thường dùng cho không gian nhỏ hoặc thân mật.", example: "It's a cozy little café where I can read for hours." },
          { word: "Inviting", meaning: "Hấp dẫn, tạo cảm giác muốn bước vào hoặc ở lại.", example: "The garden looks really inviting in spring." }
        ]
      },
      {
        id: "D", title: "Uncomfortable atmosphere", titleVi: "Không khí khó chịu",
        items: [
          { word: "Chaotic", meaning: "Hỗn loạn, thiếu trật tự.", example: "The station gets chaotic during rush hour." },
          { word: "Overwhelming", meaning: "Khiến một người cảm thấy bị ngợp vì quá nhiều âm thanh, người hoặc hoạt động.", example: "The noise and crowds can be overwhelming." },
          { word: "Tense", meaning: "Căng thẳng, tạo cảm giác bất an hoặc có xung đột.", example: "The atmosphere became tense after the argument." },
          { word: "Gloomy", meaning: "U ám, thiếu sức sống.", example: "The room felt gloomy because there was barely any natural light." }
        ]
      }
    ],
    use: ["What kind of atmosphere do you enjoy when visiting a café or another public place?",
          "How would you describe the atmosphere in your hometown, especially in busy areas?",
          "Do you prefer a calm environment or a lively one when studying, working or relaxing? Why?"],
    reuse: ["Describe the atmosphere at a place where you like to spend time with friends or family.",
            "What is the atmosphere like during a major celebration in your country?",
            "Have you ever been somewhere with an uncomfortable atmosphere? What made you feel that way?"],
    useHints: [["Cozy", "Welcoming", "Inviting", "Calm", "Peaceful"], ["Bustling", "Lively", "Vibrant", "Chaotic"], ["Calm", "Peaceful", "Tranquil", "Lively"]],
    reuseHints: [["Cozy", "Welcoming", "Lively", "Peaceful"], ["Vibrant", "Lively", "Bustling", "Welcoming"], ["Tense", "Chaotic", "Overwhelming", "Gloomy"]],
    quiz: [
      {
        prompt: "The small café has soft lighting, comfortable chairs and a warm, ______ atmosphere.",
        options: [{ id: "A", text: "chaotic" }, { id: "B", text: "cozy" }, { id: "C", text: "tense" }, { id: "D", text: "gloomy" }],
        answer: "B", explain: "Cozy mô tả một không gian ấm cúng, thoải mái và dễ chịu."
      },
      {
        prompt: "The concert was full of energy, with the crowd cheering and dancing throughout the night. The atmosphere was ______.",
        options: [{ id: "A", text: "peaceful" }, { id: "B", text: "tranquil" }, { id: "C", text: "electrifying" }, { id: "D", text: "gloomy" }],
        answer: "C", explain: "Electrifying mô tả bầu không khí cực kỳ sôi động, tạo cảm giác phấn khích mạnh. Đây là từ mở rộng, không thuộc danh sách 13 từ mục tiêu."
      },
      {
        prompt: "The market is always ______ in the morning, with vendors calling out and shoppers moving from stall to stall.",
        options: [{ id: "A", text: "bustling" }, { id: "B", text: "tranquil" }, { id: "C", text: "tense" }, { id: "D", text: "peaceful" }],
        answer: "A", explain: "Bustling diễn tả nơi có đông người và nhiều hoạt động diễn ra liên tục."
      },
      {
        prompt: "After the manager announced the unexpected pay cut, the atmosphere in the office became ______.",
        options: [{ id: "A", text: "inviting" }, { id: "B", text: "lively" }, { id: "C", text: "tense" }, { id: "D", text: "cozy" }],
        answer: "C", explain: "Tense mô tả bầu không khí căng thẳng, thường xuất hiện khi có bất đồng hoặc tin tức gây lo lắng."
      },
      {
        prompt: "The airport was packed with people, loud announcements and long queues. The whole experience felt ______.",
        options: [{ id: "A", text: "welcoming" }, { id: "B", text: "overwhelming" }, { id: "C", text: "peaceful" }, { id: "D", text: "tranquil" }],
        answer: "B", explain: "Overwhelming nhấn mạnh cảm giác bị ngợp khi phải tiếp nhận quá nhiều thứ cùng lúc."
      },
      {
        prompt: "The neighborhood has a ______ cultural scene, with street performances, art exhibitions and music events happening every week.",
        options: [{ id: "A", text: "gloomy" }, { id: "B", text: "chaotic" }, { id: "C", text: "vibrant" }, { id: "D", text: "tense" }],
        answer: "C", explain: "Vibrant thường mô tả đời sống văn hóa hoặc xã hội sôi nổi, phong phú và tràn đầy sức sống."
      },
      {
        prompt: "We spent the weekend in a remote village surrounded by mountains. It was so ______ that we could finally forget about the noise of the city.",
        options: [{ id: "A", text: "tranquil" }, { id: "B", text: "bustling" }, { id: "C", text: "chaotic" }, { id: "D", text: "overwhelming" }],
        answer: "A", explain: "Tranquil nhấn mạnh sự tĩnh lặng và thanh bình, thường gợi cảm giác thư thái."
      },
      {
        prompt: "The staff greeted us with genuine smiles, and everyone made an effort to help us feel comfortable. The restaurant had a ______ atmosphere.",
        options: [{ id: "A", text: "tense" }, { id: "B", text: "welcoming" }, { id: "C", text: "gloomy" }, { id: "D", text: "chaotic" }],
        answer: "B", explain: "Welcoming mô tả một môi trường khiến người khác cảm thấy được chào đón và thoải mái."
      },
      {
        prompt: "The room had dark walls, very little natural light and an unpleasant silence. It felt rather ______.",
        options: [{ id: "A", text: "lively" }, { id: "B", text: "inviting" }, { id: "C", text: "gloomy" }, { id: "D", text: "bustling" }],
        answer: "C", explain: "Gloomy thường mô tả một không gian u ám, thiếu ánh sáng hoặc sức sống."
      },
      {
        prompt: "The town square is especially ______ during the weekend, when families gather, children play and street musicians perform.",
        options: [{ id: "A", text: "tense" }, { id: "B", text: "lively" }, { id: "C", text: "tranquil" }, { id: "D", text: "overwhelming" }],
        answer: "B", explain: "Lively nhấn mạnh sự sôi động và sức sống của một địa điểm."
      },
      {
        prompt: "The hotel lobby had comfortable sofas, warm lighting and fresh flowers. It looked so ______ that we wanted to sit down immediately.",
        options: [{ id: "A", text: "chaotic" }, { id: "B", text: "tense" }, { id: "C", text: "inviting" }, { id: "D", text: "gloomy" }],
        answer: "C", explain: "Inviting mô tả một nơi trông hấp dẫn và khiến người ta muốn bước vào hoặc ở lại."
      },
      {
        prompt: "When the train was delayed, hundreds of passengers rushed toward the information desk, and nobody seemed to know where to go. The station became ______.",
        options: [{ id: "A", text: "peaceful" }, { id: "B", text: "cozy" }, { id: "C", text: "chaotic" }, { id: "D", text: "tranquil" }],
        answer: "C", explain: "Chaotic mô tả tình trạng hỗn loạn, thiếu trật tự và khó kiểm soát."
      }
    ],
    extra: [
      { prompt: "Describe a place where you go to relax.", words: ["peaceful", "tranquil", "soothing", "cozy", "laid-back"] },
      { prompt: "Describe an event you attended that you enjoyed.", words: ["lively", "bustling", "vibrant", "electrifying", "welcoming"] }
    ],
    extraNote: "Soothing, laid-back và electrifying là từ mở rộng, không bắt buộc học thuộc trong danh sách mục tiêu."
  },
  {
    id: "lex_personality_01", category: 'lexical', subcategory: 'tier-1', topic: "Describing People", title: "Describing People",
    focus: "Describing people’s personality, qualities and characteristics",
    target: "Giúp học viên mô tả con người cụ thể và chính xác hơn, thay vì phụ thuộc vào những từ chung chung như “good”, “bad”, “funny” hoặc “sad”.",
    learnTitle: 'Learn the language', learnInstruction: "Đọc nghĩa và ví dụ của từng nhóm từ. Nên ghi lại vào sổ tay để dùng khi luyện nói.",
    useTitle: 'Use the language', useInstruction: "Trả lời thành tiếng. Dùng từ đã học khi phù hợp.",
    reuseTitle: 'Reuse the language', reuseInstruction: "Trả lời thành tiếng trong ngữ cảnh mới.",
    retrieveTitle: 'Retrieve the language', retrieveInstruction: "Chọn đáp án phù hợp nhất với ngữ cảnh. Sau mỗi câu, bạn sẽ thấy đáp án và lời giải thích.",
    addresses: ['vocabulary.limited_range', 'vocabulary.word_retrieval'], recommendedRepetitions: 1,
    learnGroups: [
      {
        id: "A", title: "Interpersonal qualities", titleVi: "Phẩm chất trong quan hệ với người khác",
        items: [
          { word: "Helpful", meaning: "Sẵn lòng giúp đỡ.", example: "My classmates are helpful whenever I struggle with an assignment." },
          { word: "Considerate", meaning: "Chu đáo, biết nghĩ đến cảm xúc và nhu cầu của người khác.", example: "She's considerate and always makes sure everyone feels included." },
          { word: "Approachable", meaning: "Dễ tiếp cận, khiến người khác cảm thấy thoải mái khi bắt chuyện.", example: "My manager is approachable, so I never hesitate to ask questions." },
          { word: "Reliable", meaning: "Đáng tin cậy.", example: "He's reliable and always keeps his promises." },
          { word: "Honest", meaning: "Trung thực.", example: "I value honest friends who tell me what they really think." }
        ]
      },
      {
        id: "B", title: "Character", titleVi: "Tính cách và thái độ",
        items: [
          { word: "Open-minded", meaning: "Cởi mở với những quan điểm và ý tưởng khác biệt.", example: "She's open-minded and willing to consider other people's opinions." },
          { word: "Modest", meaning: "Khiêm tốn, không khoe khoang thành tích hoặc khả năng.", example: "Despite her achievements, she's remarkably modest." },
          { word: "Humble", meaning: "Khiêm nhường, không cho rằng bản thân vượt trội hơn người khác.", example: "He's humble and treats everyone with respect." },
          { word: "Diligent", meaning: "Chăm chỉ, làm việc cẩn thận và đều đặn.", example: "She's a diligent student who reviews her notes every evening." },
          { word: "Disciplined", meaning: "Có kỷ luật, biết kiểm soát bản thân để theo đuổi mục tiêu.", example: "He's disciplined enough to stick to his training routine." },
          { word: "Self-centered", meaning: "Chỉ quan tâm đến bản thân, ít để ý đến người khác.", example: "He can be self-centered and tends to make every conversation about himself." }
        ]
      },
      {
        id: "C", title: "Social style", titleVi: "Phong cách giao tiếp",
        items: [
          { word: "Outgoing", meaning: "Cởi mở, chủ động giao tiếp và thích gặp gỡ mọi người.", example: "She's outgoing and makes friends wherever she goes." },
          { word: "Reserved", meaning: "Kín đáo, ít thể hiện suy nghĩ hoặc cảm xúc.", example: "He's quite reserved around people he doesn't know well." },
          { word: "Introverted", meaning: "Có xu hướng thích môi trường ít kích thích hơn hoặc cần thời gian riêng sau khi giao tiếp xã hội.", example: "I'm introverted, so I need some quiet time after a busy social event." },
          { word: "Extroverted", meaning: "Có xu hướng thích tương tác xã hội và thường cảm thấy hứng thú khi giao tiếp với người khác.", example: "My extroverted sister loves meeting new people." }
        ]
      },
      {
        id: "D", title: "Appearance and humour", titleVi: "Ngoại hình và khiếu hài hước",
        items: [
          { word: "Good-looking", meaning: "Có ngoại hình đẹp hoặc ưa nhìn.", example: "He's good-looking, but what I admire most is his personality." },
          { word: "Charming", meaning: "Duyên dáng, có sức hút nhờ cách cư xử hoặc phong thái.", example: "She has a charming smile and makes people feel at ease." },
          { word: "Hilarious", meaning: "Cực kỳ hài hước, khiến người khác cười nhiều.", example: "My best friend is hilarious; she can make me laugh even on a bad day." },
          { word: "Have a good sense of humour", meaning: "Có khiếu hài hước.", example: "My dad has a good sense of humour and never takes himself too seriously." }
        ]
      },
      {
        id: "E", title: "Feelings and negative descriptions", titleVi: "Cảm xúc và đặc điểm tiêu cực",
        items: [
          { word: "Frustrated", meaning: "Bực bội vì gặp khó khăn hoặc không đạt được điều mình muốn.", example: "She felt frustrated when nobody listened to her suggestions." },
          { word: "Upset", meaning: "Buồn, tổn thương hoặc khó chịu vì một sự việc.", example: "He was upset when his friends forgot his birthday." },
          { word: "Irritable", meaning: "Dễ cáu kỉnh hoặc dễ cảm thấy khó chịu.", example: "He's been irritable lately because he hasn't been sleeping well." }
        ]
      }
    ],
    learnNotes: [
      "Self-centered mô tả xu hướng tính cách chỉ quan tâm đến bản thân.",
      "Frustrated và upset mô tả trạng thái cảm xúc.",
      "Irritable mô tả trạng thái hoặc xu hướng dễ cáu kỉnh.",
      "Quiet không đồng nghĩa với introverted.",
      "Một người ít nói vẫn có thể tự tin, cởi mở và approachable.",
      "Modest và humble có phần nghĩa giao nhau nhưng không hoàn toàn giống nhau."
    ],
    use: ["What qualities do you value most in a friend, and why?",
          "How would you describe your own personality? Has it changed as you've grown older?",
          "What kind of people do you enjoy working or studying with?"],
    reuse: ["Describe someone you find difficult to get along with. What makes the relationship difficult?",
            "What qualities make someone a good leader or role model?",
            "Can someone be quiet but still be confident, open-minded and approachable? Why?"],
    useHints: [["Helpful", "Considerate", "Reliable", "Honest", "Approachable"], ["Outgoing", "Reserved", "Introverted", "Open-minded"], ["Diligent", "Disciplined", "Reliable", "Helpful", "Open-minded"]],
    reuseHints: [["Self-centered", "Irritable", "Frustrated", "Upset"], ["Disciplined", "Reliable", "Considerate", "Humble", "Charming"], ["Reserved", "Introverted", "Open-minded", "Approachable"]],
    quiz: [
      {
        prompt: "Whenever someone in our class has a problem, Linh is the first person to offer help. She's very ______.",
        options: [{ id: "A", text: "helpful" }, { id: "B", text: "self-centered" }, { id: "C", text: "reserved" }, { id: "D", text: "irritable" }],
        answer: "A", explain: "Helpful mô tả người sẵn lòng giúp đỡ người khác."
      },
      {
        prompt: "You can easily talk to our new teacher about your concerns because she's very ______.",
        options: [{ id: "A", text: "modest" }, { id: "B", text: "approachable" }, { id: "C", text: "self-centered" }, { id: "D", text: "introverted" }],
        answer: "B", explain: "Approachable mô tả người khiến người khác cảm thấy dễ bắt chuyện hoặc xin lời khuyên."
      },
      {
        prompt: "Whenever Minh promises to do something, he always follows through. He's someone you can depend on.",
        options: [{ id: "A", text: "outgoing" }, { id: "B", text: "reliable" }, { id: "C", text: "hilarious" }, { id: "D", text: "reserved" }],
        answer: "B", explain: "Reliable mô tả người đáng tin cậy, có thể dựa vào."
      },
      {
        prompt: "Although her colleagues disagree with her, she listens carefully and considers their arguments before making a decision.",
        options: [{ id: "A", text: "open-minded" }, { id: "B", text: "self-centered" }, { id: "C", text: "irritable" }, { id: "D", text: "gloomy" }],
        answer: "A", explain: "Open-minded mô tả người sẵn lòng cân nhắc các quan điểm khác nhau."
      },
      {
        prompt: "Despite winning several international awards, the scientist never boasts about her achievements and treats everyone with respect.",
        options: [{ id: "A", text: "outgoing" }, { id: "B", text: "humble" }, { id: "C", text: "self-centered" }, { id: "D", text: "frustrated" }],
        answer: "B", explain: "Humble nhấn mạnh thái độ khiêm nhường và không tự cho mình vượt trội hơn người khác."
      },
      {
        prompt: "Nam follows a strict study schedule and continues working toward his goal even when he feels unmotivated.",
        options: [{ id: "A", text: "disciplined" }, { id: "B", text: "hilarious" }, { id: "C", text: "approachable" }, { id: "D", text: "upset" }],
        answer: "A", explain: "Disciplined mô tả người có kỷ luật và có thể duy trì hành động để đạt mục tiêu."
      },
      {
        prompt: "Mai loves meeting new people, starting conversations and making friends wherever she goes.",
        options: [{ id: "A", text: "reserved" }, { id: "B", text: "outgoing" }, { id: "C", text: "irritable" }, { id: "D", text: "modest" }],
        answer: "B", explain: "Outgoing mô tả người cởi mở, chủ động giao tiếp và thích tương tác xã hội."
      },
      {
        prompt: "During group discussions, he keeps bringing the conversation back to himself and rarely asks others about their opinions.",
        options: [{ id: "A", text: "considerate" }, { id: "B", text: "reliable" }, { id: "C", text: "self-centered" }, { id: "D", text: "open-minded" }],
        answer: "C", explain: "Self-centered mô tả người thường đặt bản thân và nhu cầu của mình lên trên người khác."
      },
      {
        prompt: "Even though her teammates have different political and cultural views, she listens to them without immediately judging them.",
        options: [{ id: "A", text: "open-minded" }, { id: "B", text: "irritable" }, { id: "C", text: "reserved" }, { id: "D", text: "self-centered" }],
        answer: "A", explain: "Open-minded nhấn mạnh thái độ cởi mở với các quan điểm khác biệt."
      },
      {
        prompt: "My uncle is absolutely ______. Whenever he tells a story, the whole family ends up laughing uncontrollably.",
        options: [{ id: "A", text: "humble" }, { id: "B", text: "hilarious" }, { id: "C", text: "reliable" }, { id: "D", text: "reserved" }],
        answer: "B", explain: "Hilarious nhấn mạnh mức độ hài hước rất cao, khiến người khác cười nhiều."
      },
      {
        prompt: "She had spent hours preparing her presentation, but the computer crashed just before she could submit it. She felt extremely ______.",
        options: [{ id: "A", text: "charming" }, { id: "B", text: "frustrated" }, { id: "C", text: "outgoing" }, { id: "D", text: "modest" }],
        answer: "B", explain: "Frustrated diễn tả sự bực bội khi gặp trở ngại hoặc không thể đạt được điều mình muốn."
      },
      {
        prompt: "He was deeply ______ when he discovered that his closest friend had lied to him.",
        options: [{ id: "A", text: "disciplined" }, { id: "B", text: "approachable" }, { id: "C", text: "upset" }, { id: "D", text: "outgoing" }],
        answer: "C", explain: "Upset diễn tả cảm giác buồn bã, tổn thương hoặc khó chịu trước một sự việc."
      },
      {
        prompt: "Since he started sleeping poorly, he's been unusually ______ and gets annoyed over minor problems.",
        options: [{ id: "A", text: "irritable" }, { id: "B", text: "humble" }, { id: "C", text: "helpful" }, { id: "D", text: "open-minded" }],
        answer: "A", explain: "Irritable mô tả người dễ cáu kỉnh hoặc dễ bị những điều nhỏ nhặt làm khó chịu."
      },
      {
        prompt: "He doesn't talk much in meetings, especially when he's with strangers, but he listens carefully and shares thoughtful opinions when asked.",
        options: [{ id: "A", text: "hilarious" }, { id: "B", text: "reserved" }, { id: "C", text: "self-centered" }, { id: "D", text: "outgoing" }],
        answer: "B", explain: "Reserved mô tả người kín đáo, ít thể hiện bản thân, đặc biệt trong môi trường chưa quen thuộc."
      },
      {
        prompt: "Even though she comes from a wealthy family and has achieved a lot, she never shows off or tries to impress others with her status.",
        options: [{ id: "A", text: "modest" }, { id: "B", text: "irritable" }, { id: "C", text: "extroverted" }, { id: "D", text: "frustrated" }],
        answer: "A", explain: "Modest mô tả người khiêm tốn, không khoe khoang thành tích hoặc khả năng của mình."
      }
    ],
    extra: [
      { prompt: "Describe someone you would rather avoid.", words: ["self-centered", "inconsiderate", "irritable", "frustrating", "get along with", "keep my distance"] },
      { prompt: "Describe someone you admire.", words: ["open-minded", "considerate", "disciplined", "approachable", "reliable", "have a good sense of humour"] }
    ],
    extraNote: "Một số gợi ý là cụm từ mở rộng, không bắt buộc thuộc danh sách từ mục tiêu."
  },
  /* ---- TIER 1 (placeholders: metadata only) ---- */
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
