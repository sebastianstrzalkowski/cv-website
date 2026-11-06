import React, { useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import useFocusTrap from '../../hooks/useFocusTrap';

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
  const menuRef = useRef(null);
  const closeMenu = () => setIsMenuOpen(false);

  useFocusTrap(menuRef, isMenuOpen, closeMenu);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4 pointer-events-none">
      <nav
        aria-label={t('nav.menu')}
        className={`pointer-events-auto flex items-center justify-between transition-[max-width,padding,background-color,border-color] duration-300 ${
          scrolled
            ? 'w-full max-w-6xl rounded-full bg-gray-950/85 backdrop-blur-xl border border-emerald-500/20 shadow-card px-5 py-2'
            : 'w-full max-w-7xl rounded-full bg-gray-900/40 backdrop-blur-md border border-white/5 px-6 py-2.5'
        }`}
      >
        <motion.button
          type="button"
          onClick={() => scrollToSection('home')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="text-lg md:text-xl font-bold flex items-center group min-h-10 rounded-full px-1"
        >
          <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors mr-1 font-mono font-semibold" aria-hidden="true">
            {'<'}
          </span>
          <span className="text-white group-hover:text-emerald-300 transition-colors tracking-wide hidden sm:inline">
            {developerData.name}
          </span>
          <span className="text-white group-hover:text-emerald-300 transition-colors tracking-wide sm:hidden">
            Sebastian S.
          </span>
          <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors ml-1 font-mono font-semibold" aria-hidden="true">
            {'/>'}
          </span>
        </motion.button>

        {/* Desktop */}
        <div className="hidden lg:flex items-center space-x-1 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative min-h-10 px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-400/50 -z-10"
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

        {/* Tablet */}
        <div className="hidden md:flex lg:hidden items-center space-x-1">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-current={activeSection === item.id ? 'true' : undefined}
              className={`min-h-9 px-2.5 text-xs rounded-full transition-colors ${
                activeSection === item.id ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t(item.key)}
            </button>
          ))}
          <LanguageSwitcher small />
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label={t('nav.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-gray-200 hover:text-emerald-400 transition-colors"
          >
            <Menu size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher small />
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-gray-800/80 border border-gray-700 text-white hover:text-emerald-400 transition-colors"
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-950/95 backdrop-blur-xl z-50 flex flex-col p-6 pointer-events-auto lg:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="text-xl font-bold text-white font-mono">
                <span className="text-emerald-400" aria-hidden="true">{'<'}</span>
                Sebastian S.
                <span className="text-emerald-400" aria-hidden="true">{'/>'}</span>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={closeMenu}
                aria-label={t('nav.closeMenu')}
                className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-gray-800 border border-gray-700 text-white"
              >
                <X size={22} aria-hidden="true" />
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
                    type="button"
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 },
                    }}
                    whileTap={{ scale: 0.96 }}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => {
                      scrollToSection(item.id);
                      closeMenu();
                    }}
                    className={`text-left text-xl font-semibold px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-gray-200 hover:bg-gray-800/60'
                    }`}
                  >
                    {t(item.key)}
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
