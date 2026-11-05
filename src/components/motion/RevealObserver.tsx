"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every [data-reveal] element on the page.
 * It only adds an attribute; the animation itself is plain CSS (globals.css).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
