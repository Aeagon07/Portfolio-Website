import { useEffect, useRef } from 'react';

const TRAIL_COUNT = 6;

export default function CursorGlow() {
  const dotRef    = useRef(null);
  const glowRef   = useRef(null);
  const trailRefs = useRef([]);

  useEffect(() => {
    const dot   = dotRef.current;
    const glow  = glowRef.current;
    const trail = trailRefs.current;
    if (!dot || !glow) return;

    // Each trail dot has its own lerped position
    const positions = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));
    let mouseX = 0, mouseY = 0;
    let glowX  = 0, glowY  = 0;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Snap the main dot instantly
      dot.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
    };

    // Lerp factors: first trail is fastest (closest to cursor), last is slowest
    const lerpFactors = [0.35, 0.25, 0.18, 0.13, 0.09, 0.06];

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Each trail dot lerps towards the previous one (0 → cursor, 1 → trail[0], etc.)
      positions.forEach((pos, i) => {
        const targetX = i === 0 ? mouseX : positions[i - 1].x;
        const targetY = i === 0 ? mouseY : positions[i - 1].y;
        pos.x += (targetX - pos.x) * lerpFactors[i];
        pos.y += (targetY - pos.y) * lerpFactors[i];
        if (trail[i]) {
          trail[i].style.transform = `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0) scale(${1 - i * 0.1})`;
        }
      });

      // Glow blob follows even slower
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow.style.transform = `translate3d(${glowX - 60}px, ${glowY - 60}px, 0)`;
    };

    window.addEventListener('mousemove', onMouseMove);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Opacity decreases as trail index increases: 0.291 → 0.058 → 0
  const trailOpacities = [0.291667, 0.233333, 0.175, 0.116667, 0.0583333, 0];

  return (
    <>
      {/* 6 trailing ghost dots */}
      {trailOpacities.map((opacity, i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          className="cursor-trail"
          style={{ opacity }}
        />
      ))}

      {/* Large glow halo */}
      <div className="cursor-glow" ref={glowRef} />

      {/* Sharp cursor dot */}
      <div className="cursor-dot" ref={dotRef} />

      {/* Film grain */}
      <div className="noise-overlay" />
    </>
  );
}
