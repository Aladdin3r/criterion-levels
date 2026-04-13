import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// Camera waypoints — camera inside each floor, looking at key features
// Each waypoint has: pos (camera), target (look-at), floor (which floor to show)
const WAYPOINTS = [
  // 0 — Exterior approach
  { pos: [0, 4, 20],   target: [0, 5, 0],     floor: 0 },
  // 1 — Floor 1: lobby entrance, looking in
  { pos: [0, 1.8, 7],  target: [0, 1.8, 0],   floor: 1 },
  // 2 — Floor 1: looking toward merch wall + bar
  { pos: [-3, 1.8, 1], target: [0, 1.8, -6],  floor: 1 },
  // 3 — Floor 2: standing near entrance, video wall ahead-left
  { pos: [3, 1.8, 5],  target: [-5, 2.0, -3], floor: 2 },
  // 4 — Floor 2: bar area, looking at event space
  { pos: [0, 1.8, 1],  target: [6, 2.0, -5],  floor: 2 },
  // 5 — Floor 3: theatre side, looking at cinema screen
  { pos: [-2, 1.8, 4], target: [-5, 2.0, -6], floor: 3 },
  // 6 — Floor 4: looking at private pods
  { pos: [4, 1.8, 6],  target: [-5, 1.8, 0],  floor: 4 },
]

function lerp3(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ]
}

export default function ScrollCamera({ walkthroughRef, onFloorChange }) {
  const { camera } = useThree()
  const progressRef = useRef(0)

  useEffect(() => {
    camera.position.set(...WAYPOINTS[0].pos)
    camera.lookAt(0, 5, 0)
  }, [camera])

  useEffect(() => {
    if (!walkthroughRef?.current) return

    const st = ScrollTrigger.create({
      trigger: walkthroughRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress

        // Map full 0→1 range across all waypoints including the last
        const total = WAYPOINTS.length - 1
        const rawIdx = self.progress * total
        // Use ceil so that at progress=1.0 we get the last waypoint's floor
        const idx = Math.min(Math.ceil(rawIdx), total)
        const wp = WAYPOINTS[idx] || WAYPOINTS[total]
        const floorToShow = wp.floor > 0 ? wp.floor : 1
        onFloorChange?.(floorToShow)
      },
    })

    return () => st.kill()
  }, [walkthroughRef, onFloorChange])

  useFrame(() => {
    const p = progressRef.current
    const total = WAYPOINTS.length - 1
    const rawIdx = p * total
    const idx = Math.min(Math.floor(rawIdx), total - 1)
    const frac = rawIdx - idx

    const t = frac < 0.5
      ? 2 * frac * frac
      : 1 - Math.pow(-2 * frac + 2, 2) / 2

    const wp0 = WAYPOINTS[idx]
    const wp1 = WAYPOINTS[idx + 1] || WAYPOINTS[total]

    const pos = lerp3(wp0.pos, wp1.pos, t)
    const tgt = lerp3(wp0.target, wp1.target, t)

    camera.position.lerp(new THREE.Vector3(...pos), 0.08)

    const desiredLook = new THREE.Vector3(...tgt).sub(camera.position).normalize()
    const currentDir = new THREE.Vector3()
    camera.getWorldDirection(currentDir)
    const smoothDir = currentDir.lerp(desiredLook, 0.08)
    camera.lookAt(camera.position.clone().add(smoothDir))
  })

  return null
}
