"use client";
import { ArrowBigRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { animate, motion } from "framer-motion";

export const CustomButton = ({ children, ...props }) => {
  const letters = children.split("");
  return (
    <>
      <div className="absolute z-[9999999999] w-full h-full flex justify-center items-center [filter:_url('#gooey')]">
        <motion.button
          {...props}
          variants={{
            initial: {
              scale: 0,
            },
            animate: {
              scale: 1,
              transition: {
                delay: 1,
              },
            },
            whilehover: {
              scale: 1.1,
            },
            whiletap: {
              scale: 0.9,
            },
          }}
          initial="initial"
          animate="animate"
          whileHover="whilehover"
          whileTap="whiletap"
          transition={{
            type: "tween",
            duration: 0.3,
            ease: [0.165, 0.84, 0.44, 1],
          }}
          className="relative group  bg-secondary text-white inline-flex font-bold px-7 py-5 rounded-full text-xl leading-none tracking-wider items-center"
        >
          {children}
        </motion.button>
      </div>
    </>
  );
};
