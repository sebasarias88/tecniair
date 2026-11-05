"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  /** Skeleton color for dark sections. */
  tone?: "day" | "night";
};

/**
 * next/image in "fill" mode with a shimmer skeleton until the photo arrives,
 * then a short fade-in. The parent must be positioned (relative/absolute).
 */
export function SmartImage({ src, alt, sizes, className = "", priority = false, quality = 60, tone = "day" }: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Images served from cache can finish before React attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <>
      <span
        aria-hidden="true"
        className={`${tone === "night" ? "skeleton-night" : "skeleton"} absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        ref={ref}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </>
  );
}
