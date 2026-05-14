import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';

const ResumeDownload = () => {
  const { data: urlData } = supabase.storage.from('resume').getPublicUrl('resume.tex');
  const texUrl = urlData?.publicUrl;
  const pdfUrl = texUrl ? `https://latexonline.cc/compile?url=${encodeURIComponent(texUrl)}` : null;

  return (
    <section id="resume" className="section container" style={{ minHeight: 'auto', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2>Resume.</h2>
        <div className="glass" style={{ padding: '2.5rem', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
            My resume is auto-generated from this portfolio's live data using AI. Always up-to-date.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {pdfUrl && (
              <motion.a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1.75rem',
                  background: 'var(--text-primary)',
                  color: 'var(--bg-color)',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </motion.a>
            )}
            {texUrl && (
              <motion.a
                href={texUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1.75rem',
                  background: 'var(--glass-bg)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Download .tex
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeDownload;
