import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import Board3D from './components/Board3D'
import { Suspense } from 'react'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas camera={{ position: [0, 5, 12], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} castShadow />
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <Board3D />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}
