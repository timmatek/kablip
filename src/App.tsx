// client/src/App.tsx
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Board3D from './components/Board3D'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas
        shadows
        camera={{ position: [0, 5, 12], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} castShadow />
        <Suspense fallback={null}>
          <Board3D />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
