/* Practice packs 2/6 — Topic Vocabulary modules 09–14 (Use · Reuse · Retrieve). Format: see data/packs-1.js and P.addPack in js/practice.js. */
(function () {
  var P = window.LU.practice;

  P.addPack("voc_09_technology_social_media", {
    ex: [
      "This app is user-friendly, so even my grandmother can use it.",
      "Online banking is time-saving because I don't have to go to the bank.",
      "Smartphones make life easier by putting maps, banking and shopping in one device.",
      "I use video calls to keep in touch with my cousins abroad.",
      "Messaging apps help families stay connected, even when they live in different cities.",
      "Students can access information within seconds instead of going to the library.",
      "Many teenagers use social media to keep up with the latest trends in music and fashion.",
      "We rely on technology so much that a power cut can ruin a whole day.",
      "It's easy to be addicted to short videos.",
      "I sometimes spend hours scrolling through videos before bed.",
      "It's easy to get distracted by notifications while studying.",
      "When I'm watching videos, I often lose track of time.",
      "Fake accounts can spread misinformation very quickly.",
      "You should protect personal information by using strong passwords.",
      "Face-to-face interaction is still important, even though online interaction is easier."
    ],
    use: [
      { t: "fill", q: "This app is so ____ that my grandfather learned to use it in just a few minutes.", o: ["user-friendly", "time-saving", "addicted", "distracted"], a: 0, w: "User-friendly = thân thiện, dễ sử dụng." },
      { t: "fill", q: "Ordering groceries online is ____: it takes five minutes, and I don't have to travel to the supermarket.", o: ["time-saving", "distracted", "addicted", "misleading"], a: 0, w: "Time-saving = tiết kiệm thời gian." },
      { t: "fill", q: "I use video calls to ____ my friends who are studying abroad.", o: ["keep in touch with", "lose track of", "spread", "protect"], a: 0, w: "Keep in touch with = giữ liên lạc với." },
      { t: "fill", q: "When I start watching short videos, I often ____ and stay up until midnight.", o: ["lose track of time", "protect personal information", "access information", "keep up with trends"], a: 0, w: "Lose track of time = quên mất thời gian." },
      { t: "fix", q: "Câu có lỗi: “Some teenagers are addicted with social media and can't stop checking their phones.” Chọn cách sửa đúng.", o: ["addicted to", "addicted in", "addicted at", "addicted of"], a: 0, w: "Cụm đúng: be addicted to + danh từ." },
      { t: "fix", q: "Câu có lỗi: “Fake news can spread misinformations very quickly online.” Chọn cách sửa đúng.", o: ["spread misinformation", "spread a misinformation", "spreads misinformations", "spread informations wrongly"], a: 0, w: "Misinformation là danh từ không đếm được: spread misinformation." },
      { t: "speak", q: "How do you use technology in your daily life?", h: ["access information", "make life easier", "time-saving", "user-friendly"], s: "I use my phone for almost everything. It helps me **access information** quickly, for example when I need to check a word or find directions. Many apps are **user-friendly** and **time-saving**, so technology really **makes life easier** for me." },
      { t: "speak", q: "Do you use social media to talk to friends and family?", h: ["keep in touch with", "stay connected", "spend hours scrolling", "get distracted"], s: "Yes, I do. I use social media to **keep in touch with** my cousins who live abroad, and it helps us **stay connected**. The problem is that I sometimes **spend hours scrolling**, so I can **get distracted** from my studies." }
    ],
    reuse: [
      { q: "Do you think people spend too much time on their phones?", h: ["be addicted to", "lose track of time", "rely on technology", "get distracted"], s: "Yes, I think many people do. Some of them seem to **be addicted to** their phones, and they **lose track of time** when they're online. We **rely on technology** so much that it's hard to put the phone down, even during meals." },
      { q: "Describe an app or website that you use a lot. You should say what it is, what you use it for, why you like it, and whether it has any disadvantages.", h: ["user-friendly", "access information", "keep up with the latest trends", "protect personal information"], s: "I'd like to talk about a video app I use almost every day. It's very **user-friendly**, so it's easy to find what I want. I use it to **access information** about my hobbies, and it helps me **keep up with the latest trends**. The disadvantage is that I have to be careful to **protect personal information**, because some accounts ask for too many details." },
      { q: "What are the negative effects of social media on young people?", h: ["spread misinformation", "be addicted to", "face-to-face interaction", "spend hours scrolling"], s: "I think one problem is that false stories can **spread misinformation** very quickly, and young people may believe them. Some of them also **spend hours scrolling**, so they have less time for real **face-to-face interaction** with friends. In the long run, they may **be addicted to** online attention." }
    ],
    recall: [
      { k: "vi", q: "dễ sử dụng, thân thiện với người dùng", a: ["user-friendly", "user friendly"] },
      { k: "vi", q: "giữ liên lạc với", a: ["keep in touch with", "keep in touch"] },
      { k: "vi", q: "bị xao nhãng", a: ["get distracted", "be distracted", "distracted"] },
      { k: "sit", q: "Một ứng dụng giúp bạn làm việc nhanh hơn và không mất nhiều thời gian. Bạn dùng tính từ ghép nào?", a: ["time-saving", "time saving"] },
      { k: "sit", q: "Bạn xem video mải mê, đến khi nhìn đồng hồ thì đã rất khuya. Bạn dùng cụm động từ nào?", a: ["lose track of time", "lost track of time", "lose track of the time"] },
      { k: "blank", q: "You should use strong passwords to ____. (bảo vệ thông tin cá nhân)", a: ["protect personal information", "protect your personal information"] },
      { k: "blank", q: "Some people ____ online games and find it hard to stop. (nghiện)", a: ["are addicted to", "be addicted to"] },
      { k: "speak", q: "Nói 1–2 câu về một lợi ích của công nghệ trong cuộc sống của bạn. Thử dùng ít nhất hai cụm đã học.", a: ["make life easier", "access information", "stay connected", "time-saving"], s: "Technology **makes life easier** for me in many ways. I can **access information** in seconds, and I can **stay connected** with my friends even when we're busy." }
    ]
  });

  P.addPack("voc_10_health_lifestyle", {
    ex: [
      "It's easier to lead a healthy lifestyle when your family supports you.",
      "It is not always easy to maintain a balanced diet when you eat out a lot.",
      "Schools should offer more nutritious food instead of sweets.",
      "Processed food is quick, but it often contains too much salt.",
      "I try to stay physically active by cycling to work.",
      "Doctors say adults should get regular exercise, even if it's just walking.",
      "It takes about a month to build a healthy habit.",
      "It's hard to break a bad habit like staying up late.",
      "I can't concentrate if I don't get enough sleep.",
      "I often feel physically exhausted after a long shift.",
      "I feel mentally drained when I have to make decisions all day.",
      "Listening to music is a simple way to relieve stress.",
      "A short walk at lunchtime can boost your energy levels.",
      "Regular exercise can improve overall health in many ways.",
      "A sedentary lifestyle can lead to back pain and weight gain.",
      "Too much screen time may cause health problems for children.",
      "It helps to develop a routine so you go to bed at the same time every night.",
      "I've tried to get into the habit of drinking water before breakfast."
    ],
    use: [
      { t: "fill", q: "Fast food is convenient, but ____ often contains too much salt and sugar.", o: ["processed food", "nutritious food", "regular exercise", "healthy habits"], a: 0, w: "Processed food = thực phẩm chế biến sẵn, thường nhiều muối và đường." },
      { t: "fill", q: "Sitting at a desk all day and rarely moving is typical of a ____, which can lead to health problems.", o: ["sedentary lifestyle", "balanced diet", "nutritious meal", "regular exercise"], a: 0, w: "A sedentary lifestyle = lối sống ít vận động." },
      { t: "fill", q: "I'm trying to ____ drinking water as soon as I wake up, so that it becomes automatic.", o: ["get into the habit of", "break the habit of", "lose track of", "keep in touch with"], a: 0, w: "Get into the habit of + V-ing = hình thành thói quen." },
      { t: "fill", q: "After a long day of difficult meetings, she felt mentally ____.", o: ["drained", "balanced", "sedentary", "nutritious"], a: 0, w: "Mentally drained = cạn kiệt năng lượng tinh thần." },
      { t: "fix", q: "Câu có lỗi: “I want to build a habit healthy by exercising every morning.” Chọn cách sửa đúng.", o: ["build a healthy habit", "build habit healthy", "make a habit healthy", "build a habit healthily"], a: 0, w: "Tính từ đứng trước danh từ: a healthy habit." },
      { t: "fix", q: "Câu có lỗi: “She doesn't get enough sleeping, so she feels tired all day.” Chọn cách sửa đúng.", o: ["get enough sleep", "get enough sleeping", "have enough slept", "take enough sleep"], a: 0, w: "Cụm đúng: get enough sleep (sleep là danh từ không đếm được)." },
      { t: "speak", q: "What do you do to stay healthy?", h: ["lead a healthy lifestyle", "get regular exercise", "maintain a balanced diet", "stay physically active"], s: "I try to **lead a healthy lifestyle**. I **get regular exercise** by running three times a week, and I try to **maintain a balanced diet** by eating more vegetables and less fast food. I think it helps me **stay physically active** and feel positive." },
      { t: "speak", q: "What do you do when you feel stressed?", h: ["relieve stress", "boost energy levels", "get enough sleep", "feel mentally drained"], s: "When I **feel mentally drained**, I usually go for a walk or listen to music, which helps me **relieve stress**. I also try to **get enough sleep**, because a good night's rest can **boost my energy levels** for the next day." }
    ],
    reuse: [
      { q: "Do you think you have good daily habits?", h: ["build a healthy habit", "break a bad habit", "develop a routine", "get into the habit of"], s: "I think I have some good habits, but not all of them. I've tried to **build a healthy habit** of going to bed before eleven, and I'm trying to **break a bad habit** of checking my phone at night. It helps if I **develop a routine**, so I follow the same schedule every day." },
      { q: "Describe a time when you felt very tired. You should say when it was, what you had been doing, how you felt, and what you did afterwards.", h: ["feel physically exhausted", "get enough sleep", "boost energy levels", "health problems"], s: "I remember the week of my final exams last year. I'd stayed up late for several nights, so I **felt physically exhausted** and could hardly concentrate. I realized that I wouldn't **get enough sleep** if I carried on like that, and it could cause **health problems**. So I slept for ten hours and had a light breakfast, which really helped to **boost my energy levels**." },
      { q: "Why do many people nowadays have unhealthy lifestyles?", h: ["a sedentary lifestyle", "processed food", "get regular exercise", "improve overall health"], s: "I think it's because many jobs involve sitting at a desk, which leads to **a sedentary lifestyle**. People are busy, so they eat **processed food** that is quick but not very healthy, and they don't **get regular exercise**. If they made small changes, it could **improve overall health** for many people." }
    ],
    recall: [
      { k: "vi", q: "ngủ đủ giấc", a: ["get enough sleep"] },
      { k: "vi", q: "giải tỏa căng thẳng", a: ["relieve stress"] },
      { k: "vi", q: "lối sống ít vận động", a: ["a sedentary lifestyle", "sedentary lifestyle"] },
      { k: "sit", q: "Bạn muốn nói rằng bạn tập thể dục đều đặn mỗi tuần. Bạn dùng cụm động từ nào?", a: ["get regular exercise", "exercise regularly", "do regular exercise"] },
      { k: "sit", q: "Mỗi ngày một người ăn đủ rau, đạm, tinh bột và chất béo ở mức hợp lý. Họ đang làm gì?", a: ["maintain a balanced diet", "eat a balanced diet", "have a balanced diet", "maintains a balanced diet"] },
      { k: "blank", q: "It is hard to ____ like biting your nails. (từ bỏ thói quen xấu)", a: ["break a bad habit"] },
      { k: "blank", q: "A short walk at lunchtime can ____ in the afternoon. (tăng mức năng lượng)", a: ["boost your energy levels", "boost energy levels", "boost my energy levels"] },
      { k: "speak", q: "Nói 1–2 câu về một thói quen tốt bạn đang xây dựng. Thử dùng ít nhất hai cụm đã học.", a: ["get into the habit of", "develop a routine", "stay physically active", "build a healthy habit"], s: "I'm trying to **get into the habit of** exercising every morning. It's not easy, but I'm **developing a routine**, and I hope it will help me **stay physically active**." }
    ]
  });

  P.addPack("voc_11_food_eating_habits", {
    ex: [
      "I prefer homemade food because I know exactly what's in it.",
      "Pho is a traditional dish that many foreigners want to try.",
      "Trying the local cuisine is one of the best parts of traveling.",
      "This restaurant uses fresh ingredients from the market every morning.",
      "The soup has a rich flavor, but the noodles are quite mild.",
      "The curry was too spicy for me, but the soup was a bit bland.",
      "Spring rolls should be crispy on the outside.",
      "The beef was so tender that it almost melted in my mouth.",
      "I have a sweet tooth, so I can't say no to cake.",
      "My little brother is a picky eater and refuses vegetables.",
      "We usually eat out on Sundays.",
      "I often grab a quick bite between classes.",
      "Not every dish will suit my taste when I travel.",
      "That street stall is worth trying if you like seafood."
    ],
    use: [
      { t: "fill", q: "These spring rolls are perfectly ____ on the outside and soft inside.", o: ["crispy", "bland", "tender", "mild"], a: 0, w: "Crispy = giòn, thường nói về lớp vỏ ngoài." },
      { t: "fill", q: "The beef was so ____ that I could cut it with a spoon.", o: ["tender", "crunchy", "spicy", "bland"], a: 0, w: "Tender = mềm, dễ nhai, thường dùng cho thịt." },
      { t: "fill", q: "I'm always busy at lunchtime, so I usually ____ near the office instead of cooking.", o: ["grab a quick bite", "have a sweet tooth", "am a picky eater", "suit my taste"], a: 0, w: "Grab a quick bite = ăn nhanh một chút." },
      { t: "fill", q: "I don't enjoy cooking, so I ____ at least three times a week.", o: ["eat out", "eat away", "eat over", "eat after"], a: 0, w: "Eat out = ăn ngoài, ở nhà hàng." },
      { t: "fix", q: "Câu có lỗi: “My brother is a pick eater and never tries new dishes.” Chọn cách sửa đúng.", o: ["a picky eater", "a pick eater", "an picky eater", "a picking eater"], a: 0, w: "Cụm đúng: a picky eater = người kén ăn." },
      { t: "fix", q: "Câu có lỗi: “This restaurant is worth to try if you like seafood.” Chọn cách sửa đúng.", o: ["worth trying", "worth to try", "worthy trying", "worth of try"], a: 0, w: "Cấu trúc đúng: be worth + V-ing." },
      { t: "speak", q: "What kind of food do you usually eat at home?", h: ["homemade", "fresh ingredients", "traditional dish", "suit my taste"], s: "At home we mostly eat **homemade** food. My mother always buys **fresh ingredients** from the local market, and she cooks a **traditional dish** called braised fish quite often. It really **suits my taste**, so I never get tired of it." },
      { t: "speak", q: "Do you like eating out?", h: ["eat out", "grab a quick bite", "local cuisine", "be worth trying"], s: "Yes, I do. I sometimes **eat out** with friends on weekends, and during the week I just **grab a quick bite** near my office. I enjoy trying the **local cuisine**, especially street stalls that are **worth trying**." }
    ],
    reuse: [
      { q: "Are you a picky eater?", h: ["be a picky eater", "spicy", "bland", "have a sweet tooth"], s: "Not really, but I'm not a big fan of **bland** food. I don't think I'm **a picky eater**, and I'm happy to eat **spicy** dishes. The only thing is that I **have a sweet tooth**, so I eat too many desserts." },
      { q: "Describe a meal you enjoyed in a restaurant or at a friend's house. You should say where you were, what you ate, what it tasted like, and why you enjoyed it.", h: ["rich flavor", "tender", "crispy", "suit my taste"], s: "Last month my friend invited me to dinner and cooked beef stew. The meat was so **tender** that it almost fell apart, and the sauce had a **rich flavor**. We also had **crispy** fried tofu as a side dish. It really **suited my taste**, so I asked for the recipe." },
      { q: "How have people's eating habits changed in your country?", h: ["eat out", "homemade", "local cuisine", "grab a quick bite"], s: "People used to eat **homemade** meals most of the time, but now many families **eat out** or **grab a quick bite** on the way home because life is busier. Still, I think the **local cuisine** remains very popular, especially at family gatherings." }
    ],
    recall: [
      { k: "vi", q: "đồ ăn tự nấu tại nhà", a: ["homemade food", "home-cooked food", "homemade", "home-cooked"] },
      { k: "vi", q: "hảo ngọt", a: ["have a sweet tooth", "a sweet tooth", "sweet tooth"] },
      { k: "vi", q: "kén ăn", a: ["be a picky eater", "a picky eater", "picky eater"] },
      { k: "sit", q: "Một món ăn có vị nhạt, không có hương vị gì rõ rệt. Bạn dùng tính từ nào?", a: ["bland"] },
      { k: "sit", q: "Món chiên rất giòn khi bạn cắn. Bạn mô tả bằng tính từ nào?", a: ["crispy", "crunchy"] },
      { k: "blank", q: "This dish doesn't ____ because it's far too sweet. (hợp khẩu vị của tôi)", a: ["suit my taste"] },
      { k: "blank", q: "That street stall is ____ if you like seafood. (đáng để thử)", a: ["worth trying", "be worth trying"] },
      { k: "speak", q: "Nói 1–2 câu về một món ăn truyền thống ở nơi bạn sống. Thử dùng ít nhất hai cụm đã học.", a: ["traditional dish", "fresh ingredients", "local cuisine", "rich flavor"], s: "Banh xeo is a **traditional dish** in my region. It's made with **fresh ingredients** and has a **rich flavor**, so it's often recommended to visitors who want to try the **local cuisine**." }
    ]
  });

  P.addPack("voc_12_travel_tourism", {
    ex: [
      "The old bridge is the city's most famous tourist attraction.",
      "Da Lat is a must-visit destination for anyone who loves cool weather.",
      "We prefer places off the beaten track, away from big crowds.",
      "The breathtaking scenery on the way to Ha Giang is worth the long journey.",
      "Hue is famous for its cultural heritage, including old palaces and tombs.",
      "It's polite to learn about local customs before visiting a temple.",
      "In big cities, public transportation is often cheaper than taxis.",
      "We booked our accommodation online two months before the trip.",
      "We found a budget-friendly hotel near the beach.",
      "The main square was too touristy, so we walked to a less touristy neighborhood.",
      "A solo trip taught me to be more independent.",
      "A package tour is convenient, but you don't have much freedom.",
      "I like to immerse myself in local culture by staying with a host family.",
      "I traveled alone to broaden my horizons.",
      "Sometimes I just need to get away from it all and spend a weekend by the sea.",
      "Watching the sunrise from the mountain was a memorable experience.",
      "The restaurant near the station is a tourist trap; the food is poor and expensive."
    ],
    use: [
      { t: "fill", q: "We avoided the main square because it was too ____, and went to a quiet street where local people eat.", o: ["touristy", "affordable", "memorable", "budget-friendly"], a: 0, w: "Touristy = mang tính du lịch đại trà, đông khách du lịch." },
      { t: "fill", q: "I booked a ____ hotel near the beach because I didn't want to spend too much.", o: ["budget-friendly", "breathtaking", "touristy", "off the beaten track"], a: 0, w: "Budget-friendly = hợp túi tiền." },
      { t: "fill", q: "The restaurant next to the museum is a ____: the food is average, but the prices are three times higher.", o: ["tourist trap", "tourist attraction", "package tour", "solo trip"], a: 0, w: "A tourist trap = nơi chủ yếu nhằm thu tiền khách du lịch, giá cao." },
      { t: "fill", q: "I stayed with a local family and joined their daily activities because I wanted to ____.", o: ["immerse myself in local culture", "take a package tour", "find a tourist trap", "stay in a touristy area"], a: 0, w: "Immerse myself in local culture = hòa mình vào văn hóa địa phương." },
      { t: "fix", q: "Câu có lỗi: “We prefer places off the beaten way, where there are few tourists.” Chọn cách diễn đạt đúng.", o: ["off the beaten track", "out of the beaten track", "far from the beaten way", "beyond the beaten road"], a: 0, w: "Cụm cố định: off the beaten track." },
      { t: "fix", q: "Câu có lỗi: “Before visiting a temple, it's polite to learn about the local costumes.” Chọn từ đúng thay cho từ in sai.", o: ["local customs", "local custom's", "locals customs", "local costume"], a: 0, w: "Customs = phong tục; costumes = trang phục." },
      { t: "speak", q: "Do you like traveling? Why or why not?", h: ["broaden my horizons", "get away from it all", "a memorable experience", "tourist attraction"], s: "Yes, I love traveling. It helps me **broaden my horizons** because I can see how other people live. It's also a good way to **get away from it all** when I'm tired of work, and I usually have **a memorable experience** every time." },
      { t: "speak", q: "What kinds of places do you like to visit on holiday?", h: ["off the beaten track", "cultural heritage", "breathtaking scenery", "less touristy"], s: "I prefer places **off the beaten track**, because they are usually **less touristy** and more peaceful. I'm interested in **cultural heritage**, so I enjoy visiting old towns and temples, and I also like places with **breathtaking scenery**." }
    ],
    reuse: [
      { q: "Would you prefer to travel alone or with other people?", h: ["solo trip", "package tour", "accommodation", "budget-friendly"], s: "I'd like to try a **solo trip** one day, because I could plan everything myself. But for now I prefer traveling with friends, because we can share the cost of **accommodation** and find **budget-friendly** places to eat. I'm not keen on a **package tour**, because it leaves little room for surprises." },
      { q: "Describe a place you visited that you would recommend to others. You should say where it is, when you went there, what you did there, and why you would recommend it.", h: ["must-visit destination", "local customs", "public transportation", "affordable"], s: "I'd recommend Hoi An. It's a **must-visit destination** for anyone who is interested in old architecture. I went there last summer and used **public transportation** from Da Nang, which was **affordable** and easy. I also learned about some **local customs**, like lighting lanterns on the river, which was really special." },
      { q: "What are the advantages and disadvantages of tourism for a local community?", h: ["tourist attraction", "tourist trap", "cultural heritage", "local customs"], s: "Tourism can bring money to a community, especially when a place becomes a famous **tourist attraction**. It can also help to protect **cultural heritage**, because people want to keep old buildings. However, some areas turn into a **tourist trap**, where prices are high and **local customs** are treated like a show." }
    ],
    recall: [
      { k: "vi", q: "điểm thu hút khách du lịch", a: ["tourist attraction"] },
      { k: "vi", q: "hòa mình vào văn hóa địa phương", a: ["immerse myself in local culture", "immerse yourself in local culture", "immerse oneself in local culture"] },
      { k: "vi", q: "tạm rời xa áp lực, bộn bề thường ngày", a: ["get away from it all"] },
      { k: "sit", q: "Bạn muốn đến một nơi ít người biết, không nằm trên các tuyến du lịch phổ biến. Bạn dùng cụm nào?", a: ["off the beaten track"] },
      { k: "sit", q: "Một chuyến đi mà công ty du lịch sắp xếp sẵn mọi thứ: xe, khách sạn, lịch trình. Đó là gì?", a: ["package tour", "a package tour"] },
      { k: "blank", q: "Traveling helps me ____ because I see how other people live. (mở rộng hiểu biết, tầm nhìn)", a: ["broaden my horizons"] },
      { k: "blank", q: "The restaurant near the museum is a ____: the food is poor and the prices are very high. (địa điểm du lịch chỉ nhằm thu tiền khách)", a: ["tourist trap", "a tourist trap"] },
      { k: "speak", q: "Nói 1–2 câu về một chuyến đi đáng nhớ của bạn. Thử dùng ít nhất hai cụm đã học.", a: ["a memorable experience", "breathtaking scenery", "accommodation", "must-visit destination"], s: "Last summer I visited Ha Long Bay, which is a **must-visit destination**. The **breathtaking scenery** made the trip **a memorable experience**, even though our **accommodation** was very simple." }
    ]
  });

  P.addPack("voc_13_money_shopping", {
    ex: [
      "The shoes were overpriced, so I didn't buy them.",
      "Students need affordable meals.",
      "I bought this jacket in the sale, and it was a bargain.",
      "Impulse buying is common when stores offer a limited-time discount.",
      "I always shop around before buying a laptop.",
      "It's easy to compare prices online.",
      "Reading reviews helps you make an informed decision.",
      "Leather bags are durable and can last for many years.",
      "I prefer to buy high-quality shoes even if they cost more.",
      "Some teenagers are very brand-conscious and only want famous labels.",
      "I always read customer reviews before ordering online.",
      "You can return an item within seven days if you keep the receipt.",
      "I try to stick to a budget so that I can save money each month.",
      "After losing my part-time job, I had to cut back on spending.",
      "I'm trying to save up for a trip to Japan.",
      "This phone is expensive, but it's worth the money."
    ],
    use: [
      { t: "fill", q: "I never buy things immediately. I always ____ and check prices in three or four different shops.", o: ["shop around", "cut back on", "stick to", "save up for"], a: 0, w: "Shop around = tham khảo nhiều nơi trước khi mua." },
      { t: "fill", q: "This jacket was only 200,000 dong in the sale, so it was a real ____.", o: ["bargain", "budget", "brand", "receipt"], a: 0, w: "A bargain = món đồ mua được với giá hời." },
      { t: "fill", q: "My salary is small, so I have to ____ a budget and not spend more than I plan.", o: ["stick to", "shop around", "return", "compare"], a: 0, w: "Stick to a budget = tuân thủ ngân sách." },
      { t: "fill", q: "Many teenagers are very ____ and only want clothes from famous labels.", o: ["brand-conscious", "durable", "affordable", "overpriced"], a: 0, w: "Brand-conscious = quan tâm nhiều đến thương hiệu." },
      { t: "fix", q: "Câu có lỗi: “Reading customer review helps me make an informed decision.” Chọn cách sửa đúng.", o: ["customer reviews", "customers review", "customer's review", "customers' reviewed"], a: 0, w: "Cụm đúng: customer reviews (số nhiều) = đánh giá của khách hàng." },
      { t: "fix", q: "Câu có lỗi: “I'm saving up to a new laptop.” Chọn cách sửa đúng.", o: ["saving up for a new laptop", "saving up in a new laptop", "saving up of a new laptop", "saving up on a new laptop"], a: 0, w: "Cụm đúng: save up for something." },
      { t: "speak", q: "Do you like shopping?", h: ["shop around", "compare prices", "a bargain", "impulse buying"], s: "I like shopping, but I try to be careful. I usually **shop around** and **compare prices** before I buy something, so I sometimes find **a bargain**. I used to do a lot of **impulse buying**, but now I only buy what I really need." },
      { t: "speak", q: "How do you decide what to buy?", h: ["customer reviews", "make an informed decision", "high-quality", "be worth the money"], s: "I usually read **customer reviews** first, because they help me **make an informed decision**. I'd rather pay more for something **high-quality** if I know it will **be worth the money**." }
    ],
    reuse: [
      { q: "Do you try to save money?", h: ["stick to a budget", "cut back on spending", "save up for", "affordable"], s: "Yes, I do. I try to **stick to a budget** every month, and when I'm **saving up for** something important, I **cut back on spending** on things like snacks and clothes. I prefer **affordable** options because I don't want to waste money." },
      { q: "Describe something expensive you bought. You should say what it was, why you bought it, how you paid for it, and whether it was worth the money.", h: ["durable", "save up for", "be worth the money", "high-quality"], s: "I'd like to talk about my laptop. I had to **save up for** it for almost six months, because **high-quality** laptops are quite expensive. It's very **durable**, and I've used it for four years without any serious problem, so I think it was **worth the money**." },
      { q: "Why do some people spend more money than they can afford?", h: ["impulse buying", "brand-conscious", "overpriced", "cut back on spending"], s: "I think one reason is **impulse buying**. Online ads can make people buy things they don't need. Others are very **brand-conscious**, so they pay for **overpriced** products just to look fashionable. They should **cut back on spending** and focus on what is really important." }
    ],
    recall: [
      { k: "vi", q: "một món hàng mua được với giá hời", a: ["a bargain", "bargain"] },
      { k: "vi", q: "so sánh giá", a: ["compare prices"] },
      { k: "vi", q: "tuân thủ ngân sách", a: ["stick to a budget", "stick to your budget", "stick to my budget"] },
      { k: "sit", q: "Bạn xem và so sánh nhiều cửa hàng trước khi quyết định mua. Bạn dùng cụm động từ nào?", a: ["shop around"] },
      { k: "sit", q: "Một chiếc ví bền, dùng được nhiều năm mà không hỏng. Bạn dùng tính từ nào?", a: ["durable", "long-lasting", "long lasting"] },
      { k: "blank", q: "You can ____ within seven days if you keep the receipt. (trả lại một món hàng)", a: ["return an item", "return the item", "exchange an item", "return it"] },
      { k: "blank", q: "Since I lost my job, I've had to ____. (cắt giảm chi tiêu)", a: ["cut back on spending"] },
      { k: "speak", q: "Nói 1–2 câu về một món đồ bạn mới mua và vì sao nó đáng tiền. Thử dùng ít nhất hai cụm đã học.", a: ["be worth the money", "affordable", "high-quality", "a bargain"], s: "Recently I bought a pair of running shoes. They were **affordable** and **high-quality**, so I think they were **worth the money**." }
    ]
  });

  P.addPack("voc_14_relationships_friendship", {
    ex: [
      "I get along with most of my classmates.",
      "We have a lot in common, especially our love of music.",
      "We became friends because we share similar interests.",
      "It was hard to start talking to someone new at first.",
      "We keep in touch through video calls, but with some old friends I've lost touch.",
      "Friends can drift apart when they move to different cities.",
      "In a team, members need to rely on each other.",
      "A true friend will be there for you when you need help.",
      "It takes time to build trust in any relationship.",
      "A good friendship is based on mutual respect.",
      "We are a close-knit group of five friends.",
      "That trip helped us form a lasting friendship.",
      "It's normal to have conflicts with friends sometimes.",
      "It's best to make up with a friend quickly.",
      "I like to hang out with my cousins at weekends.",
      "Group projects help you get to know classmates better."
    ],
    use: [
      { t: "fill", q: "We became friends quickly because we ____ and both love hiking and photography.", o: ["share similar interests", "drift apart", "have conflicts", "make up"], a: 0, w: "Share similar interests = có chung sở thích." },
      { t: "fill", q: "After we moved to different cities, we slowly ____, and now we only talk once or twice a year.", o: ["drifted apart", "got closer", "made up", "hung out"], a: 0, w: "Drift apart = dần xa cách." },
      { t: "fill", q: "She was always ____ when I was in trouble, so I'll never forget her kindness.", o: ["there for me", "apart from me", "along with me", "up to me"], a: 0, w: "Be there for someone = ở bên, hỗ trợ ai khi cần." },
      { t: "fill", q: "We argued about money last week, but we ____ the next day and are still best friends.", o: ["made up", "broke up", "grew up", "gave up"], a: 0, w: "Make up (with someone) = làm hòa sau mâu thuẫn." },
      { t: "fix", q: "Câu có lỗi: “I get along well to most of my classmates.” Chọn cách sửa đúng.", o: ["along with", "along to", "along by", "along at"], a: 0, w: "Cụm đúng: get along with someone." },
      { t: "fix", q: "Câu có lỗi: “We have much things in common, such as music and movies.” Chọn cách sửa đúng.", o: ["have a lot in common", "have many in common", "have a lot common", "have lots of in common"], a: 0, w: "Cụm cố định: have a lot in common = có nhiều điểm chung." },
      { t: "speak", q: "How do you usually spend time with your friends?", h: ["hang out with", "have a lot in common", "share similar interests", "keep in touch"], s: "I usually **hang out with** my friends at a café on weekends. We **have a lot in common**, and we **share similar interests** like music and movies, so we never run out of things to talk about. If we're busy, we **keep in touch** by messaging." },
      { t: "speak", q: "Are you still friends with people from your school days?", h: ["lose touch", "drift apart", "a lasting friendship", "close-knit"], s: "A few of them, yes. Some friends and I **drifted apart** after we went to different universities, and we **lost touch**. But with two of them, I have **a lasting friendship**, and we still talk almost every week." }
    ],
    reuse: [
      { q: "Do you prefer a few close friends or a lot of friends?", h: ["a close-knit group", "rely on each other", "be there for", "build trust"], s: "I prefer a few close friends. I have **a close-knit group** of four friends, and we **rely on each other** when we need advice. It takes time to **build trust**, so I think it's better to have fewer friends who will always **be there for** you." },
      { q: "Describe a person who you get along with very well. You should say who the person is, how you met, what you do together, and why you get along well.", h: ["get along with", "get to know someone better", "mutual respect", "have a lot in common"], s: "I'd like to talk about my colleague, Lan. We met at work two years ago, and at first we only said hello. Then I started to **get to know her better** when we worked on a project together. We **get along** very well because we **have a lot in common**, and there is **mutual respect** between us." },
      { q: "Why is it sometimes difficult to keep friendships over many years?", h: ["drift apart", "lose touch", "have conflicts with someone", "make up with someone"], s: "I think life changes a lot as we grow up. Friends may live in different cities or have different priorities, so they **drift apart** and **lose touch**. Sometimes they **have conflicts with** each other too, and if nobody wants to **make up**, the friendship ends." }
    ],
    recall: [
      { k: "vi", q: "hòa hợp với ai", a: ["get along with", "get on with"] },
      { k: "vi", q: "có nhiều điểm chung", a: ["have a lot in common", "a lot in common"] },
      { k: "vi", q: "dần xa cách", a: ["drift apart", "drifted apart"] },
      { k: "sit", q: "Bạn muốn nói rằng bạn luôn ở bên bạn bè mỗi khi họ cần giúp đỡ. Bạn dùng cụm nào?", a: ["be there for someone", "be there for them", "be there for", "am always there for"] },
      { k: "sit", q: "Sau một cuộc cãi vã, bạn và bạn thân nói chuyện lại và làm hòa. Bạn dùng cụm động từ nào?", a: ["make up", "made up", "make up with someone"] },
      { k: "blank", q: "We became friends because we ____. (có chung sở thích)", a: ["share similar interests", "share the same interests", "share common interests"] },
      { k: "blank", q: "A good friendship is built on ____. (sự tôn trọng lẫn nhau)", a: ["mutual respect"] },
      { k: "speak", q: "Nói 1–2 câu về một người bạn thân của bạn. Thử dùng ít nhất hai cụm đã học.", a: ["get along with", "have a lot in common", "be there for someone", "a lasting friendship"], s: "I **get along with** my best friend very well. We **have a lot in common**, and she's always **there for me** when I need help, so I'm sure it will be **a lasting friendship**." }
    ]
  });
})();
