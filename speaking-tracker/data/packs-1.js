/* Practice packs 1/6 — Topic Vocabulary modules 03–08 (Use · Reuse · Retrieve).  Static, public teaching content (no student data).
   Format: see P.addPack in js/practice.js.  ex[i] = example sentence for vocabulary item i (same order as the module's vocabulary list).
   use  : {t:'fill'|'fix', q, o:[4 options], a:index of the correct option (or [indexes] if several are accepted), w:explanation} | {t:'speak', q, h:[hint words], s:sample answer, **bold** = target expression}
   reuse: {q, h, s}          recall: {k:'vi'|'sit'|'blank'|'speak', q, a:[accepted answers…], w?, s?}
   To edit: change the text only; keep the order of ex[] and the option indexes in a: consistent. */
(function () {
  var P = window.LU.practice;

  P.addPack("voc_03_natural_views", {
    ex: [
      "We took the scenic route along the coast, and the views were beautiful.",
      "The view from the top of the hill was breathtaking, and the village below looked picturesque.",
      "In the rainy season, the whole valley turns lush and green.",
      "The path was rocky, so we walked slowly and carefully.",
      "The north of the country is mountainous, so the roads are full of bends.",
      "We drove past rolling hills covered with tea plants.",
      "The cabin is hidden in a dense forest, far from any road.",
      "It is a remote village, and the nearest town is two hours away.",
      "The beach is still untouched because few tourists know about it.",
      "The water was crystal-clear, so we could see the fish at the bottom.",
      "From the hotel balcony, the rice fields stretch as far as the eye can see.",
      "Our homestay is surrounded by mountains and small streams."
    ],
    use: [
      { t: "fill", q: "We decided to take the ____ route home because it goes along the lake and through the hills.", o: ["scenic", "crowded", "noisy", "expensive"], a: 0, w: "Scenic = có phong cảnh đẹp; hợp với con đường đi qua hồ và đồi." },
      { t: "fill", q: "The lake was so ____ that we could see the stones at the bottom.", o: ["crystal-clear", "rocky", "remote", "lush"], a: 0, w: "Crystal-clear = trong vắt, thường nói về nước hoặc không khí." },
      { t: "fill", q: "Our small hotel is ____ rice fields on three sides.", o: ["surrounded by", "covered by", "closed by", "filled by"], a: 0, w: "Be surrounded by = được bao quanh bởi." },
      { t: "fill", q: "Because the island is so ____, it takes almost half a day to get there by bus and boat.", o: ["remote", "rocky", "crystal-clear", "lush"], a: 0, w: "Remote = hẻo lánh, xa khu dân cư — lý do mất nhiều thời gian di chuyển." },
      { t: "fix", q: "Câu có lỗi: “The north of Vietnam is very mountain, with steep roads.” Chọn cách sửa đúng cho từ in sai.", o: ["mountainous", "mountainy", "mountains", "mountainously"], a: 0, w: "Cần tính từ: mountainous = có nhiều núi." },
      { t: "fix", q: "Câu có lỗi: “From the top, the fields stretched until the eye could see.” Chọn cách diễn đạt đúng.", o: ["stretched as far as the eye could see", "stretched until the eyes can see", "stretched far like the eye see", "stretched to the end of eyes"], a: 0, w: "Cụm cố định: stretch as far as the eye can see." },
      { t: "speak", q: "Do you like places with beautiful natural views? Why or why not?", h: ["scenic", "breathtaking", "be surrounded by", "lush"], s: "Yes, I do. I enjoy visiting **scenic** places because they help me relax after a busy week. Last year I stayed at a small homestay that was **surrounded by** mountains, and the view from the window was **breathtaking**." },
      { t: "speak", q: "Can you describe a natural place you have visited?", h: ["rolling hills", "lush", "remote", "crystal-clear"], s: "I once visited a **remote** village in the highlands. There were **rolling hills** covered with tea plants, and the stream nearby was **crystal-clear**. It was far from the city, so the air felt fresh and quiet." }
    ],
    reuse: [
      { q: "Would you like to live in the countryside or near the mountains in the future?", h: ["mountainous", "dense forest", "be surrounded by", "untouched"], s: "I'd love to live somewhere **mountainous** one day. I imagine a small house **surrounded by** a **dense forest**, where I could hear birds in the morning. It would be a big change from city life, but I think it would be very relaxing." },
      { q: "Describe a place in nature that you would like to visit one day. You should say where it is, what it looks like, and why you want to go there.", h: ["untouched", "stretch as far as the eye can see", "picturesque", "rocky"], s: "I'd really like to visit the rice terraces in Sa Pa. I've seen photos where the fields **stretch as far as the eye can see**, and the little villages look so **picturesque**. Some parts of the area are **rocky**, so you need good shoes, but I think it's worth it. I want to go because I'd like to see a part of Vietnam that still feels **untouched**, away from the busy cities." },
      { q: "Why do some people prefer holidays in nature to holidays in big cities?", h: ["scenic", "remote", "lush"], s: "I think it's because nature gives people a chance to slow down. Many people live in noisy cities, so a **remote** area with **lush** green views feels very refreshing. Also, **scenic** places are great for taking photos and spending time with family without distractions." }
    ],
    recall: [
      { k: "vi", q: "có phong cảnh đẹp", a: ["scenic"] },
      { k: "vi", q: "trong vắt (nói về nước)", a: ["crystal-clear", "crystal clear"] },
      { k: "vi", q: "được bao quanh bởi", a: ["be surrounded by", "surrounded by"] },
      { k: "sit", q: "Một ngôi làng rất xa khu dân cư; phải đi mất vài tiếng mới tới. Tính từ nào mô tả nơi này?", a: ["remote"] },
      { k: "sit", q: "Cánh đồng lúa nhìn ra xa đến tận chân trời. Bạn nói bằng cụm nào?", a: ["stretch as far as the eye can see", "stretches as far as the eye can see", "stretched as far as the eye could see"], w: "Chia động từ cho phù hợp: The fields stretch as far as the eye can see." },
      { k: "blank", q: "The beach is still ____ because only a few tourists know about it. (còn nguyên sơ, ít bị con người tác động)", a: ["untouched"] },
      { k: "blank", q: "After the rain, the hills turn ____ and green. (xanh tươi, um tùm)", a: ["lush"] },
      { k: "speak", q: "Nói 1–2 câu về một nơi có cảnh thiên nhiên đẹp mà bạn từng đến. Thử dùng ít nhất hai cụm đã học.", a: ["scenic", "breathtaking", "be surrounded by", "rolling hills"], s: "I once visited a **scenic** lake town. It was **surrounded by** **rolling hills**, and the view in the early morning was **breathtaking**." }
    ]
  });

  P.addPack("voc_04_places", {
    ex: [
      "My flat is convenient because there is a supermarket and a bus stop right outside.",
      "The area is well-connected, with two metro lines and several bus routes.",
      "The hotel is centrally located, so we could walk to most places.",
      "I live in a quiet residential area, away from the main roads.",
      "The park is well-maintained, with clean paths and fresh flowers.",
      "The old market looks run-down, and some of the roofs are broken.",
      "The city center gets overcrowded at weekends, and it's hard to find a seat in a café.",
      "The old town is well-preserved, and many buildings still look the way they did a hundred years ago.",
      "The neighborhood is vibrant at night, with street food and live music.",
      "People in my hometown are laid-back and never seem to be in a hurry.",
      "The new street is pedestrian-friendly, with wide pavements and no motorbikes.",
      "The library is easily accessible by bus, even for people who live far away.",
      "In small villages there is often a sense of community, because everyone knows each other.",
      "The gym is well-equipped, with modern machines and a clean changing room.",
      "The city has a well-developed transport system, so most people don't need a car."
    ],
    use: [
      { t: "fill", q: "I chose this flat because it's very ____: there's a market, a pharmacy and a bus stop within five minutes' walk.", o: ["convenient", "overcrowded", "run-down", "laid-back"], a: 0, w: "Convenient = thuận tiện; hợp với việc mọi thứ đều ở gần." },
      { t: "fill", q: "The old part of the city is ____, so you can still see houses from the nineteenth century.", o: ["well-preserved", "run-down", "overcrowded", "well-equipped"], a: 0, w: "Well-preserved = được bảo tồn tốt, giữ gần nguyên trạng." },
      { t: "fill", q: "Cafés in this area are always full at weekends. It gets so ____ that it's hard to find a table.", o: ["overcrowded", "pedestrian-friendly", "well-maintained", "accessible"], a: 0, w: "Overcrowded = quá đông đúc." },
      { t: "fill", q: "The street is closed to cars and has wide pavements and benches. It's very ____.", o: ["pedestrian-friendly", "run-down", "overcrowded", "remote"], a: 0, w: "Pedestrian-friendly = thân thiện với người đi bộ." },
      { t: "fix", q: "Câu có lỗi: “My neighborhood is very convenience because there are shops nearby.” Chọn dạng từ đúng.", o: ["convenient", "conveniently", "convenience", "conveniences"], a: 0, w: "Sau “is very” cần tính từ: convenient." },
      { t: "fix", q: "Câu có lỗi: “The area is good connected, so I can reach the airport easily.” Chọn cách sửa đúng.", o: ["well-connected", "good connecting", "well-connecting", "well-connection"], a: 0, w: "Cụm đúng: well-connected (có kết nối giao thông tốt)." },
      { t: "speak", q: "Can you describe the area where you live?", h: ["residential area", "convenient", "well-connected", "a sense of community"], s: "I live in a quiet **residential area** on the edge of the city. It's very **convenient** because there are shops and a market nearby, and it's **well-connected** by bus. There's also **a sense of community**, because many neighbors have lived here for years." },
      { t: "speak", q: "What do you like and dislike about your hometown?", h: ["vibrant", "overcrowded", "laid-back", "well-developed"], s: "What I like most is that my hometown is **vibrant**, especially in the evening when the streets are full of food stalls. However, the center can get **overcrowded** at weekends, which makes it quite stressful." }
    ],
    reuse: [
      { q: "Do you prefer living in the city center or in a quiet area?", h: ["centrally located", "residential area", "accessible", "laid-back"], s: "I prefer a quiet **residential area**. A **centrally located** apartment is convenient, but it's often noisy. In a calmer area, life is more **laid-back**, and I can still reach the center easily because the roads are **accessible**." },
      { q: "Describe a place in your city where people like to spend time. You should say where it is, what it looks like, and why people like it.", h: ["well-maintained", "pedestrian-friendly", "vibrant", "a sense of community"], s: "I'd like to talk about a walking street near the lake in my city. It's **pedestrian-friendly**, so families can walk safely without motorbikes. The area is **well-maintained**, with clean paths and plenty of trees. In the evening it's **vibrant**, with street performers and food stalls, and I think people like it because it creates **a sense of community**." },
      { q: "What can governments do to improve poor or run-down areas of a city?", h: ["run-down", "well-equipped", "well-developed", "accessible"], s: "I think they should invest in basic services first. A **run-down** area often lacks good schools or clinics, so building **well-equipped** facilities would help a lot. They could also improve public transport to make the area more **accessible**, because then people can reach jobs more easily." }
    ],
    recall: [
      { k: "vi", q: "thuận tiện", a: ["convenient"] },
      { k: "vi", q: "có kết nối giao thông tốt", a: ["well-connected", "well connected"] },
      { k: "vi", q: "xuống cấp", a: ["run-down", "run down"] },
      { k: "sit", q: "Một thành phố có giao thông, y tế và giáo dục đều phát triển tốt. Bạn dùng cụm tính từ nào?", a: ["well-developed", "well developed"] },
      { k: "sit", q: "Con phố rộng rãi, vỉa hè lớn, xe máy không được vào, đi bộ rất dễ chịu. Bạn mô tả bằng cụm nào?", a: ["pedestrian-friendly", "pedestrian friendly"] },
      { k: "blank", q: "The old town is so ____ that many buildings still look the way they did a century ago. (được bảo tồn tốt)", a: ["well-preserved", "well preserved"] },
      { k: "blank", q: "In my village, people have ____ because neighbors often help each other. (cảm giác gắn kết cộng đồng)", a: ["a sense of community", "sense of community"] },
      { k: "speak", q: "Nói 1–2 câu về khu vực bạn sống. Thử dùng ít nhất hai cụm đã học.", a: ["residential area", "convenient", "well-connected", "centrally located"], s: "I live in a **residential area** that is **convenient** for daily life. It's **well-connected**, so I can take the bus almost anywhere." }
    ]
  });

  P.addPack("voc_05_experiences_events", {
    ex: [
      "My graduation day was unforgettable, and I still remember every moment.",
      "Seeing the northern lights would be a once-in-a-lifetime experience.",
      "Volunteering at the shelter was tiring but really rewarding.",
      "I was thrilled when I heard that I had won the prize.",
      "On my first day at the new job I felt overwhelmed by so many names and tasks.",
      "I felt relieved when the exam was finally over.",
      "It was frustrating to wait for two hours with no information.",
      "The festival will be held in the old town next month.",
      "The concert will be organized by the student union.",
      "At first I was nervous, but then I started to enjoy the party.",
      "Over time, I got used to the noise and the busy streets.",
      "We got lost twice, but eventually we found the restaurant.",
      "Some of the quietest trips turn out to be the most memorable.",
      "I hope the interview will go smoothly.",
      "I'd like to take part in a charity run this year.",
      "We tried to make the most of our short trip by visiting three places a day.",
      "You can learn a valuable lesson from almost every mistake."
    ],
    use: [
      { t: "fill", q: "Seeing snow for the first time was a ____ experience for me; I'll probably never have the chance again.", o: ["once-in-a-lifetime", "overwhelmed", "relieved", "thrilled"], a: 0, w: "Once-in-a-lifetime + experience = trải nghiệm hiếm có." },
      { t: "fill", q: "The Lantern Festival is ____ in the old town every autumn, and thousands of people come.", o: ["held", "taken", "gone", "made"], a: 0, w: "Be held = được tổ chức (nói về sự kiện)." },
      { t: "fill", q: "The exam was very stressful, but when it was finally over, I felt ____.", o: ["relieved", "frustrating", "memorable", "rewarding"], a: 0, w: "Relieved = nhẹ nhõm; “frustrating/memorable/rewarding” mô tả sự việc, không mô tả cảm xúc của mình." },
      { t: "fill", q: "I felt nervous ____, but after a few minutes I started to enjoy the party.", o: ["at first", "eventually", "over time", "in the end"], a: 0, w: "At first = lúc đầu, đối lập với sự thay đổi sau đó." },
      { t: "fix", q: "Câu có lỗi: “Last year I joined in a charity run, and it was a great experience.” Chọn cách sửa đúng.", o: ["took part in", "took part to", "made part in", "joined part in"], a: 0, w: "Cụm đúng: take part in = tham gia." },
      { t: "fix", q: "Câu có lỗi: “I tried to take the most of my short stay in Hue, so I visited many places.” Chọn cách sửa đúng.", o: ["make the most of", "take the most from", "do the most of", "get the most on"], a: 0, w: "Cụm cố định: make the most of = tận dụng tối đa." },
      { t: "speak", q: "Can you tell me about a memorable event in your life?", h: ["unforgettable", "take part in", "thrilled", "learn a valuable lesson"], s: "One **unforgettable** event was a school trip to the countryside when I was fifteen. We **took part in** a lot of activities, and I was **thrilled** because it was my first trip without my parents." },
      { t: "speak", q: "Have you ever felt overwhelmed by a new situation?", h: ["overwhelmed", "at first", "over time", "eventually"], s: "Yes. When I moved to a new school, I felt **overwhelmed** because everything was unfamiliar. **At first** I didn't know anyone, but **over time** I made friends and felt much more comfortable." }
    ],
    reuse: [
      { q: "Do you often go to big events like concerts or festivals?", h: ["be held", "take part in", "make the most of", "go smoothly"], s: "Not very often, but I enjoy local festivals. They're usually **held** in the park near my home. When I go, I try to **make the most of** the day by joining the games and trying different food." },
      { q: "Describe an event that you helped to organize. You should say what it was, what you did, how it went, and how you felt about it.", h: ["be organized", "go smoothly", "frustrating", "relieved"], s: "I'd like to talk about a farewell party for my classmates. It **was organized** by a small group of us. There were some **frustrating** moments, like when the speaker didn't work, but the evening **went smoothly** in the end. I felt really **relieved** and proud afterwards." },
      { q: "Why do you think some people prefer spending money on experiences rather than things?", h: ["memorable", "rewarding", "learn a valuable lesson", "once-in-a-lifetime"], s: "I think experiences are more **memorable** than objects. A trip with friends can be a **once-in-a-lifetime** moment, and it stays with you for many years. Experiences can also be **rewarding**, because you often **learn a valuable lesson** about yourself." }
    ],
    recall: [
      { k: "vi", q: "đáng nhớ / không thể nào quên", a: ["memorable", "unforgettable"] },
      { k: "vi", q: "cuối cùng, sau một quá trình", a: ["eventually"] },
      { k: "vi", q: "hóa ra là", a: ["turn out to be", "turned out to be", "turns out to be"] },
      { k: "sit", q: "Buổi phỏng vấn diễn ra mà không có trục trặc nào. Bạn nói gì?", a: ["go smoothly", "went smoothly", "goes smoothly"], w: "Ví dụ: The interview went smoothly." },
      { k: "sit", q: "Có quá nhiều thông tin và việc phải xử lý cùng lúc, đến mức bạn thấy khó chịu nổi. Tính từ chỉ cảm xúc của bạn là gì?", a: ["overwhelmed"] },
      { k: "blank", q: "You should ____ your time abroad by meeting local people and trying new things. (tận dụng tối đa)", a: ["make the most of"] },
      { k: "blank", q: "It was a tiring week, but helping at the shelter was really ____. (xứng đáng với công sức)", a: ["rewarding"] },
      { k: "speak", q: "Nói 1–2 câu về một sự kiện bạn đã tham gia gần đây. Thử dùng ít nhất hai cụm đã học.", a: ["take part in", "be held", "thrilled", "memorable"], s: "Last month I **took part in** a charity run that was **held** by my university. I felt **thrilled** at the finish line, and it was a really **memorable** day." }
    ]
  });

  P.addPack("voc_06_skills_achievements", {
    ex: [
      "I'm good at explaining things in a simple way.",
      "My sister has a knack for drawing; she never took any lessons.",
      "You can pick up a lot of vocabulary from songs.",
      "It takes years to master a musical instrument.",
      "She is proficient in English and French.",
      "He's a dedicated teacher who often stays late to help students.",
      "I was determined to finish the marathon even though my legs hurt.",
      "I hope to make progress in my speaking before the exam.",
      "It took time to overcome my fear of public speaking.",
      "If you put in the effort every day, you will see results.",
      "Joining the debate club made me step out of my comfort zone.",
      "I'm happy that I could accomplish everything on my list.",
      "Finishing the course gave me a sense of achievement.",
      "Hard work will pay off in the end.",
      "The first month at university was challenging, but I learned a lot.",
      "Teaching children is tiring but rewarding."
    ],
    use: [
      { t: "fill", q: "She is really ____ drawing; her pictures always look professional.", o: ["good at", "good in", "good on", "good for"], a: 0, w: "Be good at + noun / V-ing = giỏi về." },
      { t: "fill", q: "I wasn't very confident, but speaking at the school event made me ____, and I was proud of myself afterwards.", o: ["step out of my comfort zone", "go out of the comfort field", "pick up my comfort zone", "master my comfort zone"], a: 0, w: "Step out of my comfort zone = bước ra khỏi vùng an toàn." },
      { t: "fill", q: "After six months of daily practice, her hard work finally ____ and she passed the test.", o: ["paid off", "paid in", "paid up", "paid for"], a: 0, w: "Pay off = mang lại kết quả xứng đáng sau nỗ lực." },
      { t: "fill", q: "He is very ____: he never gives up, even when the task is extremely difficult.", o: ["determined", "proficient", "rewarding", "challenging"], a: 0, w: "Determined = quyết tâm; mô tả tính cách của người." },
      { t: "fix", q: "Câu có lỗi: “I want to make a progress in my speaking this year.” Chọn cách sửa đúng.", o: ["make progress", "do progress", "make progresses", "get a progress"], a: 0, w: "Progress là danh từ không đếm được: make progress." },
      { t: "fix", q: "Câu có lỗi: “She is proficient on English, so she often works with foreign clients.” Chọn cách sửa đúng.", o: ["proficient in", "proficient to", "proficient of", "proficient at on"], a: 0, w: "Cụm đúng: proficient in + ngôn ngữ / kỹ năng." },
      { t: "speak", q: "What is something you are good at?", h: ["be good at", "have a knack for", "pick up", "put in the effort"], s: "I'm **good at** cooking simple dishes. I think I **have a knack for** combining flavors, and I **picked up** most of my skills by watching videos online. Of course, I also **put in the effort**, because I practice almost every weekend." },
      { t: "speak", q: "Have you ever learned a new skill? How did it go?", h: ["make progress", "dedicated", "challenging", "master"], s: "Yes, I started learning the guitar last year. It was **challenging** at first, but I was **dedicated**, so I practiced every evening. I've **made progress**, although I'm still far from being able to **master** it." }
    ],
    reuse: [
      { q: "Are you proud of something you have achieved?", h: ["accomplish", "a sense of achievement", "pay off", "overcome"], s: "Yes, I'm proud that I finished my first half marathon. It was hard, but I felt **a sense of achievement** when I crossed the finish line. All my training **paid off**, and it showed me that I can **accomplish** difficult goals." },
      { q: "Describe a skill that took you a long time to learn. You should say what it was, how you learned it, what difficulties you had, and how you felt when you improved.", h: ["master", "overcome", "determined", "step out of my comfort zone"], s: "I'd like to talk about speaking English. It took me years, and I'm still not ready to say I've **mastered** it. At first I was afraid of making mistakes, so I had to **step out of my comfort zone** and talk to foreigners online. I was **determined** to **overcome** my fear, and slowly my confidence improved." },
      { q: "Do you think talent or hard work is more important for success?", h: ["have a knack for", "put in the effort", "proficient in", "pay off"], s: "I think hard work matters more. Some people **have a knack for** certain things, but they still need to **put in the effort** to improve. For example, anyone can become **proficient in** a language if they practice regularly, and in the long run their efforts will **pay off**." }
    ],
    recall: [
      { k: "vi", q: "giỏi về", a: ["be good at", "good at"] },
      { k: "vi", q: "thành thạo, làm chủ (một kỹ năng)", a: ["master"] },
      { k: "vi", q: "bước ra khỏi vùng an toàn", a: ["step out of my comfort zone", "step out of your comfort zone", "step out of one's comfort zone", "step out of the comfort zone"] },
      { k: "sit", q: "Bạn làm việc rất chăm chỉ và cuối cùng đạt được kết quả tốt. Bạn dùng cụm động từ nào?", a: ["pay off", "paid off", "pays off"] },
      { k: "sit", q: "Bạn thấy tự hào và thỏa mãn vì vừa hoàn thành một mục tiêu khó. Bạn nói bằng danh từ nào?", a: ["a sense of achievement", "sense of achievement"] },
      { k: "blank", q: "My cousin ____ languages; she picks up new words after hearing them once. (có năng khiếu tự nhiên)", a: ["has a knack for", "have a knack for"] },
      { k: "blank", q: "I could ____ some basic Spanish just by listening to music. (học được một cách tự nhiên, không cần học chính thức)", a: ["pick up"] },
      { k: "speak", q: "Nói 1–2 câu về một thử thách bạn đã vượt qua. Thử dùng ít nhất hai cụm đã học.", a: ["overcome", "challenging", "determined", "make progress"], s: "Learning to swim as an adult was **challenging**, but I was **determined** to improve. In the end I managed to **overcome** my fear of deep water." }
    ]
  });

  P.addPack("voc_07_study_education", {
    ex: [
      "Sleep can affect your academic performance more than you think.",
      "She studies hard to get good grades every semester.",
      "It took me a while to grasp the concept of probability.",
      "We go to school not only to acquire knowledge but also to learn how to think.",
      "I retain information better when I draw diagrams.",
      "I hope to make progress with my writing this term.",
      "If you miss too many classes, it's easy to fall behind.",
      "It was hard to keep up with the lessons when the teacher spoke quickly.",
      "I usually revise for an exam by making short notes.",
      "It's stressful to meet a deadline when you have three assignments.",
      "Studying with friends helps me stay motivated.",
      "I use a planner to manage my time effectively.",
      "Students are often under pressure before final exams.",
      "You won't improve unless you put in the effort."
    ],
    use: [
      { t: "fill", q: "I take notes and draw diagrams because it helps me ____ information for a long time.", o: ["retain", "meet", "revise", "fall"], a: 0, w: "Retain information = ghi nhớ thông tin lâu." },
      { t: "fill", q: "If you don't do your homework regularly, you may ____ and find it hard to understand new lessons.", o: ["fall behind", "keep up with", "get good grades", "acquire knowledge"], a: 0, w: "Fall behind = bị tụt lại so với lớp." },
      { t: "fill", q: "She revised every night, so she was able to ____ a high score in the final exam.", o: ["achieve", "make", "do", "take"], a: 0, w: "Achieve a high score = đạt điểm số cao." },
      { t: "fill", q: "It is hard for me to ____ when the lesson is boring, so I set small goals to stay interested.", o: ["stay motivated", "meet a deadline", "acquire knowledge", "fall behind"], a: 0, w: "Stay motivated = duy trì động lực." },
      { t: "fix", q: "Câu có lỗi: “I'm trying to manage my time effective so I can finish my homework early.” Chọn dạng từ đúng.", o: ["effectively", "effectiveness", "effecting", "effective"], a: 0, w: "Bổ nghĩa cho động từ manage cần trạng từ: effectively." },
      { t: "fix", q: "Câu có lỗi: “It's hard for some students to keep up the lessons when the teacher speaks too fast.” Chọn cách sửa đúng.", o: ["keep up with", "keep on with", "keep out of", "keep in with"], a: 0, w: "Cụm đúng: keep up with = theo kịp." },
      { t: "speak", q: "What do you do to prepare for an exam?", h: ["revise for an exam", "manage my time effectively", "retain information", "stay motivated"], s: "I usually **revise for an exam** about two weeks in advance. I make a timetable to **manage my time effectively**, and I write short notes because that helps me **retain information**. When I get tired, I take a short break to **stay motivated**." },
      { t: "speak", q: "Did you do well at school?", h: ["academic performance", "get good grades", "put in the effort", "fall behind"], s: "I think my **academic performance** was quite good, especially in English. I always tried to **get good grades**, so I **put in the effort** to do my homework carefully, and I never **fell behind** in class." }
    ],
    reuse: [
      { q: "Is it easy for you to learn new things?", h: ["grasp a concept", "acquire knowledge", "keep up with", "make progress"], s: "It depends. I can **grasp a concept** quickly if there are clear examples, but difficult topics take longer. I enjoy learning because it's a way to **acquire knowledge** that I can use in real life, and I try to **keep up with** new topics by reading every day." },
      { q: "Describe a time when you studied hard for something important. You should say what it was, how you prepared, how you felt, and what the result was.", h: ["be under pressure", "manage my time effectively", "stay motivated", "achieve a high score"], s: "Last year I studied hard for my IELTS exam. I **was under pressure** because I needed a certain score for a scholarship, so I made a plan to **manage my time effectively**. It was difficult to **stay motivated** sometimes, but I had a clear goal. In the end I **achieved a high score**, and all the effort felt worth it." },
      { q: "Why do some students feel under a lot of pressure at school? How can schools help?", h: ["be under pressure", "academic performance", "fall behind", "put in the effort"], s: "I think many students **are under pressure** because their families expect good results. If they **fall behind**, they worry about their future. Schools can help by giving extra support to students who need it and by reminding them that **academic performance** isn't the only thing that matters." }
    ],
    recall: [
      { k: "vi", q: "ôn thi", a: ["revise for an exam", "revise for exams", "revise for the exam"] },
      { k: "vi", q: "tiếp thu kiến thức", a: ["acquire knowledge"] },
      { k: "vi", q: "bị tụt lại trong việc học", a: ["fall behind", "fell behind", "falls behind"] },
      { k: "sit", q: "Bạn nộp bài tập đúng ngày giáo viên yêu cầu. Bạn dùng cụm động từ nào?", a: ["meet a deadline", "meet the deadline", "met the deadline", "met a deadline"] },
      { k: "sit", q: "Sau khi giáo viên giải thích ví dụ, bạn cuối cùng cũng hiểu một ý tưởng khó. Bạn dùng cụm nào?", a: ["grasp a concept", "grasp the concept", "grasped the concept"] },
      { k: "blank", q: "I ____ by using a planner and setting small deadlines. (quản lý thời gian hiệu quả)", a: ["manage my time effectively"] },
      { k: "blank", q: "Before final exams, many students ____. (chịu áp lực)", a: ["are under pressure", "feel under pressure", "are under a lot of pressure"] },
      { k: "speak", q: "Nói 1–2 câu về cách bạn giữ động lực khi học. Thử dùng ít nhất hai cụm đã học.", a: ["stay motivated", "put in the effort", "make progress", "keep up with"], s: "I **stay motivated** by setting small goals every week. When I **make progress**, I feel more confident, so I **put in the effort** to keep going." }
    ]
  });

  P.addPack("voc_08_work_careers", {
    ex: [
      "My job responsibilities include answering emails and organizing meetings.",
      "The workload gets heavier at the end of the month.",
      "Being a nurse is a demanding job, both physically and mentally.",
      "I can work under pressure, but I prefer a calm office.",
      "It's not easy to meet a deadline when the team is small.",
      "Interns gain hands-on experience that you can't get from books.",
      "A part-time job is a good way to develop professional skills.",
      "People with good English often have better career prospects.",
      "Money is important, but job satisfaction matters more to me.",
      "Many people prefer government jobs because of job security.",
      "Not everyone can earn a living from their hobby.",
      "It's hard to strike a balance between work and personal life when you work overtime.",
      "Teaching can be rewarding, especially when students make progress.",
      "It's easier to stay motivated when your boss recognizes your effort.",
      "Every new job teaches you how to overcome a challenge.",
      "I try to manage my time effectively so I don't have to take work home."
    ],
    use: [
      { t: "fill", q: "Doctors have a very ____ job: they work long hours and have to make serious decisions.", o: ["demanding", "satisfied", "secure", "hands-on"], a: 0, w: "Demanding = đòi hỏi nhiều công sức (thể chất lẫn tinh thần)." },
      { t: "fill", q: "Working as an intern gave me ____ experience that I could never get in the classroom.", o: ["hands-on", "hand-in", "handy", "hand-made"], a: 0, w: "Hands-on experience = kinh nghiệm thực tế." },
      { t: "fill", q: "I'd like a stable job with good ____, so I won't worry about losing it.", o: ["job security", "job satisfaction", "workload", "responsibilities"], a: 0, w: "Job security = sự ổn định, đảm bảo công việc." },
      { t: "fill", q: "My ____ include preparing reports, answering emails and attending weekly meetings.", o: ["job responsibilities", "career prospects", "hands-on experience", "job satisfaction"], a: 0, w: "Job responsibilities = trách nhiệm công việc." },
      { t: "fix", q: "Câu có lỗi: “It's difficult to make a balance between work and personal life when you work overtime.” Chọn cách sửa đúng.", o: ["strike a balance", "do a balance", "hold a balance", "catch a balance"], a: 0, w: "Cụm cố định: strike a balance between … and …" },
      { t: "fix", q: "Câu có lỗi: “He gets a living as a freelance designer.” Chọn cách sửa đúng.", o: ["earns a living", "takes a living", "has a living", "wins the living"], a: 0, w: "Cụm đúng: earn a living = kiếm sống." },
      { t: "speak", q: "What do you do for work, or what job would you like to do in the future?", h: ["job responsibilities", "workload", "demanding", "meet a deadline"], s: "I'd like to work in marketing. I think the **job responsibilities** are interesting, because you create ideas and work with different people. It can be **demanding**, and you often have to **meet deadlines**, but I'm happy to learn." },
      { t: "speak", q: "What makes a job enjoyable for you?", h: ["job satisfaction", "career prospects", "be rewarding", "develop professional skills"], s: "For me, **job satisfaction** is more important than a high salary. I'd like a job that **is rewarding**, where I can **develop professional skills** and feel that I'm helping people. Good **career prospects** also matter, because I want to keep growing." }
    ],
    reuse: [
      { q: "Would you prefer a job with a high salary or a job with a good work-life balance?", h: ["strike a balance between work and personal life", "workload", "job satisfaction", "earn a living"], s: "I'd choose a good balance. A high salary is nice, but if the **workload** is too heavy, it's hard to **strike a balance between work and personal life**. I only need to **earn a living** that lets me live comfortably, and I think I'd have more **job satisfaction** if I had time for my family." },
      { q: "Describe a job that you think is difficult. You should say what the job is, why it is difficult, what skills it needs, and whether you would like to do it.", h: ["demanding", "work under pressure", "manage my time effectively", "overcome a challenge"], s: "I think being a doctor is one of the most **demanding** jobs. Doctors often **work under pressure**, because they have to make fast decisions that affect people's lives. They also need to **manage their time effectively** and **overcome challenges** like exhaustion. I admire them, but I don't think I could do it myself." },
      { q: "Why is job security important to many people?", h: ["job security", "career prospects", "earn a living", "stay motivated"], s: "I think it's because people need a stable income to **earn a living** and support their families. Without **job security**, they worry all the time, so it's difficult to **stay motivated**. Some people also feel that a secure job offers better **career prospects** in the long term." }
    ],
    recall: [
      { k: "vi", q: "khối lượng công việc", a: ["workload"] },
      { k: "vi", q: "kinh nghiệm thực tế", a: ["hands-on experience", "hands on experience"] },
      { k: "vi", q: "triển vọng nghề nghiệp", a: ["career prospects"] },
      { k: "sit", q: "Bạn kiếm tiền từ công việc để có thể sống tự lập. Bạn dùng cụm động từ nào?", a: ["earn a living", "earns a living", "make a living"] },
      { k: "sit", q: "Công việc đòi hỏi nhiều công sức, mệt cả thể chất lẫn tinh thần. Bạn dùng tính từ nào?", a: ["demanding"] },
      { k: "blank", q: "Many people choose a government job because of its ____. (sự ổn định, đảm bảo công việc)", a: ["job security"] },
      { k: "blank", q: "It's hard to ____ when you work overtime every day. (cân bằng công việc và cuộc sống cá nhân)", a: ["strike a balance between work and personal life", "strike a balance"] },
      { k: "speak", q: "Nói 1–2 câu về điều khiến bạn hài lòng trong công việc hoặc việc học. Thử dùng ít nhất hai cụm đã học.", a: ["job satisfaction", "be rewarding", "develop professional skills", "stay motivated"], s: "What gives me **job satisfaction** is learning new things. My work can **be rewarding** when I **develop professional skills** and see clear results." }
    ]
  });
})();
