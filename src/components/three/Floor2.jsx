// Floor 2 — Cinema as Spectacle
// Reference: large video wall left side, central bar counter, open event floor,
// colorful art poster panels on left wall, wraparound screen back right

// Wall sconce light fixture
function Sconce({ position, side = 1 }) {
  return (
    <group position={position}>
      <mesh rotation={[0, side * Math.PI / 2, 0]}>
        <boxGeometry args={[0.08, 0.24, 0.20]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.70} />
      </mesh>
      <mesh position={[side * -0.05, 0, 0]} rotation={[0, side * Math.PI / 2, 0]}>
        <planeGeometry args={[0.16, 0.16]} />
        <meshStandardMaterial color="#FFD4A0" emissive="#FFD4A0" emissiveIntensity={2.5} roughness={0.1} />
      </mesh>
      <pointLight position={[side * -0.3, 0, 0]} intensity={5} color="#CC8833" distance={5} decay={2} />
    </group>
  )
}

export default function Floor2() {
  return (
    <group position={[0, 0, 0]}>

      {/* ── LIGHTING ─────────────────────────────────────────────────── */}
      <ambientLight intensity={0.25} color="#100808" />

      {/* Video wall glow — cool blue-white fill */}
      <pointLight position={[-7, 2.5, -2]} intensity={30} color="#C0D8FF" distance={16} decay={2} />
      <pointLight position={[-7, 1.0, -1]} intensity={15} color="#A0C0FF" distance={12} decay={2} />

      {/* Bar area warm fill */}
      <pointLight position={[0, 3.0, 1]}  intensity={18} color="#FFD4A0" distance={11} decay={2} />
      <pointLight position={[3, 3.0, -1]} intensity={12} color="#FFCC88" distance={10} decay={2} />

      {/* Open event area */}
      <pointLight position={[6, 4.0, 3]}  intensity={12} color="#FFD4A0" distance={10} decay={2} />

      {/* Right wall screen glow */}
      <pointLight position={[9, 2.5, -5]} intensity={18} color="#E8F0FF" distance={11} decay={2} />

      {/* Side wall sconces */}
      <pointLight position={[-10.5, 1.8, -2]} intensity={8} color="#CC8833" distance={7} decay={2} />
      <pointLight position={[-10.5, 1.8,  3]} intensity={8} color="#CC8833" distance={7} decay={2} />
      <pointLight position={[ 10.5, 1.8, -2]} intensity={8} color="#CC8833" distance={7} decay={2} />
      <pointLight position={[ 10.5, 1.8,  3]} intensity={8} color="#CC8833" distance={7} decay={2} />

      {/* ── SHELL ────────────────────────────────────────────────────── */}
      {/* Polished dark floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#0E0E0E" roughness={0.22} metalness={0.08} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6.0, 0]}>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#111111" roughness={1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3.0, -8]}>
        <boxGeometry args={[24, 6, 0.12]} />
        <meshStandardMaterial color="#141414" roughness={0.92} />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, 3.0, 8]}>
        <boxGeometry args={[24, 6, 0.12]} />
        <meshStandardMaterial color="#181818" roughness={0.90} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-12, 3.0, 0]}>
        <boxGeometry args={[0.12, 6, 16]} />
        <meshStandardMaterial color="#181818" roughness={0.90} />
      </mesh>

      {/* Right wall */}
      <mesh position={[12, 3.0, 0]}>
        <boxGeometry args={[0.12, 6, 16]} />
        <meshStandardMaterial color="#181818" roughness={0.90} />
      </mesh>

      {/* ── LED STRIPS ───────────────────────────────────────────────── */}
      <mesh position={[-11.9, 0.02, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.6]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[11.9, 0.02, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.6]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-11.9, 5.93, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.6]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[11.9, 5.93, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.6]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 5.93, -7.9]}>
        <boxGeometry args={[23.6, 0.04, 0.06]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.6} />
      </mesh>

      {/* ── ART POSTER PANELS — FAR LEFT WALL ───────────────────────── */}
      {[
        { z: -5.0, color: '#0A0418', emissive: '#220044' },
        { z: -1.5, color: '#180A02', emissive: '#441100' },
        { z:  2.0, color: '#021408', emissive: '#103308' },
      ].map((panel, i) => (
        <group key={i} position={[-11.82, 0, panel.z]}>
          {/* Frame */}
          <mesh position={[0, 2.8, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[3.0, 4.5, 0.08]} />
            <meshStandardMaterial color="#1A1612" roughness={0.6} metalness={0.1} />
          </mesh>
          {/* Poster image */}
          <mesh position={[0.05, 2.8, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[2.7, 4.1]} />
            <meshStandardMaterial
              color={panel.color}
              emissive={panel.emissive}
              emissiveIntensity={0.55}
              roughness={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* ── LARGE VIDEO WALL — LEFT SIDE, 4×3 GRID ─────────────────── */}
      {/* Video wall backing structure */}
      <mesh position={[-7, 2.8, -5.8]}>
        <boxGeometry args={[5.2, 4.0, 0.18]} />
        <meshStandardMaterial color="#080808" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* 4 columns × 3 rows of screen panels */}
      {[0, 1, 2, 3].map(col =>
        [0, 1, 2].map(row => (
          <mesh
            key={`${col}-${row}`}
            position={[
              -7 + (col - 1.5) * 1.22,
              1.5 + row * 1.15,
              -5.68,
            ]}
          >
            <planeGeometry args={[1.10, 1.02]} />
            <meshStandardMaterial
              color={[
                '#FFFFFF', '#E8F0FF', '#F0E8FF', '#E8FFE8',
                '#FFE8E8', '#FFFFFF', '#E8F8FF', '#F8FFE8',
                '#FFFFFF', '#F0F0FF', '#FFE8F0', '#E8FFF0',
              ][col + row * 4] || '#FFFFFF'}
              emissive={[
                '#FFFFFF', '#D0E4FF', '#E0D0FF', '#D0FFD0',
                '#FFD0D0', '#FFFFFF', '#D0F0FF', '#F0FFD0',
                '#FFFFFF', '#E0E0FF', '#FFD0E4', '#D0FFE8',
              ][col + row * 4] || '#FFFFFF'}
              emissiveIntensity={2.2}
              roughness={0.05}
            />
          </mesh>
        ))
      )}
      {/* Thin bezels between panels */}
      {[0, 1, 2].map(col => (
        <mesh key={`bv${col}`} position={[-7 + (col - 1) * 1.22 + 0.61, 2.8, -5.67]}>
          <boxGeometry args={[0.04, 3.8, 0.02]} />
          <meshStandardMaterial color="#050505" roughness={0.5} />
        </mesh>
      ))}
      {[0, 1].map(row => (
        <mesh key={`bh${row}`} position={[-7, 1.5 + row * 1.15 + 0.575, -5.67]}>
          <boxGeometry args={[4.88, 0.04, 0.02]} />
          <meshStandardMaterial color="#050505" roughness={0.5} />
        </mesh>
      ))}

      {/* ── BAR COUNTER — CENTER, MARBLE TOP ────────────────────────── */}
      <group position={[0, 0, 1.0]}>
        {/* Counter body */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[6.5, 1.1, 1.2]} />
          <meshStandardMaterial color="#0F0C08" roughness={0.80} metalness={0.02} />
        </mesh>
        {/* Counter top — marble-look light stone */}
        <mesh position={[0, 1.12, 0]}>
          <boxGeometry args={[6.6, 0.06, 1.3]} />
          <meshStandardMaterial color="#C8B89A" roughness={0.22} metalness={0.05} />
        </mesh>
        {/* Bar front amber glow strip */}
        <mesh position={[0, 0.08, 0.62]}>
          <boxGeometry args={[6.5, 0.04, 0.04]} />
          <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={1.5} />
        </mesh>
        {/* Back bar panel */}
        <mesh position={[0, 2.2, -0.62]}>
          <boxGeometry args={[6.5, 3.0, 0.08]} />
          <meshStandardMaterial color="#111111" roughness={0.9} />
        </mesh>
        {/* Back bar shelf */}
        <mesh position={[0, 1.8, -0.58]}>
          <boxGeometry args={[6.3, 0.05, 0.3]} />
          <meshStandardMaterial color="#1A1612" roughness={0.5} />
        </mesh>
        {/* Backlit shelf glow */}
        <mesh position={[0, 1.85, -0.56]}>
          <planeGeometry args={[6.2, 0.28]} />
          <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.4} roughness={1} />
        </mesh>
        {/* Bottles on shelf */}
        {[-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4].map((x, i) => (
          <mesh key={i} position={[x, 2.15, -0.58]}>
            <cylinderGeometry args={[0.045, 0.045, 0.52, 8]} />
            <meshStandardMaterial
              color={['#1A2C18', '#2A1808', '#1A1A0A', '#0E1A22', '#1A0A14', '#0A1818', '#18180A'][i]}
              roughness={0.25} metalness={0.12} transparent opacity={0.82}
            />
          </mesh>
        ))}
        {/* Bar stools — 6 stools, red velvet seats */}
        {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x, i) => (
          <group key={i} position={[x, 0, 1.05]}>
            {/* Seat */}
            <mesh position={[0, 0.72, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.07, 12]} />
              <meshStandardMaterial color="#4A0A10" roughness={0.97} />
            </mesh>
            {/* Stool post */}
            <mesh position={[0, 0.36, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.72, 8]} />
              <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.70} />
            </mesh>
            {/* Footrest ring */}
            <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.14, 0.015, 6, 12]} />
              <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.70} />
            </mesh>
          </group>
        ))}
        <pointLight position={[0, 1.5, 0]} intensity={6} color="#CC8833" distance={5} decay={2} />
      </group>

      {/* ── OPEN EVENT / SCREENING AREA — CENTER-RIGHT ───────────────── */}
      {/* Floor highlight strip for event zone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, 0.01, 1]}>
        <planeGeometry args={[6, 8]} />
        <meshStandardMaterial color="#0F0F0F" roughness={0.30} metalness={0.05} />
      </mesh>

      {/* Standing figures (simple box stand-ins) */}
      {[
        { x: 5,   z: 0   },
        { x: 6.5, z: -1  },
        { x: 8,   z: 1   },
        { x: 7,   z: 2.5 },
      ].map((fig, i) => (
        <group key={i} position={[fig.x, 0, fig.z]}>
          <mesh position={[0, 0.9, 0]}>
            <boxGeometry args={[0.38, 1.6, 0.22]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.85, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial color="#8B6A50" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ── LARGE CURVED SCREEN — BACK-RIGHT WALL ───────────────────── */}
      {/* Screen frame */}
      <mesh position={[8.5, 2.8, -7.85]}>
        <boxGeometry args={[6.0, 5.0, 0.14]} />
        <meshStandardMaterial color="#080808" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Glowing screen */}
      <mesh position={[8.5, 2.8, -7.74]}>
        <planeGeometry args={[5.6, 4.6]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#E8F2FF"
          emissiveIntensity={2.5}
          roughness={0.05}
        />
      </mesh>
      <pointLight position={[8.5, 1.5, -6.5]} intensity={14} color="#D0E8FF" distance={10} decay={2} />

      {/* ── WALL SCONCES ─────────────────────────────────────────────── */}
      <Sconce position={[-11.88, 1.8, -4]} side={1} />
      <Sconce position={[-11.88, 1.8,  0]} side={1} />
      <Sconce position={[-11.88, 1.8,  4]} side={1} />
      <Sconce position={[ 11.88, 1.8, -4]} side={-1} />
      <Sconce position={[ 11.88, 1.8,  0]} side={-1} />
      <Sconce position={[ 11.88, 1.8,  4]} side={-1} />

      {/* ── STAIRCASE — FAR RIGHT ────────────────────────────────────── */}
      <group position={[10, 0, 5]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(step => (
          <mesh key={step} position={[0, step * 0.32 + 0.16, -step * 0.45]} castShadow>
            <boxGeometry args={[2.5, 0.32, 0.46]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.85} />
          </mesh>
        ))}
        {/* Stair nosing amber strips */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(step => (
          <mesh key={`n${step}`} position={[0, step * 0.32 + 0.32, -step * 0.45 + 0.23]}>
            <boxGeometry args={[2.5, 0.03, 0.03]} />
            <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.8} />
          </mesh>
        ))}
        {/* Handrail */}
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
