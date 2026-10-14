import { PlusIcon, WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/business";

const services = [
  {
    id: "instalacion",
    name: "Instalación",
    summary: "Montamos tu equipo nuevo bien nivelado, sellado y sin fugas.",
    includes: [
      "Equipos mini split, piso techo y cassette",
      "Tubería de cobre, soportes y desagüe",
      "Vacío del sistema antes de liberar el gas",
      "Prueba de funcionamiento y recomendaciones de uso",
    ],
    cta: "Pedir instalación",
    message: "Hola Tecniair, quiero cotizar la instalación de un aire acondicionado.",
  },
  {
    id: "mantenimiento",
    name: "Mantenimiento",
    summary: "Para que enfríe como el primer día y consuma menos energía.",
    includes: [
      "Lavado de filtros, serpentines y turbina",
      "Limpieza de bandeja y desagüe",
      "Revisión de presión del refrigerante",
      "Medición del consumo eléctrico",
    ],
    cta: "Programar mantenimiento",
    message: "Hola Tecniair, quiero programar un mantenimiento para mi aire acondicionado.",
  },
  {
    id: "reparacion",
    name: "Reparación",
    summary: "Encontramos la falla y te decimos cuánto cuesta antes de arreglarla.",
    includes: [
      "Diagnóstico eléctrico y de refrigeración",
      "Detección y reparación de fugas",
      "Carga de refrigerante",
      "Cambio de capacitores, motores y tarjetas",
      "Desincrustamiento de serpentines",
    ],
    cta: "Pedir diagnóstico",
    message: "Hola Tecniair, mi aire acondicionado tiene una falla y necesito un diagnóstico.",
  },
  {
    id: "equipos",
    name: "Venta de equipos",
    summary: "Te ayudamos a elegir capacidad y tecnología, y lo dejamos instalado.",
    includes: [
      "Equipos convencionales e inverter",
      "Capacidad calculada para tu espacio",
      "Suministro e instalación en un mismo servicio",
    ],
    cta: "Cotizar un equipo",
    message: "Hola Tecniair, quiero cotizar un aire acondicionado con instalación.",
  },
];

export function ServiceList() {
  return (
    <section id="servicios" className="scroll-mt-6 bg-frost py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 className="type-display text-[clamp(2rem,4.5vw,3.4rem)] lg:col-span-6">
            Todo lo que tu aire necesita, con el mismo técnico.
          </h2>
          <p className="max-w-[48ch] text-slate lg:col-span-5 lg:col-start-8 lg:self-end">
            Trabajamos en casas, apartamentos, oficinas y locales comerciales. Toca un servicio
            para ver qué incluye.
          </p>
        </div>

        <div className="mt-12 border-t border-ink/15">
          {services.map((service, index) => (
            <details
              key={service.id}
              open={index === 0}
              className="group border-b border-ink/15"
            >
              <summary className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-7 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] sm:py-9">
                <span className="type-display text-[clamp(1.7rem,3.6vw,2.6rem)] transition-colors group-hover:text-royal">
                  {service.name}
                </span>
                <span className="col-start-1 row-start-2 text-slate sm:col-start-2 sm:row-start-1">
                  {service.summary}
                </span>
                <span className="col-start-2 row-span-2 row-start-1 grid size-11 place-items-center rounded-full border border-ink/20 transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white sm:col-start-3 sm:row-span-1">
                  <PlusIcon className="size-5" />
                </span>
              </summary>
              <div className="grid gap-8 pb-10 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] sm:gap-x-6">
                <ul className="grid gap-x-8 gap-y-3 sm:col-start-2 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-4 shrink-0 bg-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(service.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-max items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-white transition-colors hover:bg-royal sm:col-start-2"
                >
                  <WhatsAppIcon className="size-5 text-ice" />
                  {service.cta}
                </a>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
