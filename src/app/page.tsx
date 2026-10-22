import { BtuCalculator } from "@/components/BtuCalculator";
import { BusinessPlans } from "@/components/BusinessPlans";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { JsonLd } from "@/components/JsonLd";
import { MoreServices } from "@/components/MoreServices";
import { SectorsExplorer } from "@/components/SectorsExplorer";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { SymptomPicker } from "@/components/SymptomPicker";
import { ThermostatStory } from "@/components/ThermostatStory";
import { homeFaqs } from "@/lib/content";
import { faqJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ThermostatStory />
      <ServicesShowcase />
      <MoreServices />
      <SectorsExplorer />
      <BusinessPlans />
      <SymptomPicker />
      <BtuCalculator />
      <HowWeWork />
      <Faq items={homeFaqs} />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </main>
  );
}
