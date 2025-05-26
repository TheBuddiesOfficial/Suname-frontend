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

  // Enhanced lightning generation with larger, more dramatic bolts
  const generateLightningPath = useMemo(() => {
    const paths = [];
    for (let i = 0; i < 8; i++) {
      const startX = 15 + Math.random() * 70;
      const startY = 2 + Math.random() * 15;
      const segments = [];

      let currentX = startX;
      let currentY = startY;

      // Main bolt with larger segments
      for (let j = 0; j < 12; j++) {
        const nextX = currentX + (Math.random() - 0.5) * 25;
        const nextY = currentY + 10 + Math.random() * 15;
        segments.push(`L ${nextX} ${nextY}`);
        currentX = nextX;
        currentY = nextY;
      }

      // Add multiple branches for more dramatic effect
      for (let b = 0; b < 3; b++) {
        const branchStart = Math.floor(segments.length * (0.3 + b * 0.2));
        const branchX = currentX + (Math.random() - 0.5) * 35;
        const branchY = currentY - 30 + Math.random() * 20;
        segments.splice(branchStart, 0, `L ${branchX} ${branchY}`);
      }

      paths.push(`M ${startX} ${startY} ${segments.join(' ')}`);
    }
    return paths;
  }, [showLightning]);

  // Enhanced gradients with better realism
  const backgroundGradients = useMemo(
    () => ({
      dark: 'linear-gradient(180deg, #000510 0%, #0d1b2a 15%, #1b263b 30%, #2d3748 45%, #415a77 60%, #778da9 75%, #415a77 85%, #1b263b 100%)',
      light: 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 15%, #B8E0D2 30%, #D4EDDA 45%, #FFE5B4 60%, #FFCC70 75%, #FF8C42 90%, #FF6B35 100%)',
    }),
    []
  );

  const skyEffectGradients = useMemo(
    () => ({
      dark: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30, 60, 114, 0.4) 0%, rgba(45, 85, 145, 0.3) 35%, rgba(60, 110, 175, 0.2) 60%, transparent 85%)',
      light: 'radial-gradient(ellipse 85% 70% at 50% 0%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 248, 220, 0.5) 40%, rgba(255, 235, 180, 0.3) 70%, transparent 90%)',
    }),
    []
  );

  const oceanGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to top,
          rgba(5, 15, 35, 0.98) 0%,
          rgba(10, 25, 55, 0.95) 20%,
          rgba(20, 40, 75, 0.9) 40%,
          rgba(35, 60, 105, 0.8) 60%,
          rgba(55, 85, 135, 0.7) 80%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to top,
          rgba(0, 119, 190, 0.95) 0%,
          rgba(30, 144, 255, 0.9) 25%,
          rgba(65, 157, 217, 0.8) 50%,
          rgba(135, 206, 235, 0.7) 75%,
          rgba(173, 216, 230, 0.5) 90%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const sunMoonGradients = useMemo(
    () => ({
      dark: 'radial-gradient(circle at 30% 30%, #f8faff 8%, #e8f0ff 30%, #d5e5ff 55%, #bdd0ff 80%, #a5bbff 100%)',
      light: 'radial-gradient(circle at 35% 35%, #fffdf0 0%, #fff8dc 25%, #ffd700 65%, #ff8c00 100%)',
    }),
    []
  );

  const sunMoonShadows = useMemo(
    () => ({
      dark: '0 0 clamp(50px, 10vw, 120px) rgba(220, 230, 255, 0.9), inset -8px -8px 20px rgba(180, 200, 255, 0.6)',
      light: '0 0 clamp(100px, 18vw, 250px) rgba(255, 215, 0, 0.95), 0 0 clamp(180px, 30vw, 400px) rgba(255, 165, 0, 0.7), inset -6px -6px 15px rgba(255, 165, 0, 0.5)',
    }),
    []
  );

  // Wave animation keyframes
  const waveAnimations = useMemo(() => ({
    wave1: {
      animate: {
        transform: ['translateX(0px)', 'translateX(-200px)', 'translateX(0px)'],
        opacity: [0.6, 0.9, 0.6],
      },
      transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
    },
    wave2: {
      animate: {
        transform: ['translateX(100px)', 'translateX(-100px)', 'translateX(100px)'],
        opacity: [0.5, 0.8, 0.5],
      },
      transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
    },
    wave3: {
      animate: {
        transform: ['translateX(-50px)', 'translateX(150px)', 'translateX(-50px)'],
        opacity: [0.4, 0.7, 0.4],
      },
      transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' }
    }
  }), []);

  useEffect(() => {
    // Enhanced lightning effect that triggers on EVERY mode change
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 3000); // Longer duration for more dramatic effect
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  useEffect(() => {
    // Bird appearance logic with smoother transitions
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
      {/* Enhanced Background Gradient */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -25 }}
        animate={{
          background: isDarkRealm ? backgroundGradients.dark : backgroundGradients.light,
        }}
        transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Sky Effects Layer */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -24,
          background: isDarkRealm ? skyEffectGradients.dark : skyEffectGradients.light,
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Sky Clouds - Day Mode */}
      {!isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -23 }}>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className="absolute rounded-full"
              style={{
                width: `clamp(60px, ${12 + Math.random() * 8}vw, 180px)`,
                height: `clamp(25px, ${4 + Math.random() * 3}vw, 70px)`,
                background: `rgba(255, 255, 255, ${0.7 + Math.random() * 0.2})`,
                left: `${Math.random() * 120 - 10}%`,
                top: `${Math.random() * 40 + 5}%`,
                filter: 'blur(2px)',
                borderRadius: '100px',
              }}
              animate={{
                x: [0, 50 + Math.random() * 100],
                opacity: [0.6, 0.9, 0.6],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Enhanced Lightning Effect - Larger and More Dramatic */}
      {showLightning && (
        <div className="fixed inset-0" style={{ zIndex: -1, pointerEvents: 'none' }}>
          {/* Massive Lightning Bolts */}
          {generateLightningPath.map((path, index) => (
            <motion.svg
              key={`lightning-bolt-${index}`}
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0.9, 1, 0.7, 1, 0],
                filter: [
                  'blur(0px) brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))',
                  'blur(2px) brightness(4) drop-shadow(0 0 30px rgba(173,216,230,1))',
                  'blur(1px) brightness(3) drop-shadow(0 0 25px rgba(255,255,255,0.8))',
                  'blur(3px) brightness(5) drop-shadow(0 0 40px rgba(173,216,230,1))',
                  'blur(1px) brightness(2.5) drop-shadow(0 0 20px rgba(255,255,255,0.6))',
                  'blur(2px) brightness(4) drop-shadow(0 0 35px rgba(173,216,230,0.9))',
                  'blur(0px) brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))'
                ]
              }}
              transition={{
                duration: 0.4 + Math.random() * 0.3,
                delay: Math.random() * 0.8,
                ease: 'easeInOut',
              }}
            >
              {/* Main lightning bolt - thicker */}
              <path
                d={path}
                stroke="rgba(255, 255, 255, 0.98)"
                strokeWidth={6 + Math.random() * 4}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Outer glow - much thicker */}
              <path
                d={path}
                stroke="rgba(173, 216, 230, 0.7)"
                strokeWidth={15 + Math.random() * 8}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          ))}

          {/* Massive Lightning Flash */}
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={`lightning-flash-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.6, 0.2, 0.8, 0.1, 0.4, 0],
                background: [
                  'rgba(255, 255, 255, 0)',
                  'rgba(255, 255, 255, 0.3)',
                  'rgba(173, 216, 230, 0.15)',
                  'rgba(255, 255, 255, 0.4)',
                  'rgba(173, 216, 230, 0.1)',
                  'rgba(255, 255, 255, 0.2)',
                  'rgba(255, 255, 255, 0)'
                ]
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.3,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
              style={{
                mixBlendMode: 'screen',
                zIndex: 0,
              }}
            />
          ))}

          {/* Thunder Sound Visual Effect */}
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [1, 1.1, 1.05],
            }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(100, 120, 150, 0.4) 20%, transparent 60%)',
              zIndex: -1,
            }}
          />
        </div>
      )}

      {/* Enhanced Sun/Moon */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -18,
          width: 'clamp(100px, 16vw, 200px)',
          height: 'clamp(100px, 16vw, 200px)',
          borderRadius: '50%',
          background: isDarkRealm ? sunMoonGradients.dark : sunMoonGradients.light,
          top: 'clamp(8vh, 12vh, 16vh)',
          right: 'clamp(12vw, 16vw, 20vw)',
          filter: isDarkRealm ? 'blur(0.5px)' : 'blur(0.3px)',
          boxShadow: isDarkRealm ? sunMoonShadows.dark : sunMoonShadows.light,
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.95, 1, 0.95],
          rotate: isDarkRealm ? [0, 5, 0] : [0, 360],
        }}
        transition={{
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: isDarkRealm ? 120 : 300,
            repeat: Infinity,
            ease: isDarkRealm ? 'easeInOut' : 'linear',
          },
        }}
      />

      {/* Enhanced Stars with Aurora Effect (Night) */}
      {isDarkRealm && (
        <>
          {/* Aurora Borealis Effect */}
          <motion.div
            className="fixed inset-0"
            style={{
              zIndex: -19,
              background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 127, 0.1) 50%, rgba(138, 43, 226, 0.1) 70%, transparent 90%)',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              transform: ['translateY(0px) rotate(0deg)', 'translateY(-20px) rotate(2deg)', 'translateY(0px) rotate(0deg)'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Enhanced Star Field */}
          <div className="fixed inset-0" style={{ zIndex: -17 }}>
            {[...Array(300)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `clamp(1px, ${Math.random() * 0.6 + 0.3}vw, 6px)`,
                  height: `clamp(1px, ${Math.random() * 0.6 + 0.3}vw, 6px)`,
                  background: `hsl(${200 + Math.random() * 80}, 100%, ${85 + Math.random() * 15}%)`,
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 70 + '%',
                  boxShadow: `0 0 clamp(8px, 1.5vw, 20px) rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`,
                }}
                animate={{
                  opacity: [0.4 + Math.random() * 0.4, 1, 0.4 + Math.random() * 0.4],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 8,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Enhanced Seagulls (Day) */}
      {!isDarkRealm && showBirds && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 60 + 5 + '%',
                top: Math.random() * 35 + 10 + '%',
                fontSize: 'clamp(16px, 3.5vw, 40px)',
                color: 'rgba(0, 0, 0, 0.8)',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                transform: `scaleX(${Math.random() > 0.5 ? 1 : -1})`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                x: [0, 400 + Math.random() * 500, 800 + Math.random() * 600],
                y: [0, -80 + Math.random() * 160, -60 + Math.random() * 120],
                opacity: [0, 1, 1, 0],
                rotate: [0, Math.random() * 15 - 7.5, Math.random() * 12 - 6],
              }}
              transition={{
                duration: 40 + Math.random() * 30,
                repeat: Infinity,
                delay: Math.random() * 20,
                ease: 'linear',
              }}
            >
              <svg
                width="clamp(16px, 3.5vw, 40px)"
                height="clamp(12px, 2.5vw, 30px)"
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

      {/* Enhanced Ocean with Multiple Wave Layers */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -15,
          height: 'clamp(30vh, 35vh, 40vh)',
          background: isDarkRealm ? oceanGradients.dark : oceanGradients.light,
        }}
        animate={{
          opacity: [0.98, 1, 0.98],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Wave Layer 1 - Large waves */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: 'clamp(25vh, 32vh, 38vh)',
          background: isDarkRealm 
            ? `repeating-linear-gradient(90deg,
                transparent,
                transparent 40px,
                rgba(70, 120, 180, 0.6) 40px,
                rgba(70, 120, 180, 0.6) 120px,
                transparent 120px,
                transparent 200px
              )`
            : `repeating-linear-gradient(90deg,
                transparent,
                transparent 50px,
                rgba(0, 180, 240, 0.4) 50px,
                rgba(0, 180, 240, 0.4) 150px,
                transparent 150px,
                transparent 250px
              )`,
        }}
        animate={waveAnimations.wave1.animate}
        transition={waveAnimations.wave1.transition}
      />

      {/* Wave Layer 2 - Medium waves */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(20vh, 28vh, 35vh)',
          background: isDarkRealm 
            ? `repeating-linear-gradient(45deg,
                transparent,
                transparent 25px,
                rgba(90, 140, 200, 0.5) 25px,
                rgba(90, 140, 200, 0.5) 75px,
                transparent 75px,
                transparent 150px
              )`
            : `repeating-linear-gradient(45deg,
                transparent,
                transparent 30px,
                rgba(30, 190, 250, 0.35) 30px,
                rgba(30, 190, 250, 0.35) 90px,
                transparent 90px,
                transparent 180px
              )`,
        }}
        animate={waveAnimations.wave2.animate}
        transition={waveAnimations.wave2.transition}
      />

      {/* Wave Layer 3 - Small ripples */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -12,
          height: 'clamp(15vh, 25vh, 32vh)',
          background: isDarkRealm 
            ? `repeating-linear-gradient(135deg,
                transparent,
                transparent 15px,
                rgba(110, 160, 220, 0.4) 15px,
                rgba(110, 160, 220, 0.4) 45px,
                transparent 45px,
                transparent 90px
              )`
            : `repeating-linear-gradient(135deg,
                transparent,
                transparent 20px,
                rgba(60, 200, 255, 0.3) 20px,
                rgba(60, 200, 255, 0.3) 60px,
                transparent 60px,
                transparent 120px
              )`,
        }}
        animate={waveAnimations.wave3.animate}
        transition={waveAnimations.wave3.transition}
      />

      {/* Enhanced Beach Sand */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -11,
          height: 'clamp(20vh, 28vh, 35vh)',
          background: isDarkRealm 
            ? `linear-gradient(to top,
                rgba(35, 45, 60, 1) 0%,
                rgba(55, 70, 90, 0.95) 20%,
                rgba(80, 95, 120, 0.9) 40%,
                rgba(110, 125, 150, 0.8) 60%,
                rgba(140, 155, 180, 0.6) 80%,
                transparent 100%
              )`
            : `linear-gradient(to top,
                rgba(184, 158, 108, 1) 0%,
                rgba(208, 185, 138, 0.95) 20%,
                rgba(227, 210, 168, 0.9) 40%,
                rgba(242, 228, 188, 0.8) 60%,
                rgba(255, 245, 208, 0.6) 80%,
                transparent 100%
              )`,
        }}
        animate={{
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Foam/Wave Crests */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(30vh, 35vh, 40vh)', zIndex: -10 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`foam-${i}`}
            className="absolute"
            style={{
              width: `clamp(40px, ${8 + Math.random() * 6}vw, 120px)`,
              height: `clamp(3px, 0.8vw, 8px)`,
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '50px',
              left: `${Math.random() * 90}%`,
              top: `${60 + Math.random() * 20}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              x: [0, -100 - Math.random() * 100],
              opacity: [0, 1, 0],
              scaleX: [1, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;