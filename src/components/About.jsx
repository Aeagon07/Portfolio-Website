import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Code2, Coffee, Lightbulb, Rocket, GraduationCap, School, BookOpen, Trophy, Github as GithubIcon, Database, ExternalLink, Award, Star, GitCommit, GitPullRequest, AlertCircle, Share2 } from 'lucide-react';
import { SiPython, SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiMongodb, SiTailwindcss, SiCplusplus } from 'react-icons/si';
import { personal, leetcodeStats, githubStats, education, achievements, social } from '../data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }
  }),
};

// Orbiting Icons Component
function OrbitingIcons() {
  const icons = [
    { icon: <SiPython size={22} />, color: '#3776ab', delay: 0 },
    { icon: <SiReact size={22} />, color: '#61dafb', delay: 4.5 },
    { icon: <SiJavascript size={22} />, color: '#f7df1e', delay: 9 },
    { icon: <SiTypescript size={22} />, color: '#3178c6', delay: 13.5 },
    { icon: <SiNodedotjs size={22} />, color: '#339933', delay: 18 },
    { icon: <SiMongodb size={22} />, color: '#47a248', delay: 22.5 },
    { icon: <SiTailwindcss size={22} />, color: '#06b6d4', delay: 27 },
    { icon: <SiCplusplus size={22} />, color: '#00599c', delay: 31.5 },
  ];

  return (
    <div className="orbit-container">
      {icons.map((item, i) => (
        <div
          key={i}
          className="orbiting-icon"
          style={{
            '--radius': 'clamp(120px, 15vw, 180px)',
            animation: `orbit 36s linear infinite`,
            animationDelay: `-${item.delay}s`,
            color: item.color,
          }}
        >
          {item.icon}
        </div>
      ))}
      {/* Central Profile Image */}
      <div style={{
        position: 'relative',
        width: 'clamp(140px, 18vw, 220px)',
        aspectRatio: '1',
        borderRadius: '50%',
        padding: '8px',
        background: 'linear-gradient(135deg, rgba(76,230,255,0.2), rgba(139,92,246,0.2))',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 0 30px rgba(76, 230, 255, 0.2)',
        }}>
          {personal.avatar ? (
            <img src={personal.avatar} alt={personal.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 0%' }} />
          ) : (
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', fontSize: '3rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
               {personal.firstName?.[0]}{personal.lastName?.[0]}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

// LeetCode Card Component
function LeetCodeCard({ index }) {
  const { totalSolved, totalQuestions, rank, badges, reputation, categories } = leetcodeStats;
  const percentage = (totalSolved / totalQuestions) * 100;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div 
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      whileHover={{ scale: 1.02, y: -5, boxShadow: '0 0 25px rgba(76, 230, 255, 0.2)' }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card leetcode-card" 
      style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}
    >
      <div className="card-header">
        <Code2 className="gradient-text-cyan" size={24} />
        <h3 className="card-title">LeetCode</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '24px' }}>
        <div className="progress-circle-container">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle className="progress-circle-bg" cx="50" cy="50" r="40" />
            <circle 
              className="progress-circle-value" 
              cx="50" cy="50" r="40"
              style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
            />
          </svg>
          <div className="progress-text">
            <span className="progress-number">{totalSolved}</span>
            <span className="progress-label">{totalQuestions}</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="glass-card" style={{ padding: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '14px', fontWeight: 800 }}>{rank}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>RANK</div>
          </div>
          <div className="glass-card" style={{ padding: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#facc15' }}>{badges}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>BADGES</div>
          </div>
          <div className="glass-card" style={{ gridColumn: 'span 2', padding: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-purple)' }}>{reputation}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>REPUTATION</div>
          </div>
        </div>
      </div>

      <div className="difficulty-bars" style={{ marginTop: 'auto' }}>
        {categories.map((cat) => (
          <div key={cat.name} className="difficulty-item">
            <div className="difficulty-info">
              <span>{cat.name}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{cat.solved}/{cat.total} <span style={{ color: cat.color, marginLeft: '8px' }}>Beats {cat.beats}%</span></span>
            </div>
            <div className="difficulty-bar-bg">
              <div 
                className="difficulty-bar-fill"
                style={{ width: `${(cat.solved / cat.total) * 100}%`, backgroundColor: cat.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// GitHub Card Component
function GitHubCard({ index }) {
  const { grade, stars, commits, prs, issues, contributedTo, languages } = githubStats;
  
  return (
    <motion.div 
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      whileHover={{ scale: 1.02, y: -5, boxShadow: '0 0 25px rgba(139, 92, 246, 0.2)' }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card github-card"
      style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}
    >
      <div className="card-header">
        <GithubIcon className="gradient-text-purple" size={24} />
        <h3 className="card-title">Github</h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
        <div style={{ 
          width: '85px', height: '85px', borderRadius: '20px', 
          background: 'rgba(139, 92, 246, 0.1)', border: '2px solid var(--accent-purple)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)', flexShrink: 0
        }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>GRADE</span>
          <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-purple)', lineHeight: 1 }}>{grade}</span>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div className="glass-card" style={{ padding: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '15px', fontWeight: 800 }}>{stars}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>STARS</div>
          </div>
          <div className="glass-card" style={{ padding: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '15px', fontWeight: 800 }}>{contributedTo}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Repositories</div>
          </div>
          <div className="glass-card" style={{ padding: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '15px', fontWeight: 800 }}>{prs}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PRs</div>
          </div>
          <div className="glass-card" style={{ padding: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '15px', fontWeight: 800 }}>{issues}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ISSUES</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ 
          padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Share2 size={16} style={{ color: 'var(--accent-purple)' }} />
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>Contributions </span>
            <span style={{ marginLeft: 'auto', fontWeight: 800, color: 'var(--accent-purple)', fontSize: '16px' }}>{commits}</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <div className="language-bar">
            {languages.map((lang, i) => (
              <div 
                key={i} 
                className="language-segment" 
                style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }} 
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 16px', marginTop: '16px' }}>
            {languages.map((lang, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', minWidth: '80px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: lang.color }} />
                {lang.name} {lang.percentage}%
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Helper to render bold text from **text**
const renderFormattedText = (text) => {
  if (typeof text !== 'string') return text;
  return text.split('**').map((part, i) => 
    i % 2 === 1 ? <strong key={i} style={{ color: '#fff', textShadow: '0 0 12px rgba(76, 230, 255, 0.8)', fontWeight: 800 }}>{part}</strong> : part
  );
};

// Timeline Component for Education/Achievements
function Timeline({ data, type }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="timeline-container"
      style={{ position: 'relative' }}
    >
      {/* Sequence 1: Animated Vertical Line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 'calc(100% - 24px)' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          left: '5px',
          top: '12px',
          width: '2px',
          background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-green), var(--accent-purple), transparent)',
          zIndex: 1,
          originY: 0
        }}
      />

      {data.map((item, i) => (
        <div key={item.id} className="timeline-item">
          {/* Sequence 2: Animated Dot (Staggered after line starts) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.3 }}
            style={{
              position: 'absolute',
              left: '0',
              top: '12px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'var(--accent-cyan)',
              border: '2px solid #000',
              boxShadow: '0 0 10px var(--accent-cyan)',
              zIndex: 2
            }}
          />

          {/* Sequence 3: Animated Card (Staggered with dot) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
          >
            <div className="glass-card timeline-card">
              <div className="timeline-date">{item.duration}</div>
              <div className="timeline-title">{item.title}</div>
              <div className="timeline-org">
                {type === 'education' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{item.institution}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {Array.isArray(item.result) ? (
                        item.result.map((res, ri) => (
                          <motion.div 
                            key={ri}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + i * 0.15 + ri * 0.1 }}
                            style={{ 
                              color: 'var(--accent-cyan)', 
                              fontSize: '0.85rem', 
                              display: 'flex', 
                              alignItems: 'flex-start', 
                              gap: '8px',
                              lineHeight: 1.4 
                            }}
                          >
                            <span style={{ marginTop: '6px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-cyan)', flexShrink: 0, boxShadow: '0 0 8px var(--accent-cyan)' }} />
                            <span>{renderFormattedText(res)}</span>
                          </motion.div>
                        ))
                      ) : (
                        <div style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>
                          {renderFormattedText(item.result)}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ color: 'rgba(255,255,255,0.7)' }}>{item.institution}</div>
                )}
              </div>
              {item.description && (
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState('education');
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="about" style={{ padding: 'clamp(80px, 10vw, 120px) 24px', position: 'relative' }}>
      {/* Background Orbs */}
      <div className="glow-orb-cyan" style={{ position: 'absolute', left: '-10%', top: '10%', width: '500px', height: '500px', opacity: 0.2 }} />
      <div className="glow-orb-purple" style={{ position: 'absolute', right: '-10%', bottom: '10%', width: '500px', height: '500px', opacity: 0.2 }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <span className="section-label">About Me</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginTop: '12px',
          }}>
            Building the <span className="gradient-text-cyan">future</span> of the web
          </h2>
        </motion.div>

        {/* Top Section: Avatar Orbit + Intro */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          {/* Left: Orbiting Icons */}
          <div style={{ 
            height: isMobile ? '300px' : 'clamp(300px, 40vw, 450px)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            transform: isMobile ? 'scale(0.8)' : 'none'
          }}>
            <OrbitingIcons />
          </div>

          {/* Right: Intro Text */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p
              style={{
                fontSize: isMobile ? '16px' : 'clamp(17px, 2.5vw, 20px)',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
                padding: isMobile ? '0 10px' : '0',
                fontWeight: 500,
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {personal.bio}
            </p>
          </motion.div>
        </div>

        {/* Stats Section: Side-by-Side Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px', 
          marginBottom: '80px' 
        }}>
          <GitHubCard index={0} />
          <LeetCodeCard index={1} />
        </div>

        {/* Bottom Section: Tabs */}
        <motion.div 
          className="tabs-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <GraduationCap size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Education
            </button>
            <button 
              className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              <Trophy size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Achievements
            </button>
          </div>

          <div style={{ minHeight: '400px', position: 'relative' }}>
            <AnimatePresence mode="wait">
              {activeTab === 'education' ? (
                <Timeline key="edu" data={education} type="education" />
              ) : (
                <Timeline key="ach" data={achievements} type="achievements" />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginTop: '80px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href={social.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <GithubIcon size={18} />
            Explore GitHub
          </a>
          <a href="#contact" className="btn-secondary">
            <Mail size={18} />
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
