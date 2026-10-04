import { Hero } from "@/sections/Hero";
import { Proof } from "@/sections/Proof";
import { DayInCourt } from "@/sections/DayInCourt";
import { Bento } from "@/sections/Bento";
import { ToolsRail } from "@/sections/ToolsRail";
import { AiSection } from "@/sections/AiSection";
import { Commissioner } from "@/sections/Commissioner";
import { Team } from "@/sections/Team";
import { BarTeaser } from "@/sections/BarTeaser";
import { Security } from "@/sections/Security";
import { Testimonials } from "@/sections/Testimonials";
import { Pricing } from "@/sections/Pricing";
import { Faq } from "@/sections/Faq";
import { FinalCta } from "@/sections/FinalCta";
import { usePageTitle } from "@/components/SiteLayout";

export default function Home() {
  usePageTitle("");
  return (
    <>
      <Hero />
      <Proof />
      <DayInCourt />
      <Bento />
      <ToolsRail />
      <AiSection />
      <Commissioner />
      <Team />
      <BarTeaser />
      <Security />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
