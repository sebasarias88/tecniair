"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type RevealHeadingProps = {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Lines rendered with an outline instead of a solid fill. */
  outlineLines?: number[];
  delay?: number;
  /** Animate immediately instead of on scroll (used above the fold). */
  immediate?: boolean;
};

export function RevealHeading({
  lines,
  as: Tag = "h2",
  className = "",
  outlineLines = [],
  delay = 0,
  immediate = false,
}: RevealHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const targets = ref.current?.querySelectorAll(".line-mask > span");
      if (!targets?.length) return;
      gsap.from(targets, {
        yPercent: 110,
        rotate: 2,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.09,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask" aria-hidden="true">
          <span className={outlineLines.includes(i) ? "text-outline" : undefined}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
