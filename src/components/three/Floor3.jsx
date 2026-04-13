// Floor 3 — Cinema as Conversation
// Reference: LEFT HALF = theatre room with tiered cinema seats + glowing screen
//            RIGHT HALF = production studio with curved screen, cameras, drapes, mixing desk

// ── THEATRE ROOM (left half) ─────────────────────────────────────────────────
function TheatreSection() {
  const seatRows = 5
  const seatCols = 7
  const seatSpacingX = 1.05
  const seatSpacingZ = 1.0
  const totalW = (seatCols - 1) * seatSpacingX

  return (
    <group position={[-6, 0, 0]}>
      {/* Screen wall */}
      <mesh position={[0, 2.6, -7.8]}>
        <boxGeometry args={[11.5, 5.2, 0.12]} />
        <meshStandardMaterial color="#141414" roughness={0.92} />
      </mesh>

      {/* Glowing cinema screen */}
      <mesh position={[0, 2.5, -7.68]}>
        <planeGeometry args={[8.5, 3.8]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={2.8}
          roughness={0.05}
        />
      </mesh>
      <pointLight position={[0, 2.0, -5.5]} intensity={18} color="#E8F0FF" distance={12} decay={2} />
      <pointLight position={[0, 3.5, -6.0]} intensity={10} color="#D0DCFF" distance={10} decay={2} />

      {/* Screen frame */}
      <mesh position={[0, 2.5, -7.74]}>
        <boxGeometry args={[9.0, 4.3, 0.08]} />
        <meshStandardMaterial color="#060606" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Aisle runner — red velvet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -1.0]}>
        <planeGeometry args={[0.75, 12]} />
        <meshStandardMaterial color="#6B0F1A" roughness={0.97} />
      </mesh>

      {/* Cinema seating — 5 tiered rows */}
      {Array.from({ length: seatRows }).map((_, ri) => (
        <group key={ri} position={[0, ri * 0.20, -4.0 + ri * seatSpacingZ]}>
          {Array.from({ length: seatCols }).map((_, ci) => {
            const x = -totalW / 2 + ci * seatSpacingX
            return (
              <group key={ci} position={[x, 0, 0]}>
                {/* Seat cushion */}
                <mesh position={[0, 0.26, 0.12]}>
                  <boxGeometry args={[0.74, 0.11, 0.46]} />
                  <meshStandardMaterial color="#1E1E1E" roughness={0.92} />
                </mesh>
                {/* Seat back */}
                <mesh position={[0, 0.58, -0.10]}>
                  <boxGeometry args={[0.74, 0.58, 0.09]} />
                  <meshStandardMaterial color="#1E1E1E" roughness={0.92} />
                </mesh>
                {/* Red velvet accent */}
                <mesh position={[0, 0.22, 0.38]}>
                  <boxGeometry args={[0.74, 0.09, 0.04]} />
                  <meshStandardMaterial color="#6B0F1A" roughness={0.97} />
                </mesh>
                {/* Base frame */}
                <mesh position={[0, 0.12, 0]}>
                  <boxGeometry args={[0.76, 0.22, 0.50]} />
                  <meshStandardMaterial color="#181818" roughness={0.85} />
                </mesh>
                {/* Armrest */}
                <mesh position={[0.38, 0.36, 0.04]}>
                  <boxGeometry args={[0.04, 0.16, 0.46]} />
                  <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.60} />
                </mesh>
              </group>
            )
          })}
        </group>
      ))}

      {/* Side sconce lights */}
      <pointLight position={[-5.0, 1.6, -2]} intensity={3} color="#CC8833" distance={5} decay={2} />
      <pointLight position={[ 5.0, 1.6, -2]} intensity={3} color="#CC8833" distance={5} decay={2} />
      <pointLight position={[-5.0, 1.6,  2]} intensity={2} color="#CC8833" distance={4} decay={2} />
      <pointLight position={[ 5.0, 1.6,  2]} intensity={2} color="#CC8833" distance={4} decay={2} />
    </group>
  )
}

// ── PRODUCTION / STUDIO SECTION (right half) ─────────────────────────────────
function StudioSection() {
  return (
    <group position={[6, 0, 0]}>

      {/* Studio back wall — large curved/abstract screen */}
      <mesh position={[0, 2.6, -7.8]}>
        <boxGeometry args={[11.5, 5.2, 0.12]} />
        <meshStandardMaterial color="#141414" roughness={0.92} />
      </mesh>
      {/* Main curved screen — large emissive blue/teal */}
      <mesh position={[0, 2.7, -7.66]}>
        <planeGeometry args={[8.0, 4.5]} />
        <meshStandardMaterial
          color="#001A2E"
          emissive="#0033AA"
          emissiveIntensity={1.5}
          roughness={0.08}
        />
      </mesh>
      {/* Abstract eye/circle graphic overlay */}
      <mesh position={[0, 2.7, -7.62]}>
        <circleGeometry args={[1.4, 32]} />
        <meshStandardMaterial
          color="#004488"
          emissive="#0066CC"
          emissiveIntensity={2.0}
          roughness={0.05}
          transparent
          opacity={0.7}
        />
      </mesh>
      <pointLight position={[0, 2.5, -5.5]} intensity={10} color="#0055BB" distance={9} decay={2} />

      {/* Orange fabric drapes hanging from ceiling — 3 panels */}
      {[-2.8, 0, 2.8].map((x, i) => (
        <group key={i} position={[x, 0, -4.0]}>
          {/* Drape panel */}
          <mesh position={[0, 2.5, 0]} rotation={[0, (i - 1) * 0.12, 0]}>
            <boxGeometry args={[0.8, 5.0, 0.05]} />
            <meshStandardMaterial
              color="#CC5500"
              emissive="#662200"
              emissiveIntensity={0.3}
              roughness={0.95}
            />
          </mesh>
          {/* Drape clip at top */}
          <mesh position={[0, 5.05, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.12, 6]} />
            <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.7} />
          </mesh>
        </group>
      ))}
      <pointLight position={[0, 3.5, -4.0]} intensity={8} color="#FF6600" distance={7} decay={2} />

      {/* Overhead lighting rig bar */}
      <mesh position={[0, 4.8, -5.5]}>
        <boxGeometry args={[7.0, 0.10, 0.10]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.70} />
      </mesh>
      {/* Hanging spot lights on rig */}
      {[-2.5, -1.0, 0, 1.0, 2.5].map((x, i) => (
        <group key={i} position={[x, 4.35, -5.5]}>
          {/* Drop cable */}
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.44, 4]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.5} />
          </mesh>
          {/* Light cone body */}
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[0.14, 0.28, 8]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Emissive bulb */}
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 8]} />
            <meshStandardMaterial color="#FFD4A0" emissive="#FFD4A0" emissiveIntensity={2.0} />
          </mesh>
        </group>
      ))}

      {/* Tripod cameras — 3 units */}
      {[
        { x: -3.5, z: -1.5, rot: 0.3  },
        { x:  0,   z:  0.5, rot: -0.1 },
        { x:  3.2, z: -2.0, rot: -0.4 },
      ].map((cam, i) => (
        <group key={i} position={[cam.x, 0, cam.z]} rotation={[0, cam.rot, 0]}>
          {/* Tripod legs */}
          {[-0.28, 0, 0.28].map((lx, li) => (
            <mesh key={li} position={[lx, 0.65, li === 1 ? -0.28 : 0.12]}
              rotation={[li === 1 ? 0.25 : -0.15, 0, lx === 0 ? 0 : lx > 0 ? 0.18 : -0.18]}>
              <boxGeometry args={[0.03, 1.3, 0.03]} />
              <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.5} />
            </mesh>
          ))}
          {/* Camera body */}
          <mesh position={[0, 1.45, 0]}>
            <boxGeometry args={[0.28, 0.20, 0.40]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.5} metalness={0.4} />
          </mesh>
          {/* Lens */}
          <mesh position={[0, 1.45, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.10, 0.30, 12]} />
            <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Viewfinder */}
          <mesh position={[0, 1.60, 0.12]}>
            <boxGeometry args={[0.10, 0.08, 0.16]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Mixing desk / control station */}
      <group position={[0, 0, 3.5]}>
        {/* Desk body — wide and low */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[3.0, 0.9, 1.2]} />
          <meshStandardMaterial color="#0F0C08" roughness={0.80} metalness={0.02} />
        </mesh>
        {/* Desk top surface — angled mixing board style */}
        <mesh position={[0, 0.92, 0.1]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[2.9, 0.06, 1.0]} />
          <meshStandardMaterial color="#1A1612" roughness={0.35} metalness={0.15} />
        </mesh>
        {/* Multiple small monitor screens on desk */}
        {[-0.9, 0, 0.9].map((x, i) => (
          <mesh key={i} position={[x, 1.28, -0.28]}>
            <planeGeometry args={[0.72, 0.46]} />
            <meshStandardMaterial
              color="#001020"
              emissive={['#002244', '#003333', '#220044'][i]}
              emissiveIntensity={1.2}
              roughness={0.05}
            />
          </mesh>
        ))}
        {/* Fader / knob strip suggestion */}
        {[-1.0, -0.5, 0, 0.5, 1.0].map((x, i) => (
          <mesh key={i} position={[x, 0.96, 0.25]}>
            <cylinderGeometry args={[0.05, 0.05, 0.06, 8]} />
            <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.7} />
          </mesh>
        ))}
        {/* Desk front amber glow strip */}
        <mesh position={[0, 0.06, 0.62]}>
          <boxGeometry args={[3.0, 0.03, 0.04]} />
          <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={1.2} />
        </mesh>
        <pointLight position={[0, 1.5, 3.2]} intensity={5} color="#CC8833" distance={5} decay={2} />
      </group>

      {/* Additional monitor stack — equipment corner */}
      <group position={[4.5, 0, 1.5]}>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.9, 1.2, 0.5]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.5} metalness={0.3} />
        </mesh>
        {[0.3, 0.7, 1.1].map((y, i) => (
          <mesh key={i} position={[0, y, 0.27]}>
            <planeGeometry args={[0.72, 0.28]} />
            <meshStandardMaterial
              color="#001020"
              emissive={['#001A44', '#002233', '#001A22'][i]}
              emissiveIntensity={1.0}
              roughness={0.05}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function Floor3() {
  return (
    <group position={[0, 0, 0]}>

      {/* ── LIGHTING ─────────────────────────────────────────────────── */}
      <ambientLight intensity={0.28} color="#100A05" />

      {/* Theatre side downlights */}
      <pointLight position={[-9, 4.8, -2]} intensity={6} color="#FFD4A0" distance={7} decay={2} />
      <pointLight position={[-6, 4.8,  2]} intensity={5} color="#FFD4A0" distance={6} decay={2} />
      <pointLight position={[-3, 4.8, -1]} intensity={5} color="#FFD4A0" distance={6} decay={2} />

      {/* Studio side overhead */}
      <pointLight position={[3, 4.8, -2]} intensity={5} color="#FFD4A0" distance={6} decay={2} />
      <pointLight position={[7, 4.8,  2]} intensity={5} color="#FFCC88" distance={6} decay={2} />
      <pointLight position={[9, 4.8, -1]} intensity={4} color="#FFCC88" distance={6} decay={2} />

      {/* ── SHELL ────────────────────────────────────────────────────── */}
      {/* Polished floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#0E0E0E" roughness={0.22} metalness={0.08} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.2, 0]}>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#111111" roughness={1} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-12, 2.6, 0]}>
        <boxGeometry args={[0.12, 5.2, 16]} />
        <meshStandardMaterial color="#181818" roughness={0.90} />
      </mesh>

      {/* Right wall */}
      <mesh position={[12, 2.6, 0]}>
        <boxGeometry args={[0.12, 5.2, 16]} />
        <meshStandardMaterial color="#181818" roughness={0.90} />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, 2.6, 8]}>
        <boxGeometry args={[24, 5.2, 0.12]} />
        <meshStandardMaterial color="#141414" roughness={0.92} />
      </mesh>

      {/* ── LED STRIPS ───────────────────────────────────────────────── */}
      <mesh position={[-11.9, 0.02, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.6]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[11.9, 0.02, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.6]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[-11.9, 5.18, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.6]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[11.9, 5.18, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.6]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.02, -7.9]}>
        <boxGeometry args={[23.6, 0.04, 0.06]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={1.0} />
      </mesh>

      {/* ── DIVIDING WALL — CENTRE PARTITION ────────────────────────── */}
      <mesh position={[0, 2.5, -2]}>
        <boxGeometry args={[0.20, 5.0, 12.0]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.88} />
      </mesh>
      {/* Partition amber strip — both sides */}
      <mesh position={[-0.11, 0.02, -2]}>
        <boxGeometry args={[0.04, 0.04, 11.8]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.11, 0.02, -2]}>
        <boxGeometry args={[0.04, 0.04, 11.8]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.8} />
      </mesh>

      {/* ── THEATRE SECTION (left half) ─────────────────────────────── */}
      <TheatreSection />

      {/* ── STUDIO SECTION (right half) ─────────────────────────────── */}
      <StudioSection />

      {/* ── STAIRCASE — FAR RIGHT ────────────────────────────────────── */}
      <group position={[10, 0, 5]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(step => (
          <mesh key={step} position={[0, step * 0.32 + 0.16, -step * 0.45]} castShadow>
            <boxGeometry args={[2.5, 0.32, 0.46]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.85} />
          </mesh>
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(step => (
          <mesh key={`s${step}`} position={[0, step * 0.32 + 0.32, -step * 0.45 + 0.23]}>
            <boxGeometry args={[2.5, 0.03, 0.03]} />
            <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.8} />
          </mesh>
        ))}
        <mesh position={[1.25, 1.6, -1.8]} rotation={[0.5, 0, 0]}>
          <boxGeometry args={[0.04, 0.04, 5.2]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.70} />
        </mesh>
        {[0, 1, 2, 3].map(p => (
          <mesh key={p} position={[1.25, 0.6 + p * 0.6, -p * 0.9]}>
            <boxGeometry args={[0.04, 1.2, 0.04]} />
            <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.70} />
          </mesh>
        ))}
      </group>

    </group>
  )
}
