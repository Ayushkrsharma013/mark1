"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = typeof window !== "undefined" && window.innerWidth < 768 ? 400 : 1500;
const NODE_COUNT = 8;

function ParticleField() {
  const mesh = useRef<THREE.Points>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const { positions, randoms } = useMemo(() => {
    const count = isMobile ? 400 : 1500;
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      rnd[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, randoms: rnd };
  }, [isMobile]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const time = clock.getElapsedTime();
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;
    const count = isMobile ? 400 : 1500;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(time * 0.3 + randoms[i]) * 0.001;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6366F1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function CentralSphere() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const time = clock.getElapsedTime();
    mesh.current.rotation.y += 0.002;
    const scale = Math.sin(time * 0.8) * 0.05 + 1;
    mesh.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshPhysicalMaterial
        color="#6366F1"
        emissive="#4F46E5"
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.1}
        transmission={0.1}
      />
    </mesh>
  );
}

function OrbitalNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const nodes = useMemo(() => {
    return Array.from({ length: NODE_COUNT }, (_, i) => ({
      id: i,
      radius: 2.5 + Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.3,
      inclination: (Math.random() - 0.5) * Math.PI * 0.5,
      offset: (Math.random() * Math.PI * 2),
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || isMobile) return;
    const time = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const node = nodes[i];
      const angle = time * node.speed + node.offset;
      child.position.x = Math.cos(angle) * node.radius;
      child.position.y = Math.sin(angle) * node.radius * Math.sin(node.inclination);
      child.position.z = Math.sin(angle) * node.radius * Math.cos(node.inclination);
    });
  });

  if (isMobile) return null;

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <mesh key={node.id}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#6366F1" emissive="#4F46E5" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* Connection lines from center to each node */}
      {nodes.map((node, i) => (
        <threeLine key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([0, 0, 0, Math.cos(node.offset) * node.radius, 0, Math.sin(node.offset) * node.radius]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#6366F1" transparent opacity={0.3} />
        </threeLine>
      ))}
    </group>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    if (!isMobile) {
      const onMouseMove = (e: MouseEvent) => {
        mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouseMove);
      return () => window.removeEventListener("mousemove", onMouseMove);
    }
  }, [isMobile]);

  useFrame(() => {
    if (!groupRef.current || isMobile) return;
    groupRef.current.rotation.y += (mouseRef.current.x * 0.1 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (mouseRef.current.y * 0.05 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#6366F1" />
      <pointLight position={[-5, -3, -5]} intensity={1} color="#F59E0B" />
      <fog attach="fog" args={["#080C14", 5, 25]} />
      <ParticleField />
      <CentralSphere />
      <OrbitalNodes />
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
