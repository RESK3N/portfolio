import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    category: '',
    items: ''
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: true });
    if (error) console.error('Error fetching skills:', error);
    else setSkills(data || []);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemsArray = formData.items.split(',').map(item => item.trim()).filter(item => item);
    
    const skillData = {
      category: formData.category,
      items: itemsArray
    };

    const { error } = await supabase.from('skills').insert([skillData]);
    if (error) {
      console.error('Error adding skill category:', error);
      alert('Failed to add skill category');
    } else {
      setFormData({ category: '', items: '' });
      fetchSkills();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) console.error('Error deleting:', error);
    else fetchSkills();
  };

  return (
    <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>
      
      <form onSubmit={handleSubmit} className="mb-12 space-y-4 max-w-2xl">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">Add Skill Category</h3>
        <input required name="category" value={formData.category} onChange={handleInputChange} placeholder="Category (e.g., Frontend, Backend)" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        <textarea required name="items" value={formData.items} onChange={handleInputChange} placeholder="Skills (comma separated, e.g., React, Vue, Svelte)" rows="3" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"></textarea>
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Add Category</button>
      </form>

      <div>
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">Existing Skills</h3>
        {loading ? <p>Loading...</p> : (
          <div className="space-y-4">
            {skills.map(skill => (
              <div key={skill.id} className="flex justify-between items-start p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div>
                  <h4 className="font-bold">{skill.category}</h4>
                  <p className="text-sm text-gray-500 mt-1">{skill.items.join(', ')}</p>
                </div>
                <button onClick={() => handleDelete(skill.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
              </div>
            ))}
            {skills.length === 0 && <p className="text-gray-500">No skills added yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSkills;
