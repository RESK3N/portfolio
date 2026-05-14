import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import ManageProjects from './ManageProjects';
import ManageExperience from './ManageExperience';
import ManageSkills from './ManageSkills';
import ManageAbout from './ManageAbout';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ManageProjects />;
      case 'experience':
        return <ManageExperience />;
      case 'skills':
        return <ManageSkills />;
      case 'about':
        return <ManageAbout />;
      case 'overview':
      default:
        return (
          <>
            <h1 className="text-3xl font-bold mb-8">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">Supabase Setup</h3>
                <p className="text-sm font-medium">To use the dynamic sections, ensure you run the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">supabase_schema.sql</code> file in your Supabase SQL Editor.</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa] dark:bg-[#000] text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-[#111] border-r border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'overview' ? 'bg-gray-100 dark:bg-gray-800' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('about')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'about' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}`}>Manage About</button>
          <button onClick={() => setActiveTab('projects')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}`}>Manage Projects</button>
          <button onClick={() => setActiveTab('experience')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'experience' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}`}>Manage Experience</button>
          <button onClick={() => setActiveTab('skills')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'skills' ? 'bg-gray-100 dark:bg-gray-800 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}`}>Manage Skills</button>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={handleSignOut}
            className="w-full px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-500/20 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
