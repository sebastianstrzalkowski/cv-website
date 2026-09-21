import React from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const navItems = [
  { id: 'home', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'media', key: 'nav.media' },
  { id: 'conferences', key: 'nav.conferences' },
  { id: 'trainings', key: 'nav.trainings' },
  { id: 'contact', key: 'nav.contact' },
];

const Navbar = ({ activeSection, scrolled, isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4 pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'w-full max-w-6xl rounded-full bg-gray-950/80 backdrop-blur-xl border border-emerald-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-5 py-2.5'
            : 'w-full max-w-7xl rounded-full bg-gray-900/40 backdrop-blur-md border border-white/5 px-6 py-3'
        }`}
      >
        {/* Brand Logo */}
        <motion.button
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="text-lg md:text-xl font-bold flex items-center group cursor-pointer focus:outline-none"
        >
          <span className="text-emerald-400 group-hover:text-cyan-400 transition-colors mr-1 font-mono font-semibold">
            {'<'}
          </span>
          <span className="text-white group-hover:text-emerald-300 transition-colors tracking-wide hidden sm:inline">
            {developerData.name}
          </span>
          <span className="text-white group-hover:text-emerald-300 transition-colors tracking-wide sm:hidden">
            Sebastian S.
          </span>
          <span className="text-emerald-400 group-hover:text-cyan-400 transition-colors ml-1 font-mono font-semibold">
            {'/>'}
          </span>
        </motion.button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)] -z-10"
                  />
                )}
                {t(item.key)}
              </button>
            );
          })}
          <div className="pl-2 border-l border-gray-700/60">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Tablet Navigation (compact) */}
        <div className="hidden md:flex lg:hidden items-center space-x-2">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                activeSection === item.id ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-gray-300'
              }`}
            >
              {t(item.key)}
            </button>
          ))}
          <LanguageSwitcher small={true} />
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1.5 rounded-lg bg-gray-800 text-gray-200 hover:text-emerald-400"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <LanguageSwitcher small={true} />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-gray-800/80 border border-gray-700 text-white hover:text-emerald-400 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-gray-950/90 z-50 flex flex-col p-6 pointer-events-auto md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="text-xl font-bold text-white font-mono">
                <span className="text-emerald-400">{'<'}</span>
                Sebastian S.
                <span className="text-emerald-400">{'/>'}</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full bg-gray-800 border border-gray-700 text-white"
              >
                <X size={22} />
              </motion.button>
            </div>

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-col space-y-3 flex-grow justify-center"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 },
                    }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left text-xl font-semibold px-4 py-3 rounded-xl transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'text-gray-200 hover:bg-gray-800/60'
                    }`}
                  >
                    <span>{t(item.key)}</span>
                    {isActive && <Sparkles size={18} className="text-emerald-400" />}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;