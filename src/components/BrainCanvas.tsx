// src/components/BrainCanvas.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

type Props = {
  onSelect: (regionId: string) => void;
};

export default function BrainCanvas({ onSelect }: Props) {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
      {/* lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      
      {/* 3D brain model Scene */}
      <Scene onSelect={onSelect} />

      {/* optional: controls */}
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
