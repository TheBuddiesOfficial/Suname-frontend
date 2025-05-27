import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

interface CustomCursorProps {
  isDarkRealm: boolean; // True if the overall website is in dark mode
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isDarkRealm }) => {
  // Motion values for all three cursor elements
  const mainCursorX = useMotionValue(0);
  const mainCursorY = useMotionValue(0);
  const dotCursorX = useMotionValue(0);
  const dotCursorY = useMotionValue(0);
  const ghostCursorX = useMotionValue(0);
  const ghostCursorY = useMotionValue(0);

  // States for cursor variants
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'hover', 'clicked'
  const [isPressed, setIsPressed] = useState(false); // To trigger click squish effect

  // Spring configurations for different levels of "lag" and "bounce"
  const mainSpring = { stiffness: 600, damping: 30, mass: 0.5 };
  const dotSpring = { stiffness: 400, damping: 25, mass: 0.6 }; // Slower, more floaty
  const ghostSpring = { stiffness: 200, damping: 20, mass: 0.8 }; // Even slower, very floaty

  const springMainX = useSpring(mainCursorX, mainSpring);
  const springMainY = useSpring(mainCursorY, mainSpring);
  const springDotX = useSpring(dotCursorX, dotSpring);
  const springDotY = useSpring(dotCursorY, dotSpring);
  const springGhostX = useSpring(ghostCursorX, ghostSpring);
  const springGhostY = useSpring(ghostCursorY, ghostSpring);

  // Transform scale for the squish effect
  const scaleX = useSpring(1, { stiffness: 500, damping: 30 });
  const scaleY = useSpring(1, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mainCursorX.set(e.clientX);
      mainCursorY.set(e.clientY);

      // Dot follows with a slight delay naturally due to its spring config
      dotCursorX.set(e.clientX);
      dotCursorY.set(e.clientY);

      // Ghost follows with a larger delay
      ghostCursorX.set(e.clientX);
      ghostCursorY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsPressed(true);
      // Squish animation on click
      animate(scaleX, 0.8);
      animate(scaleY, 1.2);
    };

    const handleMouseUp = () => {
      setIsPressed(false);
      // Revert squish
      animate(scaleX, 1);
      animate(scaleY, 1);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const setHover = () => setCursorVariant('hover');
    const clearHover = () => setCursorVariant('default');

    // Callback to apply/reapply listeners
    const applyHoverListeners = () => {
      document.querySelectorAll('a, button, input[type="submit"], [role="button"], [data-cursor-hover="true"]').forEach((el) => {
        el.removeEventListener('mouseenter', setHover); // Remove before adding to prevent duplicates
        el.removeEventListener('mouseleave', clearHover);
        el.addEventListener('mouseenter', setHover);
        el.addEventListener('mouseleave', clearHover);
      });
    };

    applyHoverListeners();

    // Use MutationObserver to re-apply listeners if DOM changes
    const observer = new MutationObserver(applyHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
      // Clean up hover listeners
      document.querySelectorAll('a, button, input[type="submit"], [role="button"], [data-cursor-hover="true"]').forEach((el) => {
        el.removeEventListener('mouseenter', setHover);
        el.removeEventListener('mouseleave', clearHover);
      });
    };
  }, [mainCursorX, mainCursorY, dotCursorX, dotCursorY, ghostCursorX, ghostCursorY, scaleX, scaleY]); // Dependencies for useEffect

  // Define color themes
  const themeColors = {
    light: {
      mainBg: 'rgba(255, 165, 0, 0.1)', // Very subtle orange fill
      mainBorder: 'rgba(255, 165, 0, 0.7)', // Brighter orange border
      dotBg: 'rgba(255, 165, 0, 0.9)', // Solid orange dot
      ghostBg: 'rgba(255, 165, 0, 0.05)', // Even more subtle ghost
    },
    dark: {
      mainBg: 'rgba(139, 92, 246, 0.1)', // Very subtle purple fill
      mainBorder: 'rgba(139, 92, 246, 0.7)', // Brighter purple border
      dotBg: 'rgba(139, 92, 246, 0.9)', // Solid purple dot
      ghostBg: 'rgba(139, 92, 246, 0.05)', // Even more subtle ghost
    },
  };

  const currentTheme = isDarkRealm ? themeColors.dark : themeColors.light;

  // Prevent cursor from showing on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Ghost Cursor (slowest, largest, most translucent) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] hidden md:block"
        style={{
          x: springGhostX,
          y: springGhostY,
          height: cursorVariant === 'hover' ? 80 : 60, // Larger on hover
          width: cursorVariant === 'hover' ? 80 : 60,
          backgroundColor: currentTheme.ghostBg,
          transition: 'height 0.3s ease-out, width 0.3s ease-out, background-color 0.3s ease-out',
          transform: 'translateX(-50%) translateY(-50%)',
          mixBlendMode: 'difference', // Or 'exclusion', 'hard-light' for different effects
          filter: 'blur(5px)', // Apply a subtle blur
        }}
      />

      {/* Main Cursor (circle with squish and hover effects) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springMainX,
          y: springMainY,
          height: cursorVariant === 'hover' ? 48 : 36, // Grow on hover, larger than default
          width: cursorVariant === 'hover' ? 48 : 36,
          backgroundColor: currentTheme.mainBg,
          border: `2px solid ${currentTheme.mainBorder}`, // Stronger border
          transition: 'height 0.2s ease-out, width 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out',
          transform: `translateX(-50%) translateY(-50%) scaleX(${scaleX}) scaleY(${scaleY})`, // Apply squish
          mixBlendMode: 'difference',
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))', // Subtle glow
        }}
      />

      {/* Trailing Dot Cursor (faster, solid color) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          x: springDotX,
          y: springDotY,
          height: cursorVariant === 'hover' ? 12 : 8, // Dot also changes size on hover
          width: cursorVariant === 'hover' ? 12 : 8,
          backgroundColor: currentTheme.dotBg,
          opacity: isPressed ? 0 : 1, // Hide dot when main cursor is pressed
          transition: 'height 0.2s ease-out, width 0.2s ease-out, opacity 0.1s ease-out, background-color 0.2s ease-out',
          transform: 'translateX(-50%) translateY(-50%)',
          mixBlendMode: 'difference', // Can be 'overlay', 'lighten' for different effects
        }}
      />
    </>
  );
};

export default CustomCursor;