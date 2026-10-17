/* Practice packs 4/6 — Topic Vocabulary modules 21–26 (Use · Reuse · Retrieve). Format: see data/packs-1.js and P.addPack in js/practice.js. */
(function () {
  var P = window.LU.practice;

  P.addPack("voc_21_family_childhood", {
    ex: [
      "It isn't easy to bring up a child in a big city.",
      "My parents were strict about homework, but relaxed about my hobbies.",
      "We are a close-knit family, and we have dinner together every night.",
      "I get along well with my parents, and we talk about everything.",
      "I look up to my older sister because she works so hard.",
      "People say I take after my father because we both love cooking.",
      "On Sundays we spend quality time together without phones.",
      "My childhood memories are full of games with my cousins.",
      "It's lucky to grow up in a loving family.",
      "I have fond memories of summer holidays at my grandmother's house.",
      "Children are brought up to say thank you.",
      "Children learn right from wrong from their parents first.",
      "Living alone helped me become more independent.",
      "Parents should pass on family values such as honesty.",
      "It isn't always easy to be an only child.",
      "There is often a generation gap between grandparents and teenagers."
    ],
    use: [
      { t: "fill", q: "My parents are very ____: I have to finish my homework before I can go out, and I can't stay out late.", o: ["strict", "relaxed", "close-knit", "playful"], a: 0, w: "Strict parents = cha mẹ nghiêm khắc." },
      { t: "fill", q: "I really ____ my older sister because she is hardworking and always helps other people.", o: ["look up to", "take after", "grow up in", "bring up"], a: 0, w: "Look up to someone = ngưỡng mộ, coi ai là hình mẫu." },
      { t: "fill", q: "People say I ____ my mother, because we both have curly hair and a loud laugh.", o: ["take after", "look up to", "get along with", "bring up"], a: 0, w: "Take after a family member = giống một thành viên trong gia đình." },
      { t: "fill", q: "In my family, we always ____ at weekends: we turn off our phones and play board games.", o: ["spend quality time together", "learn right from wrong", "become more independent", "pass on family values"], a: 0, w: "Spend quality time together = dành thời gian chất lượng bên nhau." },
      { t: "fix", q: "Câu có lỗi: “I grew up at a small town near the sea.” Chọn cách sửa đúng.", o: ["grew up in", "grew up at", "grew up to", "grew up for"], a: 0, w: "Cụm đúng: grow up in + nơi chốn." },
      { t: "fix", q: "Câu có lỗi: “It is not easy to rise a child in a big city.” Chọn từ đúng thay cho từ in sai.", o: ["raise", "rise", "arise", "rose"], a: 0, w: "Raise a child = nuôi dạy một đứa trẻ (rise là động từ không có tân ngữ)." },
      { t: "speak", q: "Can you tell me about your family?", h: ["a close-knit family", "get along well with my parents", "spend quality time together", "be an only child"], s: "I come from **a close-knit family** of four. I **get along well with my parents**, and we **spend quality time together** every weekend, usually cooking or watching a film. I have a younger brother, so I'm not **an only child**, but sometimes I wish we had a bigger family." },
      { t: "speak", q: "Who do you take after in your family?", h: ["take after", "look up to", "childhood memories", "have fond memories of"], s: "People say I **take after** my father, because we are both calm and patient. I also **look up to** him, because he always works hard for the family. I **have fond memories of** cooking with him when I was little, and those **childhood memories** are very special to me." }
    ],
    reuse: [
      { q: "Did you have a happy childhood?", h: ["grow up in", "have fond memories of", "childhood memories", "spend quality time together"], s: "Yes, I think I did. I **grew up in** a small town, where I could play outside with my neighbors every afternoon. I **have fond memories of** those days, and my **childhood memories** always make me smile." },
      { q: "Describe a family member you admire. You should say who the person is, what he or she is like, what you do together, and why you admire this person.", h: ["look up to", "pass on family values", "become more independent", "spend quality time together"], s: "I'd like to talk about my grandmother. I really **look up to** her, because she raised three children on her own. She tried to **pass on family values** like honesty and kindness, and she taught me a lot about how to **become more independent**. We **spend quality time together** whenever I visit her, usually cooking dinner." },
      { q: "Do you think there is a generation gap in your country? What causes it?", h: ["a generation gap", "be brought up to", "strict", "relaxed parents"], s: "Yes, I think there is **a generation gap** in many families. Older people were **brought up to** obey their parents, whereas young people want to make their own decisions. Parents who are **strict** about everything can cause arguments, while **relaxed parents** are often easier to talk to." }
    ],
    recall: [
      { k: "vi", q: "nuôi dạy một đứa trẻ", a: ["bring up a child", "raise a child", "bring up children", "raise children"] },
      { k: "vi", q: "ngưỡng mộ, coi ai là hình mẫu", a: ["look up to someone", "look up to"] },
      { k: "vi", q: "giống một thành viên trong gia đình", a: ["take after a family member", "take after"] },
      { k: "sit", q: "Cả nhà bạn rất gắn bó, thường xuyên cùng nhau làm mọi việc. Bạn mô tả gia đình mình bằng cụm nào?", a: ["a close-knit family", "close-knit family"] },
      { k: "sit", q: "Cha mẹ truyền lại cho con những giá trị như trung thực và tôn trọng người khác. Bạn dùng cụm động từ nào?", a: ["pass on family values", "pass on values", "pass on their values"] },
      { k: "blank", q: "Parents help children ____. (học cách phân biệt đúng và sai)", a: ["learn right from wrong"] },
      { k: "blank", q: "There is often ____ between grandparents and teenagers. (khoảng cách thế hệ)", a: ["a generation gap", "generation gap"] },
      { k: "speak", q: "Nói 1–2 câu về gia đình bạn. Thử dùng ít nhất hai cụm đã học.", a: ["a close-knit family", "get along well with", "spend quality time together", "childhood memories"], s: "I come from **a close-knit family**. We **spend quality time together** at weekends, and many of my **childhood memories** are about our family trips." }
    ]
  });

  P.addPack("voc_22_daily_routines_time", {
    ex: [
      "It's easier to stick to a routine when you go to bed at the same time every night.",
      "I have a hectic schedule on Mondays, with classes all day.",
      "I usually stay up late on weekends.",
      "I'm a night owl; I do my best work after ten.",
      "On Saturday mornings I run errands and buy groceries.",
      "After work I need to have some downtime before I do anything else.",
      "No matter how busy I am, I make time for exercise.",
      "I sometimes spend hours reading when I'm on holiday.",
      "I have a lot on my plate this week, with two exams and a project.",
      "I make a list so that I can get things done.",
      "I take a short break every hour to rest my eyes.",
      "A planner helps me manage my daily schedule.",
      "Sunday is usually a lazy day for me.",
      "I try to make the most of my time by studying on the bus."
    ],
    use: [
      { t: "fill", q: "I'm ____: I wake up at five and feel most energetic in the morning.", o: ["an early bird", "a night owl", "a lazy day", "a hectic schedule"], a: 0, w: "An early bird = người dậy sớm." },
      { t: "fill", q: "This week I've got two exams and a project, so I really ____.", o: ["have a lot on my plate", "run errands", "have some downtime", "take a short break"], a: 0, w: "Have a lot on my plate = có nhiều việc phải xử lý." },
      { t: "fill", q: "After a stressful week, I need to ____ at the weekend, so I don't plan anything.", o: ["have some downtime", "run errands", "stay up late", "get things done"], a: 0, w: "Have some downtime = có thời gian nghỉ ngơi, thư giãn." },
      { t: "fill", q: "I write a to-do list every morning to make sure I ____ before the end of the day.", o: ["get things done", "have some downtime", "stay up late", "take a short break"], a: 0, w: "Get things done = hoàn thành công việc cần làm." },
      { t: "fix", q: "Câu có lỗi: “I try to follow to a routine so I don't waste time.” Chọn cách sửa đúng.", o: ["follow a routine", "follow at a routine", "follow for routine", "follow of a routine"], a: 0, w: "Follow là ngoại động từ: follow a routine (không cần giới từ)." },
      { t: "fix", q: "Câu có lỗi: “I spend many hours to study every night before exams.” Chọn cách sửa đúng.", o: ["spend hours studying", "spend hours to study", "spend hours of studying", "spend hours for study"], a: 0, w: "Cấu trúc đúng: spend hours + V-ing." },
      { t: "speak", q: "What does a typical day look like for you?", h: ["stick to a routine", "get up early", "run errands", "take a short break"], s: "I try to **stick to a routine**. I usually **get up early** to exercise, then go to work. In the afternoon I **take a short break** to have coffee, and after work I sometimes **run errands**, like buying groceries." },
      { t: "speak", q: "Are you a morning person or a night person?", h: ["an early bird", "a night owl", "stay up late", "get things done"], s: "I'd say I'm **a night owl**. I often **stay up late**, and I feel more creative in the evening, so I can **get things done** more easily after dinner. I'm trying to become **an early bird**, but it isn't easy." }
    ],
    reuse: [
      { q: "Do you find it easy to manage your time?", h: ["manage my daily schedule", "make time for", "have a lot on my plate", "a hectic schedule"], s: "Not always. When I **have a lot on my plate**, it's hard to **manage my daily schedule**, especially if I have **a hectic schedule** at work. I try to **make time for** the things that matter, such as exercise and family dinners." },
      { q: "Describe a day when you were very productive. You should say when it was, what you did, how you organized your time, and how you felt at the end of the day.", h: ["a productive day", "make the most of my time", "get things done", "have some downtime"], s: "Last Saturday was **a productive day** for me. I wanted to **make the most of my time**, so I made a list in the morning and **got things done** one by one. I cleaned my room, finished my report and even went to the gym. In the evening I could **have some downtime**, and I felt really proud." },
      { q: "Why do some people find it hard to balance work and free time?", h: ["a hectic schedule", "spend hours doing something", "run errands", "take a short break"], s: "I think many people have **a hectic schedule**, so they can't find time to relax. They **spend hours** working and then have to **run errands** or cook at home. Without a chance to **take a short break**, they feel exhausted." }
    ],
    recall: [
      { k: "vi", q: "có thời gian nghỉ ngơi, thư giãn", a: ["have some downtime", "downtime"] },
      { k: "vi", q: "làm những việc vặt cần giải quyết", a: ["run errands"] },
      { k: "vi", q: "tận dụng thời gian tối đa", a: ["make the most of my time", "make the most of your time", "make the most of time"] },
      { k: "sit", q: "Bạn thường thức khuya và làm việc hiệu quả nhất vào buổi tối. Người như vậy được gọi là gì?", a: ["a night owl", "night owl"] },
      { k: "sit", q: "Tuần này bạn có rất nhiều việc phải làm cùng lúc. Bạn nói gì?", a: ["have a lot on my plate", "i have a lot on my plate", "have a lot on your plate"] },
      { k: "blank", q: "I make a list every morning so that I can ____. (hoàn thành công việc cần làm)", a: ["get things done"] },
      { k: "blank", q: "A good planner helps me ____. (sắp xếp lịch trình hằng ngày)", a: ["manage my daily schedule"] },
      { k: "speak", q: "Nói 1–2 câu về một ngày bận rộn của bạn. Thử dùng ít nhất hai cụm đã học.", a: ["a hectic schedule", "have a lot on my plate", "get things done", "take a short break"], s: "On weekdays I have **a hectic schedule**. I often **have a lot on my plate**, but I **take a short break** at lunchtime, and I try to **get things done** one by one." }
    ]
  });

  P.addPack("voc_23_weather_seasons", {
    ex: [
      "In July it's scorching hot, and everyone stays inside after noon.",
      "The weather in spring is mild, which is perfect for walking.",
      "Hanoi has a humid climate in summer.",
      "There was a heatwave last week, and the temperature reached forty degrees.",
      "Heavy rainfall caused flooding in the city.",
      "We stayed indoors during a thunderstorm.",
      "A sudden downpour soaked us on the way home.",
      "The dry season is the best time to visit the south.",
      "In the evening, a pleasant breeze comes from the river.",
      "The sky was gloomy and cloudy all week.",
      "Rainy mornings can put me in a bad mood.",
      "Hot weather makes me feel sluggish.",
      "A sunny morning can lift your mood.",
      "After a cool shower I feel refreshed.",
      "I sweat heavily when I walk in the sun.",
      "The humid weather makes my skin oily."
    ],
    use: [
      { t: "fill", q: "It was so ____ yesterday that we stayed in the shade and drank lots of water.", o: ["scorching hot", "freezing cold", "mild", "gloomy"], a: 0, w: "Scorching hot = nóng như thiêu, cần uống nhiều nước." },
      { t: "fill", q: "We were walking home when a sudden ____ soaked us in a few minutes.", o: ["downpour", "heatwave", "breeze", "climate"], a: 0, w: "A sudden downpour = trận mưa rào bất chợt." },
      { t: "fill", q: "In the evening, a ____ from the river made the heat easier to bear.", o: ["pleasant breeze", "heavy rainfall", "thunderstorm", "heatwave"], a: 0, w: "A pleasant breeze = làn gió nhẹ dễ chịu." },
      { t: "fill", q: "Gray skies and cold rain can ____ my mood, and I feel unmotivated all day.", o: ["dampen", "lift", "boost", "raise"], a: 0, w: "Dampen someone's mood = làm tụt tâm trạng; lift = cải thiện." },
      { t: "fix", q: "Câu có lỗi: “There was a heavily rainfall in the city last night.” Chọn cách sửa đúng.", o: ["heavy rainfall", "heavily rainfall", "a heavy rainfalls", "heavy rainfalling"], a: 0, w: "Cần tính từ heavy, rainfall thường không đếm được: heavy rainfall." },
      { t: "fix", q: "Câu có lỗi: “The humid weather makes my skin to oily.” Chọn cách sửa đúng.", o: ["makes my skin oily", "makes my skin to oily", "makes oily my skin", "makes my skin oil"], a: 0, w: "Cấu trúc: make + tân ngữ + tính từ (không có “to”)." },
      { t: "speak", q: "What's the weather like in your hometown?", h: ["humid climate", "the rainy season", "a heatwave", "scorching hot"], s: "My hometown has a **humid** climate. During **the rainy season**, there's **heavy rainfall** almost every afternoon, and in summer there can be **a heatwave**, when it's **scorching hot**." },
      { t: "speak", q: "Does the weather affect your mood?", h: ["put someone in a good mood", "feel sluggish", "lift your mood", "gloomy and cloudy"], s: "Yes, definitely. Sunny weather usually puts me **in a good mood**, and a pleasant day can really **lift my mood**. But when it's **gloomy and cloudy** for several days, I **feel sluggish** and don't want to do anything." }
    ],
    reuse: [
      { q: "Which season do you like best? Why?", h: ["mild", "a pleasant breeze", "feel refreshed", "make someone feel energetic"], s: "I like spring best because the weather is **mild**, neither too hot nor too cold. In the mornings there's often **a pleasant breeze**, and I **feel refreshed** after a walk. The weather also **makes me feel energetic**, so I can do more things during the day." },
      { q: "Describe a time when the weather caused a problem for you. You should say when it happened, what the weather was like, what problem it caused, and how you dealt with it.", h: ["a sudden downpour", "a thunderstorm", "heavy rainfall", "dampen someone's mood"], s: "Last month I was cycling home from work when **a sudden downpour** started. There was also **a thunderstorm**, so the lightning made me nervous. The **heavy rainfall** flooded the road, and I had to wait under a bridge for an hour. It really **dampened my mood**, but I felt better after a hot shower." },
      { q: "How might climate change affect the weather in your country in the future?", h: ["extreme weather", "a heatwave", "a dry season", "heavy rainfall"], s: "I think we'll see more **extreme weather** in the future. There may be longer **heatwaves** and a longer **dry season** in some areas, while other places could face **heavy rainfall** and floods. This could affect farming and daily life." }
    ],
    recall: [
      { k: "vi", q: "đợt nắng nóng kéo dài", a: ["a heatwave", "heatwave", "a heat wave"] },
      { k: "vi", q: "trận mưa rào bất chợt", a: ["a sudden downpour", "sudden downpour"] },
      { k: "vi", q: "làn gió nhẹ dễ chịu", a: ["a pleasant breeze", "pleasant breeze"] },
      { k: "sit", q: "Trời nóng không chịu nổi, bạn cảm giác như bị thiêu đốt. Bạn dùng cụm tính từ nào?", a: ["scorching hot", "scorching"] },
      { k: "sit", q: "Cả tuần bầu trời xám xịt, nhiều mây, thiếu ánh nắng. Bạn mô tả thời tiết đó thế nào?", a: ["gloomy and cloudy", "gloomy", "cloudy and gloomy"] },
      { k: "blank", q: "Hot weather makes me ____ and I can't concentrate. (cảm thấy uể oải)", a: ["feel sluggish", "sluggish"] },
      { k: "blank", q: "A sunny morning can ____ your mood. (cải thiện)", a: ["lift"] },
      { k: "speak", q: "Nói 1–2 câu về mùa bạn thích và thời tiết ảnh hưởng đến tâm trạng bạn thế nào. Thử dùng ít nhất hai cụm đã học.", a: ["mild", "lift my mood", "a pleasant breeze", "feel refreshed"], s: "I like autumn because the weather is **mild** and there's often **a pleasant breeze**. A walk outside helps me **feel refreshed** and **lifts my mood**." }
    ]
  });

  P.addPack("voc_24_transport_getting_around", {
    ex: [
      "I commute to work by bus, which takes about forty minutes.",
      "In my city, most people get around by motorbike.",
      "It's frustrating to get stuck in traffic when you're late.",
      "A traffic jam on the bridge made me late.",
      "Rush-hour traffic is terrible between five and seven.",
      "Public transport is cheaper than private vehicles for most people.",
      "The bicycle is a cheap means of transport.",
      "In the old town, it's easiest to get around on foot.",
      "My scooter is fuel-efficient, so I don't spend much on petrol.",
      "Electric buses are environmentally friendly.",
      "Affordable fares make the bus popular with students.",
      "Motorbikes are flexible because you can go anywhere at any time."
    ],
    use: [
      { t: "fill", q: "I ____ by bus every day; it takes about forty minutes each way.", o: ["commute to work", "get stuck in", "run errands", "settle into"], a: 0, w: "Commute to work = đi làm hằng ngày." },
      { t: "fill", q: "We left home at six, but we ____ for an hour near the bridge.", o: ["got stuck in traffic", "got around on foot", "commuted to school", "were fuel-efficient"], a: 0, w: "Get stuck in traffic = bị mắc kẹt trong dòng xe cộ." },
      { t: "fill", q: "The old town is small, so it's easy to ____ without taking a bus or taxi.", o: ["get around on foot", "get stuck in traffic", "commute to work", "get around by bus"], a: 0, w: "Get around on foot = di chuyển bằng cách đi bộ." },
      { t: "fill", q: "The new tram is popular with students because of its ____, which are much cheaper than taxis.", o: ["affordable fares", "rush-hour traffic", "traffic congestion", "private vehicles"], a: 0, w: "Affordable fares = giá vé phải chăng." },
      { t: "fix", q: "Câu có lỗi: “Many people prefer motorbikes because they are very flexibility.” Chọn dạng từ đúng.", o: ["flexible", "flexibly", "flexibility", "flexibles"], a: 0, w: "Sau “are very” cần tính từ: flexible." },
      { t: "fix", q: "Câu có lỗi: “I get stuck on traffic every morning on my way to work.” Chọn cách sửa đúng.", o: ["in traffic", "on traffic", "at traffic", "by traffic"], a: 0, w: "Cụm đúng: get stuck in traffic." },
      { t: "speak", q: "How do you usually get to work or school?", h: ["commute to work", "flexible", "rush-hour traffic", "get stuck in traffic"], s: "I usually **commute to work** by motorbike, because it's **flexible** and I can choose my own route. The problem is **rush-hour traffic**, because I sometimes **get stuck in traffic** for more than half an hour, so I try to leave early." },
      { t: "speak", q: "What kinds of transport are popular in your city?", h: ["means of transport", "public transport", "private vehicles", "affordable fares"], s: "Motorbikes are the most popular **means of transport** in my city. Many people prefer **private vehicles**, because **public transport** is still limited. The new bus lines have **affordable fares**, so I hope more people will use them in the future." }
    ],
    reuse: [
      { q: "Would you prefer to travel by public transport or by car?", h: ["environmentally friendly", "affordable fares", "get stuck in traffic", "fuel-efficient"], s: "I'd prefer public transport. It has **affordable fares**, it's **environmentally friendly**, and I don't have to worry about parking. With a car, you often **get stuck in traffic**, and even a **fuel-efficient** car is more expensive in the long run." },
      { q: "Describe a journey you often make. You should say where you go, how you get there, how long it takes, and how you feel about the journey.", h: ["commute to school", "rush-hour traffic", "means of transport", "get around on foot"], s: "I'd like to talk about my daily journey to university. I **commute to school** by bus, and the trip takes about forty minutes. **Rush-hour traffic** can be bad, but the bus is a **means of transport** I can rely on. Near the campus, I usually **get around on foot**, which helps me wake up." },
      { q: "How can cities reduce traffic problems?", h: ["traffic congestion", "public transport", "private vehicles", "environmentally friendly"], s: "I think cities need to reduce **traffic congestion** by improving **public transport**. If buses and metros are fast and **environmentally friendly**, fewer people will use **private vehicles**. Cities could also build more cycle lanes, so people can get around without cars." }
    ],
    recall: [
      { k: "vi", q: "đi làm / đi học hằng ngày", a: ["commute to work", "commute to school", "commute"] },
      { k: "vi", q: "bị mắc kẹt trong dòng xe cộ", a: ["get stuck in traffic", "got stuck in traffic"] },
      { k: "vi", q: "phương tiện giao thông", a: ["means of transport", "means of transportation"] },
      { k: "sit", q: "Một chiếc xe máy ít tốn xăng. Bạn dùng tính từ nào?", a: ["fuel-efficient", "fuel efficient"] },
      { k: "sit", q: "Vé xe buýt rẻ, học sinh nào cũng mua được. Bạn nói về giá vé như thế nào?", a: ["affordable fares", "affordable"] },
      { k: "blank", q: "In the old town, it's easier to ____ than to use a car. (di chuyển bằng cách đi bộ)", a: ["get around on foot"] },
      { k: "blank", q: "Motorbikes are popular because they are very ____: you can go anywhere at any time. (linh hoạt)", a: ["flexible"] },
      { k: "speak", q: "Nói 1–2 câu về cách bạn di chuyển hằng ngày. Thử dùng ít nhất hai cụm đã học.", a: ["commute to work", "get around by bus", "rush-hour traffic", "public transport"], s: "I **commute to work** by bus. It's cheaper than driving, but the **rush-hour traffic** is heavy, so I sometimes **get stuck in traffic**." }
    ]
  });

  P.addPack("voc_25_clothes_fashion", {
    ex: [
      "I wear casual clothes at weekends, but formal wear at the office.",
      "We dress up for weddings, but we dress down on Fridays.",
      "She reads magazines to keep up with fashion trends.",
      "Those jeans are out of fashion now.",
      "Bright colors really suit you.",
      "The jacket fits well, so I bought it.",
      "Cotton shirts are comfortable to wear in hot weather.",
      "These shoes go well with something simple, like a plain dress.",
      "It's important to dress for the occasion.",
      "I like to mix and match different pieces to create new outfits.",
      "My sister is a fashion-conscious person and spends hours choosing outfits.",
      "A white shirt is practical and versatile.",
      "I prefer a simple look: jeans and a plain T-shirt.",
      "Buying second-hand clothes is cheaper and better for the environment."
    ],
    use: [
      { t: "fill", q: "These jeans are so ____ that I can wear them all day without feeling uncomfortable.", o: ["comfortable to wear", "out of fashion", "too tight", "a fashion-conscious person"], a: 0, w: "Comfortable to wear = thoải mái khi mặc." },
      { t: "fill", q: "For a job interview, you should ____ and wear a smart suit.", o: ["dress up", "dress down", "mix and match", "go well with"], a: 0, w: "Dress up = ăn mặc cầu kỳ, trang trọng hơn." },
      { t: "fill", q: "That jacket doesn't ____ the trousers; the colors look strange together.", o: ["go well with", "fit well on", "dress for", "suit with"], a: 0, w: "Go well with something = hợp với món đồ khác." },
      { t: "fill", q: "I buy a lot of ____ because it's cheaper and better for the environment.", o: ["second-hand clothes", "formal wear", "fashion trends", "a simple look"], a: 0, w: "Second-hand clothes = quần áo đã qua sử dụng." },
      { t: "fix", q: "Câu có lỗi: “My brother is not interested in fashion; he never keeps up fashion trends.” Chọn cách sửa đúng.", o: ["keeps up with", "keeps up for", "keeps on with", "keeps up at"], a: 0, w: "Cụm đúng: keep up with fashion trends." },
      { t: "fix", q: "Câu có lỗi: “That color really suits for you.” Chọn cách sửa đúng.", o: ["suits you", "suits for you", "suits at you", "suits with you"], a: 0, w: "Suit là ngoại động từ: suit someone (không cần giới từ)." },
      { t: "speak", q: "What kind of clothes do you usually wear?", h: ["casual", "comfortable to wear", "practical and versatile", "a simple look"], s: "I usually wear **casual** clothes, like jeans and T-shirts. I like clothes that are **comfortable to wear** and **practical and versatile**, so I can use them for work and for going out. I prefer **a simple look** because I don't want to spend a lot of time choosing." },
      { t: "speak", q: "Do you follow fashion trends?", h: ["keep up with fashion trends", "trendy", "out of fashion", "fashion-conscious"], s: "Not really. I don't try to **keep up with fashion trends**, because things that are **trendy** now can be **out of fashion** in a few months. I'm not very **fashion-conscious**, and I'd rather wear clothes that I feel good in." }
    ],
    reuse: [
      { q: "Do you think what people wear is important?", h: ["dress for the occasion", "dress up", "formal wear", "dress down"], s: "Yes, I think it's important to **dress for the occasion**. For example, you should **dress up** for a job interview and wear **formal wear**, but it's fine to **dress down** when you meet friends. The right clothes also help people feel confident." },
      { q: "Describe an item of clothing that you like wearing. You should say what it is, when you wear it, what it looks like, and why you like it.", h: ["go well with", "fit well", "comfortable to wear", "mix and match"], s: "I'd like to talk about my denim jacket. It **fits well**, and it's very **comfortable to wear**, even in cool weather. It **goes well with** almost everything, so I can **mix and match** it with dresses, shirts or T-shirts. That's why I wear it so often." },
      { q: "Why do some people spend a lot of money on fashion? Is it a good idea?", h: ["a fashion-conscious person", "trendy", "second-hand clothes", "keep up with fashion trends"], s: "Some people, especially **fashion-conscious** ones, want to **keep up with fashion trends** and look **trendy**. They may feel more confident with new clothes. But I don't think it's a good idea to spend too much; buying **second-hand clothes** can save money and reduce waste." }
    ],
    recall: [
      { k: "vi", q: "ăn mặc cầu kỳ, trang trọng hơn", a: ["dress up"] },
      { k: "vi", q: "phối hợp các món đồ để tạo thành trang phục", a: ["mix and match"] },
      { k: "vi", q: "quần áo đã qua sử dụng", a: ["second-hand clothes", "second hand clothes", "secondhand clothes"] },
      { k: "sit", q: "Bạn chọn đồ phù hợp với hoàn cảnh, ví dụ đi đám cưới thì mặc trang trọng. Bạn dùng cụm động từ nào?", a: ["dress for the occasion"] },
      { k: "sit", q: "Một chiếc áo trắng mặc được trong nhiều dịp và dễ phối với mọi thứ. Bạn mô tả nó bằng cụm tính từ nào?", a: ["practical and versatile", "versatile"] },
      { k: "blank", q: "This shirt is a bit small; it is ____ around the shoulders. (quá chật)", a: ["too tight", "a bit too tight"] },
      { k: "blank", q: "Dark blue really ____ you. (hợp với bạn)", a: ["suits", "suits you"] },
      { k: "speak", q: "Nói 1–2 câu về phong cách ăn mặc của bạn. Thử dùng ít nhất hai cụm đã học.", a: ["casual", "comfortable to wear", "a simple look", "keep up with fashion trends"], s: "My style is **casual**, and I prefer **a simple look**. I choose clothes that are **comfortable to wear**, and I don't try to **keep up with fashion trends**." }
    ]
  });

  P.addPack("voc_26_animals_pets", {
    ex: [
      "We decided to adopt a pet from the animal shelter.",
      "A dog can be a loyal companion for many years.",
      "Our puppy is playful and never stops running around.",
      "Dogs are domesticated animals, while tigers are wild animals.",
      "The tiger is an endangered species.",
      "Many animals are losing their natural habitat because of deforestation.",
      "Wildlife conservation needs support from both governments and individuals.",
      "Animal cruelty should be punished by law.",
      "It takes time and money to look after a pet properly.",
      "I don't mind getting up early to walk a dog before school.",
      "Cats shed fur all over the sofa.",
      "Some children may be allergic to animals.",
      "We should protect animals from extinction by stopping illegal hunting.",
      "Protecting forests helps protect biodiversity.",
      "Pollution can disrupt food chains in rivers."
    ],
    use: [
      { t: "fill", q: "Our new puppy is very ____ and loves running after balls and chasing butterflies.", o: ["playful", "well-behaved", "domesticated", "endangered"], a: 0, w: "Playful = nghịch ngợm, thích chơi đùa." },
      { t: "fill", q: "Tigers and elephants are ____ animals, so they should live in forests, not in people's homes.", o: ["wild", "domesticated", "playful", "loyal"], a: 0, w: "Wild animals = động vật hoang dã; domesticated = đã được thuần hóa." },
      { t: "fill", q: "Illegal hunting has put many animals in danger; the tiger is now an ____.", o: ["endangered species", "affectionate companion", "natural habitat", "animal cruelty"], a: 0, w: "Endangered species = loài có nguy cơ tuyệt chủng." },
      { t: "fill", q: "When forests are cut down, animals lose their ____ and may have nowhere to live.", o: ["natural habitat", "food chain", "family pet", "allergy"], a: 0, w: "Natural habitat = môi trường sống tự nhiên." },
      { t: "fix", q: "Câu có lỗi: “Many children are allergic with animals, so their parents don't keep pets.” Chọn cách sửa đúng.", o: ["allergic to", "allergic with", "allergic at", "allergic for"], a: 0, w: "Cụm đúng: be allergic to animals." },
      { t: "fix", q: "Câu có lỗi: “Animals cruelty should be punished by law.” Chọn cách sửa đúng.", o: ["Animal cruelty", "Animals cruelty", "Animal cruel", "Animal's cruelty"], a: 0, w: "Danh từ ghép: animal cruelty (animal ở số ít)." },
      { t: "speak", q: "Do you like animals? Do you have a pet?", h: ["adopt a pet", "a loyal companion", "playful", "look after a pet"], s: "Yes, I love animals. A few years ago my family decided to **adopt a pet**, and we chose a small dog. He's very **playful** and also **a loyal companion**, because he waits for me at the door every evening. I **look after** him with my brother, so it's a shared responsibility." },
      { t: "speak", q: "Are there many wild animals in your country?", h: ["wild animals", "natural habitat", "endangered species", "wildlife conservation"], s: "There used to be many **wild animals**, but some are disappearing. They are losing their **natural habitat** because forests are being cut down. Some of them are now **endangered species**, so **wildlife conservation** is becoming more important." }
    ],
    reuse: [
      { q: "Would you like to keep a pet in the future?", h: ["raise a pet", "be allergic to animals", "shed fur", "well-behaved"], s: "I'd like to **raise a pet** one day, maybe a cat. The only problem is that my sister seems to **be allergic to animals**, and cats **shed fur** all over the furniture. If the cat were **well-behaved** and quiet, though, I think we could manage." },
      { q: "Describe an animal you find interesting. You should say what it is, where it lives, what it looks like, and why you find it interesting.", h: ["wild animals", "endangered species", "natural habitat", "protect animals from extinction"], s: "I find the orangutan very interesting. It's one of the **wild animals** that live in the rainforests of Southeast Asia, and it's an **endangered species**. It's losing its **natural habitat**, because people cut down forests for farms. I think we should **protect animals from extinction**, because they're an important part of the ecosystem." },
      { q: "Why is it important to protect biodiversity?", h: ["protect biodiversity", "disrupt food chains", "wildlife conservation", "animal cruelty"], s: "I think it's important because every species has a role in nature. If one species disappears, it can **disrupt food chains**, and the whole system may suffer. To **protect biodiversity**, governments should support **wildlife conservation** and punish **animal cruelty** more strictly." }
    ],
    recall: [
      { k: "vi", q: "nuôi / nhận nuôi thú cưng", a: ["adopt a pet", "raise a pet"] },
      { k: "vi", q: "môi trường sống tự nhiên", a: ["natural habitat", "habitat"] },
      { k: "vi", q: "các loài có nguy cơ tuyệt chủng", a: ["endangered species"] },
      { k: "sit", q: "Một con chó rất trung thành và luôn ở bên bạn. Bạn gọi nó là gì?", a: ["a loyal companion", "loyal companion"] },
      { k: "sit", q: "Một người đối xử tàn nhẫn với động vật. Bạn gọi hành vi này là gì?", a: ["animal cruelty"] },
      { k: "blank", q: "Cats ____ all over the sofa, so I have to clean it every day. (rụng lông)", a: ["shed fur"] },
      { k: "blank", q: "Pollution can ____ in rivers and kill many fish. (phá vỡ chuỗi thức ăn)", a: ["disrupt food chains", "disrupt the food chain", "disrupt food chain"] },
      { k: "speak", q: "Nói 1–2 câu về một con vật bạn thích và vì sao nó cần được chăm sóc hoặc bảo vệ. Thử dùng ít nhất hai cụm đã học.", a: ["affectionate companion", "endangered species", "natural habitat", "look after a pet"], s: "I love cats because they are **affectionate companions**. Some wild cats are **endangered species** that are losing their **natural habitat**, so we should protect them." }
    ]
  });
})();
