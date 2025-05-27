import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  isDarkRealm: boolean; // True if the overall website is in dark mode
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isDarkRealm }) => {
  // Main cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Glow cursor position - slightly more damped for a smoother lag
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Spring configurations
  const primarySpring = { stiffness: 300, damping: 20, mass: 0.7 }; // Smooth, responsive
  const glowSpring = { stiffness: 150, damping: 15, mass: 1 }; // Slower, more floaty

  const springCursorX = useSpring(cursorX, primarySpring);
  const springCursorY = useSpring(cursorY, primarySpring);
  const springGlowX = useSpring(glowX, glowSpring);
  const springGlowY = useSpring(glowY, glowSpring);

  const [cursorVariant, setCursorVariant] = useState('default');

  // Hover and click states
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

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
        el.removeEventListener('mouseenter', setHover);
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
  }, [cursorX, cursorY, glowX, glowY, isHovering]);

  // Define color themes
  const themeColors = {
    dark: {
      primaryColor: '139, 92, 246', // Purple
      glowColor: '139, 92, 246',
    },
    light: { // Fallback for light mode (adjust as needed)
      primaryColor: '255, 165, 0', // Orange
      glowColor: '255, 165, 0',
    },
  };

  const currentTheme = isDarkRealm ? themeColors.dark : themeColors.light;

  // Dynamic style properties based on cursor state
  const cursorProps = {
    default: {
      width: 24,
      height: 12,
      borderRadius: '6px', // Capsule shape
      backgroundColor: `rgba(${currentTheme.primaryColor}, 0.2)`,
      border: `1px solid rgba(${currentTheme.primaryColor}, 0.7)`,
      scale: 1,
    },
    hover: {
      width: 40,
      height: 20,
      borderRadius: '10px',
      backgroundColor: `rgba(${currentTheme.primaryColor}, 0.3)`,
      border: `2px solid rgba(${currentTheme.primaryColor}, 0.9)`,
      scale: 1.1,
    },
    clicked: {
      width: 18,
      height: 9,
      borderRadius: '4.5px',
      backgroundColor: `rgba(${currentTheme.primaryColor}, 0.5)`,
      border: `1px solid rgba(${currentTheme.primaryColor}, 1)`,
      scale: 0.9,
    },
  };

  const glowProps = {
    default: {
      width: 40,
      height: 20,
      opacity: 0.4,
    },
    hover: {
      width: 60,
      height: 30,
      opacity: 0.6,
    },
    clicked: {
      width: 30,
      height: 15,
      opacity: 0.3,
    },
  };

  // Prevent cursor from showing on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Glow Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] hidden md:block"
        style={{
          x: springGlowX,
          y: springGlowY,
          backgroundColor: `rgba(${currentTheme.glowColor}, ${glowProps[cursorVariant].opacity})`,
          width: glowProps[cursorVariant].width,
          height: glowProps[cursorVariant].height,
          transform: 'translateX(-50%) translateY(-50%)',
          filter: 'blur(10px)',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          mixBlendMode: 'overlay', // Experiment with 'screen', 'lighten'
        }}
      />

      {/* Main Cursor (Capsule Shape) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springCursorX,
          y: springCursorY,
          backgroundColor: cursorProps[cursorVariant].backgroundColor,
          border: cursorProps[cursorVariant].border,
          width: cursorProps[cursorVariant].width,
          height: cursorProps[cursorVariant].height,
          transform: 'translateX(-50%) translateY(-50%) scaleX(1) scaleY(1)', // Basic scale
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, scale 0.1s ease',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};

export default CustomCursor;