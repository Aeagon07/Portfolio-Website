import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { projects } from '../data/portfolio';

export default function Projects() {
  const featuredProjects = projects ? projects.filter(p => p.featured) : [];
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  if (!featuredProjects.length) return null;

  const activeProject = featuredProjects[activeIdx] || featuredProjects[0];

  const nextProject = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % featuredProjects.length);
  };
  const prevProject = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <section id="projects" style={{ 
      padding: 'clamp(60px, 8vw, 80px) 24px', 
      position: 'relative',
      background: `radial-gradient(circle at 70% 30%, ${activeProject.themeColor}08 0%, #0a0a0c 70%)`,
      transition: 'background 0.8s ease',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header - Compact */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
            Featured <span style={{ color: activeProject.themeColor, transition: 'color 0.8s ease' }}>Projects</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginTop: '10px' }}>
            Transforming ideas into digital reality.
          </p>
        </div>

        {/* Featured Slider */}
        <div className="featured-slider-container" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: '60px',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Left: Image/Screenshot */}
          <div style={{ position: 'relative', perspective: '1000px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, rotateY: direction * 5, scale: 0.98 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -direction * 5, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                style={{
                  aspectRatio: '16/10',
                  borderRadius: '24px',
                  border: `1px solid ${activeProject.themeColor}25`,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: `0 30px 60px -15px ${activeProject.themeColor}12`,
                  transition: 'border 0.8s ease, box-shadow 0.8s ease',
                  transformStyle: 'preserve-3d'
                }}
              >
                <img 
                  src={activeProject.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"} 
                  alt={activeProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Left Arrow on Image - Uniform Glossy */}
                <button onClick={prevProject} className="slider-nav-btn overlay-left compact-glossy">
                  <ChevronLeft size={20} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Details */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Right Arrow floating in the details area - Uniform Glossy */}
            <button 
              onClick={nextProject} 
              className="slider-nav-btn floating-right compact-glossy"
              style={{ 
                position: 'absolute', 
                right: '-15px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                zIndex: 20
              }}
            >
              <ChevronRight size={20} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ width: '100%' }}
              >
                <span style={{ 
                  background: `${activeProject.themeColor}15`, 
                  color: activeProject.themeColor,
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.8s ease'
                }}>
                  {activeProject.category}
                </span>

                <h3 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#fff', margin: '16px 0 12px', lineHeight: 1.1 }}>
                  {activeProject.title}
                </h3>

                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '95%' }}>
                  {activeProject.description}
                </p>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '0.8rem', color: '#fff', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>Key Highlights</h4>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    {activeProject.features.slice(0, 4).map((feature, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                        <Check size={14} style={{ color: activeProject.themeColor }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '36px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {activeProject.tags.map(tag => (
                      <span key={tag} className="tech-pill-themed" style={{ '--accent-color': activeProject.themeColor, padding: '6px 14px', fontSize: '0.8rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <a 
                    href={activeProject.liveLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-premium-compact"
                    style={{ '--btn-color': activeProject.themeColor }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a href={activeProject.githubLink} target="_blank" rel="noreferrer" className="btn-premium-compact secondary">
                    <Github size={16} /> Source
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
