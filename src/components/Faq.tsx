import { PlusIcon, WhatsAppIcon } from "@/components/icons";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { whatsappUrl } from "@/lib/business";
import type { Faq as FaqItem } from "@/lib/content";

type FaqProps = {
  items: FaqItem[];
  title?: string[];
  id?: string;
};

export function Faq({ items, title = ["Preguntas", "frecuentes"], id = "preguntas" }: FaqProps) {
  return (
    <section id={id} className="bg-abyss py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <RevealHeading lines={title} className="type-display text-[clamp(2.4rem,4.2vw,3.6rem)]" />
          <p className="mt-6 max-w-[34ch] text-white/70">
            Si tu pregunta no está aquí, escríbenos y te respondemos por WhatsApp.
          </p>
          <a
            href={whatsappUrl("Hola Tecniair, tengo una pregunta sobre mi aire acondicionado.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-semibold transition-colors hover:border-glacier hover:text-glacier"
          >
            <WhatsAppIcon className="size-5" />
            Hacer una pregunta
          </a>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {items.map((item) => (
            <details
              key={item.q}
              className="group mb-3 rounded-3xl border border-white/10 bg-white/[0.03] px-6 transition-colors open:border-glacier/40 open:bg-white/[0.06]"
            >
              <summary className="flex items-center justify-between gap-6 py-6">
                <span className="text-[1.15rem] font-semibold [font-stretch:108%]">{item.q}</span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 transition-all duration-300 group-open:rotate-45 group-open:bg-glacier group-open:text-abyss">
                  <PlusIcon className="size-5" />
                </span>
              </summary>
              <p className="max-w-[60ch] pb-7 text-white/75">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
