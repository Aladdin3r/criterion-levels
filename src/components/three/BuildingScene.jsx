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
      camera={{ fov: 60, near: 0.1, far: 300, position: [0, 4, 20] }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: '#1A1208' }}
    >
      <Suspense fallback={null}>
        {/* Show exterior when floor 0, or the specific floor otherwise */}
        {activeFloor === 0 && <Exterior />}
        {activeFloor === 1 && <Floor1 />}
        {activeFloor === 2 && <Floor2 />}
        {activeFloor === 3 && <Floor3 />}
        {activeFloor === 4 && <Floor4 />}
        {/* Default: show floor 1 if activeFloor hasn't been set yet */}
        {!activeFloor && <Floor1 />}
      </Suspense>

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
          target={[0, 2, 0]}
        />
      )}
    </Canvas>
  )
}
