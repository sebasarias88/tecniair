type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Demo recreation of Tecniair's mark: a wall split unit with cool air
 * flowing down, a vertical rule, and the wordmark with the slogan.
 * Replace with the client's vector logo once they provide it.
 */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const ink = tone === "dark" ? "text-ink" : "text-white";
  const muted = tone === "dark" ? "text-slate" : "text-ice-soft";

  return (
    <span className={`inline-flex items-center gap-3 ${ink} ${className}`}>
      <svg viewBox="0 0 48 36" className="h-8 w-auto" aria-hidden="true">
        <rect x="3" y="4" width="42" height="15" rx="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M9 14h30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="38" cy="9" r="1.4" fill="var(--color-ice)" />
        <path
          d="M13 23c0 2.5 2 3 2 5.5S13 31 13 33M24 23c0 2.5 2 3 2 5.5S24 31 24 33M35 23c0 2.5 2 3 2 5.5S35 31 35 33"
          fill="none"
          stroke="var(--color-ice)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="h-8 w-px bg-current opacity-30" aria-hidden="true" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.35rem] font-semibold tracking-tight [font-stretch:115%]">
          Tecniair
        </span>
        <span className={`mt-1 text-[0.72rem] ${muted} type-condensed`}>Fresco siempre</span>
      </span>
    </span>
  );
}
