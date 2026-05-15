'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function DataCube() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const w = el.clientWidth, h = el.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setClearAlpha(0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.z = 5

    const boxGeo = new THREE.BoxGeometry(2, 2, 2)
    const edgesGeo = new THREE.EdgesGeometry(boxGeo)
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.5 })
    const cube = new THREE.LineSegments(edgesGeo, edgesMat)
    scene.add(cube)

    const orbitData = [
      { radius: 1.2, speed: 0.01, plane: 'xy' as const, color: 0x7DF9FF },
      { radius: 1.2, speed: 0.015, plane: 'xz' as const, color: 0x38BDF8 },
      { radius: 1.2, speed: 0.008, plane: 'yz' as const, color: 0x7DF9FF },
    ]
    const orbiters = orbitData.map(d => {
      const geo = new THREE.SphereGeometry(0.08, 8, 8)
      const mat = new THREE.MeshBasicMaterial({ color: d.color })
      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)
      return { mesh, ...d, angle: Math.random() * Math.PI * 2 }
    })

    const grid = new THREE.GridHelper(4, 4, 0x0c2a3d, 0x071520)
    grid.position.y = -1.5
    scene.add(grid)

    let raf: number
    const animate = () => {
      raf = requestAnimationFrame(animate)
      cube.rotation.x += 0.003
      cube.rotation.y += 0.005

      orbiters.forEach(o => {
        o.angle += o.speed
        if (o.plane === 'xy') {
          o.mesh.position.set(Math.cos(o.angle) * o.radius, Math.sin(o.angle) * o.radius, 0)
        } else if (o.plane === 'xz') {
          o.mesh.position.set(Math.cos(o.angle) * o.radius, 0, Math.sin(o.angle) * o.radius)
        } else {
          o.mesh.position.set(0, Math.cos(o.angle) * o.radius, Math.sin(o.angle) * o.radius)
        }
        o.mesh.rotation.copy(cube.rotation)
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      renderer.dispose()
      boxGeo.dispose(); edgesGeo.dispose(); edgesMat.dispose()
      orbiters.forEach(o => {
        o.mesh.geometry.dispose()
        ;(o.mesh.material as THREE.Material).dispose()
      })
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} aria-hidden="true" />
}
