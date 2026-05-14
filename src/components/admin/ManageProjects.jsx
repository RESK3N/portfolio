import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    github_link: '',
    live_link: '',
    tags: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching projects:', error);
    else setProjects(data || []);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const projectData = {
      ...formData,
      tags: tagsArray
    };

    const { error } = await supabase.from('projects').insert([projectData]);
    
    if (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project');
    } else {
      setFormData({ title: '', description: '', image_url: '', github_link: '', live_link: '', tags: '' });
      fetchProjects();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) console.error('Error deleting:', error);
    else fetchProjects();
  };

  return (
    <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
      
      <form onSubmit={handleSubmit} className="mb-12 space-y-4 max-w-2xl">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">Add New Project</h3>
        <div className="grid grid-cols-2 gap-4">
          <input required name="title" value={formData.title} onChange={handleInputChange} placeholder="Project Title" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
          <input name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Tags (comma separated)" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        </div>
        <textarea required name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows="3" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent"></textarea>
        <input name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="Image URL (e.g. from Supabase Storage)" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        <div className="grid grid-cols-2 gap-4">
          <input name="github_link" value={formData.github_link} onChange={handleInputChange} placeholder="GitHub Link" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
          <input name="live_link" value={formData.live_link} onChange={handleInputChange} placeholder="Live Link" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Add Project</button>
      </form>

      <div>
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">Existing Projects</h3>
        {loading ? <p>Loading...</p> : (
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div>
                  <h4 className="font-bold">{project.title}</h4>
                  <p className="text-sm text-gray-500">{project.description.substring(0, 50)}...</p>
                </div>
                <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
              </div>
            ))}
            {projects.length === 0 && <p className="text-gray-500">No projects added yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;
