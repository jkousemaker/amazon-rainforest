"use client";

import SloganSection from "@/components/sections/SloganSection";
import AboutSection from "@/components/sections/AboutSection";
import CardSection from "@/components/sections/CardSection";
import MainSection from "@/components/sections/MainSection";

import { useStore } from "@/store";
import VideoSection from "@/components/sections/VideoSection";
import CardDevSection from "@/components/sections/CardDevSection";
import DownloadSection from "@/components/sections/DownloadSection";
import CarouselSection from "@/components/sections/Carousel";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useMotionValueEvent, useScroll } from "framer-motion";
export default function Home() {
  const { intro } = useStore();
  return (
    <>
      <div className="flex flex-col w-full relative z-50">
        {!intro && (
          <>
            <MainSection />
            <SloganSection />
            <VideoSection />
            <CarouselSection />

            <DownloadSection />
          </>
        )}
      </div>
    </>
  );
}
