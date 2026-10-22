import Image from "next/image";
import Link from "next/link";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { business, whatsappUrl } from "@/lib/business";

type Crumb = { name: string; href: string };

type PageHeroProps = {
  crumbs: Crumb[];
  title: string;
  headline: string;
  intro: string;
  image: string;
  ctaLabel: string;
  message: string;
};

export function PageHero({ crumbs, title, headline, intro, image, ctaLabel, message }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgb(5 14 26 / 0.95) 0%, rgb(5 14 26 / 0.7) 55%, rgb(5 14 26 / 0.3) 100%), linear-gradient(0deg, #050e1a 0%, transparent 45%)",
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-36 sm:px-8 lg:pb-20">
        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-2 text-[0.92rem] text-white/70">
            {crumbs.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-white">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-glacier">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-6 max-w-[40ch] text-[clamp(1.1rem,1.8vw,1.4rem)] font-semibold text-glacier">{title}</h1>
        <p className="type-display mt-4 max-w-[16ch] text-[clamp(2.8rem,7vw,6.4rem)]">{headline}</p>
        <p className="mt-6 max-w-[54ch] text-[1.1rem] text-white/80 sm:text-[1.2rem]">{intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ice inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[1.05rem] font-semibold"
          >
            <WhatsAppIcon className="size-5" />
            {ctaLabel}
          </a>
          <a
            href={`tel:${business.phoneE164}`}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-6 py-4 font-semibold backdrop-blur transition-colors hover:border-white/60"
          >
            <PhoneIcon className="size-5" />
            Llamar al {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
