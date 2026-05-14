import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';

const ManageAbout = () => {
  const [content, setContent] = useState('');
  const [aboutId, setAboutId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('about').select('*').limit(1);
    if (error) {
      console.error('Error fetching about:', error);
    } else if (data && data.length > 0) {
      setContent(data[0].content);
      setAboutId(data[0].id);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (aboutId) {
      const { error } = await supabase.from('about').update({ content }).eq('id', aboutId);
      if (error) alert('Error updating');
      else alert('Updated successfully');
    } else {
      const { error } = await supabase.from('about').insert([{ content }]);
      if (error) alert('Error saving');
      else {
        alert('Saved successfully');
        fetchAbout();
      }
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Manage About Section</h2>
      
      {loading ? <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</p> : (
        <form onSubmit={handleSubmit} style={{ marginBottom: '3rem', maxWidth: '640px' }}>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
            Edit your about section. You can use simple text. This will replace the hardcoded text in the About section.
          </p>
          <textarea 
            required 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="I am an AI-focused Computer Science student..." 
            rows="8" 
            style={{ 
              width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)',
              color: '#fff', fontSize: '0.9rem', outline: 'none', marginBottom: '1rem', resize: 'vertical'
            }}
          ></textarea>
          <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
            Save Content
          </button>
        </form>
      )}
    </div>
  );
};

export default ManageAbout;
