"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { useStore } from "@/store";
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});
import { motion } from "framer-motion";
import Image from "next/image";
export default function SectionVideo() {
  const { setLoaded, loaded, intro } = useStore();
  const ref = useRef();
  return (
    <div ref={ref} className="h-full w-full relative">
      <ReactPlayer
        url="/hero.mp4"
        loop={true}
        playing={true}
        muted={true}
        playsinline={true}
        controls={false}
        volume={0}
        width="100%"
        height="100%"
        className="react-player"
        onReady={() => {
          setTimeout(() => {
            setLoaded();
          }, 1500);
        }}
      />
    </div>
  );
}
