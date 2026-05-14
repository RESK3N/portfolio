import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import ManageProjects from './ManageProjects';
import ManageExperience from './ManageExperience';
import ManageSkills from './ManageSkills';
import ManageAbout from './ManageAbout';
import ManageResume from './ManageResume';
import { 
  LayoutDashboard, Sparkles, LogOut, 
  Settings, Briefcase, Code, User, FileText,
  Menu, X, Activity, Server, Shield
} from 'lucide-react';

const MobileAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={22} /> },
    { id: 'experience', label: 'Career', icon: <Briefcase size={22} /> },
    { id: 'skills', label: 'Skills', icon: <Settings size={22} /> },
    { id: 'resume', label: 'AI Resume', icon: <Sparkles size={22} /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'projects': return <ManageProjects />;
      case 'experience': return <ManageExperience />;
      case 'skills': return <ManageSkills />;
      case 'about': return <ManageAbout />;
      case 'resume': return <ManageResume />;
      case 'overview':
      default:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Activity size={20} color="#2997ff" />
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>System Status</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Database</div>
                  <div style={{ color: '#10b981', fontWeight: 700 }}>ACTIVE</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>AI Node</div>
                  <div style={{ color: '#a855f7', fontWeight: 700 }}>OPTIMAL</div>
                </div>
              </div>
            </div>

            <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button onClick={() => setActiveTab('resume')} style={{ padding: '1rem', background: 'linear-gradient(to right, #a855f7, #2997ff)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} /> Generate Resume
                </button>
                <button onClick={() => setActiveTab('projects')} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontWeight: 600 }}>
                  Add New Project
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ background: '#020202', minHeight: '100vh', color: '#fff', paddingBottom: '100px' }}>
      {/* Mobile Admin Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, padding: '1rem 1.5rem', background: 'rgba(2,2,2,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#2997ff', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Command</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>Portal Hub</div>
        </div>
        <button onClick={handleLogout} style={{ padding: '0.5rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '10px', color: '#f87171' }}>
          <LogOut size={20} />
        </button>
      </header>

      <main style={{ padding: '1.5rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(30px)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '0.75rem 0.5rem calc(0.75rem + env(safe-area-inset-bottom))', display: 'flex', justifyContent: 'space-around', zIndex: 1000 }}>
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{ 
              background: 'none', border: 'none', 
              color: activeTab === item.id ? '#2997ff' : 'rgba(255,255,255,0.3)', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
              width: '20%'
            }}
          >
            <div style={{ 
              padding: '0.5rem', 
              borderRadius: '12px',
              background: activeTab === item.id ? 'rgba(41,151,255,0.1)' : 'transparent',
              color: activeTab === item.id ? '#2997ff' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {item.icon}
            </div>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '-0.01em' }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MobileAdmin;
