import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Exterior from './Exterior'
import Floor1 from './Floor1'
import Floor2 from './Floor2'
import Floor3 from './Floor3'
import Floor4 from './Floor4'
import ScrollCamera from './ScrollCamera'
import FreeRoamCamera from './FreeRoamCamera'

const FLOOR_OFFSETS = {
  exterior: [0, 0, 0],
  1: [0, 0, 0],
  2: [0, 12, 0],
  3: [0, 24, 0],
  4: [0, 36, 0],
}

export default function BuildingScene({
  mode,
  activeFloor,
  walkthroughRef,
  onFloorChange,
  onExitFreeRoam,
  isMobile,
}) {
  return (
    <Canvas
      camera={{ fov: 65, near: 0.1, far: 500, position: [0, 4, 22] }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: '#0A0A0A' }}
    >
      <fog attach="fog" args={['#0A0A0F', 60, 160]} />

      <Suspense fallback={null}>
        {/* Always show exterior */}
        <group position={FLOOR_OFFSETS.exterior}>
          <Exterior />
        </group>

        {/* All floors stacked vertically — camera moves between them */}
        <group position={FLOOR_OFFSETS[1]}>
          <Floor1 />
        </group>
        <group position={FLOOR_OFFSETS[2]}>
          <Floor2 />
        </group>
        <group position={FLOOR_OFFSETS[3]}>
          <Floor3 />
        </group>
        <group position={FLOOR_OFFSETS[4]}>
          <Floor4 />
        </group>
      </Suspense>

      {/* Camera control — scroll or free roam */}
      {mode === 'scroll' && !isMobile && (
        <ScrollCamera
          walkthroughRef={walkthroughRef}
          onFloorChange={onFloorChange}
        />
      )}

      {mode === 'freeRoam' && !isMobile && (
        <FreeRoamCamera
          activeFloor={activeFloor}
          onExit={onExitFreeRoam}
        />
      )}

      {isMobile && (
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={30}
          target={[0, 3, 0]}
        />
      )}
    </Canvas>
  )
}
