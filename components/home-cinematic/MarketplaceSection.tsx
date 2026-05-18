'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Zap, Brain, ShieldCheck, MessageSquare, BarChart3, Bot } from 'lucide-react'
import { S, fadeUp, staggerContainer } from './styles'

const agents = [
  {
    icon: Bot,
    name: 'The Prospectron',
    tagline: 'Autonomous lead discovery across 50+ sources.',
    metrics: { tasks: '1.2k', accuracy: '97%', uptime: '99.9%' },
    status: 'Available',
    accent: '#FF6B00',
    emoji: '🤖',
  },
  {
    icon: Brain,
    name: 'Data Weaver',
    tagline: 'Enriches raw leads with firmographics, intent signals, and tech stack.',
    metrics: { tasks: '847', accuracy: '94%', uptime: '99.7%' },
    status: 'Deployed',
    accent: '#A78BFA',
    emoji: '🧠',
  },
  {
    icon: MessageSquare,
    name: 'Outreach Sentinel',
    tagline: 'Multi-channel outreach with AI personalization at scale.',
    metrics: { tasks: '3.4k', accuracy: '96%', uptime: '99.8%' },
    status: 'Available',
    accent: '#38BDF8',
    emoji: '📡',
  },
  {
    icon: ShieldCheck,
    name: 'Guardian AI',
    tagline: 'Monitors compliance, deliverability, and system health 24/7.',
    metrics: { tasks: '560', accuracy: '99.9%', uptime: '100%' },
    status: 'Active',
    accent: '#34D399',
    emoji: '🛡️',
  },
  {
    icon: BarChart3,
    name: 'Pulse Analytics',
    tagline: 'Real-time pipeline analytics with AI-powered forecasting.',
    metrics: { tasks: '920', accuracy: '98%', uptime: '99.5%' },
    status: 'Available',
    accent: '#F472B6',
    emoji: '📊',
  },
  {
    icon: Zap,
    name: 'Flow Orchestrator',
    tagline: 'Coordinates all agents into seamless end-to-end workflows.',
    metrics: { tasks: '2.1k', accuracy: '95%', uptime: '99.6%' },
    status: 'Deployed',
    accent: '#FF9A3C',
    emoji: '⚡',
  },
]

function AgentCard({ agent, index }: { agent: typeof agents[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { stiffness: 200, damping: 25 })

  function onMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  function onMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      custom={index * 0.08}
      className="holographic-border scanlines relative rounded-xl p-6 cursor-default"
      style={{
        background: 'var(--forge-surface)',
        border: `1px solid var(--forge-border)`,
        perspective: '800px',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{
        borderColor: `${agent.accent}40`,
        boxShadow: `0 0 30px ${agent.accent}15`,
        y: -4,
        transition: { duration: 0.25 },
      }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl" aria-hidden="true">
            {agent.emoji}
          </div>
          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-mono tracking-wider"
            style={{
              background: `${agent.accent}15`,
              color: agent.accent,
              border: `1px solid ${agent.accent}25`,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: agent.accent, boxShadow: `0 0 6px ${agent.accent}` }} />
            {agent.status}
          </div>
        </div>

        {/* Name + Tagline */}
        <h3 className="font-display text-base font-semibold mb-1.5" style={{ color: 'var(--forge-plasma)' }}>
          {agent.name}
        </h3>
        <p className="text-[13px] leading-relaxed mb-5" style={{ color: 'var(--forge-plasma)', opacity: 0.5 }}>
          {agent.tagline}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(agent.metrics).map(([key, val]) => (
            <div
              key={key}
              className="rounded-lg py-2 px-1.5 text-center"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="text-sm font-bold font-display" style={{ color: 'var(--forge-plasma)' }}>
                {val}
              </div>
              <div className="text-[9px] font-mono tracking-wider mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {key.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function MarketplaceSection() {
  return (
    <section
      aria-labelledby="marketplace-heading"
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
            AGENT MARKETPLACE
          </div>
          <h2 id="marketplace-heading" className={S.h2}>
            Deploy specialized agents{' '}
            <span style={{ color: 'var(--forge-orange)' }}>from the forge.</span>
          </h2>
          <p className={`${S.sub} max-w-xl mx-auto`}>
            Pre-built AI agents for every function. Deploy in one click, customize with natural language.
          </p>
        </motion.div>

        {/* Agent cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {agents.map((agent, i) => (
            <AgentCard key={agent.name} agent={agent} index={i} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            12+ additional agents in development. Request custom agents for your stack.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
