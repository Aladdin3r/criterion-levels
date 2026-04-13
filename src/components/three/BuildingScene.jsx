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
  // In scroll mode, show only the relevant floor based on activeFloor
  // This eliminates the overlap/z-fighting and cuts draw calls by 75%
  const showExterior = activeFloor <= 0 || activeFloor === 1
  const showFloor1 = activeFloor <= 1
  const showFloor2 = activeFloor === 2
  const showFloor3 = activeFloor === 3
  const showFloor4 = activeFloor === 4

  // In free roam, show only the active floor
  const freeRoamFloor = mode === 'freeRoam' ? activeFloor : null

  return (
    <Canvas
      camera={{ fov: 60, near: 0.1, far: 300, position: [0, 2, 14] }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: '#111008' }}
    >
      <Suspense fallback={null}>
        {mode === 'scroll' && (
          <>
            {showExterior && <Exterior />}
            {showFloor1 && <Floor1 />}
            {showFloor2 && <Floor2 />}
            {showFloor3 && <Floor3 />}
            {showFloor4 && <Floor4 />}
          </>
        )}

        {mode === 'freeRoam' && (
          <>
            {freeRoamFloor === 1 && <Floor1 />}
            {freeRoamFloor === 2 && <Floor2 />}
            {freeRoamFloor === 3 && <Floor3 />}
            {freeRoamFloor === 4 && <Floor4 />}
          </>
        )}
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
