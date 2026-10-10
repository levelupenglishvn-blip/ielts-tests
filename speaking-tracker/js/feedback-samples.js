/* feedback-samples.js — convenience phrases for the teacher. They are NEVER required and NEVER auto-filled:
 * the teacher clicks one to add it as a line, edits it, deletes it, or writes everything from scratch.
 * To change the wording, edit this file only. Keys: <criterion id> -> { positive: [...], improvement: [...] } */
(function () {
  'use strict';
  window.LU.FB_SAMPLES = {
    fluency: {
      positive: ['Trôi chảy xuyên suốt', 'Duy trì được tốc độ nói khá ổn định', 'Phát triển câu trả lời đủ độ dài', 'Có khả năng mở rộng câu trả lời', 'Ý tưởng nhìn chung rõ ràng'],
      improvement: ['Ngập ngừng nhiều', 'Nói chậm', 'Trả lời cụt', 'Ý chưa rõ', 'Ý rời rạc', 'Lặp ý', 'Khó phát triển câu trả lời', 'Chuyển ý chưa tự nhiên']
    },
    vocabulary: {
      positive: ['Sử dụng được từ vựng phù hợp chủ đề', 'Có khả năng diễn đạt lại', 'Sử dụng được một số collocations tự nhiên', 'Có khả năng sử dụng từ vựng cụ thể', 'Có vốn từ đủ để phát triển câu trả lời'],
      improvement: ['Khó gọi từ', 'Từ vựng hạn chế', 'Lặp từ', 'Dùng sai từ', 'Khó diễn đạt lại', 'Dùng từ quá chung', 'Collocation chưa tự nhiên', 'Chưa sử dụng được từ vựng phù hợp chủ đề']
    },
    grammar: {
      positive: ['Sử dụng được nhiều cấu trúc câu cơ bản chính xác', 'Có cố gắng sử dụng câu phức', 'Có khả năng kết hợp nhiều dạng câu', 'Một số cấu trúc phức được sử dụng chính xác'],
      improvement: ['Lỗi cơ bản', 'Thì', 'Giới từ', 'Chia động từ', 'Cấu trúc câu', 'Dạng từ', 'Câu phức chưa chính xác', 'Lặp lại một dạng cấu trúc câu']
    },
    pronunciation: {
      positive: ['Phát âm nhìn chung rõ ràng', 'Người nghe dễ hiểu', 'Có sử dụng sentence stress tương đối tốt', 'Trọng âm từ nhìn chung ổn', 'Có cố gắng sử dụng intonation'],
      improvement: ['Âm chưa rõ', 'Âm cuối', 'Trọng âm từ', 'Trọng âm câu', 'Nối âm', 'Ngữ điệu']
    }
  };
})();
