/* Practice packs 6/6 — the 8 Language Functions (Use · Reuse · Retrieve). Each task trains the FUNCTION itself (giving reasons, describing change,
   expressing feelings, giving examples, comparing, speculating, reflecting, giving opinions), not just the opening phrases.
   Format: see data/packs-1.js and P.addPack in js/practice.js. Examples are written to be reviewed/edited by the teacher. */
(function () {
  var P = window.LU.practice;

  /* ── 01 Giving Reasons ────────────────────────────────────────────────── */
  P.addPack("fn_01_giving_reasons", {
    lg: [
      ["The main reason is that…", "Lý do chính là…", "I prefer studying at night. The main reason is that the house is quiet and I can concentrate."],
      ["One reason for this is…", "Một lý do cho điều này là…", "Many people now pay by phone. One reason for this is the convenience when shopping online."],
      ["This is largely because…", "Điều này phần lớn là do…", "Young people spend a lot of time on their phones. This is largely because social media is designed to keep them scrolling."],
      ["Another reason is that…", "Một lý do khác là…", "I don't use public transport much. Another reason is that the bus routes near my house are limited."],
      ["This is partly due to…", "Điều này một phần là do…", "Fewer people read printed newspapers. This is partly due to the growth of news apps."],
      ["That's why…", "Đó là lý do…", "I get tired easily if I skip breakfast. That's why I always eat something before work."]
    ],
    use: [
      { t: "fill", q: "Why do you enjoy cooking at home? — “____ I can control what goes into my food.”", o: ["The main reason is that", "Looking back,", "Compared with", "In contrast,"], a: 0, w: "Cần một cụm đưa ra lý do chính, theo sau là mệnh đề: The main reason is that + clause." },
      { t: "fill", q: "The old town is very crowded at weekends. ____ the new walking street, which attracts more tourists.", o: ["This is partly due to", "That's why", "It used to be", "I would imagine"], a: 0, w: "This is partly due to + danh từ = một phần là do…; sau chỗ trống là một cụm danh từ." },
      { t: "fill", q: "Coffee keeps me awake for hours. ____ I never drink it after six in the evening.", o: ["That's why", "This is largely because", "One reason for this is", "Another reason is that"], a: 0, w: "That's why + kết quả: nêu kết quả của lý do đã nói ở câu trước." },
      { t: "fill", q: "I prefer living in the city. The main reason is that there are more job opportunities. ____ public transport is much better.", o: ["Another reason is that", "That's why", "Looking back,", "Whereas"], a: 0, w: "Another reason is that = thêm một lý do thứ hai sau lý do đầu tiên." },
      { t: "fix", q: "Câu có lỗi: “One reason for this are that prices are high.” Chọn câu đúng.", o: ["One reason for this is that prices are high.", "One reason for this are that prices are high.", "One reasons for this is that prices are high.", "One reason of this is that prices are high."], a: 0, w: "Chủ ngữ “One reason” số ít → động từ is; cụm đúng là “reason for”." },
      { t: "fix", q: "Câu có lỗi: “This is largely because of the city is too crowded.” Chọn câu đúng.", o: ["This is largely because the city is too crowded.", "This is largely because of the city is too crowded.", "This is largely because that the city is too crowded.", "This is largely cause the city is too crowded."], a: 0, w: "because + mệnh đề; because of + danh từ. Ở đây theo sau là một mệnh đề đầy đủ." },
      { t: "speak", q: "Why do some people prefer to live in a small town? Give at least two reasons and say what result they lead to.", h: ["The main reason is that", "Another reason is that", "That's why"], s: "I think there are two main reasons. **The main reason is that** life in a small town is less stressful, and people don't spend hours in traffic. **Another reason is that** housing is cheaper, so young families can afford a bigger home. **That's why** some people move back to their hometown after a few years in the city." },
      { t: "speak", q: "Why do you think many people prefer online shopping? Explain the cause and say how strong each reason is.", h: ["This is largely because", "One reason for this is", "This is partly due to"], s: "Many people prefer it, and I think **this is largely because** it saves time. **One reason for this is** that you can compare prices in a few minutes. **This is partly due to** the improvement of delivery services, too, because parcels now arrive in a day or two." }
    ],
    reuse: [
      { q: "Why did you choose your major or your job?", h: ["The main reason is that", "Another reason is that", "That's why"], s: "**The main reason is that** I've always enjoyed working with people, and my job lets me do that every day. **Another reason is that** the salary is stable, which is important for my family. **That's why** I never regretted my choice, even when the work gets busy." },
      { q: "Describe a place you often go to relax. You should say where it is, how often you go, what you do there, and explain why you like going there.", h: ["The main reason is that", "One reason for this is", "This is partly due to", "That's why"], s: "I'd like to talk about a small park near my house. I go there about three times a week, usually after work, and I just walk or sit by the lake. **The main reason is that** it's quiet, so I can clear my mind. **One reason for this is** that there are no shops or cars nearby. **This is partly due to** the old trees, which also keep the air cool. **That's why** I'd say it's my favorite place to relax." },
      { q: "Why do some students find it hard to concentrate in class?", h: ["This is largely because", "Another reason is that", "This is partly due to", "One reason for this is"], s: "I think **this is largely because** they are tired. Many students stay up late using their phones. **Another reason is that** some lessons are not interesting, so their minds wander. **This is partly due to** the way classes are taught, because teachers often talk for a long time. **One reason for this** could also be a noisy classroom." }
    ],
    recall: [
      { k: "vi", q: "Lý do chính là…", a: ["the main reason is that", "main reason is that", "the main reason is"] },
      { k: "vi", q: "Điều này một phần là do…", a: ["this is partly due to", "partly due to"] },
      { k: "sit", q: "Bạn đã nêu một lý do và muốn thêm một lý do thứ hai. Bạn bắt đầu câu tiếp theo bằng cụm nào?", a: ["another reason is that", "another reason is"] },
      { k: "sit", q: "Bạn muốn nói rằng điều gì đó xảy ra chủ yếu (phần lớn) vì một nguyên nhân lớn. Bạn dùng cụm nào?", a: ["this is largely because", "largely because"] },
      { k: "blank", q: "Coffee keeps me awake. ____ I never drink it after six. (Đó là lý do…)", a: ["that's why", "that is why", "thats why"] },
      { k: "blank", q: "Many young people live with their parents. ____ the high cost of renting. (Một lý do cho điều này là…)", a: ["one reason for this is", "one reason is"] },
      { k: "speak", q: "Nói 2–3 câu: vì sao bạn thích (hoặc không thích) làm việc hay học vào buổi tối? Nêu ít nhất hai lý do và một kết quả.", a: ["the main reason is that", "another reason is that", "that's why", "this is largely because"], s: "**The main reason is that** it's quiet at night, so I can concentrate. **Another reason is that** I feel more creative in the evening. **That's why** I often study until midnight." }
    ]
  });

  /* ── 02 Describing Change ─────────────────────────────────────────────── */
  P.addPack("fn_02_describing_change", {
    lg: [
      ["It used to…", "Trước đây nó từng…", "My street used to be very quiet, but now it is full of small shops."],
      ["It has become more…", "Nó đã trở nên… hơn", "My city has become more crowded because many people have moved here for work."],
      ["It has changed significantly.", "Nó đã thay đổi đáng kể.", "I visited my old school last month, and it has changed significantly."],
      ["Compared with the past…", "So với trước đây…", "Compared with the past, people now spend much more time online."],
      ["These days…", "Ngày nay…", "These days, most of my friends read the news on their phones."],
      ["Over the years…", "Qua nhiều năm…", "Over the years, the local market has grown into a modern shopping center."],
      ["There has been a noticeable change in…", "Đã có một thay đổi rõ rệt về…", "There has been a noticeable change in the way people pay for things."]
    ],
    use: [
      { t: "fill", q: "Ten years ago the riverside was empty. ____ a quiet place, but now it is full of cafés.", o: ["It used to be", "For example,", "Perhaps", "In contrast,"], a: 0, w: "It used to be = trước đây từng là (thói quen/trạng thái trong quá khứ nay đã khác)." },
      { t: "fill", q: "Smartphones are everywhere. ____, people check their phones within a minute of waking up.", o: ["These days", "It used to", "Looking back", "Whereas"], a: 0, w: "These days, + mệnh đề hiện tại = ngày nay…" },
      { t: "fill", q: "I haven't been to the city center for years. ____ the way people dress; everyone looks more fashionable now.", o: ["There has been a noticeable change in", "It used to be in", "Perhaps in", "I'd say that in"], a: 0, w: "There has been a noticeable change in + danh từ / the way…" },
      { t: "fill", q: "____, my hometown has grown from a small village into a busy town.", o: ["Over the years", "For example", "Perhaps", "I'd say that"], a: 0, w: "Over the years + thì hiện tại hoàn thành để nói về sự thay đổi kéo dài." },
      { t: "fix", q: "Câu có lỗi: “My town used to being very small.” Chọn câu đúng.", o: ["My town used to be very small.", "My town used to being very small.", "My town use to be very small.", "My town was used to be very small."], a: 0, w: "used to + động từ nguyên mẫu (be)." },
      { t: "fix", q: "Câu có lỗi: “There is been a noticeable change in the way people travel.” Chọn câu đúng.", o: ["There has been a noticeable change in the way people travel.", "There is been a noticeable change in the way people travel.", "There have been a noticeable change in the way people travel.", "It has been a noticeable change in the way people travel."], a: 0, w: "There has been + danh từ số ít (a change): thì hiện tại hoàn thành." },
      { t: "speak", q: "How has your hometown changed since you were a child? Describe the past and the present.", h: ["It used to", "It has become more", "Over the years", "There has been a noticeable change in"], s: "My hometown **used to** be a quiet town with only a few shops. **Over the years**, it **has become more** crowded and modern, because many companies opened offices there. **There has been a noticeable change in** the traffic, too, and I miss the peaceful streets of my childhood." },
      { t: "speak", q: "How has the way people communicate changed? Compare the past with now.", h: ["Compared with the past", "These days", "It has changed significantly"], s: "**Compared with the past**, communication **has changed significantly**. My parents wrote letters to their friends, but **these days** we send messages instantly. I think it's more convenient, though we talk face to face less often." }
    ],
    reuse: [
      { q: "Has the way people spend their free time changed in your country?", h: ["Compared with the past", "These days", "It has become more"], s: "Yes, I think so. **Compared with the past**, people have less time for outdoor games. **These days**, many people stay at home and watch videos or play games on their phones, and shopping **has become more** of a leisure activity too." },
      { q: "Describe a place that has changed a lot since you first knew it. You should say where it is, what it was like before, how it has changed, and how you feel about the change.", h: ["It used to", "It has changed significantly", "Over the years", "There has been a noticeable change in"], s: "I'd like to talk about the park near my grandparents' house. It **used to** be an empty field where children played football. **Over the years**, it **has changed significantly**: now there are trees, a running track and a small café. **There has been a noticeable change in** the number of visitors, too, because people of all ages go there. I feel happy about it, although I sometimes miss the old field." },
      { q: "Do you think technology has changed the way people study?", h: ["These days", "Compared with the past", "There has been a noticeable change in", "It has become more"], s: "Definitely. **These days**, students look up information online instead of going to the library. **Compared with the past**, learning **has become more** flexible, because you can take a course at home. **There has been a noticeable change in** how teachers work as well, because they use apps to give homework and feedback." }
    ],
    recall: [
      { k: "vi", q: "So với trước đây…", a: ["compared with the past", "compared to the past"] },
      { k: "vi", q: "Qua nhiều năm…", a: ["over the years"] },
      { k: "sit", q: "Bạn nói về một thói quen hoặc trạng thái ở quá khứ nay không còn nữa (con phố trước đây yên tĩnh). Bạn dùng cụm nào?", a: ["it used to", "used to", "it used to be"] },
      { k: "sit", q: "Bạn đến thăm trường cũ và thấy nó khác hẳn. Bạn muốn nói “Nó đã thay đổi đáng kể.” Bạn nói thế nào?", a: ["it has changed significantly", "it has changed a lot significantly", "has changed significantly"] },
      { k: "blank", q: "____, most people pay by phone. (Ngày nay)", a: ["these days", "nowadays"] },
      { k: "blank", q: "There has been ____ in the way we shop. (một thay đổi rõ rệt về)", a: ["a noticeable change", "noticeable change"] },
      { k: "blank", q: "My city ____ crowded because of population growth. (đã trở nên… hơn)", a: ["has become more", "has become much more"] },
      { k: "speak", q: "Nói 2–3 câu về một thay đổi trong cuộc sống ở thành phố của bạn: trước đây và hiện nay.", a: ["it used to", "these days", "over the years", "has become more", "compared with the past"], s: "The street near my house **used to** be quiet. **Over the years**, it **has become more** crowded, and **these days** it's full of cafés." }
    ]
  });

  /* ── 03 Describing Feelings ───────────────────────────────────────────── */
  P.addPack("fn_03_describing_feelings", {
    lg: [
      ["I find it…", "Tôi thấy nó…", "I find it relaxing to listen to music after work."],
      ["It makes me feel…", "Nó khiến tôi cảm thấy…", "Spending time in nature makes me feel calm."],
      ["I was delighted to…", "Tôi rất vui khi…", "I was delighted to hear that my friend had passed her exam."],
      ["I felt a sense of…", "Tôi cảm thấy một cảm giác…", "When I finished the marathon, I felt a sense of pride."],
      ["I was really impressed by…", "Tôi rất ấn tượng bởi…", "I was really impressed by the helpful staff at the hotel."],
      ["I felt relieved when…", "Tôi thấy nhẹ nhõm khi…", "I felt relieved when I found my lost wallet."],
      ["It left me feeling…", "Nó để lại cho tôi cảm giác…", "The long meeting left me feeling exhausted."]
    ],
    use: [
      { t: "fill", q: "Q: How do you feel about speaking in public? — “____ stressful, so I always practice a lot beforehand.”", o: ["I find it", "I was delighted to", "I felt relieved when", "I felt a sense of"], a: 0, w: "I find it + tính từ = tôi thấy việc đó…" },
      { t: "fill", q: "When I finally finished my thesis, ____ pride and relief.", o: ["I felt a sense of", "I find it", "It makes me feel", "I was delighted to"], a: 0, w: "I felt a sense of + danh từ cảm xúc (pride, relief, freedom…)." },
      { t: "fill", q: "I lost my phone on the train, but ____ the station staff called to say they had found it.", o: ["I felt relieved when", "I was delighted to", "It makes me feel", "I find it"], a: 0, w: "I felt relieved when + mệnh đề: nhẹ nhõm khi vấn đề được giải quyết." },
      { t: "fill", q: "The concert was three hours long and very loud. ____ exhausted but happy.", o: ["It left me feeling", "I find it", "I was delighted to", "I felt a sense of"], a: 0, w: "It left me feeling + tính từ = nó để lại cho tôi cảm giác…" },
      { t: "fix", q: "Câu có lỗi: “I was really impressed from the service at the hotel.” Chọn câu đúng.", o: ["I was really impressed by the service at the hotel.", "I was really impressed from the service at the hotel.", "I was really impressed of the service at the hotel.", "I was really impressed on the service at the hotel."], a: 0, w: "Cụm đúng: be impressed by something." },
      { t: "fix", q: "Câu có lỗi: “It makes me feeling happy when I see my friends.” Chọn câu đúng.", o: ["It makes me feel happy when I see my friends.", "It makes me feeling happy when I see my friends.", "It makes me to feel happy when I see my friends.", "It make me feel happy when I see my friends."], a: 0, w: "make + tân ngữ + động từ nguyên mẫu (không có “to”)." },
      { t: "speak", q: "How do you feel when you spend time alone? Describe your feelings precisely.", h: ["I find it", "It makes me feel", "It left me feeling"], s: "**I find it** quite relaxing, especially after a busy week. Spending time alone **makes me feel** calm and gives me a chance to think. After a quiet evening reading at home, **it leaves me feeling** refreshed, although if it lasts too long, I start to miss my friends." },
      { t: "speak", q: "Tell me about a time when something good happened to you. How did you feel?", h: ["I was delighted to", "I felt a sense of", "I was really impressed by"], s: "Last year, **I was delighted to** receive a scholarship for a summer course. **I felt a sense of** pride, because I had worked hard for it. **I was really impressed by** my teachers, who stayed after class to help me prepare, so I felt very thankful too." }
    ],
    reuse: [
      { q: "How do you feel about crowded places?", h: ["I find it", "It makes me feel", "It left me feeling"], s: "To be honest, **I find it** quite tiring to be in crowded places. The noise **makes me feel** anxious, and after a shopping trip on a busy weekend, **it leaves me feeling** exhausted. I prefer quiet cafés instead." },
      { q: "Describe a time when you felt proud of something you achieved. You should say what you did, when it happened, who was there, and explain how you felt.", h: ["I felt a sense of", "I was delighted to", "I felt relieved when", "It left me feeling"], s: "I'd like to talk about the day I finished my first 10-kilometer run. It was last spring, and my brother was running with me. In the last kilometer I was very tired, but **I felt relieved when** I saw the finish line. **I felt a sense of** pride because I had trained for months, and **I was delighted to** see my brother waiting there with a bottle of water. **It left me feeling** happy and a little emotional." },
      { q: "Do you think watching films can change how people feel?", h: ["It makes me feel", "It left me feeling", "I find it"], s: "Yes, I do. A good comedy **makes me feel** more cheerful, and a sad story can make me emotional. I remember a film about family that **left me feeling** thankful for my parents. **I find it** interesting how a two-hour film can change your mood for a whole evening." }
    ],
    recall: [
      { k: "vi", q: "Tôi thấy nhẹ nhõm khi…", a: ["i felt relieved when", "felt relieved when"] },
      { k: "vi", q: "Tôi rất ấn tượng bởi…", a: ["i was really impressed by", "i was impressed by", "really impressed by"] },
      { k: "sit", q: "Bạn nhận được một tin rất tốt và cảm thấy rất vui. Bạn bắt đầu câu với cụm nào?", a: ["i was delighted to", "delighted to"] },
      { k: "sit", q: "Bạn hoàn thành một mục tiêu lớn và cảm thấy tự hào. Bạn dùng cụm nào trước “pride”?", a: ["i felt a sense of", "a sense of", "felt a sense of"] },
      { k: "blank", q: "The long journey ____ exhausted. (để lại cho tôi cảm giác)", a: ["left me feeling", "leaves me feeling", "it left me feeling"] },
      { k: "blank", q: "Cooking ____ calm after a stressful day. (khiến tôi cảm thấy)", a: ["makes me feel", "made me feel"] },
      { k: "blank", q: "I ____ relaxing to walk by the lake. (Tôi thấy…)", a: ["find it", "i find it"] },
      { k: "speak", q: "Nói 2–3 câu về cảm xúc của bạn khi nhận được một tin vui hoặc hoàn thành một việc khó.", a: ["i was delighted to", "i felt a sense of", "i felt relieved when", "it left me feeling"], s: "**I was delighted to** pass my exam. **I felt relieved when** I saw the result, and **I felt a sense of** pride. **It left me feeling** very happy." }
    ]
  });

  /* ── 04 Giving Examples ───────────────────────────────────────────────── */
  P.addPack("fn_04_giving_examples", {
    lg: [
      ["For example…", "Ví dụ…", "I enjoy outdoor activities. For example, I go hiking almost every month."],
      ["A good example would be…", "Một ví dụ hay là…", "Some old buildings have been turned into cafés. A good example would be the warehouse near my house."],
      ["To give you an example…", "Để cho bạn một ví dụ…", "To give you an example, my neighbor started selling cakes online and now has a small business."],
      ["In my own experience…", "Theo kinh nghiệm của chính tôi…", "In my own experience, practicing with native speakers helps a lot."],
      ["For instance…", "Chẳng hạn…", "Some jobs need little training. For instance, my cousin became a delivery driver in two weeks."],
      ["This can be seen when…", "Điều này có thể thấy khi…", "People care more about their health now. This can be seen when you notice how many people jog in the park every morning."]
    ],
    use: [
      { t: "fill", q: "Some jobs need very little training. ____, my cousin became a delivery driver after only two weeks of practice.", o: ["For instance", "This can be seen when", "In contrast", "Whereas"], a: 0, w: "For instance, + ví dụ cụ thể = chẳng hạn." },
      { t: "fill", q: "Many places in my country attract tourists. ____ Ha Long Bay, which welcomes millions of visitors every year.", o: ["A good example would be", "In my own experience", "This can be seen when", "It used to be"], a: 0, w: "A good example would be + danh từ cụ thể (tên một địa điểm, sự vật…)." },
      { t: "fill", q: "People are becoming more interested in healthy food. ____ you look at how many salad bars have opened in the city.", o: ["This can be seen when", "In my own experience,", "To give you an example,", "Compared with"], a: 0, w: "This can be seen when + mệnh đề: chỉ ra bằng chứng quan sát được." },
      { t: "fill", q: "Small kind actions matter. ____, last week a stranger returned my lost wallet, and it made my whole day.", o: ["To give you an example", "In contrast", "Whereas", "Perhaps"], a: 0, w: "To give you an example, + câu chuyện/ví dụ cụ thể." },
      { t: "fix", q: "Câu có lỗi: “A good example would be of the old town in Hoi An.” Chọn câu đúng.", o: ["A good example would be the old town in Hoi An.", "A good example would be of the old town in Hoi An.", "A good example is would be the old town in Hoi An.", "Good example would be the old town in Hoi An."], a: 0, w: "would be + danh từ (không có “of”), và cần mạo từ “A good example”." },
      { t: "fix", q: "Câu có lỗi: “In my own experience, practicing speaking every day are very helpful.” Chọn câu đúng.", o: ["In my own experience, practicing speaking every day is very helpful.", "In my own experience, practicing speaking every day are very helpful.", "In my own experience, practicing speaking every day being very helpful.", "In my own experience, practicing speaking every day be very helpful."], a: 0, w: "Cụm V-ing làm chủ ngữ là số ít → is." },
      { t: "speak", q: "Why do some people enjoy living in a big city? Give a clear example for each idea.", h: ["For example", "A good example would be", "In my own experience"], s: "Big cities offer a lot of choices. **For example**, there are many restaurants and events every weekend. **A good example would be** the street food festival in my city, which attracts thousands of people. **In my own experience**, it's also easier to find a good job, because many companies have offices there." },
      { t: "speak", q: "Tell me about a hobby you have and give an example of how you do it.", h: ["For instance", "To give you an example", "This can be seen when"], s: "I enjoy cooking, and I like trying new recipes. **To give you an example**, last Sunday I made a Thai curry for my family. **For instance**, I usually look for a new recipe online and change it a bit. My interest **can be seen when** you open my kitchen cupboard, because it's full of different spices." }
    ],
    reuse: [
      { q: "Do you think people in your country are becoming healthier?", h: ["This can be seen when", "For example", "In my own experience"], s: "I think so. **This can be seen when** you go to the park in the early morning, because it's full of joggers and people doing yoga. **For example**, more gyms have opened in my neighborhood, and **in my own experience**, most of my colleagues now bring healthy lunches to work." },
      { q: "Describe a time when someone helped you. You should say who helped you, what the problem was, how the person helped, and explain why it was important.", h: ["For instance", "In my own experience", "To give you an example", "A good example would be"], s: "I'd like to talk about my neighbor, Mr. Hung, who helped me when I moved to a new apartment. **To give you an example**, he carried my heavy boxes up the stairs, because the elevator was broken. **For instance**, he also lent me tools to put the furniture together. **In my own experience**, good neighbors are rare, and **a good example would be** him: he never expected anything in return." },
      { q: "What can parents do to help children become independent?", h: ["A good example would be", "For instance", "To give you an example", "This can be seen when"], s: "Parents can give children small responsibilities. **A good example would be** asking them to prepare their own school bags. **For instance**, they can let children cook a simple dish once a week. **To give you an example**, my cousin started cooking at ten, and now she looks after herself well. **This can be seen when** she travels alone for her studies." }
    ],
    recall: [
      { k: "vi", q: "Theo kinh nghiệm của chính tôi…", a: ["in my own experience", "in my experience"] },
      { k: "vi", q: "Một ví dụ hay là…", a: ["a good example would be", "a good example is", "good example would be"] },
      { k: "vi", q: "Điều này có thể thấy khi…", a: ["this can be seen when", "can be seen when"] },
      { k: "sit", q: "Bạn vừa nêu một ý chung và muốn đưa một ví dụ cụ thể để minh họa. Bạn mở đầu câu tiếp theo bằng cụm ngắn nào?", a: ["for example", "for instance"] },
      { k: "sit", q: "Bạn muốn nói “để tôi lấy một ví dụ cho bạn” trước khi kể một câu chuyện nhỏ. Bạn dùng cụm nào?", a: ["to give you an example", "to give an example", "let me give you an example"] },
      { k: "blank", q: "Reading helps you learn new words. ____, I learned “reluctant” from a novel. (Chẳng hạn)", a: ["for instance", "for example"] },
      { k: "speak", q: "Nói 2–3 câu: ý kiến “Học một ngôn ngữ cần luyện tập hằng ngày” — kèm một ví dụ từ kinh nghiệm của bạn.", a: ["in my own experience", "for example", "for instance", "to give you an example"], s: "Learning a language needs daily practice. **In my own experience**, speaking for ten minutes every day works better than studying for hours once a week. **For example**, I improved my English a lot after I started talking with my colleagues every morning." }
    ]
  });

  /* ── 05 Comparing ─────────────────────────────────────────────────────── */
  P.addPack("fn_05_comparing", {
    lg: [
      ["Compared with…", "So với…", "Compared with my hometown, the city is much busier."],
      ["Whereas…", "Trong khi…", "My brother loves team sports, whereas I prefer swimming alone."],
      ["Not as… as…", "Không… bằng…", "Taking the bus is not as fast as riding a motorbike."],
      ["Far more… than…", "… hơn rất nhiều so với…", "Far more people shop online now than ten years ago."],
      ["The main difference is…", "Điểm khác biệt chính là…", "The main difference between the two cities is the pace of life."],
      ["One similarity is that…", "Một điểm giống nhau là…", "One similarity is that both cities are great places for food lovers."],
      ["In contrast…", "Ngược lại…", "Hanoi is cold in winter. In contrast, Ho Chi Minh City stays warm all year."]
    ],
    use: [
      { t: "fill", q: "My brother loves team sports, ____ I prefer swimming alone.", o: ["whereas", "compared with", "one similarity is that", "far more"], a: 0, w: "whereas nối hai mệnh đề đối lập trong một câu." },
      { t: "fill", q: "Cycling is ____ fast as driving, but it's much healthier.", o: ["not as", "far more", "compared with", "in contrast"], a: 0, w: "not as + tính từ + as = không… bằng…" },
      { t: "fill", q: "Hanoi is cold in winter. ____, Ho Chi Minh City stays warm all year.", o: ["In contrast", "One similarity is that", "Not as", "Far more"], a: 0, w: "In contrast, + câu mới = ngược lại, đối lập với câu trước." },
      { t: "fill", q: "____ my hometown, the city offers many more job opportunities.", o: ["Compared with", "Whereas", "In contrast", "Not as"], a: 0, w: "Compared with + danh từ, + mệnh đề chính." },
      { t: "fix", q: "Câu có lỗi: “Cycling is not as expensive than driving.” Chọn câu đúng.", o: ["Cycling is not as expensive as driving.", "Cycling is not as expensive than driving.", "Cycling is not so expensive than driving.", "Cycling is no as expensive as driving."], a: 0, w: "Cấu trúc so sánh bằng: as + adj + as (không dùng “than”)." },
      { t: "fix", q: "Câu có lỗi: “Far more people use smartphones now as ten years ago.” Chọn từ đúng thay cho “as”.", o: ["than", "as", "that", "then"], a: 0, w: "Far more… than… (so sánh hơn dùng “than”)." },
      { t: "speak", q: "Which do you prefer, living in a city or in the countryside? Compare them in two or three ways.", h: ["Compared with", "Whereas", "The main difference is", "In contrast"], s: "I prefer the city. **Compared with** the countryside, there are far more jobs and services. **The main difference is** the pace of life, because the city is fast **whereas** the countryside is slow and quiet. **In contrast**, people in the countryside usually know their neighbors well, and I admit I miss that." },
      { t: "speak", q: "Compare traveling by bus with traveling by motorbike. What is similar and what is different?", h: ["Not as… as…", "Far more… than…", "One similarity is that"], s: "Traveling by bus is **not as** flexible **as** riding a motorbike, because you have to follow a fixed route. But **far more** people can travel at the same time **than** by motorbike, and it is cheaper. **One similarity is that** both are affected by traffic jams in rush hour." }
    ],
    reuse: [
      { q: "Do you prefer shopping online or in stores?", h: ["Compared with", "Not as… as…", "Far more… than…", "Whereas"], s: "I prefer shopping online. **Compared with** stores, it saves me a lot of time. Browsing in a shop is **not as** convenient **as** checking prices on my phone, and there are **far more** choices online **than** in a small shop. Some people like to touch the product, **whereas** I only care about reviews and price." },
      { q: "Describe two different places where you have lived or studied. You should say where they are, how they are different, whether they are similar in any way, and explain which you prefer.", h: ["The main difference is", "One similarity is that", "In contrast", "Whereas"], s: "I'd like to compare my hometown and the city where I study now. **The main difference is** the size: my hometown is small, **whereas** the city is huge and busy. **In contrast** to the city, my hometown is very quiet at night. **One similarity is that** the food is delicious in both places. Overall, I prefer the city because I have more opportunities, although I miss home." },
      { q: "How is education today different from education in the past?", h: ["Compared with", "Far more… than…", "Whereas", "In contrast"], s: "**Compared with** the past, education today is much more flexible. **Far more** students go to university **than** a generation ago, and they can learn online. In the past, learning was mostly memorizing, **whereas** now teachers encourage group work and projects. **In contrast**, my grandparents often had to leave school early to work." }
    ],
    recall: [
      { k: "vi", q: "So với…", a: ["compared with", "compared to"] },
      { k: "vi", q: "Điểm khác biệt chính là…", a: ["the main difference is", "main difference is"] },
      { k: "vi", q: "Một điểm giống nhau là…", a: ["one similarity is that", "one similarity is"] },
      { k: "sit", q: "Bạn muốn đối lập hai ý ngay trong một câu (A thì…, trong khi B thì…). Bạn dùng liên từ nào?", a: ["whereas", "while"] },
      { k: "sit", q: "Bạn muốn nói A kém hơn B về mức độ: xe buýt không nhanh bằng xe máy. Bạn dùng cấu trúc nào?", a: ["not as fast as", "not as … as", "not as as", "not as"] },
      { k: "blank", q: "____ people use smartphones now than ten years ago. (nhiều hơn rất nhiều)", a: ["far more", "many more", "a lot more"] },
      { k: "blank", q: "Hanoi is cold in winter. ____, Ho Chi Minh City stays warm. (Ngược lại)", a: ["in contrast", "on the other hand"] },
      { k: "speak", q: "Nói 2–3 câu so sánh hai thứ bạn biết rõ (hai thành phố, hai công việc, hai cách đi lại…).", a: ["compared with", "whereas", "the main difference is", "in contrast", "one similarity is that"], s: "**Compared with** the bus, a motorbike is faster. **The main difference is** flexibility, **whereas** **one similarity is that** both are affordable." }
    ]
  });

  /* ── 06 Speculating ───────────────────────────────────────────────────── */
  P.addPack("fn_06_speculating", {
    lg: [
      ["I would imagine…", "Tôi đoán là…", "I would imagine most people prefer online shopping because it saves time."],
      ["It might be because…", "Có thể là vì…", "Fewer people read books. It might be because they spend more time on their phones."],
      ["Perhaps…", "Có lẽ…", "Perhaps schools will use more technology in the next ten years."],
      ["It's likely that…", "Nhiều khả năng là…", "It's likely that electric cars will become more common in big cities."],
      ["I suppose…", "Tôi đoán / tôi cho rằng…", "I suppose it depends on the person's age and personality."],
      ["This could lead to…", "Điều này có thể dẫn đến…", "People who work from home may feel lonely. This could lead to health problems."],
      ["In the future, I think…", "Trong tương lai, tôi nghĩ…", "In the future, I think most people will do their shopping with their phones."]
    ],
    use: [
      { t: "fill", q: "Q: Why do you think many young people prefer streaming to cinemas? — “____ it's cheaper and more convenient.”", o: ["I would imagine", "Looking back,", "Compared with", "That's why"], a: 0, w: "I would imagine + mệnh đề: đoán một lý do khi không chắc chắn." },
      { t: "fill", q: "Many people no longer read printed books. ____ they spend more time on their phones.", o: ["It might be because", "This could lead to", "In the future, I think", "I was delighted to"], a: 0, w: "It might be because + lý do có thể (chưa chắc chắn)." },
      { t: "fill", q: "People who stay up late every night often feel tired. ____ serious health problems in the long term.", o: ["This could lead to", "It might be because", "Perhaps", "I suppose"], a: 0, w: "This could lead to + danh từ: dự đoán hệ quả có thể xảy ra." },
      { t: "fill", q: "____ electric cars will be much cheaper, so more families will buy them.", o: ["In the future, I think", "It might be because", "This could lead to", "I felt relieved when"], a: 0, w: "In the future, I think + will…: dự đoán về tương lai." },
      { t: "fix", q: "Câu có lỗi: “It's likely that the number of cyclists will to increase.” Chọn câu đúng.", o: ["It's likely that the number of cyclists will increase.", "It's likely that the number of cyclists will to increase.", "It's likely that the number of cyclists to increase.", "It's likely that the number of cyclists will be increase."], a: 0, w: "will + động từ nguyên mẫu (không có “to”)." },
      { t: "fix", q: "Câu có lỗi: “Perhaps will schools use more technology in the future.” Chọn câu đúng.", o: ["Perhaps schools will use more technology in the future.", "Perhaps will schools use more technology in the future.", "Perhaps do schools use more technology in the future.", "Perhaps schools use will more technology in the future."], a: 0, w: "Sau Perhaps vẫn dùng trật tự câu thường: chủ ngữ + will + động từ." },
      { t: "speak", q: "Why do you think some people prefer working from home? Guess the reasons.", h: ["I would imagine", "It might be because", "I suppose"], s: "**I would imagine** it saves a lot of time, because people don't have to travel to the office. **It might be because** they can organize their day more freely, too. **I suppose** it also depends on the job, because some people need to work with a team in the same place." },
      { t: "speak", q: "What might happen to the way people shop in the next ten years? Give predictions and possible results.", h: ["In the future, I think", "It's likely that", "This could lead to", "Perhaps"], s: "**In the future, I think** most people will shop with their phones. **It's likely that** delivery will become even faster, and **perhaps** some shops will close. **This could lead to** fewer jobs in small stores, but more jobs in delivery and technology." }
    ],
    reuse: [
      { q: "Do you think more people will cycle to work in the future?", h: ["Perhaps", "It's likely that", "In the future, I think"], s: "**Perhaps** in some cities, yes. **It's likely that** more cycle lanes will be built, because governments want to reduce pollution. **In the future, I think** people in crowded cities will cycle more, but in places with very hot or rainy weather it will be harder." },
      { q: "Describe a job that you think will be popular in the future. You should say what the job is, what people do in it, why you think it will become popular, and what skills people may need.", h: ["In the future, I think", "It's likely that", "This could lead to", "I would imagine"], s: "I'd like to talk about the job of a data analyst. **In the future, I think** many companies will need people who can understand large amounts of data. **It's likely that** this job will become more popular, because more business decisions are based on numbers. **I would imagine** people need good math and computer skills, and also communication skills. **This could lead to** many new courses at universities." },
      { q: "Why do you think fewer young people read newspapers?", h: ["It might be because", "I would imagine", "I suppose", "This could lead to"], s: "**It might be because** young people get news from social media, which is faster and free. **I would imagine** they also don't want to carry a paper around. **I suppose** it's more convenient to read headlines on a phone. **This could lead to** fewer printed newspapers in the future, although I think online news will continue to grow." }
    ],
    recall: [
      { k: "vi", q: "Tôi đoán là…", a: ["i would imagine", "i'd imagine"] },
      { k: "vi", q: "Nhiều khả năng là…", a: ["it's likely that", "it is likely that"] },
      { k: "vi", q: "Tôi cho rằng / tôi đoán… (nhẹ nhàng, không chắc chắn)", a: ["i suppose"] },
      { k: "sit", q: "Bạn đưa ra một nguyên nhân có thể có nhưng chưa chắc chắn. Bạn dùng cụm nào?", a: ["it might be because", "might be because"] },
      { k: "sit", q: "Bạn nói về một hệ quả có thể xảy ra về sau. Bạn dùng cụm nào?", a: ["this could lead to", "could lead to"] },
      { k: "blank", q: "____ schools will use more technology. (Có lẽ)", a: ["perhaps", "maybe"] },
      { k: "blank", q: "____, I think most people will use apps for everything. (Trong tương lai)", a: ["in the future", "in the future,"] },
      { k: "speak", q: "Nói 2–3 câu dự đoán về một thay đổi trong giao thông ở thành phố của bạn trong 10 năm tới.", a: ["in the future, i think", "it's likely that", "perhaps", "this could lead to", "i would imagine"], s: "**In the future, I think** there will be more electric buses. **It's likely that** fewer people will drive, and **this could lead to** less pollution. **Perhaps** the city will also build more cycle lanes." }
    ]
  });

  /* ── 07 Reflecting ────────────────────────────────────────────────────── */
  P.addPack("fn_07_reflecting", {
    lg: [
      ["Looking back…", "Nhìn lại…", "Looking back, I'm glad I joined the debate club."],
      ["I've come to realize that…", "Dần dần tôi nhận ra rằng…", "I've come to realize that small habits make a big difference."],
      ["It taught me to…", "Nó dạy tôi cách…", "Living alone taught me to manage my money carefully."],
      ["One thing I learned was…", "Một điều tôi học được là…", "One thing I learned was that asking for help is not a weakness."],
      ["If I could do it again…", "Nếu được làm lại…", "If I could do it again, I would start learning English earlier."],
      ["Since then, I've…", "Từ đó đến nay, tôi đã…", "Since then, I've been more willing to try new things."],
      ["It changed the way I think about…", "Nó thay đổi cách tôi nghĩ về…", "The trip changed the way I think about money and happiness."]
    ],
    use: [
      { t: "fill", q: "I failed my first driving test. ____ that I should never rush when I'm nervous.", o: ["One thing I learned was", "If I could do it again,", "Compared with", "Perhaps"], a: 0, w: "One thing I learned was that + mệnh đề: nêu bài học rút ra." },
      { t: "fill", q: "My first job was very stressful, but ____ be more patient with other people.", o: ["it taught me to", "one thing I learned was", "I've come to realize that", "looking back,"], a: 0, w: "It taught me to + động từ nguyên mẫu." },
      { t: "fill", q: "I wasted a lot of time on my phone at university. ____, I would spend that time on exercise and hobbies.", o: ["If I could do it again", "Since then, I've", "One thing I learned was", "It changed the way I think about"], a: 0, w: "If I could do it again, I would… = nếu được làm lại, tôi sẽ…" },
      { t: "fill", q: "I went on a volunteer trip two years ago, and ____ taken part in three more projects.", o: ["since then, I've", "if I could do it again, I'd", "it taught me to", "one thing I learned was"], a: 0, w: "Since then, I've + V3: kết quả từ thời điểm đó đến nay." },
      { t: "fix", q: "Câu có lỗi: “It taught me being more patient.” Chọn câu đúng.", o: ["It taught me to be more patient.", "It taught me being more patient.", "It taught me be more patient.", "It taught me to being more patient."], a: 0, w: "teach someone to + động từ nguyên mẫu." },
      { t: "fix", q: "Câu có lỗi: “Since then, I'm more careful with money.” Chọn câu đúng.", o: ["Since then, I've been more careful with money.", "Since then, I'm being more careful with money.", "Since then, I was more careful with money.", "Since then, I will be more careful with money."], a: 0, w: "Since then dùng với hiện tại hoàn thành (have been)." },
      { t: "speak", q: "Tell me about a mistake you made and what you learned from it.", h: ["Looking back", "One thing I learned was", "It taught me to", "If I could do it again"], s: "When I was a student, I left my project until the last night. **Looking back**, that was a big mistake. **One thing I learned was** that I work better when I make a plan. **It taught me to** start early, and **if I could do it again**, I would divide the work into small parts." },
      { t: "speak", q: "How has studying English changed you?", h: ["It changed the way I think about", "Since then, I've", "I've come to realize that"], s: "It has changed me quite a lot. **It changed the way I think about** mistakes, because now I see them as a normal part of learning. **Since then, I've** been more confident when I speak with foreigners. **I've come to realize that** speaking regularly is more important than studying grammar alone." }
    ],
    reuse: [
      { q: "What was your favorite subject at school, and what did it teach you?", h: ["It taught me to", "One thing I learned was", "Looking back"], s: "My favorite subject was literature. **It taught me to** read slowly and think about different points of view. **One thing I learned was** that the same story can mean different things to different people. **Looking back**, I think it also made me a better listener." },
      { q: "Describe a time when you learned something important from another person. You should say who the person was, what happened, what you learned, and explain how it changed you.", h: ["One thing I learned was", "It changed the way I think about", "Since then, I've", "I've come to realize that"], s: "I'd like to talk about my first manager, Ms. Lan. In my first month at work, I made a serious mistake, and I was afraid she would be angry. Instead, she sat down with me and explained how to fix it. **One thing I learned was** that a good leader is patient. **It changed the way I think about** failure. **Since then, I've** tried to help new colleagues in the same way, and **I've come to realize that** kindness makes people more confident." },
      { q: "Do you think people learn more from success or from failure?", h: ["Looking back", "I've come to realize that", "If I could do it again", "It taught me to"], s: "I think failure teaches more. **Looking back**, I learned much more from the exam I failed than from the ones I passed. **I've come to realize that** failure shows you exactly what you need to improve. **It taught me to** study in a smarter way, and **if I could do it again**, I would still choose the hard way, because it made me stronger." }
    ],
    recall: [
      { k: "vi", q: "Nhìn lại…", a: ["looking back"] },
      { k: "vi", q: "Nếu được làm lại…", a: ["if i could do it again", "if i could do it over"] },
      { k: "vi", q: "Dần dần tôi nhận ra rằng…", a: ["i've come to realize that", "i have come to realize that", "i've come to realise that", "come to realize that"] },
      { k: "sit", q: "Bạn muốn nói một trải nghiệm đã thay đổi hoàn toàn quan điểm của bạn về tiền bạc. Bạn dùng cụm nào?", a: ["it changed the way i think about", "changed the way i think about"] },
      { k: "sit", q: "Bạn muốn nói về điều đã thay đổi trong hành vi của bạn kể từ lúc đó đến nay. Bạn dùng cụm nào?", a: ["since then, i've", "since then i've", "since then, i have", "since then"] },
      { k: "blank", q: "One thing I ____ was that preparation matters. (đã học được)", a: ["learned", "learnt"] },
      { k: "blank", q: "The trip ____ be more independent. (đã dạy tôi cách)", a: ["taught me to", "it taught me to"] },
      { k: "speak", q: "Nói 2–3 câu nhìn lại một trải nghiệm khó khăn và điều bạn rút ra.", a: ["looking back", "one thing i learned was", "it taught me to", "since then, i've", "if i could do it again"], s: "**Looking back**, my first year at work was difficult. **One thing I learned was** to ask for help. **Since then, I've** been more open with my team, and **it taught me to** accept feedback." }
    ]
  });

  /* ── 08 Giving Opinions ───────────────────────────────────────────────── */
  P.addPack("fn_08_giving_opinions", {
    lg: [
      ["Personally, I think…", "Cá nhân tôi nghĩ…", "Personally, I think public transport should be cheaper."],
      ["From my perspective…", "Theo góc nhìn của tôi…", "From my perspective, learning by doing is more effective than memorizing."],
      ["I'd say that…", "Tôi cho rằng… (nhẹ nhàng)", "I'd say that most young people are quite open-minded."],
      ["To some extent…", "Ở một mức độ nào đó…", "To some extent, social media helps people stay in touch."],
      ["As far as I'm concerned…", "Theo tôi thì…", "As far as I'm concerned, fast food is fine if you eat it rarely."],
      ["I tend to think that…", "Tôi có xu hướng nghĩ rằng…", "I tend to think that people are happier when they spend time outdoors."],
      ["I wouldn't necessarily say that…", "Tôi sẽ không hẳn nói rằng…", "I wouldn't necessarily say that expensive brands are always better."]
    ],
    use: [
      { t: "fill", q: "Is online learning always better than classroom learning? — “____ online classes are always better; many students lose motivation at home.”", o: ["I wouldn't necessarily say that", "Personally, I think that all", "Compared with", "One similarity is that"], a: 0, w: "I wouldn't necessarily say that = không hẳn là… (phản đối nhẹ nhàng)." },
      { t: "fill", q: "Does money bring happiness? — “____ it does, because we need money for health and education, but it isn't everything.”", o: ["To some extent", "In contrast", "Looking back", "Whereas"], a: 0, w: "To some extent = ở một mức độ nào đó: đồng ý một phần, có giới hạn." },
      { t: "fill", q: "As the parent of two small children, ____ screen time should be limited in the evening.", o: ["from my perspective", "to some extent", "I wouldn't necessarily say that", "compared with"], a: 0, w: "From my perspective nhấn mạnh góc nhìn từ vai trò của mình (là cha mẹ)." },
      { t: "fill", q: "I'm not completely sure, but ____ people are happier when they spend time outdoors.", o: ["I tend to think that", "In contrast,", "One similarity is that", "Looking back,"], a: 0, w: "I tend to think that = tôi có xu hướng nghĩ… (không quá chắc chắn)." },
      { t: "fix", q: "Câu có lỗi: “As far as I concerned, fast food is fine if you eat it rarely.” Chọn câu đúng.", o: ["As far as I'm concerned, fast food is fine if you eat it rarely.", "As far as I concerned, fast food is fine if you eat it rarely.", "As far as me concerned, fast food is fine if you eat it rarely.", "As far as I'm concern, fast food is fine if you eat it rarely."], a: 0, w: "Cụm cố định: As far as I'm concerned." },
      { t: "fix", q: "Câu có lỗi: “I wouldn't necessarily to say that expensive brands are better.” Chọn câu đúng.", o: ["I wouldn't necessarily say that expensive brands are better.", "I wouldn't necessarily to say that expensive brands are better.", "I wouldn't necessary say that expensive brands are better.", "I don't necessarily to say that expensive brands are better."], a: 0, w: "would not + động từ nguyên mẫu (say), và dùng trạng từ necessarily." },
      { t: "speak", q: "Do you think children should have a mobile phone? Give your opinion and the limits of it.", h: ["Personally, I think", "From my perspective", "To some extent", "I'd say that"], s: "**Personally, I think** children need a phone only when they start going to school alone. **From my perspective**, it's useful for safety, because parents can contact them. **To some extent**, a phone also helps them learn, but **I'd say that** it should be used for a limited time every day." },
      { t: "speak", q: "Is social media good for friendships? Show how strongly you agree or disagree.", h: ["To some extent", "I wouldn't necessarily say that", "I tend to think that"], s: "**To some extent**, it is. It helps people stay in touch, especially when friends live in different cities. But **I wouldn't necessarily say that** it makes friendships stronger, because chatting online isn't the same as meeting face to face. **I tend to think that** it's useful for keeping contact, not for building deep relationships." }
    ],
    reuse: [
      { q: "Do you think people spend too much money on fashion?", h: ["Personally, I think", "I tend to think that", "To some extent"], s: "**Personally, I think** some people do, especially young people who want to follow every trend. **I tend to think that** buying fewer, better clothes is smarter. **To some extent**, fashion is a way to express yourself, so I don't see a problem if people can afford it." },
      { q: "Describe a rule or law in your country that you agree or disagree with. You should say what the rule is, how it affects people, whether you follow it, and explain your opinion.", h: ["As far as I'm concerned", "From my perspective", "Personally, I think", "To some extent"], s: "I'd like to talk about the rule that motorbike riders must wear helmets. It applies to everyone on the road, and I always follow it. **As far as I'm concerned**, it's one of the most important rules, because it protects lives. **From my perspective**, as someone who rides every day, it's a small effort for a big benefit. **Personally, I think** the fines should stay, and **to some extent**, the rule has already changed people's habits." },
      { q: "Should governments control what children see on social media?", h: ["I'd say that", "I wouldn't necessarily say that", "From my perspective", "To some extent"], s: "**I'd say that** governments should have some role, because children can see harmful content. **To some extent**, they can set age limits and ask companies to remove dangerous videos. But **I wouldn't necessarily say that** the government should control everything. **From my perspective**, parents and schools also have a responsibility to teach children how to use social media safely." }
    ],
    recall: [
      { k: "vi", q: "Cá nhân tôi nghĩ…", a: ["personally, i think", "personally i think"] },
      { k: "vi", q: "Ở một mức độ nào đó…", a: ["to some extent"] },
      { k: "vi", q: "Tôi sẽ không hẳn nói rằng…", a: ["i wouldn't necessarily say that", "i would not necessarily say that"] },
      { k: "sit", q: "Bạn muốn nêu quan điểm từ vai trò của mình, ví dụ với tư cách là sinh viên. Bạn dùng cụm nào?", a: ["from my perspective", "from my point of view"] },
      { k: "sit", q: "Bạn nêu ý kiến một cách nhẹ nhàng, không quá chắc chắn, với xu hướng nghiêng về một phía. Bạn dùng cụm nào?", a: ["i tend to think that", "i tend to think", "i'd say that"] },
      { k: "blank", q: "____, fast food is fine if you eat it rarely. (Theo tôi thì)", a: ["as far as i'm concerned", "as far as i am concerned"] },
      { k: "blank", q: "I ____ that people are happier outdoors. (có xu hướng nghĩ)", a: ["tend to think", "tend to believe"] },
      { k: "speak", q: "Nói 2–3 câu nêu ý kiến của bạn về việc học online và mức độ bạn đồng ý.", a: ["personally, i think", "to some extent", "from my perspective", "i wouldn't necessarily say that", "i tend to think that"], s: "**Personally, I think** online learning is useful, but **to some extent** only. **I tend to think that** students need face-to-face contact, and **I wouldn't necessarily say that** online classes are always more convenient." }
    ]
  });
})();
