'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function EmberParticles({ count = 200, intensity = 0.8 }: { count?: number; intensity?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const positions = useRef<Float32Array>(
    new Float32Array(Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 8))
  )
  const velocities = useRef<Float32Array>(
    new Float32Array(Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 0.008))
  )

  useFrame(() => {
    if (!pointsRef.current) return
    const pos = positions.current
    const vel = velocities.current
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += vel[i * 3 + 1]
      pos[i * 3] += vel[i * 3]
      pos[i * 3 + 2] += vel[i * 3 + 2]
      if (pos[i * 3 + 1] > 3.5) {
        pos[i * 3 + 1] = -3.5
        pos[i * 3] = (Math.random() - 0.5) * 6
        pos[i * 3 + 2] = (Math.random() - 0.5) * 4
      }
      if (Math.abs(pos[i * 3]) > 3) pos[i * 3] *= -0.9
      if (Math.abs(pos[i * 3 + 2]) > 2.5) pos[i * 3 + 2] *= -0.9
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
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
        size={0.025}
        color={new THREE.Color(1.0, 0.42, 0.0)}
        transparent
        opacity={intensity * 0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function ReactorCore({ intensity = 0.8 }: { intensity?: number }) {
  const coreRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4
      coreRef.current.rotation.x += delta * 0.15
      const s = 1 + Math.sin(Date.now() * 0.003) * 0.08 * intensity
      coreRef.current.scale.setScalar(s)
    }
    if (haloRef.current) {
      haloRef.current.rotation.y -= delta * 0.15
      haloRef.current.rotation.x += delta * 0.08
    }
  })

  return (
    <group>
      {/* Core icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color={new THREE.Color(1.0, 0.42, 0.0)}
          emissive={new THREE.Color(1.0, 0.3, 0.0)}
          emissiveIntensity={1.5 * intensity}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={haloRef}>
        <icosahedronGeometry args={[1.32, 0]} />
        <meshBasicMaterial
          color={new THREE.Color(1.0, 0.6, 0.15)}
          wireframe
          transparent
          opacity={0.2 * intensity}
        />
      </mesh>

      {/* Ambient glow halo */}
      <mesh>
        <icosahedronGeometry args={[1.65, 0]} />
        <meshBasicMaterial
          color={new THREE.Color(1.0, 0.42, 0.0)}
          transparent
          opacity={0.06 * intensity}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

function EnergyRings({ intensity = 0.8 }: { intensity?: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    for (let i = 0; i < groupRef.current.children.length; i++) {
      const child = groupRef.current.children[i]
      child.rotation.x += delta * (0.2 + i * 0.08) * (i % 2 === 0 ? 1 : -1)
      child.rotation.z += delta * (0.15 + i * 0.05)
    }
  })

  const rings = [
    { radius: 2.0, tube: 0.015, color: '#FF6B00', opacity: 0.55, tiltX: 0.4, tiltZ: 0.1 },
    { radius: 2.25, tube: 0.008, color: '#FF9A3C', opacity: 0.3, tiltX: -0.3, tiltZ: -0.15 },
    { radius: 1.75, tube: 0.01, color: '#FFB347', opacity: 0.2, tiltX: 0.6, tiltZ: 0.2 },
  ]

  return (
    <group ref={groupRef}>
      {rings.map((r, i) => (
        <mesh
          key={i}
          rotation={[r.tiltX, 0, r.tiltZ]}
        >
          <torusGeometry args={[r.radius, r.tube, 16, 100]} />
          <meshBasicMaterial
            color={r.color}
            transparent
            opacity={r.opacity * intensity}
          />
        </mesh>
      ))}
    </group>
  )
}

function OrbitDots() {
  const groupRef = useRef<THREE.Group>(null)

  const dots = [
    { angle: 0, speed: 0.6, radius: 2.0, size: 0.06, color: '#FF9A3C', tiltX: 0.4, tiltZ: 0.1 },
    { angle: Math.PI * 0.6, speed: 0.4, radius: 2.0, size: 0.04, color: '#FF6B00', tiltX: 0.4, tiltZ: 0.1 },
    { angle: Math.PI * 1.3, speed: 0.8, radius: 2.0, size: 0.05, color: '#FFFFFF', tiltX: 0.4, tiltZ: 0.1 },
    { angle: 0.5, speed: 0.35, radius: 2.25, size: 0.035, color: '#FFB347', tiltX: -0.3, tiltZ: -0.15 },
  ]

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const children = groupRef.current.children
    dots.forEach((d, i) => {
      if (i >= children.length) return
      d.angle += d.speed * delta
      const x = Math.cos(d.angle) * d.radius
      const z = Math.sin(d.angle) * d.radius
      const y = Math.sin(d.angle) * Math.sin(d.tiltX) * d.radius * 0.5
      children[i].position.set(x, y, z)
    })
  })

  return (
    <group ref={groupRef}>
      {dots.map((d, i) => (
        <mesh key={i}>
          <sphereGeometry args={[d.size, 8, 8]} />
          <meshBasicMaterial color={d.color} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function ForgeReactorScene({ intensity = 0.8, isActive = false }: { intensity?: number; isActive?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={isActive ? 3 : 2} color="#FF6B00" distance={8} />
      <directionalLight position={[3, 4, 3]} intensity={1.2} color="#FF9A3C" />
      <directionalLight position={[-2, -1, -2]} intensity={0.4} color="#FFB347" />
      <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.15}>
        <ReactorCore intensity={intensity} />
      </Float>
      <EnergyRings intensity={intensity} />
      <OrbitDots />
      <EmberParticles count={isActive ? 300 : 200} intensity={intensity} />
      <Sparkles count={isActive ? 80 : 40} scale={5} size={2} speed={0.3} color="#FF9A3C" />
    </>
  )
}

interface ForgeReactorProps {
  intensity?: number
  isActive?: boolean
  className?: string
}

export default function ForgeReactor({ intensity = 0.8, isActive = false, className }: ForgeReactorProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ForgeReactorScene intensity={intensity} isActive={isActive} />
        </Suspense>
      </Canvas>
    </div>
  )
}
