// Pre-rendered portraits

/** Static URL */
export function portraitUrl(id: string): string {
  return `/portraits/${id}.svg`;
}

const imageCache = new Map<string, Promise<HTMLImageElement>>();

/** Cached image load */
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
