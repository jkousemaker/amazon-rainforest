"use client";
import { motion } from "framer-motion";
import { useState, Suspense, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { MagnifyIcon } from "@/components/MagnifyIcon";
const CanvasButton = forwardRef(({ children, className, ...props }, ref) => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.button
      className={cn(
        "appearance-none  border-none cursor-pointer bg-white text-[#5e5e5e] rounded-3xl p-6 pl-[60px]  text-4xl tracking-[-1px] font-semibold leading-[40px] shadow-[0px_40px_80px_0px_rgba(0,_0,_0,_0.05),_inset_0px_-10px_20px_0px_rgba(0,_0,_0,_0.05),_0px_10px_20px_0px_rgba(0,_0,_0,_0.05)] h-20  text-center flex absolute bottom-0 left-0 items-center",
        className
      )}
      initial={false}
      animate={[isOpen ? "open" : "closed", isHover ? "hover" : "rest"]}
      whileTap="press"
      variants={buttonVariants}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      <motion.div
        className="block  w-[600px] h-[300px] origin-[50_52%] z-[1] pointer-events-none absolute top-[-100px] left-[-270px]"
        variants={{
          open: { opacity: 0, transition: iconFadeTransition },
          hover: isOpen
            ? { opacity: 0, transition: iconFadeTransition }
            : { opacity: 1 },
        }}
      >
        <Suspense fallback={null}>
          <MagnifyIcon isHover={isHover} isOpen={isOpen} />
        </Suspense>
      </motion.div>
      <div className="label">
        <motion.span variants={labelTextVariants} className="default">
          {children}
        </motion.span>
      </div>
    </motion.button>
  );
});
CanvasButton.displayName = "CanvasButton";
const iconFadeTransition = { duration: 0.2, delay: 0.3 };
const buttonVariants = {
  rest: {
    "--button-star-greyscale": "100%",
    "--button-star-contrast": "0%",
    transition: { duration: 0.7 },
  },
  hover: {
    "--button-star-greyscale": "0%",
    "--button-star-contrast": "100%",
    scale: 1.1,
    y: -8,
  },
  press: { scale: 1.1 },
};
const labelTextVariants = {
  closed: { x: 24 },
  open: { x: -46 },
};

const successTextVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const openTransition = {
  duration: 0.25,
  delay: 0.3,
};

const currentCountVariants = {
  closed: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  open: { opacity: 0, y: -40, transition: openTransition },
};

const newCountVariants = {
  closed: { opacity: 0, y: 40, transition: { duration: 0.25 } },
  open: { opacity: 1, y: 0, transition: openTransition },
};

export default CanvasButton;
