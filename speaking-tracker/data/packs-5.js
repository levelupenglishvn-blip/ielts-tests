/* Practice packs 5/6 — new Topic Vocabulary modules 27–30 (Use · Reuse · Retrieve). Format: see data/packs-1.js and P.addPack in js/practice.js. */
(function () {
  var P = window.LU.practice;

  /* ── Module 27 — Advertising & Consumer Influence ─────────────────────── */
  P.addPack("voc_27_advertising_consumer_influence", {
    ex: [
      "Persuasive advertising can make people feel they need things they don't really need.",
      "Energy drinks usually have teenagers and young adults as their target audience.",
      "A big campaign can quickly increase brand awareness for a new company.",
      "Companies use social media to promote a product to young people.",
      "Online reviews strongly influence purchasing decisions, especially for electronics.",
      "A celebrity endorsement can make an ordinary product look much more attractive.",
      "The bright, eye-catching poster made me stop and look.",
      "Misleading advertising should be punished because it tricks customers.",
      "Many ads appeal to emotions, for example by showing happy families.",
      "I bought the chocolate as an impulse purchase while I was waiting at the checkout.",
      "Advertising can shape consumer behavior and make people buy more than they need.",
      "The company launched an advertising campaign just before the New Year.",
      "Targeted advertising shows me ads for things I searched for yesterday.",
      "Some short films raise awareness of environmental problems.",
      "Children are exposed to advertisements every day on their phones."
    ],
    use: [
      { t: "fill", q: "The ad showed a puppy waiting alone for its owner at Christmas, and it made many viewers cry. It was a clever way to ____.", o: ["appeal to emotions", "make an impulse purchase", "raise a target audience", "break brand awareness"], a: 0, w: "Appeal to emotions = đánh vào cảm xúc của người xem." },
      { t: "fill", q: "Fans trust their favorite singer, so companies pay famous people for a ____ to help sell their products.", o: ["celebrity endorsement", "brand awareness", "target audience", "misleading advertising"], a: 0, w: "Celebrity endorsement = việc người nổi tiếng quảng bá sản phẩm." },
      { t: "fill", q: "The poster for the new phone had big, bright colors. It was so ____ that I couldn't stop looking at it.", o: ["eye-catching", "misleading", "targeted", "exposed"], a: 0, w: "Eye-catching = bắt mắt, thu hút ánh nhìn." },
      { t: "fill", q: "I didn't plan to buy the chocolate at all. It was just an ____ at the checkout.", o: ["impulse purchase", "advertising campaign", "target audience", "celebrity endorsement"], a: 0, w: "Impulse purchase = món hàng mua bốc đồng, không có kế hoạch trước." },
      { t: "fix", q: "Câu có lỗi: “Advertising can influence on our purchasing decisions.” Chọn cách sửa đúng.", o: ["influence our purchasing decisions", "influence on our purchasing decisions", "influence to our purchasing decisions", "influence for our purchasing decisions"], a: 0, w: "Influence là ngoại động từ: influence + tân ngữ (không dùng “on”)." },
      { t: "fix", q: "Câu có lỗi: “Young children are exposed in advertisements all day.” Chọn giới từ đúng.", o: ["exposed to", "exposed in", "exposed at", "exposed by"], a: 0, w: "Cụm đúng: be exposed to advertisements." },
      { t: "speak", q: "How do you feel about advertisements on social media?", h: ["targeted advertising", "be exposed to advertisements", "eye-catching", "influence purchasing decisions"], s: "To be honest, I have mixed feelings. I **am exposed to advertisements** every time I open an app, and **targeted advertising** shows me things I searched for a few days ago. Some ads are **eye-catching** and creative, but I also know that they can **influence my purchasing decisions** without my noticing." },
      { t: "speak", q: "Have you ever bought something because of an advertisement?", h: ["persuasive advertising", "impulse purchase", "promote a product", "appeal to emotions"], s: "Yes, I have. Last year I saw a video where a brand tried to **promote a product** by telling a touching story about friendship, and it really **appealed to my emotions**. It was **persuasive advertising**, and I bought the product the same night. Looking back, it was an **impulse purchase**." }
    ],
    reuse: [
      { q: "Do you think advertisements are useful?", h: ["raise awareness of something", "brand awareness", "promote a product", "misleading advertising"], s: "I think they can be useful if they are honest. Good ads **promote a product** and help small companies build **brand awareness**, and some ads even **raise awareness of** health or safety problems. The only problem is **misleading advertising**, which makes products sound better than they are." },
      { q: "Describe an advertisement that you remember well. You should say where you saw it, what it was about, how it tried to attract people, and why you remember it.", h: ["advertising campaign", "eye-catching", "celebrity endorsement", "target audience", "appeal to emotions"], s: "I'd like to talk about an ad for a soft drink that I saw on TV last summer. It was part of a big **advertising campaign**, and the **target audience** was clearly young people. The colors were very **eye-catching**, and the company used a **celebrity endorsement**, because a popular singer was in the video. The ad also tried to **appeal to emotions** by showing friends having fun together, and that's why I still remember it." },
      { q: "Should advertising to children be restricted? Why or why not?", h: ["be exposed to advertisements", "shape consumer behavior", "misleading advertising", "targeted advertising"], s: "I think it should be restricted, because children cannot always tell what is true. If they **are exposed to advertisements** all day, the ads can **shape their consumer behavior** from a young age. **Misleading advertising** is even more harmful for them, and **targeted advertising** makes it worse, because the apps already know what they like." }
    ],
    recall: [
      { k: "vi", q: "quảng cáo gây hiểu lầm", a: ["misleading advertising", "misleading advertisement", "misleading ads"] },
      { k: "vi", q: "đối tượng mục tiêu", a: ["target audience", "the target audience", "a target audience"] },
      { k: "vi", q: "mức độ nhận diện thương hiệu", a: ["brand awareness"] },
      { k: "vi", q: "quảng bá sản phẩm", a: ["promote a product", "promote products", "promote the product"] },
      { k: "sit", q: "Một ca sĩ nổi tiếng xuất hiện trong quảng cáo giày và người hâm mộ mua theo. Hiện tượng này được gọi là gì?", a: ["celebrity endorsement", "a celebrity endorsement"] },
      { k: "sit", q: "Bạn lướt mạng và chỉ thấy quảng cáo về những món bạn vừa tìm kiếm hôm qua. Loại quảng cáo này gọi là gì?", a: ["targeted advertising", "targeted ads", "targeted advertisements"] },
      { k: "blank", q: "Before the New Year, the company launched ____ on TV and online. (một chiến dịch quảng cáo)", a: ["an advertising campaign", "advertising campaign"] },
      { k: "blank", q: "Strong advertising can ____ and make people buy more than they need. (định hình hành vi người tiêu dùng)", a: ["shape consumer behavior", "shape consumer behaviour", "shape consumer behavior."] },
      { k: "blank", q: "Short films can ____ environmental problems among young people. (nâng cao nhận thức về)", a: ["raise awareness of", "raise awareness about"] },
      { k: "speak", q: "Nói 1–2 câu về một quảng cáo đã ảnh hưởng đến bạn. Thử dùng ít nhất hai cụm đã học.", a: ["persuasive advertising", "appeal to emotions", "influence purchasing decisions", "eye-catching", "impulse purchase"], s: "I once saw **persuasive advertising** for a coffee brand that **appealed to my emotions**, because it showed a family having breakfast together. It **influenced my purchasing decision**, and I bought the coffee the next day." }
    ]
  });

  /* ── Module 28 — Rules, Laws & Crime ──────────────────────────────────── */
  P.addPack("voc_28_rules_laws_crime", {
    ex: [
      "Most people obey the law, but a small number of people break it.",
      "Students must follow the rules of the school, such as arriving on time.",
      "People who commit a crime should be held responsible for it.",
      "Parking in the wrong place is a minor offence, but robbery is a serious offence.",
      "A law-abiding citizen pays taxes and respects traffic rules.",
      "Strict punishments can deter crime because people are afraid of the consequences.",
      "Better street lighting can help prevent crime in the neighborhood.",
      "The city decided to impose a fine on anyone who drops litter in the park.",
      "If you break the rules, you have to face the consequences.",
      "He had to serve a prison sentence of two years for theft.",
      "Rehabilitation helps former prisoners return to normal life.",
      "Law enforcement officers patrol the streets to keep people safe.",
      "Wearing helmets is a simple rule that protects public safety.",
      "Children should learn to take responsibility for their actions.",
      "Teachers can help children develop a sense of justice by treating everyone fairly."
    ],
    use: [
      { t: "fill", q: "Parking for a few minutes in the wrong place is only a ____ offence, so the police usually just give you a small ticket.", o: ["minor", "serious", "criminal", "violent"], a: 0, w: "Minor offence = hành vi phạm pháp nhẹ; serious offence = nghiêm trọng." },
      { t: "fill", q: "The council will ____ on anyone who throws rubbish on the street: they will have to pay 500,000 dong.", o: ["impose a fine", "serve a prison sentence", "commit a crime", "prevent crime"], a: 0, w: "Impose a fine on someone = phạt tiền ai đó." },
      { t: "fill", q: "Many people believe that harsh punishments can ____, because people are afraid of the consequences.", o: ["deter crime", "follow the rules", "serve a sentence", "take responsibility"], a: 0, w: "Deter crime = ngăn chặn tội phạm bằng cách làm người ta sợ hậu quả." },
      { t: "fill", q: "After leaving prison, he joined a program that helped him find a job and a place to live. This kind of ____ helps former prisoners start a new life.", o: ["rehabilitation", "law enforcement", "public safety", "a sense of justice"], a: 0, w: "Rehabilitation = sự cải tạo, giúp người từng phạm tội tái hòa nhập." },
      { t: "fix", q: "Câu có lỗi: “He broke the rules and had to face with the consequences.” Chọn cách sửa đúng.", o: ["face the consequences", "face with the consequences", "face to the consequences", "face for the consequences"], a: 0, w: "Face là ngoại động từ: face the consequences." },
      { t: "fix", q: "Câu có lỗi: “Everyone should take responsibility of their actions.” Chọn giới từ đúng.", o: ["responsibility for", "responsibility of", "responsibility about", "responsibility to"], a: 0, w: "Cụm đúng: take responsibility for one's actions." },
      { t: "speak", q: "Do you think people in your country generally follow the rules?", h: ["follow the rules", "law-abiding citizen", "break the law", "face the consequences"], s: "In general, yes. Most people are **law-abiding citizens**, and they **follow the rules** because they don't want any trouble. Of course, some people **break the law**, for example by ignoring traffic lights, but they usually **face the consequences**, such as a fine." },
      { t: "speak", q: "What happens to people who break the law in your country?", h: ["break the law", "impose a fine", "serve a prison sentence", "minor offence"], s: "It depends on what they do. For a **minor offence**, like parking in the wrong place, the police usually **impose a fine**. But if someone **breaks the law** in a serious way, for example by stealing a lot of money, they may have to **serve a prison sentence**." }
    ],
    reuse: [
      { q: "Is your neighborhood a safe place to live?", h: ["public safety", "prevent crime", "law enforcement", "law-abiding citizen"], s: "Yes, I think it's quite safe. There are cameras on the main streets, which help to **prevent crime**, and **law enforcement** officers patrol at night. Most of my neighbors are **law-abiding citizens** who care about **public safety**, so I feel comfortable walking home late." },
      { q: "Describe a rule that you think is important. You should say what the rule is, where it applies, what happens if people break it, and why you think it is important.", h: ["follow the rules", "public safety", "impose a fine", "face the consequences", "a sense of justice"], s: "I'd like to talk about the rule that motorbike riders must wear helmets. It applies on all roads in my country, and everybody is expected to **follow the rules**. If you don't, the police can **impose a fine**, and you have to **face the consequences**. I think it's important because it protects **public safety**, and it also gives children **a sense of justice**, because they see that the same rules apply to everyone." },
      { q: "Is prison the best way to deal with people who commit crimes?", h: ["serve a prison sentence", "rehabilitation", "deter crime", "commit a crime", "take responsibility for their actions"], s: "I don't think prison is always the best way. For serious offences, people who **commit a crime** may need to **serve a prison sentence** so that society is protected, and a strict punishment can **deter crime**. However, for young or first-time offenders, I believe **rehabilitation** works better, because it teaches them to **take responsibility for their actions** and find a job after they leave." }
    ],
    recall: [
      { k: "vi", q: "phạm tội", a: ["commit a crime", "commit crimes"] },
      { k: "vi", q: "chấp hành án tù", a: ["serve a prison sentence", "serve a prison term", "serve a sentence"] },
      { k: "vi", q: "sự cải tạo, phục hồi", a: ["rehabilitation"] },
      { k: "vi", q: "áp dụng hình phạt tiền", a: ["impose a fine", "impose fines"] },
      { k: "sit", q: "Một người luôn đóng thuế đầy đủ và tôn trọng luật giao thông. Bạn mô tả người đó như thế nào?", a: ["a law-abiding citizen", "law-abiding citizen", "law abiding citizen"] },
      { k: "sit", q: "Cảnh sát tuần tra đường phố để giữ gìn trật tự. Hoạt động này được gọi là gì?", a: ["law enforcement"] },
      { k: "blank", q: "Cameras in the streets can help ____. (phòng chống tội phạm)", a: ["prevent crime", "deter crime"] },
      { k: "blank", q: "Wearing seat belts protects ____. (an toàn công cộng)", a: ["public safety"] },
      { k: "blank", q: "Teachers can help children develop ____ by treating everyone fairly. (ý thức về công lý)", a: ["a sense of justice", "sense of justice"] },
      { k: "speak", q: "Nói 1–2 câu về một quy định quan trọng và điều gì xảy ra nếu ai đó vi phạm nó. Thử dùng ít nhất hai cụm đã học.", a: ["follow the rules", "break the law", "face the consequences", "impose a fine", "public safety"], s: "Everyone has to **follow the rules** on the road, because it protects **public safety**. If someone **breaks the law**, the police can **impose a fine**, and that person has to **face the consequences**." }
    ]
  });

  /* ── Module 29 — History & Historical Heritage ────────────────────────── */
  P.addPack("voc_29_history_heritage", {
    ex: [
      "Hoi An Ancient Town is a famous historical site that attracts millions of visitors.",
      "Tran Hung Dao is a well-known historical figure in Vietnam.",
      "It is important to preserve historical buildings so that future generations can see them.",
      "Workers are trying to restore an ancient monument that was damaged by a storm.",
      "Many family recipes are passed down through generations.",
      "We should learn from the past so that we don't repeat the same mistakes.",
      "The economic reforms were a significant turning point in the country's development.",
      "The old temple has great cultural and historical significance for local people.",
      "Visiting museums helps me gain insight into the past.",
      "We must work together to preserve historical heritage for our children.",
      "School trips can help preserve cultural and historical values.",
      "Festivals are a good way to promote cultural and historical values to tourists.",
      "Traditional costumes help promote national identity."
    ],
    use: [
      { t: "fill", q: "The government plans to ____ that was damaged during the war, using traditional materials and methods.", o: ["restore an ancient monument", "pass down through generations", "learn from the past", "promote national identity"], a: 0, w: "Restore an ancient monument = trùng tu một di tích cổ." },
      { t: "fill", q: "Visiting the war museum helped me ____, because I could see how ordinary people lived at that time.", o: ["gain insight into the past", "restore an ancient monument", "impose a historical fine", "promote a historical site"], a: 0, w: "Gain insight into the past = hiểu sâu hơn về quá khứ." },
      { t: "fill", q: "In my family, cooking traditions have been ____, from my grandmother to my mother and now to me.", o: ["passed down through generations", "restored as an ancient monument", "learned from the past", "promoted as national identity"], a: 0, w: "Pass down through generations = truyền lại qua các thế hệ." },
      { t: "fill", q: "The reforms of the 1980s were ____ for the economy: after that, people's lives changed a lot.", o: ["a significant turning point", "a historical figure", "a historical site", "a national identity"], a: 0, w: "A significant turning point = bước ngoặt quan trọng." },
      { t: "fix", q: "Câu có lỗi: “Visiting museums helps students gain insight in the past.” Chọn giới từ đúng.", o: ["insight into", "insight in", "insight at", "insight by"], a: 0, w: "Cụm đúng: gain insight into the past." },
      { t: "fix", q: "Câu có lỗi: “Local people are trying to preserve historical building in the old town.” Chọn cách sửa đúng.", o: ["preserve historical buildings", "preserve historical building", "preserving historical building", "preserve a historical buildings"], a: 0, w: "Nói chung về nhiều công trình nên dùng số nhiều: preserve historical buildings." },
      { t: "speak", q: "Are there any historical sites near the place where you live?", h: ["historical site", "cultural and historical significance", "restore an ancient monument", "preserve historical buildings"], s: "Yes, there is an old citadel about ten kilometers from my house. It's a famous **historical site**, and it has great **cultural and historical significance** for local people. A few years ago, workers had to **restore an ancient monument** inside the citadel, and I think it's important to **preserve historical buildings** like that." },
      { t: "speak", q: "Do you like learning about history? Why or why not?", h: ["learn from the past", "gain insight into the past", "a significant turning point", "historical figure"], s: "Yes, I do. I enjoy reading about a famous **historical figure** and how he or she made decisions. It helps me **gain insight into the past**, and I think we can **learn from the past** to avoid repeating mistakes. I'm especially interested in **a significant turning point** in my country's history, the 1980s reforms." }
    ],
    reuse: [
      { q: "How do people in your country remember important people from the past?", h: ["historical figure", "pass down through generations", "promote national identity", "cultural and historical significance"], s: "We remember them in many ways. Each city has streets and statues named after a **historical figure**, and stories about these heroes are **passed down through generations** at home and at school. I think this helps **promote national identity**, because young people see why these people have such **cultural and historical significance**." },
      { q: "Describe a historical place that you have visited or would like to visit. You should say where it is, what you can see there, what its history is, and why it is important.", h: ["historical site", "cultural and historical significance", "restore an ancient monument", "gain insight into the past", "a significant turning point"], s: "I'd like to talk about the Imperial City of Hue. It's a large **historical site** with palaces, gates and walls, and it has great **cultural and historical significance** for Vietnam. Some parts were damaged by war, so workers had to **restore an ancient monument** inside the walls. When I visited, I could really **gain insight into the past**, and I learned that the move of the capital was **a significant turning point** for the country." },
      { q: "Why should governments spend money on preserving old buildings?", h: ["preserve historical heritage", "preserve cultural and historical values", "promote national identity", "pass down through generations"], s: "I think it's a good investment. Old buildings let us **preserve historical heritage**, so that stories and traditions can be **passed down through generations**. They also help us **preserve cultural and historical values** and **promote national identity**, and they attract tourists, which brings money back to the local community." },
      { q: "How can young people be encouraged to take an interest in history?", h: ["promote cultural and historical values", "learn from the past", "historical site", "gain insight into the past"], s: "Schools could organize trips to a **historical site**, because seeing the place makes history more real. Teachers and local governments can also **promote cultural and historical values** through festivals and exhibitions. When students **gain insight into the past**, they understand why we should **learn from the past**, and they start to care more." }
    ],
    recall: [
      { k: "vi", q: "di tích lịch sử", a: ["historical site", "a historical site", "historic site"] },
      { k: "vi", q: "nhân vật lịch sử", a: ["historical figure", "a historical figure", "historic figure"] },
      { k: "vi", q: "bước ngoặt quan trọng", a: ["a significant turning point", "significant turning point"] },
      { k: "vi", q: "ý nghĩa văn hóa và lịch sử", a: ["cultural and historical significance"] },
      { k: "vi", q: "hiểu sâu hơn về quá khứ", a: ["gain insight into the past", "gain an insight into the past"] },
      { k: "sit", q: "Một ngôi đền cổ bị hư hại và chính quyền quyết định xây dựng lại như cũ. Bạn dùng cụm động từ nào?", a: ["restore an ancient monument", "restore ancient monuments", "restore a monument"] },
      { k: "sit", q: "Truyền thống nấu ăn được truyền từ bà sang mẹ rồi sang con. Bạn nói thế nào?", a: ["pass down through generations", "passed down through generations", "be passed down through generations"] },
      { k: "blank", q: "Studying history helps us ____ and avoid repeating the same mistakes. (học hỏi từ quá khứ)", a: ["learn from the past"] },
      { k: "blank", q: "Festivals and school trips can help ____ among young people. (phát huy bản sắc dân tộc)", a: ["promote national identity"] },
      { k: "speak", q: "Nói 1–2 câu về lý do cần bảo tồn một địa điểm lịch sử. Thử dùng ít nhất hai cụm đã học.", a: ["preserve historical heritage", "preserve historical buildings", "preserve cultural and historical values", "cultural and historical significance"], s: "We should **preserve historical heritage**, because old places have great **cultural and historical significance**. If we **preserve historical buildings**, our children can still learn about the past." }
    ]
  });

  /* ── Module 30 — Arts & Creativity ────────────────────────────────────── */
  P.addPack("voc_30_arts_creativity", {
    ex: [
      "I took visual arts classes at school, including painting and photography.",
      "This painting is a work of art that took the artist ten years to complete.",
      "Even as a child, she showed great artistic talent.",
      "Dancing is a form of creative expression for me.",
      "Many painters draw inspiration from nature.",
      "Shy children can express themselves through art without having to speak.",
      "It takes time to appreciate a work of art properly.",
      "Drawing and crafts help children develop their creativity.",
      "Good art teachers teach students to think outside the box.",
      "Pottery is a hands-on activity that I find very relaxing.",
      "You don't need advanced artistic skills to enjoy painting.",
      "Fairy tales stimulate the imagination of young children.",
      "My grandmother has always been a source of inspiration for my paintings.",
      "The museum displays both traditional and contemporary art.",
      "A good photographer has an eye for detail."
    ],
    use: [
      { t: "fill", q: "Not everyone is born with ____; some people can draw beautifully even without any lessons.", o: ["artistic talent", "a hands-on activity", "contemporary art", "visual arts"], a: 0, w: "Artistic talent = tài năng nghệ thuật." },
      { t: "fill", q: "Many writers ____ their own childhood when they create stories for children.", o: ["draw inspiration from", "think outside the box of", "have an eye for", "stimulate the imagination of"], a: 0, w: "Draw inspiration from = lấy cảm hứng từ." },
      { t: "fill", q: "When I'm stressed, I paint because it allows me to ____ without having to use words.", o: ["express myself through art", "appreciate a work of art", "draw inspiration from", "stimulate the imagination"], a: 0, w: "Express oneself through art = thể hiện bản thân thông qua nghệ thuật." },
      { t: "fill", q: "A good designer must be able to ____ and come up with ideas that nobody has tried before.", o: ["think outside the box", "have an eye for detail", "appreciate a work of art", "draw a source of inspiration"], a: 0, w: "Think outside the box = tư duy sáng tạo, vượt khỏi lối mòn." },
      { t: "fix", q: "Câu có lỗi: “Painting helps children develop theirs creativity.” Chọn cách sửa đúng.", o: ["their creativity", "theirs creativity", "they creativity", "them creativity"], a: 0, w: "Cần tính từ sở hữu trước danh từ: develop their creativity." },
      { t: "fix", q: "Câu có lỗi: “She has an eye of detail, so she notices small changes in a picture.” Chọn giới từ đúng.", o: ["an eye for detail", "an eye of detail", "an eye to detail", "an eye at detail"], a: 0, w: "Cụm đúng: have an eye for detail." },
      { t: "speak", q: "Did you enjoy art lessons when you were at school?", h: ["visual arts", "artistic skills", "hands-on activity", "develop your creativity"], s: "Yes, I did. We had **visual arts** classes once a week, and I really enjoyed them because they were a fun **hands-on activity**. I wasn't very good, but I slowly improved my **artistic skills**, and the lessons helped me **develop my creativity**." },
      { t: "speak", q: "Do you like visiting art galleries or museums?", h: ["appreciate a work of art", "traditional and contemporary art", "a work of art", "draw inspiration from"], s: "Yes, from time to time. I like galleries that show both **traditional and contemporary art**, because I can compare different styles. I'm not an expert, but I enjoy trying to **appreciate a work of art** slowly, and sometimes a single painting can help me **draw inspiration from** its colors for my own photos." }
    ],
    reuse: [
      { q: "Do you think everyone can be creative?", h: ["artistic talent", "think outside the box", "develop one's creativity", "stimulate the imagination"], s: "I believe so. Some people have natural **artistic talent**, but creativity is a skill that anyone can develop. If you read widely, try new things and **think outside the box**, your ideas will improve. Activities like drawing or storytelling also **stimulate the imagination**, so everyone can **develop their creativity**." },
      { q: "Describe a work of art that you like. You should say what it is, where you saw it, what it looks like, and why you like it.", h: ["a work of art", "have an eye for detail", "a source of inspiration", "creative expression"], s: "I'd like to talk about a painting of a lotus pond that I saw in a small gallery last year. It's **a work of art** that looks very simple at first, but the painter must **have an eye for detail**, because every petal and every drop of water looks real. It's also **a source of inspiration** for me, and I think it's a beautiful example of **creative expression**." },
      { q: "Should schools spend more time on art?", h: ["visual arts", "express themselves through art", "develop their creativity", "hands-on activity", "stimulate the imagination"], s: "I think they should. Many schools focus on exams, but **visual arts** are important too. Children who can **express themselves through art** are usually more confident, and a **hands-on activity** like painting can **stimulate the imagination** and help them **develop their creativity**." },
      { q: "Is traditional art still important today?", h: ["traditional and contemporary art", "draw inspiration from", "a source of inspiration", "creative expression"], s: "Yes, I think it is. Many modern artists **draw inspiration from** old folk paintings, so **traditional and contemporary art** can work together. Traditional art is also **a source of inspiration** for young designers, and it's a way for a community to show its own **creative expression**." }
    ],
    recall: [
      { k: "vi", q: "nghệ thuật thị giác", a: ["visual arts"] },
      { k: "vi", q: "tác phẩm nghệ thuật", a: ["a work of art", "work of art", "works of art"] },
      { k: "vi", q: "sự thể hiện sáng tạo", a: ["creative expression"] },
      { k: "vi", q: "hoạt động thực hành trực tiếp", a: ["hands-on activity", "a hands-on activity", "hands on activity"] },
      { k: "vi", q: "tài năng nghệ thuật", a: ["artistic talent"] },
      { k: "sit", q: "Bạn tìm ý tưởng cho những bức tranh của mình từ thiên nhiên và cuộc sống xung quanh. Bạn dùng cụm động từ nào?", a: ["draw inspiration from"] },
      { k: "sit", q: "Một người luôn nhận ra những chi tiết nhỏ mà người khác bỏ qua. Bạn mô tả người đó thế nào?", a: ["have an eye for detail", "has an eye for detail", "an eye for detail"] },
      { k: "blank", q: "Fairy tales ____ of young children and make them want to create their own stories. (kích thích trí tưởng tượng)", a: ["stimulate the imagination", "stimulate imagination"] },
      { k: "blank", q: "My grandmother is ____ for my paintings. (nguồn cảm hứng)", a: ["a source of inspiration", "source of inspiration"] },
      { k: "speak", q: "Nói 1–2 câu về vai trò của nghệ thuật trong cuộc sống. Thử dùng ít nhất hai cụm đã học.", a: ["express oneself through art", "creative expression", "develop one's creativity", "stimulate the imagination", "appreciate a work of art"], s: "Art is important because people can **express themselves through art** when they find it hard to speak. It also helps children **develop their creativity** and **stimulates the imagination**." }
    ]
  });
})();
