'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface EnergyRingsProps {
  color?: string
  ringCount?: number
  maxRadius?: number
  speed?: number
  className?: string
}

function Rings({ color = '#FF6B00', ringCount = 5, maxRadius = 4, speed = 0.5 }: Required<Omit<EnergyRingsProps, 'className'>>) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * speed * (0.5 + i * 0.15) * (i % 2 === 0 ? 1 : -1)
      child.rotation.z += delta * speed * (0.3 + i * 0.1)
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: ringCount }, (_, i) => {
        const radius = (maxRadius / ringCount) * (i + 1)
        const opacity = 0.4 - i * 0.07
        return (
          <mesh key={i} rotation={[Math.PI * 0.3 + i * 0.25, 0, i * 0.2]}>
            <torusGeometry args={[radius, 0.008 + i * 0.002, 8, 100]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={Math.max(opacity, 0.05)}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function EnergyRings({
  color = '#FF6B00',
  ringCount = 5,
  maxRadius = 4,
  speed = 0.5,
  className,
}: EnergyRingsProps) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <Rings color={color} ringCount={ringCount} maxRadius={maxRadius} speed={speed} />
        </Suspense>
      </Canvas>
    </div>
  )
}
