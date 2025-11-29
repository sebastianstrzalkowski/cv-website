import React from 'react';
import { ArrowRight, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import developerData from '../../data/developerData';
import RevealOnScroll from '../ui/RevealOnScroll';

const Hero = ({ scrollToSection }) => {
  const { t } = useTranslation();
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Green gradient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500 rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-4 py-20 z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <RevealOnScroll width="100%">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <div className="mb-4 inline-block">
                <span className="inline-block bg-green-500 bg-opacity-20 text-green-400 px-4 py-1 rounded-full text-sm font-medium">{t('hero.subtitle')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="block">{t('hero.greeting')}</span>
                <span className="block mt-2 text-green-400">{developerData.firstName}</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                {t('developerData.about').split('.')[0] + '.'}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button onClick={() => scrollToSection('experience')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center transition-all transform hover:translate-y-[-2px]">
                  {t('hero.experienceButton')} <ArrowRight className="ml-2" size={18} />
                </button>
                <button onClick={() => scrollToSection('projects')} className="border border-green-500 text-green-400 hover:bg-green-500 hover:bg-opacity-10 px-6 py-3 rounded-full flex items-center transition-all">
                  {t('hero.projectsButton')} <Code className="ml-2" size={18} />
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                {/* Background shape */}
                <div className="absolute -inset-1 bg-green-500 bg-opacity-20 rounded-full blur-md"></div>

                {/* Image with glow effect */}
                <div className="relative rounded-full w-72 h-72 md:w-96 md:h-96 overflow-hidden border-4 border-green-500 border-opacity-40">
                  <img
                    src="/images/sebastian-photo.jpg"
                    alt={`${developerData.name} - ${t('jobTitle.softwareDeveloper')}`}
                    className="w-full h-full object-cover transform scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-900 to-gray-900 opacity-30"></div>
                </div>
              </div>
            </div>
          </div>

        </RevealOnScroll>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-green-400 text-sm mb-2">{t('hero.scrollDown')}</span>
        <ArrowRight className="text-green-400 transform rotate-90" size={20} />
      </div>
    </section>
  );
};

export default Hero;