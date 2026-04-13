const tech = [
  {
    id: '01',
    name: 'Building Projection',
    desc: 'Film scenes are projected onto the brick facade at night. The exterior becomes an entry point — the experience starts before you walk in.',
    detail: 'High-lumen outdoor projectors · Sync to screening schedule',
  },
  {
    id: '02',
    name: 'Criterion App',
    desc: 'Guests scan the app at the kiosk for access. The app shows what\'s screening on each floor, live comment feeds, and leaderboards.',
    detail: 'QR access · Live floor info · Comment system',
  },
  {
    id: '03',
    name: 'Wristband System',
    desc: 'Age-verified guests receive a wristband for bar access. RFID-enabled. Ties to the app account for seamless service at any floor.',
    detail: 'RFID · Age verification · Bar access token',
  },
  {
    id: '04',
    name: 'Leaderboards',
    desc: 'Film ratings, audience reactions, and screening attendance updated in real time on Floor 1 displays. The social layer of the cinema.',
    detail: 'Live data · Audience voting · Film rankings',
  },
  {
    id: '05',
    name: 'Comment Screens',
    desc: 'On Floor 3, in-app comments appear on side screens during screenings. The audience can talk without disturbing — a live layer over the film.',
    detail: 'App-integrated · Moderated · Floor 3 only',
  },
  {
    id: '06',
    name: 'Phone Lockbox',
    desc: 'Floor 4 entry requires placing your phone in a secure lockbox. It is returned when you leave. The silence is not a suggestion.',
    detail: 'Secure · Timed lock · Floor 4 mandatory',
  },
]

export default function TechLayer() {
  return (
    <section id="technology" className="section" style={{ background: '#111', padding: '8rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', alignItems: 'start', marginBottom: '5rem' }}>
          <div>
            <div className="floor-label" style={{ marginBottom: '1.5rem' }}>Technology Layer</div>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.1, color: '#F5F0E8', letterSpacing: '-0.02em' }}
            >
              The systems<br />
              behind the<br />
              <em style={{ color: '#7FA99B' }}>experience.</em>
            </h2>
          </div>
          <div style={{ paddingTop: '3rem' }}>
            <p style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.55)' }}>
              Each layer of technology is invisible when it works. The app, the wristband, the projections, and the lockboxes are not the point — they are the infrastructure that makes each floor's experience possible without friction.
            </p>
          </div>
        </div>

        {/* Tech grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(245,240,232,0.06)' }}>
          {tech.map(({ id, name, desc, detail }) => (
            <div
              key={id}
              style={{ background: '#111', padding: '2.5rem', transition: 'background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1A1A1A' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#111' }}
            >
              <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#E63022', marginBottom: '1.25rem' }}>
                {id}
              </div>
              <h3 className="font-display" style={{ fontSize: '1.1rem', color: '#F5F0E8', marginBottom: '0.75rem' }}>
                {name}
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(245,240,232,0.5)', marginBottom: '1.5rem' }}>
                {desc}
              </p>
              <div
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(127,169,155,0.6)',
                  textTransform: 'uppercase',
                  borderTop: '1px solid rgba(245,240,232,0.06)',
                  paddingTop: '1rem',
                }}
              >
                {detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
