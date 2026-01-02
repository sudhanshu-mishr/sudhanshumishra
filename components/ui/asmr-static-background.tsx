
import React, { useEffect, useRef } from 'react';
import { useGame } from '../GameContext';

/**
 * ASMRStaticBackground Component
 * 
 * High-density particle system with reactive magnetic vortex logic.
 * Integrated into the Nexus Portfolio theme system.
 */
const ASMRStaticBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useGame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number;
    let height: number;
    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    const PARTICLE_COUNT = 800; // Optimized for performance
    const MAGNETIC_RADIUS = 320;
    const VORTEX_STRENGTH = 0.05;
    const PULL_STRENGTH = 0.08;

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      size: number = 0;
      alpha: number = 0;
      color: string = '';
      rotation: number = 0;
      rotationSpeed: number = 0;
      frictionGlow: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.2 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        
        // 70% Neutral, 30% Accent/Glass
        const isAccent = Math.random() > 0.7;
        if (theme === 'dark') {
          this.color = isAccent ? '37, 99, 235' : '80, 80, 85';
          this.alpha = Math.random() * 0.3 + 0.05;
        } else {
          this.color = isAccent ? '37, 99, 235' : '148, 163, 184';
          this.alpha = Math.random() * 0.2 + 0.05;
        }
        
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNETIC_RADIUS) {
          const force = (MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS;
          
          // Magnetic center pull
          this.vx += (dx / dist) * force * PULL_STRENGTH;
          this.vy += (dy / dist) * force * PULL_STRENGTH;

          // Swirl vortex motion
          this.vx += (dy / dist) * force * VORTEX_STRENGTH * 8;
          this.vy -= (dx / dist) * force * VORTEX_STRENGTH * 8;

          this.frictionGlow = force * 0.5;
        } else {
          this.frictionGlow *= 0.94;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Damping
        this.vx *= 0.97;
        this.vy *= 0.97;

        // Static jitter
        this.vx += (Math.random() - 0.5) * 0.03;
        this.vy += (Math.random() - 0.5) * 0.03;

        this.rotation += this.rotationSpeed + (Math.abs(this.vx) + Math.abs(this.vy)) * 0.03;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const finalAlpha = Math.min(this.alpha + this.frictionGlow, 0.8);
        ctx.fillStyle = `rgba(${this.color}, ${finalAlpha})`;
        
        if (this.frictionGlow > 0.2) {
          ctx.shadowBlur = 6 * this.frictionGlow;
          ctx.shadowColor = `rgba(37, 99, 235, ${this.frictionGlow})`;
        }

        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size * 2);
        ctx.lineTo(-this.size, 0);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const render = () => {
      // Clear with persistence
      if (theme === 'dark') {
        ctx.fillStyle = 'rgba(10, 10, 12, 0.15)';
      } else {
        ctx.fillStyle = 'rgba(248, 250, 252, 0.15)';
      }
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);

    init();
    render();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full opacity-60"
      />
      
      {/* Visual Depth Gradients */}
      <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-[#050505]' : 'from-[#f8fafc]'} via-transparent to-transparent opacity-90`} />
      
      <style>{`
        :root {
          --mouse-x: -100px;
          --mouse-y: -100px;
        }
      `}</style>
    </div>
  );
};

export default ASMRStaticBackground;
