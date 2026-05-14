import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const TruthAnimation = () => {
  const containerRef = useRef(null);
  
  // High-precision scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Initial Sentence Controls
  // Sentence stays fully visible until the very end of the section
  const sentenceOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 0.98], [0, 1, 1, 0]);
  const sentenceScale = useTransform(scrollYProgress, [0, 0.1], [0.95, 1]);
  
  // 2. Strike-through Logic (Targets ONLY "Fake")
  // Finishes at 0.3
  const strikeWidth = useTransform(scrollYProgress, [0.1, 0.3], ["0%", "100%"]);
  const strikeOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);

  // 3. THE REVEAL: "REAL"
  // Reaches full opacity (1.0) at 0.25, which is BEFORE the strikethrough finishes at 0.3
  const realOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.9, 0.98], [0, 1, 1, 0]);

  // 4. Background Dimming (Subtle effect)
  const bgDim = useTransform(scrollYProgress, [0.4, 0.6], ["#000", "#050505"]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: '400vh', // Significant scroll height for dramatic pacing
        position: 'relative',
        background: bgDim,
        zIndex: 5
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        
        {/* FIRST PHASE: The Complete Sentence */}
        <motion.h2
          style={{
            opacity: sentenceOpacity,
            scale: sentenceScale,
            textAlign: 'center',
            width: '100%',
            maxWidth: '1400px',
            fontSize: 'clamp(1.8rem, 5vw, 4rem)', // Scaled down to guarantee single-line fit
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#fff',
            lineHeight: 1.2,
            padding: '0 2rem',
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: '0.3em',
            zIndex: 10
          }}
        >
          <span>Everything in this website is</span>
          <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', color: '#ff453a' }}> {/* Apple Red */}
            Fake
            <motion.div 
              style={{
                position: 'absolute',
                top: '55%',
                left: '-5%',
                width: strikeWidth,
                height: '0.12em',
                background: '#fff', // White strikethrough for contrast against red
                borderRadius: '100px',
                zIndex: 2,
                opacity: strikeOpacity,
                boxShadow: '0 0 10px rgba(255,255,255,0.5)'
              }}
            />
          </span>
          <motion.span
            style={{
              opacity: realOpacity,
              color: '#32d74b', // Apple Green
              textTransform: 'uppercase',
              textShadow: '0 0 30px rgba(50,215,75,0.4)',
              fontWeight: 900
            }}
          >
            REAL.
          </motion.span>
        </motion.h2>

        {/* SUBTITLE */}
        <motion.div
          style={{
            opacity: realOpacity,
            marginTop: '3rem',
            padding: '0.8rem 2rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '100px',
            fontSize: '1.1rem',
            fontWeight: 500,
            color: '#a1a1a6',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(10px)',
            zIndex: 1
          }}
        >
          Handcrafted Intelligence
        </motion.div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '10vh',
          width: '2px',
          height: '60px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '2px'
        }}>
          <motion.div 
            style={{
              width: '100%',
              background: '#2997ff',
              height: '100%',
              scaleY: scrollYProgress,
              transformOrigin: 'top'
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default TruthAnimation;
