import { sectors, services } from "@/lib/content";

export type NavLink = { href: string; label: string; text?: string };

export type NavGroup = {
  id: string;
  label: string;
  /** Landing page for the group (also its link on mobile). */
  href: string;
  items: NavLink[];
  footer: NavLink;
};

export const navGroups: NavGroup[] = [
  {
    id: "services",
    label: "Servicios",
    href: "/servicios",
    items: services.map((s) => ({ href: `/servicios/${s.slug}`, label: s.shortName, text: s.headline })),
    footer: { href: "/servicios", label: "Ver todos los servicios" },
  },
  {
    id: "sectors",
    label: "Sectores",
    href: "/empresas",
    items: sectors.map((s) => ({ href: `/sectores/${s.slug}`, label: s.name, text: s.headline })),
    footer: { href: "/empresas", label: "Planes de mantenimiento para empresas" },
  },
];

export const navLinks: NavLink[] = [
  { href: "/calculadora", label: "Calculadora" },
  { href: "/preguntas", label: "Preguntas" },
  { href: "/contacto", label: "Contacto" },
];

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/servicios") return pathname.startsWith("/servicios");
  if (href === "/empresas") return pathname.startsWith("/empresas") || pathname.startsWith("/sectores");
  return pathname === href;
}
