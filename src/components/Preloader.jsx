import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const canvasRef = useRef(null);
  const [terminalLines, setTerminalLines] = useState([
    { text: '~/rushikesh-portfolio', type: 'info' },
  ]);

  // Optimized Matrix Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = '01';
    const fontSize = 14;
    const columns = width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#0f8';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [showScanner, setShowScanner] = useState(false);

  // Simplified & Faster Terminal Typing
  useEffect(() => {
    const commands = [
      { text: '~/workspace', type: 'info' },
      { text: '$ git init && git add .', type: 'cmd' },
      { text: '$ git commit -m "chore: bootstrap"', type: 'cmd' },
      { text: '$ pnpm i && pnpm dev', type: 'cmd' },
      { text: '  ⌛ compiling...', type: 'info' },
      { text: '✓ types ok · ✓ lint ok · ✓ built in 1.23s', type: 'success' },
      { text: '>> PORTFOLIO V2 ENGINE: OPERATIONAL', type: 'success' },
    ];

    const typeCommand = async (commandObj) => {
      let currentText = '';
      const fullText = commandObj.text;
      
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          currentText = fullText.substring(0, currentText.length + 1);
          setTerminalLines(prev => {
            const next = [...prev];
            const lastLine = next[next.length - 1];
            
            if (lastLine && lastLine.text !== fullText && lastLine.type === commandObj.type) {
              next[next.length - 1] = { ...commandObj, text: currentText };
            } else if (currentText.length === 1) {
              next.push({ ...commandObj, text: currentText });
            } else {
              next[next.length - 1] = { ...commandObj, text: currentText };
            }
            return next;
          });

          if (currentText === fullText) {
            clearInterval(interval);
            setTimeout(resolve, 200); 
          }
        }, 15); 
      });
    };

    const runSequence = async () => {
      await new Promise(r => setTimeout(r, 400));
      for (const cmd of commands) {
        await typeCommand(cmd);
      }
      
      // Trigger scanner effect
      setShowScanner(true);

      // Quick fade out after sequence and scanner completes
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -80, 
        duration: 0.6,
        delay: 1.8, // Exactly matches scanner duration
        ease: 'power3.in',
        onComplete: onComplete
      });
    };

    runSequence();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Fira Code', 'Courier New', monospace",
        gap: '40px'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
        }}
      />
      
      {/* Terminal Box */}
      <div
        ref={terminalRef}
        style={{
          position: 'relative',
          width: 'min(550px, 90vw)',
          minHeight: '120px',
          background: 'rgba(5, 10, 20, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 0 40px rgba(34, 211, 238, 0.15), 0 30px 60px rgba(0,0,0,0.9)',
          overflow: 'hidden',
          color: '#fff',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', opacity: 0.5 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
        </div>

        {terminalLines.map((line, i) => (
          <div
            key={i}
            style={{
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.01em',
              color: line.text.startsWith('~/') ? '#22d3ee' : 
                     line.text.startsWith('✓') || line.text.includes('OPERATIONAL') ? '#10b981' : 
                     line.text.startsWith('$') ? '#facc15' : 'rgba(255,255,255,0.9)',
            }}
          >
            {line.text}
          </div>
        ))}
        {/* Blinking Cursor */}
        <div style={{ 
          display: 'inline-block', 
          width: '8px', height: '16px', 
          background: '#22d3ee', 
          marginLeft: '4px', 
          verticalAlign: 'middle',
          animation: 'blink 1s step-end infinite'
        }} />
      </div>

      {/* Floating Code Line with Scanner Effect */}
      <div style={{
        position: 'relative',
        padding: '12px 24px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        fontSize: '14px',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }}>
        <span style={{ color: '#6366f1' }}>const</span> app = <span style={{ color: '#22d3ee' }}>init</span>(skills) ={'>'} {'{'} <span style={{ color: '#a855f7' }}>return</span> skills.<span style={{ color: '#10b981' }}>map</span>(s) && <span style={{ color: '#22d3ee' }}>deploy</span>(s) {'}'}
        
        {/* Flashy Scanner Light */}
        {showScanner && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.6), transparent)',
            animation: 'scanner 1.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards',
            filter: 'blur(8px)'
          }} />
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scanner {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(500%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
