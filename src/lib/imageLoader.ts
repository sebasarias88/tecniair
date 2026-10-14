type LoaderParams = { src: string; width: number; quality?: number };

/** Unsplash resizes on its CDN, so we ask it for the exact width instead of re-optimizing. */
export default function imageLoader({ src, width, quality }: LoaderParams): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    return `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 70}`;
  }
  return `${src}?w=${width}`;
}
