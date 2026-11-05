import Link from "next/link";
import { PlusIcon } from "@/components/icons";
import { ArrowIcon, Container } from "@/components/ui";
import type { Faq as FaqItem } from "@/lib/content";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <details key={item.q} className="card group px-5 transition-shadow open:shadow-[0_18px_40px_-28px_rgb(10_27_46/0.4)] sm:px-6">
          <summary className="flex min-h-16 items-center justify-between gap-5 py-4">
            <span className="text-[1.08rem] font-bold">{item.q}</span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ice text-brand transition-transform duration-300 group-open:rotate-45">
              <PlusIcon className="size-5" />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-5 text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

type FaqProps = {
  items: FaqItem[];
  title?: string;
  /** Show the link to the full questions page. */
  showAllLink?: boolean;
};

export function Faq({ items, title = "Preguntas rápidas", showAllLink = false }: FaqProps) {
  return (
    <section aria-labelledby="faq-title">
      <Container className="max-w-4xl py-14 sm:py-20">
        <h2 id="faq-title" className="font-display mb-7 text-[clamp(1.8rem,3.4vw,2.6rem)]">
          {title}
        </h2>
        <FaqList items={items} />
        {showAllLink && (
          <Link href="/preguntas" className="mt-6 inline-flex items-center gap-2 rounded-full px-1 py-2 font-semibold text-brand hover:underline">
            Ver todas las preguntas
            <ArrowIcon />
          </Link>
        )}
      </Container>
    </section>
  );
}
