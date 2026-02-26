import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { personal, social } from '../data/portfolio';

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Playground',  href: '#skills' },
  { label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['home', ...navLinks.map(l => l.href.slice(1))];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(sections[i]); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Fixed Navbar with floating pill container ── */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}>
        {/* Floating pill — mx-4 mt-4 rounded-2xl like reference */}
        <div style={{
          margin: '16px 16px 0',
          borderRadius: '16px',
          border: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)'}`,
          background: scrolled ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.20)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
        }}>
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            height: '64px',
            background: scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '16px',
            transition: 'all 0.3s ease',
            border: scrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              style={{ textDecoration: 'none', position: 'relative', zIndex: 10 }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '20px',
                background: 'linear-gradient(135deg, var(--accent-cyan), #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}>
                {personal.name}
              </span>
            </a>

            {/* Desktop Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="md-nav">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  style={{
                    position: 'relative',
                    padding: '10px 16px',
                    fontSize: '15px',
                    fontWeight: 500,
                    borderRadius: '12px',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, background 0.2s ease',
                    color: active === link.href.slice(1) ? '#fff' : 'rgba(156,163,175,1)',
                    background: active === link.href.slice(1) ? 'rgba(255,255,255,0.06)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (active !== link.href.slice(1)) e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { if (active !== link.href.slice(1)) e.currentTarget.style.color = 'rgba(156,163,175,1)'; }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: Let's Talk CTA + mobile toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className="navbar-cta md-nav"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: '#fff',
                  background: 'rgba(59, 130, 246, 0.1)', // Subtle blue base
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#3b82f6'; // Vibrant blue hover
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                  e.currentTarget.style.boxShadow = '0 0 0 rgba(59, 130, 246, 0)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(1px) scale(0.98)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-1px) scale(1)'; }}
              >
                Let's Talk
              </a>

              {/* Mobile toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="mobile-menu-btn"
                style={{
                  display: 'none',
                  width: '44px', height: '44px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#d1d5db',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 199, backdropFilter: 'blur(4px)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div style={{
        position: 'fixed',
        right: 0, top: 0, bottom: 0,
        width: '85%', maxWidth: '320px',
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(255,255,255,0.10)',
        padding: '24px',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '18px',
            background: 'linear-gradient(135deg, var(--accent-cyan), #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>{personal.name}</span>
          <button onClick={() => setMenuOpen(false)} style={{ width: 44, height: 44, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.05)', color: '#d1d5db', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '16px' }}>
          {[{ label: 'Home', href: '#home' }, ...navLinks].map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                color: active === link.href.slice(1) ? 'var(--accent-cyan)' : 'rgba(209,213,219,1)',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: 500,
                background: active === link.href.slice(1) ? 'rgba(34,211,238,0.06)' : 'transparent',
                border: '1px solid transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = active === link.href.slice(1) ? 'rgba(34,211,238,0.06)' : 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '14px', borderRadius: '12px',
              color: '#fff', fontWeight: 600, textDecoration: 'none',
              background: '#3b82f6', // Solid blue for mobile impact
              border: '1px solid #3b82f6',
              transition: 'all 0.2s ease',
            }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.96)'; e.currentTarget.style.opacity = '0.9'; }}
            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
          >
            Let's Talk
          </a>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          {social.github   && <a href={social.github}   target="_blank" rel="noopener noreferrer" className="social-btn"><Github   size={18}/></a>}
          {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn"><Linkedin size={18}/></a>}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .md-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
