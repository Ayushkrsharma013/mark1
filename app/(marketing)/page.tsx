import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { ProspectingOS } from "@/components/sections/ProspectingOS";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "FlowForges",
            description: "AI automation agency for digital and creative agencies",
            url: "https://mark1-eta.vercel.app",
            serviceType: [
              "AI Automation",
              "Workflow Automation",
              "AI Agent Development",
            ],
            areaServed: "Worldwide",
            priceRange: "$$–$$$",
          }),
        }}
      />
      <Hero />
      <LogoMarquee />
      <WhatWeDo />
      <ProspectingOS />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
