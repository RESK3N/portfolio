import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, FileText, CheckCircle2, AlertCircle, RefreshCw, Layers, Eye, Code, History } from 'lucide-react';

const ManageResume = () => {
  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState(null);
  const [stats, setStats] = useState({ skills: 0, projects: 0, experience: 0 });
  
  // History State
  const [history, setHistory] = useState([]);
  const [selectedVersionId, setSelectedVersionId] = useState('');
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  // Preview Mode
  const [previewMode, setPreviewMode] = useState('pdf'); // 'pdf' or 'tex'
  const [texSource, setTexSource] = useState('');
  const [loadingTex, setLoadingTex] = useState(false);

  // Fetch Stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: s } = await supabase.from('skills').select('*', { count: 'exact' });
        const { count: p } = await supabase.from('projects').select('*', { count: 'exact' });
        const { count: e } = await supabase.from('experience').select('*', { count: 'exact' });
        setStats({ skills: s || 0, projects: p || 0, experience: e || 0 });
      } catch (err) {
        console.error('Stats fetch failure:', err);
      }
    };
    fetchStats();
    fetchHistory();
  }, []);

  // Fetch History from Storage
  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('resume')
        .download('history.json');
      
      if (!downloadError && fileData) {
        const text = await fileData.text();
        const parsedHistory = JSON.parse(text);
        setHistory(parsedHistory);
        if (parsedHistory.length > 0) {
          setSelectedVersionId(parsedHistory[0].id);
        }
      }
    } catch (err) {
      console.warn('No history log found or failed to fetch:', err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Get current active version data
  const getSelectedVersion = () => {
    if (selectedVersionId && history.length > 0) {
      const ver = history.find(h => h.id === selectedVersionId);
      if (ver) return ver;
    }
    // Fallback default
    const { data: urlData } = supabase.storage.from('resume').getPublicUrl('resume.tex');
    const mainTexUrl = urlData?.publicUrl || '';
    return {
      id: 'latest',
      versionName: 'Latest Main Resume',
      timestamp: Date.now(),
      texUrl: mainTexUrl,
      pdfUrl: mainTexUrl ? `https://latexonline.cc/compile?url=${encodeURIComponent(mainTexUrl)}` : ''
    };
  };

  const selectedVersion = getSelectedVersion();

  // Load Tex Source Code
  useEffect(() => {
    if (!selectedVersion?.texUrl) return;
    const fetchTexSource = async () => {
      try {
        setLoadingTex(true);
        const res = await fetch(selectedVersion.texUrl);
        if (res.ok) {
          const text = await res.text();
          setTexSource(text);
        }
      } catch (e) {
        setTexSource('% Failed to load LaTeX source code.');
      } finally {
        setLoadingTex(false);
      }
    };
    fetchTexSource();
  }, [selectedVersion?.texUrl]);

  // Handle Generation
  const handleGenerate = async () => {
    setGenerating(true);
    setStatus('Analyzing current portfolio data...');
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      setStatus('Prompting Gemini AI for LaTeX generation...');
      const response = await fetch('/.netlify/functions/generate-resume', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error (${response.status}): ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('Resume successfully synthesized.');
        // Update history immediately from response
        if (result.history) {
          setHistory(result.history);
          if (result.history.length > 0) {
            setSelectedVersionId(result.history[0].id);
          }
        } else {
          await fetchHistory();
        }
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error generating resume:', err);
      setStatus('Error: ' + err.message);
    } finally {
      setGenerating(false);
      setTimeout(() => setStatus(null), 8000);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Resume Intelligence
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem' }}>
          Sync your latest professional achievements and generate a high-end LaTeX resume with embedded vector QR codes.
        </p>
      </div>

      <div className="resume-grid" style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '2rem' }}>
        {/* Left Column Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Generation Panel */}
          <div className="glass" style={{ padding: '2rem', border: '1px solid rgba(168,85,247,0.1)', background: 'rgba(168,85,247,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <motion.div 
                animate={generating ? { rotate: 360 } : { rotate: 0 }}
                transition={generating ? { repeat: Infinity, duration: 2, ease: "linear" } : { duration: 0.5 }}
                style={{ width: '44px', height: '44px', background: 'rgba(168,85,247,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Sparkles size={20} color="#a855f7" />
              </motion.div>
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Auto-Synthesis</h3>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Powered by Google Gemini</p>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase' }}>Data Ready for Sync</span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>LIVE</span>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{stats.experience}</div>
                  <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Exp</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{stats.projects}</div>
                  <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Projects</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{stats.skills}</div>
                  <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Skills</div>
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
                padding: '1rem',
                background: 'linear-gradient(135deg, #a855f7 0%, #2997ff 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: generating ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: '0 8px 16px rgba(168,85,247,0.15)',
                opacity: generating ? 0.7 : 1
              }}
            >
              <motion.div
                animate={generating ? { rotate: 360 } : { rotate: 0 }}
                transition={generating ? { repeat: Infinity, duration: 1.2, ease: "linear" } : { duration: 0.5 }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {generating ? <RefreshCw size={18} /> : <Sparkles size={18} />}
              </motion.div>
              {generating ? 'Generating...' : 'Sync & Generate'}
            </motion.button>

            <AnimatePresence>
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginTop: '1.25rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}
                >
                  {status.includes('Error') ? <AlertCircle size={14} color="#f87171" /> : <CheckCircle2 size={14} color="#10b981" />}
                  <span style={{ overflowWrap: 'anywhere' }}>{status}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* History / Generation Log */}
          <div className="glass" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', maxHeight: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <History size={18} color="rgba(255,255,255,0.4)" />
              <h3 style={{ fontSize: '1rem', margin: 0 }}>Generation Log</h3>
            </div>
            
            <div style={{ 
              overflowY: 'auto', 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.5rem',
              paddingRight: '0.5rem'
            }}>
              {loadingHistory ? (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textAlign: 'center', padding: '2rem 0' }}>
                  Loading history logs...
                </div>
              ) : history.length === 0 ? (
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textAlign: 'center', padding: '2rem 0' }}>
                  No historical generations found.
                </div>
              ) : (
                history.map((ver) => {
                  const isActive = ver.id === selectedVersionId;
                  return (
                    <button
                      key={ver.id}
                      onClick={() => setSelectedVersionId(ver.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.875rem 1rem',
                        borderRadius: '10px',
                        background: isActive ? 'rgba(168,85,247,0.1)' : 'rgba(255,255,255,0.02)',
                        border: isActive ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.05)',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem'
                      }}
                      onMouseEnter={e => {
                        if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{ver.versionName}</span>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                        {new Date(ver.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

        </div>

        {/* Right Column Preview Panel */}
        <div className="glass" style={{ 
          border: '1px solid rgba(255,255,255,0.05)', 
          background: 'rgba(10,10,10,0.5)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '700px',
          overflow: 'hidden'
        }}>
          {/* Preview Header Bar */}
          <div style={{ 
            padding: '1.25rem 2rem', 
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginRight: '1rem' }}>
                <button 
                  onClick={() => setPreviewMode('pdf')}
                  style={{
                    background: previewMode === 'pdf' ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: 'none',
                    color: previewMode === 'pdf' ? '#fff' : 'rgba(255,255,255,0.4)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <Eye size={16} /> PDF Preview
                </button>
                <button 
                  onClick={() => setPreviewMode('tex')}
                  style={{
                    background: previewMode === 'tex' ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: 'none',
                    color: previewMode === 'tex' ? '#fff' : 'rgba(255,255,255,0.4)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <Code size={16} /> LaTeX Source
                </button>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                Viewing: {selectedVersion.versionName}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href={selectedVersion.texUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px',
                  color: '#fff', fontSize: '0.8rem', textDecoration: 'none', transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <FileText size={14} /> TeX Source
              </a>
              <a 
                href={selectedVersion.pdfUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 1rem', background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(41,151,255,0.2) 100%)',
                  border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px',
                  color: '#d8b4fe', fontSize: '0.8rem', textDecoration: 'none', transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
                onMouseLeave={e => e.currentTarget.style.opacity = 1}
              >
                <Layers size={14} /> Compile PDF
              </a>
            </div>
          </div>

          {/* Preview Canvas Area */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {previewMode === 'pdf' ? (
              <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
                {generating && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                    zIndex: 10, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '1rem'
                  }}>
                    <RefreshCw className="spin" size={32} color="#a855f7" />
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Generating updated PDF...</span>
                  </div>
                )}
                
                {selectedVersion.pdfUrl ? (
                  <iframe
                    src={selectedVersion.pdfUrl}
                    style={{
                      width: '100%',
                      height: '700px',
                      border: 'none',
                      background: 'rgba(255,255,255,0.01)',
                      flex: 1
                    }}
                    title="Compiled PDF Preview"
                  />
                ) : (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
                    No PDF URL available. Click "Sync & Generate" to build.
                  </div>
                )}
              </div>
            ) : (
              <div style={{ flex: 1, padding: '2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {loadingTex ? (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', gap: '0.75rem' }}>
                    <RefreshCw className="spin" size={18} /> Loading LaTeX source code...
                  </div>
                ) : (
                  <pre style={{
                    flex: 1,
                    background: 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '1.5rem',
                    color: 'rgba(168,85,247,0.95)',
                    fontSize: '0.85rem',
                    fontFamily: 'monospace',
                    borderRadius: '12px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    maxHeight: '650px'
                  }}>
                    {texSource || '% No LaTeX source loaded.'}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageResume;
