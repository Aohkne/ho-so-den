# Hồ Sơ Đen — trạng thái & việc còn lại

Xem [SPEC.md](SPEC.md) cho thiết kế đầy đủ, [README.md](../README.md) cho
cách chạy và cấu trúc thư mục.

## Đã xong

- [x] Đủ luồng màn hình: TITLE → BRIEFING → ROOM → CASE FILE → SEARCH →
      BOARD → ACCUSE → VERDICT → **ENDING** (mới, sau khi khép vụ 07).
- [x] **Cả 7 vụ án** viết đầy đủ nội dung, đã giải thử được (xem
      `src/data/cases/case-01.ts` … `case-07.ts`).
- [x] Đổi tên game — không còn dùng "Kho Hồ Sơ 001" làm thương hiệu chính,
      giờ là **Hồ Sơ Đen**.
- [x] Xóa `package-lock.json`, chỉ dùng `bun.lock`.
- [x] Tái cấu trúc theo kiến trúc feature-driven (`src/data/`,
      `src/features/scene-room|investigation|portraits|audio/`).
- [x] Chân dung nhân vật **tiền-render lúc build/dev** ra
      `public/portraits/*.svg` (`scripts/generate-portraits.ts`, gắn vào
      `predev`/`prebuild`) — không còn vẽ SVG runtime trong trình duyệt.
- [x] Xóa toàn bộ nội dung/nghiên cứu liên quan tới ammarmunir.com (đã dọn
      `NOTE.md` và các tham chiếu).
- [x] `portfolio.html` bị xóa, thay bằng dialog "Hướng dẫn chơi" trong app
      (`#guide-dialog`, mở bằng nút ở màn tiêu đề).
- [x] README, CI (`.github/workflows/ci.yml`: typecheck + build qua Bun),
      SPEC và TODO viết lại.
- [x] 4 chỗ giấu tang vật (`under-desk`, `evidence-box`, `floor-key`,
      `crumpled-note`) thay vì 2 — mỗi vụ dùng một cặp khác nhau.
- [x] Bundle tách `three` ra vendor chunk riêng (`manualChunks` trong
      `vite.config.ts`) — 468 kB three.js tách khỏi 85 kB code game.
- [x] `touch-action: none` trên `#world` để kéo-nhìn-quanh không bị trình
      duyệt di động cướp thành cuộn trang.
- [x] **Đèn bàn bấm được** — click vào chụp đèn để bật/tắt, ở bất kỳ màn
      nào (không phụ thuộc `mode` như ngăn kéo/vật giấu manh mối). Xem
      `ArchiveScene.pickLamp()` trong `scene.ts` và `setLampOn`/`isLampOn`
      trong `props.ts`. Có tiếng tách công tắc riêng (`audio.switchClick()`).
- [x] **Responsive di động/tablet**: breakpoint riêng cho tablet (≤1024px),
      thanh công cụ điều tra (`.case-tools`) xếp cột rõ ràng trên màn hẹp
      thay vì để flex-wrap tự đoán (đã từng ra kết quả sai — xem mục "chỗ
      dễ vấp" #10), vùng chạm to hơn cho thiết bị cảm ứng
      (`@media (hover:none),(pointer:coarse)`), `100dvh` cho trình duyệt di
      động hỗ trợ, và điều chỉnh cho màn hình thấp (điện thoại nằm ngang).
- [x] **Vật giấu manh mối "lộ" đúng hình dạng thật, có texture riêng, khi
      bấm vào** — trước khi thu thập chỉ là một khối chung (giấy/hộp/chìa
      khóa/giấy vò); bấm vào thì đổi hẳn hình + vật liệu sang đúng dạng tang
      vật, kèm một cú "bung ra" từ nhỏ lên cỡ thật. 8 loại hình
      (`EvidenceShapeKind` ở `data/case-types.ts`): `button` (đĩa tròn có 4
      lỗ chỉ), `ring`/`loop` (hình xuyến vàng/bạc, nằm phẳng), `photo` (khung
      polaroid có hình minh họa thật — chân trời + bóng người, không phải
      màu trơn), `paper` (tài liệu có dòng kẻ mờ), `book` (bìa da có nhãn),
      `bar` (thanh/vỏ đạn kim loại), `roll` (cuộn phim có vòng tua đồng tâm +
      lỗ tua phim quanh cạnh — dáng cuộn phim 35mm thật). Xem
      `buildEvidenceVisual()` trong `props.ts` và trường `shape` trên 14
      tang vật giấu trong phòng (`data/cases/case-01.ts` … `case-07.ts`).

## Còn để ngỏ (không phải thiếu sót — quyết định có chủ đích)

- Không có nút xóa tiến trình riêng từng phần. "ĐIỀU TRA MỚI" ở màn tiêu đề
  là cách reset duy nhất, và với một game anthology 7 vụ thì reset toàn bộ
  là đủ — thêm UI xóa từng vụ sẽ phức tạp hơn cái nó giải quyết.
- 6 hình dạng (`button`/`ring`/`paper`/`book`/`bar`/`roll`) là khối hình học
  cơ bản (cylinder/torus/box), không phải model chi tiết — đủ để phân biệt
  "đây là gì" nhưng không có texture/vân bề mặt riêng.
- Chưa test trên thiết bị cảm ứng thật (chỉ đảm bảo `touch-action`/Pointer
  Events + `@media (hover:none),(pointer:coarse)` đúng về mặt kỹ thuật, chưa
  cầm điện thoại/tablet thật để thử).

## Những chỗ dễ vấp (đã trả giá thật khi dựng game này)

1. `#experience` **không được** có `position: relative` + `z-index`. Làm
   vậy nó tạo stacking context riêng, khiến z-index của con không bao giờ
   so được với `.hud` / `.status-bar` bên ngoài (từng làm nút pager bị
   footer che, không click được).
2. `style.css` có rule chặn `[hidden] { display: none !important }`. Giữ
   nguyên — nếu một class khác set `display`, nó sẽ vô hiệu hóa thuộc tính
   `hidden` (bug từng gặp với `.room-label`).
3. Overlay phủ toàn màn phải `pointer-events: none`, chỉ bật `auto` ở phần
   tử tương tác — nếu không sẽ chặn sạch raycast xuống canvas WebGL.
4. Canvas/SVG chỉ vẽ đúng font **sau khi font tải xong** — `main.ts` phải
   gọi `document.fonts.load()` với chuỗi mẫu có dấu (`ẤỆỘỢỮỰ`) thì Google
   Fonts mới tải đúng subset `vietnamese`. DM Sans/DM Mono/Instrument
   Serif (bản mẫu ban đầu) **không có** subset này — đã đổi sang Be
   Vietnam Pro / IBM Plex Mono / Playfair Display.
5. Phím tắt toàn cục phải bỏ qua khi có `dialog[open]` — nếu không Escape
   vừa đóng dialog vừa đóng luôn màn phía sau.
6. Vật giấu manh mối phải nằm **ngoài hình chiếu mặt bàn**, nếu không mặt
   bàn che mất khi camera nhìn từ trên xuống ở chế độ khám xét.
7. Dây trên bảng chứng cứ phải nằm **trên** các tấm thẻ (`z-index: 2` trên
   SVG), nếu không thẻ che gần hết đoạn dây.
8. **Vật giấu manh mối phải ẨN theo mặc định, chỉ hiện đúng 2 vật thuộc vụ
   án đang mở** (`scene.enterSearch(activePropIds)`). Nếu hiện tất cả bốn
   vị trí luôn luôn, vụ này lộ tang vật của vụ khác, và vài vị trí có thể
   nằm ngoài khung camera của `SEARCH_SHOT` — khiến người chơi không thể
   tìm đủ chứng cứ bắt buộc để luận tội (đã tự bắt được lỗi này qua
   Playwright, không phải qua đọc code).
9. Script tiền-render chân dung (`scripts/generate-portraits.ts`) import
   trực tiếp `src/features/portraits/portraits.ts` — module đó **không có
   phụ thuộc DOM nào** (chỉ ghép chuỗi SVG), nên chạy được thẳng trong Node
   qua `bun run` mà không cần jsdom/canvas polyfill nào cả.
10. Đừng để `.case-tools` tự `flex-wrap` không kiểm soát trên màn hẹp — khi
    container bị flex-shrink trước khi wrap, mỗi nút con có thể bị bóp hẹp
    tới mức rơi xuống dòng riêng của chính nó, xếp thành một cột cao đè lên
    nội dung phía sau (đã tự bắt được lỗi này qua ảnh chụp Playwright thực
    tế, không phải chỉ tính toán trên giấy). Ép rõ `flex-direction:column`
    + để mỗi nhóm con chiếm `width:100%` mới cho wrap đúng ý.
11. Khi thêm state mới cho một vật thể 3D (như hình dạng "lộ ra"), đổi
    `mesh.geometry`/`mesh.material` trực tiếp được — không cần dựng lại cả
    mesh — miễn tham số hàm nhận `THREE.Mesh` không parameterize generic cụ
    thể (mặc định là `Mesh<BufferGeometry, Material|Material[]>`, nhận mọi
    geometry/material con, kể cả mảng multi-material).
12. **Vật thể dùng lại giữa nhiều "vụ việc" (state khác nhau theo thời gian)
    phải tự RESET khi chuyển ngữ cảnh — không được ngầm định nó luôn ở
    trạng thái ban đầu.** Bug thật đã gặp: `reveal()` đổi hẳn geometry +
    material của 1 trong 4 vật giấu chung; khi vụ sau tái dùng đúng vật đó
    (roomProp trùng), nó thừa kế luôn hình dạng vụ trước để lại — vừa lộ sai
    hình ngay từ đầu, vừa có thể làm vùng bấm bị co nhỏ nếu hình cũ (như
    nhẫn) nhỏ hơn khối gốc, khiến vụ sau **không thể tìm đủ chứng cứ để
    luận tội**. Test tự động (Playwright chạy tuần tự 7 vụ) bắt được lỗi
    này chính xác vì nó lặp lại 100% ở đúng một vụ — một dấu hiệu đáng tin
    rằng lỗi nằm ở STATE RÒ RỈ giữa các lần chạy, không phải ngẫu nhiên.
    Sửa bằng `SearchProp.reset()`, gọi mỗi khi rời khỏi một vụ
    (`hideAllSearchProps()` trong `scene.ts`).
