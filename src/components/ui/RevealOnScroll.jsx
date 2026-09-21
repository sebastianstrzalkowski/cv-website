import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const RevealOnScroll = ({
  children,
  width = "100%",
  delay = 0.15,
  duration = 0.6,
  direction = "up",
  once = false,
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const getDirectionOffset = () => {
    switch (direction) {
      case "up": return { y: 40, x: 0 };
      case "down": return { y: -40, x: 0 };
      case "left": return { x: 40, y: 0 };
      case "right": return { x: -40, y: 0 };
      default: return { y: 40, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <div ref={ref} className={`relative overflow-visible ${className}`} style={{ width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: offset.x, y: offset.y },
          visible: { 
            opacity: 1, 
            x: 0, 
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.1, 0.25, 1], // cubic bezier for natural deceleration
            }
          },
        }}
        initial="hidden"
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealOnScroll;
