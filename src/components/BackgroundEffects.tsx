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

  const backgroundGradients = useMemo(
    () => ({
      dark: 'linear-gradient(180deg, #01040f 0%, #0a1128 20%, #151b3d 40%, #2a345e 60%, #404b7a 80%, #151b3d 100%)',
      light: 'linear-gradient(180deg, #ff8c00 0%, #ff6f00 25%, #ff4f00 50%, #ff2a00 75%, #ff0000 100%)',
    }),
    []
  );

  const atmosphericHazeGradients = useMemo(
    () => ({
      dark: 'radial-gradient(ellipse at center top, rgba(70, 100, 150, 0.25), rgba(90, 130, 180, 0.18), transparent 75%)',
      light: 'radial-gradient(ellipse at center top, rgba(255, 165, 0, 0.4), rgba(255, 140, 0, 0.3), transparent 85%)',
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
          transparent clamp(15px, 3vw, 50px),
          rgba(80, 130, 200, 0.35) clamp(15px, 3vw, 50px),
          rgba(80, 130, 200, 0.35) clamp(35px, 7vw, 100px)
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
        radial-gradient(circle at 25% 30%, rgba(190, 205, 225, 0.5) 1.2px, transparent 1.2px),
        radial-gradient(circle at 75% 70%, rgba(150, 165, 190, 0.4) 1.2px, transparent 1.2px),
        radial-gradient(circle at 50% 50%, rgba(170, 185, 205, 0.45) 1.2px, transparent 1.2px),
        radial-gradient(circle at 30% 80%, rgba(160, 175, 195, 0.35) 1.2px, transparent 1.2px),
        radial-gradient(circle at 80% 20%, rgba(190, 205, 225, 0.4) 1.2px, transparent 1.2px)
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
      dark: 'linear-gradient(90deg, transparent 0%, rgba(220, 230, 240, 0.95) 15%, rgba(240, 245, 250, 1) 35%, rgba(255, 255, 255, 1) 50%, rgba(240, 245, 250, 1) 65%, rgba(220, 230, 240, 0.95) 85%, transparent 100%)',
      light: 'linear-gradient(90deg, transparent 0%, rgba(255, 250, 240, 0.98) 15%, rgba(255, 235, 200, 0.95) 35%, rgba(255, 255, 255, 1) 50%, rgba(255, 235, 200, 0.95) 65%, rgba(255, 250, 240, 0.98) 85%, transparent 100%)',
    }),
    []
  );

  const duneGradients = useMemo(
    () => ({
      dark: `linear-gradient(to top, rgba(45, 55, 70, 0.95) 0%, rgba(60, 75, 95, 0.9) 50%, transparent 100%)`,
      light: `linear-gradient(to top, rgba(140, 70, 0, 0.95) 0%, rgba(180, 110, 20, 0.9) 50%, transparent 100%)`,
    }),
    []
  );

  useEffect(() => {
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1200);
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
      }, 200);

      setPrevMode(isDarkRealm);
      return () => clearTimeout(timer);
    } else if (!isDarkRealm && !modeTransitioning && !showBirds) {
      setShowBirds(true);
    }
  }, [isDarkRealm, prevMode, modeTransitioning]);

  return (
    <>
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -21 }}
        animate={{
          background: isDarkRealm ? backgroundGradients.dark : backgroundGradients.light,
        }}
        transition={{ duration: 3.5, ease: 'easeInOut' }}
      />

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
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {showLightning && (
        <>
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={`lightning-main-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0] }}
              transition={{
                duration: 0.05 + Math.random() * 0.08,
                delay: Math.random() * 0.3,
                ease: 'linear',
              }}
              style={{
                background: `radial-gradient(at ${Math.random() * 100}% ${Math.random() * 40}%, rgba(255, 255, 255, 0.95) 5%, transparent 15%),
                           radial-gradient(at ${Math.random() * 100}% ${Math.random() * 40}%, rgba(255, 255, 255, 0.8) 5%, transparent 15%)`,
                mixBlendMode: 'screen',
                zIndex: -3,
                pointerEvents: 'none',
              }}
            />
          ))}
          {[...Array(2)].map((_, index) => (
            <motion.div
              key={`lightning-secondary-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7 + Math.random() * 0.2, 0] }}
              transition={{
                duration: 0.08 + Math.random() * 0.1,
                delay: 0.1 + Math.random() * 0.4,
                ease: 'linear',
              }}
              style={{
                background: `radial-gradient(at ${Math.random() * 100}% ${Math.random() * 60}%, rgba(190, 225, 240, 0.75) 8%, transparent 20%)`,
                mixBlendMode: 'screen',
                zIndex: -3,
                pointerEvents: 'none',
              }}
            />
          ))}
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              zIndex: -2,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      <motion.div
        className="fixed"
        style={{
          zIndex: -18,
          width: 'clamp(70px, 12vw, 150px)',
          height: 'clamp(70px, 12vw, 150px)',
          borderRadius: '50%',
          background: isDarkRealm ? sunMoonGradients.dark : sunMoonGradients.light,
          top: 'clamp(10vh, 14vh, 18vh)',
          right: 'clamp(14vw, 18vw, 22vw)',
          filter: isDarkRealm ? 'blur(0.6px)' : 'blur(0.3px)',
          boxShadow: isDarkRealm ? sunMoonShadows.dark : sunMoonShadows.light,
        }}
        animate={{
          scale: [1, 1.07, 1],
          opacity: [0.9, 1, 0.9],
          rotate: isDarkRealm ? [0, 5, 0] : [0, 360],
        }}
        transition={{
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: isDarkRealm ? 60 : 200,
            repeat: Infinity,
            ease: isDarkRealm ? 'easeInOut' : 'linear',
          },
        }}
      />

      <motion.div
        className="fixed"
        style={{
          zIndex: -19,
          width: 'clamp(100px, 18vw, 220px)',
          height: 'clamp(100px, 18vw, 220px)',
          borderRadius: '50%',
          background: isDarkRealm ? sunMoonHaloGradients.dark : sunMoonHaloGradients.light,
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

      {!isDarkRealm && showBirds && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`bird-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 70 + 5 + '%',
                top: Math.random() * 40 + 15 + '%',
                width: 'clamp(24px, 4vw, 48px)',
                height: 'clamp(12px, 2vw, 24px)',
                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
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
              <motion.svg
                viewBox="0 0 100 40"
                fill="currentColor"
                className={isDarkRealm ? 'text-gray-700' : 'text-black/70'}
              >
                <motion.path
                  d="M 10,20 Q 25,10 35,20 Q 45,30 55,20 Q 65,10 80,20 Q 65,25 55,20 Q 45,15 35,20 Q 25,25 10,20"
                  animate={{
                    d: [
                      "M 10,20 Q 25,10 35,20 Q 45,30 55,20 Q 65,10 80,20 Q 65,25 55,20 Q 45,15 35,20 Q 25,25 10,20",
                      "M 10,20 Q 25,15 35,20 Q 45,25 55,20 Q 65,15 80,20 Q 65,20 55,20 Q 45,20 35,20 Q 25,20 10,20",
                      "M 10,20 Q 25,10 35,20 Q 45,30 55,20 Q 65,10 80,20 Q 65,25 55,20 Q 45,15 35,20 Q 25,25 10,20"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.svg>
            </motion.div>
          ))}
        </div>
      )}

      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(120)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${Math.random() * 0.3 + 0.15}vw, 4px)`,
                height: `clamp(1px, ${Math.random() * 0.3 + 0.15}vw, 4px)`,
                background: `hsl(${220 + Math.random() * 40}, 100%, ${90 + Math.random() * 10}%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 70 + '%',
                boxShadow: '0 0 clamp(4px, 0.9vw, 10px) rgba(255, 255, 255, 0.9)',
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: 'easeInOut',
              }}
            />
          ))}

          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 'clamp(2px, 0.4vw, 5px)',
                height: 'clamp(2px, 0.4vw, 5px)',
                background: 'white',
                left: '-10%',
                top: `${10 + i * 25}%`,
                boxShadow: '0 0 clamp(15px, 3vw, 30px) #ffffff, 2px 0 clamp(25px, 4.5vw, 50px) rgba(255, 255, 255, 0.8)',
              }}
              animate={{
                x: ['-10%', '110%'],
                y: [`${10 + i * 25}%`, `${35 + i * 25}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 15 + Math.random() * 10,
                delay: i * 7,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16,
          height: 'clamp(1.2px, 0.25vw, 3.5px)',
          background: isDarkRealm ? horizonLineGradients.dark : horizonLineGradients.light,
          top: `calc(100% - clamp(25vh, 32vh, 35vh))`,
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
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: 'clamp(20vh, 28vh, 32vh)',
          background: isDarkRealm ? waterWaveGradients1.dark : waterWaveGradients1.light,
          backgroundSize: '100% 100%',
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

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(15vh, 22vh, 28vh)',
          background: isDarkRealm ? waterWaveGradients2.dark : waterWaveGradients2.light,
          backgroundSize: '100% 100%',
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

      <motion.div
        className="fixed"
        style={{
          zIndex: -12,
          width: 'clamp(40px, 8vw, 80px)',
          height: 'clamp(120px, 25vh, 250px)',
          background: isDarkRealm ? reflectionGradients.dark : reflectionGradients.light,
          right: 'clamp(16vw, 21vw, 26vw)',
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

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -11,
          height: 'clamp(18vh, 25vh, 30vh)',
          background: isDarkRealm ? beachSandGradients.dark : beachSandGradients.light,
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -10,
          height: 'clamp(16vh, 23vh, 28vh)',
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

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9,
          height: 'clamp(2px, 0.5vw, 4.5px)',
          background: isDarkRealm ? wetSandEdgeGradients.dark : wetSandEdgeGradients.light,
          top: `calc(100% - clamp(18vh, 25vh, 30vh))`,
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

      <div className="fixed bottom-0 left-0  right-0" style={{ height: 'clamp(15vh, 20vh, 25vh)', zIndex: -8 }}>
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
            left: `${i * 20 + (Math.random() * 8 - 4)}vw`,
            transform: `translateX(-50%)`,
            bottom: `clamp(16vh, 23vh, 28vh)`,
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