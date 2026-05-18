'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onLoaded: () => void
}

export function Preloader({ onLoaded }: PreloaderProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReducedMotion(true)
      onLoaded()
      return
    }
    setReducedMotion(mq.matches)
  }, [onLoaded])

  useEffect(() => {
    if (reducedMotion) return

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: '-100%',
          duration: 0.8,
          ease: 'power2.inOut',
          delay: 0.2,
          onComplete: onLoaded,
        })
      },
    })

    // Stage 1: Logo text reveal
    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )

    // Stage 2: Forge rings expand
    tl.fromTo(
      ringsRef.current?.children || [],
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )

    // Stage 3: Progress bar fills
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 1.5, ease: 'power2.inOut' },
      '-=0.5'
    )
  }, [reducedMotion, onLoaded])

  if (reducedMotion) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'var(--forge-bg)' }}
      aria-hidden="true"
      role="progressbar"
      aria-valuenow={100}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 600px 400px at 50% 50%, rgba(255,107,0,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Logo text */}
      <div ref={textRef} className="relative z-10 text-center mb-12">
        <h1
          className="font-display text-5xl md:text-7xl font-bold tracking-tight"
          style={{ color: 'var(--forge-plasma)' }}
        >
          Flow<span style={{ color: 'var(--forge-orange)' }}>Forges</span>
        </h1>
        <p
          className="mt-4 text-sm md:text-base tracking-[0.2em] font-mono"
          style={{ color: 'var(--forge-orange-glow)' }}
        >
          FORGE REACTOR INITIALIZING
        </p>
      </div>

      {/* Ignition rings */}
      <div ref={ringsRef} className="relative mb-10" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: `${80 + i * 60}px`,
              height: `${80 + i * 60}px`,
              marginLeft: `-${40 + i * 30}px`,
              marginTop: `-${40 + i * 30}px`,
              borderColor: `rgba(255,107,0,${0.5 - i * 0.15})`,
              opacity: 0,
            }}
          />
        ))}
        {/* Center dot */}
        <div
          className="w-4 h-4 rounded-full mx-auto"
          style={{
            background: 'var(--forge-orange)',
            boxShadow: '0 0 20px rgba(255,107,0,0.8), 0 0 40px rgba(255,107,0,0.4)',
            opacity: 0,
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-48 md:w-64">
        <div
          className="h-0.5 rounded-full w-full"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <div
            ref={progressRef}
            className="h-full rounded-full"
            style={{
              width: '0%',
              background: 'linear-gradient(90deg, var(--forge-orange), var(--forge-orange-glow))',
              boxShadow: '0 0 10px rgba(255,107,0,0.5)',
            }}
          />
        </div>
        <p
          className="text-[10px] tracking-[0.15em] font-mono mt-3 text-center"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          AI SYSTEMS ONLINE
        </p>
      </div>
    </div>
  )
}
