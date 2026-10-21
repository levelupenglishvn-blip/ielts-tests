# Tích hợp Apps Script — extension bổ sung, không thay backend cũ

Repository gốc chỉ chứa frontend. `js/config.js` vẫn trỏ tới deployment Apps Script
đang chạy; URL, auth, scoring và các API Lexis được giữ nguyên.

## Phụ thuộc cần xác minh trong backend đang phục vụ thực tế

Extension dùng các hàm host: `whoIs_(token)`, `requireTeacher_(token)`,
`findStudent_(id)`, `statesFor_(studentId)`, `toWeek_(week)`, `ss_()`, `ApiError`.
Chỉ tích hợp vào đúng project nguồn đang triển khai sau khi đối chiếu các hợp đồng này.
Không thay Code.gs bằng một bản cũ và không chạy lại setup() của tracker để thêm dữ liệu phát âm.

Thêm hai file `backend/PronunciationData.gs`, `backend/Pronunciation.gs` vào project
nguồn hiện hành. Trong `doPost`, sau khi parse JSON và trước khi tra ACTIONS cũ, thêm:

```js
const pn = pronunciationActions_();
if (req && typeof req.action === 'string' && Object.prototype.hasOwnProperty.call(pn, req.action)) {
  return respond_({ ok: true, data: pn[req.action](req) });
}
```

Giữ nguyên catch lỗi của doPost và mọi route cũ. Tạo version/deployment mới cho cùng
Web App để frontend không cần đổi URL. Kiểm tra với tài khoản/học viên thử được chỉ định,
không dùng dữ liệu học viên thật để chạy test ghi.

## Lưu trữ và quyền

- `Pronunciation Sessions`: theo Student ID + Week; confirmed JSON, revision, request ID.
- `Pronunciation Retests`: lịch sử append-only, theo attempt ID, học viên, tuần nguồn và tuần kiểm tra.
- Chỉ tạo hai sheet mới khi cần ghi; nếu sheet trùng tên nhưng header khác thì dừng,
  không ghi đè header hoặc dữ liệu. Không sửa các sheet hiện có.
- Chỉ teacher lưu lỗi và kết quả kiểm tra. Student ID của student lấy từ token trên
  server, bỏ qua studentId gửi từ client. Chỉ lỗi ở mock đã hoàn thành được trả cho học viên.
- CAS revision + ScriptLock chống ghi đè giữa tab; request ID giữ việc retry idempotent.
- Bỏ chọn lỗi là thao tác rõ ràng của giáo viên. Sửa note không xóa confirmed; lịch sử
  kiểm tra không bị xóa khi bỏ chọn lỗi.

## Khi backend chưa được kích hoạt

Frontend vẫn cho dùng marking, điểm số, feedback và Lexis cũ. Phần xác nhận
Pronunciation mới bị khóa và báo backend chưa hỗ trợ; không giả vờ đã lưu lỗi và
không rơi về localStorage như một cơ sở dữ liệu chung. Bản nháp lỗi đã có được giữ
trong draft của đúng học viên/mock và yêu cầu đối chiếu khi phát hiện xung đột.

Nội dung module chưa được cung cấp: registry phát âm để trống có chủ đích, không
thay thế thư viện đang có bằng placeholder. Engine cá nhân hóa sẵn sàng dùng ngay
khi module có quy tắc, theory, Core practice và retest hợp lệ được nạp.
