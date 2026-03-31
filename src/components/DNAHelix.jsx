import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

const HelixMesh = ({ offset = 0, color = "#ffffff" }) => {
  const meshRef = useRef();
  
  // Create a helix path
  const curve = useMemo(() => {
    class HelixCurve extends THREE.Curve {
      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const angle = t * Math.PI * 4;
        const radius = 2;
        const tx = Math.cos(angle + offset) * radius;
        const ty = t * 10 - 5;
        const tz = Math.sin(angle + offset) * radius;
        return optionalTarget.set(tx, ty, tz);
      }
    }
    return new HelixCurve();
  }, [offset]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 100, 0.08, 16, false]} />
      <MeshDistortMaterial
        color={color}
        speed={2}
        distort={0.2}
        radius={1}
        transparent
        opacity={0.6}
        metalness={0.9}
        roughness={0.1}
        emissive="#0066FF"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const ConnectionLines = () => {
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
        const t = i / 40;
        temp.push(t);
    }
    return temp;
  }, []);

  return lines.map((t, i) => (
    <mesh key={i} position={[0, t * 10 - 5, 0]}>
      <boxGeometry args={[4, 0.02, 0.02]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
    </mesh>
  ));
};

export default function DNAHelix() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0066FF" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group rotation={[0.5, 0.8, 0]}>
            <HelixMesh offset={0} color="#ffffff" />
            <HelixMesh offset={Math.PI} color="#0066FF" />
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
