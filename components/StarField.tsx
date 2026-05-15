'use client'

import { useEffect, useRef } from 'react'

const CHARS = ['.', '·', '+', '×', '✦', '⋆', '*', '◦', '°']
const COLORS = [
  'rgba(200, 230, 255, {a})',
  'rgba(147, 197, 253, {a})',
  'rgba(186, 230, 253, {a})',
  'rgba(224, 242, 254, {a})',
]
const STAR_COUNT = 280

interface Star {
  x: number; y: number
  char: string
  size: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
  colorTemplate: string
}

function makeStars(w: number, h: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    char: CHARS[Math.floor(Math.random() * CHARS.length)],
    size: 8 + Math.random() * 8,
    baseOpacity: 0.1 + Math.random() * 0.5,
    twinkleSpeed: 0.003 + Math.random() * 0.009,
    twinkleOffset: Math.random() * Math.PI * 2,
    colorTemplate: COLORS[Math.floor(Math.random() * COLORS.length)],
  }))
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      starsRef.current = makeStars(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of starsRef.current) {
        const opacity = s.baseOpacity * (0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinkleOffset))
        ctx.globalAlpha = opacity
        ctx.font = `${s.size}px var(--font-jetbrains-mono, monospace)`
        ctx.fillStyle = s.colorTemplate.replace('{a}', '1')
        ctx.fillText(s.char, s.x, s.y)
      }
      ctx.globalAlpha = 1
      t++
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
