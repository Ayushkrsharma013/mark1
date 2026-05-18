'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Cpu, HardDrive, Wifi, CheckCircle2, Clock, AlertTriangle, BarChart3 } from 'lucide-react'
import { S, fadeUp } from './styles'

const workflowSteps = [
  { label: 'Lead Ingested', time: '2m ago', status: 'done' },
  { label: 'AI Enriched', time: '1m ago', status: 'done' },
  { label: 'ICP Qualified', time: '45s ago', status: 'done' },
  { label: 'Outreach Sent', time: '20s ago', status: 'active' },
  { label: 'CRM Synced', time: 'pending', status: 'waiting' },
]

const stats = [
  { label: 'Leads Processed', value: '847', change: '+12%', color: '#FF6B00' },
  { label: 'Success Rate', value: '94%', change: '+2.4%', color: '#34D399' },
  { label: 'Time Saved', value: '15hr/wk', change: '+3hr', color: '#38BDF8' },
]

const agentStates = [
  { name: 'ScoutBot', status: 'idle' as const },
  { name: 'EnrichAI', status: 'working' as const },
  { name: 'ScoreBot', status: 'working' as const },
  { name: 'OutreachAI', status: 'active' as const },
  { name: 'SyncBot', status: 'idle' as const },
  { name: 'GuardBot', status: 'thinking' as const },
]

const statusConfig = {
  idle: { color: '#34D399', label: 'IDLE' },
  working: { color: '#FF6B00', label: 'WORKING' },
  active: { color: '#38BDF8', label: 'ACTIVE' },
  thinking: { color: '#A78BFA', label: 'THINKING' },
  error: { color: '#EF4444', label: 'ERROR' },
}

const activityLogs = [
  '[AI] Analyzing lead #4421 from LinkedIn...',
  '[SCOUT] Found 23 new prospects on Google Maps',
  '[AI] 94% ICP match confidence — routing to enrichment',
  '[ENRICH] Fetching company data for acme.co',
  '[OUTREACH] Message sent to jane@acme.co via WhatsApp',
  '[CRM] Syncing 12 new contacts to HubSpot',
  '[AI] Lead #4421 scored: 92/100 — fast track',
  '[GUARD] Health check passed — all systems nominal',
]

function ActivityFeed() {
  const [lines, setLines] = useState<string[]>(activityLogs.slice(0, 4))
  const [current, setCurrent] = useState(4)

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, activityLogs[current % activityLogs.length]]
        if (next.length > 6) next.shift()
        return next
      })
      setCurrent((c) => c + 1)
    }, 1200)
    return () => clearInterval(interval)
  }, [current])

  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => (
        <div
          key={`${line}-${i}`}
          className="font-mono text-[11px] leading-relaxed py-1"
          style={{
            color: i === lines.length - 1 ? 'var(--forge-plasma)' : 'rgba(255,255,255,0.3)',
            opacity: 1 - (lines.length - 1 - i) * 0.12,
          }}
        >
          <span className="mr-1.5 opacity-40">{'>'}</span>
          {line}
        </div>
      ))}
      <div className="font-mono text-[11px] flex items-center gap-1.5 pt-1" style={{ color: 'var(--forge-orange)' }}>
        <span className="inline-block w-1.5 h-3 bg-[var(--forge-orange)] animate-pulse" />
        _
      </div>
    </div>
  )
}

export function CommandCenterSection() {
  return (
    <section
      aria-labelledby="command-heading"
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
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--forge-orange)] shadow-[0_0_8px_rgba(255,107,0,0.6)] animate-pulse" />
            COMMAND CENTER
          </div>
          <h2 id="command-heading" className={S.h2}>
            Your AI Workforce,{' '}
            <span style={{ color: 'var(--forge-orange)' }}>Orchestrated.</span>
          </h2>
          <p className={`${S.sub} max-w-xl mx-auto`}>
            Every agent, every task, every outcome — visible in real-time from a single pane of glass.
          </p>
        </motion.div>

        {/* Main dashboard panel */}
        <motion.div
          className="forge-glass rounded-2xl overflow-hidden border-[var(--forge-border)]"
          style={{
            boxShadow: '0 0 60px rgba(255,107,0,0.06), 0 20px 60px rgba(0,0,0,0.4)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top bar: System status */}
          <div
            className="flex items-center justify-between px-6 py-3 border-b"
            style={{ borderColor: 'var(--forge-border)' }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                <span className="text-[11px] font-mono tracking-wider text-green-400">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {agentStates.map((agent) => {
                const cfg = statusConfig[agent.status]
                return (
                  <div key={agent.name} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }} />
                    <span className="text-[9px] font-mono tracking-wider" style={{ color: cfg.color }}>
                      {agent.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Body: 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'var(--forge-border)' }}>
            {/* Left: Workflow timeline */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} color="var(--forge-orange)" />
                <span className="text-[11px] font-mono tracking-wider" style={{ color: 'var(--forge-plasma)' }}>
                  WORKFLOW TIMELINE
                </span>
              </div>
              <div className="relative pl-5">
                {/* Vertical line */}
                <div className="absolute left-2.5 top-1 bottom-1 w-px" style={{ background: 'var(--forge-border)' }} />
                {workflowSteps.map((step, i) => (
                  <div key={step.label} className="relative mb-5 last:mb-0">
                    {/* Dot on timeline */}
                    <div
                      className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        background: step.status === 'active' ? 'var(--forge-orange)' : step.status === 'done' ? 'rgba(255,107,0,0.3)' : 'transparent',
                        borderColor: step.status === 'active' ? 'var(--forge-orange)' : step.status === 'done' ? 'var(--forge-orange)' : 'rgba(255,255,255,0.2)',
                        boxShadow: step.status === 'active' ? '0 0 8px rgba(255,107,0,0.6)' : 'none',
                      }}
                    >
                      {step.status === 'active' && (
                        <span
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{ background: 'var(--forge-orange)', opacity: 0.3 }}
                        />
                      )}
                    </div>
                    <div className="text-[12px] font-semibold" style={{ color: step.status === 'waiting' ? 'rgba(255,255,255,0.3)' : 'var(--forge-plasma)' }}>
                      {step.label}
                    </div>
                    <div className="text-[10px] font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {step.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center: Activity feed */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={14} color="var(--forge-orange)" />
                <span className="text-[11px] font-mono tracking-wider" style={{ color: 'var(--forge-plasma)' }}>
                  LIVE ACTIVITY
                </span>
              </div>
              <ActivityFeed />
            </div>

            {/* Right: Stats + Health */}
            <div className="p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={14} color="var(--forge-orange)" />
                <span className="text-[11px] font-mono tracking-wider" style={{ color: 'var(--forge-plasma)' }}>
                  ANALYTICS
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 mb-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg p-3"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--forge-border)' }}
                  >
                    <div className="text-2xl font-bold font-display" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] font-mono tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {stat.label}
                      </span>
                      <span className="text-[10px] font-mono" style={{ color: '#34D399' }}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* System health */}
              <div className="mt-auto">
                <div className="text-[10px] font-mono tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  SYSTEM HEALTH
                </div>
                {[
                  { icon: Cpu, label: 'CPU', value: 42 },
                  { icon: HardDrive, label: 'MEM', value: 58 },
                  { icon: Wifi, label: 'NET', value: 35 },
                ].map((h) => {
                  const Icon = h.icon
                  return (
                    <div key={h.label} className="flex items-center gap-3 mb-2">
                      <Icon size={12} color="rgba(255,255,255,0.3)" />
                      <span className="text-[10px] font-mono w-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {h.label}
                      </span>
                      <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${h.value}%`,
                            background:
                              h.value > 70
                                ? '#EF4444'
                                : h.value > 45
                                  ? 'var(--forge-orange)'
                                  : '#34D399',
                            boxShadow: `0 0 6px ${h.value > 70 ? '#EF4444' : h.value > 45 ? 'var(--forge-orange)' : '#34D399'}40`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] font-mono w-8 text-right" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {h.value}%
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
