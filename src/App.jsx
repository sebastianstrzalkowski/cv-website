// src/App.jsx
import React from 'react';
import useScrollSection from './hooks/useScrollSection';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Media from './components/sections/Media.jsx';
import Conferences from './components/sections/Conferences';
import Contact from './components/sections/Contact';

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
        <div className="relative overflow-x-hidden">
          <Navbar
              activeSection={activeSection}
              scrolled={scrolled}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              scrollToSection={scrollToSection}
          />
          <Hero scrollToSection={scrollToSection} />
          <About />
          <Experience />
          <Projects />
          <Media />
          <Conferences />
          <Contact />
          <Footer />
        </div>
      </LanguageProvider>
  );
};

export default App;