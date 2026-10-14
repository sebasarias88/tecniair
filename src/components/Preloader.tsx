"use client";

import { useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** One orchestrated opening moment: the room cools from 31° to 18°, then the curtain lifts. */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const finish = () => {
        (window as Window & { __tecniairIntroDone?: boolean }).__tecniairIntroDone = true;
        window.dispatchEvent(new Event("tecniair:unlock"));
        window.dispatchEvent(new Event("tecniair:intro-done"));
        setDone(true);
      };

      if (prefersReducedMotion()) {
        finish();
        return;
      }

      window.dispatchEvent(new Event("tecniair:lock"));
      const temp = { value: 31 };
      const tl = gsap.timeline({ onComplete: finish });

      tl.from(".preloader-logo", { autoAlpha: 0, y: 12, duration: 0.5, ease: "power2.out" })
        .to(
          temp,
          {
            value: 18,
            duration: 1.25,
            ease: "power2.inOut",
            onUpdate: () => {
              if (numberRef.current) numberRef.current.textContent = String(Math.round(temp.value));
            },
          },
          0.1,
        )
        .to(".preloader-number", { color: "#7fe3ff", duration: 1.25, ease: "power2.inOut" }, 0.1)
        .to(".preloader-bar", { scaleX: 1, duration: 1.25, ease: "power2.inOut" }, 0.1)
        .to(ref.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=0.15");
    },
    { scope: ref },
  );

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex animate-[preloader-failsafe_0s_linear_5s_forwards] flex-col items-center justify-center bg-abyss"
    >
      <div className="preloader-logo">
        <Logo />
      </div>
      <p className="preloader-number type-numeral mt-10 text-[clamp(6rem,22vw,14rem)] text-heat">
        <span ref={numberRef}>31</span>°
      </p>
      <span className="mt-10 block h-px w-48 bg-white/10">
        <span className="preloader-bar block h-full origin-left scale-x-0 bg-glacier" />
      </span>
    </div>
  );
}
