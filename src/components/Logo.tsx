type LogoProps = {
  className?: string;
  compact?: boolean;
};

/**
 * Demo recreation of Tecniair's mark: a wall split unit with cool air
 * flowing down, a vertical rule, and the wordmark with the slogan.
 * Replace with the client's vector logo once they provide it.
 */
export function Logo({ className = "", compact = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 text-white ${className}`}>
      <svg viewBox="0 0 48 36" className="h-8 w-auto shrink-0" aria-hidden="true">
        <rect x="3" y="4" width="42" height="15" rx="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M9 14h30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="38" cy="9" r="1.5" fill="var(--color-glacier)" />
        <path
          d="M13 23c0 2.5 2 3 2 5.5S13 31 13 33M24 23c0 2.5 2 3 2 5.5S24 31 24 33M35 23c0 2.5 2 3 2 5.5S35 31 35 33"
          fill="none"
          stroke="var(--color-glacier)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {!compact && (
        <>
          <span className="h-8 w-px bg-white/30" aria-hidden="true" />
          <span className="flex flex-col leading-none">
            <span className="text-[1.35rem] font-semibold tracking-tight [font-stretch:115%]">
              Tecniair
            </span>
            <span className="type-condensed mt-1 text-[0.72rem] text-glacier/80">Fresco siempre</span>
          </span>
        </>
      )}
    </span>
  );
}
