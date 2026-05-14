import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, ExternalLink, Code2, Save, X, FolderOpen } from 'lucide-react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', tags: '', github_link: '', live_link: '', image_url: '' });

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('[SystemMonitor] Projects fetch failed:', err.message);
      alert('System Alarm: Unable to synchronize projects. Please check connection.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = { ...formData, tags: formData.tags?.split(',').map(t => t.trim()) };
      
      let error;
      if (editingId) {
        ({ error } = await supabase.from('projects').update(projectData).eq('id', editingId));
      } else {
        ({ error } = await supabase.from('projects').insert([projectData]));
      }
      
      if (error) throw error;

      setFormData({ title: '', description: '', tags: '', github_link: '', live_link: '', image_url: '' });
      setIsAdding(false);
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error('[SystemMonitor] Project mutation failed:', err.message);
      alert(`Critical Error: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #2997ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Project Matrix
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Manage your portfolio showcase and technical depth.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          style={{
            padding: '0.75rem 1.5rem',
            background: isAdding ? 'rgba(255,255,255,0.05)' : '#2997ff',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: isAdding ? 'none' : '0 4px 15px rgba(41,151,255,0.3)'
          }}
        >
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? 'Cancel' : 'Add Project'}
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="glass"
            style={{ padding: '2.5rem', marginBottom: '3rem', border: '1px solid rgba(41,151,255,0.2)', background: 'rgba(41,151,255,0.02)' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Project Title</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required placeholder="e.g., AI Resume Engine" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Tags (comma separated)</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="React, AI, Supabase" />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Description</label>
                <textarea style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', minHeight: '100px' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required placeholder="Describe the project impact and technology used..." />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>GitHub Link</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.github_link} onChange={e => setFormData({...formData, github_link: e.target.value})} placeholder="https://github.com/..." />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Live Link</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.live_link} onChange={e => setFormData({...formData, live_link: e.target.value})} placeholder="https://..." />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Image URL (Optional)</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.image_url || ''} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="/screenshot.png or https://..." />
              </div>
            </div>
            <button type="submit" style={{ marginTop: '2rem', width: '100%', padding: '1rem', background: '#2997ff', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <Save size={20} />
              {editingId ? 'Update Project Node' : 'Publish Project'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {projects.map(project => (
          <motion.div
            key={project.id}
            layout
            className="glass"
            style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(41,151,255,0.1)', borderRadius: '8px' }}>
                  <FolderOpen size={18} color="#2997ff" />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{project.title}</h3>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setFormData({ ...project, tags: project.tags.join(', ') }); setEditingId(project.id); setIsAdding(true); }} style={{ padding: '0.4rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                  <Edit2 size={14} />
                </button>
                <button onClick={async () => { if(confirm('Delete project node?')) { await supabase.from('projects').delete().eq('id', project.id); fetchProjects(); } }} style={{ padding: '0.4rem', background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.1)', borderRadius: '6px', cursor: 'pointer', color: '#f87171' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '1.5rem', minHeight: '3em' }}>{project.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {project.tags?.map(tag => (
                <span key={tag} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', color: 'rgba(255,255,255,0.3)' }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              {project.github_link && <a href={project.github_link} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', textDecoration: 'none' }}><Code2 size={14} /> Repo</a>}
              {project.live_link && <a href={project.live_link} target="_blank" rel="noreferrer" style={{ color: '#2997ff', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', textDecoration: 'none' }}><ExternalLink size={14} /> Live Demo</a>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageProjects;
