import { useEffect } from 'react';
import { useDevice } from '../hooks/useDevice';
import MobilePortfolio from './MobilePortfolio';
import Hero from './Hero';
import TruthAnimation from './TruthAnimation';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import BuiltWith from './BuiltWith';
import ResumeDownload from './ResumeDownload';

import InteractiveBackground from './InteractiveBackground';

function MainPortfolio() {
  const { isMobile } = useDevice();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return (
    <div className="app" style={{ position: 'relative', zIndex: 1 }}>
      <InteractiveBackground />
      <Hero />
      <TruthAnimation />
      <Experience />
      <Projects />
      <About />
      <Skills />
      <ResumeDownload />
      <BuiltWith />
      <Contact />
    </div>
  );
}

export default MainPortfolio;
