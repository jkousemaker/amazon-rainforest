"use client";
import Intro2 from "@/components/Intro2";
import { cn } from "@/lib/cn";

import { useStore } from "@/store";

export default function IntroWrapper() {
  const { intro } = useStore();
  return (
    <OverlayElement
      key="intro-wrapper"
      zIndex={10}
      className={cn(
        "w-full h-screen overflow-hidden absolute z-10 flex items-center justify-center    [background-size:_250px,_100%] transition-opacity delay-1000 duration-500 ease-in-out",
        !intro && "opacity-0"
      )}
    >
      <div
        className="absolute pointer-events-none inset-0 size-full z-[9999] opacity-50"
        style={{
          backgroundImage: `url(/img/noise.png), radial-gradient(circle, rgba(249, 161, 50, 0.459) 0%, transparent 100%)`,
          backgroundBlendMode: "overlay",
        }}
      />
      <Intro2 />
    </OverlayElement>
  );
}
function OverlayElement({ children, zIndex, className }) {
  return (
    <div
      className={cn("absolute inset-0 size-full flex-1 ", className)}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
}
