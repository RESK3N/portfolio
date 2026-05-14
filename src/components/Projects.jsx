import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Maximize2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import ImageModal from './ImageModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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
                {project.title === 'VidIntelligence' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <motion.div 
                      whileHover="hover"
                      style={{ borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                      onClick={() => setSelectedImage({ src: "/vidintelligence-mistral.png", alt: "Mistral Analysis" })}
                    >
                      <img src="/vidintelligence-mistral.png" alt="Analysis Result" style={{ width: '100%', height: 'auto', display: 'block' }} />
                      <motion.div 
                        variants={{ hover: { opacity: 1 } }}
                        initial={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: { duration: 0.2 } }}
                      >
                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', borderRadius: '50%', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                          <Maximize2 size={20} />
                        </div>
                      </motion.div>
                    </motion.div>
                    <motion.div 
                      whileHover="hover"
                      style={{ borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                      onClick={() => setSelectedImage({ src: "/vidintelligence-new.png", alt: "Empty UI" })}
                    >
                      <img src="/vidintelligence-new.png" alt="Empty UI" style={{ width: '100%', height: 'auto', display: 'block' }} />
                      <motion.div 
                        variants={{ hover: { opacity: 1 } }}
                        initial={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: { duration: 0.2 } }}
                      >
                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', borderRadius: '50%', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                          <Maximize2 size={20} />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (project.title === 'AI-Powered Portfolio & Resume Engine' || project.title === 'Agentic AI Portfolio & Experience Hub') ? (
                  <motion.div 
                    whileHover="hover"
                    style={{ marginBottom: '1.5rem', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                    onClick={() => setSelectedImage({ src: "/resume-real.png", alt: project.title })}
                  >
                    <img src="/resume-real.png" alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    <motion.div 
                      variants={{ hover: { opacity: 1 } }}
                      initial={{ opacity: 0 }}
                      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: { duration: 0.2 } }}
                    >
                      <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', borderRadius: '50%', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <Maximize2 size={20} />
                      </div>
                    </motion.div>
                  </motion.div>
                ) : project.image_url && (
                  <motion.div 
                    whileHover="hover"
                    style={{ marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                    onClick={() => setSelectedImage({ src: project.image_url, alt: project.title })}
                  >
                    <img src={project.image_url} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    <motion.div 
                      variants={{ hover: { opacity: 1 } }}
                      initial={{ opacity: 0 }}
                      style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: { duration: 0.2 } }}
                    >
                      <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', borderRadius: '50%', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <Maximize2 size={20} />
                      </div>
                    </motion.div>
                  </motion.div>
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

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        src={selectedImage?.src} 
        alt={selectedImage?.alt} 
      />
    </section>
  );
};

export default Projects;
