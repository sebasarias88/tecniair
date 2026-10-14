import Image from "next/image";
import { InstagramIcon, PlayIcon } from "@/components/icons";
import { business } from "@/lib/business";

type WorkItem = {
  title: string;
  detail: string;
  href: string;
  /** Drop the real photo in /public/work and set its path here, e.g. "/work/fachada.jpg". */
  image?: string;
};

// Real jobs published on @tecniair. Each tile links to the original post.
const works: WorkItem[] = [
  {
    title: "Instalación en fachada",
    detail: "Unidad exterior montada en altura, con soportes y tubería protegida.",
    href: "https://www.instagram.com/p/DY7WlDnh5mS/",
  },
  {
    title: "Split en interior",
    detail: "Unidad evaporadora nivelada y conectada.",
    href: "https://www.instagram.com/p/DadNrdYgKiD/",
  },
  {
    title: "Tubería para obra nueva",
    detail: "Cobre y cableado listos antes de pintar.",
    href: "https://www.instagram.com/p/DZLJtDdJagK/",
  },
  {
    title: "Lavado a presión",
    detail: "Protector instalado para no mojar la pared ni el piso.",
    href: "https://www.instagram.com/p/DWNvJQvjfjj/",
  },
  {
    title: "Mantenimiento de cassette",
    detail: "Desarme completo y limpieza de turbina.",
    href: "https://www.instagram.com/p/DWSK3d4ibGA/",
  },
];

function WorkTile({ item, large = false }: { item: WorkItem; large?: boolean }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex overflow-hidden rounded-[1.5rem] bg-ink text-white ${
        large ? "aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[4/5] lg:aspect-[5/4]"
      }`}
    >
      {item.image ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, 80vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 100% 0%, rgb(52 195 232 / 0.35), transparent 60%), linear-gradient(160deg, #16324f, #0c2238 70%)",
          }}
        >
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
            <defs>
              <pattern id="vents" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M0 11h22" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vents)" />
          </svg>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-ice group-hover:text-ink">
        <PlayIcon className="size-4 translate-x-px" />
      </span>
      <div className="relative mt-auto p-6">
        <p className={`type-display ${large ? "text-[clamp(1.6rem,3vw,2.4rem)]" : "text-[1.35rem]"}`}>
          {item.title}
        </p>
        <p className="mt-2 max-w-[34ch] text-[0.95rem] text-white/70">{item.detail}</p>
      </div>
    </a>
  );
}

export function WorkGallery() {
  const [featured, ...rest] = works;

  return (
    <section id="trabajos" className="scroll-mt-6 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="type-display max-w-[16ch] text-[clamp(2rem,4.5vw,3.4rem)]">
            Trabajos reales, en Armenia.
          </h2>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 transition-colors hover:border-ink"
          >
            <InstagramIcon className="size-5" />
            Ver más en {business.instagramHandle}
          </a>
        </div>

        <div className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
          <div className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:row-span-2 lg:w-auto">
            <WorkTile item={featured} large />
          </div>
          {rest.map((item) => (
            <div key={item.href} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-auto">
              <WorkTile item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
