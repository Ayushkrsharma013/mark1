'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'
import { S, fadeUp } from './styles'

const ForgeReactor = dynamic(() => import('@/components/r3f/ForgeReactor'), { ssr: false })

const metrics = [
  { value: '847', label: 'Agents Deployed', accent: '#FF6B00' },
  { value: '94%', label: 'Success Rate', accent: '#34D399' },
  { value: '15hr', label: 'Saved Weekly', accent: '#38BDF8' },
]

export function FinalCTASection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
      style={{ background: 'var(--forge-bg)' }}
    >
      {/* Reactor background — full intensity */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ForgeReactor intensity={1.0} isActive={true} />
      </div>

      {/* Gradient overlays for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(5,8,22,0.3) 0%, rgba(5,8,22,0.7) 50%, var(--forge-bg) 90%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 600px 500px at 50% 45%, rgba(255,107,0,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className={S.eyebrow} style={{ margin: '0 auto 24px' }}>
            <Sparkles size={12} color="var(--forge-orange)" />
            THE FORGE IS ACTIVE
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          style={{ color: 'var(--forge-plasma)' }}
        >
          Build Your
          <br />
          <span className="forge-glow-text" style={{ color: 'var(--forge-orange)' }}>
            AI Workforce
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed"
          style={{ color: 'var(--forge-plasma)', opacity: 0.6 }}
        >
          Stop managing tools. Start managing intelligence.
          <br />
          Deploy your autonomous workforce today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/book" className={S.btnPrimary} style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}>
            Enter The Forge
            <ChevronRight size={20} />
          </Link>
          <Link href="/products" className={S.btnGhost}>
            Explore the Marketplace
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-3 gap-6 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div
                className="text-3xl font-bold font-display mb-1"
                style={{ color: m.accent, textShadow: `0 0 20px ${m.accent}40` }}
              >
                {m.value}
              </div>
              <div className="text-[11px] tracking-wider font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="mt-10 text-sm"
          style={{ color: 'rgba(255,255,255,0.25)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          30-min strategy call. No pitch deck. No commitment.
        </motion.p>
      </div>
    </section>
  )
}
