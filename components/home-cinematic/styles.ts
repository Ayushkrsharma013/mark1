import type { CSSProperties } from 'react'

export const S = {
  // Section containers
  section: 'relative z-10 px-6 py-24 md:py-32' as const,

  // Eyebrow label
  eyebrow:
    'inline-flex items-center gap-2 border border-[var(--forge-border)] rounded-full px-4 py-1.5 text-[11px] tracking-[0.12em] text-[var(--forge-orange)] bg-[rgba(255,107,0,0.06)] font-mono mb-6' as const,

  // Headings
  h1: 'font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight' as const,
  h2: 'font-display text-4xl md:text-5xl font-bold text-[var(--forge-plasma)] leading-tight mb-4' as const,
  sub: 'text-[var(--forge-plasma)]/70 text-base md:text-lg leading-relaxed' as const,

  // Cards
  card: 'bg-[var(--forge-surface)] border border-[var(--forge-border)] rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-[var(--forge-border-glow)]' as const,
  cardGlow: 'bg-[var(--forge-surface)] border border-[var(--forge-border)] rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-[var(--forge-border-glow)] hover:shadow-[0_0_30px_rgba(255,107,0,0.15)]' as const,

  // Buttons
  btnPrimary:
    'inline-flex items-center gap-2 bg-[var(--forge-orange)] text-white font-bold rounded-lg px-7 py-3.5 text-base font-display transition-all duration-300 hover:bg-[var(--forge-orange-glow)] hover:shadow-[0_0_40px_rgba(255,107,0,0.4)] active:scale-95' as const,
  btnOutline:
    'inline-flex items-center gap-2 border border-[var(--forge-orange)]/50 text-[var(--forge-orange)] rounded-lg px-6 py-3 text-sm font-display transition-all duration-300 hover:bg-[rgba(255,107,0,0.1)] hover:border-[var(--forge-orange)] hover:shadow-[0_0_20px_rgba(255,107,0,0.2)]' as const,
  btnGhost:
    'inline-flex items-center gap-2 text-[var(--forge-plasma)]/60 rounded-lg px-6 py-3 text-sm font-display transition-all duration-300 hover:text-[var(--forge-plasma)] hover:bg-[rgba(255,255,255,0.04)]' as const,

  // Section divider
  divider: 'h-px w-full bg-gradient-to-r from-transparent via-[var(--forge-border-glow)] to-transparent mb-16 md:mb-24' as const,
} as const

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

// Glow color helper
export function glowStyle(color: string, size = 600): CSSProperties {
  return {
    background: `radial-gradient(ellipse ${size}px ${size * 0.7}px at 50% 50%, ${color} 0%, transparent 65%)`,
  }
}
