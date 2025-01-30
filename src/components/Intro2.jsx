"use client";
import Overlay from "@/components/Overlay";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import useScreenSize from "@/hooks/useScreenSize";
import useMousePosition from "@/hooks/useMousePosition";
import { useStore } from "@/store";
import { cn } from "@/lib/cn";
import CanvasButton from "./ui/CanvasButton";
const MotionImage = motion.create(Image);
import { introImages } from "@/data/introImages";
import { Magnetic } from "../components/core/magnetic";
function Row({ row, index, onImageLoad, hasLoaded }) {
  const mousePosition = useMousePosition();
  const screenSize = useScreenSize();
  const numRows = introImages.length;
  const middleRowIndex = Math.floor(numRows / 2);
  const middleRow = introImages[middleRowIndex];
  const distanceFromMiddle = Math.abs(index - middleRowIndex);

  const translateXVal = useTransform(
    mousePosition.x,
    [0, screenSize.width],
    [
      row === middleRow ? -screenSize.width / 2.5 : -screenSize.width / 3,
      row === middleRow ? screenSize.width / 2.5 : screenSize.width / 3,
    ]
  );

  const translateX = useSpring(translateXVal, {
    stiffness: row === middleRow ? 150 : 300,
    damping: row === middleRow ? 30 : 40,
  });

  return (
    <>
      <motion.div
        style={{ translateX }}
        className="hover:z-50 relative grid gap-4 grid-cols-[repeat(7,1fr)] will-change-[transform,filter] size-full"
      >
        {row.map((card, i) => {
          return (
            <Card
              key={card.id}
              card={card}
              index={i}
              onImageLoad={onImageLoad}
              hasLoaded={hasLoaded}
            />
          );
        })}
      </motion.div>
    </>
  );
}

function Card({ card, index, onImageLoad, hasLoaded }) {
  const { intro } = useStore();
  const max = 10;
  const min = 1;
  const rand = Math.floor(Math.random() * (max - min + 1) + min);
  const delay = rand / 10;
  const isHero = card.layoutId === "hero-layout-image";
  const isRendered = !intro && isHero;
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0,
        },
        animate: {
          scale: 1,
        },
      }}
      initial="initial"
      animate={hasLoaded ? "animate" : "initial"}
      transition={{
        duration: 1,
        delay: 0.4 + delay,
        ease: [0, 0.25, 0, 0.99],
      }}
      className="relative size-full overflow-hidden rounded-xl"
    >
      {!isRendered && (
        <MotionImage
          priority
          src={card.img}
          fill
          alt="dev"
          //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          layoutId={card.layoutId}
          onLoad={() => onImageLoad(card.id)}
          className="object-cover [background-position:_50%_70%;] will-change-[transform,_filter]"
        />
      )}
    </motion.div>
  );
}
/* 
--to fix layoutId bug--
1. Remove conditional render & AnimatePresence in IntroWrapper.jsx
2. Unmount Intro by setting store state in onLayoutAnimationComplete event
3. Put Explore button in Intro2.jsx inside of overlay so the hero layout doesnt clip over it then animate it nicely

function Card({ card, index, onImageLoad, hasLoaded }) {
  const { intro } = useStore();
  const max = 10;
  const min = 1;
  const rand = Math.floor(Math.random() * (max - min + 1) + min);
  const delay = rand / 10;
  const isHero = card.layoutId === "hero-layout-image";
  const isRendered = !intro && isHero;

  console.log(isRendered, card.layoutId);
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0,
        },
        animate: {
          scale: 1,
        },
      }}
      initial="initial"
      animate={hasLoaded ? "animate" : "initial"}
      transition={{
        duration: 1,
        delay: 0.4 + delay,
        ease: [0, 0.25, 0, 0.99],
      }}
      className="relative size-full overflow-hidden rounded-xl"
    >
      {!isRendered && (
        <MotionImage
          priority
          src={card.img}
          fill
          alt="dev"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          layoutId={card.layoutId}
          onLoad={() => onImageLoad(card.id)}
          className="object-cover [background-position:_50%_70%;] will-change-[transform,_filter]"
        />
      )}
    </motion.div>
  );
}
*/

export default function Intro2() {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const { introLoaded, setIntroLoaded, setIntro } = useStore();
  // Calculate total number of images
  const totalImages = introImages.reduce((total, row) => total + row.length, 0);

  const handleImageLoad = (imageId) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imageId);
      return newSet;
    });
  };

  useEffect(() => {
    if (loadedImages.size === totalImages) {
      setTimeout(() => {
        setIntroLoaded();
      }, 1000);
    }
  }, [loadedImages, totalImages]);
  return (
    <>
      <motion.div className=" grid pointer-events-auto bg-[#162300] gap-4 flex-none relative w-[200vw] h-[200vh] grid-rows-[repeat(5,1fr)] grid-cols-[100%] origin-[center_center] ">
        {introImages.map((row, i) => {
          return (
            <Row
              key={`img-${i}-${row.id}`}
              row={row}
              index={i}
              onImageLoad={handleImageLoad}
              hasLoaded={introLoaded}
            />
          );
        })}
      </motion.div>
      {introLoaded && (
        <div className="absolute !z-[999909] grid place-items-center size-full">
          <Magnetic range={200} actionArea="parent">
            <CanvasButton
              className="relative bg-[#915A08] text-white uppercase"
              onClick={() => setIntro(false)}
            >
              Explore
            </CanvasButton>
          </Magnetic>
        </div>
      )}
    </>
  );
}
