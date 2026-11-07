import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { ArrowRight, ArrowDown, Code, FileText, Terminal, Shield, Layers, Cpu } from 'lucide-react';
import { m, AnimatePresence, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
// The CV modal (and the 30 KB CV markup inside it) loads only when someone asks for it.
const CvModal = lazy(() => import('../ui/CvModal'));
const preloadCvModal = () => import('../ui/CvModal');

const floatingBadges = [
  { text: 'Solidity / EVM', icon: Shield, color: 'bg-emerald-950/80 text-emerald-200 border-emerald-500/30', top: '10%', left: '-8%', delay: 0 },
  { text: 'Java & Spring Boot', icon: Terminal, color: 'bg-amber-950/80 text-amber-200 border-amber-500/30', bottom: '18%', left: '-10%', delay: 1.2 },
  { text: 'Ethereum & L2', icon: Layers, color: 'bg-teal-950/80 text-teal-200 border-teal-500/30', top: '22%', right: '-10%', delay: 0.6 },
  { text: 'Hyperledger & Cloud', icon: Cpu, color: 'bg-emerald-950/80 text-emerald-200 border-emerald-500/30', bottom: '10%', right: '-6%', delay: 1.8 },
];

const Hero = ({ scrollToSection }) => {
  const { t, i18n } = useTranslation();
  const titles = useMemo(() => t('hero.titles', { returnObjects: true }), [t, i18n.language]);
  const reduceMotion = useReducedMotion();
  const [titleIndex, setTitleIndex] = useState(0);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [cvModalMounted, setCvModalMounted] = useState(false);

  const openCvModal = () => {
    setCvModalMounted(true);
    setIsCvModalOpen(true);
  };

  useEffect(() => {
    if (reduceMotion || !Array.isArray(titles) || titles.length < 2) return undefined;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [reduceMotion, titles]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXSpring = useSpring(useTransform(mouseY, [-150, 150], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateYSpring = useSpring(useTransform(mouseX, [-150, 150], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const currentTitle = Array.isArray(titles) ? titles[titleIndex % titles.length] : '';

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/5 w-[450px] h-[450px] bg-teal-600/10 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-7/12 text-center lg:text-left"
          >
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs md:text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{t('hero.subtitle')}</span>
            </m.div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4">
              <span className="block text-gray-400 text-2xl sm:text-3xl font-medium mb-1">
                {t('hero.greeting')}
              </span>
              <span className="text-balance">{developerData.name}</span>
            </h1>

            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mb-6 overflow-hidden" aria-live="polite">
              <AnimatePresence mode="wait">
                <m.div
                  key={currentTitle}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-xl sm:text-2xl font-semibold text-emerald-400"
                >
                  {currentTitle}
                </m.div>
              </AnimatePresence>
            </div>

            <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              {t('developerData.about', { years: developerData.yearsOfExperience }).split('.')[0] + '.'}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <m.a
                href="#experience"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={(event) => { event.preventDefault(); scrollToSection('experience'); }}
                className="group min-h-12 bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-semibold px-7 py-3 rounded-full shadow-cta flex items-center transition-colors duration-200"
              >
                {t('hero.experienceButton')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={18} aria-hidden="true" />
              </m.a>

              <m.a
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={(event) => { event.preventDefault(); scrollToSection('projects'); }}
                className="group min-h-12 px-7 py-3 rounded-full bg-gray-900/80 text-gray-200 font-semibold border border-emerald-500/40 hover:border-emerald-400 hover:text-white flex items-center transition-colors duration-200"
              >
                {t('hero.projectsButton')}
                <Code className="ml-2 text-emerald-400" size={18} aria-hidden="true" />
              </m.a>

              <m.button
                type="button"
                onClick={openCvModal}
                onMouseEnter={preloadCvModal}
                onFocus={preloadCvModal}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group min-h-12 px-7 py-3 rounded-full bg-gray-900/80 text-gray-200 font-semibold border border-teal-500/40 hover:border-teal-400 hover:text-white flex items-center transition-colors duration-200"
              >
                {t('hero.downloadCvButton')}
                <FileText className="ml-2 text-teal-400" size={18} aria-hidden="true" />
              </m.button>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-5/12 flex justify-center relative select-none"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <m.div
              style={{ rotateX: rotateXSpring, rotateY: rotateYSpring, transformStyle: 'preserve-3d' }}
              className="relative p-2"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-emerald-500/30 rounded-full blur-2xl animate-spin-slow opacity-75 pointer-events-none" aria-hidden="true" />

              <div
                className="relative rounded-full w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-hidden border-4 border-emerald-400/40 shadow-card bg-gray-950/60"
                style={{ transform: 'translateZ(30px)' }}
              >
                <img
                  src="/images/sebastian-photo.jpg"
                  alt={t('hero.photoAlt')}
                  width={384}
                  height={384}
                  fetchpriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" aria-hidden="true" />
              </div>

              {floatingBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <m.div
                    key={badge.text}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: reduceMotion ? 0 : [0, -10, 0] }}
                    transition={{
                      opacity: { delay: 0.5 + badge.delay * 0.3, duration: 0.5 },
                      y: { repeat: Infinity, duration: 4.5 + idx, ease: 'easeInOut', delay: badge.delay },
                    }}
                    className={`hidden sm:flex absolute items-center gap-2 px-3.5 py-2 rounded-xl border shadow-card text-xs font-semibold ${badge.color}`}
                    style={{ top: badge.top, bottom: badge.bottom, left: badge.left, right: badge.right, transform: 'translateZ(50px)' }}
                  >
                    <Icon size={14} aria-hidden="true" />
                    <span>{badge.text}</span>
                  </m.div>
                );
              })}
            </m.div>
          </m.div>

        </div>
      </div>

      <m.button
        type="button"
        onClick={() => scrollToSection('about')}
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center min-h-11 px-3 text-gray-400 hover:text-emerald-300 transition-colors group"
      >
        <span className="text-xs tracking-widest uppercase mb-1">
          {t('hero.scrollDown')}
        </span>
        <ArrowDown className="text-emerald-400" size={18} aria-hidden="true" />
      </m.button>

      {cvModalMounted && (
        <Suspense fallback={null}>
          <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
        </Suspense>
      )}
    </section>
  );
};

export default Hero;
