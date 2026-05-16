import { motion } from 'framer-motion';
import { 
  Cpu, Database, Globe, ShieldCheck, Zap, 
  Code2, Terminal, Layers, Lock, GitBranch, 
  FileText, Settings, Layout, ArrowRight
} from 'lucide-react';

const BuiltWith = () => {
  const techStack = [
    { name: 'React', usage: 'Core frontend framework for building the reactive UI components.', category: 'Frontend' },
    { name: 'Vite', usage: 'High-performance build tool and development server for lightning-fast loads.', category: 'Frontend' },
    { name: 'Framer Motion', usage: 'Powering every animation and transition for a premium, organic feel.', category: 'Frontend' },
    { name: 'Vanilla CSS', usage: 'Custom-crafted design system with CSS variables for maximum flexibility.', category: 'Frontend' },
    { name: 'Supabase (PostgreSQL)', usage: 'Real-time database and secure authentication provider.', category: 'Backend' },
    { name: 'Netlify Functions', usage: 'Serverless architecture for AI processing and PDF compilation logic.', category: 'Backend' },
    { name: 'Google Gemini AI', usage: 'The intelligent brain behind the automated resume generation.', category: 'AI' },
    { name: 'MAF (GA)', usage: 'Microsoft Agent Framework (General Availability) for multi-agent orchestration.', category: 'AI' },
    { name: 'GitHub OAuth', usage: 'Secure, token-based authentication for the administrative dashboard.', category: 'Security' },
    { name: 'CI/CD Pipeline', usage: 'Automated build and deployment workflow via GitHub Actions and Netlify.', category: 'DevOps' },
    { name: 'Dependabot', usage: 'Automated dependency monitoring and security patch management.', category: 'DevOps' }
  ];

  const functions = [
    {
      icon: <FileText size={24} color="#2997ff" />,
      title: "Dynamic Resume Engine",
      detail: "An automated pipeline that instantly synchronizes with your live database. Whenever you add a new skill or experience in the CMS, the engine updates your potential resume in real-time, generating a perfectly formatted LaTeX document without any manual prompts."
    },
    {
      icon: <Settings size={24} color="#a855f7" />,
      title: "Integrated Command Center",
      detail: "A centralized hub where you manage your entire professional presence. Adding a project or updating a role here triggers a chain reaction that keeps your portfolio, your resume, and your AI agents perfectly in sync."
    },
    {
      icon: <ShieldCheck size={24} color="#10b981" />,
      title: "Secure Identity Pipeline",
      detail: "Leverages GitHub OAuth and Supabase RLS (Row Level Security) to ensure that only you can orchestrate your data. Every mutation is tracked, and every AI prompt is secured behind an enterprise-grade auth layer."
    }
  ];

  const adminShowcase = [
    { title: 'System Overview', img: 'https://augtdugzpbkejuqnztmm.supabase.co/storage/v1/object/public/portfolio/dashboard-real.png', desc: 'Real-time monitoring of database status, AI readiness, and system logs.' },
    { title: 'Project Matrix', img: 'https://augtdugzpbkejuqnztmm.supabase.co/storage/v1/object/public/portfolio/projects-real.png', desc: 'Seamless management of your professional project gallery with live syncing.' },
    { title: 'Resume Intelligence', img: 'https://augtdugzpbkejuqnztmm.supabase.co/storage/v1/object/public/portfolio/resume-real.png', desc: 'High-end synthesis interface for Gemini-powered LaTeX resume generation.' }
  ];

  return (
    <section id="architecture" style={{ padding: '8rem 2rem', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem' }}>Inside the Architecture.</h2>
          <p style={{ maxWidth: '850px', margin: '0 auto', fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            A deep dive into the technologies, functions, and automated workflows that power this high-performance portfolio. 
            From AI orchestration to real-time data synchronization.
          </p>
        </motion.div>

        {/* Section 1: Tech Stack & Usage */}
        <div style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(41,151,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code2 size={24} color="#2997ff" />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.75rem' }}>Technology & Usage Matrix</h3>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass"
                style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{tech.name}</span>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent-color)', letterSpacing: '0.05em' }}>{tech.category}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{tech.usage}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Core Website Functions */}
        <div style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(168,85,247,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={24} color="#a855f7" />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.75rem' }}>Core Capabilities</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {functions.map((fn, i) => (
              <motion.div
                key={fn.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ position: 'relative', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div style={{ marginBottom: '1.5rem' }}>{fn.icon}</div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{fn.title}</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{fn.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Admin Dashboard Showcase */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(16,185,129,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layout size={24} color="#10b981" />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.75rem' }}>Real-Time Command Portal</h3>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '700px' }}>
            The administrative interface is a high-end control center designed for seamless professional orchestration. 
            Below are live screenshots of the primary sections.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {adminShowcase.map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: i % 2 === 0 ? '1.5fr 1fr' : '1fr 1.5fr', 
                  gap: '3rem', 
                  alignItems: 'center' 
                }}
              >
                <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                  <div className="glass" style={{ padding: '0.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', borderRadius: '12px', display: 'block' }} />
                  </div>
                </div>
                <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
                  <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.1rem', marginBottom: '2rem' }}>{item.desc}</p>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltWith;
