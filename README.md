# Hồ Sơ Đen

Game trinh thám 3D dựng bằng Vite + TypeScript + Three.js. Mỗi ngăn kéo trong
phòng lưu trữ là một vụ án: đọc hồ sơ, thu chứng cứ, khám xét phòng, nối manh
mối trên bảng chứng cứ, rồi luận tội. Bảy vụ án độc lập cho bảy mảnh manh mối
— đủ sáu mảnh sẽ mở được ngăn kéo niêm phong cuối cùng.

## Chạy thử

Yêu cầu [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

Mở `http://localhost:5173`.

## Script

| Lệnh | Việc gì |
|---|---|
| `bun run dev` | Chạy dev server (tự sinh chân dung trước qua `predev`) |
| `bun run build` | Build production vào `dist/` (tự sinh chân dung trước qua `prebuild`) |
| `bun run preview` | Xem thử bản build |
| `bun run typecheck` | `tsc -b`, không build |
| `bun run gen:portraits` | Tiền-render chân dung nhân vật ra `public/portraits/*.svg` |

## Cấu trúc (feature-driven)

```
src/
  main.ts                    entry point
  data/                      nội dung game (không chạm DOM/Three.js)
    case-types.ts            interface CaseFile/Suspect/Evidence/...
    characters.ts            định nghĩa chân dung (skin/hair/face/...) theo id
    cases/                   một file .ts cho mỗi vụ án + index.ts gộp lại
  features/
    scene-room/              phòng 3D: tủ hồ sơ, bàn, camera, raycasting
    investigation/           vòng chơi: state lưu tiến trình, flow điều màn hình,
                              board (bảng chứng cứ dây đỏ)
    portraits/                bộ sinh chân dung SVG (portraits.ts, chỉ dùng bởi
                              script build-time) + portrait-assets.ts (runtime,
                              chỉ trả URL — không vẽ lại trong trình duyệt)
    audio/                    âm thanh tổng hợp bằng Web Audio API
  styles/style.css
scripts/
  generate-portraits.ts       đọc data/characters.ts, ghi public/portraits/*.svg
public/portraits/             sinh tự động, không commit (xem .gitignore)
```

Chân dung nhân vật được **tiền-render một lần** lúc `dev`/`build` (script
`gen:portraits`, gắn vào `predev`/`prebuild`) rồi lưu thành file tĩnh trong
`public/portraits/`. Trình duyệt chỉ tải file `.svg` có sẵn qua `<img src>` hoặc
texture 3D — không vẽ lại SVG mỗi lần người chơi mở trang.

## Thêm một vụ án mới

1. Thêm chân dung nhân vật (nạn nhân + nghi phạm) vào `src/data/characters.ts`.
2. Tạo `src/data/cases/case-XX.ts` theo khuôn `CaseFile` (`src/data/case-types.ts`)
   — xem `case-01.ts` làm mẫu: 2 trang tóm tắt, 4 nghi phạm, 5 chứng cứ trong hồ
   sơ + 2 chứng cứ giấu trong phòng (`source: "room"`, `roomProp` là một trong
   `"under-desk" | "evidence-box" | "floor-key" | "crumpled-note"`), lời khai,
   các cặp `links` cho bảng chứng cứ, 3 lựa chọn `methods`/`motives`, và
   `solution`.
3. Thêm vào mảng `cases` trong `src/data/cases/index.ts`.
4. Gán `slot: { cabinet, drawer }` — mỗi ô trong 2 tủ (4 ngăn + 3 ngăn) chỉ
   dùng cho một vụ.

## Những chỗ dễ vấp

Xem [docs/TODO_IMPLEMENT.md](docs/TODO_IMPLEMENT.md) — phần "Những chỗ dễ vấp"
ghi lại các lỗi thật đã gặp khi dựng game này (stacking context CSS, thuộc
tính `[hidden]` bị vô hiệu, raycast bị overlay chặn, font tiếng Việt trên
canvas, vật giấu bị mặt bàn/HUD che...).
