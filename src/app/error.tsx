"use client";

import { Container, WhatsAppButton } from "@/components/ui";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="bg-ice">
      <Container className="flex min-h-[70svh] max-w-3xl flex-col items-center justify-center py-16 text-center">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)]">Algo salió mal.</h1>
        <p className="mt-4 max-w-[44ch] text-ink-2">
          Intenta de nuevo. Si necesitas un técnico ya, escríbenos por WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-ghost btn-lg">
            Intentar de nuevo
          </button>
          <WhatsAppButton>Pedir por WhatsApp</WhatsAppButton>
        </div>
      </Container>
    </main>
  );
}
