import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/business";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-4 pt-32 text-center">
      <p className="type-numeral text-[clamp(7rem,24vw,14rem)] text-glacier">404</p>
      <h1 className="type-display mt-6 text-[clamp(2rem,5vw,3.4rem)]">Esta página no existe.</h1>
      <p className="mt-4 max-w-[44ch] text-white/70">
        Puede que el enlace esté mal escrito. Vuelve al inicio o escríbenos y te ayudamos.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full border border-white/25 px-6 py-4 font-semibold hover:border-white/60">
          Ir al inicio
        </Link>
        <a
          href={whatsappUrl(defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ice inline-flex items-center gap-2.5 rounded-full px-7 py-4 font-semibold"
        >
          <WhatsAppIcon className="size-5" />
          Escribir por WhatsApp
        </a>
      </div>
    </main>
  );
}
