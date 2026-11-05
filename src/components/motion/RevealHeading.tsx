type RevealHeadingProps = {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  /** Lines rendered with an outline instead of a solid fill. */
  outlineLines?: number[];
};

/** Heading whose lines slide up from a mask when it enters the screen (CSS only). */
export function RevealHeading({ lines, as: Tag = "h2", className = "", id, outlineLines = [] }: RevealHeadingProps) {
  return (
    <Tag id={id} className={className} data-reveal="lines">
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className={outlineLines.includes(i) ? "text-outline" : undefined}>{line}</span>
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
