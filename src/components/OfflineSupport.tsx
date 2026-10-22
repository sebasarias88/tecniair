"use client";

import { useEffect, useState } from "react";

/**
 * Registers the service worker (production only) and shows a banner while
 * the visitor has no connection. Internal links are blocked while offline so
 * nobody lands on a browser error page.
 */
export function OfflineSupport() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
      if (document.readyState === "complete") register();
      else window.addEventListener("load", register, { once: true });
    }

    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    if (!offline) return;
    const block = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a");
      const href = link?.getAttribute("href");
      if (href?.startsWith("/") && !href.startsWith("/#")) event.preventDefault();
    };
    document.addEventListener("click", block, { capture: true });
    return () => document.removeEventListener("click", block, { capture: true });
  }, [offline]);

  if (!offline) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[90] bg-heat px-4 py-2.5 text-center text-[0.95rem] font-semibold text-abyss"
    >
      Sin conexión. Revisa tu internet; cuando vuelva, puedes escribirnos por WhatsApp.
    </div>
  );
}
