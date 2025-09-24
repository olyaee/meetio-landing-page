import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface WaveLayer {
  offset: number;
  amplitude: number;
  frequency: number;
  speed: number;
  opacity: number;
  color: string;
  scrollMultiplier: number;
  fillType: 'full' | 'partial' | 'stroke';
  layer: number;
}

export const MeetingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const scrollRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  // 4-layer parallax wave system with different scroll speeds and fill types
  const waveLayers: WaveLayer[] = [
    // Background layer - slowest, full fill, high opacity
    { offset: 0, amplitude: 80, frequency: 0.008, speed: 0.005, opacity: 0.25, color: '196, 181, 253', scrollMultiplier: 0.2, fillType: 'full', layer: 1 },
    { offset: Math.PI, amplitude: 70, frequency: 0.01, speed: 0.007, opacity: 0.2, color: '168, 85, 247', scrollMultiplier: 0.2, fillType: 'full', layer: 1 },
    
    // Middle layers - medium speed, partial fill
    { offset: Math.PI / 3, amplitude: 50, frequency: 0.015, speed: 0.01, opacity: 0.15, color: '147, 51, 234', scrollMultiplier: 0.4, fillType: 'partial', layer: 2 },
    { offset: Math.PI * 1.2, amplitude: 45, frequency: 0.018, speed: 0.012, opacity: 0.12, color: '120, 51, 255', scrollMultiplier: 0.6, fillType: 'partial', layer: 2 },
    { offset: Math.PI / 6, amplitude: 40, frequency: 0.02, speed: 0.015, opacity: 0.1, color: '168, 85, 247', scrollMultiplier: 0.8, fillType: 'partial', layer: 3 },
    
    // Foreground layers - fastest, stroke only, overlay effect
    { offset: Math.PI * 0.7, amplitude: 30, frequency: 0.025, speed: 0.02, opacity: 0.08, color: '120, 51, 255', scrollMultiplier: 1.2, fillType: 'stroke', layer: 4 },
    { offset: Math.PI * 1.8, amplitude: 25, frequency: 0.03, speed: 0.025, opacity: 0.06, color: '147, 51, 234', scrollMultiplier: 1.2, fillType: 'stroke', layer: 4 },
  ];

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

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

  const drawWave = (ctx: CanvasRenderingContext2D, layer: WaveLayer, width: number, height: number) => {
    const centerY = height / 2;
    const time = timeRef.current;
    const scrollOffset = scrollRef.current * layer.scrollMultiplier;
    
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    
    const points: {x: number, y: number}[] = [];
    
    // Create smooth wave path with parallax scroll offset
    for (let x = 0; x <= width; x += 2) {
      const baseY = Math.sin(x * layer.frequency + time * layer.speed + layer.offset + scrollOffset * 0.01) * layer.amplitude;
      
      // Add mouse interaction - create ripple effect (reduced for overlay layers)
      let y = centerY + baseY;
      if (mouseRef.current.active && layer.layer < 4) {
        const distanceFromMouse = Math.abs(x - mouseRef.current.x);
        const mouseInfluence = Math.max(0, 1 - distanceFromMouse / 200);
        const ripple = Math.sin(time * 0.05 - distanceFromMouse * 0.01) * mouseInfluence * (layer.layer < 3 ? 15 : 5);
        y += ripple;
      }
      
      points.push({x, y});
      ctx.lineTo(x, y);
    }
    
    // Handle different fill types
    if (layer.fillType === 'full') {
      // Full fill for background layers
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, centerY - layer.amplitude, 0, height);
      gradient.addColorStop(0, `rgba(${layer.color}, ${layer.opacity})`);
      gradient.addColorStop(0.3, `rgba(${layer.color}, ${layer.opacity * 0.7})`);
      gradient.addColorStop(1, `rgba(${layer.color}, ${layer.opacity * 0.1})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
    } else if (layer.fillType === 'partial') {
      // Partial fill for middle layers
      ctx.lineTo(width, centerY + layer.amplitude * 0.3);
      ctx.lineTo(0, centerY + layer.amplitude * 0.3);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, centerY - layer.amplitude, 0, centerY + layer.amplitude * 0.3);
      gradient.addColorStop(0, `rgba(${layer.color}, ${layer.opacity})`);
      gradient.addColorStop(0.6, `rgba(${layer.color}, ${layer.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(${layer.color}, ${layer.opacity * 0.1})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Add stroke (for all layers, but more prominent for stroke-only)
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    
    const strokeOpacity = layer.fillType === 'stroke' ? layer.opacity * 3 : layer.opacity * 1.5;
    const strokeWidth = layer.fillType === 'stroke' ? 1.5 : 0.8;
    
    ctx.strokeStyle = `rgba(${layer.color}, ${Math.min(strokeOpacity, 0.4)})`;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  };

  // Add dynamic insight bubbles
// Add dynamic insight bubbles
  const drawInsightBubbles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const time = timeRef.current * 0.01;
    
    // Create dynamic insight bubbles with different movement patterns and parallax layers
    const scrollOffset = scrollRef.current;
    const insights = [
      // --- Original Bubbles ---
      {
        baseX: width * 0.15, baseY: height * 0.35,
        size: 4, maxSize: 12, phase: 0,
        moveType: 'orbital', color: '196, 181, 253',
        speed: 0.3, radius: 20, layer: 1, scrollMultiplier: 0.1
      },
      {
        baseX: width * 0.85, baseY: height * 0.6,
        size: 3, maxSize: 10, phase: Math.PI,
        moveType: 'floating', color: '168, 85, 247',
        speed: 0.2, radius: 15, layer: 1, scrollMultiplier: 0.1
      },
      {
        baseX: width * 0.45, baseY: height * 0.25,
        size: 5, maxSize: 15, phase: Math.PI / 2,
        moveType: 'growing', color: '147, 51, 234',
        speed: 0.5, radius: 0, layer: 2, scrollMultiplier: 0.3
      },
      {
        baseX: width * 0.75, baseY: height * 0.65,
        size: 4, maxSize: 11, phase: Math.PI * 1.5,
        moveType: 'spiral', color: '120, 51, 255',
        speed: 0.4, radius: 25, layer: 2, scrollMultiplier: 0.3
      },
      {
        baseX: width * 0.25, baseY: height * 0.7,
        size: 3, maxSize: 8, phase: Math.PI / 4,
        moveType: 'floating', color: '120, 51, 255',
        speed: 0.6, radius: 10, layer: 4, scrollMultiplier: 0.6
      },
      {
        baseX: width * 0.65, baseY: height * 0.15,
        size: 3.5, maxSize: 9, phase: Math.PI * 0.8,
        moveType: 'bouncing', color: '147, 51, 234',
        speed: 0.4, radius: 15, layer: 4, scrollMultiplier: 0.6
      },
      // --- ADDED: Four New Bubbles ---
      {
        baseX: width * 0.9, baseY: height * 0.2, // New position
        size: 4, maxSize: 10, phase: Math.PI * 0.3, // New phase
        moveType: 'growing', color: '196, 181, 253',
        speed: 0.45, radius: 0, layer: 1, scrollMultiplier: 0.1 // Background layer
      },
      {
        baseX: width * 0.1, baseY: height * 0.8, // New position
        size: 4.5, maxSize: 13, phase: Math.PI * 0.6, // New phase
        moveType: 'orbital', color: '168, 85, 247',
        speed: 0.35, radius: 22, layer: 2, scrollMultiplier: 0.3 // Middle layer
      },
      {
        baseX: width * 0.5, baseY: height * 0.85, // New position
        size: 3, maxSize: 9, phase: Math.PI * 1.2, // New phase
        moveType: 'floating', color: '120, 51, 255',
        speed: 0.5, radius: 18, layer: 3, scrollMultiplier: 0.4 // Middle layer 3
      },
      {
        baseX: width * 0.3, baseY: height * 0.1, // New position
        size: 3.5, maxSize: 8, phase: Math.PI * 1.7, // New phase
        moveType: 'bouncing', color: '147, 51, 234',
        speed: 0.45, radius: 12, layer: 4, scrollMultiplier: 0.6 // Foreground layer
      }
    ];
    
    insights.forEach((insight) => {
      let x: number, y: number, currentSize: number, opacity: number;
      
      // Apply parallax scroll offset based on layer
      const parallaxOffset = scrollOffset * insight.scrollMultiplier;
      
      switch (insight.moveType) {
        case 'orbital':
          x = insight.baseX + Math.cos(time * insight.speed + insight.phase) * insight.radius + parallaxOffset * 0.1;
          y = insight.baseY + Math.sin(time * insight.speed + insight.phase) * insight.radius * 0.6 + parallaxOffset * 0.05;
          currentSize = insight.size + Math.sin(time * 2 + insight.phase) * (insight.layer < 3 ? 2 : 1);
          opacity = (insight.layer === 4 ? 0.2 : 0.4) + Math.sin(time * 3 + insight.phase) * 0.1;
          break;
          
        case 'floating':
          x = insight.baseX + Math.sin(time * insight.speed + insight.phase) * insight.radius + parallaxOffset * 0.08;
          y = insight.baseY + Math.cos(time * insight.speed * 0.7 + insight.phase) * 15 + parallaxOffset * 0.03;
          currentSize = insight.size + Math.sin(time * 1.5 + insight.phase) * (insight.layer < 3 ? 1.5 : 0.8);
          opacity = (insight.layer === 4 ? 0.15 : 0.3) + Math.sin(time * 2 + insight.phase) * 0.1;
          break;
          
        case 'growing':
          x = insight.baseX + Math.sin(time * 0.3 + insight.phase) * 8 + parallaxOffset * 0.05;
          y = insight.baseY + Math.cos(time * 0.2 + insight.phase) * 5 + parallaxOffset * 0.02;
          const growthCycle = Math.sin(time * insight.speed + insight.phase);
          currentSize = insight.size + (insight.maxSize - insight.size) * Math.max(0, growthCycle);
          opacity = (insight.layer === 4 ? 0.1 : 0.2) + Math.max(0, growthCycle) * 0.3;
          break;
          
        case 'spiral':
          const spiralRadius = insight.radius + Math.sin(time * insight.speed + insight.phase) * 10;
          const spiralAngle = time * insight.speed * 2 + insight.phase;
          x = insight.baseX + Math.cos(spiralAngle) * spiralRadius + parallaxOffset * 0.1;
          y = insight.baseY + Math.sin(spiralAngle) * spiralRadius * 0.5 + parallaxOffset * 0.05;
          currentSize = insight.size + Math.sin(time * 2 + insight.phase) * (insight.layer < 3 ? 1 : 0.5);
          opacity = (insight.layer === 4 ? 0.2 : 0.35) + Math.sin(time * 1.5 + insight.phase) * 0.15;
          break;
          
        case 'bouncing':
          x = insight.baseX + Math.sin(time * insight.speed + insight.phase) * insight.radius + parallaxOffset * 0.12;
          const bounceY = Math.abs(Math.sin(time * insight.speed * 1.5 + insight.phase)) * (insight.layer < 3 ? 20 : 10);
          y = insight.baseY - bounceY + parallaxOffset * 0.06;
          currentSize = insight.size + bounceY * (insight.layer < 3 ? 0.1 : 0.05);
          opacity = (insight.layer === 4 ? 0.15 : 0.25) + bounceY * 0.01;
          break;
          
        default:
          x = insight.baseX + parallaxOffset * 0.05;
          y = insight.baseY + parallaxOffset * 0.02;
          currentSize = insight.size;
          opacity = insight.layer === 4 ? 0.15 : 0.3;
      }
      
      // Draw main circle
      ctx.beginPath();
      ctx.arc(x, y, currentSize, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, currentSize * 4);
      gradient.addColorStop(0, `rgba(${insight.color}, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(${insight.color}, ${opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(${insight.color}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Outer ring for larger bubbles
      if (currentSize > 4) {
        ctx.beginPath();
        ctx.arc(x, y, currentSize * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${insight.color}, ${opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Inner gloss for active insights
      if (opacity > 0.4) {
        ctx.beginPath();
        ctx.arc(x - currentSize * 0.3, y - currentSize * 0.3, currentSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
        ctx.fill();
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const render = () => {
      const result = initializeCanvas();
      if (!result) return;
      
      const { width, height, ctx } = result;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // Draw wave layers (from back to front)
      waveLayers.forEach(layer => {
        drawWave(ctx, layer, width, height);
      });
      
      // Draw insight bubbles
      drawInsightBubbles(ctx, width, height);
    };

    const animate = () => {
      timeRef.current += 1;
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only activate if mouse is over the hero section
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
        mouseRef.current.active = true;
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      
      // Hide canvas much earlier - as soon as user scrolls past hero section
      // Hide waves when reaching end of ProblemSection (before SolutionSection appears)
      const hideWavesAt = window.innerHeight * 1.2; // Much earlier - just past hero + half of problem
      setIsVisible(window.scrollY < hideWavesAt);
    };


    const handleResize = () => {
      initializeCanvas();
    };

    // Start animation
    animate();
    
    // Event listeners - use window for mouse events since canvas has pointer-events-none  
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ 
        mixBlendMode: 'normal',
        opacity: isVisible ? 0.8 : 0,
        transition: 'opacity 0.5s ease-out'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 0.8 : 0 }}
      transition={{ duration: isVisible ? 2 : 0.5, delay: isVisible ? 0.5 : 0 }}
    />
  );
};