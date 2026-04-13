import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// All floors now render at Y=0 (only one at a time).
// Waypoints are inside each floor — no Y offset needed.
const WAYPOINTS = [
  // 0 — Exterior: camera out front looking at building facade
  { pos: [0, 3, 18],   target: [0, 5, 0],    floor: 0 },
  // 1 — Exterior close: angled view
  { pos: [-4, 5, 10],  target: [0, 4, 0],    floor: 0 },
  // 2 — Floor 1: standing in lobby looking toward merch/bar
  { pos: [0, 1.7, 6],  target: [0, 1.8, -4], floor: 1 },
  // 3 — Floor 1: panning left toward reception desk
  { pos: [-5, 1.7, 2], target: [-2, 1.8, -6], floor: 1 },
  // 4 — Floor 2: inside looking at video wall left side
  { pos: [2, 1.8, 4],  target: [-6, 2.0, -4], floor: 2 },
  // 5 — Floor 2: looking at back screen
  { pos: [0, 1.8, 3],  target: [8, 2.0, -6],  floor: 2 },
  // 6 — Floor 3: inside theatre half looking at screen
  { pos: [-4, 1.8, 4], target: [-4, 2.0, -7], floor: 3 },
  // 7 — Floor 4: looking into pods
  { pos: [2, 1.8, 5],  target: [-5, 1.8, -1], floor: 4 },
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

  // Set initial camera position immediately
  useEffect(() => {
    camera.position.set(...WAYPOINTS[0].pos)
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

        // Map progress to floor
        const total = WAYPOINTS.length - 1
        const idx = Math.min(Math.floor(self.progress * total), total - 1)
        const wp = WAYPOINTS[idx]
        onFloorChange?.(wp.floor > 0 ? wp.floor : 1)
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

    // Ease in-out
    const t = frac < 0.5
      ? 2 * frac * frac
      : 1 - Math.pow(-2 * frac + 2, 2) / 2

    const wp0 = WAYPOINTS[idx]
    const wp1 = WAYPOINTS[Math.min(idx + 1, total)]

    const pos = lerp3(wp0.pos, wp1.pos, t)
    const tgt = lerp3(wp0.target, wp1.target, t)

    targetPosRef.current.set(...pos)
    targetLookRef.current.set(...tgt)

    // Smooth follow
    camera.position.lerp(targetPosRef.current, 0.08)

    const desiredLook = targetLookRef.current.clone().sub(camera.position).normalize()
    const currentDir = new THREE.Vector3()
    camera.getWorldDirection(currentDir)
    const smoothDir = currentDir.lerp(desiredLook, 0.08)
    camera.lookAt(camera.position.clone().add(smoothDir))
  })

  return null
}
