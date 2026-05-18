'use client'

import { useState } from 'react'
import { Preloader } from '@/components/home-cinematic/Preloader'
import { HeroSectionCinematic } from '@/components/home-cinematic/HeroSectionCinematic'
import { EcosystemSection } from '@/components/home-cinematic/EcosystemSection'
import { CommandCenterSection } from '@/components/home-cinematic/CommandCenterSection'
import { MarketplaceSection } from '@/components/home-cinematic/MarketplaceSection'
import { PipelineDemoSection } from '@/components/home-cinematic/PipelineDemoSection'
import { FinalCTASection } from '@/components/home-cinematic/FinalCTASection'

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {/* ── Cinematic Preloader ── */}
      <Preloader onLoaded={() => setPreloaderDone(true)} />

      {/* ── Main content (fades in after preloader) ── */}
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Section 1: Hero — 3D forge reactor + headline */}
        <HeroSectionCinematic />

        {/* Section 2: AI Ecosystem — neural network + 6 system cards */}
        <EcosystemSection />

        {/* Section 3: Command Center — futuristic dashboard mockup */}
        <CommandCenterSection />

        {/* Section 4: Marketplace — holographic agent cards */}
        <MarketplaceSection />

        {/* Section 5: Pipeline Demo — animated lead-to-deal flow */}
        <PipelineDemoSection />

        {/* Section 6: Final CTA — full-intensity forge reactor */}
        <FinalCTASection />
      </div>
    </>
  )
}
