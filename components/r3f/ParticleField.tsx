'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  color?: string
  size?: number
  speed?: number
  className?: string
}

function Particles({ count = 200, color = '#FF6B00', size = 0.03, speed = 0.5 }: Required<Omit<ParticleFieldProps, 'className'>>) {
  const pointsRef = useRef<THREE.Points>(null)
  const positions = useRef<Float32Array>(
    new Float32Array(Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 10))
  )

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const pos = positions.current
    const driftSpeed = speed * delta * 0.5
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += driftSpeed * (0.5 + Math.random() * 0.5)
      if (pos[i * 3 + 1] > 5) {
        pos[i * 3 + 1] = -5
        pos[i * 3] = (Math.random() - 0.5) * 10
        pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y += driftSpeed * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function ParticleField({
  count = 200,
  color = '#FF6B00',
  size = 0.03,
  speed = 0.5,
  className,
}: ParticleFieldProps) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <Suspense fallback={null}>
          <Particles count={count} color={color} size={size} speed={speed} />
        </Suspense>
      </Canvas>
    </div>
  )
}
