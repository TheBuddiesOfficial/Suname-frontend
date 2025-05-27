import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  isDarkRealm: boolean; // True if the overall website is in dark mode
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isDarkRealm }) => {
  // Motion values for the main cursor (circle)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Motion values for the secondary cursor (dot)
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  // Spring animations for smooth movement
  const springConfig = { stiffness: 600, damping: 40, mass: 0.5 }; // Optimized for main cursor
  const dotSpringConfig = { stiffness: 800, damping: 50, mass: 0.3 }; // Slightly faster, less damped for dot

  const springCursorX = useSpring(cursorX, springConfig);
  const springCursorY = useSpring(cursorY, springConfig);

  const springDotX = useSpring(dotX, dotSpringConfig);
  const springDotY = useSpring(dotY, dotSpringConfig);

  const [cursorVariant, setCursorVariant] = useState('default');
  const [isClicking, setIsClicking] = useState(false); // New state for click visual feedback

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX); // Dot also follows immediately
      dotY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const setHover = () => setCursorVariant('hover');
    const clearHover = () => setCursorVariant('default');

    const applyHoverListeners = () => {
      document.querySelectorAll('a, button, input[type="submit"], [role="button"], [data-cursor-hover="true"]').forEach((el) => {
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
  }, [cursorX, cursorY, dotX, dotY]); // Dependencies for useEffect

  // Define color themes
  const themeColors = {
    light: {
      defaultBg: 'rgba(255, 165, 0, 0.15)', // Light orange, very subtle
      defaultBorder: 'rgba(255, 165, 0, 0.6)', // More prominent orange border
      dotBg: 'rgba(255, 165, 0, 0.8)', // Solid orange dot
      hoverBg: 'rgba(255, 165, 0, 0.4)', // More opaque on hover
      hoverBorder: 'rgba(255, 165, 0, 1)', // Solid border on hover
      clickedBg: 'rgba(255, 165, 0, 0.6)', // Even more opaque on click
      clickedBorder: 'rgba(255, 165, 0, 1)',
    },
    dark: {
      defaultBg: 'rgba(139, 92, 246, 0.15)', // Light purple, very subtle
      defaultBorder: 'rgba(139, 92, 246, 0.6)', // More prominent purple border
      dotBg: 'rgba(139, 92, 246, 0.8)', // Solid purple dot
      hoverBg: 'rgba(139, 92, 246, 0.4)',
      hoverBorder: 'rgba(139, 92, 246, 1)',
      clickedBg: 'rgba(139, 92, 246, 0.6)',
      clickedBorder: 'rgba(139, 92, 246, 1)',
    },
  };

  const currentTheme = isDarkRealm ? themeColors.dark : themeColors.light;

  // Define styles for the main circle cursor
  const cursorStyles: Record<string, React.CSSProperties> = {
    default: {
      height: 36,
      width: 36,
      backgroundColor: currentTheme.defaultBg,
      border: `1px solid ${currentTheme.defaultBorder}`,
      transition: 'height 0.2s ease-out, width 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out',
    },
    hover: {
      height: 50, // Larger on hover
      width: 50,
      backgroundColor: currentTheme.hoverBg,
      border: `2px solid ${currentTheme.hoverBorder}`, // Thicker border
      transition: 'height 0.2s ease-out, width 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out',
    },
    clicked: {
      height: 28, // Smaller on click
      width: 28,
      backgroundColor: currentTheme.clickedBg,
      border: `2px solid ${currentTheme.clickedBorder}`,
      transition: 'height 0.1s ease-out, width 0.1s ease-out, background-color 0.1s ease-out, border-color 0.1s ease-out',
    },
  };

  // Prevent cursor from showing on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  // Determine the current style for the main cursor
  const activeCursorStyle = isClicking ? cursorStyles.clicked : cursorStyles[cursorVariant];

  return (
    <>
      {/* Main Cursor (Circle) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springCursorX,
          y: springCursorY,
          ...activeCursorStyle, // Apply the determined style
          mixBlendMode: 'difference', // Creates a nice inversion effect
          transform: 'translateX(-50%) translateY(-50%)', // Center the cursor
          // Added a filter for a subtle glow or blur, enhance as needed
          // filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))',
        }}
      />

      {/* Secondary Cursor (Dot) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block" // Slightly lower z-index
        style={{
          x: springDotX,
          y: springDotY,
          height: cursorVariant === 'hover' ? 10 : 6, // Slightly larger dot on hover
          width: cursorVariant === 'hover' ? 10 : 6,
          backgroundColor: currentTheme.dotBg, // Solid color for the dot
          opacity: isClicking ? 0 : 1, // Hide dot on click for a cleaner effect
          transition: 'height 0.2s ease-out, width 0.2s ease-out, opacity 0.1s ease-out',
          transform: 'translateX(-50%) translateY(-50%)', // Center the dot
        }}
      />
    </>
  );
};

export default CustomCursor;