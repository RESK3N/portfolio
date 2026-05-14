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
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <a href="mailto:999.pritammondal@gmail.com" style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #2997ff 0%, #a855f7 100%)',
              color: '#fff',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: '1.1rem',
              transition: 'transform 0.2s ease',
              boxShadow: '0 4px 14px 0 rgba(41, 151, 255, 0.39)',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Say Hello
            </a>

            <a 
              href="https://wa.me/918967345961?text=Hey,%20I%20was%20visiting%20your%20website." 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: 'rgba(37,211,102,0.1)',
                border: '1px solid rgba(37,211,102,0.3)',
                color: '#25D366',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(37,211,102,0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(37,211,102,0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.559 4.189 1.623 6.006L0 24l6.135-1.61a11.751 11.751 0 005.914 1.594h.005c6.637 0 12.032-5.396 12.035-12.03.003-3.213-1.248-6.231-3.522-8.508z"/>
              </svg>
              Say Hello in WhatsApp
            </a>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <a href="https://wa.me/918967345961?text=Hey,%20I%20was%20visiting%20your%20website." target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://github.com/resk3n" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7 A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
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
