import { useState, useCallback } from 'react'

export function useWalkthroughMode() {
  const [mode, setMode] = useState('scroll') // 'scroll' | 'freeRoam'
  const [activeFloor, setActiveFloor] = useState(1)

  const enterFreeRoam = useCallback((floor = 1) => {
    setActiveFloor(floor)
    setMode('freeRoam')
  }, [])

  const exitFreeRoam = useCallback(() => {
    setMode('scroll')
  }, [])

  return { mode, activeFloor, setActiveFloor, enterFreeRoam, exitFreeRoam }
}
