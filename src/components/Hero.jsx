import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { personal, social } from '../data/portfolio';
import ThreeScene from './ThreeScene';

/* ─── Typing Role ─────────────────────────────────────── */
function TypingRole({ roles }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDel] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) { const t = setTimeout(() => setPause(false), 1400); return () => clearTimeout(t); }
    const current = roles[index];
    const speed = deleting ? 38 : 68;
    const timer = setTimeout(() => {
      if (!deleting && text === current) { setPause(true); setDel(true); }
      else if (deleting && text === '') { setDel(false); setIndex(i => (i + 1) % roles.length); }
      else { setText(prev => deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)); }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, index, roles, pause]);

  return (
    <span style={{ color: 'rgba(255,255,255,0.7)' }}>
      {text}<span className="typed-cursor" />
    </span>
  );
}

/* ─── Fade-up variant ─────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.13, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

/* ─── Hero Section ────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  /* ── CTA Scroll helper ── */
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* ══════════════════════════════════════════════════
          AMBIENT GLOW PLANES  (matching new.html data-plane divs)
         ══════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Bottom fade to black */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
          height: '160px',
          pointerEvents: 'none',
          background: 'linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 80%)',
        }} />
      </div>

      <ThreeScene />

      {/* ══════════════════════════════════════════════════
          HERO TEXT CONTENT  (above everything)
         ══════════════════════════════════════════════════ */}
      <motion.div
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '120px 24px 80px',
          maxWidth: '900px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Name */}
        <motion.h1
          variants={fadeUp}
          custom={0}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 10vw, 7.5rem)', // Scaled down slightly to fit on one line
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#fff',
            whiteSpace: 'nowrap', // Force one line
            marginBottom: '18px',
            textShadow: '0 2px 40px rgba(0,0,0,0.7)',
          }}
        >
          {personal.name}
        </motion.h1>

        {/* Typing role */}
        <motion.div
          variants={fadeUp}
          custom={1}
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 'clamp(1.05rem, 2.8vw, 1.45rem)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '36px',
            minHeight: '2rem',
          }}
        >
          <TypingRole roles={personal.roles} />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          custom={2}
          style={{
            display: 'flex', gap: '14px', flexWrap: 'wrap',
            justifyContent: 'center', marginBottom: '30px',
          }}
        >
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); scrollTo('contact'); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 32px',
              borderRadius: '100px',
              background: '#fff',
              color: '#000',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Contact Me
          </a>
          <a
            href={personal.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 32px',
              borderRadius: '100px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.30)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            My Resume
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          variants={fadeUp}
          custom={3}
          style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '24px', color: 'rgba(255,255,255,0.6)' }}
        >
          {social.github && (
            <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="hero-social-icon">
              <Github size={22} />
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="hero-social-icon">
              <Linkedin size={22} />
            </a>
          )}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        onClick={() => scrollTo('about')}
        style={{
          position: 'absolute', bottom: '36px', left: '50%',
          transform: 'translateX(-50%)',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          zIndex: 10,
        }}
      >
        {/* Mouse shell */}
        <div style={{
          width: '24px',
          height: '40px',
          borderRadius: '14px',
          border: '2px solid rgba(156,163,175,0.6)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '5px',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent-cyan)',
            animation: 'scrollBounce 1.5s ease-in-out infinite',
          }} />
        </div>
        <span style={{
          fontSize: '11px', color: 'rgba(255,255,255,0.40)',
          letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
        }}>
          Scroll
        </span>
      </motion.button>
    </section>
  );
}
