const floors = [
  {
    number: 'F1',
    name: 'Entry to Cinema Culture',
    mode: 'Social · Open · Exploratory',
    description: 'The lobby sets the tone. Check in, browse the merch wall, grab a drink at the bar, or linger in the lounge. Film culture as a place to arrive.',
    color: '#B8884A',
    elements: ['Check-in kiosk', 'Movie poster display', 'Merch & DVD wall', 'Standing bar', 'Lounge seating', 'Leaderboards'],
  },
  {
    number: 'F2',
    name: 'Cinema as Spectacle',
    mode: 'Loud · Social · Immersive',
    description: 'A 100-person theatre built for crowd energy. Monthly scene transformations turn the room into the film. Currently: Babylon-inspired.',
    color: '#4488FF',
    elements: ['100-person capacity', 'Large main screen', 'Prop scene recreation', 'Bar access', 'Standing area', 'Monthly theme'],
  },
  {
    number: 'F3',
    name: 'Cinema as Conversation',
    mode: 'Intimate · Interactive · Communal',
    description: 'Four rooms, 25 people max each. Live comment walls let audiences respond in real time. Film as dialogue.',
    color: '#7FA99B',
    elements: ['4 screening rooms', '25 person max', 'Live comment wall', 'App interaction', 'Rental room', '24/7 channel'],
  },
  {
    number: 'F4',
    name: 'Cinema as Ritual',
    mode: 'Silent · Private · Sacred',
    description: 'Phone lockbox at the door. Eight private rooms, five people max. Rent your own film. No distractions. No exceptions.',
    color: '#9B7FA9',
    elements: ['Phone lockbox', '8 private rooms', '5 person max', 'Film rental', 'Silent only', 'Minimal aesthetic'],
  },
]

export default function SpaceOverview() {
  return (
    <section id="space" className="section" style={{ background: '#0A0A0A', padding: '8rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="floor-label" style={{ marginBottom: '1.5rem' }}>The Space</div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, color: '#F5F0E8', letterSpacing: '-0.02em' }}
          >
            Four floors.<br />
            <em style={{ color: '#7FA99B' }}>Four ways of watching film.</em>
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.5)', maxWidth: '560px', margin: '2rem auto 0' }}>
            Criterion Level 4 is designed around a simple idea: not every film experience should feel the same. Each floor creates a different relationship between audience, space, and screen.
          </p>
        </div>

        {/* Floor cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(245,240,232,0.06)' }}>
          {floors.map((floor) => (
            <div
              key={floor.number}
              style={{
                background: '#0A0A0A',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#111' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0A0A0A' }}
            >
              {/* Floor number watermark */}
              <div
                className="font-display"
                style={{
                  position: 'absolute',
                  top: '-1rem',
                  right: '2rem',
                  fontSize: '8rem',
                  color: 'rgba(245,240,232,0.03)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {floor.number}
              </div>

              <div className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: floor.color, textTransform: 'uppercase', marginBottom: '1rem' }}>
                {floor.number} — {floor.mode}
              </div>
              <h3 className="font-display" style={{ fontSize: '1.5rem', color: '#F5F0E8', marginBottom: '1rem', lineHeight: 1.2 }}>
                {floor.name}
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(245,240,232,0.55)', marginBottom: '2rem' }}>
                {floor.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {floor.elements.map(el => (
                  <span
                    key={el}
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.6rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(245,240,232,0.35)',
                      border: '1px solid rgba(245,240,232,0.1)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '1px',
                    }}
                  >
                    {el}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a
            href="#walkthrough"
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              border: '1px solid rgba(245,240,232,0.3)',
              padding: '1rem 2rem',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#E63022'; e.target.style.color = '#E63022' }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(245,240,232,0.3)'; e.target.style.color = '#F5F0E8' }}
          >
            Walk through the building ↓
          </a>
        </div>
      </div>
    </section>
  )
}
