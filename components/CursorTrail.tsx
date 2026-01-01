
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CURSOR_SIZE = 8;
const TRAIL_LENGTH = 6;

const CursorTrail: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {[...Array(TRAIL_LENGTH)].map((_, i) => (
        <CursorSegment 
          key={i} 
          index={i} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          total={TRAIL_LENGTH} 
        />
      ))}
    </div>
  );
};

interface SegmentProps {
  index: number;
  mouseX: any;
  mouseY: any;
  total: number;
}

const CursorSegment: React.FC<SegmentProps> = ({ index, mouseX, mouseY, total }) => {
  // Each segment has a different spring setting to create the lag effect
  const springConfig = {
    stiffness: 150 - index * 15,
    damping: 20 + index * 2,
    mass: 0.5 + index * 0.1
  };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const opacity = 1 - (index / total);
  const scale = 1 - (index / total) * 0.5;

  return (
    // Fixed: Merged duplicate className and style attributes into a single definition each
    <motion.div
      className={`absolute rounded-full pointer-events-none ${index === 0 ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-blue-500'}`}
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        opacity: index === 0 ? 1 : opacity * 0.6,
        scale,
        boxShadow: index === 0 
          ? '0 0 15px rgba(255, 255, 255, 0.5), 0 0 5px rgba(37, 99, 235, 1)' 
          : '0 0 10px rgba(37, 99, 235, 0.5)'
      }}
    />
  );
};

export default CursorTrail;
