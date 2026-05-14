import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, Briefcase, Calendar } from 'lucide-react';

const ManageExperience = () => {
  const [experience, setExperience] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ role: '', company: '', duration: '', description: '' });

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    const { data } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
    setExperience(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('experience').update(formData).eq('id', editingId);
    } else {
      await supabase.from('experience').insert([formData]);
    }
    setFormData({ role: '', company: '', duration: '', description: '' });
    setIsAdding(false);
    setEditingId(null);
    fetchExperience();
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Career Nodes
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Architect your professional timeline for the AI Engine.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          style={{
            padding: '0.75rem 1.5rem',
            background: isAdding ? 'rgba(255,255,255,0.05)' : '#a855f7',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: isAdding ? 'none' : '0 4px 15px rgba(168,85,247,0.3)'
          }}
        >
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? 'Cancel' : 'Add Experience'}
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="glass"
            style={{ padding: '2.5rem', marginBottom: '3rem', border: '1px solid rgba(168,85,247,0.2)', background: 'rgba(168,85,247,0.02)' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Professional Role</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required placeholder="e.g., AI Engineer Intern" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Organization / Company</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required placeholder="e.g., ATOS" />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Timeframe / Duration</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required placeholder="e.g., March 2026 - Present" />
              </div>
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Role Responsibilities (New line for each point)</label>
                <textarea style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', minHeight: '120px' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required placeholder="Developed AI-driven automation...&#10;Integrated cloud services..." />
              </div>
            </div>
            <button type="submit" style={{ marginTop: '2rem', width: '100%', padding: '1rem', background: '#a855f7', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <Save size={20} />
              {editingId ? 'Update Career Node' : 'Initialize Experience'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {experience.map(exp => (
          <motion.div
            key={exp.id}
            layout
            className="glass"
            style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(168,85,247,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Briefcase size={22} color="#a855f7" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{exp.role}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    <span>{exp.company}</span>
                    <span style={{ opacity: 0.3 }}>•</span>
                    <Calendar size={14} />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setFormData(exp); setEditingId(exp.id); setIsAdding(true); }} style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={async () => { if(confirm('Erase career node?')) { await supabase.from('experience').delete().eq('id', exp.id); fetchExperience(); } }} style={{ padding: '0.5rem', background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.1)', borderRadius: '8px', cursor: 'pointer', color: '#f87171' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem', paddingLeft: '4rem' }}>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {exp.description?.split('\n').map((point, i) => (
                  <li key={i} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', display: 'flex', gap: '0.75rem', lineHeight: 1.5 }}>
                    <span style={{ color: '#a855f7', fontWeight: 900 }}>›</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageExperience;
