/* =====================================================================
   Vocabulary Library v2.8 — 30 Topic Vocabulary modules (28 here + Module 01/02, the original guided modules in data/lexical-modules.js)
   and 8 Language Functions. Static, public teaching content (no student data).

   WHAT THIS FILE IS:   the vocabulary / expression LISTS (and Mock Test links). Module 19 = Describing News & Media; Modules 27–30 are new.
   The practice itself (Learn examples, Use, Reuse, Retrieve, sample answers) lives in data/packs-1.js … data/packs-6.js
   (one pack per module, attached with LU.practice.addPack). A module with a pack is a full guided module the student can open and complete;
   `libraryOnly: true` (used before v2.8) is removed automatically when a pack is attached. A module without a pack would still show
   "Thư viện của thầy — chưa có bài luyện" (this should not happen now: tests/verify_practice_packs.js checks that all 38 have packs).

   TO EDIT:   change the text between the quotes (term / vi / note, expressions). Keep every `id` unchanged.
              Add an entry:  { term: 'new word', vi: 'nghĩa tiếng Việt', note: 'optional usage note' }  (and add its example sentence at the same position in the pack's `ex`).
   Not every item is mandatory: they are options the student can choose from, never a checklist for one answer.
   Links to Mock Tests are in LU.practice.links at the bottom (ids only, nothing is copied into the mock tests).
   ===================================================================== */
window.LU.practice.register([
  /* ---------------- Topic Vocabulary modules 03–26 (01 and 02 = lex_atmosphere_01 / lex_personality_01) ---------------- */
  {
    id: "voc_03_natural_views", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 3, topic: "Natural Views", title: "Describing Natural Views",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 12 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "scenic", vi: "có phong cảnh đẹp" },
      { term: "breathtaking / picturesque", vi: "ngoạn mục / đẹp như tranh" },
      { term: "lush", vi: "xanh tươi, um tùm" },
      { term: "rocky", vi: "nhiều đá, gồ ghề" },
      { term: "mountainous", vi: "có nhiều núi" },
      { term: "rolling hills", vi: "những ngọn đồi thoai thoải nối tiếp nhau" },
      { term: "dense forest", vi: "rừng rậm" },
      { term: "remote", vi: "hẻo lánh, xa khu dân cư" },
      { term: "untouched", vi: "còn nguyên sơ, ít bị con người tác động" },
      { term: "crystal-clear", vi: "trong vắt" },
      { term: "stretch as far as the eye can see", vi: "trải dài đến tận chân trời" },
      { term: "be surrounded by", vi: "được bao quanh bởi" }
    ]
  },
  {
    id: "voc_04_places", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 4, topic: "Places", title: "Describing Places",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 15 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "convenient", vi: "thuận tiện" },
      { term: "well-connected", vi: "có kết nối giao thông tốt" },
      { term: "centrally located", vi: "nằm ở vị trí trung tâm" },
      { term: "residential area", vi: "khu dân cư" },
      { term: "well-maintained", vi: "được bảo trì, chăm sóc tốt" },
      { term: "run-down", vi: "xuống cấp" },
      { term: "overcrowded", vi: "quá đông đúc" },
      { term: "well-preserved", vi: "được bảo tồn tốt" },
      { term: "vibrant", vi: "sôi động" },
      { term: "laid-back", vi: "thoải mái, thư thái" },
      { term: "pedestrian-friendly", vi: "thân thiện với người đi bộ" },
      { term: "accessible", vi: "dễ tiếp cận" },
      { term: "a sense of community", vi: "cảm giác gắn kết cộng đồng" },
      { term: "well-equipped", vi: "được trang bị đầy đủ" },
      { term: "well-developed", vi: "phát triển tốt" }
    ]
  },
  {
    id: "voc_05_experiences_events", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 5, topic: "Experiences & Events", title: "Describing Experiences & Events",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 17 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "memorable / unforgettable", vi: "đáng nhớ / không thể nào quên" },
      { term: "once-in-a-lifetime", vi: "hiếm có, có thể chỉ trải qua một lần trong đời" },
      { term: "rewarding", vi: "xứng đáng với công sức, mang lại cảm giác thỏa mãn" },
      { term: "thrilled", vi: "vô cùng hào hứng" },
      { term: "overwhelmed", vi: "choáng ngợp" },
      { term: "relieved", vi: "nhẹ nhõm" },
      { term: "frustrating", vi: "gây bực bội" },
      { term: "be held", vi: "được tổ chức" },
      { term: "be organized", vi: "được sắp xếp, tổ chức" },
      { term: "at first", vi: "lúc đầu" },
      { term: "over time", vi: "theo thời gian" },
      { term: "eventually", vi: "cuối cùng, sau một quá trình" },
      { term: "turn out to be", vi: "hóa ra là" },
      { term: "go smoothly", vi: "diễn ra suôn sẻ" },
      { term: "take part in", vi: "tham gia" },
      { term: "make the most of", vi: "tận dụng tối đa" },
      { term: "learn a valuable lesson", vi: "rút ra một bài học quý giá" }
    ]
  },
  {
    id: "voc_06_skills_achievements", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 6, topic: "Skills & Achievements", title: "Describing Skills & Achievements",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 16 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "be good at", vi: "giỏi về" },
      { term: "have a knack for", vi: "có năng khiếu tự nhiên về" },
      { term: "pick up", vi: "học được một kỹ năng tương đối nhanh hoặc tự nhiên" },
      { term: "master", vi: "thành thạo" },
      { term: "proficient in", vi: "thành thạo, có năng lực tốt về" },
      { term: "dedicated", vi: "tận tâm, hết lòng" },
      { term: "determined", vi: "quyết tâm" },
      { term: "make progress", vi: "tiến bộ" },
      { term: "overcome", vi: "vượt qua" },
      { term: "put in the effort", vi: "bỏ công sức, nỗ lực" },
      { term: "step out of my comfort zone", vi: "bước ra khỏi vùng an toàn" },
      { term: "accomplish", vi: "hoàn thành, đạt được" },
      { term: "a sense of achievement", vi: "cảm giác thành tựu" },
      { term: "pay off", vi: "mang lại kết quả xứng đáng sau nỗ lực" },
      { term: "challenging", vi: "đầy thử thách" },
      { term: "rewarding", vi: "mang lại cảm giác xứng đáng với công sức" }
    ]
  },
  {
    id: "voc_07_study_education", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 7, topic: "Study & Education", title: "Describing Study & Education",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 14 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "academic performance", vi: "kết quả học tập" },
      { term: "get good grades / achieve a high score", vi: "đạt điểm tốt / đạt điểm số cao" },
      { term: "grasp a concept", vi: "nắm bắt một khái niệm" },
      { term: "acquire knowledge", vi: "tiếp thu kiến thức" },
      { term: "retain information", vi: "ghi nhớ thông tin" },
      { term: "make progress", vi: "tiến bộ" },
      { term: "fall behind", vi: "bị tụt lại trong việc học" },
      { term: "keep up with", vi: "theo kịp bài học" },
      { term: "revise for an exam", vi: "ôn thi" },
      { term: "meet a deadline", vi: "hoàn thành đúng hạn" },
      { term: "stay motivated", vi: "duy trì động lực" },
      { term: "manage my time effectively", vi: "quản lý thời gian hiệu quả" },
      { term: "be under pressure", vi: "chịu áp lực" },
      { term: "put in the effort", vi: "bỏ công sức, nỗ lực" }
    ]
  },
  {
    id: "voc_08_work_careers", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 8, topic: "Work & Careers", title: "Describing Work & Careers",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 16 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "job responsibilities", vi: "trách nhiệm công việc" },
      { term: "workload", vi: "khối lượng công việc" },
      { term: "demanding", vi: "đòi hỏi nhiều công sức" },
      { term: "work under pressure", vi: "làm việc dưới áp lực" },
      { term: "meet a deadline", vi: "hoàn thành đúng hạn" },
      { term: "hands-on experience", vi: "kinh nghiệm thực tế" },
      { term: "develop professional skills", vi: "phát triển kỹ năng nghề nghiệp" },
      { term: "career prospects", vi: "triển vọng nghề nghiệp" },
      { term: "job satisfaction", vi: "sự hài lòng với công việc" },
      { term: "job security", vi: "sự ổn định, đảm bảo công việc" },
      { term: "earn a living", vi: "kiếm sống" },
      { term: "strike a balance between work and personal life", vi: "cân bằng công việc và cuộc sống cá nhân" },
      { term: "be rewarding", vi: "mang lại sự hài lòng, xứng đáng với công sức" },
      { term: "stay motivated", vi: "duy trì động lực" },
      { term: "overcome a challenge", vi: "vượt qua thử thách" },
      { term: "manage my time effectively", vi: "quản lý thời gian hiệu quả" }
    ]
  },
  {
    id: "voc_09_technology_social_media", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 9, topic: "Technology & Social Media", title: "Describing Technology & Social Media",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 15 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "user-friendly", vi: "thân thiện, dễ sử dụng" },
      { term: "time-saving", vi: "tiết kiệm thời gian" },
      { term: "make life easier / more convenient", vi: "làm cuộc sống dễ dàng / thuận tiện hơn" },
      { term: "keep in touch with", vi: "giữ liên lạc với" },
      { term: "stay connected", vi: "duy trì kết nối" },
      { term: "access information", vi: "tiếp cận thông tin" },
      { term: "keep up with the latest trends", vi: "cập nhật xu hướng mới nhất" },
      { term: "rely on technology", vi: "dựa vào công nghệ" },
      { term: "be addicted to", vi: "nghiện, phụ thuộc quá mức vào" },
      { term: "spend hours scrolling", vi: "dành hàng giờ lướt nội dung" },
      { term: "get distracted", vi: "bị xao nhãng" },
      { term: "lose track of time", vi: "quên mất thời gian" },
      { term: "spread misinformation", vi: "lan truyền thông tin sai lệch" },
      { term: "protect personal information", vi: "bảo vệ thông tin cá nhân" },
      { term: "face-to-face / physical interaction vs. virtual / online interaction", vi: "tương tác trực tiếp vs. trực tuyến" }
    ]
  },
  {
    id: "voc_10_health_lifestyle", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 10, topic: "Health & Lifestyle", title: "Describing Health & Lifestyle",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 18 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "lead a healthy lifestyle", vi: "duy trì lối sống lành mạnh" },
      { term: "maintain a balanced diet", vi: "duy trì chế độ ăn cân bằng" },
      { term: "nutritious food", vi: "thực phẩm giàu dinh dưỡng" },
      { term: "processed food", vi: "thực phẩm chế biến sẵn" },
      { term: "stay physically active", vi: "duy trì hoạt động thể chất" },
      { term: "get regular exercise", vi: "tập thể dục thường xuyên" },
      { term: "build a healthy habit", vi: "xây dựng thói quen tốt" },
      { term: "break a bad habit", vi: "từ bỏ thói quen xấu" },
      { term: "get enough sleep", vi: "ngủ đủ giấc" },
      { term: "feel physically exhausted", vi: "cảm thấy kiệt sức về thể chất" },
      { term: "feel mentally drained", vi: "cảm thấy cạn kiệt năng lượng tinh thần" },
      { term: "relieve stress", vi: "giải tỏa căng thẳng" },
      { term: "boost energy levels", vi: "tăng mức năng lượng" },
      { term: "improve overall health", vi: "cải thiện sức khỏe tổng thể" },
      { term: "a sedentary lifestyle", vi: "lối sống ít vận động" },
      { term: "health problems", vi: "vấn đề sức khỏe" },
      { term: "develop a routine", vi: "xây dựng nếp sinh hoạt" },
      { term: "get into the habit of", vi: "hình thành thói quen làm gì" }
    ]
  },
  {
    id: "voc_11_food_eating_habits", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 11, topic: "Food & Eating Habits", title: "Describing Food & Eating Habits",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 14 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "homemade / home-cooked food", vi: "đồ ăn tự nấu tại nhà" },
      { term: "traditional dish", vi: "món ăn truyền thống" },
      { term: "local cuisine", vi: "ẩm thực địa phương" },
      { term: "fresh ingredients", vi: "nguyên liệu tươi" },
      { term: "rich / mild flavor", vi: "hương vị đậm đà / nhẹ" },
      { term: "spicy / bland", vi: "cay / nhạt nhẽo" },
      { term: "crispy / crunchy", vi: "giòn" },
      { term: "tender", vi: "mềm, dễ nhai", note: "thường dùng để nói về thịt" },
      { term: "have a sweet tooth", vi: "hảo ngọt" },
      { term: "be a picky eater", vi: "kén ăn" },
      { term: "eat out", vi: "ăn ngoài" },
      { term: "grab a quick bite", vi: "ăn nhanh một chút" },
      { term: "suit my taste", vi: "hợp khẩu vị" },
      { term: "be worth trying", vi: "đáng để thử" }
    ]
  },
  {
    id: "voc_12_travel_tourism", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 12, topic: "Travel & Tourism", title: "Describing Travel & Tourism",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 17 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "tourist attraction", vi: "điểm thu hút khách du lịch" },
      { term: "must-visit / must-go destination", vi: "điểm đến nhất định phải ghé thăm" },
      { term: "off the beaten track", vi: "nằm ngoài những tuyến du lịch phổ biến" },
      { term: "breathtaking scenery", vi: "phong cảnh ngoạn mục" },
      { term: "cultural heritage", vi: "di sản văn hóa" },
      { term: "local customs", vi: "phong tục địa phương" },
      { term: "public transportation", vi: "phương tiện giao thông công cộng" },
      { term: "accommodation", vi: "chỗ ở khi đi du lịch" },
      { term: "budget-friendly / affordable", vi: "hợp túi tiền" },
      { term: "touristy / less touristy", vi: "mang tính du lịch đại trà / ít đông khách du lịch hơn" },
      { term: "solo trip / solo traveler", vi: "chuyến du lịch một mình / người du lịch một mình" },
      { term: "package tour", vi: "tour du lịch trọn gói" },
      { term: "immerse myself in local culture", vi: "hòa mình vào văn hóa địa phương" },
      { term: "broaden my horizons", vi: "mở rộng hiểu biết, tầm nhìn" },
      { term: "get away from it all", vi: "tạm rời xa áp lực, bộn bề thường ngày" },
      { term: "a memorable experience", vi: "trải nghiệm đáng nhớ" },
      { term: "tourist trap", vi: "địa điểm du lịch chủ yếu nhằm thu tiền khách, thường với giá cao" }
    ]
  },
  {
    id: "voc_13_money_shopping", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 13, topic: "Money & Shopping", title: "Describing Money & Shopping",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 16 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "overpriced / reasonably priced", vi: "đắt hơn giá trị thực / có giá hợp lý" },
      { term: "affordable", vi: "có giá phải chăng" },
      { term: "a bargain", vi: "món đồ mua được với giá hời" },
      { term: "impulse buying", vi: "việc mua sắm bốc đồng" },
      { term: "shop around", vi: "tham khảo nhiều nơi trước khi mua" },
      { term: "compare prices", vi: "so sánh giá" },
      { term: "make an informed decision", vi: "đưa ra quyết định dựa trên thông tin đầy đủ" },
      { term: "durable / long-lasting", vi: "bền / sử dụng được lâu dài" },
      { term: "high-quality / poor-quality", vi: "chất lượng cao / chất lượng kém" },
      { term: "brand-conscious", vi: "quan tâm nhiều đến thương hiệu" },
      { term: "customer reviews", vi: "đánh giá của khách hàng" },
      { term: "return / exchange an item", vi: "trả lại / đổi một món hàng" },
      { term: "stick to a budget", vi: "tuân thủ ngân sách" },
      { term: "cut back on spending", vi: "cắt giảm chi tiêu" },
      { term: "save up for something", vi: "tiết kiệm tiền để mua hoặc làm việc gì" },
      { term: "be worth the money", vi: "đáng với số tiền bỏ ra" }
    ]
  },
  {
    id: "voc_14_relationships_friendship", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 14, topic: "Relationships & Friendship", title: "Describing Relationships & Friendship",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 16 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "get along with", vi: "hòa hợp với ai" },
      { term: "have a lot in common", vi: "có nhiều điểm chung" },
      { term: "share similar interests", vi: "có chung sở thích" },
      { term: "start talking to someone", vi: "bắt đầu trò chuyện với ai" },
      { term: "keep in touch / lose touch", vi: "giữ liên lạc / mất liên lạc" },
      { term: "drift apart / grow closer", vi: "dần xa cách / trở nên thân thiết hơn" },
      { term: "rely on each other", vi: "dựa vào nhau" },
      { term: "be there for someone", vi: "ở bên, hỗ trợ ai khi cần" },
      { term: "build trust", vi: "xây dựng lòng tin" },
      { term: "mutual respect", vi: "sự tôn trọng lẫn nhau" },
      { term: "a close-knit group", vi: "một nhóm gắn bó khăng khít" },
      { term: "a lasting friendship", vi: "một tình bạn lâu dài" },
      { term: "have conflicts with someone", vi: "có mâu thuẫn với ai" },
      { term: "make up with someone", vi: "làm hòa với ai sau mâu thuẫn" },
      { term: "hang out with someone", vi: "đi chơi, dành thời gian cùng ai" },
      { term: "get to know someone better", vi: "hiểu một người hơn qua thời gian" }
    ]
  },
  {
    id: "voc_15_hobbies_leisure", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 15, topic: "Hobbies & Leisure Activities", title: "Describing Hobbies & Leisure Activities",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 13 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "take up a hobby", vi: "bắt đầu một sở thích mới" },
      { term: "be passionate about / be really into", vi: "đam mê / rất thích điều gì" },
      { term: "a great way to unwind", vi: "cách tuyệt vời để thư giãn" },
      { term: "relieve stress / ease my mind", vi: "giải tỏa căng thẳng / giúp đầu óc thư thái" },
      { term: "recharge my batteries", vi: "nạp lại năng lượng" },
      { term: "a sense of fulfillment", vi: "cảm giác mãn nguyện, có ý nghĩa" },
      { term: "challenge myself", vi: "thử thách bản thân" },
      { term: "improve my skills / get better at something", vi: "cải thiện kỹ năng / trở nên giỏi hơn ở việc gì" },
      { term: "do something for fun", vi: "làm gì đó để giải trí" },
      { term: "indoor / outdoor activities", vi: "hoạt động trong nhà / ngoài trời" },
      { term: "a team sport / an individual sport", vi: "môn thể thao đồng đội / cá nhân" },
      { term: "pick up a new skill", vi: "học thêm một kỹ năng mới" },
      { term: "stick with something", vi: "tiếp tục theo đuổi điều gì dù có thể khó khăn" }
    ]
  },
  {
    id: "voc_16_books_films_entertainment", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 16, topic: "Books, Films & Entertainment", title: "Describing Books, Films & Entertainment",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 18 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "gripping / captivating", vi: "cuốn hút, hấp dẫn đến mức khó rời mắt" },
      { term: "hilarious / entertaining", vi: "cực kỳ hài hước / mang tính giải trí" },
      { term: "thought-provoking", vi: "gợi suy nghĩ, khiến người xem suy ngẫm" },
      { term: "predictable / full of twists and turns", vi: "dễ đoán / có nhiều tình tiết bất ngờ" },
      { term: "a plot / a storyline", vi: "cốt truyện" },
      { term: "a compelling character", vi: "nhân vật có sức hút" },
      { term: "a realistic / far-fetched storyline", vi: "cốt truyện chân thực / khó tin" },
      { term: "a happy ending / a tragic ending", vi: "kết thúc có hậu / bi thảm" },
      { term: "a page-turner", vi: "cuốn sách hấp dẫn khiến người đọc muốn đọc tiếp" },
      { term: "a film adaptation", vi: "phiên bản phim chuyển thể từ tác phẩm khác" },
      { term: "a box-office hit / a commercial flop", vi: "phim thành công lớn về doanh thu / thất bại thương mại" },
      { term: "a strong cast", vi: "dàn diễn viên chất lượng" },
      { term: "a powerful performance", vi: "màn trình diễn ấn tượng, giàu sức biểu cảm" },
      { term: "a memorable soundtrack", vi: "nhạc phim đáng nhớ" },
      { term: "visually stunning", vi: "có hình ảnh đẹp, mãn nhãn" },
      { term: "binge-watch a series", vi: "cày nhiều tập phim liên tục" },
      { term: "be based on a true story", vi: "dựa trên câu chuyện có thật" },
      { term: "leave a lasting impression", vi: "để lại ấn tượng lâu dài" }
    ]
  },
  {
    id: "voc_17_cities_environment", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 17, topic: "Cities & the Environment", title: "Describing Cities & the Environment",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 18 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "air pollution / water pollution", vi: "ô nhiễm không khí / ô nhiễm nguồn nước" },
      { term: "traffic congestion", vi: "tình trạng ùn tắc giao thông" },
      { term: "rush hour", vi: "giờ cao điểm" },
      { term: "green spaces", vi: "không gian xanh" },
      { term: "public parks / recreational areas", vi: "công viên công cộng / khu vực giải trí ngoài trời" },
      { term: "residential area", vi: "khu dân cư" },
      { term: "densely populated", vi: "có mật độ dân số cao" },
      { term: "overcrowded", vi: "quá đông đúc" },
      { term: "urban sprawl", vi: "sự mở rộng đô thị tràn lan" },
      { term: "carbon emissions", vi: "lượng khí thải carbon" },
      { term: "renewable energy", vi: "năng lượng tái tạo" },
      { term: "fossil fuels", vi: "nhiên liệu hóa thạch" },
      { term: "eco-friendly / environmentally friendly", vi: "thân thiện với môi trường" },
      { term: "reduce waste", vi: "giảm lượng rác thải" },
      { term: "recycle / reuse", vi: "tái chế / tái sử dụng" },
      { term: "sustainable development", vi: "phát triển bền vững" },
      { term: "public transport system", vi: "hệ thống giao thông công cộng" },
      { term: "quality of life", vi: "chất lượng cuộc sống" }
    ]
  },
  {
    id: "voc_18_culture_traditions", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 18, topic: "Culture & Traditions", title: "Describing Culture & Traditions",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 14 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "cultural heritage", vi: "di sản văn hóa" },
      { term: "preserve / pass down traditions", vi: "gìn giữ / truyền lại truyền thống" },
      { term: "cultural identity", vi: "bản sắc văn hóa" },
      { term: "customs and traditions", vi: "phong tục và truyền thống" },
      { term: "celebrate a festival", vi: "tổ chức / đón mừng lễ hội" },
      { term: "mark a special occasion", vi: "kỷ niệm một dịp đặc biệt" },
      { term: "a family gathering", vi: "buổi sum họp gia đình" },
      { term: "a sense of belonging", vi: "cảm giác thuộc về một cộng đồng" },
      { term: "ancestral worship", vi: "tục thờ cúng tổ tiên" },
      { term: "folk tales / legends", vi: "truyện dân gian / truyền thuyết" },
      { term: "traditional costume", vi: "trang phục truyền thống" },
      { term: "local delicacies", vi: "đặc sản địa phương" },
      { term: "be deeply rooted in", vi: "bắt nguồn sâu sắc từ, ăn sâu vào" },
      { term: "promote national identity / pride", vi: "thúc đẩy bản sắc dân tộc / lòng tự hào dân tộc" }
    ]
  },
  {
    id: "voc_19_news_media", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 19, topic: "News & Media", title: "Describing News & Media",
    status: "ready", libraryOnly: true,
    target: "Từ vựng chủ đề — 16 mục.",
    vocabulary: [
      { term: "breaking news", vi: "tin nóng, tin mới xảy ra" },
      { term: "a news report / a news article", vi: "bản tin / bài báo" },
      { term: "a reliable source", vi: "nguồn tin đáng tin cậy" },
      { term: "verify information", vi: "xác minh thông tin" },
      { term: "misleading information", vi: "thông tin gây hiểu lầm" },
      { term: "spread fake news", vi: "lan truyền tin giả" },
      { term: "cover a story", vi: "đưa tin về một sự kiện" },
      { term: "stay informed", vi: "cập nhật, nắm bắt thông tin" },
      { term: "keep up with current affairs", vi: "theo dõi các vấn đề thời sự" },
      { term: "a headline", vi: "tiêu đề tin tức" },
      { term: "a biased report", vi: "bản tin thiên vị" },
      { term: "media coverage", vi: "sự đưa tin của truyền thông" },
      { term: "freedom of the press", vi: "tự do báo chí" },
      { term: "sensationalize a story", vi: "giật gân hóa một câu chuyện hoặc sự kiện" },
      { term: "a public figure", vi: "nhân vật của công chúng" },
      { term: "traditional media / digital media", vi: "truyền thông truyền thống / truyền thông kỹ thuật số" }
    ]
  },
  {
    id: "voc_20_home_accommodation", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 20, topic: "Home & Accommodation", title: "Describing Home & Accommodation",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 13 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "spacious / cramped", vi: "rộng rãi / chật chội" },
      { term: "furnished / unfurnished", vi: "có sẵn nội thất / không có sẵn nội thất" },
      { term: "fully equipped", vi: "được trang bị đầy đủ tiện nghi" },
      { term: "a cosy living space", vi: "không gian sống ấm cúng" },
      { term: "a balcony with a view", vi: "ban công có tầm nhìn đẹp" },
      { term: "natural light", vi: "ánh sáng tự nhiên" },
      { term: "move house / move into a new place", vi: "chuyển nhà / chuyển đến nơi ở mới" },
      { term: "rent an apartment / own a property", vi: "thuê căn hộ / sở hữu bất động sản" },
      { term: "share a flat with a roommate", vi: "ở chung căn hộ với bạn cùng phòng" },
      { term: "pay the rent / split the bills", vi: "trả tiền thuê nhà / chia tiền hóa đơn" },
      { term: "a permanent / temporary home", vi: "nơi ở lâu dài / tạm thời" },
      { term: "settle into a new home", vi: "dần quen với nhà mới" },
      { term: "a landlord / a tenant", vi: "chủ nhà cho thuê / người thuê nhà" }
    ]
  },
  {
    id: "voc_21_family_childhood", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 21, topic: "Family & Childhood", title: "Describing Family & Childhood",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 16 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "bring up / raise a child", vi: "nuôi dạy một đứa trẻ" },
      { term: "strict / relaxed parents", vi: "cha mẹ nghiêm khắc / thoải mái" },
      { term: "a close-knit family", vi: "gia đình gắn bó khăng khít" },
      { term: "get along well with my parents", vi: "hòa thuận với bố mẹ" },
      { term: "look up to someone", vi: "ngưỡng mộ, coi ai là hình mẫu" },
      { term: "take after a family member", vi: "giống một thành viên trong gia đình" },
      { term: "spend quality time together", vi: "dành thời gian chất lượng bên nhau" },
      { term: "childhood memories", vi: "những ký ức tuổi thơ" },
      { term: "grow up in", vi: "lớn lên ở" },
      { term: "have fond memories of", vi: "có những ký ức đẹp về" },
      { term: "be brought up to do something", vi: "được nuôi dạy để làm điều gì" },
      { term: "learn right from wrong", vi: "học cách phân biệt đúng và sai" },
      { term: "become more independent", vi: "trở nên tự lập hơn" },
      { term: "pass on family values", vi: "truyền lại những giá trị gia đình" },
      { term: "be an only child / have siblings", vi: "là con một / có anh chị em ruột" },
      { term: "a generation gap", vi: "khoảng cách thế hệ" }
    ]
  },
  {
    id: "voc_22_daily_routines_time", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 22, topic: "Daily Routines & Time", title: "Describing Daily Routines & Time",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 14 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "stick to / follow a routine", vi: "duy trì / tuân theo lịch sinh hoạt" },
      { term: "a hectic / tight schedule", vi: "lịch trình bận rộn / kín mít" },
      { term: "get up early / stay up late", vi: "dậy sớm / thức khuya" },
      { term: "be an early bird / a night owl", vi: "là người dậy sớm / cú đêm" },
      { term: "run errands", vi: "làm những việc vặt cần giải quyết" },
      { term: "have some downtime", vi: "có thời gian nghỉ ngơi, thư giãn" },
      { term: "make time for something", vi: "dành thời gian cho việc gì" },
      { term: "spend hours doing something", vi: "dành hàng giờ làm việc gì" },
      { term: "have a lot on my plate", vi: "có nhiều việc phải xử lý" },
      { term: "get things done", vi: "hoàn thành công việc cần làm" },
      { term: "take a short break", vi: "nghỉ giải lao một chút" },
      { term: "manage my daily schedule", vi: "sắp xếp lịch trình hằng ngày" },
      { term: "a productive day / a lazy day", vi: "một ngày làm việc hiệu quả / một ngày lười biếng" },
      { term: "make the most of my time", vi: "tận dụng thời gian tối đa" }
    ]
  },
  {
    id: "voc_23_weather_seasons", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 23, topic: "Weather & Seasons", title: "Describing Weather & Seasons",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 16 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "scorching hot / freezing cold", vi: "nóng như thiêu / lạnh cóng" },
      { term: "mild / extreme weather", vi: "thời tiết ôn hòa / khắc nghiệt" },
      { term: "humid / dry climate", vi: "khí hậu ẩm / khô" },
      { term: "a heatwave", vi: "đợt nắng nóng kéo dài" },
      { term: "heavy rainfall", vi: "mưa lớn" },
      { term: "a thunderstorm", vi: "cơn giông có sấm sét" },
      { term: "a sudden downpour", vi: "trận mưa rào bất chợt" },
      { term: "a rainy / dry season", vi: "mùa mưa / mùa khô" },
      { term: "a pleasant breeze", vi: "làn gió nhẹ dễ chịu" },
      { term: "gloomy and cloudy", vi: "âm u, nhiều mây" },
      { term: "put someone in a good / bad mood", vi: "khiến ai vui vẻ / khó chịu" },
      { term: "make someone feel energetic / sluggish", vi: "khiến ai tràn đầy năng lượng / uể oải" },
      { term: "lift / dampen someone's mood", vi: "cải thiện / làm tụt tâm trạng" },
      { term: "feel refreshed / drained", vi: "cảm thấy sảng khoái / kiệt sức" },
      { term: "sweat heavily", vi: "đổ nhiều mồ hôi" },
      { term: "make my skin oily / dry", vi: "khiến da tôi đổ dầu / bị khô" }
    ]
  },
  {
    id: "voc_24_transport_getting_around", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 24, topic: "Transport & Getting Around", title: "Describing Transport & Getting Around",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 12 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "commute to work / school", vi: "đi làm / đi học hằng ngày" },
      { term: "get around by bus / motorbike", vi: "di chuyển bằng xe buýt / xe máy" },
      { term: "get stuck in traffic", vi: "bị mắc kẹt trong dòng xe cộ" },
      { term: "traffic jam / traffic congestion", vi: "tắc đường / ùn tắc giao thông" },
      { term: "rush-hour traffic", vi: "tình trạng giao thông giờ cao điểm" },
      { term: "public transport vs. private vehicles", vi: "phương tiện giao thông công cộng so với phương tiện cá nhân" },
      { term: "means of transport", vi: "phương tiện giao thông" },
      { term: "get around on foot", vi: "di chuyển bằng cách đi bộ" },
      { term: "fuel-efficient", vi: "tiết kiệm nhiên liệu" },
      { term: "environmentally friendly", vi: "thân thiện với môi trường" },
      { term: "affordable fares", vi: "giá vé phải chăng" },
      { term: "flexible", vi: "linh hoạt", note: "examples: flexible working hours, flexible travel plans" }
    ]
  },
  {
    id: "voc_25_clothes_fashion", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 25, topic: "Clothes & Fashion", title: "Describing Clothes & Fashion",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 14 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "casual / formal wear", vi: "trang phục thường ngày / trang trọng" },
      { term: "dress up / dress down", vi: "ăn mặc cầu kỳ, trang trọng hơn / ăn mặc giản dị, thoải mái hơn" },
      { term: "keep up with fashion trends", vi: "cập nhật xu hướng thời trang" },
      { term: "trendy / out of fashion", vi: "hợp xu hướng / lỗi mốt" },
      { term: "suit someone", vi: "hợp với ai về kiểu dáng, màu sắc hoặc phong cách" },
      { term: "fit well / be too tight / be too loose", vi: "vừa vặn / quá chật / quá rộng" },
      { term: "comfortable to wear", vi: "thoải mái khi mặc" },
      { term: "go well with something / match something", vi: "hợp với / phối hợp ăn ý với món đồ khác" },
      { term: "dress for the occasion", vi: "ăn mặc phù hợp với dịp" },
      { term: "mix and match", vi: "phối hợp các món đồ để tạo thành trang phục" },
      { term: "a fashion-conscious person", vi: "người quan tâm đến thời trang" },
      { term: "practical and versatile", vi: "thiết thực và dễ phối trong nhiều hoàn cảnh" },
      { term: "a simple / fashionable look", vi: "phong cách đơn giản / hợp thời trang" },
      { term: "second-hand clothes", vi: "quần áo đã qua sử dụng" }
    ]
  },
  {
    id: "voc_26_animals_pets", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 26, topic: "Animals & Pets", title: "Describing Animals & Pets",
    status: "ready", libraryOnly: true,
    target: "Thư viện từ vựng tham khảo — 15 mục. Chưa có bài luyện; không phải cụm bắt buộc phải dùng trong mọi câu trả lời.",
    vocabulary: [
      { term: "raise / adopt a pet", vi: "nuôi / nhận nuôi thú cưng" },
      { term: "a loyal / affectionate companion", vi: "người bạn đồng hành trung thành / tình cảm" },
      { term: "playful / well-behaved", vi: "nghịch ngợm, thích chơi đùa / ngoan ngoãn" },
      { term: "domesticated / wild animals", vi: "động vật đã được thuần hóa / động vật hoang dã" },
      { term: "endangered species", vi: "các loài có nguy cơ tuyệt chủng" },
      { term: "natural habitat", vi: "môi trường sống tự nhiên" },
      { term: "wildlife conservation", vi: "công tác bảo tồn động vật hoang dã" },
      { term: "animal cruelty", vi: "hành vi ngược đãi động vật" },
      { term: "take care of / look after a pet", vi: "chăm sóc thú cưng" },
      { term: "feed / walk a dog", vi: "cho chó ăn / dắt chó đi dạo" },
      { term: "shed fur", vi: "rụng lông" },
      { term: "be allergic to animals", vi: "bị dị ứng với động vật" },
      { term: "protect animals from extinction", vi: "bảo vệ động vật khỏi nguy cơ tuyệt chủng" },
      { term: "protect biodiversity", vi: "bảo vệ đa dạng sinh học" },
      { term: "disrupt food chains", vi: "phá vỡ chuỗi thức ăn" }
    ]
  },
  {
    id: "voc_27_advertising_consumer_influence", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 27, topic: "Advertising & Consumer Influence", title: "Advertising & Consumer Influence",
    status: "ready", libraryOnly: true,
    target: "Từ vựng chủ đề — 15 mục.",
    vocabulary: [
      { term: "persuasive advertising", vi: "quảng cáo có sức thuyết phục" },
      { term: "target audience", vi: "đối tượng mục tiêu" },
      { term: "brand awareness", vi: "mức độ nhận diện thương hiệu" },
      { term: "promote a product", vi: "quảng bá sản phẩm" },
      { term: "influence purchasing decisions", vi: "ảnh hưởng đến quyết định mua hàng" },
      { term: "celebrity endorsement", vi: "việc người nổi tiếng quảng bá sản phẩm" },
      { term: "eye-catching", vi: "bắt mắt" },
      { term: "misleading advertising", vi: "quảng cáo gây hiểu lầm" },
      { term: "appeal to emotions", vi: "đánh vào cảm xúc" },
      { term: "impulse purchase", vi: "món hàng mua bốc đồng" },
      { term: "shape consumer behavior", vi: "định hình hành vi người tiêu dùng" },
      { term: "advertising campaign", vi: "chiến dịch quảng cáo" },
      { term: "targeted advertising", vi: "quảng cáo nhắm đến nhóm đối tượng cụ thể" },
      { term: "raise awareness of something", vi: "nâng cao nhận thức về điều gì" },
      { term: "be exposed to advertisements", vi: "tiếp xúc với quảng cáo" }
    ]
  },
  {
    id: "voc_28_rules_laws_crime", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 28, topic: "Rules, Laws & Crime", title: "Rules, Laws & Crime",
    status: "ready", libraryOnly: true,
    target: "Từ vựng chủ đề — 15 mục.",
    vocabulary: [
      { term: "obey / break the law", vi: "tuân thủ / vi phạm pháp luật" },
      { term: "follow the rules", vi: "tuân thủ quy định" },
      { term: "commit a crime", vi: "phạm tội" },
      { term: "minor / serious offence", vi: "hành vi phạm pháp nhẹ / nghiêm trọng" },
      { term: "law-abiding citizen", vi: "công dân tuân thủ pháp luật" },
      { term: "deter crime", vi: "ngăn chặn hành vi phạm tội" },
      { term: "prevent crime", vi: "phòng chống tội phạm" },
      { term: "impose a fine", vi: "áp dụng hình phạt tiền" },
      { term: "face the consequences", vi: "chịu hậu quả" },
      { term: "serve a prison sentence", vi: "chấp hành án tù" },
      { term: "rehabilitation", vi: "sự cải tạo, phục hồi" },
      { term: "law enforcement", vi: "hoạt động thực thi pháp luật" },
      { term: "public safety", vi: "an toàn công cộng" },
      { term: "take responsibility for one's actions", vi: "chịu trách nhiệm về hành động của mình" },
      { term: "a sense of justice", vi: "ý thức về công lý" }
    ]
  },
  {
    id: "voc_29_history_heritage", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 29, topic: "History & Historical Heritage", title: "History & Historical Heritage",
    status: "ready", libraryOnly: true,
    target: "Từ vựng chủ đề — 13 mục.",
    vocabulary: [
      { term: "historical site", vi: "di tích lịch sử" },
      { term: "historical figure", vi: "nhân vật lịch sử" },
      { term: "preserve historical buildings", vi: "bảo tồn các công trình lịch sử" },
      { term: "restore an ancient monument", vi: "trùng tu di tích cổ" },
      { term: "pass down through generations", vi: "truyền lại qua các thế hệ" },
      { term: "learn from the past", vi: "học hỏi từ quá khứ" },
      { term: "a significant turning point", vi: "bước ngoặt quan trọng" },
      { term: "cultural and historical significance", vi: "ý nghĩa văn hóa và lịch sử" },
      { term: "gain insight into the past", vi: "hiểu sâu hơn về quá khứ" },
      { term: "preserve historical heritage", vi: "bảo tồn di sản lịch sử" },
      { term: "preserve cultural and historical values", vi: "bảo tồn các giá trị văn hóa và lịch sử" },
      { term: "promote cultural and historical values", vi: "phát huy, quảng bá các giá trị văn hóa và lịch sử" },
      { term: "promote national identity", vi: "phát huy bản sắc dân tộc" }
    ]
  },
  {
    id: "voc_30_arts_creativity", category: "lexical", subcategory: "topic-vocabulary", moduleNo: 30, topic: "Arts & Creativity", title: "Arts & Creativity",
    status: "ready", libraryOnly: true,
    target: "Từ vựng chủ đề — 15 mục.",
    vocabulary: [
      { term: "visual arts", vi: "nghệ thuật thị giác" },
      { term: "a work of art", vi: "tác phẩm nghệ thuật" },
      { term: "artistic talent", vi: "tài năng nghệ thuật" },
      { term: "creative expression", vi: "sự thể hiện sáng tạo" },
      { term: "draw inspiration from", vi: "lấy cảm hứng từ" },
      { term: "express oneself through art", vi: "thể hiện bản thân thông qua nghệ thuật" },
      { term: "appreciate a work of art", vi: "thưởng thức / cảm nhận một tác phẩm nghệ thuật" },
      { term: "develop one's creativity", vi: "phát triển khả năng sáng tạo" },
      { term: "think outside the box", vi: "tư duy sáng tạo, vượt khỏi lối mòn" },
      { term: "hands-on activity", vi: "hoạt động thực hành trực tiếp" },
      { term: "artistic skills", vi: "kỹ năng nghệ thuật" },
      { term: "stimulate the imagination", vi: "kích thích trí tưởng tượng" },
      { term: "a source of inspiration", vi: "nguồn cảm hứng" },
      { term: "traditional and contemporary art", vi: "nghệ thuật truyền thống và đương đại" },
      { term: "have an eye for detail", vi: "có con mắt tinh tường với các chi tiết" }
    ]
  },
  /* ---------------- Language Functions 01–08 (category "language") ---------------- */
  {
    id: "fn_01_giving_reasons", category: "language", subcategory: "giving-reasons", moduleNo: 1, topic: "Giving Reasons", title: "Giving Reasons",
    status: "ready", libraryOnly: true, kind: "function",
    purpose: "Explain why someone likes, chooses, believes, or does something.",
    purposeVi: "Giải thích vì sao ai đó thích, chọn, tin hoặc làm một điều gì.",
    target: "Giải thích vì sao ai đó thích, chọn, tin hoặc làm một điều gì. (thư viện cụm diễn đạt gợi ý, chưa có bài luyện.)",
    expressions: [
      { text: "The main reason is that…" },
      { text: "One reason for this is…" },
      { text: "This is largely because…" },
      { text: "Another reason is that…" },
      { text: "This is partly due to…" },
      { text: "That's why…" }
    ],
    examplesNote: "Ví dụ minh họa do hệ thống soạn cho bản đầu — thầy chỉnh lại khi cần.",
    spokenExamples: ["I really like cooking at home. The main reason is that I can choose fresh ingredients, and this is partly due to my budget, too.", "One reason for this is that my hometown is small, so everything is close. That's why I rarely use a car."]
  },
  {
    id: "fn_02_describing_change", category: "language", subcategory: "describing-change", moduleNo: 2, topic: "Describing Change", title: "Describing Change",
    status: "ready", libraryOnly: true, kind: "function",
    purpose: "Describe changes over time, especially past versus present.",
    purposeVi: "Mô tả sự thay đổi theo thời gian, đặc biệt là so sánh quá khứ với hiện tại.",
    target: "Mô tả sự thay đổi theo thời gian, đặc biệt là so sánh quá khứ với hiện tại. (thư viện cụm diễn đạt gợi ý, chưa có bài luyện.)",
    expressions: [
      { text: "It used to…" },
      { text: "It has become more…" },
      { text: "It has changed significantly." },
      { text: "Compared with the past…" },
      { text: "These days…" },
      { text: "Over the years…" },
      { text: "There has been a noticeable change in…" }
    ],
    examplesNote: "Ví dụ minh họa do hệ thống soạn cho bản đầu — thầy chỉnh lại khi cần.",
    spokenExamples: ["It used to be a quiet street, but these days it's full of cafés. It has changed significantly over the years.", "Compared with the past, people have become more dependent on their phones. There has been a noticeable change in the way we communicate."]
  },
  {
    id: "fn_03_describing_feelings", category: "language", subcategory: "describing-feelings", moduleNo: 3, topic: "Describing Feelings", title: "Describing Feelings",
    status: "ready", libraryOnly: true, kind: "function",
    purpose: "Describe emotions and reactions with more precision.",
    purposeVi: "Diễn tả cảm xúc và phản ứng một cách chính xác hơn.",
    target: "Diễn tả cảm xúc và phản ứng một cách chính xác hơn. (thư viện cụm diễn đạt gợi ý, chưa có bài luyện.)",
    expressions: [
      { text: "I find it…" },
      { text: "It makes me feel…" },
      { text: "I was delighted to…" },
      { text: "I felt a sense of…" },
      { text: "I was really impressed by…" },
      { text: "I felt relieved when…" },
      { text: "It left me feeling…" }
    ],
    examplesNote: "Ví dụ minh họa do hệ thống soạn cho bản đầu — thầy chỉnh lại khi cần.",
    spokenExamples: ["I find it relaxing to walk by the river. It makes me feel calm after a busy day.", "I was really impressed by the service there, and I felt relieved when the manager solved the problem quickly."]
  },
  {
    id: "fn_04_giving_examples", category: "language", subcategory: "giving-examples", moduleNo: 4, topic: "Giving Examples", title: "Giving Examples",
    status: "ready", libraryOnly: true, kind: "function",
    purpose: "Support an idea with a concrete example or personal experience.",
    purposeVi: "Hỗ trợ một ý bằng ví dụ cụ thể hoặc trải nghiệm cá nhân.",
    target: "Hỗ trợ một ý bằng ví dụ cụ thể hoặc trải nghiệm cá nhân. (thư viện cụm diễn đạt gợi ý, chưa có bài luyện.)",
    expressions: [
      { text: "For example…" },
      { text: "A good example would be…" },
      { text: "To give you an example…" },
      { text: "In my own experience…" },
      { text: "For instance…" },
      { text: "This can be seen when…" }
    ],
    examplesNote: "Ví dụ minh họa do hệ thống soạn cho bản đầu — thầy chỉnh lại khi cần.",
    spokenExamples: ["I enjoy outdoor activities. For example, last weekend I went hiking with my friends.", "Learning languages isn't easy. In my own experience, practising with native speakers helps a lot, for instance when ordering food abroad."]
  },
  {
    id: "fn_05_comparing", category: "language", subcategory: "comparing", moduleNo: 5, topic: "Comparing", title: "Comparing",
    status: "ready", libraryOnly: true, kind: "function",
    purpose: "Compare people, places, experiences, choices, and time periods.",
    purposeVi: "So sánh người, địa điểm, trải nghiệm, lựa chọn và các giai đoạn thời gian.",
    target: "So sánh người, địa điểm, trải nghiệm, lựa chọn và các giai đoạn thời gian. (thư viện cụm diễn đạt gợi ý, chưa có bài luyện.)",
    expressions: [
      { text: "Compared with…" },
      { text: "Whereas…" },
      { text: "Not as… as…" },
      { text: "Far more… than…" },
      { text: "The main difference is…" },
      { text: "One similarity is that…" },
      { text: "In contrast…" }
    ],
    examplesNote: "Ví dụ minh họa do hệ thống soạn cho bản đầu — thầy chỉnh lại khi cần.",
    spokenExamples: ["Compared with my hometown, the city is far more crowded, whereas the countryside is much quieter.", "The main difference is the pace of life. One similarity is that people in both places are friendly."]
  },
  {
    id: "fn_06_speculating", category: "language", subcategory: "speculating", moduleNo: 6, topic: "Speculating", title: "Speculating",
    status: "ready", libraryOnly: true, kind: "function",
    purpose: "Make reasonable guesses or predictions when the answer is uncertain.",
    purposeVi: "Đưa ra phỏng đoán hoặc dự đoán hợp lý khi chưa chắc về câu trả lời.",
    target: "Đưa ra phỏng đoán hoặc dự đoán hợp lý khi chưa chắc về câu trả lời. (thư viện cụm diễn đạt gợi ý, chưa có bài luyện.)",
    expressions: [
      { text: "I would imagine…" },
      { text: "It might be because…" },
      { text: "Perhaps…" },
      { text: "It's likely that…" },
      { text: "I suppose…" },
      { text: "This could lead to…" },
      { text: "In the future, I think…" }
    ],
    examplesNote: "Ví dụ minh họa do hệ thống soạn cho bản đầu — thầy chỉnh lại khi cần.",
    spokenExamples: ["I would imagine most people prefer online shopping because it saves time. It might be because delivery has become much faster.", "Perhaps schools will use more technology. It's likely that students will learn more independently, and this could lead to new kinds of jobs."]
  },
  {
    id: "fn_07_reflecting", category: "language", subcategory: "reflecting", moduleNo: 7, topic: "Reflecting", title: "Reflecting",
    status: "ready", libraryOnly: true, kind: "function",
    purpose: "Look back on an experience and explain what was learned or how one's perspective changed.",
    purposeVi: "Nhìn lại một trải nghiệm và giải thích mình đã học được gì hoặc góc nhìn đã thay đổi như thế nào.",
    target: "Nhìn lại một trải nghiệm và giải thích mình đã học được gì hoặc góc nhìn đã thay đổi như thế nào. (thư viện cụm diễn đạt gợi ý, chưa có bài luyện.)",
    expressions: [
      { text: "Looking back…" },
      { text: "I've come to realize that…" },
      { text: "It taught me to…" },
      { text: "One thing I learned was…" },
      { text: "If I could do it again…" },
      { text: "Since then, I've…" },
      { text: "It changed the way I think about…" }
    ],
    examplesNote: "Ví dụ minh họa do hệ thống soạn cho bản đầu — thầy chỉnh lại khi cần.",
    spokenExamples: ["Looking back, I'm glad I joined that club. It taught me to be more confident, and since then I've been willing to try new things.", "If I could do it again, I would start earlier. I've come to realize that small efforts really add up."]
  },
  {
    id: "fn_08_giving_opinions", category: "language", subcategory: "giving-opinions", moduleNo: 8, topic: "Giving Opinions", title: "Giving Opinions",
    status: "ready", libraryOnly: true, kind: "function",
    purpose: "State a personal view, qualify a position, or express a degree of certainty.",
    purposeVi: "Nêu quan điểm cá nhân, giới hạn lại quan điểm hoặc thể hiện mức độ chắc chắn.",
    target: "Nêu quan điểm cá nhân, giới hạn lại quan điểm hoặc thể hiện mức độ chắc chắn. (thư viện cụm diễn đạt gợi ý, chưa có bài luyện.)",
    expressions: [
      { text: "Personally, I think…" },
      { text: "From my perspective…" },
      { text: "I'd say that…" },
      { text: "To some extent…" },
      { text: "As far as I'm concerned…" },
      { text: "I tend to think that…" },
      { text: "I wouldn't necessarily say that…" }
    ],
    examplesNote: "Ví dụ minh họa do hệ thống soạn cho bản đầu — thầy chỉnh lại khi cần.",
    spokenExamples: ["Personally, I think public transport should be cheaper. As far as I'm concerned, it would reduce traffic.", "To some extent, social media helps people stay in touch, but I wouldn't necessarily say it makes friendships stronger."]
  }
]);

/* Module numbers → ids (Module 01 and 02 are the existing guided modules). */
window.LU.practice.topicIds = {"1": "lex_atmosphere_01", "2": "lex_personality_01", "3": "voc_03_natural_views", "4": "voc_04_places", "5": "voc_05_experiences_events", "6": "voc_06_skills_achievements", "7": "voc_07_study_education", "8": "voc_08_work_careers", "9": "voc_09_technology_social_media", "10": "voc_10_health_lifestyle", "11": "voc_11_food_eating_habits", "12": "voc_12_travel_tourism", "13": "voc_13_money_shopping", "14": "voc_14_relationships_friendship", "15": "voc_15_hobbies_leisure", "16": "voc_16_books_films_entertainment", "17": "voc_17_cities_environment", "18": "voc_18_culture_traditions", "19": "voc_19_news_media", "20": "voc_20_home_accommodation", "21": "voc_21_family_childhood", "22": "voc_22_daily_routines_time", "23": "voc_23_weather_seasons", "24": "voc_24_transport_getting_around", "25": "voc_25_clothes_fashion", "26": "voc_26_animals_pets", "27": "voc_27_advertising_consumer_influence", "28": "voc_28_rules_laws_crime", "29": "voc_29_history_heritage", "30": "voc_30_arts_creativity"};
window.LU.practice.functionIds = {"1": "fn_01_giving_reasons", "2": "fn_02_describing_change", "3": "fn_03_describing_feelings", "4": "fn_04_giving_examples", "5": "fn_05_comparing", "6": "fn_06_speculating", "7": "fn_07_reflecting", "8": "fn_08_giving_opinions"};

/* Starting links: Mock test number → topic modules and language functions (ids only). Editable; a link never means "must master everything in one mock". */
window.LU.practice.links = {
  1: { title: "Mock 1 — Sports, Hobbies & Daily Life", topics: ["voc_10_health_lifestyle", "voc_15_hobbies_leisure", "voc_05_experiences_events"], functions: ["fn_03_describing_feelings", "fn_01_giving_reasons", "fn_05_comparing", "fn_02_describing_change"] },
  2: { title: "Mock 2 — Technology & Communication", topics: ["voc_09_technology_social_media", "voc_19_news_media"], functions: ["fn_02_describing_change", "fn_08_giving_opinions", "fn_04_giving_examples", "fn_06_speculating"] },
  3: { title: "Mock 3 — People, Teachers & Relationships", topics: ["lex_personality_01", "voc_14_relationships_friendship", "voc_21_family_childhood"], functions: ["fn_03_describing_feelings", "fn_04_giving_examples", "fn_05_comparing", "fn_07_reflecting"] },
  4: { title: "Mock 4 — Places, Travel & The Environment", topics: ["voc_04_places", "voc_12_travel_tourism", "voc_17_cities_environment", "voc_03_natural_views"], functions: ["fn_05_comparing", "fn_01_giving_reasons", "fn_02_describing_change", "fn_08_giving_opinions"] },
  5: { title: "Mock 5 — Education, Skills & Careers", topics: ["voc_07_study_education", "voc_06_skills_achievements", "voc_08_work_careers"], functions: ["fn_01_giving_reasons", "fn_05_comparing", "fn_07_reflecting", "fn_06_speculating"] },
  6: { title: "Mock 6 — Culture, Festivals & Food", topics: ["voc_18_culture_traditions", "voc_11_food_eating_habits", "voc_05_experiences_events", "voc_29_history_heritage"], functions: ["fn_03_describing_feelings", "fn_02_describing_change", "fn_01_giving_reasons", "fn_07_reflecting"] },
  7: { title: "Mock 7 — Shopping, Fashion & Consumer Choices", topics: ["voc_13_money_shopping", "voc_25_clothes_fashion", "voc_27_advertising_consumer_influence"], functions: ["fn_01_giving_reasons", "fn_05_comparing", "fn_08_giving_opinions", "fn_06_speculating"] },
  8: { title: "Mock 8 — Entertainment, Weather & Personal Influence", topics: ["voc_16_books_films_entertainment", "voc_23_weather_seasons", "lex_personality_01", "voc_14_relationships_friendship", "voc_19_news_media", "voc_30_arts_creativity"], functions: ["fn_03_describing_feelings", "fn_04_giving_examples", "fn_01_giving_reasons", "fn_07_reflecting"] },
  9: { title: "Mock 9 — Transport, Animals & Places in the City", topics: ["voc_24_transport_getting_around", "voc_17_cities_environment", "voc_26_animals_pets", "voc_04_places", "voc_28_rules_laws_crime"], functions: ["fn_08_giving_opinions", "fn_01_giving_reasons", "fn_05_comparing", "fn_06_speculating"] }
};
