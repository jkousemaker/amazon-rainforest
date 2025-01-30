"use client";
import { motion } from "framer-motion-3d";
import { degreesToRadians } from "popmotion";
import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function MagnifyIcon({ isOpen, isHover }) {
  const { nodes } = useGLTF("/magnifying_glass.glb");

  return (
    <Canvas
      resize={{ offsetSize: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      className="!pointer-events-none"
    >
      {lights.map(([x, y, z, intensity], i) => (
        <pointLight
          key={i}
          intensity={intensity}
          position={[x / 8, y / 8, z / 8]}
          color="#fff"
        />
      ))}

      <group dispose={null}>
        <motion.mesh
          geometry={nodes.Object_2.geometry}
          rotation={[0, 1, degreesToRadians(360)]}
          scale={0.4}
          animate={[isOpen ? "open" : "closed", isHover ? "hover" : "rest"]}
          variants={{
            closed: {
              x: [0, 0],
              y: 0.2,
              scale: 0.2,
            },
            open: {
              x: 4,
              y: [0, -1.5, 2],
              scale: 0.5,
              transition: { duration: 1 },
            },
            hover: {
              rotateZ: 0,
              rotateY: 0.3,
              scale: 0.3,
              y: 0.5,
              x: -0.5,
              transition: {
                rotateZ: { duration: 1.5, ease: "linear", repeat: Infinity },
              },
            },
          }}
        >
          <meshPhongMaterial
            color="#ffdd00"
            emissive="#ff9500"
            specular="#fff"
            shininess="100"
          />
        </motion.mesh>
      </group>
    </Canvas>
  );
}

const lights = [
  [2, 1, 4, 1],
  [8, 0, 4, 1],
];
