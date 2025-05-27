import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

interface CustomCursorProps {
  isDarkRealm: boolean; // True if the overall website is in dark mode
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isDarkRealm }) => {
  // Main cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Secondary cursor (glow/trail) position - slightly more damped for a smoother lag
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Current variant for styling ('default', 'hover', 'clicked')
  const [cursorVariant, setCursorVariant] = useState('default');

  // Framer Motion spring configurations
  const primarySpring = { stiffness: 400, damping: 25, mass: 0.8 }; // Quick but smooth
  const glowSpring = { stiffness: 200, damping: 20, mass: 1 }; // Slower, more floaty

  const springCursorX = useSpring(cursorX, primarySpring);
  const springCursorY = useSpring(cursorY, primarySpring);
  const springGlowX = useSpring(glowX, glowSpring);
  const springGlowY = useSpring(glowY, glowSpring);

  // States for dynamic sizing and effects
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setCursorVariant('clicked');
    };
    const handleMouseUp = () => {
      setIsClicking(false);
      setCursorVariant(isHovering ? 'hover' : 'default'); // Revert to hover if still hovering
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
      // Select interactive elements
      document.querySelectorAll('a, button, input[type="submit"], [role="button"], [data-cursor-hover="true"]').forEach((el) => {
        el.removeEventListener('mouseenter', setHover); // Remove before adding
        el.removeEventListener('mouseleave', clearHover);
        el.addEventListener('mouseenter', setHover);
        el.addEventListener('mouseleave', clearHover);
      });
    };

    applyHoverListeners();

    // Use MutationObserver to re-apply listeners if DOM changes (e.g., new elements loaded)
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
  }, [cursorX, cursorY, glowX, glowY, isHovering]); // Dependencies for useEffect

  // Define color themes
  const themeColors = {
    light: {
      primaryColor: '255, 165, 0', // Orange RGB values
      glowColor: '255, 165, 0',
    },
    dark: {
      primaryColor: '139, 92, 246', // Purple RGB values
      glowColor: '139, 92, 246',
    },
  };

  const currentTheme = isDarkRealm ? themeColors.dark : themeColors.light;

  // Prevent cursor from showing on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  // Define dynamic properties based on cursor variant
  const cursorProps = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: `rgba(${currentTheme.primaryColor}, 0.1)`, // Light fill
      border: `1px solid rgba(${currentTheme.primaryColor}, 0.7)`, // Solid border
    },
    hover: {
      width: 60, // Significantly larger on hover
      height: 60,
      backgroundColor: `rgba(${currentTheme.primaryColor}, 0.2)`, // More opaque fill
      border: `2px solid rgba(${currentTheme.primaryColor}, 0.9)`, // Thicker, more solid border
    },
    clicked: {
      width: 24, // Smaller on click
      height: 24,
      backgroundColor: `rgba(${currentTheme.primaryColor}, 0.4)`, // Even more opaque
      border: `2px solid rgba(${currentTheme.primaryColor}, 1)`, // Fully solid border
    },
  };

  // Glow cursor's dynamic properties
  const glowProps = {
    default: {
      width: 60,
      height: 60,
      opacity: 0.3,
    },
    hover: {
      width: 90, // Glow expands more on hover
      height: 90,
      opacity: 0.4,
    },
    clicked: {
      width: 50,
      height: 50,
      opacity: 0.2,
    },
  };

  return (
    <>
      {/* Glow / Trail Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] hidden md:block"
        style={{
          x: springGlowX,
          y: springGlowY,
          backgroundColor: `rgba(${currentTheme.glowColor}, ${glowProps[cursorVariant].opacity})`,
          width: glowProps[cursorVariant].width,
          height: glowProps[cursorVariant].height,
          transform: 'translateX(-50%) translateY(-50%)',
          filter: 'blur(15px)', // Stronger blur for a soft aura
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
          mixBlendMode: 'overlay', // or 'screen', 'lighten' for different effects
        }}
      />

      {/* Main Cursor (the interactive blob) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springCursorX,
          y: springCursorY,
          backgroundColor: cursorProps[cursorVariant].backgroundColor,
          border: cursorProps[cursorVariant].border,
          width: cursorProps[cursorVariant].width,
          height: cursorProps[cursorVariant].height,
          transform: 'translateX(-50%) translateY(-50%)',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
          mixBlendMode: 'difference', // Excellent for contrast against any background
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))', // Subtle glow
        }}
      />
    </>
  );
};

export default CustomCursor;