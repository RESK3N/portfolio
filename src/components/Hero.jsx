import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Abstract Background Element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(41,151,255,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 500 }}>
            Hi, I'm
          </h2>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginBottom: '1.5rem' }}
        >
          Pritam Mondal. <br />
          <span className="gradient-text">AI Engineer & Developer.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ maxWidth: '600px', marginBottom: '3rem' }}
        >
          I build intelligent, agentic systems and scalable web applications. 
          Driven by modern design and powerful automation.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#projects" style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: 'var(--text-primary)',
            color: 'var(--bg-color)',
            borderRadius: '30px',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'transform 0.2s ease, opacity 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            View My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
