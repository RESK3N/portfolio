import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <footer id="contact" style={{ borderTop: '1px solid var(--glass-border)', padding: '6rem 0 3rem 0', marginTop: '4rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Get In Touch.</h2>
          <p style={{ marginBottom: '3rem', fontSize: '1.125rem' }}>
            Currently open for new opportunities. Whether you have a question or just want to say hi, 
            I'll try my best to get back to you!
          </p>
          
          <a href="mailto:999.pritammondal@gmail.com" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            background: 'linear-gradient(135deg, #2997ff 0%, #a855f7 100%)',
            color: '#fff',
            borderRadius: '30px',
            fontWeight: 600,
            fontSize: '1.1rem',
            marginBottom: '4rem',
            transition: 'transform 0.2s ease',
            boxShadow: '0 4px 14px 0 rgba(41, 151, 255, 0.39)'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Say Hello
          </a>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <a href="https://github.com/resk3n" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://linkedin.com/in/resken" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:999.pritammondal@gmail.com" style={{ color: 'var(--text-secondary)' }}>
              <Mail size={24} />
            </a>
          </div>
          
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
            Designed & Built by Pritam Mondal
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Contact;
