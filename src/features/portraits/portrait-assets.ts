/**
 * Truy cập chân dung nhân vật lúc chạy — KHÔNG vẽ lại SVG trong trình duyệt.
 * Ảnh đã được `scripts/generate-portraits.ts` tiền-render sẵn ra
 * `public/portraits/<id>.svg` lúc `bun run dev`/`build` (xem package.json).
 */

/** Đường dẫn tĩnh tới chân dung — dùng cho `<img src>`. */
export function portraitUrl(id: string): string {
  return `/portraits/${id}.svg`;
}

const imageCache = new Map<string, Promise<HTMLImageElement>>();

/**
 * Nạp (và cache) một chân dung dưới dạng HTMLImageElement đã sẵn sàng vẽ lên
 * canvas — dùng cho texture 3D. Mỗi id chỉ tải một lần cho toàn bộ phiên chơi.
 */
export function loadPortraitImage(id: string): Promise<HTMLImageElement> {
  let cached = imageCache.get(id);
  if (!cached) {
    cached = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = portraitUrl(id);
    });
    imageCache.set(id, cached);
  }
  return cached;
}
