import { motion } from 'framer-motion';
import SkillsPlayground from './SkillsPlayground';

export default function Skills() {
  return (
    <section id="skills" style={{ padding: 'clamp(60px, 8vw, 80px) 24px', position: 'relative' }}>
      <div className="glow-orb-cyan" style={{
        position: 'absolute', left: '-8%', top: '15%',
        width: '450px', height: '450px', opacity: 0.15, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header - Minimalist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            margin: 0
          }}>
            Skills <span className="gradient-text-purple">Playground</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginTop: '12px' }}>
            Drag, throw, and watch them bounce!
          </p>
        </motion.div>

        {/* Skills Playground */}
        <SkillsPlayground />
      </div>
    </section>
  );
}
