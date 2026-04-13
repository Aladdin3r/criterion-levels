import { useRef, useState, useEffect } from 'react'

const FLOOR_BEATS = [
  { floor: null, label: 'Exterior', desc: 'Del Mar Inn · Downtown Vancouver · Night', color: '#7FA99B' },
  { floor: 1, label: 'Floor 1', desc: 'Entry to Cinema Culture', color: '#B8884A' },
  { floor: 2, label: 'Floor 2', desc: 'Cinema as Spectacle', color: '#4488FF' },
  { floor: 3, label: 'Floor 3', desc: 'Cinema as Conversation', color: '#7FA99B' },
  { floor: 4, label: 'Floor 4', desc: 'Cinema as Ritual', color: '#9B7FA9' },
]

export default function Walkthrough({ mode, activeFloor, currentBeat, onEnterFreeRoam, onFloorSelect, sectionRef }) {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent)
  const beat = FLOOR_BEATS[Math.min(currentBeat, FLOOR_BEATS.length - 1)]

  // Scroll hint: shown until user scrolls for the first time
  const [hasScrolled, setHasScrolled] = useState(false)
  // Controls bar: shown when entering free roam, auto-fades after 4s
  const [showControlsBar, setShowControlsBar] = useState(false)
  // Pointer lock state — tracked via document event
  const [isPointerLocked, setIsPointerLocked] = useState(false)

  // Detect first scroll inside the walkthrough section
  useEffect(() => {
    if (hasScrolled) return
    const handleScroll = () => setHasScrolled(true)
    window.addEventListener('scroll', handleScroll, { passive: true, once: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled])

  // Show controls bar when entering free roam, hide after 4s
  useEffect(() => {
    if (mode === 'freeRoam') {
      setShowControlsBar(true)
      const t = setTimeout(() => setShowControlsBar(false), 4000)
      return () => clearTimeout(t)
    } else {
      setShowControlsBar(false)
    }
  }, [mode])

  // Track pointer lock state
  useEffect(() => {
    const onLockChange = () => setIsPointerLocked(document.pointerLockElement !== null)
    document.addEventListener('pointerlockchange', onLockChange)
    return () => document.removeEventListener('pointerlockchange', onLockChange)
  }, [])

  // Reset pointer lock state when leaving free roam
  useEffect(() => {
    if (mode !== 'freeRoam') setIsPointerLocked(false)
  }, [mode])

  return (
    <section
      id="walkthrough"
      ref={sectionRef}
      style={{ position: 'relative', height: '600vh' }}
    >
      {/* Sticky overlay — stays in view while scrolling through 600vh */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'flex-end',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        {/* Initial scroll hint — fades in on mount, disappears on first scroll */}
        {!hasScrolled && mode === 'scroll' && (
          <div
            style={{
              position: 'absolute',
              bottom: '3rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'hintFadeIn 1s ease 0.5s both',
              pointerEvents: 'none',
              textAlign: 'center',
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.5)',
              }}
            >
              Scroll to explore
            </div>
            <div
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'rgba(245,240,232,0.25)',
                textTransform: 'uppercase',
              }}
            >
              the building, floor by floor
            </div>
            {/* Animated scroll arrow */}
            <div
              style={{
                marginTop: '0.25rem',
                width: '1px',
                height: '24px',
                background: 'linear-gradient(to bottom, rgba(245,240,232,0.4), transparent)',
                animation: 'hintFadeIn 1s ease 1s both',
              }}
            />
          </div>
        )}

        {/* Bottom-left floor info */}
        <div
          style={{
            padding: '2rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            pointerEvents: 'none',
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: beat?.color || '#7FA99B',
              transition: 'color 0.6s ease',
            }}
          >
            {beat?.label}
          </div>
          <div
            className="font-display"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: '#F5F0E8',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              transition: 'opacity 0.5s ease',
            }}
          >
            {beat?.desc}
          </div>
          {beat?.floor && !isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem' }}>
              {/* Helper sub-label */}
              <div
                className="font-mono"
                style={{
                  fontSize: '0.52rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.3)',
                }}
              >
                Click to walk through
              </div>
              <button
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: beat.color,
                  border: `1px solid ${beat.color}44`,
                  background: 'transparent',
                  padding: '0.6rem 1.2rem',
                  cursor: 'pointer',
                  pointerEvents: 'all',
                  width: 'fit-content',
                  // Pulse uses inline CSS custom props for per-beat color
                  '--pulse-color-dim': `${beat.color}44`,
                  '--pulse-color-bright': `${beat.color}99`,
                  '--pulse-color-glow': `${beat.color}22`,
                  animation: 'borderPulse 2s ease-in-out 3',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${beat.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                onClick={() => onEnterFreeRoam(beat.floor)}
              >
                Explore Floor {beat.floor} →
              </button>
            </div>
          )}
        </div>

        {/* Top-right scroll indicator */}
        <div
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            fontFamily: 'JetBrains Mono',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: 'rgba(245,240,232,0.25)',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            pointerEvents: 'none',
          }}
        >
          {mode === 'scroll' ? 'Scroll to navigate' : 'WASD to move · ESC to exit'}
        </div>

        {/* Floor dots — right side navigation */}
        <div
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            pointerEvents: 'all',
          }}
        >
          {FLOOR_BEATS.map((b, i) => (
            <button
              key={i}
              title={b.label}
              onClick={() => {
                if (b.floor) onFloorSelect(i)
              }}
              style={{
                width: currentBeat === i ? '8px' : '4px',
                height: currentBeat === i ? '8px' : '4px',
                borderRadius: '50%',
                background: currentBeat === i ? b.color : 'rgba(245,240,232,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Free roam mode — full screen takeover */}
      {mode === 'freeRoam' && (
        <>
          {/* Crosshair */}
          <div className="crosshair" style={{ position: 'fixed', zIndex: 55 }} />

          {/* Pointer lock prompt — shown before mouse is captured */}
          {!isPointerLocked && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: 'rgba(10,10,10,0.7)',
                backdropFilter: 'blur(4px)',
                animation: 'hintFadeIn 0.4s ease both',
                pointerEvents: 'none',
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                  color: '#F5F0E8',
                  letterSpacing: '-0.01em',
                }}
              >
                Click to capture mouse
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.45)',
                }}
              >
                Move cursor to look around
              </div>
            </div>
          )}

          {/* WASD controls hint bar — auto-fades after 4s */}
          {showControlsBar && (
            <div
              style={{
                position: 'fixed',
                bottom: '5.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 60,
                display: 'flex',
                gap: '1.5rem',
                pointerEvents: 'none',
                animation: 'controlsBarFade 4s ease forwards',
              }}
            >
              {[
                { key: 'W A S D', action: 'Move' },
                { key: 'Mouse', action: 'Look' },
                { key: 'ESC', action: 'Exit' },
              ].map(({ key, action }) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.55rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.35)',
                  }}
                >
                  <span
                    style={{
                      border: '1px solid rgba(245,240,232,0.2)',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '2px',
                      color: 'rgba(245,240,232,0.5)',
                    }}
                  >
                    {key}
                  </span>
                  {action}
                </div>
              ))}
            </div>
          )}

          {/* Floor selector */}
          <div
            style={{
              position: 'fixed',
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 60,
              display: 'flex',
              gap: '0.5rem',
              pointerEvents: 'all',
            }}
          >
            {[1, 2, 3, 4].map(f => (
              <button
                key={f}
                onClick={() => onFloorSelect(f)}
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  padding: '0.5rem 1rem',
                  background: activeFloor === f ? 'rgba(245,240,232,0.15)' : 'rgba(10,10,10,0.7)',
                  border: `1px solid ${activeFloor === f ? 'rgba(245,240,232,0.4)' : 'rgba(245,240,232,0.1)'}`,
                  color: activeFloor === f ? '#F5F0E8' : 'rgba(245,240,232,0.4)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.2s',
                }}
              >
                F{f}
              </button>
            ))}
            <button
              onClick={() => onEnterFreeRoam(null)}
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                padding: '0.5rem 1rem',
                background: 'rgba(10,10,10,0.7)',
                border: '1px solid rgba(230,48,34,0.4)',
                color: '#E63022',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                marginLeft: '0.5rem',
              }}
            >
              Exit
            </button>
          </div>
        </>
      )}
    </section>
  )
}
