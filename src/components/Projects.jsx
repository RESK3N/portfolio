import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error fetching projects:', error);
      else setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section container" style={{ paddingTop: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2>Projects.</h2>
        
        {loading ? (
          <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>Loading projects...</div>
        ) : projects.length === 0 ? (
          <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>No projects available yet.</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
                whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.2)' }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', lineHeight: 1.4 }}>{project.title}</h3>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                    )}
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={20} /></a>
                    )}
                  </div>
                </div>
                {project.image_url && (
                  <div style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={project.image_url} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                )}
                <p style={{ fontSize: '0.875rem', color: 'var(--accent-color)', fontFamily: 'monospace', marginBottom: '1rem' }}>
                  {project.tags && project.tags.join(', ')}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1 }}>
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
