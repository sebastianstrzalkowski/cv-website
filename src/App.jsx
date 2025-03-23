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
  Contact 
} from './components';

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