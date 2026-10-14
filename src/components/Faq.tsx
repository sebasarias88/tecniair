import { PlusIcon, WhatsAppIcon } from "@/components/icons";
import { business, whatsappUrl } from "@/lib/business";

const faqs = [
  {
    q: "¿Cada cuánto le hago mantenimiento a mi aire?",
    a: "En casa, cada 6 meses. En oficinas y locales que lo usan todo el día, cada 3 o 4 meses. Un equipo limpio enfría más rápido y consume menos energía.",
  },
  {
    q: "¿Por qué mi aire gotea agua?",
    a: "Casi siempre es el desagüe tapado o los filtros sucios. En la mayoría de los casos se resuelve con un mantenimiento.",
  },
  {
    q: "¿Cuánto se demora una instalación?",
    a: "Una instalación estándar de mini split toma entre 3 y 5 horas, según la distancia entre las unidades y la altura de la fachada.",
  },
  {
    q: "¿Me conviene un aire inverter?",
    a: "El inverter regula la velocidad del compresor en lugar de prenderse y apagarse, así que gasta menos energía. Si lo usas varias horas al día, suele valer la pena.",
  },
  {
    q: "¿Atienden fuera de Armenia?",
    a: `Atendemos ${business.coverage}. Escríbenos con tu ubicación y te confirmamos el día de la visita.`,
  },
  {
    q: "¿Los trabajos tienen garantía?",
    a: "Sí. Cada instalación, reparación y mantenimiento queda con garantía por escrito.",
  },
];

export function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-6 bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="type-display text-[clamp(2rem,4.5vw,3.4rem)]">Preguntas frecuentes</h2>
          <p className="mt-4 max-w-[36ch] text-slate">
            Si tu pregunta no está aquí, escríbenos y te respondemos por WhatsApp.
          </p>
          <a
            href={whatsappUrl("Hola Tecniair, tengo una pregunta sobre mi aire acondicionado.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white transition-colors hover:bg-royal"
          >
            <WhatsAppIcon className="size-5 text-ice" />
            Hacer una pregunta
          </a>
        </div>
        <div className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
          {faqs.map((item) => (
            <details key={item.q} className="group border-b border-ink/15">
              <summary className="flex items-center justify-between gap-6 py-6">
                <span className="text-[1.15rem] font-semibold [font-stretch:105%]">{item.q}</span>
                <PlusIcon className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-[60ch] pb-7 text-slate">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
