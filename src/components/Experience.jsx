import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error fetching experiences:', error);
      else setExperiences(data || []);
      setLoading(false);
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="section container" style={{ minHeight: 'auto', paddingTop: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2>Experience.</h2>
        
        {loading ? (
          <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>Loading experiences...</div>
        ) : experiences.length === 0 ? (
          <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>No experience added yet.</div>
        ) : (
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

            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className="glass"
                style={{ padding: '2.5rem', marginLeft: '50px', position: 'relative', marginBottom: index !== experiences.length - 1 ? '2rem' : '0' }}
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
                  <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{exp.role}</h3>
                  <span style={{ color: 'var(--accent-color)', fontWeight: 500 }}>{exp.duration}</span>
                </div>
                <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 400 }}>{exp.company}</h4>
                
                <ul style={{ color: 'var(--text-secondary)', listStyleType: 'none', padding: 0 }}>
                  {exp.description.split('\n').map((item, idx) => {
                    if (!item.trim()) return null;
                    return (
                      <li key={idx} style={{ marginBottom: '0.8rem', position: 'relative', paddingLeft: '1.5rem', lineHeight: 1.6 }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent-color)' }}>▹</span>
                        {item.trim()}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Experience;
