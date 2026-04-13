// Floor 4 — Cinema as Ritual
// Reference: large boxy private screening pod rooms (left), equipment server rack (centre),
// elevator doors (right), sparse open floor, near-total darkness

export default function Floor4() {

  // Large pod rooms — 4 arranged on left side
  const pods = [
    { x: -9,   z: -2 },
    { x: -5,   z: -2 },
    { x: -9,   z:  2.5 },
    { x: -5,   z:  2.5 },
  ]

  return (
    <group position={[0, 0, 0]}>

      {/* ── LIGHTING ─────────────────────────────────────────────────── */}
      {/* Near-zero ambient — only pod screens and spotlights */}
      <ambientLight intensity={2.0} color="#FFFFFF" />
      <directionalLight position={[0, 8, 4]} intensity={1.8} color="#FFF8F0" />

      {/* Tight theatrical spotlight per pod — from ceiling */}
      {pods.map((pod, i) => (
        <spotLight
          key={i}
          position={[pod.x, 5.6, pod.z]}
          angle={0.22}
          penumbra={0.30}
          intensity={80}
          color="#FFF0E0"
          distance={13}
          decay={2}
         
        />
      ))}

      {/* Equipment rack cool fill */}
      <pointLight position={[2, 3, -2]} intensity={5} color="#6688BB" distance={7} decay={2} />

      {/* Elevator area fill */}
      <pointLight position={[8, 3, -5]} intensity={4} color="#8899BB" distance={6} decay={2} />

      {/* Open area faint fill */}
      <pointLight position={[5, 4, 3]} intensity={3} color="#FFD4A0" distance={6} decay={2} />

      {/* ── SHELL ────────────────────────────────────────────────────── */}
      {/* Matte black floor — no reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#3A3028" roughness={0.98} metalness={0.0} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5.8, 0]}>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#2E2820" roughness={1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.9, -8]}>
        <boxGeometry args={[24, 5.8, 0.12]} />
        <meshStandardMaterial color="#3A3028" roughness={1} metalness={0} />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, 2.9, 8]}>
        <boxGeometry args={[24, 5.8, 0.12]} />
        <meshStandardMaterial color="#3A3028" roughness={1} metalness={0} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-12, 2.9, 0]}>
        <boxGeometry args={[0.12, 5.8, 16]} />
        <meshStandardMaterial color="#3A3028" roughness={1} metalness={0} />
      </mesh>

      {/* Right wall */}
      <mesh position={[12, 2.9, 0]}>
        <boxGeometry args={[0.12, 5.8, 16]} />
        <meshStandardMaterial color="#3A3028" roughness={1} metalness={0} />
      </mesh>

      {/* ── PRIVATE SCREENING POD ROOMS — LEFT SIDE ─────────────────── */}
      {/* Each pod is a large full-room box visible from outside */}
      {pods.map((pod, i) => (
        <group key={i} position={[pod.x, 0, pod.z]}>

          {/* Pod box — outer shell walls (visible sides) */}
          {/* Back wall */}
          <mesh position={[0, 2.25, -2.1]}>
            <boxGeometry args={[3.5, 4.5, 0.12]} />
            <meshStandardMaterial color="#3A3028" roughness={0.95} metalness={0} />
          </mesh>
          {/* Left side wall */}
          <mesh position={[-1.75, 2.25, 0]}>
            <boxGeometry args={[0.12, 4.5, 4.2]} />
            <meshStandardMaterial color="#3A3028" roughness={0.95} metalness={0} />
          </mesh>
          {/* Right side wall */}
          <mesh position={[1.75, 2.25, 0]}>
            <boxGeometry args={[0.12, 4.5, 4.2]} />
            <meshStandardMaterial color="#3A3028" roughness={0.95} metalness={0} />
          </mesh>
          {/* Roof/ceiling of pod */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.5, 0]}>
            <planeGeometry args={[3.5, 4.2]} />
            <meshStandardMaterial color="#2E2820" roughness={1} />
          </mesh>
          {/* Front face — partial wall with opening */}
          {/* Left door jamb */}
          <mesh position={[-1.1, 2.25, 2.1]}>
            <boxGeometry args={[1.3, 4.5, 0.10]} />
            <meshStandardMaterial color="#3A3028" roughness={0.95} />
          </mesh>
          {/* Right door jamb */}
          <mesh position={[1.1, 2.25, 2.1]}>
            <boxGeometry args={[1.3, 4.5, 0.10]} />
            <meshStandardMaterial color="#3A3028" roughness={0.95} />
          </mesh>
          {/* Transom above doorway */}
          <mesh position={[0, 4.1, 2.1]}>
            <boxGeometry args={[3.5, 0.8, 0.10]} />
            <meshStandardMaterial color="#3A3028" roughness={0.95} />
          </mesh>

          {/* Pod floor LED base strip — front */}
          <mesh position={[0, 0.02, 2.05]}>
            <boxGeometry args={[3.4, 0.03, 0.04]} />
            <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.35} />
          </mesh>
          {/* Side floor strips */}
          <mesh position={[-1.72, 0.02, 0]}>
            <boxGeometry args={[0.04, 0.03, 4.1]} />
            <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[1.72, 0.02, 0]}>
            <boxGeometry args={[0.04, 0.03, 4.1]} />
            <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.25} />
          </mesh>

          {/* Pod interior — screen on back wall */}
          <mesh position={[0, 2.0, -1.94]}>
            <planeGeometry args={[2.4, 1.6]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#FFFFFF"
              emissiveIntensity={1.8}
              roughness={0.05}
            />
          </mesh>
          {/* Screen frame */}
          <mesh position={[0, 2.0, -1.98]}>
            <boxGeometry args={[2.62, 1.82, 0.06]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.6} metalness={0.2} />
          </mesh>
          {/* Screen glow fill */}
          <pointLight
            position={[0, 1.8, -1.2]}
            intensity={5}
            color="#E8F0FF"
            distance={4}
            decay={2}
          />

          {/* Label strip above screen */}
          <mesh position={[0, 3.0, -1.95]}>
            <boxGeometry args={[1.4, 0.12, 0.04]} />
            <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.6} roughness={0.1} />
          </mesh>

          {/* Interior seating — simple chair */}
          <mesh position={[0, 0.46, 0.6]}>
            <boxGeometry args={[1.6, 0.06, 0.70]} />
            <meshStandardMaterial color="#4A4035" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.78, 0.26]}>
            <boxGeometry args={[1.6, 0.64, 0.08]} />
            <meshStandardMaterial color="#4A4035" roughness={0.85} />
          </mesh>
          {/* Chair red velvet accent */}
          <mesh position={[0, 0.50, 0.96]}>
            <boxGeometry args={[1.6, 0.10, 0.04]} />
            <meshStandardMaterial color="#6B0F1A" roughness={0.97} />
          </mesh>
        </group>
      ))}

      {/* ── EQUIPMENT SERVER RACK — CENTRE ───────────────────────────── */}
      <group position={[2, 0, -2]}>
        {/* Rack housing — tall narrow box */}
        <mesh position={[0, 2.25, 0]}>
          <boxGeometry args={[1.5, 4.5, 0.8]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.55} metalness={0.40} />
        </mesh>
        {/* Rack trim — top/bottom */}
        <mesh position={[0, 4.52, 0]}>
          <boxGeometry args={[1.55, 0.06, 0.85]} />
          <meshStandardMaterial color="#3A3028" roughness={0.30} metalness={0.60} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[1.55, 0.06, 0.85]} />
          <meshStandardMaterial color="#3A3028" roughness={0.30} metalness={0.60} />
        </mesh>
        {/* Server rack panel slots — grid of emissive units */}
        {Array.from({ length: 8 }).map((_, row) =>
          [0].map((_, col) => (
            <group key={`${row}-${col}`} position={[0, 0.55 + row * 0.48, 0.42]}>
              {/* Slot bezel */}
              <mesh>
                <boxGeometry args={[1.30, 0.38, 0.05]} />
                <meshStandardMaterial color="#3A3028" roughness={0.30} metalness={0.60} />
              </mesh>
              {/* Status screen */}
              <mesh position={[-0.35, 0, 0.04]}>
                <planeGeometry args={[0.52, 0.26]} />
                <meshStandardMaterial
                  color="#001A33"
                  emissive={row % 2 === 0 ? '#001A44' : '#003322'}
                  emissiveIntensity={0.85}
                  roughness={0.05}
                />
              </mesh>
              {/* LED status indicators */}
              {[0, 1, 2].map(li => (
                <mesh key={li} position={[0.30 + li * 0.14, 0.06, 0.04]}>
                  <boxGeometry args={[0.08, 0.06, 0.02]} />
                  <meshStandardMaterial
                    color={li === 0 ? '#00FF44' : li === 1 ? '#FF8800' : '#0044FF'}
                    emissive={li === 0 ? '#00FF44' : li === 1 ? '#FF8800' : '#0044FF'}
                    emissiveIntensity={1.5}
                    roughness={0.05}
                  />
                </mesh>
              ))}
            </group>
          ))
        )}
        <pointLight position={[0, 2.5, 1.5]} intensity={4} color="#0055AA" distance={4} decay={2} />
      </group>

      {/* Second smaller equipment rack */}
      <group position={[3.8, 0, -2]}>
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[0.9, 3.2, 0.7]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.55} metalness={0.40} />
        </mesh>
        {Array.from({ length: 5 }).map((_, row) => (
          <mesh key={row} position={[0, 0.45 + row * 0.52, 0.37]}>
            <planeGeometry args={[0.72, 0.38]} />
            <meshStandardMaterial
              color="#001A33"
              emissive="#001A44"
              emissiveIntensity={0.7}
              roughness={0.05}
            />
          </mesh>
        ))}
      </group>

      {/* ── OPEN RIGHT AREA — STANDING FIGURES ──────────────────────── */}
      {[
        { x: 6,   z: 1   },
        { x: 7.5, z: -1  },
        { x: 5.5, z: 3   },
      ].map((fig, i) => (
        <group key={i} position={[fig.x, 0, fig.z]}>
          <mesh position={[0, 0.9, 0]}>
            <boxGeometry args={[0.36, 1.6, 0.20]} />
            <meshStandardMaterial color="#4A4035" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.88, 0]}>
            <sphereGeometry args={[0.17, 8, 8]} />
            <meshStandardMaterial color="#8B6A50" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ── ELEVATOR SHAFTS ×2 — RIGHT SIDE ─────────────────────────── */}
      {[-1, 1].map((x, i) => (
        <group key={i} position={[x * 1.5 + 9, 0, -5.5]}>
          {/* Shaft box */}
          <mesh position={[0, 2.9, 0]}>
            <boxGeometry args={[1.4, 5.8, 1.4]} />
            <meshStandardMaterial color="#2E2820" roughness={0.70} metalness={0.30} />
          </mesh>
          {/* Door surface */}
          <mesh position={[0, 2.9, 0.72]}>
            <planeGeometry args={[1.2, 5.4]} />
            <meshStandardMaterial color="#0A0A10" roughness={0.20} metalness={0.55} />
          </mesh>
          {/* Door gap centre line */}
          <mesh position={[0, 2.9, 0.73]}>
            <boxGeometry args={[0.02, 5.0, 0.01]} />
            <meshStandardMaterial color="#4A4035" roughness={0.5} />
          </mesh>
          {/* Floor indicator display */}
          <mesh position={[0.35, 4.6, 0.74]}>
            <planeGeometry args={[0.28, 0.14]} />
            <meshStandardMaterial
              color="#001A33"
              emissive="#001A33"
              emissiveIntensity={0.70}
              roughness={0.05}
            />
          </mesh>
          {/* Call button */}
          <mesh position={[0.72, 2.8, 0.74]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 10]} />
            <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* ── STAIRCASE — FAR RIGHT ────────────────────────────────────── */}
      <group position={[10, 0, 5]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(step => (
          <mesh key={step} position={[0, step * 0.32 + 0.16, -step * 0.45]}>
            <boxGeometry args={[2.5, 0.32, 0.46]} />
            <meshStandardMaterial color="#4A4035" roughness={0.85} />
          </mesh>
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(step => (
          <mesh key={`s${step}`} position={[0, step * 0.32 + 0.32, -step * 0.45 + 0.23]}>
            <boxGeometry args={[2.5, 0.03, 0.03]} />
            <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.7} />
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
