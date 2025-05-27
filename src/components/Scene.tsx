"use client";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { DRACOLoader } from "three-stdlib";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function Scene({ onSelect }: { onSelect: (id: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  const gltf = useLoader(
    GLTFLoader,
    "/models/brain-draco.glb",
    (loader) => {
      const draco = new DRACOLoader();
+     draco.setDecoderPath("/draco/");
      loader.setDRACOLoader(draco);
    }
  );

  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.name = obj.name.replace(/\.\d+$/, "");
      }
    });
    groupRef.current?.add(gltf.scene);
  }, [gltf]);

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect((e.object as THREE.Mesh).name);
      }}
    />
  );
}
