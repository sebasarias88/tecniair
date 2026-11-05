import { PhotoCard } from "@/components/cards";
import { CheckIcon, Container } from "@/components/ui";

export function IncludesAndBenefits({
  heading,
  items,
  benefits,
}: {
  heading: string;
  items: string[];
  benefits?: { title: string; text: string }[];
}) {
  return (
    <section aria-labelledby="includes-title">
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h2 id="includes-title" className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)]">
            {heading}
          </h2>
          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <CheckIcon />
                </span>
                <span className="text-[1.05rem]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {benefits && (
          <ul className="grid gap-3 lg:col-span-6">
            {benefits.map((b) => (
              <li key={b.title} className="card p-6" data-reveal>
                <p className="font-display text-[1.3rem]">{b.title}</p>
                <p className="mt-1.5 text-ink-2">{b.text}</p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

/** Plain reading copy: what the service is, in the words people search for. */
export function ArticleText({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <section aria-labelledby="article-title" className="border-y border-line bg-white">
      <Container className="max-w-4xl py-14 sm:py-16">
        <h2 id="article-title" className="font-display text-[clamp(1.6rem,3vw,2.2rem)]">
          {heading}
        </h2>
        <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed text-ink-2">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function RelatedCards({
  heading,
  items,
}: {
  heading: string;
  items: { href: string; name: string; text: string; image: string; imageAlt: string }[];
}) {
  return (
    <section aria-labelledby="related-title">
      <Container className="py-14 sm:py-20">
        <h2 id="related-title" className="font-display mb-7 text-[clamp(1.8rem,3.4vw,2.6rem)]">
          {heading}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.href}>
              <PhotoCard href={item.href} title={item.name} text={item.text} image={item.image} imageAlt={item.imageAlt} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
