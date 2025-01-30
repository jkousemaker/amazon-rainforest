"use client";
import AnimatedCursor from "@/components/AnimatedCursor";

import ScrollTop from "@/components/ScrollTop";
import Intro2 from "./Intro2";
import { cn } from "@/lib/cn";
import { AnimatePresence } from "framer-motion";

import { useStore } from "@/store";

import Preloader2 from "./Preloader2";

export default function Overlay() {
  const { intro } = useStore();
  const elements = [
    {
      //file: AnimatedCursor,
      zIndex: 9999,
    },
    {
      //file: Preloader,
      zIndex: 999,
    },
  ];
  return (
    <>
      <div className="fixed inset-0 size-full  z-[999999] flex pointer-events-none">
        <OverlayElement
          key="preloader-wrapper"
          zIndex={999999}
          className="overflow-hidden absolute inset-0 size-full"
        >
          <Preloader2 />
        </OverlayElement>

        <OverlayElement zIndex={999999}>
          <AnimatedCursor />
        </OverlayElement>
        <OverlayElement zIndex={999}></OverlayElement>
        {!intro && (
          <OverlayElement zIndex={9999}>
            <ScrollTop />
          </OverlayElement>
        )}
      </div>
    </>
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
