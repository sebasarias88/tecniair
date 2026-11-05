import Link from "next/link";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { business, defaultWhatsappMessage, whatsappUrl } from "@/lib/business";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

export function Stars({ className = "text-[1.1rem]" }: { className?: string }) {
  return (
    <span className={`tracking-[0.12em] text-star ${className}`} aria-hidden="true">
      ★★★★★
    </span>
  );
}

export function WhatsAppButton({
  message = defaultWhatsappMessage,
  children = "Escríbenos por WhatsApp",
  size = "lg",
  className = "",
}: {
  message?: string;
  children?: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-wa ${size === "lg" ? "btn-lg" : ""} ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      {children}
    </a>
  );
}

type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.92rem] text-ink-2">
        {items.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="font-semibold text-ink">
                {crumb.name}
              </span>
            ) : (
              <Link href={crumb.href} className="hover:text-brand">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Top of the index pages (servicios, empresas, calculadora…): short and direct. */
export function PageIntro({
  crumbs,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ice">
      <Container className="pb-12 pt-10 sm:pb-16 sm:pt-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="font-display mt-5 max-w-[20ch] text-[clamp(2.4rem,6vw,4.2rem)]">{title}</h1>
        <p className="mt-4 max-w-[52ch] text-[1.12rem] text-ink-2">{intro}</p>
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}

export function SectionHeading({
  title,
  text,
  id,
  action,
}: {
  title: string;
  text?: string;
  id?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div>
        <h2 id={id} className="font-display text-[clamp(2rem,4.2vw,3.2rem)]">
          {title}
        </h2>
        {text && <p className="mt-3 max-w-[48ch] text-ink-2">{text}</p>}
      </div>
      {action}
    </div>
  );
}

const steps = [
  { title: "Nos escribes", text: "Por WhatsApp, a cualquier hora. Cuéntanos qué pasa." },
  { title: "Vamos y revisamos", text: "Te damos el precio antes de tocar nada." },
  { title: "Queda funcionando", text: "Con garantía por escrito." },
];

export function Steps({ title = "Así de fácil" }: { title?: string }) {
  return (
    <section aria-labelledby="steps-title">
      <Container className="py-14 sm:py-20">
        <h2 id="steps-title" className="font-display mb-7 text-[clamp(1.8rem,3.4vw,2.6rem)]">
          {title}
        </h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="card flex items-start gap-4 p-6" data-reveal>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand font-bold text-white">
                {i + 1}
              </span>
              <span>
                <strong className="block text-[1.12rem]">{step.title}</strong>
                <span className="text-ink-2">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Closing call to action, the same on every page. */
export function CtaBand({
  title = "¿Hace calor? Agendamos hoy.",
  text = "Escríbenos y te respondemos en minutos.",
  message = defaultWhatsappMessage,
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section>
      <Container className="pb-16 pt-6 sm:pb-24">
        <div className="relative isolate flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[2rem] bg-brand p-8 text-white sm:rounded-[2.25rem] sm:p-14">
          <svg aria-hidden="true" viewBox="0 0 400 400" className="absolute -right-24 -top-24 -z-10 size-[26rem] text-white/[0.07]">
            <g fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round">
              <path d="M200 40v320M61 120l278 160M61 280l278-160" />
              <path d="M170 60l30 30 30-30M170 340l30-30 30 30M80 160l40-10-10-40M320 240l-40 10 10 40M80 240l40 10-10 40M320 160l-40-10 10-40" />
            </g>
          </svg>
          <div className="min-w-0 flex-[1_1_22rem]">
            <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)]">{title}</h2>
            <p className="mt-3 text-[1.12rem] text-white/85">{text}</p>
          </div>
          <WhatsAppButton message={message} />
        </div>
      </Container>
    </section>
  );
}

export function TownChips({ tone = "day" }: { tone?: "day" | "night" }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {business.serviceArea.map((town) => (
        <li
          key={town}
          className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium ${
            tone === "night" ? "border border-night-line text-white" : "bg-ice text-ink"
          }`}
        >
          {town}
        </li>
      ))}
    </ul>
  );
}
