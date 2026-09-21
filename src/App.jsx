// src/App.jsx
import React from 'react';
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
      <div className="relative min-h-screen bg-[#060913] text-gray-100 selection:bg-emerald-500/30 selection:text-emerald-300">
        {/* Top Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Interactive Neural/Blockchain Network Canvas */}
        <NetworkBackground />

        {/* Floating Navbar */}
        <Navbar
          activeSection={activeSection}
          scrolled={scrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          scrollToSection={scrollToSection}
        />

        {/* Main Content Sections */}
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

        {/* Floating Back to Top button */}
        <BackToTop />
      </div>
    </LanguageProvider>
  );
};

export default App;