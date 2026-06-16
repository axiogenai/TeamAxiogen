'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation and subtle distortion animation based on time
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * 0.3 + time * 0.12,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.3 + time * 0.12,
      0.05
    );
    
    // Float up and down slightly
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color="#a855f7"
        emissive="#06b6d4"
        emissiveIntensity={0.6}
        wireframe
        distort={0.35}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

export const HeroOrb: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none select-none overflow-hidden opacity-75">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} stroke-opacity={0.3} />
        <OrbMesh />
      </Canvas>
    </div>
  );
};
