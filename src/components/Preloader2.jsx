"use client";
import {
  AnimatePresence,
  motion,
  useTransform,
  cubicBezier,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useLenis } from "@studio-freight/react-lenis";
import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { useStore } from "@/store";

import { TextureButton } from "./ui/TextureButton";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/core/dialog";
import {
  FloatingPanelBody,
  FloatingPanelButton,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelHeader,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
} from "@/components/core/floating-panel";
import { Volume, Volume2, VolumeOff, VolumeX } from "lucide-react";
import AudioPlayer from "react-h5-audio-player";
import { BorderTrail } from "./core/border-trail";
import useScreenSize from "@/hooks/useScreenSize";
import { Magnetic } from "./core/magnetic";
import NavMenu from "./NavMenu";
const tileAmount = 15;
export default function Preloader2() {
  const [newsletterDialog, setNewsletterDialog] = useState(false);
  const [aboutUsDialog, setAboutUsDialog] = useState(false);
  const { introLoaded, intro } = useStore();

  return (
    <motion.div
      initial="open"
      animate={introLoaded ? "closed" : "open"}
      className="fixed z-[999] inset-0 pointer-events-none grid place-items-center"
    >
      <header className="absolute z-50 top-0 left-0 w-full flex flex-row justify-between px-5 py-4">
        {introLoaded && (
          <motion.div className="size-20">
            <LogoContainer />
          </motion.div>
        )}

        <NavMenu
          newsletterDialog={newsletterDialog}
          setNewsletterDialog={setNewsletterDialog}
          aboutUsDialog={aboutUsDialog}
          setAboutUsDialog={setAboutUsDialog}
        />

        <NewsletterDialog
          newsletterDialog={newsletterDialog}
          setNewsletterDialog={setNewsletterDialog}
        />
        <AboutUsDialog
          aboutUsDialog={aboutUsDialog}
          setAboutUsDialog={setAboutUsDialog}
        />
      </header>
      {!introLoaded && (
        <div className="size-60 md:size-[18rem]">
          <motion.div
            className="relative size-full z-50 "
            variants={{
              open: {
                y: 0,
              },
              closed: {
                y: "-100%",
              },
            }}
            initial={{ scale: 0, y: "100%", x: "-100%", rotate: -80 }}
            animate={{ scale: 1, y: 0, x: 0, rotate: 0 }}
            transition={{
              type: "tween",
              duration: 1,
              ease: [0.06, 0.07, 0.02, 0.95],
            }}
          >
            <LogoContainer />
          </motion.div>
        </div>
      )}
      <motion.div
        initial="open"
        animate={introLoaded ? "closed" : "open"}
        transition={{ staggerChildren: 0.05 }}
        className="absolute z-0 inset-0   flex flex-row justify-center items-center til pointer-events-none"
      >
        {Array.from({ length: tileAmount }).map((_, i) => {
          return <Tile key={i} />;
        })}
      </motion.div>
    </motion.div>
  );
}

function Tile({}) {
  const container = useRef(null);
  const screenSize = useScreenSize(); // { width, height }
  const middleIndex = Math.floor(20 / 2);
  const { scrollYProgress } = useScroll({
    target: container,
    offsets: ["start end", "start start"],
  });
  const distanceFromMiddle = Math.abs(-middleIndex);
  const isActive = scrollYProgress.get() > 0.5;
  const y = useTransform(
    scrollYProgress,
    [distanceFromMiddle, 1],
    [screenSize.height, 0],
    { clamp: true, ease: cubicBezier(0.31, 0.58, 0.48, 0.99) }
  );
  return (
    <motion.div
      variants={{
        open: {
          y: 0,
        },
        closed: {
          y: "-100%",
        },
      }}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: [0.78, 0.15, 0.84, 0.67],
      }}
      className="relative flex-1 flex  h-full w-full"
    >
      <motion.div className="h-full flex-1 bg-gradient-to-r from-black to-[#162300] relative  w-20 pointer-events-auto" />
    </motion.div>
  );
}

function AboutUsDialog({ aboutUsDialog, setAboutUsDialog }) {
  const customVariants = {
    initial: {
      opacity: 0,
      scale: 0,
      y: "-100%",
      x: "100%",
      rotate: 30,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.4,
      y: "100%",
      transition: {
        type: "spring",
        duration: 0.5,
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  const customTransition = {
    type: "spring",
    bounce: 0,
    duration: 1,
  };
  return (
    <Dialog
      open={aboutUsDialog}
      onOpenChange={setAboutUsDialog}
      variants={customVariants}
      transition={customTransition}
    >
      <DialogContent className="w-full max-w-2xl bg-[#426601] p-8 rounded-3xl border-none">
        <DialogHeader className="mb-16">
          <DialogTitle className="text-white text-3xl leading-snug font-semibold mb-6">
            Who are we?
          </DialogTitle>
          <DialogDescription className="text-white text-xl leading-7 font-medium">
            We are students from Creative Technologies at IADE, developing a
            gamified project about the Amazon Rainforest.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row justify-around">
          <motion.div
            initial={{ scale: 0, rotate: 0, x: 0 }}
            animate={{ scale: 1, rotate: -10, x: 30 }}
            transition={{
              delay: 0.6,
              duration: 0.3,
              ease: [0.4, 0.4, 0.17, 0.89],
            }}
            className="w-[180px] z-50 origin-bottom h-[247px] bg-white relative p-3 flex justify-center items-end"
          >
            <Image
              priority
              src="/img/rita.jpg"
              alt="Picture of Rita Paredes"
              className="size-full object-cover absolute"
              fill
            />
            <p className="relative z-50 text-white text-xl leading-6 font-semibold text-center ">
              Rita <br /> Paredes
            </p>
          </motion.div>
          <motion.div
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: 1, y: -15 }}
            transition={{
              delay: 0.5,
              duration: 0.3,
              ease: [0.4, 0.4, 0.17, 0.89],
            }}
            className="w-[180px] origin-bottom h-[247px] bg-white relative p-3 flex justify-center items-end"
          >
            <Image
              priority
              src="/img/gabryella.jpg"
              alt="Picture of Gabryella Teixeira"
              className="size-full object-cover absolute"
              fill
            />
            <p className="relative z-50 text-white text-xl leading-6 font-semibold text-center  ">
              Gabryella <br /> Teixeira
            </p>
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: 0, x: 0 }}
            animate={{ scale: 1, rotate: 10, x: -30 }}
            transition={{
              delay: 0.7,
              duration: 0.3,
              ease: [0.4, 0.4, 0.17, 0.89],
            }}
            className="w-[180px] z-50 origin-bottom h-[247px] bg-white relative p-3 flex justify-center items-end"
          >
            <Image
              priority
              src="/img/leonor.jpg"
              alt="Picture of Leonor Batista"
              className="size-full object-cover absolute"
              fill
            />
            <p className="relative z-50 text-white text-xl leading-6 font-semibold text-center ">
              Leonor <br /> Batista
            </p>
          </motion.div>
        </div>
        <DialogClose className="text-white" />
      </DialogContent>
    </Dialog>
  );
}

function NewsletterDialog({ newsletterDialog, setNewsletterDialog }) {
  const [loading, setLoading] = useState(false);
  const customVariants = {
    initial: {
      opacity: 0,
      scale: 0,
      y: "-100%",
      x: "100%",
      rotate: 30,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      rotate: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.4,
      y: "100%",
      transition: {
        type: "spring",
        duration: 0.5,
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  const customTransition = {
    type: "spring",
    bounce: 0,
    duration: 1,
  };
  return (
    <Dialog
      open={newsletterDialog}
      onOpenChange={setNewsletterDialog}
      variants={customVariants}
      transition={customTransition}
    >
      <DialogContent className="w-full max-w-md bg-[#426601] p-8 rounded-3xl border-none">
        <DialogHeader>
          <DialogTitle className="text-white text-4xl leading-snug">
            Join our
            <br />
            <span className="text-[#96c93d]">newsletter</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 flex flex-col space-y-4">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="input"
            type="input"
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 outline-none focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5 sm:text-sm"
            placeholder="Email"
          />
          <TextureButton
            onClick={() => setLoading(true)}
            loading={loading}
            className=" ml-auto !mt-10 w-full"
          >
            Subscribe
          </TextureButton>
        </div>
        <DialogClose className="text-white" />
      </DialogContent>
    </Dialog>
  );
}

function LogoContainer() {
  return (
    <motion.div
      layoutId="layout-page-logo"
      transition={{
        layout: {
          type: "spring",
          stiffness: 100,
          damping: 20,
        },
      }}
      className="relative z-50 w-full h-full pointer-events-auto"
    >
      <Logo />
    </motion.div>
  );
}
