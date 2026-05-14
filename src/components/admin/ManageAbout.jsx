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
      // Update existing
      const { error } = await supabase.from('about').update({ content }).eq('id', aboutId);
      if (error) alert('Error updating');
      else alert('Updated successfully');
    } else {
      // Insert new
      const { error } = await supabase.from('about').insert([{ content }]);
      if (error) alert('Error saving');
      else {
        alert('Saved successfully');
        fetchAbout();
      }
    }
  };

  return (
    <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Manage About Section</h2>
      
      {loading ? <p>Loading...</p> : (
        <form onSubmit={handleSubmit} className="mb-12 space-y-4 max-w-2xl">
          <p className="text-sm text-gray-500 mb-2">Edit your about section. You can use simple text. This will replace the hardcoded text in the About section.</p>
          <textarea 
            required 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="I am an AI-focused Computer Science student..." 
            rows="8" 
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"
          ></textarea>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Save Content</button>
        </form>
      )}
    </div>
  );
};

export default ManageAbout;
