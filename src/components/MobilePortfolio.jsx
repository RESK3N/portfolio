import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';
import { 
  Menu, X, Code2, ExternalLink, Mail, 
  MessageCircle, ArrowRight, Zap, Code, 
  User, Briefcase, FileText, Globe, Cpu
} from 'lucide-react';

const MobilePortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [data, setData] = useState({ about: '', projects: [], experience: [], skills: [] });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  useEffect(() => {
    const fetchData = async () => {
      const { data: about } = await supabase.from('about').select('*').limit(1);
      const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      const { data: experience } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
      const { data: skills } = await supabase.from('skills').select('*');
      
      setData({
        about: about?.[0]?.content || '',
        projects: projects || [],
        experience: experience || [],
        skills: skills || []
      });
    };
    fetchData();
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: <User size={20} /> },
    { id: 'projects', label: 'Work', icon: <Code size={20} /> },
    { id: 'experience', label: 'Career', icon: <Briefcase size={20} /> },
    { id: 'architecture', label: 'Core', icon: <Cpu size={20} /> }
  ];

  return (
    <div 
      ref={containerRef}
      style={{ 
        background: '#020202', 
        minHeight: '100vh', 
        color: '#fff', 
        fontFamily: 'Inter, sans-serif', 
        overflowX: 'hidden',
        scrollBehavior: 'smooth'
      }}
    >
      {/* Cinematic Starfield Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 100%)' }} />
        {/* Animated Nebulae */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', background: 'radial-gradient(circle at 20% 30%, rgba(41,151,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.15) 0%, transparent 50%)', filter: 'blur(60px)' }} 
        />
        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
            style={{ position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '2px', height: '2px', background: '#fff', borderRadius: '50%' }}
          />
        ))}
      </div>

      <main style={{ position: 'relative', zIndex: 1, paddingBottom: '120px' }}>
        {/* Hero Section: Hyper-Premium */}
        <section id="hero" style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>AI Engineer & Cloud Ops</span>
            </div>
            
            <h1 style={{ fontSize: '3.8rem', fontWeight: 900, lineHeight: 0.95, margin: '1rem 0', letterSpacing: '-0.05em' }}>
              Pritam<br/>
              <span style={{ color: '#2997ff' }}>Mondal.</span>
            </h1>
            
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '90%', marginTop: '1.5rem' }}>
              Crafting intelligent agentic systems and scalable cloud architectures.
            </p>

            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
              <motion.a 
                whileTap={{ scale: 0.95 }}
                href="mailto:999.pritammondal@gmail.com"
                style={{ flex: 1, padding: '1.25rem', background: '#fff', color: '#000', borderRadius: '20px', fontWeight: 800, textAlign: 'center', textDecoration: 'none', boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }}
              >
                Say Hello
              </motion.a>
              <motion.a 
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/918967345961?text=Hey,%20I%20was%20visiting%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  width: '65px', 
                  height: '65px', 
                  background: 'rgba(37,211,102,0.15)', 
                  border: '1px solid rgba(37,211,102,0.3)', 
                  borderRadius: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textDecoration: 'none',
                  color: '#25D366'
                }}
              >
                <MessageCircle size={28} />
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Work Showcase: Vertical Flow */}
        <section id="projects" style={{ padding: '4rem 1.5rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>Selected<br/>Work</h2>
            <div style={{ width: '40px', height: '4px', background: '#2997ff', marginTop: '1rem', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {data.projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass"
                style={{ 
                  padding: '2rem', 
                  borderRadius: '32px', 
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(41,151,255,0.1)', borderRadius: '14px' }}>
                    <Code2 size={24} color="#2997ff" />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {project.github_link && <a href={project.github_link} style={{ padding: '0.5rem', color: 'rgba(255,255,255,0.3)' }}><Globe size={20} /></a>}
                    <ArrowRight size={20} style={{ transform: 'rotate(-45deg)', opacity: 0.4 }} />
                  </div>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem' }}>{project.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.tags?.map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', color: 'rgba(255,255,255,0.6)' }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience: Interactive Timeline */}
        <section id="experience" style={{ padding: '4rem 1.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem' }}>Career Path</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
            {data.experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ position: 'relative' }}
              >
                <div style={{ position: 'absolute', left: '-2.1rem', top: '0.3rem', width: '16px', height: '16px', borderRadius: '50%', background: '#020202', border: '3px solid #a855f7', boxShadow: '0 0 15px rgba(168,85,247,0.5)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase' }}>{exp.duration}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.5rem 0' }}>{exp.role}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{exp.company}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Glass Island Navigation */}
      <nav style={{ position: 'fixed', bottom: '2rem', left: '1rem', right: '1rem', zIndex: 1000 }}>
        <div style={{ 
          background: 'rgba(15,15,15,0.7)', 
          backdropFilter: 'blur(25px) saturate(180%)', 
          borderRadius: '32px', 
          border: '1px solid rgba(255,255,255,0.1)', 
          padding: '0.75rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}>
          {navItems.map(item => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setActiveSection(item.id); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ 
                background: activeSection === item.id ? 'rgba(255,255,255,0.1)' : 'transparent', 
                border: 'none', 
                borderRadius: '24px',
                padding: '0.75rem',
                color: activeSection === item.id ? '#2997ff' : 'rgba(255,255,255,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.3s ease'
              }}
            >
              {item.icon}
              <span style={{ fontSize: '0.6rem', fontWeight: 800 }}>{item.label}</span>
            </motion.button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobilePortfolio;

