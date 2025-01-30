"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import SectionVideo from "../SectionVideo";
import { useStore } from "@/store";

import { useRef } from "react";

import Image from "next/image";

export default function MainSection() {
  const section = useRef();
  const { scrollYProgress } = useScroll({
    target: section,
  });
  return (
    <section ref={section} className="h-[300vh] relative overflow-clip">
      <motion.div className="h-screen w-full sticky top-0">
        <div className="size-full relative">
          <Background progress={scrollYProgress} />
          <ScrollingText progress={scrollYProgress} />
        </div>
      </motion.div>
    </section>
  );
}

function Background({ progress }) {
  const MotionImage = motion.create(Image);
  const blur = useTransform(progress, [0.3, 1], [0, 20]);
  const brightness = useTransform(progress, [0, 1], [1, 0.5]);
  const saturate = useTransform(progress, [0, 1], [1, 2.5]);
  const filter = useMotionTemplate`blur(${blur}px) brightness(${brightness}) saturate(${saturate})`;

  const scale = useTransform(progress, [0, 1], [1, 1.5]);

  return (
    <>
      <MotionImage
        layout
        src="/img/hero.png"
        fill
        alt="dev"
        //sizes="100vw"
        priority
        layoutId="hero-layout-image"
        className="object-cover [background-position:_50%_70%;] will-change-[transform,_filter]"
        style={{ filter, scale }}
        transition={{
          duration: 0.8,
          ease: [0.84, 0.01, 0.6, 0.9],
          opacity: { delay: 10.5, ease: "linear", duration: 10.3 },
        }}
      />
      <Video filter={filter} scale={scale} />
    </>
  );
}

function Video({ filter, scale }) {
  const { loaded } = useStore();
  return (
    <motion.div
      style={{
        filter,
        scale,
      }}
      initial={false}
      animate={{
        opacity: loaded ? 1 : 0,
      }}
      transition={{
        duration: 1,
      }}
      className="overflow-clip size-full z-10 relative block"
    >
      <SectionVideo />
    </motion.div>
  );
}

function ScrollingText({ progress }) {
  return (
    <motion.div
      initial={{
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        delay: 0.6,
        duration: 1,
        ease: [0, 0.25, 0, 0.99],
      }}
      className="z-50 top-0 left-0 w-full absolute h-full flex flex-col justify-center items-center"
    >
      <Slider progress={progress} />
      <Header progress={progress} />
    </motion.div>
  );
}
function Slider({ progress }) {
  const scaleX = useTransform(progress, [0.7, 0.9, 1], [0, 0.5, 1]);
  return (
    <motion.div
      style={{ scaleX }}
      className="absolute inset-0 z-50 size-full bg-white"
    ></motion.div>
  );
}

function Header({ progress }) {
  const scale = useTransform(progress, [0, 0.5, 1], [1, 10, 40]);
  const origin = {
    x: useTransform(progress, [0, 0.5], [63, 62.36]),
    y: useTransform(progress, [0, 0.8], [30, 61]),
  };
  const x = useTransform(progress, [0, 0.75], [0, 900]);
  const y = useTransform(progress, [0, 1], [0, -50]);
  return (
    <motion.div
      style={{
        scale,
        transformOrigin: useMotionTemplate`${origin.x}% ${origin.y}%`,
      }}
      className="flex justify-center items-center relative"
    >
      <motion.h1 className="text-9xl whitespace-nowrap text-white font-bold tracking-[-0.06em]   ">
        Amazon Rainforest
      </motion.h1>
      <motion.div style={{ x, y }} className="   mt-5 absolute top-28">
        <motion.h2
          initial={{ y: "150%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.4,
            ease: [0.09, 0.41, 0.18, 0.97],
            duration: 0.4,
            opacity: { delay: 0.5, ease: "linear", duration: 0.3 },
          }}
          className="text-6xl font-bold text-[#EBFFC6] opacity-70 hover:opacity-100 duration-300"
        >
          is ready for you
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}
