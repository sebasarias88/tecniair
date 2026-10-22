import Image from "next/image";
import Link from "next/link";

const steps = [
  { title: "Nos escribes", text: "Por WhatsApp o llamada, a cualquier hora." },
  { title: "Agendamos la visita", text: "El día y la hora que te sirvan." },
  { title: "Diagnóstico y precio", text: "Te damos el valor antes de empezar." },
  { title: "Trabajo con garantía", text: "Queda funcionando y con garantía por escrito." },
];

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
    <section className="bg-abyss py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="type-display text-[clamp(2.2rem,4vw,3.4rem)]">{heading}</h2>
          <ul className="mt-9 space-y-4">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-4 border-b border-white/10 pb-4">
                <span aria-hidden="true" className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-glacier text-abyss">
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                </span>
                <span className="text-[1.08rem] text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {benefits && (
          <div className="grid gap-4 lg:col-span-6 lg:col-start-7">
            {benefits.map((b) => (
              <div key={b.title} className="glass rounded-[1.75rem] p-7">
                <p className="text-[1.5rem] font-bold tracking-[-0.02em] [font-stretch:118%]">{b.title}</p>
                <p className="mt-2 text-white/75">{b.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ProcessStrip() {
  return (
    <section aria-labelledby="process-title" className="border-y border-white/10 bg-navy/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 id="process-title" className="text-[1.6rem] font-bold [font-stretch:115%]">
          Así funciona
        </h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="type-condensed grid size-11 shrink-0 place-items-center rounded-full border-[3px] border-copper text-[1.1rem] font-semibold">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="mt-1 text-white/70">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function RelatedCards({
  heading,
  items,
}: {
  heading: string;
  items: { href: string; name: string; text: string; image: string }[];
}) {
  return (
    <section className="bg-abyss py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 className="type-display text-[clamp(2.2rem,4vw,3.4rem)]">{heading}</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-white/10"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-6">
                  <span className="block text-[1.5rem] font-bold leading-tight tracking-[-0.02em] [font-stretch:118%]">
                    {item.name}
                  </span>
                  <span className="mt-2 block text-[0.95rem] text-white/75">{item.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
