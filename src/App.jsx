import { useRef, useState, useCallback } from 'react'
import BuildingScene from './components/three/BuildingScene'
import Hero from './components/sections/Hero'
import AboutBrand from './components/sections/AboutBrand'
import Location from './components/sections/Location'
import SpaceOverview from './components/sections/SpaceOverview'
import Walkthrough from './components/sections/Walkthrough'
import ExperienceMap from './components/sections/ExperienceMap'
import FloorPlans from './components/sections/FloorPlans'
import TechLayer from './components/sections/TechLayer'
import { useWalkthroughMode } from './hooks/useWalkthroughMode'

const isMobile = /Mobi|Android/i.test(navigator.userAgent)

export default function App() {
  const walkthroughRef = useRef(null)
  const [currentBeat, setCurrentBeat] = useState(0)
  const { mode, activeFloor, setActiveFloor, enterFreeRoam, exitFreeRoam } = useWalkthroughMode()

  const handleFloorChange = useCallback((floor) => {
    setCurrentBeat(floor)
  }, [])

  const handleEnterFreeRoam = useCallback((floor) => {
    if (!floor) {
      exitFreeRoam()
      return
    }
    enterFreeRoam(floor)
  }, [enterFreeRoam, exitFreeRoam])

  const handleFloorSelect = useCallback((floorOrBeat) => {
    if (mode === 'freeRoam') {
      setActiveFloor(floorOrBeat)
    } else {
      if (walkthroughRef.current) {
        const el = walkthroughRef.current
        const sectionHeight = el.offsetHeight
        const progress = floorOrBeat / 4
        const scrollY = el.offsetTop + sectionHeight * progress
        window.scrollTo({ top: scrollY, behavior: 'smooth' })
      }
    }
  }, [mode, setActiveFloor])

  return (
    <>
      {/* Fixed 3D canvas — always behind everything */}
      <div
        className="canvas-container"
        style={{ pointerEvents: mode === 'freeRoam' ? 'all' : 'none' }}
      >
        <BuildingScene
          mode={mode}
          activeFloor={activeFloor}
          walkthroughRef={walkthroughRef}
          onFloorChange={handleFloorChange}
          onExitFreeRoam={exitFreeRoam}
          isMobile={isMobile}
        />
      </div>

      {/* Scrollable content — sits above canvas */}
      <div className="site-content">
        {/* Navbar */}
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: '1.25rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, transparent 100%)',
          }}
        >
          <a href="#hero" style={{ display: 'block', textDecoration: 'none' }}>
            <img
              src="/assets/logos/criterion-mark-white.png"
              alt="The Criterion Levels"
              style={{ height: '28px', width: 'auto', opacity: 0.9 }}
            />
          </a>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {[
              { href: '#about', label: 'About' },
              { href: '#location', label: 'Location' },
              { href: '#walkthrough', label: 'Walkthrough' },
              { href: '#floorplans', label: 'Floors' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.target.style.color = '#F5F0E8' }}
                onMouseLeave={e => { e.target.style.color = 'rgba(245,240,232,0.5)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <Hero />

        <div style={{ background: 'linear-gradient(to bottom, transparent 0%, #0A0A0A 10%)' }}>
          <AboutBrand />
          <Location />
          <SpaceOverview />
        </div>

        <div style={{ background: 'transparent' }}>
          <Walkthrough
            mode={mode}
            activeFloor={activeFloor}
            currentBeat={currentBeat}
            onEnterFreeRoam={handleEnterFreeRoam}
            onFloorSelect={handleFloorSelect}
            sectionRef={walkthroughRef}
          />
        </div>

        <div style={{ background: '#0A0A0A' }}>
          <ExperienceMap />
          <FloorPlans />
          <TechLayer />

          <footer
            style={{
              borderTop: '1px solid rgba(245,240,232,0.06)',
              padding: '3rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <img
              src="/assets/logos/criterion-lockup-white.png"
              alt="The Criterion Levels"
              style={{ height: '32px', width: 'auto', opacity: 0.4 }}
            />
            <div
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                color: 'rgba(245,240,232,0.2)',
                textTransform: 'uppercase',
                textAlign: 'right',
              }}
            >
              <div>Criterion Level 4 · Conceptual Project</div>
              <div style={{ marginTop: '0.25rem' }}>Del Mar Inn · 553 · Downtown Vancouver</div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
