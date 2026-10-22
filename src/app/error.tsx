"use client";

import { WhatsAppIcon } from "@/components/icons";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/business";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-4 pt-32 text-center">
      <h1 className="type-display text-[clamp(2rem,5vw,3.4rem)]">Algo salió mal.</h1>
      <p className="mt-4 max-w-[44ch] text-white/70">
        Intenta de nuevo. Si necesitas un técnico ya, escríbenos por WhatsApp.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-white/25 px-6 py-4 font-semibold hover:border-white/60"
        >
          Intentar de nuevo
        </button>
        <a
          href={whatsappUrl(defaultWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ice inline-flex items-center gap-2.5 rounded-full px-7 py-4 font-semibold"
        >
          <WhatsAppIcon className="size-5" />
          Pedir por WhatsApp
        </a>
      </div>
    </main>
  );
}
