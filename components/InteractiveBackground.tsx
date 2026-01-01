
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useGame } from './GameContext';

const InteractiveBackground: React.FC = () => {
  const { theme } = useGame();
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth out the movement for the spotlight and grid displacement
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 50;
    const connectionDistance = 150;
    const mouseRadius = 220;
    const gridSpacing = 85;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      phase: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.5;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(mx: number, my: number, time: number) {
        this.x += this.vx + Math.sin(time * 0.001 + this.phase) * 0.1;
        this.y += this.vy + Math.cos(time * 0.001 + this.phase) * 0.1;

        if (this.x < -20) this.x = canvas!.width + 20;
        if (this.x > canvas!.width + 20) this.x = -20;
        if (this.y < -20) this.y = canvas!.height + 20;
        if (this.y > canvas!.height + 20) this.y = -20;

        const dx = mx - this.x;
        const dy = my - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          this.x -= directionX * force * 1.2;
          this.y -= directionY * force * 1.2;
        }
      }

      draw(context: CanvasRenderingContext2D, time: number, currentTheme: string) {
        const particleAlpha = currentTheme === 'dark' ? 0.3 : 0.15;
        const opacity = particleAlpha + (Math.sin(time * 0.002 + this.phase) + 1) * 0.2;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = currentTheme === 'dark' ? `rgba(37, 99, 235, ${opacity})` : `rgba(37, 99, 235, ${opacity * 0.8})`;
        context.fill();
        
        if (this.size > 1.2 && currentTheme === 'dark') {
          context.shadowBlur = 10;
          context.shadowColor = 'rgba(37, 99, 235, 0.6)';
        } else {
          context.shadowBlur = 0;
        }
      }
    }

    const drawGrid = (context: CanvasRenderingContext2D, w: number, h: number, mx: number, my: number, time: number, currentTheme: string) => {
      const idleX = Math.sin(time * 0.0005) * 20;
      const idleY = Math.cos(time * 0.0005) * 20;
      
      const offsetX = (mx / w) * 30 + idleX; 
      const offsetY = (my / h) * 30 + idleY;
      
      context.beginPath();
      context.strokeStyle = currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.04)';
      context.lineWidth = 1;

      for (let x = -gridSpacing * 2; x <= w + gridSpacing * 2; x += gridSpacing) {
        const drawX = x + (offsetX % gridSpacing);
        context.moveTo(drawX, 0);
        context.lineTo(drawX, h);
      }

      for (let y = -gridSpacing * 2; y <= h + gridSpacing * 2; y += gridSpacing) {
        const drawY = y + (offsetY % gridSpacing);
        context.moveTo(0, drawY);
        context.lineTo(w, drawY);
      }
      context.stroke();

      const highlightRange = 300;
      const pulse = (Math.sin(time * 0.001) + 1) / 2;
      const highlightOpacity = currentTheme === 'dark' ? (0.05 + (pulse * 0.1)) : (0.02 + (pulse * 0.05));

      context.beginPath();
      context.strokeStyle = `rgba(37, 99, 235, ${highlightOpacity})`;
      context.lineWidth = 1.5;

      for (let x = -gridSpacing * 2; x <= w + gridSpacing * 2; x += gridSpacing) {
        const drawX = x + (offsetX % gridSpacing);
        if (Math.abs(drawX - mx) < highlightRange) {
          context.moveTo(drawX, Math.max(0, my - highlightRange));
          context.lineTo(drawX, Math.min(h, my + highlightRange));
        }
      }
      for (let y = -gridSpacing * 2; y <= h + gridSpacing * 2; y += gridSpacing) {
        const drawY = y + (offsetY % gridSpacing);
        if (Math.abs(drawY - my) < highlightRange) {
          context.moveTo(Math.max(0, mx - highlightRange), drawY);
          context.lineTo(Math.min(w, mx + highlightRange), drawY);
        }
      }
      context.stroke();
    };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseX.get();
      const my = mouseY.get();

      drawGrid(ctx, canvas.width, canvas.height, mx, my, time, theme);

      particles.forEach(p => {
        p.update(mx, my, time);
        p.draw(ctx, time, theme);
      });

      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (theme === 'dark' ? 0.15 : 0.08) * (1 - dist / connectionDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
      
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full border ${theme === 'dark' ? 'border-blue-500/10' : 'border-blue-500/5'} pointer-events-none`}
          style={{ width: 1000, height: 1000, x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
          animate={{ scale: [0.5, 1.5], opacity: [0.2, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 2, ease: "linear" }}
        />
      ))}

      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: theme === 'dark' 
            ? 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0) 70%)'
            : 'radial-gradient(circle, rgba(37, 99, 235, 0.04) 0%, rgba(37, 99, 235, 0) 70%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-[#050505]' : 'from-[#f8fafc]'} via-transparent to-transparent pointer-events-none opacity-90`}></div>
    </div>
  );
};

export default InteractiveBackground;
