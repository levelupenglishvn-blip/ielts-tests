/* Practice packs 3/6 — Topic Vocabulary modules 15–20 (Use · Reuse · Retrieve). Format: see data/packs-1.js and P.addPack in js/practice.js.
   Module 19 is "Describing News & Media" (replaces the earlier Communication & Language draft). */
(function () {
  var P = window.LU.practice;

  P.addPack("voc_15_hobbies_leisure", {
    ex: [
      "It's never too late to take up a hobby.",
      "My brother is passionate about football and plays every weekend.",
      "Reading before bed is a great way to unwind.",
      "Cooking helps me relieve stress after a hard week.",
      "A weekend at the beach is enough to recharge my batteries.",
      "Finishing a painting gives me a sense of fulfillment.",
      "I joined a chess club to challenge myself.",
      "I watch videos to improve my skills in photography.",
      "I like to do something for fun after a long day.",
      "On rainy days we choose indoor activities like board games.",
      "Football is a team sport, while swimming is an individual sport.",
      "Online classes make it easy to pick up a new skill.",
      "It's hard to stick with something if you don't see progress."
    ],
    use: [
      { t: "fill", q: "Reading before bed is ____ after a stressful day; it makes me feel calm.", o: ["a great way to unwind", "a team sport", "an individual sport", "a sense of fulfillment"], a: 0, w: "A great way to unwind = cách tuyệt vời để thư giãn." },
      { t: "fill", q: "After a very busy month, a weekend at the beach is enough to ____.", o: ["recharge my batteries", "challenge myself", "take up a hobby", "stick with something"], a: 0, w: "Recharge my batteries = nạp lại năng lượng." },
      { t: "fill", q: "My sister is ____ photography and spends most weekends taking pictures.", o: ["passionate about", "tired of", "relieved by", "afraid for"], a: 0, w: "Be passionate about = đam mê điều gì." },
      { t: "fill", q: "Football is ____, because you need to cooperate with the other players.", o: ["a team sport", "an individual sport", "a hobby alone", "a quiet skill"], a: 0, w: "A team sport = môn thể thao đồng đội." },
      { t: "fix", q: "Câu có lỗi: “I want to take on a new hobby this year, maybe painting.” Chọn cách sửa đúng.", o: ["take up", "take in", "take over", "take off"], a: 0, w: "Take up a hobby = bắt đầu một sở thích mới." },
      { t: "fix", q: "Câu có lỗi: “It's hard to stick on something when you don't see quick results.” Chọn cách sửa đúng.", o: ["stick with", "stick on", "stick for", "stick in"], a: 0, w: "Cụm đúng: stick with something." },
      { t: "speak", q: "What do you like to do in your free time?", h: ["do something for fun", "take up a hobby", "be really into", "a great way to unwind"], s: "I decided to **take up a hobby** last year, and cooking was the one I chose. I'm **really into** trying new recipes, and it's **a great way to unwind** after work. I just **do it for fun**, so there's no pressure." },
      { t: "speak", q: "Do you prefer indoor or outdoor activities?", h: ["indoor activities", "outdoor activities", "recharge my batteries", "relieve stress"], s: "I prefer **outdoor activities** like cycling or walking in the park. Being in the fresh air helps me **relieve stress** and **recharge my batteries**. On rainy days, though, I enjoy **indoor activities** such as reading." }
    ],
    reuse: [
      { q: "Would you like to try a new hobby in the future?", h: ["pick up a new skill", "challenge myself", "take up a hobby", "improve my skills"], s: "Yes, I'd love to **pick up a new skill** soon, maybe playing the piano. I want to **challenge myself** because I've never learned an instrument before. I think I would **improve my skills** step by step if I practice every day." },
      { q: "Describe a hobby or activity you enjoy doing in your free time. You should say what it is, how often you do it, who you do it with, and why you enjoy it.", h: ["be passionate about", "a sense of fulfillment", "stick with", "recharge my batteries"], s: "I'd like to talk about playing badminton. I'm **passionate about** it, and I play with my colleagues twice a week. When we win a hard match, I feel **a sense of fulfillment**. Sometimes I want to quit when I'm tired, but I **stick with** it because it helps me **recharge my batteries** after a stressful week." },
      { q: "Why is it important for people to have hobbies?", h: ["do something for fun", "relieve stress", "a team sport", "a sense of fulfillment"], s: "I think hobbies give people a chance to **do something for fun** outside work or school. They can **relieve stress** and give a **sense of fulfillment**, especially when people get better over time. Some hobbies, like **a team sport**, also help people make new friends." }
    ],
    recall: [
      { k: "vi", q: "bắt đầu một sở thích mới", a: ["take up a hobby", "take up a new hobby"] },
      { k: "vi", q: "nạp lại năng lượng", a: ["recharge my batteries", "recharge your batteries", "recharge one's batteries"] },
      { k: "vi", q: "thử thách bản thân", a: ["challenge myself", "challenge yourself"] },
      { k: "sit", q: "Bạn nói về một việc giúp bạn thư giãn sau khi làm việc căng thẳng. Bạn dùng cụm danh từ nào?", a: ["a great way to unwind", "great way to unwind"] },
      { k: "sit", q: "Bóng đá cần nhiều người phối hợp; còn bơi lội thì thi đấu một mình. Bóng đá thuộc loại thể thao nào?", a: ["a team sport", "team sport"] },
      { k: "blank", q: "It's hard to ____ a new hobby if you don't see quick results. (kiên trì theo đuổi)", a: ["stick with"] },
      { k: "blank", q: "I just play the guitar ____; I'm not trying to become a musician. (để giải trí)", a: ["for fun", "just for fun"] },
      { k: "speak", q: "Nói 1–2 câu về một sở thích của bạn và cảm giác nó mang lại. Thử dùng ít nhất hai cụm đã học.", a: ["be passionate about", "a sense of fulfillment", "relieve stress", "recharge my batteries"], s: "I'm **passionate about** painting. It helps me **relieve stress**, and I feel **a sense of fulfillment** when I finish a picture." }
    ]
  });

  P.addPack("voc_16_books_films_entertainment", {
    ex: [
      "The novel was so gripping that I finished it in one night.",
      "The comedy was hilarious, and the whole cinema was laughing.",
      "It was a thought-provoking film about family and loneliness.",
      "The film is full of twists and turns, so it's impossible to guess the ending.",
      "The plot of the film is simple, but the acting is excellent.",
      "The detective is a compelling character, and you want to know what happens to him.",
      "I couldn't enjoy the film because the storyline was far-fetched.",
      "I prefer a happy ending after a sad story.",
      "This crime novel is a real page-turner.",
      "The film adaptation was not as good as the book.",
      "The film became a box-office hit in several countries.",
      "The film has a strong cast, including two famous actors.",
      "She gave a powerful performance as a mother who loses her child.",
      "The film is famous for its memorable soundtrack.",
      "The animated film was visually stunning.",
      "I sometimes binge-watch a series at the weekend and forget to sleep.",
      "The film is based on a true story, which made it more moving.",
      "A good film can leave a lasting impression on viewers."
    ],
    use: [
      { t: "fill", q: "I couldn't put the book down. It was so ____ that I finished it in one night.", o: ["gripping", "predictable", "far-fetched", "tragic"], a: 0, w: "Gripping = cuốn hút đến mức khó rời mắt." },
      { t: "fill", q: "The comedy was absolutely ____; I was laughing from beginning to end.", o: ["hilarious", "thought-provoking", "visually stunning", "predictable"], a: 0, w: "Hilarious = cực kỳ hài hước." },
      { t: "fill", q: "I didn't enjoy the film because the story was so ____ that nobody could believe it.", o: ["far-fetched", "realistic", "compelling", "captivating"], a: 0, w: "Far-fetched = khó tin, thiếu thực tế." },
      { t: "fill", q: "The film is ____ a true story about a family who survived a war.", o: ["based on", "based at", "held on", "set at"], a: 0, w: "Be based on a true story = dựa trên câu chuyện có thật." },
      { t: "fix", q: "Câu có lỗi: “The film adaption was not as good as the original book.” Chọn từ đúng.", o: ["adaptation", "adoption", "adapting", "adaptive"], a: 0, w: "Film adaptation = phiên bản phim chuyển thể." },
      { t: "fix", q: "Câu có lỗi: “The film made a lasting impress on me, and I still think about it.” Chọn từ đúng.", o: ["impression", "impress", "impressive", "impressed"], a: 0, w: "Leave a lasting impression (danh từ) = để lại ấn tượng lâu dài." },
      { t: "speak", q: "What kind of films or TV series do you like?", h: ["visually stunning", "a strong cast", "be based on a true story", "full of twists and turns"], s: "I like films that are **full of twists and turns**, because I enjoy trying to guess the ending. I also pay attention to whether the film has **a strong cast**. Recently I watched one that was **based on a true story**, and it was **visually stunning** too." },
      { t: "speak", q: "Do you read books? What kind of books do you like?", h: ["a page-turner", "gripping", "thought-provoking", "a compelling character"], s: "Yes, I read a few books a month. I like novels that are **gripping**, especially detective stories that are real **page-turners**. I also enjoy **thought-provoking** books that make me think about life, usually with **a compelling character** at the center." }
    ],
    reuse: [
      { q: "Do you prefer watching films at home or going to the cinema?", h: ["binge-watch a series", "visually stunning", "a memorable soundtrack", "a box-office hit"], s: "I like both, but I prefer the cinema for big films, especially when they're **visually stunning** and have **a memorable soundtrack**. At home, I sometimes **binge-watch a series** on weekends, which is more relaxing. I usually go to the cinema for **a box-office hit**, because the atmosphere is exciting." },
      { q: "Describe a book or film that left a strong impression on you. You should say what it was, what it was about, what you liked about it, and why it was memorable.", h: ["leave a lasting impression", "a powerful performance", "a plot", "thought-provoking"], s: "I'd like to talk about a film about a young man who loses his father. The **plot** is quite simple, but the lead actor gave **a powerful performance**, and many scenes made me cry. It was also very **thought-provoking**, because it made me think about how I treat my family. That's why it **left a lasting impression** on me." },
      { q: "Do you think films based on books are usually better or worse than the books?", h: ["a film adaptation", "a storyline", "a happy ending", "far-fetched"], s: "I think **a film adaptation** is usually worse, because it has to shorten the **storyline**, and some characters disappear. Sometimes the director changes the ending to **a happy ending**, which can feel unrealistic. But if the adaptation isn't **far-fetched** and keeps the main idea, I can still enjoy it." }
    ],
    recall: [
      { k: "vi", q: "cuốn sách hấp dẫn khiến người đọc muốn đọc tiếp", a: ["a page-turner", "page-turner", "a page turner"] },
      { k: "vi", q: "dàn diễn viên chất lượng", a: ["a strong cast", "strong cast"] },
      { k: "vi", q: "cày nhiều tập phim liên tục", a: ["binge-watch a series", "binge-watch", "binge watch a series", "binge-watch series"] },
      { k: "sit", q: "Một bộ phim thu về rất nhiều tiền từ vé bán ra. Bạn gọi đó là gì?", a: ["a box-office hit", "box-office hit", "box office hit"] },
      { k: "sit", q: "Bạn xem xong một bộ phim và vẫn nhớ nó rất lâu sau đó. Bạn nói bộ phim đã làm gì với bạn?", a: ["leave a lasting impression", "left a lasting impression", "leaves a lasting impression"] },
      { k: "blank", q: "The cinematography was beautiful; the whole film looked ____. (đẹp mãn nhãn)", a: ["visually stunning"] },
      { k: "blank", q: "Some viewers prefer ____ in which everyone is happy. (kết thúc có hậu)", a: ["a happy ending", "happy ending"] },
      { k: "speak", q: "Nói 1–2 câu về một bộ phim hoặc cuốn sách bạn thích. Thử dùng ít nhất hai cụm đã học.", a: ["gripping", "a compelling character", "thought-provoking", "a powerful performance"], s: "I recently read a **gripping** novel with **a compelling character**. It was also **thought-provoking**, so I kept thinking about it after I finished." }
    ]
  });

  P.addPack("voc_17_cities_environment", {
    ex: [
      "Air pollution is a serious problem in many big cities.",
      "Traffic congestion makes my daily trip twice as long.",
      "I avoid rush hour by leaving home at six.",
      "More green spaces would make cities more pleasant.",
      "Public parks give families a place to relax and exercise.",
      "I live in a quiet residential area outside the center.",
      "Ho Chi Minh City is densely populated, so housing is expensive.",
      "Buses get overcrowded during rush hour.",
      "Urban sprawl takes away farmland around the city.",
      "Cars and factories are the main source of carbon emissions.",
      "Solar panels are a good source of renewable energy.",
      "Burning fossil fuels harms the environment.",
      "I buy eco-friendly products when I can.",
      "Using cloth bags is a simple way to reduce waste.",
      "We recycle paper and reuse glass bottles at home.",
      "Cities must focus on sustainable development, not just fast growth.",
      "A reliable public transport system can reduce traffic.",
      "Clean air improves people's quality of life."
    ],
    use: [
      { t: "fill", q: "Because the city is so ____, houses are expensive and the streets are always crowded.", o: ["densely populated", "eco-friendly", "well-preserved", "renewable"], a: 0, w: "Densely populated = có mật độ dân số cao." },
      { t: "fill", q: "Many people leave home at five to avoid ____ and arrive at work on time.", o: ["rush hour", "urban sprawl", "carbon emissions", "green spaces"], a: 0, w: "Rush hour = giờ cao điểm." },
      { t: "fill", q: "Solar and wind power are examples of ____, which do not run out like oil or coal.", o: ["renewable energy", "fossil fuels", "carbon emissions", "air pollution"], a: 0, w: "Renewable energy = năng lượng tái tạo." },
      { t: "fill", q: "Using cloth bags instead of plastic bags is a simple way to ____.", o: ["reduce waste", "increase traffic", "cause pollution", "build more roads"], a: 0, w: "Reduce waste = giảm lượng rác thải." },
      { t: "fix", q: "Câu có lỗi: “The government should invest in a public transports system to reduce traffic.” Chọn cách sửa đúng.", o: ["public transport system", "public transports system", "publics transport system", "public transporting system"], a: 0, w: "Cụm đúng: public transport system (không thêm -s)." },
      { t: "fix", q: "Câu có lỗi: “Burning fossils fuels causes air pollution and climate change.” Chọn cách sửa đúng.", o: ["fossil fuels", "fossils fuels", "fossil fuel's", "fossil fuelled"], a: 0, w: "Cụm đúng: fossil fuels = nhiên liệu hóa thạch." },
      { t: "speak", q: "Is there much pollution where you live?", h: ["air pollution", "traffic congestion", "rush hour", "green spaces"], s: "Yes, there is quite a lot, especially **air pollution**. During **rush hour**, **traffic congestion** gets so bad that the air feels heavy. We don't have enough **green spaces** to help clean the air, so I sometimes wear a mask outside." },
      { t: "speak", q: "What can people do to protect the environment?", h: ["reduce waste", "recycle", "eco-friendly", "renewable energy"], s: "There are many small things people can do. We can **reduce waste** by bringing our own bags, and we can **recycle** paper and plastic. I also try to buy **eco-friendly** products, and in the future I'd like my family to use **renewable energy**, like solar panels." }
    ],
    reuse: [
      { q: "Would you like to live in a big city or a small town?", h: ["quality of life", "densely populated", "public parks", "public transport system"], s: "I'd choose a small town. Big cities are **densely populated**, so life can be stressful. In a smaller place, the **quality of life** is often better, with more **public parks** and less traffic. The only disadvantage is that the **public transport system** is usually weaker." },
      { q: "Describe a place in your city that is good for the environment. You should say where it is, what it is like, how people use it, and why it is good for the environment.", h: ["green spaces", "recreational areas", "eco-friendly", "recycle"], s: "I'd like to talk about a large park near my home. It's one of the few **green spaces** in the city, and people use it for walking and exercising. The park also has **recreational areas** for children. It's **eco-friendly** because the lights are solar-powered, and there are bins where people can **recycle** plastic bottles." },
      { q: "What problems do big cities face, and what can governments do about them?", h: ["urban sprawl", "carbon emissions", "sustainable development", "traffic congestion"], s: "One problem is **urban sprawl**, because cities keep growing and take over farmland. Another is **traffic congestion**, which increases **carbon emissions**. Governments should focus on **sustainable development**, for example by improving public transport and limiting private cars." }
    ],
    recall: [
      { k: "vi", q: "ô nhiễm không khí", a: ["air pollution"] },
      { k: "vi", q: "giờ cao điểm", a: ["rush hour"] },
      { k: "vi", q: "năng lượng tái tạo", a: ["renewable energy"] },
      { k: "sit", q: "Dầu mỏ, than đá và khí đốt được gọi chung là gì?", a: ["fossil fuels", "fossil fuel"] },
      { k: "sit", q: "Một thành phố phát triển kinh tế nhưng vẫn bảo vệ môi trường cho thế hệ sau. Đó là kiểu phát triển nào?", a: ["sustainable development"] },
      { k: "blank", q: "We should plant more trees and create more ____ in the city center. (không gian xanh)", a: ["green spaces", "green space"] },
      { k: "blank", q: "Cars and factories produce a large amount of ____. (khí thải carbon)", a: ["carbon emissions"] },
      { k: "speak", q: "Nói 1–2 câu về một vấn đề môi trường ở thành phố của bạn và một giải pháp. Thử dùng ít nhất hai cụm đã học.", a: ["air pollution", "traffic congestion", "reduce waste", "public transport system"], s: "The biggest problem in my city is **traffic congestion**, which causes **air pollution**. I think a better **public transport system** would help a lot." }
    ]
  });

  P.addPack("voc_18_culture_traditions", {
    ex: [
      "Hoi An's old town is part of Vietnam's cultural heritage.",
      "Grandparents often pass down traditions by telling stories to their grandchildren.",
      "Language is an important part of cultural identity.",
      "Every region has its own customs and traditions.",
      "We celebrate this festival in the village every spring.",
      "We cook a big meal to mark a special occasion like a birthday.",
      "Tet is a time for a family gathering.",
      "Festivals give people a sense of belonging.",
      "Ancestral worship is common in many Vietnamese families.",
      "My grandmother used to tell me folk tales before bedtime.",
      "Girls wear the ao dai, a traditional costume, at school ceremonies.",
      "Visitors love trying local delicacies at the night market.",
      "These customs are deeply rooted in history.",
      "Festivals can promote national pride among young people."
    ],
    use: [
      { t: "fill", q: "In many families, grandparents ____ traditions by teaching children how to cook special dishes.", o: ["pass down", "pass away", "pass by", "pass over"], a: 0, w: "Pass down traditions = truyền lại truyền thống." },
      { t: "fill", q: "My family celebrates Tet with a big ____, where relatives from different cities meet.", o: ["family gathering", "folk tale", "local delicacy", "traditional costume"], a: 0, w: "A family gathering = buổi sum họp gia đình." },
      { t: "fill", q: "Many Vietnamese families practice ____, with an altar at home to remember their parents and grandparents.", o: ["ancestral worship", "folk tales", "traditional costumes", "local delicacies"], a: 0, w: "Ancestral worship = tục thờ cúng tổ tiên." },
      { t: "fill", q: "Joining festivals gives young people ____ because they feel part of a larger community.", o: ["a sense of belonging", "ancestral worship", "a family gathering", "a local delicacy"], a: 0, w: "A sense of belonging = cảm giác thuộc về một cộng đồng." },
      { t: "fix", q: "Câu có lỗi: “Every region has its own custom and tradition.” Chọn cách diễn đạt đúng.", o: ["customs and traditions", "custom and traditions", "customs and tradition", "custom or traditions"], a: 0, w: "Cụm quen thuộc: customs and traditions (cả hai ở số nhiều)." },
      { t: "fix", q: "Câu có lỗi: “Respect for elders is deeply rooted at our culture.” Chọn cách sửa đúng.", o: ["deeply rooted in", "deeply root in", "deep rooted at", "deeply rooting in"], a: 0, w: "Cụm đúng: be deeply rooted in = bắt nguồn sâu sắc từ." },
      { t: "speak", q: "What traditional festival is most important in your country?", h: ["celebrate a festival", "a family gathering", "customs and traditions", "mark a special occasion"], s: "The most important festival is Tet, the Lunar New Year. We **celebrate this festival** with **a family gathering**, and many **customs and traditions** are followed, like giving lucky money. It's a special time to **mark a special occasion** for the whole family." },
      { t: "speak", q: "Do you ever wear traditional clothes?", h: ["traditional costume", "a sense of belonging", "cultural identity", "local delicacies"], s: "Not often, but I wear the ao dai on special days like Tet or at weddings. It's a **traditional costume** that makes me feel proud of my **cultural identity**, and it also gives me **a sense of belonging**. I think it's a nice way to show respect for our culture." }
    ],
    reuse: [
      { q: "Do you think young people today care about traditions?", h: ["pass down traditions", "be deeply rooted in", "promote national pride", "cultural heritage"], s: "Some do, but many are more interested in modern life. Still, I believe traditions are **deeply rooted in** our society, so older people **pass down traditions** to the younger generation. Schools can also **promote national pride** by teaching about our **cultural heritage**." },
      { q: "Describe a traditional story or legend you know. You should say what it is, how you heard it, what it is about, and why it is important.", h: ["folk tales", "legends", "be deeply rooted in", "cultural identity"], s: "I'd like to talk about the legend of the Hung Kings. I first heard it from my grandmother, who loved telling **folk tales** and **legends** at bedtime. The story explains where the Vietnamese people came from, and the idea of honoring our ancestors is **deeply rooted in** our culture. I think it's important because it strengthens our **cultural identity**." },
      { q: "How can people protect traditional culture in the modern world?", h: ["preserve traditions", "cultural heritage", "local delicacies", "traditional costume"], s: "I think we should **preserve traditions** by teaching them at school and at home. Governments can also protect **cultural heritage** sites, and local festivals can introduce **local delicacies** and **traditional costume** to younger people and tourists." }
    ],
    recall: [
      { k: "vi", q: "tục thờ cúng tổ tiên", a: ["ancestral worship"] },
      { k: "vi", q: "cảm giác thuộc về một cộng đồng", a: ["a sense of belonging", "sense of belonging"] },
      { k: "vi", q: "truyện dân gian", a: ["folk tales", "folktales", "folk tale", "folk stories"] },
      { k: "sit", q: "Món ăn đặc trưng mà chỉ một vùng mới có, du khách thường đến để thử. Bạn gọi chung là gì?", a: ["local delicacies", "local delicacy"] },
      { k: "sit", q: "Cả nhà từ nhiều nơi trở về cùng ăn bữa cơm đầu năm. Đó là loại buổi gặp nào?", a: ["a family gathering", "family gathering"] },
      { k: "blank", q: "Respect for elders is ____ our culture. (ăn sâu vào, bắt nguồn sâu sắc từ)", a: ["deeply rooted in", "be deeply rooted in"] },
      { k: "blank", q: "We cook a special meal to ____ like a wedding anniversary. (kỷ niệm một dịp đặc biệt)", a: ["mark a special occasion"] },
      { k: "speak", q: "Nói 1–2 câu về một phong tục hoặc lễ hội ở quê bạn. Thử dùng ít nhất hai cụm đã học.", a: ["celebrate a festival", "customs and traditions", "a family gathering", "cultural identity"], s: "In my hometown, we **celebrate a festival** every spring. Many **customs and traditions** are followed, and it's also **a family gathering**, which helps keep our **cultural identity** strong." }
    ]
  });

  P.addPack("voc_19_news_media", {
    ex: [
      "I got a notification about breaking news on my phone.",
      "I read a news article about the new metro line.",
      "Government websites are usually a reliable source.",
      "It is important to verify information before sharing it.",
      "Some online posts contain misleading information.",
      "Some people spread fake news without checking the facts.",
      "Reporters need to cover a story fairly and honestly.",
      "I watch the news every evening to stay informed.",
      "I try to keep up with current affairs by reading online headlines.",
      "The headline was so dramatic that I had to open the article.",
      "A biased report shows only one side of the story.",
      "The festival received a lot of media coverage.",
      "Freedom of the press allows journalists to report the truth.",
      "Some websites sensationalize a story to get more clicks.",
      "A public figure's private life is often discussed online.",
      "Traditional media, like newspapers, is losing readers to digital media."
    ],
    use: [
      { t: "fill", q: "My phone just showed a ____ alert: a big storm is moving towards the coast right now.", o: ["breaking news", "freedom of the press", "public figure", "digital media"], a: 0, w: "Breaking news = tin nóng, tin mới xảy ra." },
      { t: "fill", q: "Before sharing a post, you should always ____, because it may not be true.", o: ["verify information", "cover a story", "stay informed", "sensationalize a story"], a: 0, w: "Verify information = xác minh thông tin." },
      { t: "fill", q: "Some websites like to ____ to get more clicks, so a small event sounds like a disaster.", o: ["sensationalize a story", "verify information", "keep up with current affairs", "cover a story"], a: 0, w: "Sensationalize a story = giật gân hóa một câu chuyện." },
      { t: "fill", q: "Government websites and well-known newspapers are usually considered a ____.", o: ["reliable source", "biased report", "breaking news", "fake headline"], a: 0, w: "A reliable source = nguồn tin đáng tin cậy." },
      { t: "fix", q: "Câu có lỗi: “I read the news every morning to stay inform about what's happening.” Chọn dạng từ đúng.", o: ["informed", "information", "informing", "inform"], a: 0, w: "Cụm đúng: stay informed (tính từ)." },
      { t: "fix", q: "Câu có lỗi: “Some people spread a fake news without checking the facts.” Chọn cách sửa đúng.", o: ["spread fake news", "spread a fake news", "spreading fakes news", "spread fake newses"], a: 0, w: "News là danh từ không đếm được: spread fake news." },
      { t: "speak", q: "How do you usually get the news?", h: ["stay informed", "digital media", "breaking news", "a news article"], s: "I usually get the news from my phone. I think **digital media** is faster than **traditional media**, so it's the easiest way to **stay informed**. I get **breaking news** notifications whenever something important happens, and in the evening I sometimes read **a news article** on a website." },
      { t: "speak", q: "Do you trust everything you see in the news? Why or why not?", h: ["a reliable source", "verify information", "misleading information", "a biased report"], s: "Not really. I try to check whether the news comes from **a reliable source**. When something sounds strange, I **verify information** on another website, because some posts contain **misleading information** or even **a biased report**. It takes extra time, but I think it's worth it." }
    ],
    reuse: [
      { q: "Do you often talk about the news with your family or friends?", h: ["keep up with current affairs", "media coverage", "a headline", "stay informed"], s: "Yes, sometimes. My dad likes to **keep up with current affairs**, so we talk about the news at dinner. If there's a lot of **media coverage** about an event, we discuss it more. Sometimes **a headline** makes me curious, and I tell my friends so we can **stay informed** together." },
      { q: "Describe a news story you read or watched that interested you. You should say what the story was about, where you saw it, why it interested you, and how you felt about it.", h: ["cover a story", "a news report", "a public figure", "media coverage"], s: "I'd like to talk about **a news report** about a famous singer who donated money to flood victims. Several channels **covered the story**, and there was a lot of **media coverage** online. I was interested because **a public figure** was using his fame to help others, and it made me feel positive about society." },
      { q: "What problems can fake news cause in society, and how can people deal with them?", h: ["spread fake news", "misleading information", "verify information", "freedom of the press"], s: "Fake news can cause panic or create unfair opinions about people. When some individuals **spread fake news**, **misleading information** reaches thousands of people in a short time. People should **verify information** before sharing it. At the same time, **freedom of the press** is important, so the solution shouldn't be to silence journalists but to educate readers." }
    ],
    recall: [
      { k: "vi", q: "tin nóng, tin mới xảy ra", a: ["breaking news"] },
      { k: "vi", q: "nguồn tin đáng tin cậy", a: ["a reliable source", "reliable source"] },
      { k: "vi", q: "thông tin gây hiểu lầm", a: ["misleading information"] },
      { k: "sit", q: "Một tờ báo chỉ trình bày một phía của câu chuyện và tỏ ra thiên vị. Bạn gọi bản tin đó là gì?", a: ["a biased report", "biased report"] },
      { k: "sit", q: "Bạn xem tin mỗi ngày để biết chuyện gì đang diễn ra trong nước và trên thế giới. Bạn dùng cụm động từ nào?", a: ["keep up with current affairs", "stay informed", "keeps up with current affairs"] },
      { k: "blank", q: "Journalists should be able to report the truth without fear. This is called ____. (tự do báo chí)", a: ["freedom of the press"] },
      { k: "blank", q: "Some websites ____ to attract more clicks. (giật gân hóa một câu chuyện)", a: ["sensationalize a story", "sensationalise a story", "sensationalize stories", "sensationalise stories"] },
      { k: "speak", q: "Nói 1–2 câu về cách bạn nhận tin tức hằng ngày và cách tránh tin giả. Thử dùng ít nhất hai cụm đã học.", a: ["stay informed", "digital media", "verify information", "a reliable source"], s: "I use **digital media** to **stay informed**, but I always **verify information** if a story sounds unusual. I also try to follow **a reliable source** instead of random pages." }
    ]
  });

  P.addPack("voc_20_home_accommodation", {
    ex: [
      "Our living room is spacious, but the kitchen is cramped.",
      "I rented a furnished apartment, so I didn't need to buy a bed.",
      "The apartment has a fully equipped kitchen.",
      "I tried to make my small room a cosy living space with lamps and plants.",
      "I'd love a flat with a balcony with a view of the river.",
      "Large windows let in lots of natural light.",
      "It takes a week to move house, even with help.",
      "Many young people can't afford to own a property, so they rent an apartment.",
      "I share a flat with a roommate to save money.",
      "We split the bills equally every month.",
      "The dormitory is only a temporary home for me.",
      "It took me two weeks to settle into a new home.",
      "My landlord is kind and fixes problems quickly."
    ],
    use: [
      { t: "fill", q: "The room is very ____: two people can hardly walk past each other.", o: ["cramped", "spacious", "furnished", "fully equipped"], a: 0, w: "Cramped = chật chội." },
      { t: "fill", q: "The flat is ____, so you only need to bring your clothes; there's already a bed, a sofa and a wardrobe.", o: ["furnished", "unfurnished", "cramped", "temporary"], a: 0, w: "Furnished = có sẵn nội thất." },
      { t: "fill", q: "I'd like an apartment with plenty of ____, because big windows make the rooms bright without lamps.", o: ["natural light", "a landlord", "a tenant", "the rent"], a: 0, w: "Natural light = ánh sáng tự nhiên." },
      { t: "fill", q: "My roommate and I ____ every month, so nobody pays more than the other.", o: ["split the bills", "move house", "settle into a new home", "own a property"], a: 0, w: "Split the bills = chia tiền hóa đơn." },
      { t: "fix", q: "Câu có lỗi: “Many young people can't afford to own a properties in big cities.” Chọn cách sửa đúng.", o: ["own a property", "own properties a", "owning a property", "own an property"], a: 0, w: "Cụm đúng: own a property = sở hữu bất động sản." },
      { t: "fix", q: "Câu có lỗi: “It took me a few weeks to settle at a new home.” Chọn cách sửa đúng.", o: ["settle into", "settle at", "settle on", "settle for"], a: 0, w: "Cụm đúng: settle into a new home = dần quen với nhà mới." },
      { t: "speak", q: "Can you describe the place where you live?", h: ["spacious", "natural light", "a cosy living space", "fully equipped"], s: "I live in a small apartment with my family. It isn't very **spacious**, but there's plenty of **natural light**, which makes it feel bigger. We've tried to create **a cosy living space** with plants and warm lamps, and the kitchen is **fully equipped**, so we cook at home a lot." },
      { t: "speak", q: "Do you live in a house or an apartment? Would you like to move?", h: ["move house", "rent an apartment", "own a property", "a balcony with a view"], s: "I **rent an apartment** at the moment. I'd like to **move house** in a few years and maybe **own a property** one day. Ideally, I'd choose a place with **a balcony with a view**, because I like sitting outside in the evening." }
    ],
    reuse: [
      { q: "Would you prefer to live alone or with other people?", h: ["share a flat with a roommate", "split the bills", "pay the rent", "cramped"], s: "At the moment I **share a flat with a roommate**, and I think it's a good idea when you're young. We **split the bills** and **pay the rent** together, so it's much cheaper. The only problem is that a small flat can feel **cramped**, so we have to respect each other's space." },
      { q: "Describe a home you would like to live in in the future. You should say where it would be, what it would look like, who you would live with, and why you would like it.", h: ["spacious", "fully equipped", "natural light", "a balcony with a view"], s: "My dream home would be a **spacious** apartment near the sea. It would be **fully equipped**, with a modern kitchen and a good internet connection, and there would be lots of **natural light** from large windows. Best of all, it would have **a balcony with a view** of the beach, where I could drink coffee every morning with my family." },
      { q: "What are the advantages of owning a home compared with renting?", h: ["own a property", "a permanent home", "landlord", "tenant"], s: "If you **own a property**, you have **a permanent home** and you don't have to worry about a **landlord** raising the rent. A **tenant** has to follow the owner's rules, and might have to move if the contract ends. However, renting gives more freedom to **move house** when your job changes." }
    ],
    recall: [
      { k: "vi", q: "chật chội", a: ["cramped"] },
      { k: "vi", q: "có sẵn nội thất", a: ["furnished"] },
      { k: "vi", q: "dần quen với nhà mới", a: ["settle into a new home", "settle into a new place", "settle in", "settle into a new house"] },
      { k: "sit", q: "Ánh sáng mặt trời chiếu vào phòng qua cửa sổ lớn. Bạn dùng cụm danh từ nào?", a: ["natural light"] },
      { k: "sit", q: "Người cho bạn thuê căn hộ và nhận tiền thuê mỗi tháng. Bạn gọi người đó là gì?", a: ["landlord", "a landlord", "my landlord"] },
      { k: "blank", q: "Every month my roommate and I ____. (trả tiền thuê nhà)", a: ["pay the rent"] },
      { k: "blank", q: "We ____ last year because our old flat was too small. (chuyển nhà)", a: ["moved house", "moved to a new place", "moved into a new place"] },
      { k: "speak", q: "Nói 1–2 câu về nơi bạn đang sống. Thử dùng ít nhất hai cụm đã học.", a: ["spacious", "natural light", "a cosy living space", "share a flat with a roommate"], s: "I live in a **spacious** flat with lots of **natural light**. I **share the flat with a roommate**, and together we've made it **a cosy living space**." }
    ]
  });
})();
