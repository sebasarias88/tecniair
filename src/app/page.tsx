import { BtuCalculator } from "@/components/BtuCalculator";
import { CoolingHero } from "@/components/CoolingHero";
import { Faq } from "@/components/Faq";
import { HowWeWork } from "@/components/HowWeWork";
import { ServiceList } from "@/components/ServiceList";
import { SiteFooter } from "@/components/SiteFooter";
import { SymptomPicker } from "@/components/SymptomPicker";
import { WhatsAppDock } from "@/components/WhatsAppDock";
import { WorkGallery } from "@/components/WorkGallery";

export default function HomePage() {
  return (
    <>
      <main>
        <CoolingHero />
        <SymptomPicker />
        <ServiceList />
        <BtuCalculator />
        <WorkGallery />
        <HowWeWork />
        <Faq />
      </main>
      <SiteFooter />
      <WhatsAppDock />
    </>
  );
}
