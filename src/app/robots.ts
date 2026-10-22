import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments on *.vercel.app must never be indexed.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

  return {
    rules: isProduction ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
