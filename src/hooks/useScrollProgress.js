import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollProgress(triggerRef, onProgress) {
  const stRef = useRef(null)

  useEffect(() => {
    if (!triggerRef.current) return

    stRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        onProgress(self.progress)
      },
    })

    return () => {
      stRef.current?.kill()
    }
  }, [triggerRef, onProgress])
}
