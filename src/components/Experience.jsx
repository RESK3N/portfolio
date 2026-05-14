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
    <section id="experience" className="section container" style={{ minHeight: 'auto', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, letterSpacing: '-0.04em' }}>Professional Experience.</h2>
          <div style={{ height: '2px', flex: 1, background: 'linear-gradient(90deg, var(--accent-color) 0%, transparent 100%)', opacity: 0.3 }} />
        </div>
        
        {loading ? (
          <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>Loading experiences...</div>
        ) : experiences.length === 0 ? (
          <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>No experience added yet.</div>
        ) : (
          <div style={{ position: 'relative' }}>
            {/* Timeline Line with Gradient */}
            <div style={{
              position: 'absolute',
              left: '0',
              top: '0',
              bottom: '0',
              width: '1px',
              background: 'linear-gradient(180deg, var(--accent-color) 0%, rgba(41,151,255,0.1) 100%)',
              marginLeft: '20px',
              opacity: 0.5
            }}></div>

            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className="glass"
                style={{ 
                  padding: '3rem', 
                  marginLeft: '60px', 
                  position: 'relative', 
                  marginBottom: '3rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
                whileHover={{ 
                  y: -8, 
                  borderColor: 'rgba(41,151,255,0.3)',
                  background: 'rgba(41,151,255,0.03)'
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Timeline Dot with Pulse Effect */}
                <div style={{
                  position: 'absolute',
                  left: '-47px',
                  top: '42px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'var(--accent-color)',
                  boxShadow: '0 0 20px var(--accent-color)'
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid var(--accent-color)' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>{exp.role}</h3>
                  <span style={{ 
                    padding: '0.5rem 1.25rem', 
                    background: 'rgba(41,151,255,0.1)', 
                    color: 'var(--accent-color)', 
                    borderRadius: '100px', 
                    fontSize: '0.9rem', 
                    fontWeight: 700,
                    whiteSpace: 'nowrap'
                  }}>
                    {exp.duration}
                  </span>
                </div>
                
                <h4 style={{ 
                  color: 'rgba(255,255,255,0.6)', 
                  marginBottom: '2rem', 
                  fontSize: '1.25rem', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{ width: '20px', height: '2px', background: 'var(--accent-color)' }} />
                  {exp.company}
                </h4>
                
                <ul style={{ color: 'rgba(255,255,255,0.5)', listStyleType: 'none', padding: 0 }}>
                  {exp.description.split('\n').map((item, idx) => {
                    if (!item.trim()) return null;
                    return (
                      <li key={idx} style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.8rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent-color)', fontWeight: 900 }}>→</span>
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
