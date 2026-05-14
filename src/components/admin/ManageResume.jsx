import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, FileText, CheckCircle2, AlertCircle, RefreshCw, Layers } from 'lucide-react';

const ManageResume = () => {
  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState(null);
  const [lastGenerated, setLastGenerated] = useState(null);
  const [stats, setStats] = useState({ skills: 0, projects: 0, experience: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: s, error: se } = await supabase.from('skills').select('*', { count: 'exact' });
        const { count: p, error: pe } = await supabase.from('projects').select('*', { count: 'exact' });
        const { count: e, error: ee } = await supabase.from('experience').select('*', { count: 'exact' });
        
        if (se) console.error('Skills fetch error:', se);
        if (pe) console.error('Projects fetch error:', pe);
        if (ee) console.error('Experience fetch error:', ee);

        setStats({ 
          skills: s !== null ? s : 0, 
          projects: p !== null ? p : 0, 
          experience: e !== null ? e : 0 
        });
      } catch (err) {
        console.error('Stats fetch failure:', err);
      }
    };
    fetchStats();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setStatus('Analyzing current portfolio data...');
    
    try {
      // 1. Trigger the Netlify Function
      setStatus('Prompting Gemini AI for LaTeX generation...');
      const response = await fetch('/.netlify/functions/generate-resume', {
        method: 'POST',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('Resume successfully synthesized.');
        setLastGenerated(new Date().toLocaleString());
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Error generating resume:', err);
      setStatus('Error: ' + err.message);
    } finally {
      setGenerating(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Resume Intelligence
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>
          Sync your latest professional achievements and generate a high-end LaTeX resume in seconds.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Generation Panel */}
        <div className="glass" style={{ padding: '2.5rem', border: '1px solid rgba(168,85,247,0.1)', background: 'rgba(168,85,247,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(168,85,247,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} color="#a855f7" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Auto-Synthesis</h3>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Powered by Google Gemini</p>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase' }}>Data Ready for Sync</span>
              <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>LIVE</span>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{stats.experience}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Exp</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{stats.projects}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Projects</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{stats.skills}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Skills</div>
              </div>
            </div>
          </div>

          <motion.button
            onClick={handleGenerate}
            disabled={generating}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '1.25rem',
              background: 'linear-gradient(135deg, #a855f7 0%, #2997ff 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '14px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: generating ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 20px rgba(168,85,247,0.2)',
              opacity: generating ? 0.7 : 1
            }}
          >
            {generating ? <RefreshCw size={20} className="animate-spin" /> : <Sparkles size={20} />}
            {generating ? 'Generating...' : 'Sync & Generate Resume'}
          </motion.button>

          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                {status.includes('Error') ? <AlertCircle size={16} color="#f87171" /> : <CheckCircle2 size={16} color="#10b981" />}
                {status}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Download & History Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>Output Artifacts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a 
                href="/.netlify/functions/download-resume?type=tex"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={20} color="var(--text-secondary)" />
                  <span>Resume Source (.tex)</span>
                </div>
                <Download size={18} color="rgba(255,255,255,0.3)" />
              </a>
              <a 
                href="/.netlify/functions/download-resume?type=pdf"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Layers size={20} color="#2997ff" />
                  <span>Compiled PDF</span>
                </div>
                <Download size={18} color="rgba(255,255,255,0.3)" />
              </a>
            </div>
          </div>

          <div className="glass" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', flex: 1 }}>
            <h3 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem' }}>Status Log</h3>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              {lastGenerated ? (
                <div>Last synthesis completed at: <span style={{ color: '#fff' }}>{lastGenerated}</span></div>
              ) : (
                "No synthesis logs found for this session."
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageResume;
