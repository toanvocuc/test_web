# Baans — bản web responsive

Bản dựng lại phần **Trang chủ** và phần **Làm bài test** của [baansglobal.org](https://baansglobal.org),
chạy tốt từ điện thoại 320px lên màn hình desktop, và **trả kết quả ngay** sau câu cuối cùng.

Toàn bộ là HTML/CSS/JS thuần — không framework, không build, không backend.
Mở `index.html` bằng trình duyệt là chạy.

## Có gì trong này

| Trang | Mô tả |
| --- | --- |
| `index.html` | Trang chủ: hero, chọn bài test, 16 nhóm tính cách, câu hỏi thường gặp |
| `lam-bai.html?bai=7-muc` | Bài thang 7 mức — 32 câu |
| `lam-bai.html?bai=ab` | Bài lựa chọn A/B — 50 câu |

Phần đăng nhập / đăng ký **chưa làm**, đúng như yêu cầu.

## Cách làm bài và nhận kết quả

1. Mỗi màn hiện **một câu**, chọn xong tự chuyển sang câu kế (`← Câu trước` để quay lại sửa).
2. Trả lời xong câu cuối là ra kết quả luôn, không cần bấm nộp bài.
3. Kết quả gồm: mã 4 chữ, tên nhóm, **4 thanh trục kèm phần trăm**, điểm mạnh,
   điều đáng để ý, điều có thể thử, và bảng xem lại toàn bộ câu trả lời.
4. Nút **Sao chép link kết quả** tạo link dạng
   `lam-bai.html?bai=7-muc#kq=7-muc-32-74-39-57` — mở link đó là vào thẳng kết quả.

Bỏ dở giữa chừng thì lần sau vào lại sẽ có nút *Tiếp tục* ở đúng câu đang làm.

## Cách tính điểm

Bốn trục: `E/I`, `S/N`, `T/F`, `J/P`. Mỗi trục cho ra **phần trăm nghiêng về cực đầu**
(E, S, T, J); từ 50% trở lên thì lấy cực đầu, dưới 50% lấy cực sau.

- **Bài 7 mức**: mỗi câu quy về `-3…+3` (4 = trung lập), đảo dấu nếu câu nghiêng về cực sau.
  Mỗi trục có đúng 8 câu.
- **Bài A/B**: phương án **A luôn ứng với cực đầu**, B ứng với cực sau. Đếm số lần chọn.

Logic nằm ở hàm `score()` trong `assets/js/quiz.js`.

## Phần responsive

- Viết theo hướng mobile-first, cỡ chữ và khoảng cách dùng `clamp()` nên co giãn mượt,
  ít phải cắt breakpoint.
- Thang 7 mức là hàng 7 nút tròn to nhỏ dần vào giữa, vừa khít màn hình **320px**.
- Lựa chọn A/B: xếp dọc trên điện thoại, hai cột trên màn rộng.
- Menu thu thành nút hamburger dưới 900px.
- Có tính `env(safe-area-inset-*)` cho iPhone có tai thỏ.
- Nút bấm cao tối thiểu 46–50px cho dễ chạm.

## Giao diện

- Màu giữ theo tông gốc của Baans: xanh rêu `#1e3a30`, tím `#6b5c7f`, nền giấy ấm `#fbfaf6`.
- Chữ: **Fraunces** cho tiêu đề, **Be Vietnam Pro** cho nội dung — cả hai đều có bộ ký tự tiếng Việt đầy đủ.
- Có **chế độ tối**, tự theo hệ điều hành và đổi tay được bằng nút ☾ / ☀ ở góc phải.
- Tôn trọng `prefers-reduced-motion`; in ra giấy/PDF thì tự ẩn các thanh điều hướng.

## Chạy thử ở máy

```bash
python -m http.server 8000
# rồi mở http://127.0.0.1:8000
```

Cần chạy qua server (không mở thẳng `file://`) vì code dùng ES module.

## Kiểm thử

Mở hai trang này trong trình duyệt, chúng tự chạy và in kết quả:

- `kiem-thu/kiem-thu-chuc-nang.html` — làm trọn cả hai bài bằng script, đối chiếu
  mã kết quả với nhóm mục tiêu, kiểm link chia sẻ và chức năng tiếp tục bài dở.
- `kiem-thu/kiem-tra-tran-ngang.html` — dò tràn ngang ở 320 / 360 / 390 / 414 / 768 / 1024 / 1440px
  cho cả 5 màn, chỉ đích danh phần tử nào thò ra ngoài.

## Ghi chú

Nội dung câu hỏi lấy từ chính baansglobal.org. Đây là công cụ tự khám phá,
không phải chẩn đoán tâm lý hay đánh giá năng lực.
