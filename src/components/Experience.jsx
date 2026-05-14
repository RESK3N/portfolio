import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <section id="experience" className="section container" style={{ minHeight: 'auto', paddingTop: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2>Experience.</h2>
        
        <div style={{ marginTop: '3rem', position: 'relative' }}>
          {/* Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'var(--glass-border)',
            marginLeft: '20px'
          }}></div>

          {/* Experience Item */}
          <motion.div 
            className="glass"
            style={{ padding: '2.5rem', marginLeft: '50px', position: 'relative' }}
            whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
            transition={{ duration: 0.2 }}
          >
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '-37px',
              top: '40px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--accent-color)',
              boxShadow: '0 0 10px var(--accent-color)'
            }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem' }}>AI Engineer Intern</h3>
              <span style={{ color: 'var(--accent-color)', fontWeight: 500 }}>March 2026 – Present</span>
            </div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 400 }}>ATOS</h4>
            
            <ul style={{ color: 'var(--text-secondary)', listStyleType: 'none', padding: 0 }}>
              {['Developed AI-driven automation workflows for cloud-based infrastructure management in an enterprise environment.',
                'Integrated cloud AI services to enable intelligent decision-making and reduce manual effort.',
                'Designed scalable automation pipelines improving system efficiency and responsiveness.',
                'Collaborated within a professional engineering team while adhering to strict security and confidentiality standards.'].map((item, index) => (
                <li key={index} style={{ marginBottom: '0.8rem', position: 'relative', paddingLeft: '1.5rem', lineHeight: 1.6 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--accent-color)' }}>▹</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
