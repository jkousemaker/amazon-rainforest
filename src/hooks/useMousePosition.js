import React from "react";
import { useMotionValue } from "framer-motion";

function useMousePosition() {
  const mousePosition = {
    x: useMotionValue(0),

    y: useMotionValue(0),
  };

  React.useEffect(() => {
    const updateMousePosition = (ev) => {
      mousePosition.x.set(ev.clientX);
      mousePosition.y.set(ev.clientY);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
}

export default useMousePosition;
