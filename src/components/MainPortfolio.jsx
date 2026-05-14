import { useEffect } from 'react';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import BuiltWith from './BuiltWith';
import ResumeDownload from './ResumeDownload';

function MainPortfolio() {
  useEffect(() => {
    // Smooth scrolling for anchor links if any
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="app">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <ResumeDownload />
      <BuiltWith />
      <Contact />
    </div>
  );
}

export default MainPortfolio;
