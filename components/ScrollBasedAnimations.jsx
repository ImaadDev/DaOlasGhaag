"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const ScrollBasedAnimation = ({
  children,
  threshold = 0.2,
  delay = 0,
  duration = 0.6,
  offset = 70,
  direction = "up",
}) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        } else {
          setIsVisible(false);
          controls.start("hidden");
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls, threshold]);

  // Determine offset direction
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: offset };
      case "down":
        return { y: -offset };
      case "left":
        return { x: offset };
      case "right":
        return { x: -offset };
      default:
        return { y: offset };
    }
  };

  const variants = {
    hidden: { opacity: 0, ...getOffset() },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollBasedAnimation;
