import React, { useState, useEffect } from 'react';
import { ArrowRight, Code, Sparkles, Terminal, Shield, Layers, Cpu } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';

const titles = [
  "Senior DLT Engineer",
  "Blockchain Architect",
  "Java 17/21 & Spring Specialist",
  "Smart Contract Security Enthusiast",
  "Distributed Systems Builder"
];

const floatingBadges = [
  { text: "Solidity / EVM", icon: Shield, color: "from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/30", top: "10%", left: "-8%", delay: 0 },
  { text: "Java & Spring 3", icon: Terminal, color: "from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30", bottom: "18%", left: "-10%", delay: 1.2 },
  { text: "Ethereum & L2", icon: Layers, color: "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30", top: "22%", right: "-10%", delay: 0.6 },
  { text: "Hyperledger & Cloud", icon: Cpu, color: "from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30", bottom: "10%", right: "-6%", delay: 1.8 }
];

const Hero = ({ scrollToSection }) => {
  const { t } = useTranslation();
  const [titleIndex, setTitleIndex] = useState(0);

  // Cycling titles
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // 3D Tilt Physics for Profile Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-150, 150], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateYSpring = useSpring(useTransform(mouseX, [-150, 150], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/5 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column: Introduction & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-7/12 text-center lg:text-left"
          >
            {/* Live Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs md:text-sm font-medium mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t('hero.subtitle')}</span>
            </motion.div>

            {/* Greeting & Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4">
              <span className="block text-gray-400 text-2xl sm:text-3xl font-medium mb-1 font-mono">
                {t('hero.greeting')}
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                {developerData.name}
              </span>
            </h1>

            {/* Dynamic Rotating Subtitle */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={titleIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-center text-xl sm:text-2xl font-semibold text-emerald-400 font-mono"
                >
                  <Sparkles size={20} className="mr-2 text-cyan-400 animate-pulse" />
                  <span>{titles[titleIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bio summary */}
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('developerData.about', { years: developerData.yearsOfExperience }).split('.')[0] + '.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {/* Experience Button */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection('experience')}
                className="relative group overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-7 py-3.5 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center cursor-pointer transition-all duration-300"
              >
                {/* Button shine sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <span className="relative z-10 flex items-center">
                  {t('hero.experienceButton')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} />
                </span>
              </motion.button>

              {/* Projects Button */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection('projects')}
                className="relative group px-7 py-3.5 rounded-full bg-gray-900/80 text-gray-200 font-semibold border border-emerald-500/40 hover:border-emerald-400 hover:text-white backdrop-blur-md shadow-lg flex items-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <span className="relative z-10 flex items-center">
                  {t('hero.projectsButton')}
                  <Code className="ml-2 text-emerald-400 group-hover:rotate-12 transition-transform duration-200" size={18} />
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: 3D Tilt Avatar & Orbiting Holographic Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-5/12 flex justify-center relative select-none"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d"
              }}
              className="relative p-2"
            >
              {/* Radiant Rotating Aura Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-cyan-500/30 rounded-full blur-2xl animate-spin-slow opacity-75 pointer-events-none" />

              {/* Avatar Frame with Glassmorphic Border */}
              <div
                className="relative rounded-full w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-hidden border-4 border-emerald-400/40 shadow-2xl bg-gray-950/60 backdrop-blur-md"
                style={{ transform: "translateZ(30px)" }}
              >
                <img
                  src="/images/sebastian-photo.jpg"
                  alt={`${developerData.name} - ${t('jobTitle.softwareDeveloper')}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 pointer-events-none" />
              </div>

              {/* Orbiting Tech Floating Badges */}
              {floatingBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ 
                      opacity: 1, 
                      y: [0, -10, 0],
                    }}
                    transition={{
                      opacity: { delay: 0.5 + badge.delay * 0.3, duration: 0.5 },
                      y: {
                        repeat: Infinity,
                        duration: 4.5 + idx,
                        ease: "easeInOut",
                        delay: badge.delay,
                      }
                    }}
                    className={`hidden sm:flex absolute items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-md border bg-gradient-to-br shadow-xl text-xs font-semibold ${badge.color}`}
                    style={{
                      top: badge.top,
                      bottom: badge.bottom,
                      left: badge.left,
                      right: badge.right,
                      transform: "translateZ(50px)"
                    }}
                  >
                    <Icon size={14} className="animate-pulse" />
                    <span>{badge.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <motion.button
        onClick={() => scrollToSection('about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer group"
      >
        <span className="text-xs font-mono tracking-widest uppercase mb-1 group-hover:text-emerald-300">
          {t('hero.scrollDown')}
        </span>
        <ArrowRight className="transform rotate-90 text-emerald-400" size={18} />
      </motion.button>
    </section>
  );
};

export default Hero;