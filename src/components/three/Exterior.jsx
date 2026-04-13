import { useTexture } from '@react-three/drei'

function ExteriorInner() {
  const brickTexture = useTexture('/assets/photos/brick-texture.jpg')
  return <ExteriorGeometry brickTexture={brickTexture} />
}

export default function Exterior() {
  return (
    <ExteriorInner />
  )
}

function ExteriorGeometry({ brickTexture }) {

  return (
    <group position={[0, 0, 0]}>
      {/* Night sky ambient — brighter so building is visible */}
      <ambientLight intensity={0.8} color="#2A2A40" />
      {/* Street lamp point lights */}
      <pointLight position={[-8, 2, 8]} intensity={25} color="#FFBB55" distance={22} decay={2} />
      <pointLight position={[8, 2, 8]} intensity={20} color="#FFBB55" distance={18} decay={2} />
      {/* Moon/sky fill */}
      <directionalLight position={[5, 20, 5]} intensity={1.2} color="#9AAABB" />
      {/* Front fill so facade is readable */}
      <directionalLight position={[0, 8, 15]} intensity={0.8} color="#AABBCC" />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#222018" roughness={0.95} />
      </mesh>

      {/* Road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 15]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#1E1C18" roughness={0.9} />
      </mesh>

      {/* Main building block — 4 storeys */}
      {/* Front facade */}
      <mesh position={[0, 7, 0]}>
        <boxGeometry args={[18, 14, 0.6]} />
        <meshStandardMaterial
          color="#1A1208"
          map={brickTexture || undefined}
          roughness={0.85}
          metalness={0.02}
        />
      </mesh>

      {/* Building depth (sides + back) */}
      <mesh position={[0, 7, -6]}>
        <boxGeometry args={[18, 14, 12]} />
        <meshStandardMaterial color="#161008" roughness={0.9} />
      </mesh>

      {/* Left side facade */}
      <mesh position={[-9.3, 7, -5.7]}>
        <boxGeometry args={[0.3, 14, 11.4]} />
        <meshStandardMaterial color="#181208" roughness={0.85} />
      </mesh>

      {/* Right side facade */}
      <mesh position={[9.3, 7, -5.7]}>
        <boxGeometry args={[0.3, 14, 11.4]} />
        <meshStandardMaterial color="#181208" roughness={0.85} />
      </mesh>

      {/* Window grid — 4 rows × 5 columns */}
      {[0, 1, 2, 3].map(row =>
        [-4, -2, 0, 2, 4].map((col, ci) => (
          <group key={`${row}-${ci}`} position={[col * 1.8, 2 + row * 3.2, 0.35]}>
            {/* Window frame */}
            <mesh>
              <boxGeometry args={[1.3, 2.2, 0.08]} />
              <meshStandardMaterial color="#0D0D0D" roughness={0.6} metalness={0.2} />
            </mesh>
            {/* Window glass */}
            <mesh position={[0, 0, 0.05]}>
              <planeGeometry args={[1.1, 2.0]} />
              <meshStandardMaterial
                color="#050A10"
                emissive={row < 2 ? '#0A1520' : '#050810'}
                emissiveIntensity={row < 2 ? 0.3 : 0.1}
                roughness={0.05}
                metalness={0.1}
                transparent
                opacity={0.85}
              />
            </mesh>
            {/* Cross mullion horizontal */}
            <mesh position={[0, 0, 0.1]}>
              <boxGeometry args={[1.15, 0.04, 0.04]} />
              <meshStandardMaterial color="#0D0D0D" roughness={0.5} metalness={0.3} />
            </mesh>
            {/* Cross mullion vertical */}
            <mesh position={[0, 0, 0.1]}>
              <boxGeometry args={[0.04, 2.05, 0.04]} />
              <meshStandardMaterial color="#0D0D0D" roughness={0.5} metalness={0.3} />
            </mesh>
          </group>
        ))
      )}

      {/* Ornate cornice at roofline */}
      <mesh position={[0, 14.3, 0.1]}>
        <boxGeometry args={[18.6, 0.5, 0.8]} />
        <meshStandardMaterial color="#1C1A10" roughness={0.7} />
      </mesh>
      <mesh position={[0, 14.8, 0.15]}>
        <boxGeometry args={[18.8, 0.2, 0.6]} />
        <meshStandardMaterial color="#22200E" roughness={0.65} />
      </mesh>
      {/* Cornice detail bumps */}
      {[-7, -4, -1, 2, 5, 8].map((x, i) => (
        <mesh key={i} position={[x, 14.5, 0.35]}>
          <boxGeometry args={[0.6, 0.4, 0.3]} />
          <meshStandardMaterial color="#201E0C" roughness={0.7} />
        </mesh>
      ))}

      {/* Carved lettering band above ground floor */}
      <mesh position={[0, 1.1, 0.31]}>
        <boxGeometry args={[17, 0.25, 0.08]} />
        <meshStandardMaterial color="#181410" roughness={0.8} />
      </mesh>

      {/* Green copper/patina roof */}
      <mesh position={[0, 15.8, -2]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[18.8, 0.2, 7]} />
        <meshStandardMaterial color="#4A7A6A" roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Roof ridges */}
      {[-3, -1.5, 0, 1.5, 3].map((z, i) => (
        <mesh key={i} position={[0, 15.9, z - 2]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[18.8, 0.06, 0.06]} />
          <meshStandardMaterial color="#3A6A5A" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}

      {/* Criterion sign (replacing GASLIGHT) */}
      <group position={[-5, 15.2, 0.5]}>
        <mesh>
          <boxGeometry args={[3, 0.8, 0.15]} />
          <meshStandardMaterial color="#0A0A08" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[2.6, 0.6]} />
          <meshStandardMaterial
            color="#F5F0E8"
            emissive="#F5F0E8"
            emissiveIntensity={0.15}
            roughness={0.1}
          />
        </mesh>
        <pointLight position={[0, -0.5, 0.5]} intensity={2} color="#F5F0E8" distance={4} decay={2} />
      </group>

      {/* Ground floor entry — dark steel frame */}
      <group position={[0, 1.2, 0.32]}>
        {/* Entry arch */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.5, 2.4, 0.2]} />
          <meshStandardMaterial color="#0A0A08" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Door opening */}
        <mesh position={[0, -0.1, 0.11]}>
          <planeGeometry args={[2.8, 2.0]} />
          <meshStandardMaterial color="#0A0C10" roughness={0.1} metalness={0.05} transparent opacity={0.4} />
        </mesh>
        {/* Address number */}
        <mesh position={[1.5, -0.8, 0.11]}>
          <planeGeometry args={[0.4, 0.2]} />
          <meshStandardMaterial color="#F5F0E8" emissive="#F5F0E8" emissiveIntensity={0.2} />
        </mesh>
        <pointLight position={[0, 0.5, 1]} intensity={3} color="#FFA844" distance={5} decay={2} />
      </group>

      {/* Street lamp posts */}
      {[-8, 8].map((x, i) => (
        <group key={i} position={[x, 0, 7]}>
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.05, 0.07, 5, 8]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.4} />
          </mesh>
          <mesh position={[0, 5.2, 0.3]}>
            <boxGeometry args={[0.15, 0.15, 0.6]} />
            <meshStandardMaterial color="#1A1A1A" roughness={0.4} metalness={0.4} />
          </mesh>
          <mesh position={[0, 5.1, 0.5]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial color="#FFF8E0" emissive="#FFF8E0" emissiveIntensity={2} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
