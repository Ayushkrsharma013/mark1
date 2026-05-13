# FlowForges Homepage Redesign — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the FlowForges homepage with a dark luxury + glassmorphism aesthetic, Three.js hero scene, animated sections, and conversion-focused copy.

**Architecture:** Next.js 16 App Router with React Server Components for pages/sections and Client Components for interactive elements (Three.js canvas, Framer Motion animations, scroll detection). All new components live in `components/sections/`, `components/three/`, `components/ui/`, `components/layout/`. The marketing layout at `app/(marketing)/layout.tsx` wraps pages with Navbar and Footer.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Three.js + React Three Fiber, Lucide React

---

## File Structure

**New files to create:**
- `app/globals.css` — modify: update design system CSS variables and animations
- `app/layout.tsx` — modify: update metadata for SEO
- `app/(marketing)/layout.tsx` — modify: update imports to new layout components
- `app/(marketing)/page.tsx` — modify: replace with new homepage assembly
- `lib/data/services.ts` — create: 6 services data
- `lib/data/testimonials.ts` — create: 6 testimonials data
- `components/ui/GlassCard.tsx` — create: glassmorphism card primitive
- `components/ui/GlowButton.tsx` — create: animated button primitive
- `components/ui/AnimatedCounter.tsx` — create: count-up animation
- `components/ui/SectionLabel.tsx` — create: eyebrow label with accent bar
- `components/ui/MetricBadge.tsx` — create: stat pill
- `components/three/HeroScene.tsx` — create: R3F particle + sphere + orbital nodes
- `components/layout/Navbar.tsx` — create: fixed blur navbar with mobile menu
- `components/layout/Footer.tsx` — create: site footer
- `components/sections/Hero.tsx` — create: hero with 3D scene
- `components/sections/LogoMarquee.tsx` — create: infinite logo scroll
- `components/sections/WhatWeDo.tsx` — create: 6-card bento grid
- `components/sections/ProspectingOS.tsx` — create: flagship product section
- `components/sections/HowItWorks.tsx` — create: 4-step timeline
- `components/sections/Testimonials.tsx` — create: testimonial cards
- `components/sections/FinalCTA.tsx` — create: closing CTA

**Files untouched:**
- `app/dashboard/` — existing dashboard
- `app/api/` — existing APIs
- `app/login/` — existing login
- `lib/supabase/` — existing Supabase clients
- `lib/auth.ts` — existing auth helpers
- `lib/blog-data.ts` — existing blog data
- `lib/nav.ts` — existing navigation config (already correct)

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Three.js packages**

```bash
pnpm add @react-three/fiber @react-three/drei three
pnpm add -D @types/three
```

- [ ] **Step 2: Verify other dependencies exist**

```bash
pnpm list framer-motion lucide-react clsx tailwind-merge
```

Expected: All already installed (confirmed in package.json).

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
pnpm commit -m "deps: add three.js and @react-three/fiber for 3D hero scene"
```

---

## Task 2: Update Design System (globals.css)

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with new design system**

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-bg: #080C14;
  --color-surface: #0F1422;
  --color-surface-2: #161D30;
  --color-primary: #6366F1;
  --color-primary-glow: rgba(99, 102, 241, 0.15);
  --color-secondary: #F59E0B;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-border: rgba(255, 255, 255, 0.06);
  --color-border-hover: rgba(99, 102, 241, 0.4);
}

:root {
  --bg-primary: #080C14;
  --bg-secondary: #0F1422;
  --bg-tertiary: #161D30;
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  --accent-indigo: #6366F1;
  --accent-amber: #F59E0B;
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(99, 102, 241, 0.4);
  --glass-bg: rgba(15, 20, 34, 0.6);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.10); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.20); }

/* Selection */
::selection {
  background: rgba(99, 102, 241, 0.25);
  color: #ffffff;
}

/* Noise texture overlay */
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 1;
}

/* Glass card base */
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Text gradients */
.text-gradient {
  background: linear-gradient(135deg, #F1F5F9 0%, #94A3B8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-indigo {
  background: linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #4F46E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Gradient border */
.gradient-border {
  position: relative;
  background: linear-gradient(#0F1422, #0F1422) padding-box,
              linear-gradient(135deg, #6366F1, #F59E0B) border-box;
  border: 1px solid transparent;
}

/* Marquee animation */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}

/* Pulse glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.4); }
}

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

/* Focus rings */
.focus-ring:focus-visible {
  outline: none;
  ring: 2px;
  ring-color: #6366F1;
  ring-offset: 2px;
  ring-offset-color: #080C14;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-marquee,
  .animate-pulse-glow {
    animation: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "design: update globals.css with dark luxury design system"
```

---

## Task 3: Create Data Files

**Files:**
- Create: `lib/data/services.ts`
- Create: `lib/data/testimonials.ts`

- [ ] **Step 1: Create services data**

```typescript
// lib/data/services.ts
import { Bot, Workflow, Target, TrendingUp, Code2, Compass } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  size: "large" | "small";
}

export const services: Service[] = [
  {
    id: "ai-agents",
    title: "AI Agents & Chatbots",
    description:
      "Custom agents handling support, lead qualification, and scheduling. 24/7, zero human intervention, fully auditable.",
    icon: Bot,
    badge: "Most Popular",
    size: "large",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description:
      "End-to-end elimination of repetitive ops. Multi-step, multi-tool, self-healing pipelines.",
    icon: Workflow,
    size: "small",
  },
  {
    id: "lead-intelligence",
    title: "Lead Intelligence Engine",
    description:
      "AI-powered prospecting from LinkedIn, Google Maps, and Apollo. ICP scoring + personalized outreach at scale.",
    icon: Target,
    size: "small",
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    description:
      "Churn prediction, revenue modeling, ICP scoring. ML that turns your data into foresight.",
    icon: TrendingUp,
    size: "small",
  },
  {
    id: "custom-ai",
    title: "Custom AI Development",
    description:
      "Bespoke solutions built on Claude, GPT-4o, and open-source models. Tailored to your exact business logic.",
    icon: Code2,
    size: "large",
  },
  {
    id: "ai-strategy",
    title: "AI Strategy & Consulting",
    description:
      "We audit your operations, map automation opportunities, and build a phased roadmap that actually ships.",
    icon: Compass,
    size: "small",
  },
];
```

- [ ] **Step 2: Create testimonials data**

```typescript
// lib/data/testimonials.ts
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  metric: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "FlowForges rebuilt our entire outreach pipeline in 12 days. We went from 5 qualified calls/week to 23. The Prospecting OS alone paid for 6 months of work.",
    name: "James R.",
    title: "Head of Growth",
    company: "Clearpath Agency",
    metric: "4.6x pipeline growth",
    initials: "JR",
  },
  {
    id: "2",
    quote:
      "The AI chatbot they deployed handles 80% of our support tickets automatically. Response time went from 4 hours to 28 seconds. Our team finally has breathing room.",
    name: "Priya S.",
    title: "VP Operations",
    company: "FinStack",
    metric: "80% ticket deflection",
    initials: "PS",
  },
  {
    id: "3",
    quote:
      "We brought them a spaghetti Zapier stack that was breaking every week. They replaced it with a self-healing n8n pipeline that's been running flawlessly for 4 months.",
    name: "Michael C.",
    title: "CTO",
    company: "DataBridge",
    metric: "Zero downtime since launch",
    initials: "MC",
  },
  {
    id: "4",
    quote:
      "Best ROI decision we made this year. Our proposal generation went from 3 hours to 11 minutes. We close deals faster because we respond faster.",
    name: "Sarah L.",
    title: "Founder",
    company: "Orbit Creative",
    metric: "93% time reduction",
    initials: "SL",
  },
  {
    id: "5",
    quote:
      "They didn't just build — they taught us. We understand every workflow they deployed. That ownership matters when you're scaling.",
    name: "Tom K.",
    title: "Director of Ops",
    company: "NorthScale",
    metric: "Full knowledge transfer",
    initials: "TK",
  },
  {
    id: "6",
    quote:
      "FlowForges understood our niche (recruitment agency automation) without us having to explain it. Felt like working with specialists, not generalists.",
    name: "Amara O.",
    title: "MD",
    company: "Apex Workflows",
    metric: "Deployed in 11 days",
    initials: "AO",
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add lib/data/
git commit -m "data: add services and testimonials data for homepage"
```

---

## Task 4: Create UI Primitives

**Files:**
- Create: `components/ui/GlassCard.tsx`
- Create: `components/ui/GlowButton.tsx`
- Create: `components/ui/AnimatedCounter.tsx`
- Create: `components/ui/SectionLabel.tsx`
- Create: `components/ui/MetricBadge.tsx`

- [ ] **Step 1: Create GlassCard**

```tsx
// components/ui/GlassCard.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl p-8",
        "bg-[rgba(15,20,34,0.6)] backdrop-blur-xl",
        "border border-[rgba(255,255,255,0.06)]",
        "transition-colors duration-300",
        hover && "hover:border-[rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]",
        glow && "shadow-[0_0_40px_rgba(99,102,241,0.08)]",
        className
      )}
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create GlowButton**

```tsx
// components/ui/GlowButton.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function GlowButton({
  children,
  variant = "primary",
  href,
  onClick,
  className,
}: GlowButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 focus-ring";

  const variants = {
    primary:
      "bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]",
    secondary:
      "bg-[#F59E0B] text-black hover:bg-[#D97706] shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    ghost:
      "bg-transparent border border-[rgba(255,255,255,0.15)] text-white hover:border-[#6366F1] hover:text-[#6366F1]",
  };

  const Component = href ? Link : "button";

  return (
    <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
      <Component
        href={href as string}
        onClick={onClick}
        className={cn(baseStyles, variants[variant], className)}
      >
        {children}
      </Component>
    </motion.div>
  );
}
```

- [ ] **Step 3: Create AnimatedCounter**

```tsx
// components/ui/AnimatedCounter.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 4: Create SectionLabel**

```tsx
// components/ui/SectionLabel.tsx
interface SectionLabelProps {
  text: string;
  className?: string;
}

export function SectionLabel({ text, className }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <div className="w-8 h-0.5 bg-[#6366F1] rounded-full" />
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#818CF8]">
        {text}
      </span>
    </div>
  );
}
```

- [ ] **Step 5: Create MetricBadge**

```tsx
// components/ui/MetricBadge.tsx
interface MetricBadgeProps {
  value: string;
  label: string;
}

export function MetricBadge({ value, label }: MetricBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
      <span className="text-sm font-semibold text-white">{value}</span>
      <span className="text-xs text-[#94A3B8]">{label}</span>
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/ui/
git commit -m "ui: add GlassCard, GlowButton, AnimatedCounter, SectionLabel, MetricBadge primitives"
```

---

## Task 5: Create Three.js HeroScene

**Files:**
- Create: `components/three/HeroScene.tsx`

- [ ] **Step 1: Create HeroScene component**

```tsx
// components/three/HeroScene.tsx
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
          count={isMobile ? 400 : 1500}
          array={positions}
          itemSize={3}
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
        <line key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, Math.cos(node.offset) * node.radius, 0, Math.sin(node.offset) * node.radius])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#6366F1" transparent opacity={0.3} />
        </line>
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
```

- [ ] **Step 2: Commit**

```bash
git add components/three/
git commit -m "three: add HeroScene with particles, central sphere, and orbital nodes"
```

---

## Task 6: Create Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create Navbar component**

```tsx
// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "border-b border-[rgba(255,255,255,0.04)]",
          scrolled
            ? "bg-[rgba(8,12,20,0.95)] backdrop-blur-xl"
            : "bg-transparent backdrop-blur-md"
        )}
      >
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-semibold tracking-tight font-mono">
              <span className="text-white">FlowForges</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-200",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-white"
                    : "text-[#94A3B8] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm px-5 py-2 rounded-full border border-[#F59E0B] text-[#F59E0B] font-medium hover:bg-[#F59E0B] hover:text-black transition-all duration-200"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#080C14] md:hidden"
          >
            <div className="flex flex-col h-full px-6 py-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold font-mono text-white">FlowForges</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 mt-12">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-2xl font-medium",
                        pathname === link.href
                          ? "text-white"
                          : "text-[#94A3B8]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pb-8">
                <Link
                  href="/contact"
                  className="block w-full text-center text-base px-6 py-3 rounded-full bg-[#F59E0B] text-black font-medium"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "layout: add Navbar with scroll-aware blur and mobile overlay menu"
```

---

## Task 7: Create Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer component**

```tsx
// components/layout/Footer.tsx
import Link from "next/link";
import { footerLinks } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#0F1422]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-semibold font-mono text-white">
              FlowForges
            </Link>
            <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
              AI automation agency for digital & creative agencies. We ship intelligence that compounds.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#64748B] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#64748B]">
            &copy; {new Date().getFullYear()} FlowForges. All rights reserved.
          </p>
          <p className="text-sm text-[#64748B]">
            Built with ambition by Ayush Kumar Sharma
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "layout: add Footer with new design system styling"
```

---

## Task 8: Create Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero section**

```tsx
// components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { MetricBadge } from "@/components/ui/MetricBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroScene } from "@/components/three/HeroScene";
import { Suspense } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Three.js Background */}
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-[#080C14] via-[#0F1422] to-[#080C14]" />
        }
      >
        <HeroScene />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 w-full">
        <div className="max-w-2xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <SectionLabel text="AI AUTOMATION AGENCY" className="mb-6" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[clamp(52px,7vw,96px)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
            >
              We build intelligence{" "}
              <span className="text-gradient">into your business</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-[#94A3B8] max-w-lg leading-relaxed"
            >
              From AI lead generation to full workflow automation — we ship
              productized services that give your agency an unfair, compounding
              advantage.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <GlowButton variant="primary" href="/contact">
                Start a Project →
              </GlowButton>
              <GlowButton variant="ghost" href="/case-studies">
                View Case Studies
              </GlowButton>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MetricBadge value="Trusted by 40+ agencies" label="" />
              <MetricBadge value="★★★★★" label="4.9/5" />
              <MetricBadge value="Ships in 14 days" label="" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "sections: add Hero with Three.js background and staggered animations"
```

---

## Task 9: Create LogoMarquee Section

**Files:**
- Create: `components/sections/LogoMarquee.tsx`

- [ ] **Step 1: Create LogoMarquee section**

```tsx
// components/sections/LogoMarquee.tsx
const logos = [
  "Momentum Digital",
  "NorthScale",
  "Vertex Labs",
  "Clearpath Agency",
  "Orbit Creative",
  "Stackbridge",
  "Elevate Partners",
  "Forma Studio",
  "Apex Workflows",
  "Driftwood Media",
];

export function LogoMarquee() {
  return (
    <section className="py-16 border-y border-[rgba(255,255,255,0.04)] bg-[#080C14] overflow-hidden">
      <p className="text-center text-xs font-medium uppercase tracking-[0.15em] text-[#64748B] mb-8">
        Trusted by agencies across 12 countries
      </p>

      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080C14] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080C14] to-transparent z-10" />

        {/* Marquee track */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={i}
              className="mx-8 text-lg font-semibold text-[#94A3B8] opacity-50"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/LogoMarquee.tsx
git commit -m "sections: add LogoMarquee with infinite CSS scroll"
```

---

## Task 10: Create WhatWeDo Section

**Files:**
- Create: `components/sections/WhatWeDo.tsx`

- [ ] **Step 1: Create WhatWeDo section**

```tsx
// components/sections/WhatWeDo.tsx
"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function WhatWeDo() {
  return (
    <section className="py-24 bg-[#080C14]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionLabel text="CAPABILITIES" className="mb-4" />
          <h2 className="text-[clamp(36px,4vw,56px)] font-semibold text-white leading-tight">
            Full-stack AI automation,
            <br />
            <span className="text-gradient">end to end</span>
          </h2>
          <p className="mt-4 text-lg text-[#94A3B8] max-w-xl">
            We cover every layer so you don't stitch together five vendors.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Row 1: Large + Small */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <ServiceCard service={services[0]} />
          </motion.div>
          <motion.div variants={cardVariants}>
            <ServiceCard service={services[1]} />
          </motion.div>

          {/* Row 2: Small + Small + Large */}
          <motion.div variants={cardVariants}>
            <ServiceCard service={services[2]} />
          </motion.div>
          <motion.div variants={cardVariants}>
            <ServiceCard service={services[3]} />
          </motion.div>
          <motion.div variants={cardVariants} className="md:col-span-1">
            <ServiceCard service={services[5]} />
          </motion.div>

          {/* Row 3: Large (Custom AI) - spans full width on mobile, 2 cols on desktop */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <ServiceCard service={services[4]} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const Icon = service.icon;

  return (
    <GlassCard
      className={cn("h-full flex flex-col", service.size === "large" && "min-h-[280px]")}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center">
          <Icon className="w-7 h-7 text-[#6366F1]" />
        </div>
        {service.badge && (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-[rgba(99,102,241,0.15)] text-[#818CF8]">
            {service.badge}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
      <p className="text-[#94A3B8] leading-relaxed flex-1">{service.description}</p>

      {service.id === "custom-ai" && (
        <div className="mt-4 p-4 rounded-lg bg-[#161D30] border border-[rgba(255,255,255,0.06)] font-mono text-xs text-[#94A3B8] overflow-x-auto">
          <code>
            <span className="text-[#6366F1]">agent</span>.run({"{"}
            <br />
            &nbsp;&nbsp;model: <span className="text-[#F59E0B]">&quot;claude-opus&quot;</span>,
            <br />
            &nbsp;&nbsp;task: <span className="text-[#F59E0B]">&quot;qualify_lead&quot;</span>,
            <br />
            &nbsp;&nbsp;context: lead_data
            <br />
            {"}"})
          </code>
        </div>
      )}
    </GlassCard>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/WhatWeDo.tsx
git commit -m "sections: add WhatWeDo bento grid with 6 service cards"
```

---

## Task 11: Create ProspectingOS Section

**Files:**
- Create: `components/sections/ProspectingOS.tsx`

- [ ] **Step 1: Create ProspectingOS section**

```tsx
// components/sections/ProspectingOS.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, TrendingUp, Users, Zap, Clock } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionLabel } from "@/components/ui/SectionLabel";

const features = [
  "LinkedIn + Google Maps + Amazon scraping",
  "AI-powered ICP scoring & enrichment",
  "Automated personalized outreach",
  "Pipeline management with smart stages",
  "Real-time analytics & reporting",
];

const stats = [
  { value: 10000, suffix: "+", label: "Leads Scraped" },
  { value: 94, suffix: "%", label: "ICP Match Rate" },
  { value: 100, suffix: "%", label: "AI Personalized" },
  { value: 15, suffix: "hrs/wk", label: "Saved Per SDR" },
];

const mockLeads = [
  { name: "Sarah Chen", company: "Vertex Labs", score: 92, status: "Qualified" },
  { name: "James Wilson", company: "NorthScale", score: 78, status: "Warm" },
  { name: "Priya Patel", company: "DataBridge", score: 61, status: "New" },
  { name: "Michael Ross", company: "Orbit Creative", score: 88, status: "Qualified" },
];

export function ProspectingOS() {
  const [activeTab, setActiveTab] = useState("Leads");
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowToast(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%), #080C14",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel text="FLAGSHIP PRODUCT" className="mb-4" />
            <h2 className="text-[clamp(36px,4vw,56px)] font-semibold text-white leading-tight mb-4">
              Prospecting OS
            </h2>
            <p className="text-lg text-[#94A3B8] leading-relaxed mb-8">
              Find, score, message, and manage B2B leads from LinkedIn, Google
              Maps, and Amazon — all in one workspace.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[rgba(99,102,241,0.15)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#6366F1]" />
                  </div>
                  <span className="text-[#94A3B8]">{feature}</span>
                </li>
              ))}
            </ul>

            <GlowButton variant="secondary" href="/products">
              Try Prospecting OS →
            </GlowButton>
          </motion.div>

          {/* Right: Product Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-xl overflow-hidden">
              {/* Mockup Header */}
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <div className="flex gap-4">
                  {["Leads", "Pipeline", "Analytics"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                        activeTab === tab
                          ? "text-white border-[#6366F1]"
                          : "text-[#64748B] border-transparent hover:text-[#94A3B8]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mockup Table */}
              <div className="p-6">
                <div className="grid grid-cols-4 gap-4 text-xs text-[#64748B] uppercase tracking-wider mb-4 px-2">
                  <span>Name</span>
                  <span>Company</span>
                  <span>Score</span>
                  <span>Status</span>
                </div>
                {mockLeads.map((lead, i) => (
                  <motion.div
                    key={lead.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="grid grid-cols-4 gap-4 items-center py-3 px-2 rounded-lg hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <span className="text-sm text-white font-medium">{lead.name}</span>
                    <span className="text-sm text-[#94A3B8]">{lead.company}</span>
                    <span
                      className={`inline-flex items-center justify-center w-10 h-6 rounded-full text-xs font-medium ${
                        lead.score >= 90
                          ? "bg-[rgba(0,255,136,0.15)] text-[#00ff88]"
                          : lead.score >= 75
                          ? "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]"
                          : "bg-[rgba(255,200,0,0.15)] text-yellow-400"
                      }`}
                    >
                      {lead.score}%
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${
                        lead.status === "Qualified"
                          ? "bg-[rgba(99,102,241,0.15)] text-[#818CF8]"
                          : lead.status === "Warm"
                          ? "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]"
                          : "bg-[rgba(255,255,255,0.06)] text-[#94A3B8]"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Toast Notification */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={showToast ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="absolute bottom-4 right-4 glass rounded-lg px-4 py-3 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-sm text-white font-medium">New Lead Qualified</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-[rgba(15,20,34,0.4)] border border-[rgba(255,255,255,0.06)]"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#6366F1] font-mono">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-[#94A3B8]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ProspectingOS.tsx
git commit -m "sections: add ProspectingOS with interactive mockup and animated stats"
```

---

## Task 12: Create HowItWorks Section

**Files:**
- Create: `components/sections/HowItWorks.tsx`

- [ ] **Step 1: Create HowItWorks section**

```tsx
// components/sections/HowItWorks.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    timeline: "Day 1–2",
    description:
      "We map your ops, identify the highest-ROI automation opportunities.",
  },
  {
    number: "02",
    title: "Architecture & Scoping",
    timeline: "Day 3–5",
    description:
      "We blueprint the agent/automation stack and scope deliverables.",
  },
  {
    number: "03",
    title: "Build & Test",
    timeline: "Day 6–12",
    description:
      "We build in production, run live tests, and share daily updates.",
  },
  {
    number: "04",
    title: "Deploy & Handoff",
    timeline: "Day 13–14",
    description:
      "We deploy, document, and train your team. You own everything.",
  },
];

export function HowItWorks() {
  const lineRef = useRef<SVGPathElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#080C14]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(36px,4vw,56px)] font-semibold text-white leading-tight">
            From kickoff to live agent in{" "}
            <span className="text-gradient-indigo">14 days</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* SVG Connecting Line - Desktop only */}
          <svg
            className="absolute top-24 left-0 w-full h-4 hidden md:block"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="12.5%"
              y1="8"
              x2="87.5%"
              y2="8"
              stroke="#6366F1"
              strokeWidth="2"
              strokeDasharray="8 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                {/* Number Circle */}
                <div className="w-12 h-12 rounded-full bg-[#6366F1] flex items-center justify-center mb-6 relative z-10">
                  <span className="text-white font-bold text-sm">{step.number}</span>
                </div>

                {/* Vertical line for mobile */}
                <div className="absolute left-6 top-12 w-0.5 h-full bg-[rgba(99,102,241,0.2)] md:hidden" />

                <h3 className="text-xl font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-[#6366F1] font-medium mb-3">{step.timeline}</p>
                <p className="text-[#94A3B8] leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/HowItWorks.tsx
git commit -m "sections: add HowItWorks 4-step timeline with animated SVG line"
```

---

## Task 13: Create Testimonials Section

**Files:**
- Create: `components/sections/Testimonials.tsx`

- [ ] **Step 1: Create Testimonials section**

```tsx
// components/sections/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Testimonials() {
  return (
    <section className="py-24 bg-[#080C14]">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(36px,4vw,56px)] font-semibold text-white leading-tight">
            Results our clients{" "}
            <span className="text-gradient">actually brag about</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              className="p-6 rounded-xl bg-[rgba(15,20,34,0.6)] border border-[rgba(255,255,255,0.06)] backdrop-blur-xl transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#94A3B8] leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#6366F1] flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{testimonial.name}</p>
                  <p className="text-[#64748B] text-xs">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Metric Badge */}
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                <span className="inline-block px-3 py-1 rounded-full bg-[rgba(99,102,241,0.1)] text-[#818CF8] text-xs font-medium">
                  {testimonial.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Testimonials.tsx
git commit -m "sections: add Testimonials grid with 6 client cards"
```

---

## Task 14: Create FinalCTA Section

**Files:**
- Create: `components/sections/FinalCTA.tsx`

- [ ] **Step 1: Create FinalCTA section**

```tsx
// components/sections/FinalCTA.tsx
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

const trustPoints = [
  "Response within 4 hours",
  "No long-term contracts",
  "Fixed-scope pricing",
];

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden noise">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-[#0a1020] to-[#080C14]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight mb-6">
            Ready to automate your{" "}
            <span className="text-gradient-indigo">competitive edge?</span>
          </h2>

          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us what you&apos;re building. We&apos;ll tell you where AI gives you an
            unfair advantage. No commitment. 30-minute discovery call.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <GlowButton variant="secondary" href="/contact">
              Book a Discovery Call →
            </GlowButton>
            <GlowButton variant="ghost" href="/case-studies">
              View Our Work
            </GlowButton>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                <Check className="w-4 h-4 text-[#6366F1]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/FinalCTA.tsx
git commit -m "sections: add FinalCTA closing section with noise texture"
```

---

## Task 15: Assemble Homepage and Update Layouts

**Files:**
- Modify: `app/(marketing)/page.tsx`
- Modify: `app/(marketing)/layout.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update marketing layout to use new components**

```tsx
// app/(marketing)/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
```

- [ ] **Step 2: Replace homepage with new sections**

```tsx
// app/(marketing)/page.tsx
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { ProspectingOS } from "@/components/sections/ProspectingOS";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <WhatWeDo />
      <ProspectingOS />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
```

- [ ] **Step 3: Update root layout metadata for SEO**

Modify `app/layout.tsx` metadata export:

```tsx
export const metadata: Metadata = {
  title: {
    default: "FlowForges — AI Automation Agency for Digital & Creative Agencies",
    template: "%s | FlowForges",
  },
  description:
    "FlowForges builds AI agents and automation systems for digital agencies. From lead generation to workflow automation, we ship productized services in 14 days.",
  metadataBase: new URL("https://mark1-eta.vercel.app"),
  openGraph: {
    title: "FlowForges — AI Automation Agency",
    description:
      "FlowForges builds AI agents and automation systems for digital agencies. From lead generation to workflow automation, we ship productized services in 14 days.",
    url: "https://mark1-eta.vercel.app",
    siteName: "FlowForges",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowForges — AI Automation Agency",
    description:
      "FlowForges builds AI agents and automation systems for digital agencies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

- [ ] **Step 4: Add JSON-LD structured data to homepage**

Modify `app/(marketing)/page.tsx` to include JSON-LD:

```tsx
// app/(marketing)/page.tsx
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { ProspectingOS } from "@/components/sections/ProspectingOS";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "FlowForges",
            description: "AI automation agency for digital and creative agencies",
            url: "https://mark1-eta.vercel.app",
            serviceType: [
              "AI Automation",
              "Workflow Automation",
              "AI Agent Development",
            ],
            areaServed: "Worldwide",
            priceRange: "$$–$$$",
          }),
        }}
      />
      <Hero />
      <LogoMarquee />
      <WhatWeDo />
      <ProspectingOS />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add app/(marketing)/layout.tsx app/(marketing)/page.tsx app/layout.tsx
git commit -m "layout: assemble homepage with all sections, update SEO metadata and JSON-LD"
```

---

## Task 16: Build and Verify

**Files:**
- All modified/created files

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No TypeScript errors.

- [ ] **Step 2: Run production build**

```bash
pnpm build
```

Expected: Build completes successfully with 0 errors.

- [ ] **Step 3: Verify no hydration errors**

Check the build output for any hydration mismatch warnings related to Three.js or Framer Motion.

- [ ] **Step 4: Check responsive breakpoints**

Open dev tools and verify layout at:
- 375px (mobile)
- 768px (tablet)
- 1280px (desktop)
- 1920px (large desktop)

- [ ] **Step 5: Verify accessibility**

- Tab through all interactive elements
- Confirm focus rings are visible
- Test with `prefers-reduced-motion: reduce` in dev tools

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete Phase 1 homepage redesign with dark luxury aesthetic"
```

---

## Self-Review Checklist

### 1. Spec Coverage
- [x] Design system (globals.css) — Task 2
- [x] Data files (services, testimonials) — Task 3
- [x] UI primitives (GlassCard, GlowButton, AnimatedCounter, SectionLabel, MetricBadge) — Task 4
- [x] Three.js HeroScene (particles, sphere, orbital nodes, mouse parallax) — Task 5
- [x] Navbar (fixed, blur, scroll-aware, mobile overlay) — Task 6
- [x] Footer — Task 7
- [x] Hero section (left content + 3D background) — Task 8
- [x] LogoMarquee — Task 9
- [x] WhatWeDo (bento grid, 6 cards) — Task 10
- [x] ProspectingOS (product mockup, stats, toast) — Task 11
- [x] HowItWorks (4-step timeline, SVG line) — Task 12
- [x] Testimonials (3-col grid, 6 cards) — Task 13
- [x] FinalCTA (noise texture, CTAs) — Task 14
- [x] Homepage assembly + SEO metadata + JSON-LD — Task 15
- [x] Build verification — Task 16

### 2. Placeholder Scan
- [x] No "TBD", "TODO", "implement later"
- [x] All code blocks contain actual implementation
- [x] All commands have expected outputs

### 3. Type Consistency
- [x] `cn()` helper used consistently
- [x] Framer Motion imports consistent (`motion`, `useInView`, `AnimatePresence`)
- [x] Lucide icon imports use named exports
- [x] Color values consistent with design system (`#080C14`, `#6366F1`, `#F59E0B`, etc.)
