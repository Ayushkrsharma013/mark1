'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Bot, Workflow, Target, Code2, Package, Lightbulb,
  CheckCircle2, Gift, Clock, Users2, ChevronRight, Star
} from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const HeroOrb = dynamic(() => import('@/components/3d/HeroOrb'), { ssr: false })
const NetworkMesh = dynamic(() => import('@/components/3d/NetworkMesh'), { ssr: false })
const DataCube = dynamic(() => import('@/components/3d/DataCube'), { ssr: false })

const S = {
  eyebrow: 'inline-flex items-center gap-2 border border-[rgba(56,189,248,0.3)] rounded-full px-4 py-1.5 text-[11px] tracking-[0.12em] text-[var(--accent-cyan)] bg-[rgba(56,189,248,0.06)] font-mono mb-6',
  h2: 'font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4',
  sub: 'text-[var(--text-secondary)] text-base md:text-lg leading-relaxed',
  card: 'bg-[var(--bg-surface)] border border-[rgba(99,179,237,0.08)] rounded-xl p-6 md:p-8 transition-all duration-200 hover:border-[rgba(56,189,248,0.25)] hover:shadow-[inset_0_0_0_1px_rgba(56,189,248,0.15)]',
  btnPrimary: 'inline-flex items-center gap-2 bg-[var(--accent-cyan)] text-[#000810] font-bold rounded-lg px-7 py-3.5 text-base font-display transition-all duration-[250ms] hover:bg-[#7DF9FF] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] active:scale-95',
  btnOutline: 'inline-flex items-center gap-2 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded-lg px-6 py-3 text-sm font-display transition-all duration-200 hover:bg-[rgba(56,189,248,0.1)] hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]',
} as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }
  })
}

const services = [
  { icon: Bot, title: 'AI Agents & Chatbots', desc: 'Custom AI agents that handle customer support, lead qualification, and scheduling — 24/7, without human intervention.' },
  { icon: Workflow, title: 'Workflow Automation', desc: 'End-to-end automation of repetitive business processes. From data entry to multi-step approval chains.' },
  { icon: Target, title: 'ICP Scoring & Lead Intel', desc: 'Know exactly who to target before you reach out. AI-powered scoring identifies best-fit clients from any source.' },
  { icon: Code2, title: 'Custom AI Development', desc: 'Bespoke solutions built on Claude, GPT, and open-source models. Tailored to your exact business logic and workflows.' },
  { icon: Package, title: 'Productized Services', desc: 'Ready-to-use AI tools like Prospecting OS — plug in your API keys and start generating pipeline in minutes.' },
  { icon: Lightbulb, title: 'AI Strategy & Consulting', desc: 'Not sure where to start? We map your highest-ROI automation opportunities and build a phased execution roadmap.' },
]

const stats = [
  { value: '10K+', label: 'Leads Scraped' },
  { value: '94%', label: 'ICP Match Rate' },
  { value: '100%', label: 'AI Personalization' },
  { value: '15hr/wk', label: 'Time Saved' },
]

const features = [
  'Multi-source lead scraping (LinkedIn, Google Maps, Amazon)',
  'AI-powered ICP scoring with reasoning breakdown',
  'AI message lab — personalized outreach at scale',
  'Kanban pipeline with drag-and-drop deal tracking',
  'Built-in analytics with 7/30/90-day filters',
]

const perks = [
  { icon: Gift, title: 'Free Strategy Audit', desc: 'Worth $500. We map your highest-ROI automation opportunities — no strings.' },
  { icon: Clock, title: '40% Early-Adopter Rate', desc: 'Locked in for your first 6 months. No contracts. Cancel any time.' },
  { icon: Users2, title: 'Founding Team Access', desc: 'Direct Slack channel with us. Weekly check-ins while you onboard.' },
]

export default function HomePage() {
  useScrollReveal()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleBetaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════════ */}
      <section
        aria-label="Hero"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 800px 500px at 50% 40%, rgba(56,189,248,0.04) 0%, transparent 70%)' }}
        />
        <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
        >
          {/* AEO entity description — screen reader only */}
          <span className="sr-only">
            FlowForges is an AI automation agency that builds productized AI agents for digital
            and creative agencies. Services include workflow automation, lead generation,
            AI chatbots, and custom AI development.
          </span>

          <motion.div variants={fadeUp} custom={0} className={S.eyebrow}>
            <span>AI AUTOMATION FOR DIGITAL AGENCIES</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Replace repetitive ops
            <br />with systems that
            <br />
            <span style={{ color: 'var(--accent-electric)', textShadow: '0 0 40px rgba(125,249,255,0.3)' }}>
              run themselves.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            FlowForges builds productized AI agents for creative and digital agencies.
            Plug in your stack. Step back. Ship more.
          </motion.p>

          <motion.div variants={fadeUp} custom={0.3} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/book" className={S.btnPrimary}>
              Book a Free Strategy Call
            </Link>
            <Link href="/products" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors flex items-center gap-1">
              See the product <ChevronRight size={14} />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <div className="flex -space-x-2" aria-hidden="true">
              {(['#0c4a6e', '#164e63', '#0e7490'] as const).map((bg, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg-void)] flex items-center justify-center text-[10px] font-bold text-white" style={{ background: bg }}>
                  {(['A', 'B', 'C'] as const)[i]}
                </div>
              ))}
            </div>
            <div className="flex gap-0.5" aria-label="5 stars" role="img">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#FCD34D" color="#FCD34D" />
              ))}
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Trusted by 12+ agencies · US · UK · AU
            </span>
          </motion.div>
        </motion.div>

        {/* Hero 3D Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-[280px] h-[280px] md:w-[400px] md:h-[400px] -mt-8 md:-mt-16"
          aria-hidden="true"
        >
          <HeroOrb />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: SERVICES
          ═══════════════════════════════════════════════ */}
      <section aria-labelledby="services-heading" className="relative z-10 px-6 py-24 md:py-32">
        <div className="scan-line mb-16 md:mb-24" aria-hidden="true" />

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
            <motion.div
              className="reveal-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className={S.eyebrow}>CAPABILITIES</div>
              <h2 id="services-heading" className={S.h2}>
                Full-stack AI automation,
                <br />
                <span style={{ color: 'var(--accent-electric)' }}>end to end.</span>
              </h2>
              <p className={`${S.sub} max-w-md`}>
                From strategy to deployment, we cover every layer of the AI stack so you
                don&apos;t have to stitch together five different vendors.
              </p>
            </motion.div>

            <div
              className="w-full md:w-[320px] h-[200px] flex-shrink-0"
              aria-hidden="true"
            >
              <NetworkMesh />
            </div>
          </div>

          {/* 6-card unified panel grid */}
          <div
            className="reveal-item rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--border-dim)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((svc, i) => {
                const Icon = svc.icon
                const isLastRow = i >= 3
                const isLastCol = (i + 1) % 3 === 0
                return (
                  <div
                    key={svc.title}
                    className={[
                      'p-7 transition-all duration-200 hover:bg-[var(--bg-elevated)]',
                      !isLastCol ? 'border-r border-[rgba(99,179,237,0.08)]' : '',
                      !isLastRow ? 'border-b border-[rgba(99,179,237,0.08)]' : '',
                    ].join(' ')}
                    style={{ background: 'var(--bg-surface)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 border"
                      style={{ background: 'rgba(56,189,248,0.08)', borderColor: 'var(--border-dim)' }}
                      aria-hidden="true"
                    >
                      <Icon size={20} color="var(--accent-cyan)" />
                    </div>
                    <h3 className="font-display text-[15px] font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {svc.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {svc.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: PROSPECTING OS (Flagship Product)
          ═══════════════════════════════════════════════ */}
      <section aria-labelledby="product-heading" className="relative z-10 px-6 py-24 md:py-32">
        <div className="scan-line mb-16 md:mb-24" aria-hidden="true" />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: copy + stats + features */}
            <motion.div
              className="reveal-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className={S.eyebrow}>FLAGSHIP PRODUCT</div>
              <h2 id="product-heading" className={S.h2}>Prospecting OS</h2>
              <p className={`${S.sub} mb-8`}>
                Find, score, message, and manage B2B leads from LinkedIn, Google Maps,
                and Amazon — all in one workspace. The first productized service from FlowForges.
              </p>

              {/* Stats grid — plain text for SEO indexability */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {stats.map(s => (
                  <div
                    key={s.label}
                    className="rounded-xl p-4 border"
                    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-dim)' }}
                  >
                    <div className="font-mono text-3xl font-bold mb-1" style={{ color: 'var(--accent-electric)' }}>
                      {s.value}<sup className="text-sm ml-0.5" style={{ color: 'var(--text-muted)' }}>*</sup>
                    </div>
                    <div className="text-[11px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] mb-8" style={{ color: 'var(--text-muted)' }}>
                * Internal beta data. Results may vary.
              </p>

              {/* Feature list */}
              <ul className="space-y-3 mb-8" aria-label="Prospecting OS features">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[14px]" style={{ color: 'var(--text-secondary)' }}>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(56,189,248,0.1)' }}
                    >
                      <CheckCircle2 size={12} color="var(--accent-cyan)" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="https://lead-engine-henna.vercel.app" target="_blank" rel="noopener noreferrer" className={S.btnOutline}>
                Try Prospecting OS <ChevronRight size={14} />
              </Link>
            </motion.div>

            {/* Right: 3D cube + browser mockup */}
            <div className="flex flex-col gap-6">
              <motion.div
                className="reveal-item w-full h-[280px] md:h-[360px]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                <DataCube />
              </motion.div>

              {/* Browser mockup frame */}
              <div
                className="reveal-item rounded-xl overflow-hidden"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-dim)' }}
              >
                <div
                  className="h-10 flex items-center px-3 gap-2"
                  style={{ background: '#060c18' }}
                  aria-hidden="true"
                >
                  <div className="flex gap-1.5">
                    {(['#374151', '#374151', '#374151'] as const).map((c, i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <div
                    className="flex-1 h-5 rounded flex items-center justify-center font-mono text-[11px]"
                    style={{ background: '#0a1628', color: 'var(--text-muted)' }}
                  >
                    lead-engine-henna.vercel.app
                  </div>
                </div>
                <div
                  className="aspect-video flex flex-col items-center justify-center gap-2"
                  style={{ background: '#030609' }}
                >
                  <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>[ LIVE DEMO ]</span>
                  <Link
                    href="https://lead-engine-henna.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs transition-colors hover:underline"
                    style={{ color: 'var(--accent-cyan)' }}
                  >
                    Open in new tab →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4: BETA PROGRAM
          ═══════════════════════════════════════════════ */}
      <section aria-labelledby="beta-heading" className="relative z-10 px-6 py-24 md:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(56,189,248,0.03) 50%, transparent 100%)' }}
        />
        <div className="scan-line mb-16 md:mb-24" aria-hidden="true" />

        <div className="max-w-2xl mx-auto text-center reveal-item">
          <div className={S.eyebrow} style={{ margin: '0 auto 24px' }}>EARLY ACCESS</div>
          <h2 id="beta-heading" className={S.h2}>
            Currently accepting
            <br />
            <span style={{ color: 'var(--accent-electric)' }}>beta partners.</span>
          </h2>
          <p className={`${S.sub} mb-12 max-w-lg mx-auto`}>
            We&apos;re building with a small cohort of digital agencies. Beta partners get
            direct access to our founding team and first-mover pricing before public launch.
          </p>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {perks.map((p, i) => {
              const Icon = p.icon
              return (
                <div key={p.title} className={`${S.card} reveal-item reveal-delay-${(i + 1) * 100} text-center`}>
                  <Icon size={28} color="var(--accent-cyan)" className="mx-auto mb-3" aria-hidden="true" />
                  <div className="font-display text-[14px] font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{p.title}</div>
                  <div className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.desc}</div>
                </div>
              )
            })}
          </div>

          {!submitted ? (
            <form
              onSubmit={handleBetaSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              aria-label="Beta access application form"
            >
              <label htmlFor="beta-email" className="sr-only">Your agency email</label>
              <input
                id="beta-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@agency.com"
                className="flex-1 rounded-lg px-4 py-3 text-[14px] outline-none transition-all"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-dim)',
                  color: 'var(--text-primary)',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.1)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'var(--border-dim)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
              <button type="submit" className={S.btnPrimary} style={{ whiteSpace: 'nowrap' }}>
                Apply Now
              </button>
            </form>
          ) : (
            <div className="font-display text-lg" style={{ color: 'var(--accent-cyan)' }}>
              ✦ Application received — we&apos;ll be in touch.
            </div>
          )}
          <p className="mt-3 text-[11px]" style={{ color: 'var(--text-muted)' }}>
            No spam. No contracts. Unsubscribe any time.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5: CLOSING CTA
          ═══════════════════════════════════════════════ */}
      <section aria-labelledby="cta-heading" className="relative z-10 px-6 py-32 md:py-40 text-center">
        <div className="max-w-3xl mx-auto reveal-item">
          <h2
            id="cta-heading"
            className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            The agencies shipping more
            <br />
            this quarter aren&apos;t working harder.
          </h2>
          <p className="text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            They automated the ops that were eating their hours.
            Let&apos;s build that for you.
          </p>
          <Link href="/book" className={S.btnPrimary}>
            Book a Free Strategy Call
          </Link>
          <p className="mt-4 text-[12px]" style={{ color: 'var(--text-muted)' }}>
            30-min call. No pitch deck.
          </p>
        </div>
      </section>
    </>
  )
}
