import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Award, Cloud, Code2, Layers, Palette } from 'lucide-react';
import { certificates } from '../data/portfolio';

const iconMap = {
  cloud: Cloud,
  'code-2': Code2,
  layers: Layers,
  palette: Palette,
};

const themeColors = {
  gold: { primary: '#f59e0b', secondary: '#0a0a0c' },
  teal: { primary: '#14b8a6', secondary: '#0a0a0c' },
  blue: { primary: '#3b82f6', secondary: '#0a0a0c' },
  crimson: { primary: '#e11d48', secondary: '#0a0a0c' },
};

function CertificateCard({ cert }) {
  const Icon = iconMap[cert.icon] || Award;
  const theme = themeColors[cert.color] || themeColors.blue;

  return (
    <motion.div 
      className="certificate-card-wrapper"
      initial="initial"
      whileHover="hover"
    >
      <div className="certificate-envelope">
        {/* Certificate Paper (Back Layer) */}
        <motion.div 
          className="cert-paper"
          variants={{
            initial: { y: 0, rotate: 0, x: 0 },
            hover: { y: -140, rotate: -5, x: 10 }
          }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <div className="cert-paper-inner">
            <div className="cert-paper-title">CERTIFICATE</div>
            <div className="cert-paper-subtitle">OF ACHIEVEMENT</div>
            
            <div style={{ color: '#333', fontSize: '0.8rem', fontWeight: 600, margin: '15px 0', textAlign: 'center' }}>
              {cert.title}
            </div>

            <div className="cert-red-seal">
              <Award size={20} color="white" />
            </div>
          </div>
        </motion.div>

        {/* Envelope Base (Front Layer) */}
        <div 
          className="envelope-base" 
          style={{ 
            background: `linear-gradient(180deg, ${theme.primary}, ${theme.secondary})`,
            '--accent-color': theme.primary
          }}
        >
          <div className="envelope-flap"></div>
          
          <div className="envelope-info">
            <h3 className="envelope-title">{cert.title}</h3>
            
            <div className="envelope-meta">
              <div className="meta-item">
                <Icon size={14} />
                <span>{cert.issuer}</span>
              </div>
              <div className="meta-item">
                <span>{cert.date}</span>
              </div>
            </div>

            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cert-view-link"
            >
              View <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCertificates = certificates.length;
  
  // Responsive cards to show
  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      if (window.innerWidth < 1440) return 3;
    }
    return 4;
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  React.useEffect(() => {
    const handleResize = () => setCardsToShow(getCardsToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, totalCertificates - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="certificates">
      <div className="maxWidthContainer">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="premium-certificates-title">
            Premium <span className="gradient-text-cyan">Certificates</span>
          </h2>
          <p className="section-subtitle">
            Hover each certificate to reveal its details.
          </p>
        </motion.div>

        <motion.div 
          className="certificates-slider-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <button className="slider-arrow" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>

          <div className="certificates-track-wrapper">
            <motion.div 
              className="certificates-track"
              animate={{ x: `-${currentIndex * (100 / cardsToShow)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {certificates.map((cert) => (
                <div key={cert.id} className="certificate-slide">
                  <CertificateCard cert={cert} />
                </div>
              ))}
            </motion.div>
          </div>

          <button className="slider-arrow" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
        </motion.div>

        <div className="slider-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <div 
              key={i} 
              className={`dot ${i === currentIndex ? 'active' : ''}`} 
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
