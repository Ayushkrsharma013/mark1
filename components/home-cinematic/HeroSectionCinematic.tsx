'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Play, Star } from 'lucide-react'
import { S, fadeUp, fadeIn } from './styles'

const ForgeReactor = dynamic(() => import('@/components/r3f/ForgeReactor'), { ssr: false })

export function HeroSectionCinematic() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative z-10 min-h-screen flex items-center px-6 py-24 overflow-hidden"
      style={{ background: 'var(--forge-bg)' }}
    >
      {/* Background glow behind reactor */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 900px 700px at 75% 50%, rgba(255,107,0,0.09) 0%, transparent 65%), radial-gradient(ellipse 500px 400px at 25% 40%, rgba(255,154,60,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* LEFT: Text content */}
          <motion.div initial="hidden" animate="visible" className="flex flex-col">
            <span className="sr-only">
              FlowForges is an autonomous AI workforce platform. Forge AI agents that handle
              prospecting, enrichment, outreach, and analytics — end to end, without human intervention.
            </span>

            <motion.div variants={fadeUp} custom={0}>
              <span className={S.eyebrow}>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--forge-orange)] shadow-[0_0_8px_rgba(255,107,0,0.6)] animate-pulse" />
                INTRODUCING FLOWFORGES v2
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={0.1} className={S.h1} style={{ color: 'var(--forge-plasma)' }}>
              Forge Autonomous
              <br />
              <span
                className="forge-glow-text"
                style={{ color: 'var(--forge-orange)' }}
              >
                AI Workforces
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-lg md:text-xl max-w-[480px] mb-10 leading-relaxed"
              style={{ color: 'var(--forge-plasma)', opacity: 0.65 }}
            >
              The operating system for autonomous AI workforces. Deploy intelligent agents
              that prospect, qualify, and close — while you focus on strategy.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.3} className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/book" className={S.btnPrimary}>
                Enter The Forge
                <ChevronRight size={18} />
              </Link>
              <Link href="/products" className={S.btnOutline}>
                <Play size={14} /> Watch Demo
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeIn} custom={0.5} className="flex items-center gap-3 flex-wrap">
              <div className="flex -space-x-2" aria-hidden="true">
                {['#B45309', '#D97706', '#EA580C'].map((bg, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[var(--forge-bg)] flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: bg }}
                  >
                    {['A', 'B', 'C'][i]}
                  </div>
                ))}
              </div>
              <div className="flex gap-0.5" aria-label="5 stars" role="img">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#FBBF24" color="#FBBF24" />
                ))}
              </div>
              <Link href="/case-studies" className="text-xs hover:underline" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Trusted by 12+ agencies · US · UK · AU
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D Forge Reactor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-[420px] md:h-[560px] lg:h-[680px]"
            aria-hidden="true"
          >
            <ForgeReactor intensity={0.8} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
