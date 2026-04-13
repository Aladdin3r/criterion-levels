export default function Location() {
  const photos = [
    { src: '/assets/photos/exterior-full.jpg', label: 'Del Mar Inn · 553 · Downtown Vancouver', span: 2 },
    { src: '/assets/photos/roofline.jpg', label: 'Copper patina roofline', span: 1 },
    { src: '/assets/photos/facade-front.jpg', label: 'Original facade', span: 1 },
    { src: '/assets/photos/exterior-wide.jpg', label: 'Street view', span: 2 },
  ]

  return (
    <section id="location" className="section" style={{ background: '#111', padding: '8rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start', marginBottom: '5rem' }}>
          <div>
            <div className="floor-label" style={{ marginBottom: '2rem' }}>Location</div>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, color: '#F5F0E8', letterSpacing: '-0.02em' }}
            >
              A vintage shell<br />
              for a new<br />
              <em style={{ color: '#7FA99B' }}>cinema experience.</em>
            </h2>
          </div>

          <div style={{ paddingTop: '4rem' }}>
            <span className="divider-red" />
            <p style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', marginBottom: '1.5rem' }}>
              The Del Mar Inn sits at 553 in downtown Vancouver — four storeys of dark warm brick, ornate cornice detailing, and a green oxidized copper roof. Currently operating as the Gaslight building.
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', marginBottom: '1.5rem' }}>
              The original vintage exterior is preserved. Only light branding changes are added — the Criterion logo replaces the existing signage. At night, the building becomes something else entirely: projected film scenes wash over the brick facade, turning the street into an antechamber for what's inside.
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)' }}>
              Its architecture already carries nostalgia. That's what makes it the perfect host for a cinema experience rooted in film history and atmosphere.
            </p>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem' }}>
              {[
                { label: 'Address', value: '553 · Vancouver, BC' },
                { label: 'Floors', value: '4' },
                { label: 'Built', value: 'Early 1900s' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#7FA99B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{label}</div>
                  <div className="font-display" style={{ fontSize: '1.1rem', color: '#F5F0E8' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {photos.map(({ src, label, span }) => (
            <div
              key={src}
              style={{
                gridColumn: `span ${span}`,
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: span === 2 ? '16/7' : '4/5',
                background: '#1A1A1A',
              }}
            >
              <img
                src={src}
                alt={label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85) contrast(1.05)' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem',
                  background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 100%)',
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(245,240,232,0.5)', textTransform: 'uppercase' }}>
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
