import { SmartImage } from "@/components/SmartImage";
import { Breadcrumbs, Container, WhatsAppButton } from "@/components/ui";

type Crumb = { name: string; href: string };

type PageHeroProps = {
  crumbs: Crumb[];
  /** H1 with the search phrase ("Mantenimiento de aire acondicionado en Armenia"). */
  title: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  message: string;
};

/** Light split hero for service and sector pages: text and button left, photo right. */
export function PageHero({ crumbs, title, headline, intro, image, imageAlt, ctaLabel, message }: PageHeroProps) {
  return (
    <section className="bg-ice">
      <Container className="grid items-center gap-8 pb-12 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-16">
        <div className="lg:col-span-6">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 text-[1.05rem] font-bold text-brand sm:text-[1.12rem]">{title}</h1>
          <p className="font-display mt-3 max-w-[16ch] text-[clamp(2.3rem,5.6vw,4rem)]">{headline}</p>
          <p className="mt-4 max-w-[48ch] text-[1.1rem] text-ink-2">{intro}</p>
          <WhatsAppButton message={message} className="mt-7">
            {ctaLabel}
          </WhatsAppButton>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:col-span-6">
          <SmartImage src={image} alt={imageAlt} sizes="(min-width: 1024px) 45vw, 100vw" priority quality={75} />
        </div>
      </Container>
    </section>
  );
}

/** Same shape as the hero, shown while the page content streams in. */
export function PageHeroSkeleton() {
  return (
    // Tall enough that the footer starts below the fold: swapping in the real
    // content never moves anything the visitor can see.
    <section className="min-h-[160svh] bg-ice" aria-busy="true" aria-label="Cargando">
      <Container className="grid items-center gap-8 pb-12 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-16">
        <div className="space-y-4 lg:col-span-6">
          <div className="skeleton h-4 w-48 rounded-full" />
          <div className="skeleton h-5 w-72 rounded-full" />
          <div className="skeleton h-14 w-full max-w-md rounded-2xl" />
          <div className="skeleton h-14 w-4/5 max-w-sm rounded-2xl" />
          <div className="skeleton h-5 w-full max-w-lg rounded-full" />
          <div className="skeleton h-14 w-64 rounded-full" />
        </div>
        <div className="skeleton aspect-[4/3] rounded-[2rem] lg:col-span-6" />
      </Container>
    </section>
  );
}
