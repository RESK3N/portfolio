import { motion } from 'framer-motion';

const BuiltWith = () => {
  const techStack = [
    { name: 'React', link: 'https://react.dev/' },
    { name: 'Vite', link: 'https://vitejs.dev/' },
    { name: 'Vanilla CSS', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'Framer Motion', link: 'https://www.framer.com/motion/' },
    { name: 'Supabase', link: 'https://supabase.com/' },
  ];

  return (
    <section className="built-with py-16 bg-[#fafafa] dark:bg-[#000] text-center" style={{ borderTop: '1px solid var(--border-light)' }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white"
        >
          Built With
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          This portfolio was crafted with modern web technologies, aiming for a dynamic, highly performant, and maintainable structure.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {techStack.map((tech, index) => (
            <motion.a
              key={tech.name}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="tech-badge"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-light)',
                borderRadius: '999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-secondary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; }}
            >
              {tech.name}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuiltWith;
