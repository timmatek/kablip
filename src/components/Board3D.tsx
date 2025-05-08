// client/src/components/Board3D.tsx
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Board3D() {
  const boardRef = useRef<THREE.Mesh>(null!)
  const coinRef  = useRef<THREE.Mesh>(null!)
  const [launched, setLaunched] = useState(false)

  useFrame(() => {
    // Smooth board tilt
    if (boardRef.current) {
      const target = launched ? -Math.PI / 2 : -0.9
      boardRef.current.rotation.x += (target - boardRef.current.rotation.x) * 0.1
    }
    // Simple coin drop after launch
    if (launched && coinRef.current) {
      coinRef.current.position.y = Math.max(0.3, coinRef.current.position.y - 0.05)
    }
  })

  const tossCoin = () => {
    if (!launched) setLaunched(true)
  }

  return (
    <>
      {/* Neon grid board */}
      <mesh ref={boardRef} rotation={[-0.9, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="lime"
          emissive="green"
          emissiveIntensity={1}
          wireframe
        />
      </mesh>

      {/* Click-to-launch coin */}
      <mesh
        ref={coinRef}
        position={[0, 1, -5]}
        onClick={tossCoin}
        castShadow
        scale={1.2}
        cursor="pointer"
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="gold"
          emissive="yellow"
          emissiveIntensity={1}
        />
      </mesh>
    </>
  )
}
