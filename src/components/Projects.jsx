import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Automatic Number Plate Recognition (ANPR)',
    tech: 'Python, YOLOv8, EasyOCR, ESP32-CAM',
    description: 'Built a real-time ANPR system using YOLOv8 for detection and EasyOCR for text recognition. Integrated ESP32-CAM for live video streaming and edge-based capture. Improved model accuracy through custom dataset training.',
    link: '#',
    github: '#'
  },
  {
    title: 'Interdisciplinary Subject Selection',
    tech: 'HTML, Tailwind CSS, PHP, MySQL, AJAX',
    description: 'Developed a full-stack web platform for course selection handling workflows for 2500+ students. Features secure authentication, admin/student dashboards, and was deployed on VPS with continuous updates.',
    link: '#',
    github: '#'
  },
  {
    title: 'LLM-Based YouTube Video Summarizer',
    tech: 'Python, LangChain, HuggingFace, Flask',
    description: 'Automated pipeline to extract and summarize video transcripts using LLMs. Implemented chunking and context handling for long-form content, generating structured summaries and PDF outputs.',
    link: '#',
    github: '#'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section container" style={{ paddingTop: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2>Projects.</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="glass"
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
              whileHover={{ y: -10, borderColor: 'rgba(255,255,255,0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', lineHeight: 1.4 }}>{project.title}</h3>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a href={project.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                  <a href={project.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={20} /></a>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--accent-color)', fontFamily: 'monospace', marginBottom: '1rem' }}>
                {project.tech}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, flexGrow: 1 }}>
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
