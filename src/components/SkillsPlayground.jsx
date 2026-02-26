import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const SKILLS_DATA = [
  // Previous core ones
  { name: 'React', color: '#00bcd4', logo: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
  { name: 'JavaScript', color: '#F7DF1E', logo: '/assets/logos/javascript.png' },
  { name: 'SQL', color: '#336791', logo: 'https://cdn.worldvectorlogo.com/logos/postgresql.svg' },
  // User's new list
  { name: 'GSAP', color: '#88ce02', logo: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg' },
  { name: 'TypeScript', color: '#3178C6', logo: 'https://cdn.worldvectorlogo.com/logos/typescript.svg' },
  { name: 'MongoDB', color: '#47A248', logo: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
  { name: 'Supabase', color: '#000000', logo: '/assets/logos/supabase.webp' },
  { name: 'Git', color: '#333333', logo: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg' },
  { name: 'Docker', color: '#000000', logo: '/assets/logos/docker.png' },
  { name: 'Kubernetes', color: '#000000', logo: '/assets/logos/kubernetes.png' },
  { name: 'Node.js', color: '#339933', logo: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
  { name: 'Solana', color: '#000000', logo: '/assets/logos/solana.jpg' },
  { name: 'Rust', color: '#CE412B', logo: 'https://cdn.worldvectorlogo.com/logos/rust.svg' },
  { name: 'Vercel', color: '#000000', logo: '/assets/logos/vercel.png' },
  { name: 'Next.js', color: '#333333', logo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
  { name: 'Three.js', color: '#a8ffb5', logo: 'https://cdn.worldvectorlogo.com/logos/threejs-1.svg' },
  { name: 'PyTorch', color: '#3B82F6', logo: 'https://cdn.worldvectorlogo.com/logos/pytorch-2.svg' },
  { name: 'Tailwind', color: '#F05032', logo: '/assets/logos/tailwind.svg' },
  { name: 'Python', color: '#3776AB', logo: 'https://cdn.worldvectorlogo.com/logos/python-5.svg' },
  { name: 'Java', color: '#333333', logo: 'https://cdn.worldvectorlogo.com/logos/java-4.svg' },
  { name: 'Flutter', color: '#02569B', logo: 'https://cdn.worldvectorlogo.com/logos/flutter.svg' },
  { name: 'NumPy', color: '#013243', logo: 'https://cdn.worldvectorlogo.com/logos/numpy-1.svg' },
  { name: 'Streamlit', color: '#1A1A1A', logo: '/assets/logos/streamlit.png' },
  { name: 'Redis', color: '#D82C20', logo: 'https://cdn.worldvectorlogo.com/logos/redis.svg' },
  { name: 'LangChain', color: '#000000', logo: '/assets/logos/langchain.png' },
];

export default function SkillsPlayground() {
  const containerRef = useRef(null);
  const imagesRef = useRef({});

  useEffect(() => {
    if (!containerRef.current) return;

    // Preload images
    SKILLS_DATA.forEach(skill => {
      const img = new Image();
      img.src = skill.logo;
      img.onload = () => { imagesRef.current[skill.name] = img; };
    });

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    const engine = Engine.create({ enableSleeping: false });
    engine.gravity.y = 1.3;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio
      }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Physical Boundaries (Invisible)
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      friction: 0.1,
      restitution: 0.8 // Bouncy walls
    };
    
    // Large width/height for walls to ensure coverage even on resize
    const wallThickness = 500;
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, 5000, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, 5000, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, 5000, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, 5000, wallThickness, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    // Create boxes
    const bodies = SKILLS_DATA.map((skill, i) => {
      const boxSize = 110; 
      const x = (width / 2) + (Math.random() - 0.5) * (width * 0.85); // Wider spread
      const y = Math.random() * (height - 300) + 100;

      return Bodies.rectangle(x, y, boxSize, boxSize, {
        chamfer: { radius: 14 },
        restitution: 0.5,
        friction: 0.1,
        frictionAir: 0.01,
        label: skill.name,
        plugin: { color: skill.color }
      });
    });

    Composite.add(engine.world, bodies);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Custom Render Logic
    Events.on(render, 'afterRender', () => {
      const context = render.context;

      bodies.forEach(body => {
        const { x, y } = body.position;
        const angle = body.angle;
        const color = body.plugin.color;
        const name = body.label;
        const img = imagesRef.current[name];

        context.save();
        context.translate(x, y);
        context.rotate(angle);

        // Draw Box
        const s = 110, r = 14;
        context.beginPath();
        context.moveTo(-s/2 + r, -s/2);
        context.lineTo(s/2 - r, -s/2);
        context.quadraticCurveTo(s/2, -s/2, s/2, -s/2+r);
        context.lineTo(s/2, s/2 - r);
        context.quadraticCurveTo(s/2, s/2, s/2 - r, s/2);
        context.lineTo(-s/2 + r, s/2);
        context.quadraticCurveTo(-s/2, s/2, -s/2, s/2 - r);
        context.lineTo(-s/2, -s/2 + r);
        context.quadraticCurveTo(-s/2, -s/2, -s/2 + r, -s/2);
        context.closePath();
        
        context.fillStyle = color;
        context.fill();
        context.strokeStyle = 'rgba(255,255,255,0.25)';
        context.lineWidth = 1.5;
        context.stroke();

        // Draw Image/Logo
        if (img) {
          const iconSize = 50;
          context.drawImage(img, -iconSize/2, -iconSize/2 - 10, iconSize, iconSize);
        }

        // Draw Label - Always White for visibility
        context.fillStyle = '#ffffff';
        context.font = 'bold 13px Inter, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(name, 0, 32);

        context.restore();
      });
    });

    // Handle Resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      // Update Render dimensions
      render.options.width = newWidth;
      render.options.height = newHeight;
      render.canvas.width = newWidth * (window.devicePixelRatio || 1);
      render.canvas.height = newHeight * (window.devicePixelRatio || 1);
      render.canvas.style.width = `${newWidth}px`;
      render.canvas.style.height = `${newHeight}px`;

      // Update Wall positions (walls are wide enough to not need scaling)
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
      Matter.Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });
      Matter.Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -wallThickness / 2 });
    };

    // More robust: ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      render.canvas.remove();
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="skills-playground-container"
      style={{
        width: '100%',
        height: '600px',
        position: 'relative',
        background: '#0d0d0f',
        borderRadius: '32px 32px 0 0',
        border: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        marginTop: '40px',
        overflow: 'hidden',
        cursor: 'grab'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        pointerEvents: 'none',
        zIndex: 10
      }} />
    </div>
  );
}
