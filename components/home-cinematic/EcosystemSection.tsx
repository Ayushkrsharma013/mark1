'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import {
  Radar, Workflow, BarChart3, ShoppingBag,
  HeadphonesIcon, Database,
} from 'lucide-react'
import { S, fadeUp, staggerContainer } from './styles'

const NeuralEcosystem = dynamic(() => import('@/components/r3f/NeuralEcosystem'), { ssr: false })

const systems = [
  {
    icon: Radar,
    title: 'Prospecting OS',
    desc: 'AI-powered lead discovery across LinkedIn, Google Maps, and Amazon.',
    color: '#FF6B00',
  },
  {
    icon: Workflow,
    title: 'Workflow Engine',
    desc: 'Drag-and-drop automation sequences. No code required.',
    color: '#38BDF8',
  },
  {
    icon: BarChart3,
    title: 'AI Analytics',
    desc: 'Real-time pipeline metrics, conversion tracking, and agent performance.',
    color: '#A78BFA',
  },
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    desc: 'Deploy specialized AI agents from our curated forge marketplace.',
    color: '#34D399',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support AI',
    desc: '24/7 autonomous customer support agents that learn from every interaction.',
    color: '#F472B6',
  },
  {
    icon: Database,
    title: 'CRM Sync',
    desc: 'Bidirectional sync with your existing CRM. Zero manual data entry.',
    color: '#60A5FA',
  },
]

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ecosystem-heading"
      className={S.section}
      style={{ background: 'var(--forge-bg)' }}
    >
      <div className={S.divider} aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <div className={S.eyebrow} style={{ margin: '0 auto 24px' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--forge-orange)] shadow-[0_0_8px_rgba(255,107,0,0.6)]" />
            THE AI ECOSYSTEM
          </div>
          <h2 id="ecosystem-heading" className={S.h2}>
            Six integrated systems.{' '}
            <span style={{ color: 'var(--forge-orange)' }}>One operating system.</span>
          </h2>
          <p className={`${S.sub} max-w-xl mx-auto`}>
            Each module operates autonomously, but they share intelligence —
            creating a workforce that gets smarter with every task.
          </p>
        </motion.div>

        {/* 3D Visualization */}
        <motion.div
          className="relative w-full h-[400px] md:h-[500px] mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <NeuralEcosystem />
        </motion.div>

        {/* System cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {systems.map((sys) => {
            const Icon = sys.icon
            return (
              <motion.div
                key={sys.title}
                variants={fadeUp}
                className={S.card}
                style={{
                  borderColor: `${sys.color}15`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${sys.color}40`
                  e.currentTarget.style.boxShadow = `0 0 20px ${sys.color}15, inset 0 0 20px ${sys.color}05`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--forge-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${sys.color}15` }}
                >
                  <Icon size={20} color={sys.color} />
                </div>
                <h3 className="font-display text-[15px] font-semibold mb-1.5" style={{ color: 'var(--forge-plasma)' }}>
                  {sys.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--forge-plasma)', opacity: 0.55 }}>
                  {sys.desc}
                </p>
                {/* Status dot */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: sys.color, boxShadow: `0 0 6px ${sys.color}` }} />
                  <span className="text-[10px] font-mono tracking-wider" style={{ color: sys.color }}>
                    OPERATIONAL
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
