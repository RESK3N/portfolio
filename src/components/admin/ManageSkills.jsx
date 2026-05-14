import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Save, X, Zap, Cpu } from 'lucide-react';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ category: '', items: '' });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data } = await supabase.from('skills').select('*').order('category', { ascending: true });
    setSkills(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillData = { category: formData.category, items: formData.items.split(',').map(i => i.trim()) };
    
    if (editingId) {
      await supabase.from('skills').update(skillData).eq('id', editingId);
    } else {
      await supabase.from('skills').insert([skillData]);
    }
    
    setFormData({ category: '', items: '' });
    setIsAdding(false);
    setEditingId(null);
    fetchSkills();
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #eab308)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Neural Skills
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Map your technical expertise across the development spectrum.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(!isAdding)}
          style={{
            padding: '0.75rem 1.5rem',
            background: isAdding ? 'rgba(255,255,255,0.05)' : '#eab308',
            color: '#000',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? 'Cancel' : 'Add Category'}
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="glass"
            style={{ padding: '2.5rem', marginBottom: '3rem', border: '1px solid rgba(234,179,8,0.2)', background: 'rgba(234,179,8,0.02)' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Skill Category</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required placeholder="e.g., AI/ML" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Skills (comma separated)</label>
                <input style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} value={formData.items} onChange={e => setFormData({...formData, items: e.target.value})} required placeholder="Python, TensorFlow, PyTorch..." />
              </div>
            </div>
            <button type="submit" style={{ marginTop: '2rem', width: '100%', padding: '1rem', background: '#eab308', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <Save size={20} />
              {editingId ? 'Update Skill Set' : 'Map Skills'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {skills.map(skill => (
          <motion.div
            key={skill.id}
            layout
            className="glass"
            style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#eab308' }}>
                <Cpu size={16} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{skill.category}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setFormData({ category: skill.category, items: skill.items.join(', ') }); setEditingId(skill.id); setIsAdding(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.2)' }}><Edit2 size={12} /></button>
                <button onClick={async () => { if(confirm('Erase skills?')) { await supabase.from('skills').delete().eq('id', skill.id); fetchSkills(); } }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(248,113,113,0.3)' }}><Trash2 size={12} /></button>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {skill.items?.map(item => (
                <span key={item} style={{ padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.85rem', color: '#fff' }}>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageSkills;
