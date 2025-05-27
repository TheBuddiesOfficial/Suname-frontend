import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Define props interface to accept isDarkRealm
interface CustomCursorProps {
  isDarkRealm: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isDarkRealm }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [cursorVariant, setCursorVariant] = useState('default');

  // Adjust stiffness and damping for faster and smoother movement
  // Lower damping means less "bounce" and quicker settling
  // Higher stiffness means more force applied to reach the target faster
  const cursorX = useSpring(x, { stiffness: 1000, damping: 60, mass: 0.3 }); // Increased stiffness, adjusted damping
  const cursorY = useSpring(y, { stiffness: 1000, damping: 60, mass: 0.3 }); // Increased stiffness, adjusted damping

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', () => setCursorVariant('clicked'));
    window.addEventListener('mouseup', () => setCursorVariant('default'));

    const setHover = () => setCursorVariant('hover');
    const clearHover = () => setCursorVariant('default');

    const applyHoverListeners = () => {
      // Select interactive elements
      document.querySelectorAll('a, button, input[type="submit"], [role="button"], [data-cursor-hover="true"]').forEach((el) => {
        el.addEventListener('mouseenter', setHover);
        el.addEventListener('mouseleave', clearHover);
      });
    };

    applyHoverListeners();

    // Use a MutationObserver to re-apply listeners if DOM changes
    const observer = new MutationObserver(applyHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      // Clean up listeners when component unmounts
      document.querySelectorAll('a, button, input[type="submit"], [role="button"], [data-cursor-hover="true"]').forEach((el) => {
        el.removeEventListener('mouseenter', setHover);
        el.removeEventListener('mouseleave', clearHover);
      });
    };
  }, [x, y]);

  // Define color themes
  const themeColors = {
    light: {
      defaultBg: 'rgba(255, 165, 0, 0.15)', // Light orange
      defaultBorder: 'rgba(255, 165, 0, 0.5)',
      hoverBg: 'rgba(255, 165, 0, 0.25)', // Slightly more opaque on hover
      hoverBorder: 'rgba(255, 165, 0, 0.8)',
      clickedBg: 'rgba(255, 165, 0, 0.4)',
      clickedBorder: 'rgba(255, 165, 0, 1)',
    },
    dark: {
      defaultBg: 'rgba(139, 92, 246, 0.15)', // Purple
      defaultBorder: 'rgba(139, 92, 246, 0.5)',
      hoverBg: 'rgba(139, 92, 246, 0.25)',
      hoverBorder: 'rgba(139, 92, 246, 0.8)',
      clickedBg: 'rgba(139, 92, 246, 0.4)',
      clickedBorder: 'rgba(139, 92, 246, 1)',
    },
  };

  const currentTheme = isDarkRealm ? themeColors.dark : themeColors.light;

  const styles: Record<string, React.CSSProperties> = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: currentTheme.defaultBg,
      border: `1px solid ${currentTheme.defaultBorder}`,
    },
    hover: {
      height: 48,
      width: 48,
      backgroundColor: currentTheme.hoverBg,
      border: `1px solid ${currentTheme.hoverBorder}`,
    },
    clicked: {
      height: 24,
      width: 24,
      backgroundColor: currentTheme.clickedBg,
      border: `1px solid ${currentTheme.clickedBorder}`,
    },
  };

  // Prevent cursor from showing on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        ...styles[cursorVariant],
        mixBlendMode: 'difference', // Creates a cool inverted color effect
        position: 'fixed',
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
};

export default CustomCursor;