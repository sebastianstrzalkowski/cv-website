import React, { useEffect, useRef, useState } from 'react';
import { m, useInView, useAnimation, useReducedMotion } from 'framer-motion';

// Content is visible in the prerendered HTML (agents, crawlers, no-JS readers and screenshots).
// After hydration, only blocks that start below the fold are hidden and then revealed once.
const RevealOnScroll = ({
  children,
  width = "100%",
  delay = 0.15,
  duration = 0.6,
  direction = "up",
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    if (ref.current.getBoundingClientRect().top > window.innerHeight) {
      controls.set("hidden");
      setArmed(true);
    }
  }, [controls, reduceMotion]);

  useEffect(() => {
    if (armed && isInView) controls.start("visible");
  }, [armed, isInView, controls]);

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
      <m.div
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
        initial={false}
        animate={controls}
      >
        {children}
      </m.div>
    </div>
  );
};

export default RevealOnScroll;
