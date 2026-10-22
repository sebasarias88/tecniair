"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GOOGLE_ADS_WHATSAPP_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL;

type TrackingWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * Loads GA4, Google Ads and the Meta Pixel only when their IDs exist in the
 * environment, and reports every WhatsApp or phone click as a conversion.
 * The scripts load after the page is interactive so they never slow the first paint.
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a");
      const href = link?.getAttribute("href") ?? "";
      const isWhatsapp = href.startsWith("https://wa.me/");
      const isPhone = href.startsWith("tel:");
      if (!isWhatsapp && !isPhone) return;

      const w = window as TrackingWindow;
      const channel = isWhatsapp ? "whatsapp" : "phone";
      const label = link?.textContent?.trim().slice(0, 80) ?? "";

      w.gtag?.("event", "generate_lead", { method: channel, link_text: label, page: location.pathname });
      if (GOOGLE_ADS_ID && GOOGLE_ADS_WHATSAPP_LABEL) {
        w.gtag?.("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_WHATSAPP_LABEL}` });
      }
      w.fbq?.("track", isWhatsapp ? "Contact" : "Lead", { content_name: label });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  const gtagId = GA_ID ?? GOOGLE_ADS_ID;

  return (
    <>
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="lazyOnload" />
          <Script id="gtag-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${
              GA_ID ? `gtag('config','${GA_ID}');` : ""
            }${GOOGLE_ADS_ID ? `gtag('config','${GOOGLE_ADS_ID}');` : ""}`}
          </Script>
        </>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
