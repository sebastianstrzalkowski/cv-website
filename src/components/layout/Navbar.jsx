import React from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Navbar = ({ activeSection, scrolled, isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  const { t } = useTranslation();

  return (
      <nav className={`fixed w-full ${scrolled ? 'bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-lg' : 'bg-transparent'} transition-all duration-300 text-white p-4 z-30 overflow-x-hidden`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold flex items-center truncate">
            <span className="text-green-400 mr-2">{'<'}</span>
            <span className="hidden sm:inline">{developerData.name}</span>
            <span className="sm:hidden">Sebastian S.</span>
            <span className="text-green-400 ml-2">{'/>'}</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('home')} className={`hover:text-green-400 transition-colors ${activeSection === 'home' ? 'text-green-400' : ''}`}>{t('nav.home')}</button>
            <button onClick={() => scrollToSection('about')} className={`hover:text-green-400 transition-colors ${activeSection === 'about' ? 'text-green-400' : ''}`}>{t('nav.about')}</button>
            <button onClick={() => scrollToSection('projects')} className={`hover:text-green-400 transition-colors ${activeSection === 'projects' ? 'text-green-400' : ''}`}>{t('nav.projects')}</button>
            <button onClick={() => scrollToSection('experience')} className={`hover:text-green-400 transition-colors ${activeSection === 'experience' ? 'text-green-400' : ''}`}>{t('nav.experience')}</button>
            <button onClick={() => scrollToSection('contact')} className={`hover:text-green-400 transition-colors ${activeSection === 'contact' ? 'text-green-400' : ''}`}>{t('nav.contact')}</button>
            <LanguageSwitcher />
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher small={true} />
            <button onClick={() => setIsMenuOpen(true)} className="text-white p-1">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-40 flex flex-col overflow-hidden">
              <div className="container mx-auto p-4 flex justify-end">
                <button onClick={() => setIsMenuOpen(false)} className="text-white">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center space-y-8 flex-grow">
                <button onClick={() => scrollToSection('home')} className="text-xl hover:text-green-400 transition-colors">{t('nav.home')}</button>
                <button onClick={() => scrollToSection('about')} className="text-xl hover:text-green-400 transition-colors">{t('nav.about')}</button>
                <button onClick={() => scrollToSection('projects')} className="text-xl hover:text-green-400 transition-colors">{t('nav.projects')}</button>
                <button onClick={() => scrollToSection('experience')} className="text-xl hover:text-green-400 transition-colors">{t('nav.experience')}</button>
                <button onClick={() => scrollToSection('contact')} className="text-xl hover:text-green-400 transition-colors">{t('nav.contact')}</button>
              </div>
            </div>
        )}
      </nav>
  );
};

export default Navbar;