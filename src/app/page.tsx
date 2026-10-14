import { BtuCalculator } from "@/components/BtuCalculator";
import { Coverage } from "@/components/Coverage";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { MarqueeBand } from "@/components/MarqueeBand";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SymptomPicker } from "@/components/SymptomPicker";
import { ThermostatStory } from "@/components/ThermostatStory";
import { WhatsAppDock } from "@/components/WhatsAppDock";

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <SiteHeader />
      <main>
        <Hero />
        <ThermostatStory />
        <ServicesShowcase />
        <MarqueeBand />
        <SymptomPicker />
        <BtuCalculator />
        <HowWeWork />
        <Coverage />
        <Faq />
      </main>
      <SiteFooter />
      <WhatsAppDock />
    </>
  );
}
