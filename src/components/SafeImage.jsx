import { useState } from 'react';
import { ImageOff } from 'lucide-react';

const SafeImage = ({ src, alt, style, className }) => {
  const [error, setError] = useState(false);

  // High-end placeholder gradient
  const placeholderStyle = {
    ...style,
    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255,255,255,0.05)',
    position: 'relative',
    overflow: 'hidden'
  };

  if (error || !src) {
    return (
      <div style={placeholderStyle} className={className}>
        <div style={{ textAlign: 'center', opacity: 0.2 }}>
          <ImageOff size={style?.width ? parseInt(style.width) / 4 : 24} />
          <div style={{ fontSize: '0.6rem', marginTop: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Media Unavailable
          </div>
        </div>
        {/* Subtle animation in placeholder */}
        <div style={{ 
          position: 'absolute', inset: 0, 
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
          animation: 'shimmer 2s infinite'
        }} />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      style={style} 
      className={className} 
      onError={() => {
        console.warn(`[SystemMonitor] Failed to load image: ${src}`);
        setError(true);
      }}
    />
  );
};

export default SafeImage;
