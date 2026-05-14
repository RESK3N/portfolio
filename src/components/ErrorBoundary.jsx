import React from 'react';
import { AlertCircle, RefreshCw, Terminal } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("CRITICAL SYSTEM FAILURE:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh', 
          background: '#050505', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '2rem',
          color: '#fff',
          fontFamily: 'monospace'
        }}>
          <div className="glass" style={{ 
            maxWidth: '600px', 
            padding: '3rem', 
            border: '1px solid rgba(248,113,113,0.2)', 
            background: 'rgba(248,113,113,0.02)',
            borderRadius: '24px',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '64px', height: '64px', background: 'rgba(248,113,113,0.1)', 
              borderRadius: '16px', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', margin: '0 auto 2rem' 
            }}>
              <AlertCircle size={32} color="#f87171" />
            </div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>Circuit Break Detected</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '2rem' }}>
              A critical module has failed. The system has automatically isolated the fault to protect your data.
            </p>
            
            <div style={{ 
              background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', 
              textAlign: 'left', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.05)',
              fontSize: '0.8rem', overflowX: 'auto'
            }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={14} /> ERROR_LOG:
              </div>
              <code style={{ color: 'rgba(255,255,255,0.7)' }}>
                {this.state.error?.toString()}
              </code>
            </div>

            <button 
              onClick={() => window.location.reload()}
              style={{ 
                padding: '1rem 2rem', background: '#fff', color: '#000', 
                border: 'none', borderRadius: '12px', fontWeight: 700, 
                cursor: 'pointer', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', gap: '0.75rem', width: '100%' 
              }}
            >
              <RefreshCw size={18} /> Re-initialize Core
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
