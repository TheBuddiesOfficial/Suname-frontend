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

  // Much darker, more realistic gradients
  const backgroundGradients = useMemo(
    () => ({
      dark: 'linear-gradient(180deg, #000510 0%, #001122 15%, #001a33 25%, #002244 35%, #003366 45%, #002244 60%, #001122 80%, #000510 100%)',
      light: 'linear-gradient(180deg, #ff8c00 0%, #ff6f00 25%, #ff4f00 50%, #ff2a00 75%, #ff0000 100%)',
    }),
    []
  );

  const atmosphericHazeGradients = useMemo(
    () => ({
      dark: 'radial-gradient(ellipse at center top, rgba(30, 50, 80, 0.4), rgba(20, 40, 70, 0.3), rgba(10, 20, 40, 0.2), transparent 85%)',
      light: 'radial-gradient(ellipse at center top, rgba(255, 165, 0, 0.4), rgba(255, 140, 0, 0.3), transparent 85%)',
    }),
    []
  );

  const sunMoonGradients = useMemo(
    () => ({
      dark: 'radial-gradient(circle at 30% 30%, #c0d0e0 5%, #a0b5d0 25%, #8090b0 50%, #607090 75%, #405070 100%)',
      light: 'radial-gradient(circle at 35% 35%, #fffbe6 0%, #fff0b3 20%, #ffd700 60%, #ffa500 100%)',
    }),
    []
  );

  const sunMoonShadows = useMemo(
    () => ({
      dark: '0 0 clamp(20px, 4vw, 40px) rgba(160, 180, 200, 0.3), inset -5px -5px 12px rgba(100, 120, 150, 0.4)',
      light: '0 0 clamp(70px, 14vw, 180px) rgba(255, 215, 0, 0.9), 0 0 clamp(120px, 20vw, 300px) rgba(255, 165, 0, 0.6), inset -5px -5px 12px rgba(255, 165, 0, 0.4)',
    }),
    []
  );

  const sunMoonHaloGradients = useMemo(
    () => ({
      dark: 'radial-gradient(circle, transparent 45%, rgba(120, 140, 170, 0.08) 55%, transparent 85%)',
      light: 'radial-gradient(circle, transparent 30%, rgba(255, 140, 0, 0.35) 45%, rgba(255, 165, 0, 0.25) 70%, transparent 90%)',
    }),
    []
  );

  const horizonLineGradients = useMemo(
    () => ({
      dark: 'linear-gradient(90deg, transparent 0%, rgba(80, 100, 120, 0.6) 20%, rgba(100, 120, 140, 0.8) 50%, rgba(80, 100, 120, 0.6) 80%, transparent 100%)',
      light: 'linear-gradient(90deg, transparent 0%, rgba(255, 250, 245, 0.95) 20%, rgba(255, 240, 220, 1) 50%, rgba(255, 250, 245, 0.95) 80%, transparent 100%)',
    }),
    []
  );

  const oceanGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to top,
          rgba(5, 15, 25, 0.98) 0%,
          rgba(10, 25, 40, 0.95) 15%,
          rgba(15, 35, 55, 0.9) 30%,
          rgba(20, 45, 70, 0.85) 45%,
          rgba(25, 55, 85, 0.8) 60%,
          rgba(30, 65, 100, 0.7) 75%,
          rgba(40, 80, 120, 0.5) 90%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to top,
          rgba(200, 70, 10, 0.9) 0%,
          rgba(220, 100, 20, 0.8) 25%,
          rgba(240, 140, 50, 0.7) 50%,
          rgba(255, 180, 80, 0.6) 75%,
          rgba(255, 220, 110, 0.4) 90%,
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
          transparent clamp(40px, 8vw, 100px),
          rgba(25, 45, 70, 0.6) clamp(40px, 8vw, 100px),
          rgba(25, 45, 70, 0.6) clamp(80px, 16vw, 200px),
          transparent clamp(80px, 16vw, 200px),
          transparent clamp(120px, 24vw, 300px)
        )
      `,
      light: `
        repeating-linear-gradient(90deg,
          transparent,
          transparent clamp(40px, 8vw, 100px),
          rgba(255, 100, 30, 0.35) clamp(40px, 8vw, 100px),
          rgba(255, 100, 30, 0.35) clamp(80px, 16vw, 200px)
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
          transparent clamp(20px, 4vw, 60px),
          rgba(35, 60, 90, 0.4) clamp(20px, 4vw, 60px),
          rgba(35, 60, 90, 0.4) clamp(45px, 9vw, 120px)
        )
      `,
      light: `
        repeating-linear-gradient(45deg,
          transparent,
          transparent clamp(20px, 4vw, 60px),
          rgba(255, 150, 60, 0.3) clamp(20px, 4vw, 60px),
          rgba(255, 150, 60, 0.3) clamp(40px, 8vw, 120px)
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
          rgba(120, 140, 170, 0.3) 15%,
          rgba(100, 120, 150, 0.4) 35%,
          rgba(80, 100, 130, 0.35) 55%,
          rgba(60, 80, 110, 0.3) 75%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to bottom,
          transparent 0%,
          rgba(255, 150, 60, 0.65) 20%,
          rgba(255, 170, 80, 0.55) 50%,
          rgba(255, 200, 100, 0.45) 80%,
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
          rgba(20, 25, 35, 0.98) 0%,
          rgba(30, 40, 50, 0.95) 20%,
          rgba(45, 55, 70, 0.9) 40%,
          rgba(60, 70, 85, 0.8) 60%,
          rgba(80, 90, 105, 0.65) 80%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to top,
          rgba(160, 80, 0, 1) 0%,
          rgba(190, 110, 30, 0.92) 15%,
          rgba(220, 140, 70, 0.84) 30%,
          rgba(250, 170, 100, 0.72) 50%,
          rgba(255, 200, 140, 0.6) 70%,
          rgba(255, 230, 190, 0.45) 85%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const sandTextureGradients = useMemo(
    () => ({
      dark: `
        radial-gradient(circle at 25% 30%, rgba(80, 90, 105, 0.3) 1px, transparent 1px),
        radial-gradient(circle at 75% 70%, rgba(60, 70, 85, 0.25) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(70, 80, 95, 0.28) 1px, transparent 1px),
        radial-gradient(circle at 30% 80%, rgba(65, 75, 90, 0.22) 1px, transparent 1px),
        radial-gradient(circle at 80% 20%, rgba(75, 85, 100, 0.26) 1px, transparent 1px)
      `,
      light: `
        radial-gradient(circle at 25% 30%, rgba(220, 140, 70, 0.6) 1.2px, transparent 1.2px),
        radial-gradient(circle at 75% 70%, rgba(250, 170, 100, 0.5) 1.2px, transparent 1.2px),
        radial-gradient(circle at 50% 50%, rgba(255, 200, 140, 0.55) 1.2px, transparent 1.2px),
        radial-gradient(circle at 30% 80%, rgba(255, 210, 160, 0.5) 1.2px, transparent 1.2px),
        radial-gradient(circle at 80% 20%, rgba(255, 230, 190, 0.45) 1.2px, transparent 1.2px)
      `,
    }),
    []
  );

  const wetSandEdgeGradients = useMemo(
    () => ({
      dark: 'linear-gradient(90deg, transparent 0%, rgba(100, 120, 140, 0.7) 15%, rgba(120, 140, 160, 0.85) 35%, rgba(140, 160, 180, 0.9) 50%, rgba(120, 140, 160, 0.85) 65%, rgba(100, 120, 140, 0.7) 85%, transparent 100%)',
      light: 'linear-gradient(90deg, transparent 0%, rgba(255, 250, 240, 0.98) 15%, rgba(255, 235, 200, 0.95) 35%, rgba(255, 255, 255, 1) 50%, rgba(255, 235, 200, 0.95) 65%, rgba(255, 250, 240, 0.98) 85%, transparent 100%)',
    }),
    []
  );

  const duneGradients = useMemo(
    () => ({
      dark: `linear-gradient(to top, rgba(25, 35, 45, 0.95) 0%, rgba(35, 45, 60, 0.9) 50%, transparent 100%)`,
      light: `linear-gradient(to top, rgba(140, 70, 0, 0.95) 0%, rgba(180, 110, 20, 0.9) 50%, transparent 100%)`,
    }),
    []
  );

  // Storm clouds for dark mode
  const stormCloudGradients = useMemo(
    () => ({
      dark: `
        radial-gradient(ellipse at 20% 30%, rgba(15, 25, 40, 0.8) 20%, transparent 60%),
        radial-gradient(ellipse at 80% 25%, rgba(10, 20, 35, 0.7) 25%, transparent 65%),
        radial-gradient(ellipse at 50% 20%, rgba(20, 30, 45, 0.6) 30%, transparent 70%),
        radial-gradient(ellipse at 30% 15%, rgba(25, 35, 50, 0.5) 35%, transparent 75%)
      `,
    }),
    []
  );

  useEffect(() => {
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  useEffect(() => {
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
      {/* Background Gradient - Much darker and more realistic */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -21 }}
        animate={{
          background: isDarkRealm ? backgroundGradients.dark : backgroundGradients.light,
        }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      />

      {/* Storm Clouds - Dark mode only */}
      {isDarkRealm && (
        <motion.div
          className="fixed inset-0"
          style={{
            zIndex: -20,
            background: stormCloudGradients.dark,
            backgroundSize: '200% 100%, 180% 120%, 220% 110%, 190% 130%',
          }}
          animate={{
            backgroundPosition: ['0% 0%, 100% 0%, 50% 0%, 25% 0%', '20% 5%, 80% 10%, 70% 5%, 45% 8%', '0% 0%, 100% 0%, 50% 0%, 25% 0%'],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Atmospheric Haze - Reduced for dark mode */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -19,
          background: isDarkRealm ? atmosphericHazeGradients.dark : atmosphericHazeGradients.light,
        }}
        animate={{
          opacity: isDarkRealm ? [0.3, 0.5, 0.3] : [0.6, 0.95, 0.6],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Enhanced Lightning Effect for dark mode */}
      {showLightning && (
        <>
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={`lightning-main-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{
                duration: 0.03 + Math.random() * 0.05,
                delay: Math.random() * 0.4,
                ease: 'linear',
              }}
              style={{
                background: `
                  radial-gradient(at ${Math.random() * 100}% ${Math.random() * 30}%, rgba(200, 220, 255, 0.9) 3%, transparent 12%),
                  radial-gradient(at ${Math.random() * 100}% ${Math.random() * 30}%, rgba(180, 200, 240, 0.7) 4%, transparent 15%),
                  linear-gradient(${Math.random() * 360}deg, rgba(255, 255, 255, 0.6) 1px, transparent 3px)
                `,
                mixBlendMode: 'screen',
                zIndex: -2,
                pointerEvents: 'none',
              }}
            />
          ))}
          
          {/* Thunder rumble effect */}
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: -1,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Moon - Much more subdued */}
      {isDarkRealm && (
        <>
          <motion.div
            className="fixed"
            style={{
              zIndex: -18,
              width: 'clamp(50px, 8vw, 100px)',
              height: 'clamp(50px, 8vw, 100px)',
              borderRadius: '50%',
              background: sunMoonGradients.dark,
              top: 'clamp(12vh, 16vh, 20vh)',
              right: 'clamp(16vw, 20vw, 24vw)',
              filter: 'blur(1px)',
              boxShadow: sunMoonShadows.dark,
              opacity: 0.6,
            }}
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.5, 0.7, 0.5],
              rotate: [0, 2, 0],
            }}
            transition={{
              scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 80, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          <motion.div
            className="fixed"
            style={{
              zIndex: -19,
              width: 'clamp(80px, 14vw, 140px)',
              height: 'clamp(80px, 14vw, 140px)',
              borderRadius: '50%',
              background: sunMoonHaloGradients.dark,
              top: 'clamp(10vh, 14vh, 18vh)',
              right: 'clamp(13vw, 17vw, 21vw)',
              opacity: 0.4,
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      {/* Sun - Light mode only */}
      {!isDarkRealm && (
        <>
          <motion.div
            className="fixed"
            style={{
              zIndex: -18,
              width: 'clamp(70px, 12vw, 150px)',
              height: 'clamp(70px, 12vw, 150px)',
              borderRadius: '50%',
              background: sunMoonGradients.light,
              top: 'clamp(10vh, 14vh, 18vh)',
              right: 'clamp(14vw, 18vw, 22vw)',
              filter: 'blur(0.3px)',
              boxShadow: sunMoonShadows.light,
            }}
            animate={{
              scale: [1, 1.07, 1],
              opacity: [0.9, 1, 0.9],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 200, repeat: Infinity, ease: 'linear' },
            }}
          />

          <motion.div
            className="fixed"
            style={{
              zIndex: -19,
              width: 'clamp(100px, 18vw, 220px)',
              height: 'clamp(100px, 18vw, 220px)',
              borderRadius: '50%',
              background: sunMoonHaloGradients.light,
              top: 'clamp(8vh, 12vh, 16vh)',
              right: 'clamp(11vw, 15vw, 19vw)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      {/* Seagulls (Day only) */}
      {!isDarkRealm && showBirds && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 70 + 5 + '%',
                top: Math.random() * 40 + 15 + '%',
                fontSize: 'clamp(12px, 2.5vw, 30px)',
                color: 'rgba(0, 0, 0, 0.7)',
                filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))',
                transform: `scaleX(${Math.random() > 0.5 ? 1 : -1})`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                x: [0, 200 + Math.random() * 300, 400 + Math.random() * 400],
                y: [0, -40 + Math.random() * 80, -30 + Math.random() * 60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 12,
                ease: 'linear',
              }}
            >
              <svg
                width="clamp(12px, 2.5vw, 30px)"
                height="clamp(8px, 1.5vw, 20px)"
                viewBox="0 0 100 60"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 30 C 20 0, 40 0, 50 30 C 60 0, 80 0, 100 30 C 80 45, 60 45, 50 30 C 40 45, 20 45, 0 30 Z" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stars (Night only) - Fewer and dimmer */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${Math.random() * 0.2 + 0.1}vw, 2px)`,
                height: `clamp(1px, ${Math.random() * 0.2 + 0.1}vw, 2px)`,
                background: `hsl(${210 + Math.random() * 30}, 60%, ${70 + Math.random() * 15}%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 50 + '%',
                boxShadow: '0 0 clamp(2px, 0.5vw, 5px) rgba(200, 220, 240, 0.4)',
                opacity: 0.6,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Fewer shooting stars */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 'clamp(1px, 0.2vw, 3px)',
                height: 'clamp(1px, 0.2vw, 3px)',
                background: 'rgba(255, 255, 255, 0.8)',
                left: '-10%',
                top: `${15 + i * 35}%`,
                boxShadow: '0 0 clamp(8px, 1.5vw, 15px) rgba(255, 255, 255, 0.6), 1px 0 clamp(15px, 2.5vw, 25px) rgba(255, 255, 255, 0.4)',
              }}
              animate={{
                x: ['-10%', '110%'],
                y: [`${15 + i * 35}%`, `${30 + i * 35}%`],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 20 + Math.random() * 15,
                delay: i * 10,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Horizon Line - More subdued for dark mode */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16,
          height: 'clamp(1px, 0.2vw, 2px)',
          background: isDarkRealm ? horizonLineGradients.dark : horizonLineGradients.light,
          top: `calc(100% - clamp(25vh, 32vh, 35vh))`,
          filter: 'blur(clamp(0.5px, 0.15vw, 1.5px))',
          opacity: isDarkRealm ? 0.6 : 1,
        }}
        animate={{
          opacity: isDarkRealm ? [0.4, 0.7, 0.4] : [0.7, 1, 0.7],
          scaleX: [1, 1.03, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Ocean - Much darker and more ominous */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -15,
          height: 'clamp(25vh, 32vh, 35vh)',
          background: isDarkRealm ? oceanGradients.dark : oceanGradients.light,
        }}
        animate={{
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Water wave patterns - More dramatic for dark mode */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: 'clamp(20vh, 28vh, 32vh)',
          background: isDarkRealm ? waterWaveGradients1.dark : waterWaveGradients1.light,
          backgroundSize: '100% 100%',
        }}
        animate={{
          x: [0, -300, 0],
          opacity: isDarkRealm ? [0.7, 0.9, 0.7] : [0.8, 1, 0.8],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(15vh, 22vh, 28vh)',
          background: isDarkRealm ? waterWaveGradients2.dark : waterWaveGradients2.