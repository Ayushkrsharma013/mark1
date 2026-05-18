'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, Line } from '@react-three/drei'
import * as THREE from 'three'

const SYSTEMS = [
  { name: 'Prospecting OS', color: '#FF6B00', radius: 3.2, speed: 0.3, tilt: 0.3, size: 0.12 },
  { name: 'Workflow Engine', color: '#38BDF8', radius: 3.2, speed: 0.4, tilt: 1.0, size: 0.1 },
  { name: 'AI Analytics', color: '#A78BFA', radius: 3.2, speed: 0.35, tilt: 1.7, size: 0.11 },
  { name: 'Marketplace', color: '#34D399', radius: 3.2, speed: 0.45, tilt: 2.4, size: 0.09 },
  { name: 'Support AI', color: '#F472B6', radius: 3.2, speed: 0.38, tilt: 3.1, size: 0.1 },
  { name: 'CRM Sync', color: '#60A5FA', radius: 3.2, speed: 0.33, tilt: 3.8, size: 0.11 },
]

function HubNode() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
      const pulse = 1 + Math.sin(Date.now() * 0.004) * 0.06
      meshRef.current.scale.setScalar(pulse)
    }
    if (glowRef.current) {
      glowRef.current.rotation.y -= delta * 0.2
      const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.1
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color="#FF6B00"
          emissive="#FF6B00"
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#FF9A3C" transparent opacity={0.15} />
      </mesh>
      {/* Pulsing ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.015, 8, 32]} />
        <meshBasicMaterial color="#FF6B00" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function OrbitalPaths() {
  return (
    <group>
      {SYSTEMS.map((sys, i) => (
        <mesh key={i} rotation={[sys.tilt, 0, 0]}>
          <torusGeometry args={[sys.radius, 0.003, 8, 100]} />
          <meshBasicMaterial color={sys.color} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  )
}

function SystemNodes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const sys = SYSTEMS[i]
      if (!sys) return
      child.userData.angle = (child.userData.angle || Math.random() * Math.PI * 2) + sys.speed * delta
      const a = child.userData.angle
      child.position.x = Math.cos(a) * sys.radius
      child.position.z = Math.sin(a) * sys.radius * Math.cos(sys.tilt)
      child.position.y = Math.sin(a) * Math.sin(sys.tilt) * sys.radius
    })
  })

  return (
    <group ref={groupRef}>
      {SYSTEMS.map((sys, i) => (
        <mesh key={i} userData={{ angle: (i / SYSTEMS.length) * Math.PI * 2 }}>
          <sphereGeometry args={[sys.size, 12, 12]} />
          <meshBasicMaterial color={sys.color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}

function ConnectionLines() {
  const lineRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!lineRef.current) return
    lineRef.current.children.forEach((child) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial
      mat.opacity = 0.12 + Math.sin(Date.now() * 0.003) * 0.06
    })
  })

  return <group ref={lineRef} />
}

function NeuralEcosystemScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#FF6B00" distance={10} />
      <directionalLight position={[2, 4, 3]} intensity={0.6} color="#FF9A3C" />
      <Float speed={0.5} rotationIntensity={0.04} floatIntensity={0.1}>
        <HubNode />
      </Float>
      <OrbitalPaths />
      <SystemNodes />
      <ConnectionLines />
      <Sparkles count={60} scale={8} size={3} speed={0.2} color="#FF9A3C" />
    </>
  )
}

export default function NeuralEcosystem({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 4, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <NeuralEcosystemScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
