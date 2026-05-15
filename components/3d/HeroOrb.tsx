'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroOrb() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const w = el.clientWidth
    const h = el.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setClearAlpha(0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.z = 5

    const geo = new THREE.IcosahedronGeometry(1.8, 1)
    const mat = new THREE.MeshBasicMaterial({ color: 0x38BDF8, wireframe: true, transparent: true, opacity: 0.35 })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    const geo2 = new THREE.IcosahedronGeometry(1.96, 1)
    const mat2 = new THREE.MeshBasicMaterial({ color: 0x7DF9FF, wireframe: true, transparent: true, opacity: 0.1 })
    const mesh2 = new THREE.Mesh(geo2, mat2)
    scene.add(mesh2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    let targetX = 0, targetY = 0
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.8
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.8
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf: number
    const animate = () => {
      raf = requestAnimationFrame(animate)
      mesh.rotation.x += 0.002
      mesh.rotation.y += 0.004
      mesh2.rotation.x -= 0.001
      mesh2.rotation.y -= 0.002
      mesh.rotation.x += (targetY - mesh.rotation.x) * 0.02
      mesh.rotation.y += (targetX - mesh.rotation.y) * 0.02
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      geo.dispose(); mat.dispose()
      geo2.dispose(); mat2.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} aria-hidden="true" />
}
