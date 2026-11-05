import type { Metadata } from "next";
import Link from "next/link";
import { Container, WhatsAppButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="bg-ice">
      <Container className="flex min-h-[70svh] max-w-3xl flex-col items-center justify-center py-16 text-center">
        <p className="font-display text-[clamp(6rem,22vw,11rem)] text-brand">404</p>
        <h1 className="font-display mt-4 text-[clamp(2rem,5vw,3rem)]">Esta página no existe.</h1>
        <p className="mt-4 max-w-[44ch] text-ink-2">
          Puede que el enlace esté mal escrito. Vuelve al inicio o escríbenos y te ayudamos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-ghost btn-lg">
            Ir al inicio
          </Link>
          <WhatsAppButton />
        </div>
      </Container>
    </main>
  );
}
