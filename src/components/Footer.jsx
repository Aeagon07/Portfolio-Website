import { Github, Linkedin, Mail } from 'lucide-react';
import { personal, social } from '../data/portfolio';

export default function Footer() {
  return (
    <footer style={{ 
      padding: '120px 24px 60px', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Centered Large Gradient Name */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 10vw, 8rem)',
        fontWeight: 900,
        textAlign: 'center',
        margin: '0 0 60px 0',
        background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      }}>
        {personal.name}
      </h2>

      {/* Social Icons centered */}
      <div style={{
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        marginBottom: '80px',
      }}>
        {social.github && (
          <a href={social.github} target="_blank" rel="noopener noreferrer" 
            style={{ 
              color: 'rgba(255,255,255,0.5)', 
              transition: 'color 0.3s ease, transform 0.3s ease',
              display: 'flex',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Github size={24} />
          </a>
        )}
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
            style={{ 
              color: 'rgba(255,255,255,0.5)', 
              transition: 'color 0.3s ease, transform 0.3s ease',
              display: 'flex',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Linkedin size={24} />
          </a>
        )}
        {personal.email && (
          <a href={`mailto:${personal.email}`}
            style={{ 
              color: 'rgba(255,255,255,0.5)', 
              transition: 'color 0.3s ease, transform 0.3s ease',
              display: 'flex',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Mail size={24} />
          </a>
        )}
      </div>

      {/* Simplified Center Copyright */}
      <div style={{
        textAlign: 'center',
        fontSize: '14px',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        © {new Date().getFullYear()} {personal.name}
      </div>
    </footer>
  );
}
