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
  // The 'lightningBolt' state variable is declared but not used in the provided snippet.
  // Consider removing it if it's not needed for other parts of your application.
  // const [lightningBolt, setLightningBolt] = useState('');

  // Generate realistic lightning bolt path
  const generateLightningPath = useMemo(() => {
    const paths = [];
    for (let i = 0; i < 5; i++) {
      const startX = 20 + Math.random() * 60;
      const startY = 5 + Math.random() * 20;
      const segments = [];

      let currentX = startX;
      let currentY = startY;

      // Main bolt
      for (let j = 0; j < 8; j++) {
        const nextX = currentX + (Math.random() - 0.5) * 15;
        const nextY = currentY + 8 + Math.random() * 12;
        segments.push(`L ${nextX} ${nextY}`);
        currentX = nextX;
        currentY = nextY;
      }

      // Add branches
      const branchStart = Math.floor(segments.length / 2);
      const branchX = currentX + (Math.random() - 0.5) * 20;
      const branchY = currentY - 20 + Math.random() * 10;
      segments.splice(branchStart, 0, `L ${branchX} ${branchY}`);

      paths.push(`M ${startX} ${startY} ${segments.join(' ')}`);
    }
    return paths;
  }, [showLightning]);

  // Memoize static styles and configurations
  const backgroundGradients = useMemo(
    () => ({
      dark: 'linear-gradient(180deg, #01040f 0%, #0a1128 20%, #151b3d 40%, #2a345e 60%, #404b7a 80%, #151b3d 100%)',
      light: 'linear-gradient(180deg, #87CEEB 0%, #87CEFA 20%, #FFE4B5 40%, #FFA500 60%, #FF6347 80%, #FF4500 100%)',
    }),
    []
  );

  const atmosphericHazeGradients = useMemo(
    () => ({
      dark: 'radial-gradient(ellipse at center top, rgba(70, 100, 150, 0.25), rgba(90, 130, 180, 0.18), transparent 75%)',
      light: 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.6), rgba(255, 248, 220, 0.4), transparent 85%)',
    }),
    []
  );

  const sunMoonGradients = useMemo(
    () => ({
      dark: 'radial-gradient(circle at 30% 30%, #f5f8ff 5%, #e6efff 25%, #d0e0ff 50%, #b3c7ff 75%, #94a5ff 100%)',
      light: 'radial-gradient(circle at 35% 35%, #fffbe6 0%, #fff0b3 20%, #ffd700 60%, #ffa500 100%)',
    }),
    []
  );

  const sunMoonShadows = useMemo(
    () => ({
      dark: '0 0 clamp(35px, 7vw, 75px) rgba(220, 230, 255, 0.8), inset -7px -7px 18px rgba(180, 200, 255, 0.5)',
      light: '0 0 clamp(70px, 14vw, 180px) rgba(255, 215, 0, 0.9), 0 0 clamp(120px, 20vw, 300px) rgba(255, 165, 0, 0.6), inset -5px -5px 12px rgba(255, 165, 0, 0.4)',
    }),
    []
  );

  const sunMoonHaloGradients = useMemo(
    () => ({
      dark: 'radial-gradient(circle, transparent 40%, rgba(200, 220, 255, 0.15) 50%, transparent 80%)',
      light: 'radial-gradient(circle, transparent 30%, rgba(255, 140, 0, 0.35) 45%, rgba(255, 165, 0, 0.25) 70%, transparent 90%)',
    }),
    []
  );

  const horizonLineGradients = useMemo(
    () => ({
      dark: 'linear-gradient(90deg, transparent 0%, rgba(180, 220, 240, 0.8) 20%, rgba(230, 250, 255, 0.95) 50%, rgba(180, 220, 240, 0.8) 80%, transparent 100%)',
      light: 'linear-gradient(90deg, transparent 0%, rgba(255, 250, 245, 0.95) 20%, rgba(255, 240, 220, 1) 50%, rgba(255, 250, 245, 0.95) 80%, transparent 100%)',
    }),
    []
  );

  const oceanGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to top,
          rgba(10, 25, 50, 0.98) 0%,
          rgba(20, 40, 75, 0.9) 15%,
          rgba(35, 60, 105, 0.8) 30%,
          rgba(55, 85, 135, 0.7) 45%,
          rgba(75, 110, 165, 0.6) 60%,
          rgba(95, 135, 195, 0.5) 75%,
          rgba(120, 160, 220, 0.3) 90%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to top,
          rgba(0, 105, 148, 0.9) 0%,
          rgba(0, 119, 190, 0.8) 25%,
          rgba(65, 157, 217, 0.7) 50%,
          rgba(135, 206, 235, 0.6) 75%,
          rgba(173, 216, 230, 0.4) 90%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const waterWaveGradients1 = useMemo(
    () => ({
      dark: `
        repeating-linear-gradient(90deg,
          transparent,
          transparent clamp(30px, 6vw, 80px),
          rgba(50, 90, 160, 0.45) clamp(30px, 6vw, 80px),
          rgba(50, 90, 160, 0.45) clamp(70px, 14vw, 150px),
          transparent clamp(70px, 14vw, 150px),
          transparent clamp(110px, 22vw, 230px)
        )
      `,
      light: `
        repeating-linear-gradient(90deg,
          transparent,
          transparent clamp(40px, 8vw, 100px),
          rgba(0, 150, 200, 0.35) clamp(40px, 8vw, 100px),
          rgba(0, 150, 200, 0.35) clamp(80px, 16vw, 200px)
        )
      `,
    }),
    []
  );

  const waterWaveGradients2 = useMemo(
    () => ({
      dark: `
        repeating-linear-gradient(45deg,
          transparent,
          transparent clamp(15px, 3vw, 50px),
          rgba(80, 130, 200, 0.35) clamp(15px, 3vw, 50px),
          rgba(80, 130, 200, 0.35) clamp(35px, 7vw, 100px)
        )
      `,
      light: `
        repeating-linear-gradient(45deg,
          transparent,
          transparent clamp(20px, 4vw, 60px),
          rgba(30, 170, 220, 0.3) clamp(20px, 4vw, 60px),
          rgba(30, 170, 220, 0.3) clamp(40px, 8vw, 120px)
        )
      `,
    }),
    []
  );

  const reflectionGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to bottom,
          transparent 0%,
          rgba(230, 240, 255, 0.65) 10%,
          rgba(200, 225, 255, 0.85) 30%,
          rgba(170, 200, 255, 0.75) 50%,
          rgba(120, 170, 255, 0.65) 70%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to bottom,
          transparent 0%,
          rgba(255, 215, 0, 0.65) 20%,
          rgba(255, 193, 7, 0.55) 50%,
          rgba(255, 235, 59, 0.45) 80%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const beachSandGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to top,
          rgba(50, 60, 75, 0.98) 0%,
          rgba(75, 90, 110, 0.9) 20%,
          rgba(110, 125, 150, 0.8) 40%,
          rgba(150, 165, 190, 0.65) 60%,
          rgba(190, 205, 225, 0.5) 80%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to top,
          rgba(194, 178, 128, 1) 0%,
          rgba(218, 200, 158, 0.92) 15%,
          rgba(237, 220, 180, 0.84) 30%,
          rgba(250, 235, 200, 0.72) 50%,
          rgba(255, 248, 220, 0.6) 70%,
          rgba(255, 253, 240, 0.45) 85%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const sandTextureGradients = useMemo(
    () => ({
      dark: `
        radial-gradient(circle at 25% 30%, rgba(190, 205, 225, 0.5) 1.2px, transparent 1.2px),
        radial-gradient(circle at 75% 70%, rgba(150, 165, 190, 0.4) 1.2px, transparent 1.2px),
        radial-gradient(circle at 50% 50%, rgba(170, 185, 205, 0.45) 1.2px, transparent 1.2px),
        radial-gradient(circle at 30% 80%, rgba(160, 175, 195, 0.35) 1.2px, transparent 1.2px),
        radial-gradient(circle at 80% 20%, rgba(190, 205, 225, 0.4) 1.2px, transparent 1.2px)
      `,
      light: `
        radial-gradient(circle at 25% 30%, rgba(210, 180, 140, 0.6) 1.2px, transparent 1.2px),
        radial-gradient(circle at 75% 70%, rgba(230, 200, 160, 0.5) 1.2px, transparent 1.2px),
        radial-gradient(circle at 50% 50%, rgba(245, 220, 180, 0.55) 1.2px, transparent 1.2px),
        radial-gradient(circle at 30% 80%, rgba(250, 230, 190, 0.5) 1.2px, transparent 1.2px),
        radial-gradient(circle at 80% 20%, rgba(255, 240, 200, 0.45) 1.2px, transparent 1.2px)
      `,
    }),
    []
  );

  const wetSandEdgeGradients = useMemo(
    () => ({
      dark: 'linear-gradient(90deg, transparent 0%, rgba(220, 230, 240, 0.95) 15%, rgba(240, 245, 250, 1) 35%, rgba(255, 255, 255, 1) 50%, rgba(240, 245, 250, 1) 65%, rgba(220, 230, 240, 0.95) 85%, transparent 100%)',
      light: 'linear-gradient(90deg, transparent 0%, rgba(255, 250, 240, 0.98) 15%, rgba(255, 235, 200, 0.95) 35%, rgba(255, 255, 255, 1) 50%, rgba(255, 235, 200, 0.95) 65%, rgba(255, 250, 240, 0.98) 85%, transparent 100%)',
    }),
    []
  );

  const duneGradients = useMemo(
    () => ({
      dark: `linear-gradient(to top, rgba(45, 55, 70, 0.95) 0%, rgba(60, 75, 95, 0.9) 50%, transparent 100%)`,
      light: `linear-gradient(to top, rgba(194, 154, 108, 0.95) 0%, rgba(218, 184, 148, 0.9) 50%, transparent 100%)`,
    }),
    []
  );

  useEffect(() => {
    // Enhanced lightning effect on mode change
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  useEffect(() => {
    // Bird appearance logic
    if (prevMode !== isDarkRealm) {
      setModeTransitioning(true);
      setShowBirds(false);

      const timer = setTimeout(() => {
        setModeTransitioning(false);
        if (!isDarkRealm) {
          setShowBirds(true);
        }
      }, 300);

      setPrevMode(isDarkRealm);
      return () => clearTimeout(timer);
    } else if (!isDarkRealm && !modeTransitioning && !showBirds) {
      setShowBirds(true);
    }
  }, [isDarkRealm, prevMode, modeTransitioning]);

  return (
    <>
      {/* Background Gradient - Enhanced for both modes */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -21 }}
        animate={{
          background: isDarkRealm ? backgroundGradients.dark : backgroundGradients.light,
        }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      />

      {/* Atmospheric Haze/Glow - Enhanced */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -20,
          background: isDarkRealm ? atmosphericHazeGradients.dark : atmosphericHazeGradients.light,
        }}
        animate={{
          opacity: [0.6, 0.95, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Realistic Lightning Effect - Completely Enhanced */}
      {showLightning && (
        <div className="fixed inset-0" style={{ zIndex: -2, pointerEvents: 'none' }}>
          {/* Main Lightning Bolts with SVG paths */}
          {generateLightningPath.map((path, index) => (
            <motion.svg
              key={`lightning-bolt-${index}`}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 1, 0],
                filter: [
                  'blur(0px) brightness(1)',
                  'blur(1px) brightness(3)',
                  'blur(0px) brightness(2)',
                  'blur(2px) brightness(4)',
                  'blur(0px) brightness(1)'
                ]
              }}
              transition={{
                duration: 0.15 + Math.random() * 0.1,
                delay: Math.random() * 0.5,
                ease: 'linear',
              }}
            >
              <path
                d={path}
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth={Math.random() * 3 + 2}
                fill="none"
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px rgba(173, 216, 230, 0.8))"
              />
              <path
                d={path}
                stroke="rgba(173, 216, 230, 0.6)"
                strokeWidth={Math.random() * 6 + 4}
                fill="none"
                strokeLinecap="round"
              />
            </motion.svg>
          ))}

          {/* Lightning Flash/Illumination Effect */}
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={`lightning-flash-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.3, 0.1, 0.4, 0],
                background: [
                  'rgba(255, 255, 255, 0)',
                  'rgba(255, 255, 255, 0.15)',
                  'rgba(173, 216, 230, 0.08)',
                  'rgba(255, 255, 255, 0.2)',
                  'rgba(255, 255, 255, 0)'
                ]
              }}
              transition={{
                duration: 0.2 + Math.random() * 0.15,
                delay: Math.random() * 0.3,
                ease: 'easeOut',
              }}
              style={{
                mixBlendMode: 'screen',
                zIndex: -1,
              }}
            />
          ))}

          {/* Thunder Clouds Effect */}
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0.4, 0.7, 0],
              scale: [1, 1.02, 1.01, 1.03, 1]
            }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              background: 'radial-gradient(ellipse at 50% 20%, rgba(70, 80, 100, 0.3) 30%, transparent 70%)',
              zIndex: -1,
            }}
          />
        </div>
      )}

      {/* Floating Particles - Day Mode */}
      {!isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -18 }}>
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`day-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `clamp(2px, ${Math.random() * 0.5 + 0.3}vw, 6px)`,
                height: `clamp(2px, ${Math.random() * 0.5 + 0.3}vw, 6px)`,
                background: `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
              }}
              animate={{
                y: [0, -100 - Math.random() * 200],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Sun/Moon */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -18,
          width: 'clamp(80px, 14vw, 170px)',
          height: 'clamp(80px, 14vw, 170px)',
          borderRadius: '50%',
          background: isDarkRealm ? sunMoonGradients.dark : sunMoonGradients.light,
          top: 'clamp(8vh, 12vh, 16vh)',
          right: 'clamp(12vw, 16vw, 20vw)',
          filter: isDarkRealm ? 'blur(0.8px)' : 'blur(0.4px)',
          boxShadow: isDarkRealm ? sunMoonShadows.dark : sunMoonShadows.light,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.9, 1, 0.9],
          rotate: isDarkRealm ? [0, 8, 0] : [0, 360],
        }}
        transition={{
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: isDarkRealm ? 80 : 240,
            repeat: Infinity,
            ease: isDarkRealm ? 'easeInOut' : 'linear',
          },
        }}
      />

      {/* Sun/Moon Halo */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -19,
          width: 'clamp(120px, 22vw, 280px)',
          height: 'clamp(120px, 22vw, 280px)',
          borderRadius: '50%',
          background: isDarkRealm ? sunMoonHaloGradients.dark : sunMoonHaloGradients.light,
          top: 'clamp(6vh, 10vh, 14vh)',
          right: 'clamp(9vw, 13vw, 17vw)',
        }}
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Enhanced Seagulls (Day) */}
      {!isDarkRealm && showBirds && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 60 + 5 + '%',
                top: Math.random() * 35 + 10 + '%',
                fontSize: 'clamp(14px, 3vw, 35px)',
                color: 'rgba(0, 0, 0, 0.8)',
                filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.3))',
                transform: `scaleX(${Math.random() > 0.5 ? 1 : -1})`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                x: [0, 300 + Math.random() * 400, 600 + Math.random() * 500],
                y: [0, -60 + Math.random() * 120, -45 + Math.random() * 90],
                opacity: [0, 1, 1, 0],
                rotate: [0, Math.random() * 10 - 5, Math.random() * 8 - 4],
              }}
              transition={{
                duration: 35 + Math.random() * 25,
                repeat: Infinity,
                delay: Math.random() * 15,
                ease: 'linear',
              }}
            >
              <svg
                width="clamp(14px, 3vw, 35px)"
                height="clamp(10px, 2vw, 25px)"
                viewBox="0 0 100 60"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 30 C 20 5, 40 5, 50 30 C 60 5, 80 5, 100 30 C 80 40, 60 40, 50 30 C 40 40, 20 40, 0 30 Z" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Enhanced Stars (Night) - Better quantity and effects */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(200)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
                height: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
                background: `hsl(${200 + Math.random() * 60}, 100%, ${85 + Math.random() * 15}%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 65 + '%',
                boxShadow: `0 0 clamp(6px, 1.2vw, 15px) rgba(255, 255, 255, ${0.6 + Math.random() * 0.4})`,
              }}
              animate={{
                opacity: [0.3 + Math.random() * 0.3, 1, 0.3 + Math.random() * 0.3],
                scale: [0.7, 1.5, 0.7],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Enhanced Shooting Stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute"
              style={{
                width: 'clamp(3px, 0.6vw, 8px)',
                height: 'clamp(2px, 0.4vw, 4px)',
                background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
                left: '-15%',
                top: `${8 + i * 15}%`,
                borderRadius: '50%',
                boxShadow: '0 0 clamp(20px, 4vw, 40px) #ffffff, 4px 0 clamp(35px, 6vw, 70px) rgba(255, 255, 255, 0.6)',
              }}
              animate={{
                x: ['-15%', '115%'],
                y: [`${8 + i * 15}%`, `${28 + i * 15}%`],
                opacity: [0, 0.8, 1, 0.8, 0],
                scale: [0.5, 1.2, 1, 0.8, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 18 + Math.random() * 12,
                delay: i * 8 + Math.random() * 5,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Constellation Effect */}
          {[...Array(3)].map((_, groupIndex) => (
            <div key={`constellation-${groupIndex}`} className="absolute">
              {[...Array(5)].map((_, starIndex) => (
                <motion.div
                  key={`constellation-star-${groupIndex}-${starIndex}`}
                  className="absolute rounded-full"
                  style={{
                    width: 'clamp(2px, 0.5vw, 6px)',
                    height: 'clamp(2px, 0.5vw, 6px)',
                    background: '#ffffff',
                    left: `${20 + groupIndex * 30 + starIndex * 8}%`,
                    top: `${15 + groupIndex * 15 + Math.sin(starIndex) * 10}%`,
                    boxShadow: '0 0 clamp(8px, 1.5vw, 20px) rgba(255, 255, 255, 0.8)',
                  }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: starIndex * 0.5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Horizon Line - Enhanced */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16,
          height: 'clamp(1.2px, 0.25vw, 3.5px)', // Sharper line
          background: isDarkRealm ? horizonLineGradients.dark : horizonLineGradients.light,
          top: `calc(100% - clamp(25vh, 32vh, 35vh))`, // Adjusted position
          filter: 'blur(clamp(0.6px, 0.2vw, 2px))',
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scaleX: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Realistic Ocean/Water - Main body with clearer gradients and subtle movement */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -15,
          height: 'clamp(25vh, 32vh, 35vh)', // Adjusted height
          background: isDarkRealm ? oceanGradients.dark : oceanGradients.light,
        }}
        animate={{
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Realistic water wave patterns - First layer, more distinct */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: 'clamp(20vh, 28vh, 32vh)', // Adjusted height
          background: isDarkRealm ? waterWaveGradients1.dark : waterWaveGradients1.light,
          backgroundSize: '100% 100%', // Ensure it covers the area
        }}
        animate={{
          x: [0, -200, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Additional wave layer for more depth and realism */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(15vh, 22vh, 28vh)', // Adjusted height
          background: isDarkRealm ? waterWaveGradients2.dark : waterWaveGradients2.light,
          backgroundSize: '100% 100%', // Ensure it covers the area
        }}
        animate={{
          x: [100, -100, 100],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Moonlight/Sunlight reflection on water - Enhanced */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -12,
          width: 'clamp(40px, 8vw, 80px)',
          height: 'clamp(120px, 25vh, 250px)',
          background: isDarkRealm ? reflectionGradients.dark : reflectionGradients.light,
          right: 'clamp(16vw, 21vw, 26vw)', // Aligned with sun/moon
          bottom: '0',
          filter: 'blur(clamp(1px, 0.5vw, 3px))',
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scaleY: [1, 1.15, 1],
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Beach Sand - Main body with clearer gradients and deeper colors */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -11,
          height: 'clamp(18vh, 25vh, 30vh)', // Adjusted height
          background: isDarkRealm ? beachSandGradients.dark : beachSandGradients.light,
        }}
      />

      {/* Beach Sand Texture/Details - Random dots for granular feel */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -10,
          height: 'clamp(16vh, 23vh, 28vh)', // Adjusted height
          background: isDarkRealm ? sandTextureGradients.dark : sandTextureGradients.light,
          backgroundSize: `
            clamp(25px, 5vw, 60px) clamp(25px, 5vw, 60px),
            clamp(35px, 7vw, 80px) clamp(35px, 7vw, 80px),
            clamp(30px, 6vw, 70px) clamp(30px, 6vw, 70px),
            clamp(40px, 8vw, 90px) clamp(40px, 8vw, 90px),
            clamp(28px, 5.5vw, 65px) clamp(28px, 5.5vw, 65px)
          `,
        }}
        animate={{
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Wet Sand Reflection/Edge - Sharper, more defined line */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9,
          height: 'clamp(2px, 0.5vw, 4.5px)', // Sharper line
          background: isDarkRealm ? wetSandEdgeGradients.dark : wetSandEdgeGradients.light,
          top: `calc(100% - clamp(18vh, 25vh, 30vh))`, // Aligned with new sand height
          filter: 'blur(clamp(0.7px, 0.3vw, 2.5px))',
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
          scaleX: [1, 1.08, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Beach Details - Footprints and Shells */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(15vh, 20vh, 25vh)', zIndex: -8 }}>
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`footprint-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(6px, 1.1vw, 18px)`,
              height: `clamp(3px, 0.6vw, 10px)`,
              background: isDarkRealm
                ? 'rgba(50, 60, 75, 0.6)'
                : 'rgba(160, 80, 0, 0.55)',
              left: Math.random() * 85 + 5 + '%',
              top: Math.random() * 70 + 15 + '%',
              filter: 'blur(clamp(0.3px, 0.1vw, 1px))',
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
            }}
            animate={{
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: 'easeInOut',
            }}
          />
        ))}

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`shell-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(3px, 0.8vw, 12px)`,
              height: `clamp(2px, 0.6vw, 8px)`,
              background: isDarkRealm
                ? `hsl(${220 + Math.random() * 20}, 15%, ${80 + Math.random() * 15}%)`
                : `hsl(${30 + Math.random() * 10}, ${50 + Math.random() * 20}%, ${70 + Math.random() * 15}%)`,
              left: Math.random() * 90 + 4 + '%',
              top: Math.random() * 60 + 20 + '%',
              borderRadius: Math.random() > 0.5 ? '50%' : '35% 65% 65% 35% / 35% 35% 65% 65%',
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Dunes/Hills - More defined and layered */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`dune-${i}`}
          className="fixed bottom-0"
          style={{
            zIndex: -6,
            width: `clamp(80px, ${14 + Math.random() * 10}vw, 200px)`,
            height: `clamp(20px, ${4 + Math.random() * 3}vh, 50px)`,
            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
            background: isDarkRealm ? duneGradients.dark : duneGradients.light,
            left: `${i * 20 + (Math.random() * 8 - 4)}vw`, // Adjusted spacing
            transform: `translateX(-50%)`,
            bottom: `clamp(16vh, 23vh, 28vh)`, // Adjusted position
            filter: 'blur(clamp(0.5px, 0.2vw, 2px))',
          }}
          animate={{
            y: [0, -5, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Beach Sparkles/Glints */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(20vh, 30vh, 35vh)', zIndex: -5 }}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
              height: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
              background: isDarkRealm
                ? `hsl(${210 + Math.random() * 30}, ${30 + Math.random() * 30}%, ${80 + Math.random() * 15}%)`
                : `hsl(${40 + Math.random() * 20}, ${60 + Math.random() * 30}%, ${85 + Math.random() * 10}%)`,
              left: Math.random() * 95 + '%',
              top: Math.random() * 85 + 5 + '%',
              boxShadow: isDarkRealm
                ? `0 0 clamp(4px, 1vw, 10px) rgba(200, 215, 230, 0.8)`
                : `0 0 clamp(6px, 1.2vw, 12px) rgba(255, 220, 50, 0.9)`,
            }}
            animate={{
              opacity: [0.4, 0.98, 0.4],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;