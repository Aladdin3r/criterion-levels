const steps = [
  {
    phase: 'Arrival',
    icon: '◎',
    title: 'Approach the building',
    detail: 'Night projection of film scenes on the brick facade. The Criterion Levels sign glows where GASLIGHT once was. The street is already part of the experience.',
  },
  {
    phase: 'Entry',
    icon: '▢',
    title: 'Check in at Floor 1',
    detail: 'Scan the app for access. Age verification for 19+ guests. Receive a wristband for bar access if approved. Receive a physical ticket — a collectible takeaway.',
  },
  {
    phase: 'Pre-film',
    icon: '◈',
    title: 'Explore the lobby',
    detail: 'Browse the merch wall. Check leaderboards. See what\'s screening on each floor. Spend time in the lounge or standing bar area. Choose your level.',
  },
  {
    phase: 'Transition',
    icon: '▲',
    title: 'Take the elevator',
    detail: 'Each floor has its own energy. The elevator is the only thing they share. The further up you go, the quieter it gets.',
  },
  {
    phase: 'Screening',
    icon: '●',
    title: 'Your screening experience',
    detail: 'Floor 2: crowd energy, spectacle, noise. Floor 3: intimate rooms, live commentary, conversation. Floor 4: silence, ritual, your film, your room.',
  },
]

export default function ExperienceMap() {
  return (
    <section id="experience" className="section" style={{ background: '#111', padding: '8rem 0' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>

        <div style={{ marginBottom: '5rem' }}>
          <div className="floor-label" style={{ marginBottom: '1.5rem' }}>Visitor Journey</div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, color: '#F5F0E8', letterSpacing: '-0.02em' }}
          >
            From arrival<br />
            <em style={{ color: '#7FA99B' }}>to screening.</em>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '1.5rem', top: 0, bottom: 0, width: '1px', background: 'rgba(245,240,232,0.08)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {steps.map((step, i) => (
              <div
                key={step.phase}
                style={{ display: 'flex', gap: '3rem', paddingBottom: '3.5rem', paddingLeft: '0' }}
              >
                {/* Icon + line dot */}
                <div style={{ position: 'relative', flexShrink: 0, width: '3rem', display: 'flex', justifyContent: 'center' }}>
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      background: '#0A0A0A',
                      border: '1px solid rgba(245,240,232,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.9rem',
                      color: '#7FA99B',
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div style={{ paddingTop: '0.5rem', flex: 1 }}>
                  <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#E63022', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {String(i + 1).padStart(2, '0')} · {step.phase}
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.2rem', color: '#F5F0E8', marginBottom: '0.75rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(245,240,232,0.5)' }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
