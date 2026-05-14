import { supabase } from '../../utils/supabaseClient';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/admin`
      }
    });
    if (error) console.error('GitHub login error:', error.message);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '3rem 2.5rem',
          textAlign: 'center',
        }}
      >
        {/* Lock Icon */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          Admin Access
        </h1>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          marginBottom: '2.5rem'
        }}>
          Sign in with GitHub to manage your portfolio
        </p>

        <motion.button
          onClick={handleGitHubLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '0.875rem 1.5rem',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          Continue with GitHub
        </motion.button>

        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          marginTop: '1.5rem',
          opacity: 0.6
        }}>
          Only authorized accounts can access the dashboard
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

