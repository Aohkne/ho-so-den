# Hồ Sơ Đen — SPEC

## Tổng quan

Game trinh thám giải đố, 3D, một người chơi, chạy trong trình duyệt.
Bối cảnh: một thành phố Mỹ hư cấu, giữa thập niên 1950, phong cách noir.
Người chơi vào vai một điều tra viên mới được giao "phòng án tồn đọng" —
một căn phòng lưu trữ với hai tủ hồ sơ, bảy ngăn kéo, bảy vụ án chưa ai
khép lại. Sáu vụ độc lập; vụ thứ bảy (niêm phong) chỉ mở khi đã khép lại
đủ sáu vụ kia, và kể câu chuyện nối liền tất cả.

## Vòng lặp chơi

```
TITLE → BRIEFING → ROOM (chọn vụ) → CASE FILE (đọc + thu chứng cứ)
                       ▲                    │
                       │                    ├──► SEARCH (khám xét phòng)
                       │                    ├──► BOARD (bảng chứng cứ)
                       │                    └──► ACCUSE → VERDICT ──┐
                       └───────────────────────────────────────────┘
                                  đủ 6 mảnh → mở vụ 07 → ENDING
```

- **ROOM**: cảnh 3D — hai tủ hồ sơ (Three.js, dựng từ khối hình cơ bản),
  mỗi ngăn kéo là một vụ án, nhãn hiện trạng thái (chưa giải / đang điều
  tra / đã khép lại / niêm phong). Rê chuột mở ngăn kéo, bấm để mở hồ sơ.
- **CASE FILE**: 4 thẻ — Tóm tắt (nhiều trang, có pager), Chứng cứ (bấm để
  thu), Nghi phạm (có chân dung), Lời khai.
- **SEARCH**: mỗi vụ giấu 2 tang vật không nằm trong hồ sơ, phải tìm trong
  chính phòng lưu trữ (camera hạ xuống gần sàn/bàn, vật đáng lục phát sáng).
  Trước khi bấm vào, mỗi vật chỉ là một khối chung; bấm vào thì nó "lộ" ra
  đúng hình dạng thật của tang vật (cúc áo → đĩa tròn dẹt, nhẫn cưới → hình
  nhẫn, sổ tay → hình sách...), kèm một cú bung nhẹ từ nhỏ lên cỡ thật.
- **BOARD**: ghim mọi tang vật đã thu, nối hai tấm thẻ để căng dây — cặp
  đúng cho ra một dòng suy luận.
- **ACCUSE**: chọn AI / BẰNG CÁCH NÀO / VÌ LẼ GÌ trong ba ô, mỗi ô có vài
  lựa chọn. Chỉ mở được khi đã thu đủ chứng cứ bắt buộc của vụ.
- **VERDICT**: đúng cả ba → khép lại vụ, nhận một mảnh manh mối. Sai → báo
  số ô đúng (không nói ô nào), tăng bộ đếm sai; sai 3 lần thu hồi hồ sơ tạm
  thời (đọc lại + mở lại để xóa bộ đếm, không mất tiến trình đã thu).
- **ENDING**: chỉ xuất hiện sau khi khép lại vụ 07 (vụ cuối).

## Cấp bậc

Tính theo tổng số lần luận tội sai trong toàn bộ ván chơi:

| Số lần sai | Cấp bậc |
|---|---|
| 0 | Thám tử hạng nhất |
| 1 | Thám tử |
| 2 | Thám tử tập sự |
| ≥3 | Nhân viên lưu trữ |

## Lưu tiến trình

`localStorage`, key `archive-save-v1` (xem `src/features/investigation/state.ts`).
Lưu: tang vật đã thu theo từng vụ, cặp đã nối trên bảng chứng cứ, vụ đã khép,
số lần sai, mảnh manh mối đã có. Nút "ĐIỀU TRA MỚI" ở màn tiêu đề xóa toàn bộ
và bắt đầu lại — đây là cách reset duy nhất, có chủ đích (không cần nút xóa
riêng từng phần cho một game anthology 7 vụ).

## Nội dung: bảy vụ án

Mỗi vụ (`src/data/cases/case-0N.ts`) gồm: 2 trang tóm tắt, 4 nghi phạm (mỗi
người 1 chân dung), 7 tang vật (5 trong hồ sơ + 2 giấu trong phòng), 4 lời
khai, 4 cặp liên kết cho bảng chứng cứ, 3 thủ đoạn + 3 động cơ (1 đúng mỗi
loại), và một mảnh manh mối thưởng khi phá án.

Sợi chỉ nối toàn bộ: một ký tắt "C.W." xuất hiện rải rác trong sáu vụ đầu
(một cổ đông giấu mặt, một chữ ký trong sổ sách, một cái tên trong ghi chú
của nạn nhân) — vụ 07 (niêm phong) là hồ sơ của thám tử tiền nhiệm, Cormac
Wade, người đã ghép sáu manh mối này lại và biến mất. "C.W." hóa ra là
Cornelius Wren, và bằng chứng cuối cùng (một chiếc cúc măng-sét khắc tên
ông ta) được tìm thấy ngay trong chính ngăn kéo niêm phong.

1. **NGỌN ĐÈN TẮT LÚC 21:47** — kế toán trưởng bị đầu độc, thư ký riêng che
   giấu vụ biển thủ.
2. **NGƯỜI ĐÀN BÀ Ở BẾN 9** — ca sĩ phòng trà bị đẩy xuống bến, hôn phu giấu
   chuyện đã có vợ ở cảng khác.
3. **BA PHÁT SÚNG, HAI VỎ ĐẠN** — chủ sòng bạc bị bắn, vợ cũ giấu hôn thú
   chưa hủy để giữ cổ phần.
4. **KHÁCH TRỌ PHÒNG 4B** — nhà báo bị đầu độc bằng khí gas để ngăn công bố
   bài điều tra mạng lưới rửa tiền.
5. **CHUYẾN TÀU KHÔNG NGƯỜI LÁI** — người lái tàu bị đẩy khỏi buồng lái vì
   giữ khoang hàng chứa sổ sách bí mật.
6. **BỨC ẢNH CHỤP LÚC RẠNG SÁNG** — nhiếp ảnh gia bị đầu độc trong phòng tối
   để thu hồi một bức ảnh chụp cuộc trao đổi bí mật.
7. **HỒ SƠ NIÊM PHONG** — hồ sơ của Cormac Wade, mở khi đủ 6 mảnh; Cornelius
   Wren là mạng lưới đứng sau tất cả.

## Kỹ thuật

- **Vite + TypeScript**, không framework UI (DOM thuần).
- **Three.js** cho cảnh phòng lưu trữ (tủ hồ sơ, ngăn kéo trượt, bàn, đèn,
  hệ camera-shot lerp mượt giữa các góc nhìn định trước). Đèn bàn bấm được
  để bật/tắt ở bất kỳ màn nào (không gắn theo trạng thái chơi hiện tại).
- **Web Audio API** thuần cho âm thanh (không file nhạc).
- **Responsive**: breakpoint riêng cho tablet (≤1024px) và điện thoại
  (≤650px, ≤380px), cộng `@media (hover:none),(pointer:coarse)` để tăng
  vùng chạm trên thiết bị cảm ứng bất kể kích thước màn hình.
- Chân dung nhân vật: SVG vẽ tay (`src/features/portraits/portraits.ts`),
  **tiền-render lúc build/dev** ra `public/portraits/*.svg` — không vẽ lại
  trong trình duyệt của người chơi (xem `scripts/generate-portraits.ts`).
- Font: Be Vietnam Pro / IBM Plex Mono / Playfair Display — cả ba đều có
  subset `vietnamese` (DM Sans/DM Mono/Instrument Serif của bản mẫu ban đầu
  thì không, xem lịch sử trong `docs/TODO_IMPLEMENT.md`).
