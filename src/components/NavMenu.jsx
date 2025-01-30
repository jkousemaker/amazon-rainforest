"use client";
import { motion, AnimatePresence } from "framer-motion";
import { TextureButton } from "./ui/TextureButton";
import { Volume2, VolumeOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { useStore } from "@/store";
const menuVariants = {
  open: {
    width: "480px",

    height: "450px",

    top: "-25px",

    right: "-25px",

    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },

  closed: {
    width: "100px",

    height: "40px",

    top: "0px",

    right: "0px",

    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function NavMenu({
  newsletterDialog,
  setNewsletterDialog,
  aboutUsDialog,
  setAboutUsDialog,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { intro } = useStore();
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: "-100%",
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      initial="initial"
      animate={intro ? "initial" : "animate"}
      transition={{
        duration: 0.5,
        delay: 1,
      }}
      className="flex flex-row flex-nowrap justify-between items-center gap-5 absolute z-[99999999999] right-[50px] top-[50px]"
    >
      <motion.div
        className="w-[480px] h-[650px] bg-[#426601] rounded-[25px] relative pointer-events-auto"
        variants={menuVariants}
        animate={menuOpen ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {menuOpen && (
            <Nav
              newsletterDialog={newsletterDialog}
              setNewsletterDialog={setNewsletterDialog}
              aboutUsDialog={aboutUsDialog}
              setAboutUsDialog={setAboutUsDialog}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <div className="absolute top-0 right-0 flex flex-row">
        <AudioTest />
        <NavMenuButton
          isOpen={menuOpen}
          setOpen={() => setMenuOpen(!menuOpen)}
        />
      </div>
    </motion.div>
  );
}

function AudioTest() {
  const { intro } = useStore();
  const audioRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const toggleAudio = () => {
    if (audioRef.current && !intro) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        audioRef.current.volume = 0.5;
      }
      setAudioPlaying(!audioPlaying);
    }
  };
  useEffect(() => {
    if (!intro) {
      setTimeout(() => {
        toggleAudio();
      }, 1000);
    }
  }, [intro]);
  return (
    <div className="mr-5  ">
      <TextureButton
        size="icon"
        variant="minimal"
        onClick={toggleAudio}
        className="pointer-events-auto"
      >
        {audioPlaying ? <Volume2 /> : <VolumeOff />}
      </TextureButton>
      <audio
        ref={audioRef}
        src="/background.mp3"
        loop
        volume="0.1"
        //onEnded={playNext} // Auto-play next track
      />
    </div>
  );
}
const perspectiveVariants = {
  initial: {
    opacity: 0,

    rotateX: 90,

    translateY: 80,

    translateX: -20,
  },

  enter: (i) => ({
    opacity: 1,

    rotateX: 0,

    translateY: 0,

    translateX: 0,

    transition: {
      duration: 0.65,

      delay: 0.5 + i * 0.1,

      ease: [0.215, 0.61, 0.355, 1],

      //opacity: { duration: 0.35 },
    },
  }),

  exit: {
    opacity: 0,

    transition: { duration: 0.5, type: "linear", ease: [0.76, 0, 0.24, 1] },
  },
};

function Nav({
  newsletterDialog = { newsletterDialog },
  setNewsletterDialog = { setNewsletterDialog },
  aboutUsDialog = { aboutUsDialog },
  setAboutUsDialog = { setAboutUsDialog },
}) {
  const lenis = useLenis();
  const scrollToDownload = () => {
    // You can use either of these methods
    lenis?.scrollTo("#download-section", { lerp: 0.1 }); // 1.5 seconds duration
  };
  return (
    <div className="flex flex-col justify-between pt-[100px] pb-[50px] px-[40px] h-full box-border">
      <div className="flex gap-2.5 flex-col">
        <div className="[perspective:_120px] [perspective-origin:_bottom]">
          <motion.button
            custom={0}
            variants={perspectiveVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            onClick={() => setAboutUsDialog(true)}
          >
            <p className="text-white text-[46px]">About us</p>
          </motion.button>
        </div>
        <div className="[perspective:_120px] [perspective-origin:_bottom]">
          <motion.button
            custom={1}
            variants={perspectiveVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            onClick={() => {
              setNewsletterDialog(true);
            }}
          >
            <p className="text-white text-[46px]">Newsletter</p>
          </motion.button>
        </div>
        <div className="[perspective:_120px] [perspective-origin:_bottom]">
          <motion.button
            custom={2}
            variants={perspectiveVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            onClick={() => {
              scrollToDownload();
            }}
          >
            <p className="text-white text-[46px]">Download</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function NavMenuButton({ isOpen, setOpen }) {
  return (
    <div className="relative w-[100px] pointer-events-auto h-[40px] cursor-pointer rounded-[25px] overflow-hidden">
      <motion.div
        className="relative size-full"
        animate={{ top: isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="size-full bg-[#426601] group "
          onClick={() => {
            setOpen();
          }}
        >
          <PerspectiveText label="Menu" color="white" />
        </div>

        <div
          className="size-full bg-black group "
          onClick={() => {
            setOpen();
          }}
        >
          <PerspectiveText label="Close" color="#426601" />
        </div>
      </motion.div>
    </div>
    // <div className="">
    //   <motion.button className=" pointer-events-auto">
    //     <div
    //       className=""
    //       onClick={() => {
    //         setOpen((prev) => !prev);
    //       }}
    //     >
    //       <PerspectiveText label="Menu" />
    //     </div>
    //     <motion.div
    //       transition={{
    //         duration: 0.5,
    //         type: "tween",
    //         ease: [0.76, 0, 0.24, 1],
    //       }}
    //       onClick={() => {
    //         toggleMenu();
    //       }}
    //     >
    //       <PerspectiveText label="Close" />
    //     </motion.div>
    //   </motion.button>
    // </div>
  );
}

function PerspectiveText({ label, color = "black" }) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full [transform-style:_preserve-3d] transition-transform duration-[0.75s] [transition-timing-function:_cubic-bezier(0.76,_0,_0.24,_1)]  group-hover:[transform:_rotateX(90deg)]">
      <p
        className="m-0  transition-all pointer-events-none duration-[0.75s] [transition-timing-function:_cubic-bezier(0.76,_0,_0.24,_1)]  uppercase group-hover:-translate-y-full group-hover:opacity-0"
        style={{ color: color }}
      >
        {label}
      </p>

      <p
        className="m-0  transition-all pointer-events-none duration-[0.75s] [transition-timing-function:_cubic-bezier(0.76,_0,_0.24,_1)] absolute origin-[bottom_center] [transform:_rotateX(-90deg)_translateY(9px)] opacity-0  uppercase group-hover:opacity-100"
        style={{ color: color }}
      >
        {label}
      </p>
    </div>
  );
}
