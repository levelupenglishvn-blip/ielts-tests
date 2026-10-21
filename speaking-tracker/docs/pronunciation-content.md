# Format nội dung Pronunciation — v1

Chuẩn: `pronunciation-module.schema.json`. Nội dung thật được nạp trong
`data/pronunciation-modules.js` bằng `LU.pronunciation.registerModules([...])`.
Không nạp file ví dụ vào production, không đưa dữ liệu học viên vào file nội dung công khai.

## Hợp đồng dữ liệu

- `schemaVersion: 1`, `ipa: "en-GB"`. Giữ ID module, rule, từ/câu, media và retest ổn định.
- `rules[].issueIds` tham chiếu 97 ID trong `data/pronunciation-taxonomy.json`.
- `rules[].evidenceRuleIds` phải khớp quy tắc đã có trong mapping. Trùng phụ âm chưa đủ để liên kết với một module có điều kiện hình thái.
- `core.theory`: `{id,title,text}`; nội dung chữ thuần, không HTML.
- `core.practice`: `{id,ruleId,target,sentence}`; nội dung chuẩn dùng chung, không sửa theo học viên.
- `media`: `{id,type,label,url}`, chỉ HTTPS. UI mở tài nguyên theo yêu cầu, không tự phát media hoặc thu âm.
- `retest`: `{id,ruleId,prompt}`; câu hỏi giáo viên dùng để kiểm tra lại.
- ID nội bộ duy nhất trong module, kể cả giữa rule, theory, practice, media và retest.

Ví dụ riêng cho đuôi số nhiều /ɪz/: module khai báo issue `final_z` và evidence rule
`plural_iz`. `advantages` và `places` có metadata phù hợp; một từ chỉ có /z/ ở cuối
không tự động được đưa vào module này. Đây là rule của module, không thêm nhãn lỗi
mới vào danh mục đã duyệt. Không có `cluster_kt` trong taxonomy.

`Personalized practice` là phép chiếu từ lỗi đã xác nhận của đúng học viên và các
mock đã hoàn thành; khử trùng theo module + rule + từ, giữ các tuần nguồn. Câu ví dụ
được lấy từ bảng mapping đã biên soạn, không suy luận từ chính tả hoặc dùng một câu
máy móc cho từ chưa biết. Các từ khóa `stress`, `rhythm`, `intonation`, `pausing` là
quan sát về cách nói; chúng không được biến thành bài đọc chính từ khóa đó.

Danh mục và mapping có một nguồn duy nhất: JSON. Sau khi cập nhật chạy:

```sh
node speaking-tracker/tools/build-pronunciation.cjs
node --test speaking-tracker/tests/*.test.cjs
```

Không đổi schema v1 hoặc ID đã phát hành chỉ để sửa câu chữ. Thay đổi cấu trúc cần
version mới và migration rõ ràng; thay nội dung không đụng UI hay dữ liệu cá nhân.
