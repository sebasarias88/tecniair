import { Faq } from "@/components/Faq";
import { HomeHero } from "@/components/home/HomeHero";
import { BusinessBand, HomeServices, ReviewsCoverage, ToolsTeaser } from "@/components/home/HomeSections";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, Steps } from "@/components/ui";
import { homeFaqs } from "@/lib/content";
import { faqJsonLd } from "@/lib/seo";

const shortFaqs = homeFaqs.slice(0, 4);

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeServices />
      <Steps />
      <ReviewsCoverage />
      <BusinessBand />
      <ToolsTeaser />
      <Faq items={shortFaqs} showAllLink />
      <CtaBand />
      <JsonLd data={faqJsonLd(shortFaqs)} />
    </main>
  );
}
