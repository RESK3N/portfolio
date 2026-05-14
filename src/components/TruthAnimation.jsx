import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const TruthAnimation = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animations scaled to scrollYProgress
  const bgDim = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], ['rgba(0,0,0,0)', '#020202', '#020202', 'rgba(0,0,0,0)']);
  
  // Phase 1: Sentence reveal and strike
  const sentenceOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 0.95], [0, 1, 1, 0]);
  const sentenceScale = useTransform(scrollYProgress, [0, 0.05], [0.98, 1]);
  
  // Strikethrough timing: occurs very early
  const strikeWidth = useTransform(scrollYProgress, [0.1, 0.25], ["0%", "110%"]);
  const strikeOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);
  
  // "Fake" vs "REAL." crossover: happens as strike completes
  const fakeOpacity = useTransform(scrollYProgress, [0.2, 0.35], [1, 0]);
  const realOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: '500vh',
        position: 'relative',
        zIndex: 5
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgDim,
        zIndex: 10,
        overflow: 'hidden',
        padding: '0 1.5rem'
      }}>
        
        {/* Cinematic Header Container */}
        <motion.div
          style={{
            opacity: sentenceOpacity,
            scale: sentenceScale,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.2rem', // Increased gap for clarity
          }}
        >
          {/* Subdued Intro Text - Made larger and more premium */}
          <span style={{ 
            fontSize: 'clamp(1.2rem, 5vw, 2.2rem)', 
            fontWeight: 600, 
            color: 'rgba(255,255,255,0.7)', 
            letterSpacing: '-0.02em'
          }}>
            Everything in this website is
          </span>

          {/* The Hero Replacement Container */}
          <div style={{ 
            position: 'relative', 
            height: '1.2em', 
            width: '100%',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            fontSize: 'clamp(3rem, 15vw, 7.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.06em'
          }}>
            {/* "Fake" - Fades out as REAL fades in */}
            <motion.span 
              style={{ 
                color: '#ff453a', 
                position: 'absolute',
                opacity: fakeOpacity
              }}
            >
              Fake
              <motion.div 
                style={{
                  position: 'absolute',
                  top: '55%',
                  left: '-5%',
                  width: strikeWidth,
                  height: '0.12em',
                  background: '#fff',
                  borderRadius: '100px',
                  zIndex: 2,
                  opacity: strikeOpacity,
                  boxShadow: '0 0 15px rgba(255,255,255,0.3)'
                }}
              />
            </motion.span>

            {/* "REAL." - Fades in as Fake fades out */}
            <motion.span
              style={{
                position: 'absolute',
                opacity: realOpacity,
                color: '#32d74b',
                textTransform: 'uppercase',
                textShadow: '0 0 50px rgba(50,215,75,0.6)',
                whiteSpace: 'nowrap',
                zIndex: 50, // Ultra-high z-index
                display: 'block'
              }}
            >
              REAL.
            </motion.span>
          </div>
        </motion.div>

        {/* SUBTITLE */}
        <motion.div
          style={{
            opacity: realOpacity,
            marginTop: '6rem',
            padding: '0.8rem 2rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '100px',
            fontSize: 'clamp(0.7rem, 3vw, 1.1rem)',
            fontWeight: 600,
            color: '#a1a1a6',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(10px)',
          }}
        >
          Handcrafted Intelligence
        </motion.div>
      </div>
    </div>
  );
};

export default TruthAnimation;
