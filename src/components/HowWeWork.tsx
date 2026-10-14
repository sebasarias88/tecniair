import { Logo } from "@/components/Logo";
import { business } from "@/lib/business";

const plateRows = [
  { label: "Servicio", value: "Instalación, mantenimiento, reparación y venta" },
  { label: "Cobertura", value: business.coverage },
  { label: "Atención", value: "24 horas" },
  { label: "Visita", value: "A domicilio" },
  { label: "Presupuesto", value: "Antes de empezar" },
  { label: "Garantía", value: "Por escrito en cada trabajo" },
  { label: "Contacto", value: business.phoneDisplay },
];

const steps = [
  {
    title: "Nos escribes",
    text: "Por WhatsApp o llamada, a cualquier hora. Nos cuentas qué le pasa al equipo.",
  },
  {
    title: "Agendamos la visita",
    text: "Vamos a tu casa, oficina o local el día y la hora que te sirvan.",
  },
  {
    title: "Diagnóstico y presupuesto",
    text: "Te mostramos la falla y te damos el precio antes de tocar nada.",
  },
  {
    title: "Trabajo con garantía",
    text: "Dejamos el aire funcionando, el espacio limpio y la garantía por escrito.",
  },
];

function Rivet({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute size-3 rounded-full bg-gradient-to-br from-white to-[#9aa6b1] shadow-[inset_0_-1px_1px_rgb(0_0_0/0.25),0_1px_1px_rgb(255_255_255/0.6)] ${className}`}
    />
  );
}

export function HowWeWork() {
  return (
    <section id="como-trabajamos" className="scroll-mt-6 bg-frost py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="type-display max-w-[14ch] text-[clamp(2rem,4.5vw,3.4rem)]">
            Sin sorpresas, de principio a fin.
          </h2>
          <p className="mt-4 max-w-[44ch] text-slate">
            Cada aire trae una placa con sus datos técnicos. Esta es la nuestra.
          </p>

          <figure
            className="brushed-metal relative mt-10 rounded-2xl p-6 text-ink shadow-[0_24px_50px_-28px_rgb(12_34_56/0.6),inset_0_1px_0_rgb(255_255_255/0.8)] ring-1 ring-ink/10 sm:p-8"
            aria-label="Ficha técnica de Tecniair"
          >
            <Rivet className="left-3 top-3" />
            <Rivet className="right-3 top-3" />
            <Rivet className="bottom-3 left-3" />
            <Rivet className="bottom-3 right-3" />

            <div className="flex items-center justify-between gap-4 border-b border-ink/25 pb-4">
              <Logo />
              <span className="type-condensed text-right text-[0.85rem] text-ink/60">
                Ficha técnica
              </span>
            </div>
            <dl className="divide-y divide-ink/15">
              {plateRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-2.5">
                  <dt className="type-condensed text-[0.92rem] text-ink/60">{row.label}</dt>
                  <dd className="text-[0.98rem] font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
            <figcaption className="type-condensed mt-4 border-t border-ink/25 pt-3 text-[0.8rem] text-ink/55">
              {business.address}, {business.city}
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <h3 className="type-display text-[1.6rem]">Así funciona</h3>
          <ol className="relative mt-8">
            {/* Copper line: the refrigerant pipe that connects every step */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[1.35rem] top-6 w-[3px] rounded-full bg-gradient-to-b from-copper via-[#d4935a] to-copper"
            />
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
                <span className="type-condensed relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-[3px] border-copper bg-frost text-[1.1rem] font-semibold">
                  {index + 1}
                </span>
                <div className="pt-1.5">
                  <p className="text-[1.25rem] font-semibold [font-stretch:110%]">{step.title}</p>
                  <p className="mt-1.5 max-w-[46ch] text-slate">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
