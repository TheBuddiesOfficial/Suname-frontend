import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);
  const [showBirds, setShowBirds] = useState(false);
  const [modeTransitioning, setModeTransitioning] = useState(false);

  // Generate realistic lightning bolt path
  const generateLightningPath = useMemo(() => {
    const paths = [];
    for (let i = 0; i < 8; i++) {
      const startX = 10 + Math.random() * 80;
      const startY = 0;
      const segments = [];

      let currentX = startX;
      let currentY = startY;

      // Main bolt - larger and more dramatic
      for (let j = 0; j < 12; j++) {
        const nextX = currentX + (Math.random() - 0.5) * 25;
        const nextY = currentY + 6 + Math.random() * 15;
        segments.push(`L ${nextX} ${nextY}`);
        currentX = nextX;
        currentY = nextY;
      }

      // Add multiple branches
      const branchCount = Math.floor(Math.random() * 3) + 2;
      for (let k = 0; k < branchCount; k++) {
        const branchStart = Math.floor(segments.length * (0.3 + Math.random() * 0.4));
        const branchX = currentX + (Math.random() - 0.5) * 40;
        const branchY = currentY - 30 + Math.random() * 20;
        segments.splice(branchStart, 0, `L ${branchX} ${branchY}`);
      }

      paths.push(`M ${startX} ${startY} ${segments.join(' ')}`);
    }
    return paths;
  }, [showLightning]);

  // Enhanced smooth gradients
  const backgroundGradients = useMemo(
    () => ({
      dark: 'linear-gradient(180deg, #000510 0%, #0c1435 15%, #1a2456 35%, #2d3a6b 55%, #3f4d7a 75%, #1a2456 100%)',
      light: 'linear-gradient(180deg, #4FC3F7 0%, #29B6F6 20%, #FFB74D 45%, #FF8A65 70%, #FF7043 85%, #FF5722 100%)',
    }),
    []
  );

  // Enhanced cloud effects for both modes
  const cloudEffects = useMemo(
    () => ({
      dark: 'radial-gradient(ellipse 120% 80% at 30% 20%, rgba(45, 55, 80, 0.4) 0%, rgba(60, 75, 110, 0.3) 40%, transparent 70%), radial-gradient(ellipse 100% 60% at 70% 30%, rgba(35, 45, 70, 0.35) 0%, rgba(50, 65, 95, 0.25) 50%, transparent 80%)',
      light: 'radial-gradient(ellipse 150% 100% at 25% 15%, rgba(255, 255, 255, 0.8) 0%, rgba(240, 248, 255, 0.6) 30%, rgba(255, 255, 255, 0.4) 60%, transparent 90%), radial-gradient(ellipse 120% 80% at 75% 25%, rgba(255, 255, 255, 0.7) 0%, rgba(230, 240, 255, 0.5) 40%, transparent 75%)',
    }),
    []
  );

  const oceanGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to top,
          rgba(5, 15, 35, 0.98) 0%,
          rgba(10, 25, 45, 0.95) 20%,
          rgba(20, 35, 60, 0.9) 40%,
          rgba(30, 50, 80, 0.8) 60%,
          rgba(45, 70, 105, 0.6) 80%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to top,
          rgba(0, 77, 128, 0.95) 0%,
          rgba(0, 96, 160, 0.9) 25%,
          rgba(41, 128, 185, 0.85) 50%,
          rgba(85, 170, 210, 0.75) 75%,
          rgba(135, 206, 235, 0.5) 90%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const wavePatterns = useMemo(
    () => ({
      dark1: `
        repeating-linear-gradient(90deg,
          transparent,
          transparent 40px,
          rgba(30, 50, 85, 0.6) 40px,
          rgba(30, 50, 85, 0.6) 80px,
          transparent 80px,
          transparent 120px
        )
      `,
      light1: `
        repeating-linear-gradient(90deg,
          transparent,
          transparent 50px,
          rgba(0, 120, 180, 0.4) 50px,
          rgba(0, 120, 180, 0.4) 100px,
          transparent 100px,
          transparent 150px
        )
      `,
      dark2: `
        repeating-linear-gradient(45deg,
          transparent,
          transparent 25px,
          rgba(50, 80, 125, 0.45) 25px,
          rgba(50, 80, 125, 0.45) 50px,
          transparent 50px,
          transparent 75px
        )
      `,
      light2: `
        repeating-linear-gradient(45deg,
          transparent,
          transparent 30px,
          rgba(20, 140, 200, 0.35) 30px,
          rgba(20, 140, 200, 0.35) 60px,
          transparent 60px,
          transparent 90px
        )
      `,
    }),
    []
  );

  const beachGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to top,
          rgba(25, 30, 40, 0.98) 0%,
          rgba(40, 50, 65, 0.95) 25%,
          rgba(60, 75, 90, 0.9) 50%,
          rgba(85, 100, 120, 0.8) 75%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to top,
          rgba(160, 130, 85, 1) 0%,
          rgba(190, 160, 115, 0.95) 20%,
          rgba(215, 185, 140, 0.9) 40%,
          rgba(235, 210, 170, 0.8) 65%,
          rgba(250, 235, 200, 0.6) 85%,
          transparent 100%
        )
      `,
    }),
    []
  );

  // Enhanced lightning effect on mode change (light to dark only)
  useEffect(() => {
    if (prevMode !== isDarkRealm && isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  // Bird appearance logic
  useEffect(() => {
    if (prevMode !== isDarkRealm) {
      setModeTransitioning(true);
      setShowBirds(false);

      const timer = setTimeout(() => {
        setModeTransitioning(false);
        if (!isDarkRealm) {
          setShowBirds(true);
        }
      }, 200);

      setPrevMode(isDarkRealm);
      return () => clearTimeout(timer);
    } else if (!isDarkRealm && !modeTransitioning && !showBirds) {
      setShowBirds(true);
    }
  }, [isDarkRealm, prevMode, modeTransitioning]);

  return (
    <>
      {/* Main Background - Ultra smooth transition */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -25 }}
        animate={{
          background: isDarkRealm ? backgroundGradients.dark : backgroundGradients.light,
        }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Enhanced Sky Clouds */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -24,
          background: isDarkRealm ? cloudEffects.dark : cloudEffects.light,
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Moving Sky Patterns */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -23,
          background: isDarkRealm 
            ? 'repeating-linear-gradient(45deg, transparent, transparent 200px, rgba(60, 80, 120, 0.1) 200px, rgba(60, 80, 120, 0.1) 400px)'
            : 'repeating-linear-gradient(135deg, transparent, transparent 300px, rgba(255, 255, 255, 0.15) 300px, rgba(255, 255, 255, 0.15) 600px)',
        }}
        animate={{
          x: [0, -400, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Dramatic Thunder Effect - Large Scale */}
      {showLightning && (
        <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: 'none' }}>
          {/* Massive Lightning Flash */}
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0.3, 0.9, 0.1, 0.7, 0],
              background: [
                'rgba(255, 255, 255, 0)',
                'rgba(173, 216, 230, 0.4)',
                'rgba(255, 255, 255, 0.2)',
                'rgba(135, 206, 235, 0.5)',
                'rgba(255, 255, 255, 0.1)',
                'rgba(173, 216, 230, 0.3)',
                'rgba(255, 255, 255, 0)'
              ]
            }}
            transition={{
              duration: 2.5,
              ease: 'easeOut',
              times: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1]
            }}
          />

          {/* Multiple Lightning Bolts */}
          {generateLightningPath.map((path, index) => (
            <motion.svg
              key={`thunder-bolt-${index}`}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0.6, 1, 0.3, 0.8, 0],
                filter: [
                  'blur(0px) brightness(1) drop-shadow(0 0 20px rgba(255,255,255,0.8))',
                  'blur(2px) brightness(4) drop-shadow(0 0 40px rgba(173,216,230,1))',
                  'blur(1px) brightness(3) drop-shadow(0 0 30px rgba(255,255,255,0.9))',
                  'blur(3px) brightness(5) drop-shadow(0 0 50px rgba(135,206,235,1))',
                  'blur(1px) brightness(2) drop-shadow(0 0 25px rgba(255,255,255,0.7))',
                  'blur(2px) brightness(4) drop-shadow(0 0 35px rgba(173,216,230,0.9))',
                  'blur(0px) brightness(1)'
                ]
              }}
              transition={{
                duration: 2.5,
                delay: index * 0.1,
                ease: 'easeOut',
                times: [0, 0.05, 0.15, 0.25, 0.4, 0.6, 1]
              }}
            >
              <path
                d={path}
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth={3 + Math.random() * 2}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d={path}
                stroke="rgba(173, 216, 230, 0.7)"
                strokeWidth={6 + Math.random() * 4}
                fill="none"
                strokeLinecap="round"
              />
            </motion.svg>
          ))}

          {/* Thunder Sound Wave Effect */}
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.4, 0.2, 0.3, 0],
              scale: [0.8, 1.1, 1.05, 1.2, 1.5],
            }}
            transition={{
              duration: 2.8,
              delay: 0.2,
              ease: 'easeOut',
            }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(100, 150, 200, 0.2) 0%, rgba(150, 200, 255, 0.15) 30%, transparent 70%)',
            }}
          />
        </div>
      )}

      {/* Enhanced Floating Particles */}
      {!isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -20 }}>
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`day-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: `rgba(255, 255, 255, ${0.6 + Math.random() * 0.4})`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
              }}
              animate={{
                y: [0, -150 - Math.random() * 200],
                x: [0, (Math.random() - 0.5) * 80],
                opacity: [0, 1, 0],
                scale: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced Sun/Moon */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -19,
          width: 'clamp(90px, 16vw, 180px)',
          height: 'clamp(90px, 16vw, 180px)',
          borderRadius: '50%',
          background: isDarkRealm 
            ? 'radial-gradient(circle at 35% 35%, #f8faff 8%, #e8f0ff 30%, #d5e5ff 55%, #c0d5ff 80%, #a8c0ff 100%)'
            : 'radial-gradient(circle at 40% 40%, #fffef0 0%, #fff5c4 25%, #ffd700 65%, #ff8c00 100%)',
          top: 'clamp(6vh, 10vh, 14vh)',
          right: 'clamp(10vw, 15vw, 20vw)',
          boxShadow: isDarkRealm 
            ? '0 0 60px rgba(220, 230, 255, 0.9), inset -8px -8px 20px rgba(180, 200, 255, 0.6)'
            : '0 0 120px rgba(255, 215, 0, 1), 0 0 200px rgba(255, 165, 0, 0.7), inset -6px -6px 15px rgba(255, 140, 0, 0.5)',
        }}
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: isDarkRealm ? 12 : 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Enhanced Birds */}
      {!isDarkRealm && showBirds && (
        <div className="fixed inset-0" style={{ zIndex: -18 }}>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`bird-${i}`}
              className="absolute"
              style={{
                left: -10 + '%',
                top: Math.random() * 40 + 15 + '%',
                fontSize: 'clamp(16px, 3.5vw, 40px)',
                color: 'rgba(0, 0, 0, 0.7)',
                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
              }}
              initial={{ x: -100, opacity: 0 }}
              animate={{
                x: [0, 400 + Math.random() * 600],
                y: [0, -40 + Math.random() * 80],
                opacity: [0, 1, 1, 0],
                rotate: [0, Math.random() * 15 - 7],
              }}
              transition={{
                duration: 20 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear',
              }}
            >
              <svg width="35" height="25" viewBox="0 0 100 60" fill="currentColor">
                <path d="M0 30 C 15 8, 35 8, 50 30 C 65 8, 85 8, 100 30 C 85 45, 65 45, 50 30 C 35 45, 15 45, 0 30 Z" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Enhanced Stars */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -18 }}>
          {[...Array(250)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                background: `hsl(${200 + Math.random() * 80}, 100%, ${85 + Math.random() * 15}%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 70 + '%',
                boxShadow: `0 0 ${8 + Math.random() * 12}px rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`,
              }}
              animate={{
                opacity: [0.4 + Math.random() * 0.3, 1, 0.4 + Math.random() * 0.3],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced Horizon Line */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -17,
          height: '2px',
          background: isDarkRealm 
            ? 'linear-gradient(90deg, transparent 0%, rgba(180, 220, 240, 0.9) 20%, rgba(230, 250, 255, 1) 50%, rgba(180, 220, 240, 0.9) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 250, 245, 1) 20%, rgba(255, 240, 220, 1) 50%, rgba(255, 250, 245, 1) 80%, transparent 100%)',
          top: `calc(100% - 35vh)`,
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
          scaleX: [1, 1.03, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Enhanced Ocean with Waves */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -16,
          height: '35vh',
          background: isDarkRealm ? oceanGradients.dark : oceanGradients.light,
        }}
        animate={{
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Wave Pattern 1 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -15,
          height: '30vh',
          background: isDarkRealm ? wavePatterns.dark1 : wavePatterns.light1,
        }}
        animate={{
          x: [0, -160, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Wave Pattern 2 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: '25vh',
          background: isDarkRealm ? wavePatterns.dark2 : wavePatterns.light2,
        }}
        animate={{
          x: [80, -80, 80],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Enhanced Beach */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: '30vh',
          background: isDarkRealm ? beachGradients.dark : beachGradients.light,
        }}
        animate={{
          opacity: [0.98, 1, 0.98],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Beach Details */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: '25vh', zIndex: -12 }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`detail-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${2 + Math.random() * 4}px`,
              background: isDarkRealm
                ? `rgba(${40 + Math.random() * 30}, ${50 + Math.random() * 30}, ${70 + Math.random() * 30}, 0.6)`
                : `rgba(${120 + Math.random() * 60}, ${80 + Math.random() * 40}, ${20 + Math.random() * 30}, 0.7)`,
              left: Math.random() * 95 + '%',
              top: Math.random() * 80 + 10 + '%',
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;