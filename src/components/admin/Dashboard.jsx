import { useState } from 'react';
import { useDevice } from '../../hooks/useDevice';
import MobileAdmin from './MobileAdmin';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Sparkles, 
  LogOut, 
  ChevronRight, 
  ChevronDown,
  User,
  Briefcase,
  FolderOpen,
  Zap,
  Menu,
  X,
  Activity,
  Shield,
  Server
} from 'lucide-react';

import ManageProjects from './ManageProjects';
import ManageExperience from './ManageExperience';
import ManageSkills from './ManageSkills';
import ManageAbout from './ManageAbout';
import ManageResume from './ManageResume';
import InteractiveBackground from '../InteractiveBackground';

const Dashboard = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isManageExpanded, setManageExpanded] = useState(true);

  if (isMobile) {
    return <MobileAdmin />;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  System Overview
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>All systems operational. Security pipeline active.</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#10b981' }}>Live</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { label: 'Database Status', val: 'Connected', icon: <Server size={18} />, color: '#2997ff' },
                { label: 'Security Level', val: 'Enterprise', icon: <Shield size={18} />, color: '#10b981' },
                { label: 'AI Readiness', val: 'Optimal', icon: <Activity size={18} />, color: '#a855f7' },
                { label: 'Cloud Latency', val: '24ms', icon: <Zap size={18} />, color: '#eab308' }
              ].map(stat => (
                <div key={stat.label} className="glass" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.03)', background: 'rgba(255,255,255,0.01)' }}>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {stat.icon} {stat.label}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{stat.val}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
              <div className="glass" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Sparkles size={20} color="#a855f7" /> AI Capability Report
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { t: 'Multi-Agent Orchestration', d: 'Active via MAF GA Framework', p: '100%' },
                    { t: 'LaTeX Compilation Pipeline', d: 'Ready for deployment', p: '100%' },
                    { t: 'Resume Generation Logic', d: 'Synced with live CMS', p: '95%' }
                  ].map(item => (
                    <div key={item.t}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>{item.t}</span>
                        <span style={{ color: 'rgba(255,255,255,0.4)' }}>{item.p}</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: item.p }} style={{ height: '100%', background: 'linear-gradient(to right, #2997ff, #a855f7)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>System Logs</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { t: 'Auth Success', d: 'GitHub OAuth login', time: '2m ago' },
                    { t: 'DB Sync', d: 'Skills table updated', time: '15m ago' },
                    { t: 'Build Success', d: 'Netlify deploy complete', time: '1h ago' }
                  ].map(log => (
                    <div key={log.t} style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '1rem', fontSize: '0.85rem' }}>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{log.t}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)' }}>{log.d}</div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', marginTop: '0.25rem' }}>{log.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  const navItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
    color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '0.9rem',
    fontWeight: isActive ? 600 : 400,
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  });

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#020202', 
      color: '#fff', 
      fontFamily: 'var(--font-family)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <InteractiveBackground />

      {/* Sidebar */}
      <motion.div 
        animate={{ width: isSidebarCollapsed ? '84px' : '300px' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{
          background: 'rgba(10,10,10,0.8)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 100
        }}
      >
        {/* Sidebar Header */}
        <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: isSidebarCollapsed ? 'center' : 'space-between' }}>
          {!isSidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #2997ff, #a855f7)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(41,151,255,0.3)' }}>
                <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#fff' }}>P</span>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Command</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600 }}>Portal v2.0</div>
              </div>
            </motion.div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '0.6rem', borderRadius: '10px', display: 'flex' }}
          >
            {isSidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {/* Dashboard */}
          <button 
            onClick={() => setActiveTab('overview')}
            style={navItemStyle(activeTab === 'overview')}
            onMouseEnter={e => { if (activeTab !== 'overview') e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            onMouseLeave={e => { if (activeTab !== 'overview') e.currentTarget.style.background = 'transparent'; }}
          >
            <LayoutDashboard size={20} style={{ opacity: activeTab === 'overview' ? 1 : 0.6 }} />
            {!isSidebarCollapsed && <span>Control Center</span>}
          </button>

          {/* Manage Content (Collapsible Section) */}
          <div style={{ marginTop: '2rem' }}>
            {!isSidebarCollapsed && (
              <div style={{ padding: '0 1rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                <span>Core Management</span>
                <button onClick={() => setManageExpanded(!isManageExpanded)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  {isManageExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              </div>
            )}
            
            <AnimatePresence initial={false}>
              {(isManageExpanded || isSidebarCollapsed) && (
                <motion.div 
                  initial={isSidebarCollapsed ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={isSidebarCollapsed ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
                >
                  <button onClick={() => setActiveTab('about')} style={navItemStyle(activeTab === 'about')}>
                    <User size={18} />
                    {!isSidebarCollapsed && <span>Biometric Profile</span>}
                  </button>
                  <button onClick={() => setActiveTab('experience')} style={navItemStyle(activeTab === 'experience')}>
                    <Briefcase size={18} />
                    {!isSidebarCollapsed && <span>Career Nodes</span>}
                  </button>
                  <button onClick={() => setActiveTab('projects')} style={navItemStyle(activeTab === 'projects')}>
                    <FolderOpen size={18} />
                    {!isSidebarCollapsed && <span>Project Matrix</span>}
                  </button>
                  <button onClick={() => setActiveTab('skills')} style={navItemStyle(activeTab === 'skills')}>
                    <Zap size={18} />
                    {!isSidebarCollapsed && <span>Neural Skills</span>}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Resume Hub */}
          <div style={{ marginTop: '2rem' }}>
            {!isSidebarCollapsed && (
              <div style={{ padding: '0 1rem 0.75rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                AI Protocols
              </div>
            )}
            <button 
              onClick={() => setActiveTab('resume')}
              style={{
                ...navItemStyle(activeTab === 'resume'),
                background: activeTab === 'resume' ? 'linear-gradient(to right, rgba(41,151,255,0.1), rgba(168,85,247,0.1))' : 'transparent',
                border: activeTab === 'resume' ? '1px solid rgba(168,85,247,0.2)' : 'none'
              }}
            >
              <Sparkles size={20} color={activeTab === 'resume' ? '#a855f7' : 'currentColor'} />
              {!isSidebarCollapsed && <span style={{ color: activeTab === 'resume' ? '#d8b4fe' : 'inherit' }}>Resume Intelligence</span>}
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={handleSignOut}
            style={{
              ...navItemStyle(false),
              color: '#f87171',
              background: 'rgba(239,68,68,0.03)',
              border: '1px solid rgba(239,68,68,0.05)'
            }}
          >
            <LogOut size={20} />
            {!isSidebarCollapsed && <span>Deauthenticate</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div style={{ 
        flex: 1, 
        height: '100vh', 
        overflowY: 'auto', 
        padding: isSidebarCollapsed ? '4rem' : '4rem 6rem', 
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
