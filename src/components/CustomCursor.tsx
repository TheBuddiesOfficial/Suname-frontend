import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

interface CustomCursorProps {
  isDarkRealm: boolean; // True if the overall website is in dark mode
}

// Corrected Particle interface
interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  // Add other properties if needed for unique particle animations
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isDarkRealm }) => {
  const mainCursorX = useMotionValue(0);
  const mainCursorY = useMotionValue(0);

  // Spring for the main cursor (less damped for a bit more direct feel)
  const mainSpring = { stiffness: 450, damping: 28, mass: 0.7 };
  const springMainX = useSpring(mainCursorX, mainSpring);
  const springMainY = useSpring(mainCursorY, mainSpring);

  const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'hover', 'clicked'
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  // States for visual effects
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false); // For click burst effect

  // Animation variants for the main cursor's shape/size/rotation
  const cursorVariants = {
    default: {
      width: 20,
      height: 20,
      borderRadius: '4px', // Small square
      rotate: 0,
      backgroundColor: `rgba(${isDarkRealm ? '139, 92, 246' : '255, 165, 0'}, 0.8)`,
      border: `1px solid rgba(${isDarkRealm ? '139, 92, 246' : '255, 165, 0'}, 1)`,
      scale: 1,
    },
    hover: {
      width: 45,
      height: 45,
      borderRadius: '50%', // Briefly morph to circle on hover (can change to other shapes!)
      rotate: 45, // Rotate on hover
      backgroundColor: `rgba(${isDarkRealm ? '139, 92, 246' : '255, 165, 0'}, 0.6)`,
      border: `2px solid rgba(${isDarkRealm ? '139, 92, 246' : '255, 165, 0'}, 1)`,
      scale: 1.1,
    },
    clicked: {
      width: 15, // Shrink quickly on click
      height: 15,
      borderRadius: '2px',
      rotate: 90,
      backgroundColor: `rgba(${isDarkRealm ? '139, 92, 246' : '255, 165, 0'}, 1)`,
      border: `1px solid rgba(${isDarkRealm ? '139, 92, 246' : '255, 165, 0'}, 1)`,
      scale: 0.8,
    },
  };

  // --- Particle System Logic ---
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mainCursorX.set(e.clientX);
      mainCursorY.set(e.clientY);

      // Generate a particle only if not hovering or clicking, to avoid overwhelming
      if (!isHovering && !isClicking) {
        setParticles(prev => {
          const newParticle: Particle = {
            id: particleId.current++,
            x: e.clientX + (Math.random() - 0.5) * 10, // Slight random offset
            y: e.clientY + (Math.random() - 0.5) * 10,
            duration: 0.5 + Math.random() * 0.5, // Random fade duration
          };
          // Keep a limited number of particles for performance
          return [...prev, newParticle].slice(-50); // Keep last 50 particles
        });
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setCursorVariant('clicked');
      // Trigger a burst of particles on click
      setParticles(prev => {
        const burstParticles: Particle[] = Array.from({ length: 15 }).map(() => ({
          id: particleId.current++,
          x: mainCursorX.get() + (Math.random() - 0.5) * 30,
          y: mainCursorY.get() + (Math.random() - 0.5) * 30,
          duration: 0.3 + Math.random() * 0.3, // Faster fade for burst
        }));
        return [...prev, ...burstParticles].slice(-100); // Keep more for burst
      });
    };

    const handleMouseUp = () => {
      setIsClicking(false);
      setCursorVariant(isHovering ? 'hover' : 'default');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const setHover = () => {
      setIsHovering(true);
      setCursorVariant('hover');
    };
    const clearHover = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    const applyHoverListeners = () => {
      document.querySelectorAll('a, button, input[type="submit"], [role="button"], [data-cursor-hover="true"]').forEach((el) => {
        el.removeEventListener('mouseenter', setHover); // Remove before adding to prevent duplicates
        el.removeEventListener('mouseleave', clearHover);
        el.addEventListener('mouseenter', setHover);
        el.addEventListener('mouseleave', clearHover);
      });
    };

    applyHoverListeners();
    const observer = new MutationObserver(applyHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
      document.querySelectorAll('a, button, input[type="submit"], [role="button"], [data-cursor-hover="true"]').forEach((el) => {
        el.removeEventListener('mouseenter', setHover);
        el.removeEventListener('mouseleave', clearHover);
      });
    };
  }, [mainCursorX, mainCursorY, isHovering, isClicking]); // Add isHovering, isClicking to dependencies

  // Cleanup particles over time (they fade out via CSS, but we remove from state)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      // In a real app, you might track start time of each particle and remove after duration
      // For this example, we're relying on the 'slice' in mousemove and the CSS animation for visibility.
      // This interval could be used to remove truly expired particles if `slice` isn't enough for very long trails.
      setParticles(prev => prev.filter(p => p.duration > 0)); // Placeholder - ideally check if animation is truly done
    }, 1000); // Clean up every 1 second (adjust as needed)

    return () => clearInterval(cleanupInterval);
  }, []);

  // Prevent cursor from showing on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Dynamic Particle Trail */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
          initial={{
            x: p.x,
            y: p.y,
            opacity: 1,
            scale: 1,
            borderRadius: Math.random() > 0.5 ? '0%' : '50%', // Random square or circle
            backgroundColor: `rgba(${isDarkRealm ? '139, 92, 246' : '255, 165, 0'}, ${0.3 + Math.random() * 0.4})`, // Varied opacity
          }}
          animate={{
            opacity: 0,
            scale: 0.5,
            x: p.x + (Math.random() - 0.5) * 50, // Drift slightly
            y: p.y + (Math.random() - 0.5) * 50,
          }}
          transition={{ duration: p.duration, ease: "easeOut" }}
          style={{
            width: 8,
            height: 8,
            transform: 'translateX(-50%) translateY(-50%)',
            mixBlendMode: 'screen', // Makes particles lighten or glow
          }}
        />
      ))}

      {/* Main Cursor (The Glitchy Orb/Square) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        style={{
          x: springMainX,
          y: springMainY,
          transform: 'translateX(-50%) translateY(-50%)',
          mixBlendMode: 'difference', // Still good for contrast
          // Added for a subtle "glitch" feel by default
          filter: `hue-rotate(${Math.random() * 360}deg) saturate(${1 + Math.random() * 0.5})`,
          transition: { filter: { duration: 0.1, ease: 'linear', repeat: Infinity, repeatType: 'reverse' } } // Quick filter flicker
        }}
      />
    </>
  );
};

export default CustomCursor;