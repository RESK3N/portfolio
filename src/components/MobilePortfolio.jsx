import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';
import TruthAnimation from './TruthAnimation';
import ImageModal from './ImageModal';
import { 
  Menu, X, Code2, ExternalLink, Mail, Maximize2,
  MessageCircle, ArrowRight, Zap, Code, 
  User, Briefcase, FileText, Globe, Cpu, Layers, Layout, ShieldCheck, Settings
} from 'lucide-react';

const MobilePortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [data, setData] = useState({ about: '', projects: [], experience: [], skills: [] });
  const [selectedImage, setSelectedImage] = useState(null);
  const { scrollYProgress } = useScroll();

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

  // Professionalized Nav Naming
  const navItems = [
    { id: 'home', label: 'Home', icon: <User size={20} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={20} /> },
    { id: 'architecture', label: 'Tech', icon: <Layers size={20} /> },
    { id: 'stack', label: 'Stack', icon: <Cpu size={20} /> }
  ];

  // Active Section Scroll Listener (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = ['home', 'experience', 'projects', 'architecture', 'stack'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

  return (
    <div 
      style={{ 
        background: '#020202', 
        minHeight: '100vh', 
        color: '#fff', 
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Cinematic Starfield Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 100%)' }} />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', background: 'radial-gradient(circle at 20% 30%, rgba(41,151,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.15) 0%, transparent 50%)', filter: 'blur(60px)' }} 
        />
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
        {/* Hero Section - Upgraded with Desktop Aesthetics */}
        <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2rem', position: 'relative', overflow: 'hidden' }}>
          {/* Desktop-style abstract gradient */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '-20%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(41,151,255,0.1) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
              zIndex: -1,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '-0.02em' }}>
                Hi, I'm
              </span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ fontSize: '3.8rem', fontWeight: 900, lineHeight: 0.95, margin: '0 0 1.5rem 0', letterSpacing: '-0.06em' }}
            >
              Pritam<br/>
              <span style={{ color: '#2997ff' }}>Mondal.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ marginBottom: '2.5rem' }}
            >
              <span style={{ 
                fontSize: '0.9rem', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em',
                background: 'linear-gradient(135deg, #2997ff 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                AI Engineer & Cloud Ops
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '100%', marginBottom: '4rem' }}
            >
              I build intelligent, agentic systems and scalable web applications. 
              Driven by modern design and powerful automation.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              <motion.a 
                whileTap={{ scale: 0.95 }}
                href="mailto:999.pritammondal@gmail.com"
                style={{ flex: 1, padding: '1.25rem', background: 'linear-gradient(135deg, #2997ff 0%, #a855f7 100%)', color: '#fff', borderRadius: '20px', fontWeight: 800, textAlign: 'center', textDecoration: 'none', boxShadow: '0 8px 16px rgba(41,151,255,0.15)' }}
              >
                Say Hello
              </motion.a>
              <motion.a 
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/918967345961?text=Hey,%20I%20was%20visiting%20your%20website."
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '65px', height: '65px', background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.559 4.189 1.623 6.006L0 24l6.135-1.61a11.751 11.751 0 005.914 1.594h.005c6.637 0 12.032-5.396 12.035-12.03.003-3.213-1.248-6.231-3.522-8.508z"/>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </section>

        <TruthAnimation />

        {/* Experience: High-Impact Timeline */}
        <section id="experience" style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, rgba(168,85,247,0.05) 0%, transparent 100%)' }}>
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>Professional<br/><span style={{ color: '#a855f7' }}>Journey.</span></h2>
            <div style={{ width: '60px', height: '4px', background: '#a855f7', marginTop: '1.5rem', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', borderLeft: '1px solid rgba(168,85,247,0.2)', paddingLeft: '1.8rem', marginLeft: '0.5rem' }}>
            {data.experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ position: 'relative' }}
              >
                {/* Pulsing Dot */}
                <div style={{ position: 'absolute', left: '-2.4rem', top: '0.4rem', width: '18px', height: '18px', borderRadius: '50%', background: '#020202', border: '3px solid #a855f7', boxShadow: '0 0 20px rgba(168,85,247,0.6)' }}>
                   <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: '1px solid #a855f7' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{exp.duration}</span>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.1 }}>{exp.role}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '1.5px', background: 'rgba(255,255,255,0.3)' }} />
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, margin: 0, fontSize: '1.1rem' }}>{exp.company}</p>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <ul style={{ color: 'rgba(255,255,255,0.4)', listStyleType: 'none', padding: 0, margin: 0 }}>
                    {exp.description?.split('\n').map((bullet, idx) => bullet.trim() && (
                      <li key={idx} style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        <span style={{ color: '#a855f7', fontWeight: 900 }}>→</span>
                        {bullet.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Showcase: High-Impact Design */}
        <section id="projects" style={{ padding: '4rem 0' }}>
          <div style={{ padding: '0 1.5rem', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em' }}>Selected <br/><span style={{ color: '#2997ff' }}>Works.</span></h2>
            <div style={{ width: '60px', height: '4px', background: '#2997ff', marginTop: '1.5rem', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {data.projects.map((project, index) => {
              const isEven = index % 2 === 0;
              const isVidIntell = project.title === 'VidIntelligence';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  style={{ 
                    position: 'relative',
                    padding: isVidIntell ? '0' : '0 1.5rem'
                  }}
                >
                  {/* Subtle Background Glow for each project */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '20%', 
                    left: isEven ? '10%' : 'auto', 
                    right: isEven ? 'auto' : '10%',
                    width: '150px', 
                    height: '150px', 
                    background: index % 2 === 0 ? 'rgba(41,151,255,0.1)' : 'rgba(168,85,247,0.1)',
                    filter: 'blur(80px)',
                    zIndex: 0
                  }} />

                  <div className={isVidIntell ? "" : "glass"} style={{ 
                    padding: isVidIntell ? '2rem 1.5rem' : '2.5rem', 
                    borderRadius: isVidIntell ? '0' : '32px', 
                    border: isVidIntell ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    background: isVidIntell ? 'rgba(41,151,255,0.03)' : 'rgba(255,255,255,0.02)',
                    position: 'relative',
                    zIndex: 1,
                    overflow: 'hidden'
                  }}>
                    {/* Project Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2997ff', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>Featured Project</div>
                        <h3 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.1 }}>{project.title}</h3>
                      </div>
                      <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '14px' }}>
                        <Code2 size={24} color="#2997ff" />
                      </div>
                    </div>

                    {/* Immersive Image Display */}
                    {isVidIntell ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        <motion.div 
                          whileTap={{ scale: 0.98 }}
                          style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'zoom-in', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                          onClick={() => setSelectedImage({ src: "/vidintelligence-mistral.png", alt: "Mistral Analysis" })}
                        >
                          <img src="/vidintelligence-mistral.png" alt="Mistral Analysis" style={{ width: '100%', display: 'block' }} />
                          <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', padding: '10px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '50%', color: '#fff' }}>
                            <Maximize2 size={20} />
                          </div>
                        </motion.div>
                        <motion.div 
                          whileTap={{ scale: 0.98 }}
                          style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'zoom-in', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                          onClick={() => setSelectedImage({ src: "/vidintelligence-new.png", alt: "Empty UI" })}
                        >
                          <img src="/vidintelligence-new.png" alt="Empty UI" style={{ width: '100%', display: 'block' }} />
                          <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', padding: '10px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '50%', color: '#fff' }}>
                            <Maximize2 size={20} />
                          </div>
                        </motion.div>
                      </div>
                    ) : (project.title === 'AI-Powered Portfolio & Resume Engine' || project.title === 'Agentic AI Portfolio & Experience Hub') ? (
                      <motion.div 
                        whileTap={{ scale: 0.98 }}
                        style={{ marginBottom: '2.5rem', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'zoom-in', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                        onClick={() => setSelectedImage({ src: "/resume-real.png", alt: project.title })}
                      >
                        <img src="/resume-real.png" alt={project.title} style={{ width: '100%', display: 'block' }} />
                        <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', padding: '10px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '50%', color: '#fff' }}>
                          <Maximize2 size={20} />
                        </div>
                      </motion.div>
                    ) : project.image_url && (
                      <motion.div 
                        whileTap={{ scale: 0.98 }}
                        style={{ marginBottom: '2.5rem', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'zoom-in', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                        onClick={() => setSelectedImage({ src: project.image_url, alt: project.title })}
                      >
                        <img src={project.image_url} alt={project.title} style={{ width: '100%', display: 'block' }} />
                        <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', padding: '10px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '50%', color: '#fff' }}>
                          <Maximize2 size={20} />
                        </div>
                      </motion.div>
                    )}

                    {/* Project Footer Details */}
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>{project.description}</p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {project.tags?.map(tag => (
                        <span key={tag} style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 700,
                          padding: '0.5rem 1rem', 
                          background: 'rgba(255,255,255,0.05)', 
                          borderRadius: '100px',
                          color: '#2997ff',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" style={{ padding: '6rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(168,85,247,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={22} color="#a855f7" />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: 0 }}>The Architecture</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* Functions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: <FileText size={22} color="#2997ff" />, title: "Resume Engine", desc: "Real-time LaTeX sync via Gemini AI." },
                { icon: <Settings size={22} color="#a855f7" />, title: "Command Portal", desc: "Centralized professional orchestration." },
                { icon: <ShieldCheck size={22} color="#10b981" />, title: "Identity Pipeline", desc: "GitHub OAuth + Supabase RLS security." }
              ].map((fn, i) => (
                <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div>{fn.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>{fn.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>{fn.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Admin Showcase */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {[
                { title: 'Command Portal', img: '/dashboard-real.png' },
                { title: 'Project Matrix', img: '/projects-real.png' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="glass" style={{ padding: '0.35rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{item.title}</h4>
                  <div style={{ width: '40px', height: '2px', background: '#2997ff', borderRadius: '2px' }}></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stack Section */}
        <section id="stack" style={{ padding: '4rem 1.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2.5rem' }}>Core Stack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {data.skills.map((skill) => (
              <div key={skill.id} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{skill.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: '0.25rem' }}>{skill.category}</div>
              </div>
            ))}
          </div>
        </section>
        {/* Profile Section - Signature Footer */}
        <section style={{ padding: '6rem 2rem 10rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(0deg, rgba(41,151,255,0.05) 0%, transparent 100%)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid rgba(255,255,255,0.1)',
              boxShadow: '0 0 50px rgba(41,151,255,0.2)',
              marginBottom: '2.5rem'
            }}
          >
            <img 
              src="https://augtdugzpbkejuqnztmm.supabase.co/storage/v1/object/public/portfolio/profile.png" 
              alt="Pritam Mondal" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </motion.div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Pritam Mondal</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI Engineer • Cloud Ops</p>
          </div>
        </section>
      </main>
      {/* Floating Navigation */}
      <nav style={{ position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: 1000, paddingBottom: 'env(safe-area-inset-bottom, 1.5rem)' }}>
        <div style={{ 
          background: '#0a0a0a', 
          borderTop: '1px solid rgba(255,255,255,0.08)', 
          padding: '0.75rem 1rem', 
          display: 'flex', 
          justifyContent: 'space-around', 
          alignItems: 'center',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.8)'
        }}>
          {navItems.map(item => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => { 
                setActiveSection(item.id); 
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ 
                border: 'none', 
                background: 'none',
                padding: '0.5rem',
                color: activeSection === item.id ? '#2997ff' : 'rgba(255,255,255,0.45)', // Much better visibility
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '0.35rem',
                position: 'relative',
                flex: 1
              }}
            >
              {item.icon}
              <span style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {item.label}
              </span>
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeDot"
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    width: '4px',
                    height: '4px',
                    background: '#2997ff',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(41,151,255,0.8)'
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </nav>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        src={selectedImage?.src} 
        alt={selectedImage?.alt} 
      />
    </div>
  );
};

export default MobilePortfolio;
