import { usePlane, useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export default function Board3D() {
  const [boardTilt, setBoardTilt] = useState(true)
  const [coinLaunched, setCoinLaunched] = useState(false)
  const boardRef = useRef()
  const coinRef = useRef()

  usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }))
  useSphere(() => ({
    mass: 1,
    position: [0, 1, -5],
    args: [0.3],
    ref: coinRef,
  }), coinRef)

  useFrame(() => {
    if (boardRef.current) {
      const target = boardTilt ? -0.9 : -Math.PI / 2
      boardRef.current.rotation.x += (target - boardRef.current.rotation.x) * 0.1
    }
  })

  const tossCoin = () => {
    if (coinLaunched || !coinRef.current) return
    setBoardTilt(false)
    setTimeout(() => {
      coinRef.current.applyImpulse([0, 3, 5], [0, 0, 0])
      setCoinLaunched(true)
    }, 500)
  }

  return (
    <>
      <mesh ref={boardRef} rotation={[-0.9, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color='lime' emissive='green' emissiveIntensity={1} wireframe />
      </mesh>
      <mesh ref={coinRef} onClick={tossCoin} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color='gold' emissive='yellow' emissiveIntensity={1} />
      </mesh>
    </>
  )
}
