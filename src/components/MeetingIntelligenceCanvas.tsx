import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  phase: 'burst' | 'organize' | 'network';
  connections: number[];
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
  strength: number;
}

export const MeetingIntelligenceCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const [animationPhase, setAnimationPhase] = useState<'burst' | 'organize' | 'network'>('burst');
  const [isVisible, setIsVisible] = useState(false);

  // Device-based performance settings
  const getParticleCount = () => {
    const width = window.innerWidth;
    if (width < 768) return 20; // Mobile
    if (width < 1024) return 40; // Tablet
    return 60; // Desktop
  };

  // Initialize particles
  const initializeParticles = (canvas: HTMLCanvasElement) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const particleCount = getParticleCount();
    
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      const targetX = centerX + Math.cos(angle) * distance * (2 + Math.random());
      const targetY = centerY + Math.sin(angle) * distance * (1.5 + Math.random());
      
      return {
        x: centerX,
        y: centerY,
        targetX,
        targetY,
        vx: Math.cos(angle) * (2 + Math.random() * 3),
        vy: Math.sin(angle) * (2 + Math.random() * 3),
        size: Math.random() * 4 + 2,
        opacity: 0,
        color: `hsl(${45 + Math.random() * 30}, 70%, 60%)`, // Amber variations
        phase: 'burst',
        connections: []
      };
    });

    connectionsRef.current = [];
  };

  // Update particle positions and behavior
  const updateParticles = (canvas: HTMLCanvasElement, deltaTime: number) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particlesRef.current.forEach((particle, i) => {
      switch (animationPhase) {
        case 'burst':
          // Burst outward from center
          particle.x += particle.vx * deltaTime * 60;
          particle.y += particle.vy * deltaTime * 60;
          particle.vx *= 0.98; // Friction
          particle.vy *= 0.98;
          particle.opacity = Math.min(particle.opacity + deltaTime * 2, 1);
          
          // Check if burst is complete
          if (Math.abs(particle.vx) < 0.1 && Math.abs(particle.vy) < 0.1) {
            particle.phase = 'organize';
          }
          break;

        case 'organize':
          // Move towards organized positions
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          particle.x += dx * deltaTime * 2;
          particle.y += dy * deltaTime * 2;
          
          // Change color to brand purple
          particle.color = `hsl(${250 + Math.random() * 20}, 70%, 60%)`;
          
          // Create connections
          if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
            particle.phase = 'network';
            createConnections(i);
          }
          break;

        case 'network':
          // Subtle floating motion
          const time = Date.now() * 0.001;
          particle.x = particle.targetX + Math.sin(time + i * 0.5) * 5;
          particle.y = particle.targetY + Math.cos(time + i * 0.3) * 3;
          
          // Success green color
          particle.color = `hsl(${140 + Math.random() * 20}, 70%, 50%)`;
          break;
      }
    });

    // Update connections
    connectionsRef.current.forEach(connection => {
      if (animationPhase === 'network') {
        connection.opacity = Math.min(connection.opacity + deltaTime, 0.6);
        connection.strength = Math.min(connection.strength + deltaTime * 0.5, 1);
      }
    });
  };

  // Create intelligent connections between particles
  const createConnections = (particleIndex: number) => {
    const particle = particlesRef.current[particleIndex];
    const maxConnections = 3;
    const maxDistance = 120;

    particlesRef.current.forEach((other, otherIndex) => {
      if (otherIndex === particleIndex || particle.connections.length >= maxConnections) return;
      
      const dx = other.x - particle.x;
      const dy = other.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance && Math.random() > 0.7) {
        particle.connections.push(otherIndex);
        connectionsRef.current.push({
          from: particleIndex,
          to: otherIndex,
          opacity: 0,
          strength: 0
        });
      }
    });
  };

  // Render function
  const render = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // Clear with subtle gradient background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(255, 247, 243, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 247, 243, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render connections
    connectionsRef.current.forEach(connection => {
      const fromParticle = particlesRef.current[connection.from];
      const toParticle = particlesRef.current[connection.to];
      
      if (fromParticle && toParticle && connection.opacity > 0) {
        ctx.beginPath();
        ctx.moveTo(fromParticle.x, fromParticle.y);
        ctx.lineTo(toParticle.x, toParticle.y);
        
        const gradient = ctx.createLinearGradient(
          fromParticle.x, fromParticle.y,
          toParticle.x, toParticle.y
        );
        gradient.addColorStop(0, `hsla(250, 70%, 60%, ${connection.opacity})`);
        gradient.addColorStop(1, `hsla(140, 70%, 50%, ${connection.opacity})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = connection.strength * 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    });

    // Render particles
    particlesRef.current.forEach(particle => {
      if (particle.opacity > 0) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, particle.color.replace(/[\d.]+\)$/g, '0)'));
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Inner bright core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        
        ctx.globalAlpha = 1;
      }
    });
  };

  // Animation loop
  const animate = (timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const deltaTime = Math.min((timestamp - (animate.lastTime || 0)) / 1000, 0.016);
    animate.lastTime = timestamp;

    updateParticles(canvas, deltaTime);
    render(canvas, ctx);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle canvas resize
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    initializeParticles(canvas);
  };

  // Animation phase progression
  useEffect(() => {
    if (!isVisible) return;

    const timer1 = setTimeout(() => setAnimationPhase('organize'), 2000);
    const timer2 = setTimeout(() => setAnimationPhase('network'), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isVisible]);

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsVisible(false);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        mixBlendMode: 'multiply',
        filter: 'brightness(1.1) contrast(1.05)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    />
  );
};