'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Only enable Lenis on the homepage
    if (pathname !== '/') return

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Connect GSAP ScrollTrigger to Lenis
    ScrollTrigger.defaults({ scroller: window as unknown as string | Element })
    lenis.on('scroll', ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ScrollTrigger.killAll()
    }
  }, [pathname])

  return <>{children}</>
}
