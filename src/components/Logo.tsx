type LogoProps = {
  className?: string;
  /** "night" for dark backgrounds. */
  tone?: "day" | "night";
};

/**
 * Demo mark for Tecniair: a wall split unit with cool air flowing down,
 * plus the wordmark. Replace with the client's vector logo once they provide it.
 */
export function Logo({ className = "", tone = "day" }: LogoProps) {
  const night = tone === "night";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-xl ${night ? "bg-sky text-ink" : "bg-brand text-white"}`}
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="7.5" rx="2" />
          <path d="M6.5 9h11" />
          <path d="M7.5 15.5c.8.8.8 2.2 0 3M12 15.5c.8.8.8 2.2 0 3M16.5 15.5c.8.8.8 2.2 0 3" />
        </svg>
      </span>
      <span className="flex flex-col leading-[1.1]">
        <span className={`font-display text-[1.32rem] ${night ? "text-white" : "text-ink"}`}>Tecniair</span>
        <span className={`whitespace-nowrap text-[0.78rem] ${night ? "text-night-text" : "text-ink-2"}`}>Aire acondicionado · Armenia</span>
      </span>
    </span>
  );
}
