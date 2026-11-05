import Link from "next/link";
import { Logo } from "@/components/Logo";
import { InstagramIcon } from "@/components/icons";
import { business } from "@/lib/business";
import { navGroups, navLinks } from "@/lib/navigation";

export function SiteFooter() {
  const [servicesGroup, businessGroup] = navGroups;

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-12">
        <div className="col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-[36ch] text-ink-2">{business.description}</p>
          <address className="mt-5 not-italic text-ink-2">
            {business.address}
            <br />
            {business.city}
          </address>
          <ul className="mt-4 space-y-1.5 text-ink-2">
            <li>
              <a href={`mailto:${business.email}`} className="break-all hover:text-brand">
                {business.email}
              </a>
            </li>
            <li>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand"
              >
                <InstagramIcon className="size-4" />
                {business.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Servicios" className="lg:col-span-3">
          <p className="font-semibold">Servicios</p>
          <ul className="mt-4 space-y-2 text-[0.98rem] text-ink-2">
            {servicesGroup.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Sectores" className="lg:col-span-3">
          <p className="font-semibold">Sectores</p>
          <ul className="mt-4 space-y-2 text-[0.98rem] text-ink-2">
            {businessGroup.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/empresas" className="font-semibold text-ink hover:text-brand">
                Planes para empresas
              </Link>
            </li>
          </ul>
        </nav>

        <div className="col-span-2 sm:col-span-1 lg:col-span-2">
          <p className="font-semibold">Más</p>
          <ul className="mt-4 space-y-2 text-[0.98rem] text-ink-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-semibold">Dónde atendemos</p>
          <p className="mt-2 text-ink-2">{business.serviceArea.join(", ")}.</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-6 text-[0.92rem] text-ink-2 sm:px-6">
          <p>© Tecniair. Armenia, Quindío.</p>
          <p>Atención 24 horas por WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
