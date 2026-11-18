"use client";

import { useEffect } from "react";

const RESET_MS = 2500;

/**
 * Gives feedback on WhatsApp and phone buttons: on click the button shows a
 * spinner (CSS in globals.css) and ignores repeat taps until the app opens.
 */
export function LinkLoading() {
  useEffect(() => {
    const timers = new Map<HTMLElement, number>();

    const clear = (link: HTMLElement) => {
      link.removeAttribute("data-loading");
      link.removeAttribute("aria-busy");
      window.clearTimeout(timers.get(link));
      timers.delete(link);
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="https://wa.me/"], a[href^="tel:"]',
      );
      if (!link) return;
      if (link.hasAttribute("data-loading")) {
        event.preventDefault();
        return;
      }
      link.setAttribute("data-loading", "");
      link.setAttribute("aria-busy", "true");
      timers.set(link, window.setTimeout(() => clear(link), RESET_MS));
    };

    // Coming back from WhatsApp: drop the spinner right away.
    const onReturn = () => {
      if (document.visibilityState === "visible") timers.forEach((_, link) => clear(link));
    };

    document.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onReturn);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onReturn);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return null;
}
