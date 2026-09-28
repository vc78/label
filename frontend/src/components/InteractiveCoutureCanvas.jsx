import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import './InteractiveCoutureCanvas.css';

const InteractiveCoutureCanvas = () => {
  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  // Damped spring physics for liquid inertia
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  // Scroll parallax for floating ambient depth
  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 2000], [0, 350]);
  const orb2Y = useTransform(scrollY, [0, 2000], [0, -280]);
  const orb3Y = useTransform(scrollY, [0, 2000], [0, 200]);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handlePointerMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY]);

  return (
    <div className="interactive-canvas-container" aria-hidden="true">
      {/* 1. Fluid Ambient Base Mesh */}
      <div className="canvas-gradient-mesh" />

      {/* 2. Floating Luminous Liquid Orbs (Framer Motion) */}
      <motion.div
        className="luminous-orb orb-platinum"
        style={{ y: orb1Y }}
        animate={{
          x: [0, 60, -40, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.65, 0.85, 0.7, 0.65]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="luminous-orb orb-champagne"
        style={{ y: orb2Y }}
        animate={{
          x: [0, -80, 50, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.55, 0.75, 0.6, 0.55]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />

      <motion.div
        className="luminous-orb orb-porcelain-silk"
        style={{ y: orb3Y }}
        animate={{
          x: [0, 40, -60, 0],
          scale: [1.1, 0.95, 1.15, 1.1],
          opacity: [0.7, 0.9, 0.75, 0.7]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4
        }}
      />

      {/* 3. Interactive Pointer Cursor Spotlight (Reacts dynamically to user) */}
      {!isTouchDevice && (
        <motion.div
          className="interactive-cursor-glow"
          style={{
            x: springX,
            y: springY
          }}
        />
      )}

      {/* 4. Geometric Architectural Silk Grid Scaffold */}
      <div className="canvas-geometric-scaffold" />
    </div>
  );
};

export default InteractiveCoutureCanvas;
