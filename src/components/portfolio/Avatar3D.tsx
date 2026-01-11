"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Group, Mesh, PerspectiveCamera } from "three";
import * as THREE from "three";

// Responsive camera adjustment
function CameraController() {
  const { camera, size } = useThree();

  useEffect(() => {
    // Adjust camera position based on viewport width - moved back to fit larger model
    if (camera instanceof PerspectiveCamera) {
      if (size.width < 768) {
        camera.position.set(0, 0, 8);
        camera.fov = 60;
      } else if (size.width < 1024) {
        camera.position.set(0, 0, 10);
        camera.fov = 55;
      } else {
        camera.position.set(0, 0, 12);
        camera.fov = 50;
      }
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width]);

  return null;
}

// Model component that loads and displays the GLB
function AvatarModel() {
  const { scene } = useGLTF("/james_franco_avatar.glb");
  const groupRef = useRef<Group>(null);
  const { size } = useThree();

  // Calculate responsive scale - made much larger for prominent display
  const scale = size.width < 768 ? 2.5 : size.width < 1024 ? 3.2 : 4.0;

  // Smooth rotation animation - only when not being controlled
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  // Optimize materials
  clonedScene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        // Ensure material is an array or single material
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.roughness = 0.7;
            mat.metalness = 0.3;
          }
        });
      }
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={clonedScene} scale={scale} />
    </group>
  );
}

// Loading fallback component
function AvatarLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="hsl(var(--muted))"
        wireframe
        opacity={0.5}
        transparent
      />
    </mesh>
  );
}

// Preload the model
useGLTF.preload("/james_franco_avatar.glb");

interface Avatar3DProps {
  className?: string;
}

export const Avatar3D = ({ className = "" }: Avatar3DProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center ${className}`}
      >
        <div className="w-32 h-32 rounded-full bg-muted/20 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`w-full h-full absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[
          1,
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, 2)
            : 1,
        ]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Adaptive performance
        frameloop="always"
      >
        <CameraController />
        <Suspense fallback={<AvatarLoader />}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow={false}
          />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />

          {/* Environment for better lighting */}
          <Environment preset="sunset" />

          {/* Model */}
          <AvatarModel />

          {/* Controls - enabled for full interaction */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate={false}
            minDistance={6}
            maxDistance={18}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.3}
            dampingFactor={0.05}
            enableDamping={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
