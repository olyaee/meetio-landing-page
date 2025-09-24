import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  originalX: number;
  originalY: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  currentOpacity: number;
  speed: number;
  angle: number;
  drift: number;
  pulseOffset: number;
}

export const MeetingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    return { width: rect.width, height: rect.height, ctx };
  };

  const createParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Responsive particle spacing
    const spacing = window.innerWidth < 768 ? 40 : 30; // Larger spacing on mobile
    const offsetX = (width % spacing) / 2;
    const offsetY = (height % spacing) / 2;
    
    particlesRef.current = [];
    
    for (let x = offsetX; x < width; x += spacing) {
      for (let y = offsetY; y < height; y += spacing) {
        particlesRef.current.push({
          originalX: x,
          originalY: y,
          x: x,
          y: y,
          size: Math.random() * 1.5 + 0.8, // Smaller, more subtle particles
          opacity: Math.random() * 0.3 + 0.1, // More subtle opacity
          currentOpacity: Math.random() * 0.3 + 0.1,
          speed: Math.random() * 0.015 + 0.008, // Slower movement
          angle: Math.random() * Math.PI * 2,
          drift: Math.random() * 0.8 + 0.4, // Subtler drift
          pulseOffset: Math.random() * Math.PI * 2
        });
      }
    }
  };

  const updateParticles = () => {
    timeRef.current += 0.008; // Slower time progression
    
    particlesRef.current.forEach(particle => {
      // Subtle floating movement
      const floatX = Math.sin(timeRef.current * particle.speed + particle.angle) * particle.drift;
      const floatY = Math.cos(timeRef.current * particle.speed + particle.angle + 1) * particle.drift * 0.7;
      
      particle.x = particle.originalX + floatX;
      particle.y = particle.originalY + floatY;
      
      // Gentle pulsing opacity
      const pulse = Math.sin(timeRef.current * 1.5 + particle.pulseOffset) * 0.15;
      particle.currentOpacity = Math.max(0.05, particle.opacity + pulse);
      
      // Mouse interaction - more subtle
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 120;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        particle.currentOpacity = Math.min(0.8, particle.currentOpacity + force * 0.4);
        
        // Gentle repulsion
        const repulsion = force * 6;
        particle.x -= (dx / distance) * repulsion;
        particle.y -= (dy / distance) * repulsion;
      }
    });
  };

  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    const maxDistance = 70; // Shorter connections
    
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const particleA = particlesRef.current[i];
        const particleB = particlesRef.current[j];
        
        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (maxDistance - distance) / maxDistance * 0.08; // Very subtle connections
          
          ctx.beginPath();
          ctx.moveTo(particleA.x, particleA.y);
          ctx.lineTo(particleB.x, particleB.y);
          
          // Use brand purple with gradient
          const gradient = ctx.createLinearGradient(
            particleA.x, particleA.y,
            particleB.x, particleB.y
          );
          gradient.addColorStop(0, `rgba(120, 51, 255, ${opacity})`); // #7833ff
          gradient.addColorStop(1, `rgba(120, 51, 255, ${opacity * 0.5})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const render = () => {
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      
      // Clear with very subtle fade for smooth trails
      ctx.fillStyle = 'rgba(255, 247, 243, 0.02)'; // Match bg-gradient-subtle base
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Draw connections first (behind particles)
      drawConnections(ctx);
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        // Create radial gradient with brand colors
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        
        // Use gradient from violet to red
        gradient.addColorStop(0, `rgba(120, 51, 255, ${particle.currentOpacity})`); // Brand violet
        gradient.addColorStop(0.6, `rgba(147, 51, 234, ${particle.currentOpacity * 0.8})`); // Purple transition
        gradient.addColorStop(1, `rgba(220, 38, 127, ${particle.currentOpacity * 0.3})`); // Red-pink
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add subtle highlight
        if (particle.currentOpacity > 0.3) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.currentOpacity * 0.3})`;
          ctx.fill();
        }
      });
    };

    const animate = () => {
      updateParticles();
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      initializeCanvas();
      createParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    // Initial setup
    initializeCanvas();
    createParticles();
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Performance optimization for mobile
    const isTouch = 'ontouchstart' in window;
    if (isTouch) {
      canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = touch.clientX - rect.left;
        mouseRef.current.y = touch.clientY - rect.top;
      });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        mixBlendMode: 'normal',
        opacity: 0.7 // Subtle background effect
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 2, delay: 0.5 }}
    />
  );
};