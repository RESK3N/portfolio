import { motion } from 'framer-motion';

const skillsData = {
  "AI / ML": ["YOLO", "TensorFlow", "HuggingFace", "LangChain", "OpenCV", "EasyOCR", "scikit-learn"],
  "Cloud & DevOps": ["Microsoft Azure", "Google Cloud", "CI/CD", "GitHub Actions"],
  "Programming": ["Python", "C", "C++", "Java"],
  "Frameworks": ["Flask", "Streamlit", "Dash", "React"],
  "Databases": ["SQL", "MongoDB"],
  "Agentic AI": ["Microsoft Agent Framework", "Multi-agent orchestration"],
  "Other": ["Bash", "Kali Linux", "ESP32", "Arduino"]
};

const Skills = () => {
  return (
    <section id="skills" className="section container" style={{ minHeight: 'auto', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2>Technical Arsenal.</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
          {Object.entries(skillsData).map(([category, skills], idx) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 500 }}>
                {category}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {skills.map(skill => (
                  <span 
                    key={skill}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--glass-border)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
