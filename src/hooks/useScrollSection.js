import { useState, useEffect, useRef } from 'react';

const sectionOrder = [
  'home',
  'about',
  'experience',
  'projects',
  'media',
  'conferences',
  'trainings',
  'contact'
];

const useScrollSection = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 40);

      // If user triggered smooth scroll via click, wait until scroll completes
      if (isClickScrolling.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // If at top of the page
      if (scrollPosition < 100) {
        setActiveSection('home');
        return;
      }

      // If scrolled near bottom of the page, activate last section
      if (windowHeight + scrollPosition >= documentHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // Focus line at ~35% from the top of the viewport
      const focusPoint = scrollPosition + windowHeight * 0.35;

      let currentSection = 'home';
      for (const id of sectionOrder) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (focusPoint >= top && focusPoint < top + height) {
            currentSection = id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    };
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);

    isClickScrolling.current = true;
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    activeSection,
    setActiveSection,
    isMenuOpen,
    setIsMenuOpen,
    scrolled,
    scrollToSection
  };
};

export default useScrollSection;