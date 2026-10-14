"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.11, anchors: { offset: -16 } });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("tecniair:lock", stop);
    window.addEventListener("tecniair:unlock", start);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("tecniair:lock", stop);
      window.removeEventListener("tecniair:unlock", start);
      lenis.destroy();
    };
  }, []);

  return null;
}
