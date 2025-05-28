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
      draco.setDecoderPath("/draco/");
      loader.setDRACOLoader(draco);
    }
  );

  useEffect(() => {
    if (gltf.scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf.scene.position.sub(center);

      // Create a map to store region names and their top-level nodes
      const regionNodes = new Map<string, THREE.Object3D>();      // First pass: find all top-level objects (regions)
      gltf.scene.children.forEach((obj) => {        // Store the original object name without leading underscores, asterisks, and question marks
        const regionName = obj.name.replace(/^_+/, "").replace(/[\*\?]/g, "");
        regionNodes.set(regionName, obj);
        console.log("Region found:", regionName);
      });

      groupRef.current?.add(gltf.scene);
    }
  }, [gltf]);

  return (
    <group
      ref={groupRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        // Traverse up the parent hierarchy until we find the region node
        let currentObject = e.object;
        while (currentObject.parent && currentObject.parent !== groupRef.current) {
          currentObject = currentObject.parent;        }        const regionName = currentObject.name.replace(/^_+/, "").replace(/[\*\?]/g, "");
        onSelect(regionName);
        console.log("Selected region:", regionName);
      }}
    />
  );
}
