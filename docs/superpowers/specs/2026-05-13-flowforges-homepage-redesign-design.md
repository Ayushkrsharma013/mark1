# FlowForges Homepage Redesign — Phase 1 Design Spec

## Overview

Redesign the FlowForges marketing homepage and shared layout with a dark luxury + glassmorphism aesthetic, featuring a Three.js hero scene, animated sections, and conversion-focused copy. Existing systems (dashboard, blog API, contact API, auth) remain untouched.

## Design System

```
Style:         Dark Luxury + Glassmorphism + 3D Depth
BG:            #080C14 (near black)
Surface:       #0F1422 (card bg)
Surface-2:     #161D30 (elevated)
Primary:       #6366F1 (electric indigo)
Primary-glow:  rgba(99,102,241,0.15)
Secondary:     #F59E0B (amber/gold — CTAs)
Text-primary:  #F1F5F9
Text-secondary:#94A3B8
Border:        rgba(255,255,255,0.06)
Border-hover:  rgba(99,102,241,0.4)
Heading font:  Geist Sans, 600–700
Body font:     Geist Sans, 400
Mono font:     Geist Mono (metrics, code snippets)
Radius:        12px cards, 8px inputs, 6px badges, 999px pills
Shadow:        0 0 40px rgba(99,102,241,0.08) on hover cards
```

**Typography scale:**
- Hero H1: `clamp(52px, 7vw, 96px)`, weight 700, line-height 1.05, letter-spacing -0.03em
- H2 section: `clamp(36px, 4vw, 56px)`, weight 600
- H3 card: 20–24px, weight 600
- Body: 16–18px, line-height 1.7
- Caption/label: 12–13px, weight 500, uppercase, letter-spacing 0.1em

## Architecture

**Flat directory structure (existing):**
```
app/
  layout.tsx              # Root layout — new Navbar + Footer
  page.tsx                # Homepage — assembles all sections
  globals.css             # Updated with design system
  (marketing)/            # Existing route group, untouched
  dashboard/              # Untouched
  api/                    # Untouched

components/
  layout/
    Navbar.tsx            # NEW — fixed, blur, scroll-aware
    Footer.tsx            # NEW
  three/
    HeroScene.tsx         # NEW — R3F particle + sphere + nodes
  sections/
    Hero.tsx              # NEW — left content + right 3D scene
    LogoMarquee.tsx       # NEW — infinite CSS scroll
    WhatWeDo.tsx          # NEW — 6-card bento grid
    ProspectingOS.tsx     # NEW — flagship product section
    HowItWorks.tsx        # NEW — 4-step timeline
    Testimonials.tsx      # NEW — 3-col card grid
    FinalCTA.tsx          # NEW — closing CTA section
  ui/
    GlassCard.tsx         # NEW — glassmorphism card primitive
    GlowButton.tsx        # NEW — animated button primitive
    AnimatedCounter.tsx   # NEW — count-up on scroll
    SectionLabel.tsx      # NEW — eyebrow label with accent bar
    MetricBadge.tsx       # NEW — small stat pill

lib/
  data/
    services.ts           # NEW — 6 services data
    testimonials.ts       # NEW — 6 testimonials data
```

## Component Specifications

### GlassCard
- Props: `children`, `className?`, `hover?: boolean`, `glow?: boolean`
- bg: `rgba(15,20,34,0.6)`, backdrop-blur: 16px
- border: 0.5px solid `rgba(255,255,255,0.06)`
- hover: border-color transition to `rgba(99,102,241,0.4)`, shadow indigo glow
- Framer Motion `whileHover={{ scale: 1.01, y: -2 }}`

### GlowButton
- Props: `children`, `variant: 'primary' | 'secondary' | 'ghost'`, `href?`, `onClick?`
- primary: indigo bg, hover indigo-500, box-shadow glow
- secondary: amber bg, hover amber-400, text black
- ghost: transparent, border, hover border-indigo
- Framer Motion `whileTap={{ scale: 0.97 }}`

### AnimatedCounter
- Props: `target: number`, `suffix?`, `prefix?`, `duration?: number`
- Uses `useInView` from framer-motion
- Counts from 0 to target over duration (default 1.5s)
- Geist Mono font

### SectionLabel
- Props: `text: string`
- Small uppercase label with left accent bar (2px indigo)
- 12px, letter-spacing 0.12em, text-indigo-400, font-weight 500

### MetricBadge
- Props: `value`, `label`
- Small pill with border and subtle background

## Three.js Scene (HeroScene.tsx)

**Tech:** `@react-three/fiber`, `@react-three/drei`, `three`

**Scene composition:**
1. **Particle field:** 1500 BufferGeometry points, positions in `[-15,15]³`
   - PointsMaterial: color `#6366F1`, size 0.02, transparent, opacity 0.6
   - `useFrame`: slow drift `y += 0.001 * sin(time + index)`
2. **Central AI sphere:** SphereGeometry(1.5, 64, 64)
   - MeshPhysicalMaterial: color `#6366F1`, emissive `#4F46E5`, emissiveIntensity 0.4
   - roughness 0.1, metalness 0.1
   - `useFrame`: rotates Y slowly (0.002/frame), scale pulses `sin(time * 0.8) * 0.05 + 1`
3. **Orbital nodes:** 8 small spheres (0.12 radius) on elliptical orbits
   - Connected to center by LineSegments (thin, indigo 30% opacity)
4. **Lights:** AmbientLight 0.3, PointLight `[5,5,5]` intensity 3 color indigo, PointLight `[-5,-3,-5]` intensity 1 color amber
5. **Camera:** position `[0,0,8]`, FOV 50
6. **Mouse parallax:** scene rotates ±5deg following cursor (lerped)
7. **Mobile:** reduce to 400 particles, disable mouse parallax, fixed camera

Wrap in `React.Suspense` with fallback gradient div. Canvas: absolute, full viewport, z-index 0.

## Homepage Sections

### Hero (Hero.tsx + HeroScene.tsx)
- Full viewport height, centered content, Three.js canvas behind
- LEFT (60% desktop): Eyebrow label, H1 with staggered blur-fade letters, subtext, CTA row (primary + secondary), social proof strip
- RIGHT / FULL BG: HeroScene

### LogoMarquee (LogoMarquee.tsx)
- Label: "TRUSTED BY AGENCIES ACROSS 12 COUNTRIES"
- Infinite horizontal CSS scroll marquee, 40s linear infinite, pauses on hover
- 10 agency names in text-secondary opacity 0.5
- Fade masks on left/right edges

### WhatWeDo (WhatWeDo.tsx)
- Section label "CAPABILITIES", H2, subtext
- 6-card bento grid (asymmetric: 2/3 + 1/3, then 1/3 + 1/3 + 2/3)
- Cards: AI Agents & Chatbots (LARGE), Workflow Automation, Lead Intelligence Engine, Predictive Analytics, Custom AI Development (LARGE), AI Strategy & Consulting
- Each card: Lucide icon, title, description, hover glow effect

### ProspectingOS (ProspectingOS.tsx)
- Indigo gradient wash background
- LEFT: "FLAGSHIP PRODUCT" label, H2 "Prospecting OS", description, 5 feature bullets, amber CTA
- RIGHT: Interactive product mockup (dark glass card with tabs, fake data table, animated row entry, toast notification)
- Stats row below: 4 metrics with AnimatedCounter (10,000+ leads, 94% match rate, 100% personalized, 15hrs/wk saved)

### HowItWorks (HowItWorks.tsx)
- H2: "From kickoff to live agent in 14 days"
- 4-step horizontal timeline (vertical on mobile)
- Animated dashed SVG line that draws on scroll
- Steps: Discovery Call, Architecture & Scoping, Build & Test, Deploy & Handoff
- Each step: numbered indigo circle, title, description

### Testimonials (Testimonials.tsx)
- H2: "Results our clients actually brag about"
- 3-column grid (1 mobile, 2 tablet, 3 desktop)
- 6 testimonials with quote, star rating, avatar initials, name/title/company, result metric badge
- Staggered scroll entry animation, hover lift

### FinalCTA (FinalCTA.tsx)
- Full-width dark section with noise texture
- Centered: H2 gradient, subtext, two buttons (amber primary + ghost), trust micro-copy
- Subtle Three.js particle field behind (lighter density, reuse HeroScene logic)

## Navbar (Navbar.tsx)
- Fixed, full-width, backdrop-blur(20px), border-bottom
- Logo: "FlowForges" in Geist Mono with animated indigo dot
- Nav links: Products | Services | Case Studies | Blog
- Right: "Book a Call" amber outline pill button
- On scroll past 80px: background darkens to `rgba(8,12,20,0.95)`
- Mobile: hamburger → full-screen overlay with staggered link entry

## Footer (Footer.tsx)
- Dark surface background
- Logo + tagline, nav links, social links, copyright
- Subtle top border

## SEO

Homepage `generateMetadata()` with title, description, OpenGraph, Twitter cards.
JSON-LD `ProfessionalService` structured data on homepage.

## Accessibility

- All interactive elements keyboard-navigable
- Focus rings visible (`ring-2 ring-indigo-500 ring-offset-2`)
- `prefers-reduced-motion` disables all Framer Motion animations gracefully
- Mobile first: 375px, 768px, 1280px, 1920px breakpoints

## Dependencies

```bash
npm install @react-three/fiber @react-three/drei three
npm install framer-motion lucide-react clsx tailwind-merge
npm install -D @types/three
```

## Quality Gates

- [ ] Works at 375px, 768px, 1280px, 1920px
- [ ] No hydration errors (Three.js client-only with `'use client'`)
- [ ] All buttons have visible focus states
- [ ] `prefers-reduced-motion` respected
- [ ] No `any` TypeScript types
- [ ] 0 console errors in dev

## Out of Scope (Phase 2 / 3)

- Products, Services, Case Studies, Blog listing, Blog post, Contact, Legal pages
- Dashboard redesign
- AgentNetworkScene, FloatingMetrics (Three.js)
