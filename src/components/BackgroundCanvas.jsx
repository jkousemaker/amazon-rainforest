"use client";
import {
  Box,
  Environment,
  OrbitControls,
  Torus,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Color, InstancedMesh } from "three";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
  InstancedRigidBodyProps,
  RapierRigidBody,
} from "@react-three/rapier";

const MAX_COUNT = 2000;

export default function BackgroundCanvas() {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: 999999,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Environment
            files="/adamsbridge.hdr"
            background={true}
            backgroundBlurriness={1}
          />
          <Physics debug gravity={[0, -0.2, 0]}>
            <RigidBody colliders={"hull"} restitution={2}>
              <Model />
            </RigidBody>

            <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
          </Physics>

          <OrbitControls />
        </Suspense>
      </Canvas>
    </>
  );
}

function Model() {
  const { scene } = useGLTF("/holly_leaf.glb");
  return <primitive object={scene} />;
}
