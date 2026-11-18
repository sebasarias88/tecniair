"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/icons";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/business";
import { isActive, navGroups, navLinks } from "@/lib/navigation";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes (adjusting state during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setPanel(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  // Mouse users get hover menus; touch and keyboard users toggle on click.
  const openOnHover = (id: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setPanel(id);
  };
  const closeOnLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setPanel(null), 160);
  };

  const group = navGroups.find((g) => g.id === panel);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white transition-shadow duration-300 ${
        scrolled || panel ? "border-line shadow-[0_10px_30px_-18px_rgb(10_27_46/0.35)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="rounded-xl">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden h-full items-center gap-1 lg:flex" onPointerLeave={closeOnLeave}>
          {navGroups.map((g) => {
            const open = panel === g.id;
            const active = isActive(pathname, g.href);
            return (
              <button
                key={g.id}
                type="button"
                aria-expanded={open}
                aria-controls="header-panel"
                onClick={() => setPanel((p) => (p === g.id ? null : g.id))}
                onPointerEnter={openOnHover(g.id)}
                className={`flex h-11 items-center gap-1.5 rounded-full px-4 text-[0.98rem] font-semibold transition-colors ${
                  open || active ? "bg-ice text-brand" : "text-ink hover:bg-ice"
                }`}
              >
                {g.label}
                <Chevron open={open} />
              </button>
            );
          })}
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onPointerEnter={() => setPanel(null)}
                className={`flex h-11 items-center rounded-full px-4 text-[0.98rem] font-semibold transition-colors ${
                  active ? "bg-ice text-brand" : "text-ink hover:bg-ice"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {group && (
            <div
              id="header-panel"
              onPointerEnter={() => window.clearTimeout(closeTimer.current)}
              className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_30px_50px_-30px_rgb(10_27_46/0.35)] [animation:enter-up_0.25s_var(--ease-out-expo)]"
            >
              <div className="mx-auto max-w-7xl px-6 py-6">
                <ul className="grid grid-cols-3 gap-1 xl:grid-cols-4">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={`block rounded-2xl px-4 py-3.5 transition-colors hover:bg-ice ${
                          pathname === item.href ? "bg-ice" : ""
                        }`}
                      >
                        <span className="block font-semibold text-ink">{item.label}</span>
                        <span className="mt-0.5 block text-[0.9rem] leading-snug text-ink-2">{item.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={group.footer.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-brand hover:bg-ice"
                >
                  {group.footer.label}
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa hidden sm:inline-flex"
          >
            <WhatsAppIcon className="size-5" />
            Escríbenos
          </a>
          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="grid size-12 place-items-center rounded-full border border-line-2 text-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-line bg-white px-4 pb-10 pt-4 sm:top-20 sm:px-6 lg:hidden"
      >
        <nav aria-label="Menú móvil" className="mx-auto max-w-2xl">
          {navGroups.map((g) => (
            <details key={g.id} className="group border-b border-line" open={isActive(pathname, g.href)}>
              <summary className="flex min-h-14 items-center justify-between font-display text-[1.45rem]">
                {g.label}
                <span className="transition-transform group-open:rotate-180">
                  <Chevron open={false} />
                </span>
              </summary>
              <ul className="grid gap-0.5 pb-4 sm:grid-cols-2">
                {g.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`block rounded-xl px-3 py-2.5 text-[1.05rem] ${pathname === item.href ? "bg-ice font-semibold text-brand" : "text-ink"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={g.footer.href} className="block rounded-xl px-3 py-2.5 font-semibold text-brand">
                    {g.footer.label}
                  </Link>
                </li>
              </ul>
            </details>
          ))}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={`flex min-h-14 items-center border-b border-line font-display text-[1.45rem] ${
                isActive(pathname, link.href) ? "text-brand" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa btn-lg mt-8 w-full"
          >
            <WhatsAppIcon className="size-5" />
            Escríbenos por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
