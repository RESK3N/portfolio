import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';

const ManageExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    duration: '',
    description: ''
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching experiences:', error);
    else setExperiences(data || []);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('experience').insert([formData]);
    if (error) {
      console.error('Error adding experience:', error);
      alert('Failed to add experience');
    } else {
      setFormData({ company: '', role: '', duration: '', description: '' });
      fetchExperiences();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('experience').delete().eq('id', id);
    if (error) console.error('Error deleting:', error);
    else fetchExperiences();
  };

  return (
    <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Manage Experience</h2>
      
      <form onSubmit={handleSubmit} className="mb-12 space-y-4 max-w-2xl">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">Add New Experience</h3>
        <div className="grid grid-cols-2 gap-4">
          <input required name="company" value={formData.company} onChange={handleInputChange} placeholder="Company Name" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
          <input required name="role" value={formData.role} onChange={handleInputChange} placeholder="Role / Job Title" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        </div>
        <input required name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Duration (e.g., Jan 2020 - Present)" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        <textarea required name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows="4" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"></textarea>
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Add Experience</button>
      </form>

      <div>
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">Existing Experience</h3>
        {loading ? <p>Loading...</p> : (
          <div className="space-y-4">
            {experiences.map(exp => (
              <div key={exp.id} className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div>
                  <h4 className="font-bold">{exp.role} at {exp.company}</h4>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                </div>
                <button onClick={() => handleDelete(exp.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
              </div>
            ))}
            {experiences.length === 0 && <p className="text-gray-500">No experiences added yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageExperience;
