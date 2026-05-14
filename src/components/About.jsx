import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section container" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>About Me.</h2>
        <div className="glass" style={{ padding: '3rem', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-primary)', fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            I am an <span className="gradient-text" style={{fontWeight: 600}}>AI-focused Computer Science student</span> at Adamas University (B.Tech, 2023–2027) 
            with hands-on experience in agentic AI systems, cloud automation, and computer vision.
          </p>
          <p style={{ lineHeight: 1.8 }}>
            Skilled in building multi-agent workflows, integrating cloud AI services, and developing scalable automation pipelines for enterprise infrastructure operations. I thrive at the intersection of complex backend logic and seamless, intuitive user experiences.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
