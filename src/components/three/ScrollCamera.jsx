import { useRef, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// Camera waypoints: position + target for each beat
const WAYPOINTS = [
  // 0 — Exterior approach (hero)
  { pos: [0, 4, 22], target: [0, 6, 0] },
  // 1 — Exterior close (location section)
  { pos: [3, 7, 12], target: [-2, 8, 0] },
  // 2 — Floor 1 entry (space overview)
  { pos: [0, 1.6, 5], target: [0, 1.8, 0] },
  // 3 — Floor 1 interior (walkthrough start)
  { pos: [-4, 1.6, 1], target: [0, 1.8, -5] },
  // 4 — Floor 2 (cinema as spectacle) — look straight at the screen
  { pos: [0, 1.8, 4], target: [0, 2.0, -8] },
  // 5 — Floor 3 (cinema as conversation) — look down the corridor
  { pos: [0, 1.6, 5], target: [0, 1.8, -7] },
  // 6 — Floor 4 (cinema as ritual)
  { pos: [0, 1.6, 5], target: [0, 1.5, -3] },
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
  const targetPosRef = useRef(new THREE.Vector3(...WAYPOINTS[0].pos))
  const targetLookRef = useRef(new THREE.Vector3(...WAYPOINTS[0].target))

  useEffect(() => {
    if (!walkthroughRef?.current) return

    const st = ScrollTrigger.create({
      trigger: walkthroughRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
      onUpdate: (self) => {
        progressRef.current = self.progress

        // Determine which floor we're on for the overlay
        const floor = Math.floor(self.progress * 4) + 1
        onFloorChange?.(Math.min(floor, 4))
      },
    })

    return () => st.kill()
  }, [walkthroughRef, onFloorChange])

  useFrame(() => {
    const p = progressRef.current
    const total = WAYPOINTS.length - 1
    const idx = Math.min(Math.floor(p * total), total - 1)
    const frac = (p * total) - idx

    const easedFrac = frac < 0.5
      ? 2 * frac * frac
      : 1 - Math.pow(-2 * frac + 2, 2) / 2

    const wp0 = WAYPOINTS[idx]
    const wp1 = WAYPOINTS[idx + 1] || WAYPOINTS[total]

    const pos = lerp3(wp0.pos, wp1.pos, easedFrac)
    const tgt = lerp3(wp0.target, wp1.target, easedFrac)

    targetPosRef.current.set(...pos)
    targetLookRef.current.set(...tgt)

    camera.position.lerp(targetPosRef.current, 0.06)

    const currentLook = new THREE.Vector3()
    camera.getWorldDirection(currentLook)
    const desiredLook = targetLookRef.current.clone().sub(camera.position).normalize()
    const smoothLook = currentLook.lerp(desiredLook, 0.06)
    camera.lookAt(camera.position.clone().add(smoothLook))
  })

  return null
}
