"use client"

import { useRef, useMemo, useState, Suspense } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, Sphere, Html } from "@react-three/drei"
import * as THREE from "three"

// Personal profile data
const PROFILE_LABELS = [
  { name: "Agil Nugraha", icon: "👤", color: "#a855f7", description: "Full Stack Developer" },
  { name: "Bogor, Indonesia", icon: "📍", color: "#ec4899", description: "Based in" },
  { name: "5+ Years", icon: "💼", color: "#8b5cf6", description: "Experience" },
  { name: "React & Vue", icon: "⚛️", color: "#61dafb", description: "Frontend Developer" },
  { name: "Node.js & Python", icon: "🚀", color: "#339933", description: "Backend Developer" },
  { name: "PostgreSQL & PostGIS", icon: "🗄️", color: "#4169e1", description: "Database Developer" },
  { name: "Available", icon: "✨", color: "#10b981", description: "Open to Work" },
  { name: "S.T", icon: "🎓", color: "#f59e0b", description: "Information Technology" },
]

function RotatingLabel({ label, index, total, onHover }: { 
  label: typeof PROFILE_LABELS[0], 
  index: number, 
  total: number,
  onHover: (label: typeof PROFILE_LABELS[0] | null) => void
}) {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      const angle = (index / total) * Math.PI * 2 + state.clock.elapsedTime * 0.3
      const radius = 3.5
      ref.current.position.x = Math.cos(angle) * radius
      ref.current.position.z = Math.sin(angle) * radius
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.5
    }
  })

  return (
    <group ref={ref}>
      <Html
        center
        distanceFactor={8}
        style={{
          transition: "all 0.2s",
          opacity: hovered ? 1 : 0.8,
          transform: hovered ? "scale(1.2)" : "scale(1)",
        }}
      >
        <div
          className="px-4 py-2 rounded-full backdrop-blur-md border cursor-pointer select-none"
          style={{
            background: `linear-gradient(135deg, ${label.color}20, ${label.color}40)`,
            borderColor: `${label.color}60`,
            color: "white",
            whiteSpace: "nowrap",
            fontSize: "12px",
            fontWeight: "600",
            boxShadow: hovered ? `0 0 20px ${label.color}80` : `0 0 10px ${label.color}40`,
          }}
          onPointerEnter={() => {
            setHovered(true)
            onHover(label)
          }}
          onPointerLeave={() => {
            setHovered(false)
            onHover(null)
          }}
        >
          <span className="mr-2">{label.icon}</span>
          {label.name}
        </div>
        {hovered && (
          <div
            className="absolute top-full mt-2 px-3 py-1 rounded-lg backdrop-blur-md border text-xs"
            style={{
              background: `linear-gradient(135deg, ${label.color}30, ${label.color}50)`,
              borderColor: `${label.color}70`,
              color: "white",
              whiteSpace: "nowrap",
            }}
          >
            {label.description}
          </div>
        )}
      </Html>
    </group>
  )
}

function Particles() {
  const count = 800
  const particlesRef = useRef<THREE.Points>(null)

  const particlesGeometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      const hue = 0.7 + Math.random() * 0.15
      const color = new THREE.Color().setHSL(hue, 0.7, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geometry
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Globe({ densityMode, onToggle }: { densityMode: boolean, onToggle: () => void }) {
  const globeRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const densityRef = useRef<THREE.Mesh>(null)
  const isDragging = useRef(false)
  const mouseDownPos = useRef({ x: 0, y: 0 })

  const earthTexture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg'
  )

  const bumpTexture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png'
  )

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.12
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
    if (densityRef.current) {
      densityRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const handlePointerDown = (e: any) => {
    isDragging.current = false
    mouseDownPos.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerMove = (e: any) => {
    if (mouseDownPos.current.x !== 0 || mouseDownPos.current.y !== 0) {
      const deltaX = Math.abs(e.clientX - mouseDownPos.current.x)
      const deltaY = Math.abs(e.clientY - mouseDownPos.current.y)
      if (deltaX > 5 || deltaY > 5) {
        isDragging.current = true
      }
    }
  }

  const handlePointerUp = () => {
    if (!isDragging.current) {
      onToggle()
    }
    isDragging.current = false
    mouseDownPos.current = { x: 0, y: 0 }
  }

  return (
    <group 
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <Sphere ref={glowRef} args={[2.35, 32, 32]}>
        <meshBasicMaterial
          color={densityMode ? "#a855f7" : "#60a5fa"}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {!densityMode && (
        <>
          <Sphere ref={cloudsRef} args={[2.05, 32, 32]}>
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.15}
              roughness={1}
            />
          </Sphere>

          <Sphere ref={globeRef} args={[2, 64, 64]}>
            <meshStandardMaterial
              map={earthTexture}
              bumpMap={bumpTexture}
              bumpScale={0.05}
              roughness={0.8}
              metalness={0.1}
            />
          </Sphere>
        </>
      )}

      {densityMode && (
        <>
          <Sphere ref={densityRef} args={[2, 64, 64]}>
            <meshStandardMaterial
              color="#8b5cf6"
              wireframe
              transparent
              opacity={0.6}
            />
          </Sphere>

          <Sphere args={[1.95, 32, 32]}>
            <meshBasicMaterial
              color="#ec4899"
              transparent
              opacity={0.3}
              wireframe
            />
          </Sphere>

          <Sphere args={[1.8, 16, 16]}>
            <meshBasicMaterial
              color="#a855f7"
              transparent
              opacity={0.5}
            />
          </Sphere>
        </>
      )}
    </group>
  )
}

function Scene() {
  const [hoveredLabel, setHoveredLabel] = useState<typeof PROFILE_LABELS[0] | null>(null)
  const [densityMode, setDensityMode] = useState(false)

  const toggleDensityMode = () => {
    setDensityMode(prev => !prev)
  }

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1} />
      <pointLight position={[-5, -3, -5]} color="#60a5fa" intensity={0.3} />
      
      <Globe densityMode={densityMode} onToggle={toggleDensityMode} />
      <Particles />
      
      {PROFILE_LABELS.map((label, index) => (
        <RotatingLabel
          key={label.name}
          label={label}
          index={index}
          total={PROFILE_LABELS.length}
          onHover={setHoveredLabel}
        />
      ))}
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#1e40af" wireframe />
    </mesh>
  )
}

export function InteractiveGlobe() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
      
    </div>
  )
}
