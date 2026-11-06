import React from 'react';
import { MotionConfig } from 'framer-motion';
import useScrollSection from './hooks/useScrollSection';
import { LanguageProvider } from './context/LanguageContext';
import {
  Navbar,
  Footer,
  Hero,
  About,
  Experience,
  Projects,
  Media,
  Conferences,
  Trainings,
  Contact
} from './components';
import { NetworkBackground, ScrollProgressBar, BackToTop } from './components/ui';

const App = () => {
  const {
    activeSection,
    isMenuOpen,
    setIsMenuOpen,
    scrolled,
    scrollToSection
  } = useScrollSection();

  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen bg-brand-darker text-gray-100">
          <ScrollProgressBar />
          <NetworkBackground />

          <Navbar
            activeSection={activeSection}
            scrolled={scrolled}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            scrollToSection={scrollToSection}
          />

          <main className="relative z-10">
            <Hero scrollToSection={scrollToSection} />
            <About />
            <Experience />
            <Projects />
            <Media />
            <Conferences />
            <Trainings />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
        </div>
      </MotionConfig>
    </LanguageProvider>
  );
};

export default App;
