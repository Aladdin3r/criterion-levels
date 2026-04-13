import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const headingRef = useRef(null)
  const taglineRef = useRef(null)
  const introRef = useRef(null)

  useEffect(() => {
    // Set visible immediately as fallback, then animate in
    gsap.set([headingRef.current, taglineRef.current, introRef.current], { opacity: 1 })
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' })
      .fromTo(taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo(introRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
  }, [])

  return (
    <section
      id="hero"
      className="section relative flex flex-col justify-end"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.75 }}
        autoPlay
        muted
        loop
        playsInline
        src="/assets/photos/hero-video.mp4"
      />

      {/* Gradient overlay — lighter so the building shows, still readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.15) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 pb-20 md:px-16 lg:px-24 max-w-5xl">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/assets/logos/criterion-lockup-white.png"
            alt="The Criterion Levels"
            style={{ height: '48px', width: 'auto', opacity: 0.95 }}
          />
        </div>

        <h1
          ref={headingRef}
          className="font-display"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
        >
          Not all movies should be<br />
          <em>watched the same way.</em>
        </h1>

        <span className="divider-red" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }} />

        <p
          ref={taglineRef}
          className="font-mono"
          style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9FCFC2' }}
        >
          Downtown Vancouver · Del Mar Inn · Four Floors · One Film Culture
        </p>

        <p
          ref={introRef}
          style={{
            marginTop: '1.5rem',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.05rem',
            lineHeight: 1.75,
            color: 'rgba(245,240,232,0.9)',
            maxWidth: '520px',
          }}
        >
          A cinema hotel where each floor offers a different film-viewing experience —
          from social and chaotic to intimate and silent. This is not a normal theatre.
        </p>

        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a
            href="#space"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              border: '1px solid rgba(245,240,232,0.3)',
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#E63022'; e.target.style.color = '#E63022' }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(245,240,232,0.3)'; e.target.style.color = '#F5F0E8' }}
          >
            Explore the space
          </a>
          <a
            href="#about"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.45)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.color = '#F5F0E8' }}
            onMouseLeave={e => { e.target.style.color = 'rgba(245,240,232,0.45)' }}
          >
            About the brand ↓
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 right-8 z-10"
        style={{ fontFamily: 'JetBrains Mono', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.3)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}
      >
        Scroll to explore
      </div>
    </section>
  )
}
