import { useState } from 'react'

const floorData = [
  {
    id: 1,
    label: 'F1',
    name: 'Entry to Cinema Culture',
    color: '#B8884A',
    clipTop: '76%',
    clipDesc: 'Ground floor — lobby, bar, merch, café',
    highlightY: '86%',
    spaces: [
      { name: 'Check-in Kiosk', desc: 'App scan for access. Age verification. Wristband + physical ticket.' },
      { name: 'Movie Poster Display', desc: 'Rotating wall of Criterion-curated film posters.' },
      { name: 'Merch & DVD Wall', desc: 'Criterion editions, collectibles, and branded merchandise.' },
      { name: 'Standing Bar', desc: 'Drinks for wristband holders. Open during all screenings.' },
      { name: 'Lounge + Café Tables', desc: 'Social seating area. Pre-film gathering space.' },
      { name: 'Leaderboards', desc: 'Live screening stats, top films, audience ratings.' },
    ],
    viewingMode: 'Social · Open · Exploratory',
  },
  {
    id: 2,
    label: 'F2',
    name: 'Cinema as Spectacle',
    color: '#4488FF',
    clipTop: '57%',
    clipDesc: 'Second floor — video wall, bar, event space',
    highlightY: '66%',
    spaces: [
      { name: 'Video Wall', desc: '4×3 grid of screens. Live feeds, experimental film, Criterion curations.' },
      { name: 'Main Theatre', desc: 'Open event floor. 100-person capacity. Standing and seating mixed.' },
      { name: 'Large Screen', desc: 'Full-width projection. High-output sound system.' },
      { name: 'Bar Access', desc: 'Wristband-gated drinks service during screenings.' },
      { name: 'Prop Scene Recreation', desc: 'Monthly immersive set-dressing inspired by current feature.' },
    ],
    viewingMode: 'Loud · Social · Immersive',
  },
  {
    id: 3,
    label: 'F3',
    name: 'Cinema as Conversation',
    color: '#7FA99B',
    clipTop: '38%',
    clipDesc: 'Third floor — cinema theatre + production studio',
    highlightY: '47%',
    spaces: [
      { name: 'Cinema Theatre', desc: 'Traditional tiered seating, dedicated screen. Small group screenings.' },
      { name: 'Production Studio', desc: 'Immersive experience room — cameras, curved screen, drapes, mixing desk.' },
      { name: 'Rental Rooms ×2', desc: 'Bookable rooms. Curated film selection. 25-person max each.' },
      { name: '24/7 Channel', desc: 'Continuous loop screening. Always on. Rotating curation.' },
      { name: 'Live Comment Wall', desc: 'In-app comments appear on side screens during screenings.' },
    ],
    viewingMode: 'Intimate · Interactive · Communal',
  },
  {
    id: 4,
    label: 'F4',
    name: 'Cinema as Ritual',
    color: '#9B7FA9',
    clipTop: '18%',
    clipDesc: 'Top floor — private pods, phone lockbox, elevators',
    highlightY: '27%',
    spaces: [
      { name: 'Phone Lockbox', desc: 'Mandatory at entry. No exceptions. The silence starts here.' },
      { name: 'Private Rooms ×3 (Rental)', desc: 'Rent your own film. 5-person max. Intimate, silent, yours.' },
      { name: 'Walk-in Rooms ×3', desc: 'Drop-in private screening rooms. First-come. Silent only.' },
      { name: '24/7 Channel', desc: 'Continuous curated loop. Silent. Muted aesthetic.' },
      { name: 'Elevators ×2', desc: 'Access between floors. The transition ritual.' },
    ],
    viewingMode: 'Silent · Private · Sacred',
  },
]

// Height of each floor band in the isometric (percentage of total image)
// New theatre-rendering.png: top ~18% is roof/storage, then 4 floors each ~19%
const FLOOR_BAND_HEIGHT = 19

export default function FloorPlans() {
  const [active, setActive] = useState(1)
  const floor = floorData.find(f => f.id === active)

  return (
    <section id="floorplans" className="section" style={{ background: '#0A0A0A', padding: '8rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <div style={{ marginBottom: '4rem' }}>
          <div className="floor-label" style={{ marginBottom: '1.5rem' }}>Floor Plans</div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, color: '#F5F0E8', letterSpacing: '-0.02em' }}
          >
            Floor by floor,<br />
            <em style={{ color: '#7FA99B' }}>space by space.</em>
          </h2>
        </div>

        {/* Tab selector */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '3rem', borderBottom: '1px solid rgba(245,240,232,0.08)' }}>
          {floorData.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '1rem 1.5rem',
                background: 'none',
                border: 'none',
                borderBottom: active === f.id ? `2px solid ${f.color}` : '2px solid transparent',
                color: active === f.id ? f.color : 'rgba(245,240,232,0.35)',
                cursor: 'pointer',
                transition: 'color 0.2s',
                marginBottom: '-1px',
              }}
            >
              {f.label} — {f.name.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>

        {/* Floor detail */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Spaces list */}
          <div>
            <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: floor.color, textTransform: 'uppercase', marginBottom: '2rem' }}>
              {floor.label} · {floor.name}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {floor.spaces.map((space, i) => (
                <div
                  key={space.name}
                  style={{
                    padding: '1.25rem 0',
                    borderBottom: '1px solid rgba(245,240,232,0.06)',
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'start',
                  }}
                >
                  <span className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(245,240,232,0.2)', letterSpacing: '0.1em', flexShrink: 0, marginTop: '0.15rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="font-display" style={{ fontSize: '1rem', color: '#F5F0E8', marginBottom: '0.35rem' }}>
                      {space.name}
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '0.85rem', lineHeight: 1.65, color: 'rgba(245,240,232,0.45)' }}>
                      {space.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#111', border: '1px solid rgba(245,240,232,0.06)' }}>
              <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#7FA99B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Viewing mode
              </div>
              <div className="font-display" style={{ fontSize: '1.1rem', color: '#F5F0E8' }}>
                {floor.viewingMode}
              </div>
            </div>
          </div>

          {/* Right side — isometric building with floor highlight */}
          <div>
            {/* Full isometric building with highlight overlay */}
            <div
              style={{
                position: 'relative',
                background: '#0F0F0F',
                border: '1px solid rgba(245,240,232,0.06)',
                overflow: 'hidden',
              }}
            >
              {/* Full building image — always visible, dimmed */}
              <img
                src="/assets/theatre-rendering.png"
                alt="Building overview"
                style={{
                  width: '100%',
                  display: 'block',
                  filter: 'brightness(0.35)',
                  transition: 'none',
                }}
              />

              {/* Highlight overlay: only the active floor band is bright */}
              {/* We clip the image to just show the active floor band at full brightness */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                  // Clip to the floor band: each floor is 25% of height, F4 at top, F1 at bottom
                  clipPath: `inset(${floor.clipTop} 0% ${100 - parseFloat(floor.clipTop) - FLOOR_BAND_HEIGHT}% 0%)`,
                  transition: 'clip-path 0.4s ease',
                }}
              >
                <img
                  src="/assets/theatre-rendering.png"
                  alt=""
                  aria-hidden
                  style={{
                    width: '100%',
                    display: 'block',
                    filter: 'brightness(1.1)',
                  }}
                />
              </div>

              {/* Tinted colour band overlay for active floor */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: floor.clipTop,
                  height: `${FLOOR_BAND_HEIGHT}%`,
                  background: `${floor.color}18`,
                  borderTop: `1px solid ${floor.color}55`,
                  borderBottom: `1px solid ${floor.color}55`,
                  transition: 'top 0.4s ease',
                  pointerEvents: 'none',
                }}
              />

              {/* Floor label badge */}
              <div
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: `calc(${floor.clipTop} + 0.75rem)`,
                  transition: 'top 0.4s ease',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: floor.color,
                  background: 'rgba(10,10,10,0.85)',
                  padding: '0.3rem 0.6rem',
                  border: `1px solid ${floor.color}66`,
                }}
              >
                {floor.label} · {floor.clipDesc}
              </div>

              {/* Inactive floor labels — clickable */}
              {floorData.filter(f => f.id !== active).map(f => (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: `calc(${f.clipTop} + 0.75rem)`,
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.55rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,240,232,0.3)',
                    background: 'rgba(10,10,10,0.6)',
                    padding: '0.25rem 0.5rem',
                    border: '1px solid rgba(245,240,232,0.1)',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = f.color }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,240,232,0.3)' }}
                >
                  {f.label} ↗
                </button>
              ))}
            </div>

            {/* Caption */}
            <div style={{ marginTop: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(245,240,232,0.2)', textTransform: 'uppercase' }}>
              Click a floor label to explore · 4-level isometric overview
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
