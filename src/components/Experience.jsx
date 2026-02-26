import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { experience } from '../data/portfolio';

function ExperienceCard({ item, index, isMobile }) {
  const isEven = index % 2 === 0;
  const displayLeft = !isMobile && isEven;

  return (
    <div 
      className={`timeline-item-container ${displayLeft ? 'left' : 'right'}`}
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : (displayLeft ? 'flex-start' : 'flex-end'),
        padding: isMobile ? '24px 0 24px 40px' : '40px 0',
        width: '100%',
        position: 'relative'
      }}
    >
      {/* Connector Dot on the line */}
      <div 
        style={{
          position: 'absolute',
          left: isMobile ? '0' : '50%',
          top: isMobile ? '40px' : '50%',
          transform: isMobile ? 'translateX(-50%)' : 'translate(-50%, -50%)',
          zIndex: 10,
          width: isMobile ? '32px' : '40px',
          height: isMobile ? '32px' : '40px',
          borderRadius: '50%',
          background: '#0a0a0c',
          border: '2px solid var(--accent-cyan)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(76, 230, 255, 0.3)'
        }}
      >
        {item.type === 'education' ? <GraduationCap size={isMobile ? 14 : 18} color="var(--accent-purple)" /> : <Briefcase size={isMobile ? 14 : 18} color="var(--accent-cyan)" />}
      </div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, x: isMobile ? 50 : (displayLeft ? -100 : 100), rotate: isMobile ? 0 : (displayLeft ? -5 : 5) }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card experience-card"
        style={{
          width: isMobile ? '100%' : 'calc(50% - 60px)',
          padding: isMobile ? '24px' : '32px',
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px'
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', opacity: 0.8 }}>
            {item.duration}
          </span>
          <h3 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
            {item.role}
          </h3>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
            {item.company}
          </p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
          {item.description.map((desc, i) => (
            <li key={i} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', lineHeight: 1.6 }}>
              {desc}
            </li>
          ))}
        </ul>

        {item.skills && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {item.skills.map(skill => (
              <span key={skill} className="skill-tag-mini">
                {skill}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} style={{ padding: isMobile ? '80px 20px' : '120px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '100px' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
            Experience
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: isMobile ? '1rem' : '1.2rem', marginTop: '16px' }}>
            A journey through my career — building, breaking, and learning with passion.
          </p>
        </motion.div>

        <div className="experience-timeline-wrapper" style={{ position: 'relative' }}>
          {/* Central Line Background */}
          <div 
            style={{
              position: 'absolute',
              left: isMobile ? '0' : '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'rgba(255, 255, 255, 0.05)',
              transform: isMobile ? 'none' : 'translateX(-50%)'
            }}
          />

          {/* Animated Progress Line */}
          <motion.div 
            style={{
              position: 'absolute',
              left: isMobile ? '0' : '50%',
              top: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple))',
              transform: isMobile ? 'none' : 'translateX(-50%)',
              scaleY,
              originY: 0
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
            {experience && experience.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
