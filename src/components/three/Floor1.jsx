import { useTexture } from '@react-three/drei'

function LogoWall() {
  const logoMark = useTexture('/assets/logos/criterion-mark-white.png')
  const logoLockup = useTexture('/assets/logos/criterion-lockup-white.png')
  return (
    <>
      {/* Large Criterion mark on back wall */}
      <mesh position={[-9, 3.2, -7.7]}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshStandardMaterial
          map={logoMark}
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.6}
          transparent
          opacity={0.18}
          roughness={0.1}
          alphaTest={0.05}
        />
      </mesh>
      {/* Lockup on reception desk front */}
      <mesh position={[-7.5, 0.55, -3.3]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.8, 0.36]} />
        <meshStandardMaterial
          map={logoLockup}
          color="#FFFFFF"
          emissive="#FFD4A0"
          emissiveIntensity={0.5}
          transparent
          alphaTest={0.05}
          roughness={0.1}
        />
      </mesh>
    </>
  )
}

// Floor 1 — Entry to Cinema Culture
// Reference: matte charcoal walls, polished dark concrete floor, warm amber downlights,
// round café tables, merch shelving, tall column, poster wall
export default function Floor1() {
  return (
    <group position={[0, 0, 0]}>

      {/* ── LIGHTING ─────────────────────────────────────────────────── */}
      <ambientLight intensity={0.35} color="#201508" />

      {/* Ceiling recessed downlights */}
      <pointLight position={[-8, 4.5, -2]} intensity={18} color="#FFD4A0" distance={10} decay={2} />
      <pointLight position={[-2, 4.5,  0]} intensity={18} color="#FFD4A0" distance={10} decay={2} />
      <pointLight position={[ 4, 4.5,  1]} intensity={16} color="#FFCC88" distance={10} decay={2} />
      <pointLight position={[ 8, 4.5,  2]} intensity={16} color="#FFCC88" distance={10} decay={2} />

      {/* Merch shelf backlight */}
      <pointLight position={[0, 2.8, -7.2]} intensity={12} color="#CC8833" distance={8} decay={2} />

      {/* Poster wall uplights */}
      <pointLight position={[-10, 1.5, -7.2]} intensity={10} color="#FFCC88" distance={5} decay={2} />
      <pointLight position={[-8,  1.5, -7.2]} intensity={10} color="#FFCC88" distance={5} decay={2} />

      {/* Café area warm fill */}
      <pointLight position={[7, 2.5, 1]} intensity={10} color="#FFD4A0" distance={8} decay={2} />

      {/* Reception desk light */}
      <pointLight position={[-7.5, 2.5, -3]} intensity={8} color="#FFD4A0" distance={6} decay={2} />

      {/* ── SHELL ────────────────────────────────────────────────────── */}
      {/* Polished concrete floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#111111" roughness={0.22} metalness={0.08} />
      </mesh>

      {/* Ceiling — matte black */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial color="#141414" roughness={1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.5, -8]}>
        <boxGeometry args={[24, 5, 0.12]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.92} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-12, 2.5, 0]}>
        <boxGeometry args={[0.12, 5, 16]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.92} />
      </mesh>

      {/* Right wall */}
      <mesh position={[12, 2.5, 0]}>
        <boxGeometry args={[0.12, 5, 16]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.92} />
      </mesh>

      {/* ── LED FLOOR STRIPS ─────────────────────────────────────────── */}
      <mesh position={[0, 0.02, -7.9]}>
        <boxGeometry args={[23.5, 0.04, 0.06]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={1.0} />
      </mesh>
      <mesh position={[-11.9, 0.02, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.5]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={1.0} />
      </mesh>
      <mesh position={[11.9, 0.02, 0]}>
        <boxGeometry args={[0.06, 0.04, 15.5]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={1.0} />
      </mesh>
      {/* Ceiling perimeter strip */}
      <mesh position={[0, 4.92, -7.9]}>
        <boxGeometry args={[23.5, 0.04, 0.06]} />
        <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.5} />
      </mesh>

      {/* ── LARGE POSTER PANEL — FAR LEFT WALL ──────────────────────── */}
      {/* Single large artwork panel on left wall, warm-lit */}
      <mesh position={[-11.82, 2.5, -3]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[4.0, 4.2, 0.08]} />
        <meshStandardMaterial color="#1A1208" roughness={0.8} metalness={0.05} />
      </mesh>
      <mesh position={[-11.76, 2.5, -3]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3.6, 3.8]} />
        <meshStandardMaterial
          color="#1A0800"
          emissive="#442200"
          emissiveIntensity={0.6}
          roughness={0.7}
        />
      </mesh>
      <pointLight position={[-10.5, 1.5, -3]} intensity={5} color="#FFCC88" distance={4} decay={2} />

      {/* ── RECEPTION DESK — FAR LEFT ────────────────────────────────── */}
      <group position={[-7.5, 0, -3.2]}>
        {/* Desk body */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[4.0, 1.1, 1.0]} />
          <meshStandardMaterial color="#0F0C08" roughness={0.80} metalness={0.02} />
        </mesh>
        {/* Desk top */}
        <mesh position={[0, 1.12, 0]}>
          <boxGeometry args={[4.1, 0.06, 1.05]} />
          <meshStandardMaterial color="#1A1612" roughness={0.35} metalness={0.15} />
        </mesh>
        {/* Backlit top edge strip */}
        <mesh position={[0, 1.16, 0.53]}>
          <boxGeometry args={[4.0, 0.03, 0.04]} />
          <meshStandardMaterial color="#FFD4A0" emissive="#FFD4A0" emissiveIntensity={1.2} />
        </mesh>
        {/* Kiosk screen on desk */}
        <mesh position={[0, 1.0, -0.52]}>
          <planeGeometry args={[1.2, 0.65]} />
          <meshStandardMaterial color="#001020" emissive="#002244" emissiveIntensity={1.0} roughness={0.05} />
        </mesh>
        {/* Staff figure (simple box stand-in) */}
        <mesh position={[0, 1.5, -0.3]}>
          <boxGeometry args={[0.4, 0.6, 0.2]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.2, -0.3]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#8B6A50" roughness={0.8} />
        </mesh>
      </group>

      {/* Logo textures */}
      <LogoWall />

      {/* ── TALL ARCHITECTURAL COLUMN — CENTER LEFT ──────────────────── */}
      <mesh position={[-3, 2.5, 1]}>
        <cylinderGeometry args={[0.35, 0.35, 5.0, 12]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Column base cap */}
      <mesh position={[-3, 0.06, 1]}>
        <cylinderGeometry args={[0.45, 0.45, 0.12, 12]} />
        <meshStandardMaterial color="#222222" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Column top cap */}
      <mesh position={[-3, 4.94, 1]}>
        <cylinderGeometry args={[0.45, 0.45, 0.12, 12]} />
        <meshStandardMaterial color="#222222" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* ── DVD / MERCH SHELVING UNIT — CENTER ───────────────────────── */}
      <group position={[0, 0, -7.0]}>
        {/* Tall shelf unit body */}
        <mesh position={[0, 2.0, 0]} castShadow>
          <boxGeometry args={[1.2, 4.0, 0.4]} />
          <meshStandardMaterial color="#0F0C08" roughness={0.80} metalness={0.02} />
        </mesh>
        {/* Back panel with warm backlight glow */}
        <mesh position={[0, 2.0, -0.18]}>
          <planeGeometry args={[1.1, 3.8]} />
          <meshStandardMaterial color="#CC8833" emissive="#CC8833" emissiveIntensity={0.25} roughness={1} />
        </mesh>
        {/* Shelf boards */}
        {[0.5, 1.1, 1.7, 2.3, 2.9, 3.5].map((y, si) => (
          <mesh key={si} position={[0, y, 0.02]}>
            <boxGeometry args={[1.15, 0.04, 0.38]} />
            <meshStandardMaterial color="#1A1208" roughness={0.75} />
          </mesh>
        ))}
        {/* DVD/item boxes on shelves — 6 rows × 4 cols */}
        {[0, 1, 2, 3, 4, 5].map(row =>
          [-0.37, -0.12, 0.12, 0.37].map((x, ci) => (
            <mesh key={`${row}-${ci}`} position={[x, 0.64 + row * 0.60, 0.12]}>
              <boxGeometry args={[0.16, 0.22, 0.08]} />
              <meshStandardMaterial
                color={['#0A0F18', '#18080A', '#0A1208', '#18120A'][ci]}
                roughness={0.5}
              />
            </mesh>
          ))
        )}
        <pointLight position={[0, 2.5, 0.5]} intensity={3} color="#CC8833" distance={3} decay={2} />
      </group>

      {/* ── POSTER WALL — LEFT-CENTER BACK WALL ─────────────────────── */}
      <group position={[-6, 0, -7.78]}>
        {[-2.0, -0.5, 1.0].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            {/* Frame */}
            <mesh position={[0, 2.5, 0.02]}>
              <boxGeometry args={[1.1, 3.2, 0.06]} />
              <meshStandardMaterial color="#1A1612" roughness={0.6} metalness={0.1} />
            </mesh>
            {/* Poster */}
            <mesh position={[0, 2.5, 0.08]}>
              <planeGeometry args={[0.9, 2.9]} />
              <meshStandardMaterial
                color={['#1A0800', '#080818', '#0A1208'][i]}
                emissive={['#331200', '#0A0A33', '#112210'][i]}
                emissiveIntensity={0.5}
                roughness={0.7}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── LARGE COLORFUL ARTWORK PANEL — BACK WALL RIGHT HALF ─────── */}
      <group position={[5, 0, -7.78]}>
        {/* Large single artwork panel */}
        <mesh position={[0, 2.6, 0.02]}>
          <boxGeometry args={[5.5, 3.8, 0.07]} />
          <meshStandardMaterial color="#1A1612" roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh position={[0, 2.6, 0.09]}>
          <planeGeometry args={[5.2, 3.5]} />
          <meshStandardMaterial
            color="#0A0414"
            emissive="#220033"
            emissiveIntensity={0.45}
            roughness={0.7}
          />
        </mesh>
        <pointLight position={[5, 1.5, -7.2]} intensity={5} color="#FFCC88" distance={4} decay={2} />
      </group>

      {/* ── CAFÉ / ROUND TABLES CLUSTER — RIGHT SIDE ─────────────────── */}
      {[
        { x: 6,   z: -1.5 },
        { x: 8.2, z: -0.5 },
        { x: 7.0, z:  2.0 },
        { x: 9.2, z:  1.5 },
      ].map((tbl, ti) => (
        <group key={ti} position={[tbl.x, 0, tbl.z]}>
          {/* Table top — round */}
          <mesh position={[0, 0.76, 0]}>
            <cylinderGeometry args={[0.65, 0.65, 0.05, 16]} />
            <meshStandardMaterial color="#1A1612" roughness={0.30} metalness={0.15} />
          </mesh>
          {/* Table leg */}
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.76, 8]} />
            <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.70} />
          </mesh>
          {/* Table base disc */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.04, 12]} />
            <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.60} />
          </mesh>
          {/* Chairs around table — 4 per table */}
          {[0, 1, 2, 3].map(ci => {
            const angle = (ci / 4) * Math.PI * 2
            const cx = Math.sin(angle) * 0.95
            const cz = Math.cos(angle) * 0.95
            return (
              <group key={ci} position={[cx, 0, cz]} rotation={[0, -angle, 0]}>
                {/* Chair seat */}
                <mesh position={[0, 0.45, 0]}>
                  <cylinderGeometry args={[0.24, 0.24, 0.06, 12]} />
                  <meshStandardMaterial color="#4A0A10" roughness={0.97} />
                </mesh>
                {/* Chair back */}
                <mesh position={[0, 0.78, -0.2]}>
                  <boxGeometry args={[0.44, 0.52, 0.06]} />
                  <meshStandardMaterial color="#4A0A10" roughness={0.97} />
                </mesh>
                {/* Chair leg */}
                <mesh position={[0, 0.22, 0]}>
                  <cylinderGeometry args={[0.025, 0.03, 0.44, 6]} />
                  <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.70} />
                </mesh>
              </group>
            )
          })}
        </group>
      ))}

      {/* ── STAIRCASE — FAR RIGHT ────────────────────────────────────── */}
      <group position={[10, 0, 5]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(step => (
          <mesh key={step} position={[0, step * 0.32 + 0.16, -step * 0.45]} castShadow>
            <boxGeometry args={[2.5, 0.32, 0.46]} />
            <meshStandardMaterial color="#2A1A0A" roughness={0.75} metalness={0.05} />
          </mesh>
        ))}
        {/* Stair nosing amber strip */}
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
        {/* Rail posts */}
        {[0, 1, 2, 3].map(p => (
          <mesh key={p} position={[1.25, 0.6 + p * 0.6, -p * 0.9]}>
            <boxGeometry args={[0.04, 1.2, 0.04]} />
            <meshStandardMaterial color="#2A2A2A" roughness={0.45} metalness={0.70} />
          </mesh>
        ))}
        <pointLight position={[10, 2.5, 4]} intensity={4} color="#CC8833" distance={4} decay={2} />
      </group>

    </group>
  )
}
