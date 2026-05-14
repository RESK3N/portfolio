import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const Skills = () => {
  const [skillsList, setSkillsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: true });
      if (error) console.error('Error fetching skills:', error);
      else setSkillsList(data || []);
      setLoading(false);
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="section container" style={{ minHeight: 'auto', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2>Technical Arsenal.</h2>
        
        {loading ? (
          <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>Loading skills...</div>
        ) : skillsList.length === 0 ? (
          <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>No skills added yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
            {skillsList.map((skillObj, idx) => (
              <motion.div 
                key={skillObj.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 500 }}>
                  {skillObj.category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {skillObj.items.map(skill => (
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
        )}
      </motion.div>
    </section>
  );
};

export default Skills;
