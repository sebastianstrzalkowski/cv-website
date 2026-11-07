import React, { useRef, useState } from 'react';
import { m } from 'framer-motion';

const canHover =
  typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(16, 185, 129, 0.18)',
  borderColor = 'rgba(16, 185, 129, 0.35)',
  ...props
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setIsFocused(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsFocused(false);
  };

  return (
    <m.div
      ref={divRef}
      onMouseMove={canHover ? handleMouseMove : undefined}
      onMouseEnter={canHover ? handleMouseEnter : undefined}
      onMouseLeave={canHover ? handleMouseLeave : undefined}
      whileHover={canHover ? { y: -4, transition: { duration: 0.2, ease: 'easeOut' } } : undefined}
      className={`relative overflow-hidden rounded-2xl border border-gray-800/80 bg-gray-900/85 shadow-card transition-colors duration-300 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity: isFocused ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${borderColor}`,
        }}
      />
      <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
    </m.div>
  );
};

export default SpotlightCard;
