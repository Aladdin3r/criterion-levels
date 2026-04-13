import { useState } from 'react'

const floorData = [
  {
    id: 1,
    label: 'F1',
    name: 'Entry to Cinema Culture',
    color: '#B8884A',
    image: null,
    spaces: [
      { name: 'Check-in Kiosk', desc: 'App scan for access. Age verification. Wristband + physical ticket.' },
      { name: 'Movie Poster Display', desc: 'Rotating wall of Criterion-curated film posters.' },
      { name: 'Merch & DVD Wall', desc: 'Criterion editions, collectibles, and branded merchandise.' },
      { name: 'Standing Bar', desc: 'Drinks for wristband holders. Open during all screenings.' },
      { name: 'Lounge', desc: 'Seating area. Social. Pre-film gathering space.' },
      { name: 'Leaderboards', desc: 'Live screening stats, top films, audience ratings.' },
    ],
  },
  {
    id: 2,
    label: 'F2',
    name: 'Cinema as Spectacle',
    color: '#4488FF',
    image: null,
    spaces: [
      { name: 'Main Theatre', desc: '100-person capacity. Open standing and seating mixed.' },
      { name: 'Large Screen', desc: 'Full-width projection. High-output sound system.' },
      { name: 'Prop Scene Recreation', desc: 'Monthly immersive set-dressing inspired by current feature. Currently: Babylon.' },
      { name: 'Bar Access', desc: 'Wristband-gated drinks service during screenings.' },
      { name: 'Vending Machine', desc: 'Snacks and non-alcoholic options.' },
    ],
  },
  {
    id: 3,
    label: 'F3',
    name: 'Cinema as Conversation',
    color: '#7FA99B',
    image: null,
    spaces: [
      { name: 'Theatre Room', desc: 'Traditional seating, rows of seats, dedicated screen. Small group screenings.' },
      { name: 'Rental Room ×2', desc: 'Bookable rooms. Curated film selection. 25-person max each.' },
      { name: '24/7 Channel', desc: 'Continuous loop screening. Always on. Rotating curation.' },
      { name: 'Live Comment Wall', desc: 'In-app comments appear on side screens during screenings. Conversation as cinema.' },
    ],
  },
  {
    id: 4,
    label: 'F4',
    name: 'Cinema as Ritual',
    color: '#9B7FA9',
    image: null,
    spaces: [
      { name: 'Phone Lockbox', desc: 'Mandatory at entry. No exceptions. The silence starts here.' },
      { name: 'Private Rooms ×3 (Rental)', desc: 'Rent your own film. 5-person max. Intimate, silent, yours.' },
      { name: 'Walk-in Rooms ×3', desc: 'Drop-in private screening rooms. First-come. Silent only.' },
      { name: '24/7 Channel', desc: 'Continuous curated loop. Silent. Muted aesthetic.' },
      { name: 'Elevators ×2', desc: 'Access between floors. The transition ritual.' },
    ],
  },
]

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
          </div>

          {/* Sketch reference */}
          <div>
            <div
              style={{
                background: '#1A1A1A',
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(245,240,232,0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={`/references-with-labels/000${floor.id - 1}_floor_${floor.id}.png`}
                alt={`Floor ${floor.id} layout`}
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1) brightness(0.4)', mixBlendMode: 'screen', padding: '2rem' }}
                onError={e => { e.target.style.display = 'none' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  color: 'rgba(245,240,232,0.2)',
                  textTransform: 'uppercase',
                }}
              >
                Layout reference · {floor.label}
              </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#111', border: '1px solid rgba(245,240,232,0.06)' }}>
              <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#7FA99B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Viewing mode
              </div>
              <div className="font-display" style={{ fontSize: '1.1rem', color: '#F5F0E8' }}>
                {['Social · Open · Exploratory', 'Loud · Social · Immersive', 'Intimate · Interactive · Communal', 'Silent · Private · Sacred'][floor.id - 1]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
