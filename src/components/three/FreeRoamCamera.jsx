import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

// Floor boundaries [minX, maxX, minZ, maxZ, y]
const FLOOR_BOUNDS = {
  1: { minX: -11, maxX: 11, minZ: -7.5, maxZ: 7, y: 1.7 },
  2: { minX: -11, maxX: 11, minZ: -7.5, maxZ: 7, y: 1.7 },
  3: { minX: -11, maxX: 11, minZ: -7.5, maxZ: 7, y: 1.7 },
  4: { minX: -11, maxX: 11, minZ: -7.5, maxZ: 7.2, y: 1.7 },
}

const FLOOR_ENTRY = {
  1: [0, 1.7, 5],
  2: [0, 1.7, 5],
  3: [0, 1.7, 5],
  4: [0, 1.7, 6],
}

const SPEED = 0.08

export default function FreeRoamCamera({ activeFloor, onExit }) {
  const { camera } = useThree()
  const controlsRef = useRef()
  const keys = useRef({ w: false, a: false, s: false, d: false })
  const velocity = useRef(new THREE.Vector3())

  // Set initial position for floor
  useEffect(() => {
    const [x, y, z] = FLOOR_ENTRY[activeFloor] || [0, 1.7, 5]
    camera.position.set(x, y, z)
    camera.lookAt(0, y, 0)
  }, [activeFloor, camera])

  // Keyboard listeners
  useEffect(() => {
    const onKeyDown = (e) => {
      const k = e.key.toLowerCase()
      if (k === 'w' || k === 'arrowup') keys.current.w = true
      if (k === 's' || k === 'arrowdown') keys.current.s = true
      if (k === 'a' || k === 'arrowleft') keys.current.a = true
      if (k === 'd' || k === 'arrowright') keys.current.d = true
      if (k === 'escape') onExit?.()
    }
    const onKeyUp = (e) => {
      const k = e.key.toLowerCase()
      if (k === 'w' || k === 'arrowup') keys.current.w = false
      if (k === 's' || k === 'arrowdown') keys.current.s = false
      if (k === 'a' || k === 'arrowleft') keys.current.a = false
      if (k === 'd' || k === 'arrowright') keys.current.d = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [onExit])

  useFrame(() => {
    if (!controlsRef.current?.isLocked) return

    const bounds = FLOOR_BOUNDS[activeFloor]
    const dir = new THREE.Vector3()
    const right = new THREE.Vector3()

    camera.getWorldDirection(dir)
    dir.y = 0
    dir.normalize()
    right.crossVectors(dir, camera.up).normalize()

    if (keys.current.w) velocity.current.addScaledVector(dir, SPEED)
    if (keys.current.s) velocity.current.addScaledVector(dir, -SPEED)
    if (keys.current.a) velocity.current.addScaledVector(right, -SPEED)
    if (keys.current.d) velocity.current.addScaledVector(right, SPEED)

    velocity.current.multiplyScalar(0.85) // damping

    camera.position.add(velocity.current)

    // Clamp to floor bounds
    if (bounds) {
      camera.position.x = Math.max(bounds.minX, Math.min(bounds.maxX, camera.position.x))
      camera.position.z = Math.max(bounds.minZ, Math.min(bounds.maxZ, camera.position.z))
      camera.position.y = bounds.y // lock Y height
    }
  })

  return (
    <PointerLockControls
      ref={controlsRef}
      onUnlock={onExit}
    />
  )
}
