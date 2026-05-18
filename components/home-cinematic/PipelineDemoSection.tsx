'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Cpu, Target, MessageCircle, Database, BarChart3, ArrowRight, ChevronDown } from 'lucide-react'
import { S, fadeUp } from './styles'

const steps = [
  {
    icon: Globe,
    label: 'Lead Source',
    detail: 'Scraping LinkedIn, Google Maps & Amazon',
    accent: '#FF6B00',
    detailText: 'Discovering 142 leads from 3 sources...',
  },
  {
    icon: Cpu,
    label: 'AI Enrichment',
    detail: 'Firmographics, intent & tech stack',
    accent: '#FF9A3C',
    detailText: 'Enriching with 47 data points per lead...',
  },
  {
    icon: Target,
    label: 'ICP Qualification',
    detail: 'AI scoring & reasoning',
    accent: '#A78BFA',
    detailText: '28 leads qualified at 94% confidence...',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp Outreach',
    detail: 'Multi-channel AI personalization',
    accent: '#34D399',
    detailText: '37 personalized messages sent...',
  },
  {
    icon: Database,
    label: 'CRM Sync',
    detail: 'Bidirectional to your CRM',
    accent: '#38BDF8',
    detailText: 'Syncing 12 new contacts to HubSpot...',
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    detail: 'Live pipeline & ROI tracking',
    accent: '#F472B6',
    detailText: 'Pipeline value: $42K · 94% conversion rate...',
  },
]

export function PipelineDemoSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [pulsePosition, setPulsePosition] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length
        // Animate pulse position after a small delay
        setTimeout(() => setPulsePosition(next), 150)
        return next
      })
    }, 1800)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section
      aria-labelledby="pipeline-heading"
      className={S.section}
      style={{ background: 'var(--forge-bg)' }}
    >
      <div className={S.divider} aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <div className={S.eyebrow} style={{ margin: '0 auto 24px' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--forge-orange)] shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
            AUTONOMOUS PIPELINE
          </div>
          <h2 id="pipeline-heading" className={S.h2}>
            From lead to closed deal.{' '}
            <span style={{ color: 'var(--forge-orange)' }}>Hands-free.</span>
          </h2>
          <p className={`${S.sub} max-w-xl mx-auto`}>
            Watch the full journey — from discovery to CRM sync — entirely automated by AI agents.
          </p>
        </motion.div>

        {/* Pipeline flow */}
        <div className="relative">
          {/* Desktop: horizontal flow */}
          <div className="hidden md:flex items-start justify-between gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = i === activeStep
              const isDone = i < activeStep

              return (
                <div key={step.label} className="flex flex-col items-center text-center flex-1 relative">
                  {/* Step card */}
                  <motion.div
                    className="relative z-10 w-full rounded-xl p-4"
                    style={{
                      background: isActive ? `${step.accent}10` : 'var(--forge-surface)',
                      border: `1px solid ${isActive ? step.accent + '40' : 'var(--forge-border)'}`,
                      boxShadow: isActive ? `0 0 20px ${step.accent}20` : 'none',
                    }}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      y: isActive ? -4 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                      style={{ background: `${step.accent}20` }}
                    >
                      <Icon size={20} color={step.accent} />
                    </div>
                    <div
                      className="text-[13px] font-semibold font-display mb-1"
                      style={{ color: isActive ? step.accent : isDone ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)' }}
                    >
                      {step.label}
                    </div>
                    <div className="text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {step.detail}
                    </div>

                    {/* Active indicator pulse */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                        style={{ background: step.accent, boxShadow: `0 0 10px ${step.accent}` }}
                        animate={{ scale: [1, 1.8, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Connector arrow to next step */}
                  {i < steps.length - 1 && (
                    <div className="absolute top-6 -right-2 z-0">
                      <ArrowRight
                        size={18}
                        color={i < activeStep ? step.accent + '60' : 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile: vertical flow */}
          <div className="flex md:hidden flex-col items-center gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = i === activeStep
              const isDone = i < activeStep

              return (
                <div key={step.label} className="flex items-start gap-4 w-full max-w-sm relative">
                  {/* Vertical connector */}
                  {i < steps.length - 1 && (
                    <div
                      className="absolute left-5 top-12 w-px h-10"
                      style={{ background: `linear-gradient(to bottom, ${isDone ? step.accent + '40' : 'rgba(255,255,255,0.06)'}, transparent)` }}
                    />
                  )}

                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: isActive ? `${step.accent}20` : isDone ? `${step.accent}10` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isActive ? step.accent + '50' : 'var(--forge-border)'}`,
                        boxShadow: isActive ? `0 0 12px ${step.accent}20` : 'none',
                      }}
                    >
                      <Icon size={18} color={isActive ? step.accent : isDone ? step.accent + '80' : 'rgba(255,255,255,0.25)'} />
                    </div>
                  </div>

                  {/* Label + detail */}
                  <div>
                    <div
                      className="text-[13px] font-semibold font-display"
                      style={{ color: isActive ? 'var(--forge-plasma)' : isDone ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)' }}
                    >
                      {step.label}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {step.detail}
                    </div>
                    {isActive && (
                      <div className="text-[10px] font-mono mt-1" style={{ color: step.accent }}>
                        {step.detailText}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Active step detail (desktop) */}
        <motion.div
          className="hidden md:flex justify-center mt-10"
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 font-mono text-[11px]"
            style={{
              background: `${steps[activeStep].accent}10`,
              border: `1px solid ${steps[activeStep].accent}25`,
              color: steps[activeStep].accent,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: steps[activeStep].accent, boxShadow: `0 0 6px ${steps[activeStep].accent}` }}
            />
            {steps[activeStep].detailText}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
