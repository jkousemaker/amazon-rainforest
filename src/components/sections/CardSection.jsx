"use client";
import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";

import { useRef } from "react";
import Image from "next/image";
import useScreenSize from "@/hooks/useScreenSize";

import { MathUtils } from "three";
const cards = [
  {
    id: 0,
    label: "monkey",
    offsets: [
      [0, 1],
      [911, 0],
    ],
  },
  {
    id: 1,
    label: "monkey2",
    offsets: [
      [0, 1],
      [911, 0],
    ],
  },
  {
    id: 2,
    label: "monkey3",
    offsets: [
      [0, 1],
      [911, 0],
    ],
  },
  {
    id: 3,
    label: "monkey4",
    offsets: [
      [0, 1],
      [911, 0],
    ],
  },
  {
    id: 4,
    label: "monkey5",
    offsets: [
      [0, 1],
      [911, 0],
    ],
  },
];
export default function CardSection() {
  return (
    <section
      clasraycaster={{ params: { Points: { threshold: 0.2 } } }}
      camera={{ position: [0, 0, 10] }}
      className="w-full"
    >
      <MiddleCards />
    </section>
  );
}

function MiddleCards() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["0, 0.2", "1, 1"],
  });
  return (
    <div ref={container} className="h-[250vh] relative ">
      <div className="h-screen sticky top-0 left-0">
        <div className=" size-full  content-center p-4">
          <div className="grid w-full h-full aspect-video grid-cols-[repeat(5,1fr)] grid-rows-[repeat(2,min-content)] content-center gap-[7px] ">
            {cards.map((card, i) => {
              return (
                <MiddleCard
                  key={i}
                  card={card}
                  scrollYProgress={scrollYProgress}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiddleCard({ card, scrollYProgress, index }) {
  const screenSize = useScreenSize();
  const middleIndex = Math.floor(cards.length / 2);

  const distanceFromMiddle = Math.abs(index - middleIndex);
  const y = useTransform(
    scrollYProgress,
    [0.35 * distanceFromMiddle, 1],
    [screenSize.height, 0],
    { clamp: true, ease: cubicBezier(0.31, 0.58, 0.48, 0.99) }
  );

  return (
    <motion.div
      className="h-min aspect-[2/3] w-full relative"
      style={{
        transformOrigin: "50% 0%",

        y,
      }}
    >
      <Image
        priority
        src="/img/hero.png"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={`Picture of a ${card.label}`}
        className=" object-cover [background-position:_50%_50%] relative"
      />
    </motion.div>
  );
}

function SlideCards() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["0, 0.2", "1, 1"],
  });
  return (
    <div ref={container} className="h-[250vh] relative ">
      <div className="h-screen sticky top-0 left-0">
        <div className=" size-full  content-center p-4">
          <div className="grid w-full h-full aspect-video grid-cols-[repeat(5,1fr)] grid-rows-[repeat(2,min-content)] content-center gap-[7px] ">
            {cards.map((card, i) => {
              return (
                <SlideCard
                  amount={cards.length}
                  key={i}
                  card={card}
                  scrollYProgress={scrollYProgress}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideCard({ amount, card, scrollYProgress, index }) {
  const screenSize = useScreenSize();
  const middleIndex = Math.floor(cards.length / 2);
  const range = useTransform(
    scrollYProgress,
    [0, ((index + 1) * 1) / amount],
    [0, 1]
  );
  const x = useTransform(range, [0, 1], ["50%", "0%"], {
    clamp: true,
    ease: cubicBezier(0.31, 0.58, 0.48, 0.99),
  });

  const positions = Array.from({ length: 80 }, (i) => [
    MathUtils.randFloatSpread(8),
    MathUtils.randFloatSpread(8),
    MathUtils.randFloatSpread(8),
  ]);

  const rotate = useTransform(range, [0, 1], [-10, 0]);
  const skew = useTransform(range, [0, 1], [15, 0]);
  const scale = useTransform(range, [0, 1], [1.05, 1]);
  return (
    <motion.div
      className="h-min aspect-[2/3] w-full relative"
      style={{
        transformOrigin: "100% -450%",

        x,
        rotate,
        skew,
        scale,
        opacity: range,
      }}
    >
      <Image
        priority
        src="/img/hero.png"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={`Picture of a ${card.label}`}
        className=" object-cover [background-position:_50%_50%] relative"
      />
    </motion.div>
  );
}
