export default function AboutBrand() {
  return (
    <section id="about" className="section" style={{ background: '#0A0A0A', padding: '8rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Section label */}
        <div className="floor-label" style={{ marginBottom: '3rem' }}>About the Brand</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>

          {/* Left — heading */}
          <div>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, color: '#F5F0E8', letterSpacing: '-0.02em' }}
            >
              A home for<br />
              <em style={{ color: '#7FA99B' }}>film culture.</em>
            </h2>
            <span className="divider-red" />
            <p style={{ fontFamily: 'Inter', fontSize: '1rem', lineHeight: 1.8, color: 'rgba(245,240,232,0.65)', marginTop: '1.5rem', maxWidth: '400px' }}>
              Criterion Level 4 transforms the values of The Criterion Collection into space. Rather than treating every screening the same, the experience offers multiple ways to engage with film.
            </p>

            <div style={{ marginTop: '2.5rem' }}>
              <img
                src="/assets/logos/criterion-mark-white.png"
                alt="Criterion mark"
                style={{ height: '56px', width: 'auto', opacity: 0.15 }}
              />
            </div>
          </div>

          {/* Right — three pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              {
                number: '01',
                title: 'Thoughtful Curation',
                body: 'Criterion is known for selecting films that matter — not by popularity, but by cultural weight, artistic vision, and lasting significance.',
              },
              {
                number: '02',
                title: 'Quality & Preservation',
                body: "The brand's identity is rooted in treating film as an art form worthy of care. Every restoration, every edition, every space is intentional.",
              },
              {
                number: '03',
                title: 'Intentional Viewing',
                body: 'Their audience includes cinephiles, creatives, and anyone who believes film deserves more than passive consumption. This space was built for them.',
              },
            ].map(({ number, title, body }) => (
              <div
                key={number}
                style={{ display: 'flex', gap: '1.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(245,240,232,0.06)' }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: '0.65rem', color: '#E63022', letterSpacing: '0.1em', marginTop: '0.25rem', flexShrink: 0 }}
                >
                  {number}
                </span>
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.1rem', color: '#F5F0E8', marginBottom: '0.6rem' }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(245,240,232,0.5)' }}>
                    {body}
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
