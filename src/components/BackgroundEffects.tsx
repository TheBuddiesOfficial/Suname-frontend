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

  // Professional, realistic gradients
  const backgroundGradients = useMemo(
    () => ({
      dark: 'linear-gradient(180deg, #000000 0%, #0a0a0f 10%, #0f0f1a 20%, #141428 30%, #1a1a35 40%, #202040 50%, #1a1a35 60%, #141428 70%, #0f0f1a 80%, #0a0a0f 90%, #000000 100%)',
      light: 'linear-gradient(180deg, #87ceeb 0%, #b4d4f1 20%, #e6f3ff 40%, #fff8dc 60%, #ffe4b5 80%, #ffd700 100%)',
    }),
    []
  );

  const atmosphericHazeGradients = useMemo(
    () => ({
      dark: 'radial-gradient(ellipse at center top, rgba(15, 25, 40, 0.6), rgba(10, 20, 35, 0.4), rgba(5, 15, 30, 0.2), transparent 70%)',
      light: 'radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.4), rgba(255, 248, 220, 0.3), transparent 70%)',
    }),
    []
  );

  const sunMoonGradients = useMemo(
    () => ({
      dark: 'radial-gradient(circle at 35% 35%, #d6e5f5 0%, #b8d0e8 30%, #9abbd8 60%, #7ca6c8 80%, #5e91b8 100%)',
      light: 'radial-gradient(circle at 35% 35%, #fffef7 0%, #fff9e6 20%, #ffeb3b 50%, #ffc107 80%, #ff9800 100%)',
    }),
    []
  );

  const sunMoonShadows = useMemo(
    () => ({
      dark: '0 0 20px rgba(214, 229, 245, 0.3), inset -3px -3px 8px rgba(158, 187, 216, 0.2)',
      light: '0 0 60px rgba(255, 235, 59, 0.8), 0 0 120px rgba(255, 193, 7, 0.5)',
    }),
    []
  );

  const sunMoonHaloGradients = useMemo(
    () => ({
      dark: 'radial-gradient(circle, transparent 50%, rgba(100, 120, 150, 0.08) 60%, transparent 90%)',
      light: 'radial-gradient(circle, transparent 35%, rgba(255, 235, 59, 0.3) 50%, rgba(255, 193, 7, 0.2) 75%, transparent 95%)',
    }),
    []
  );

  const horizonLineGradients = useMemo(
    () => ({
      dark: 'linear-gradient(90deg, transparent 0%, rgba(40, 60, 80, 0.8) 20%, rgba(60, 80, 100, 1) 50%, rgba(40, 60, 80, 0.8) 80%, transparent 100%)',
      light: 'linear-gradient(90deg, transparent 0%, rgba(255, 248, 220, 0.9) 20%, rgba(255, 235, 205, 1) 50%, rgba(255, 248, 220, 0.9) 80%, transparent 100%)',
    }),
    []
  );

  const oceanGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to top,
          #000508 0%,
          #0a1520 15%,
          #142435 30%,
          #1e3348 45%,
          #28425c 60%,
          #325170 75%,
          #3c6084 90%,
          rgba(60, 96, 132, 0.8) 100%
        )
      `,
      light: `
        linear-gradient(to top,
          #006994 0%,
          #1e88e5 25%,
          #42a5f5 50%,
          #64b5f6 75%,
          #90caf9 90%,
          rgba(144, 202, 249, 0.8) 100%
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
          transparent 60px,
          rgba(40, 60, 85, 0.4) 60px,
          rgba(40, 60, 85, 0.4) 120px,
          transparent 120px,
          transparent 180px
        )
      `,
      light: `
        repeating-linear-gradient(90deg,
          transparent,
          transparent 60px,
          rgba(255, 255, 255, 0.3) 60px,
          rgba(255, 255, 255, 0.3) 120px
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
          transparent 40px,
          rgba(50, 75, 100, 0.3) 40px,
          rgba(50, 75, 100, 0.3) 80px
        )
      `,
      light: `
        repeating-linear-gradient(45deg,
          transparent,
          transparent 40px,
          rgba(255, 255, 255, 0.25) 40px,
          rgba(255, 255, 255, 0.25) 80px
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
          rgba(60, 80, 110, 0.2) 20%,
          rgba(80, 100, 130, 0.3) 40%,
          rgba(100, 120, 150, 0.25) 60%,
          rgba(80, 100, 130, 0.2) 80%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to bottom,
          transparent 0%,
          rgba(255, 248, 220, 0.4) 25%,
          rgba(255, 235, 205, 0.5) 50%,
          rgba(255, 193, 7, 0.3) 75%,
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
          #0f1419 0%,
          #1a252e 20%,
          #253542 40%,
          #304556 60%,
          #3b556a 80%,
          rgba(59, 85, 106, 0.8) 100%
        )
      `,
      light: `
        linear-gradient(to top,
          #8d6e63 0%,
          #a1887f 20%,
          #bcaaa4 40%,
          #d7ccc8 60%,
          #efebe9 80%,
          rgba(239, 235, 233, 0.8) 100%
        )
      `,
    }),
    []
  );

  const sandTextureGradients = useMemo(
    () => ({
      dark: `
        radial-gradient(circle at 25% 30%, rgba(60, 80, 100, 0.2) 1px, transparent 1px),
        radial-gradient(circle at 75% 70%, rgba(50, 70, 90, 0.15) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(55, 75, 95, 0.18) 1px, transparent 1px)
      `,
      light: `
        radial-gradient(circle at 25% 30%, rgba(139, 110, 99, 0.3) 1px, transparent 1px),
        radial-gradient(circle at 75% 70%, rgba(161, 136, 127, 0.25) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(188, 170, 164, 0.2) 1px, transparent 1px)
      `,
    }),
    []
  );

  const wetSandEdgeGradients = useMemo(
    () => ({
      dark: 'linear-gradient(90deg, transparent 0%, rgba(70, 90, 110, 0.6) 20%, rgba(90, 110, 130, 0.8) 50%, rgba(70, 90, 110, 0.6) 80%, transparent 100%)',
      light: 'linear-gradient(90deg, transparent 0%, rgba(188, 170, 164, 0.8) 20%, rgba(215, 204, 200, 0.9) 50%, rgba(188, 170, 164, 0.8) 80%, transparent 100%)',
    }),
    []
  );

  const duneGradients = useMemo(
    () => ({
      dark: `linear-gradient(to top, rgba(20, 30, 40, 0.9) 0%, rgba(30, 45, 60, 0.8) 50%, transparent 100%)`,
      light: `linear-gradient(to top, rgba(141, 110, 99, 0.9) 0%, rgba(161, 136, 127, 0.8) 50%, transparent 100%)`,
    }),
    []
  );

  // Professional storm clouds for dark mode
  const stormCloudGradients = useMemo(
    () => ({
      dark: `
        radial-gradient(ellipse at 25% 30%, rgba(10, 15, 22, 0.9) 30%, transparent 70%),
        radial-gradient(ellipse at 75% 25%, rgba(8, 12, 18, 0.8) 35%, transparent 75%),
        radial-gradient(ellipse at 50% 20%, rgba(12, 18, 25, 0.7) 40%, transparent 80%),
        radial-gradient(ellipse at 30% 15%, rgba(15, 22, 30, 0.6) 25%, transparent 65%)
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
      {/* Professional Background Gradient */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -21 }}
        animate={{
          background: isDarkRealm ? backgroundGradients.dark : backgroundGradients.light,
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      {/* Professional Storm Clouds - Dark mode only */}
      {isDarkRealm && (
        <motion.div
          className="fixed inset-0"
          style={{
            zIndex: -20,
            background: stormCloudGradients.dark,
            backgroundSize: '150% 80%, 140% 90%, 160% 85%, 130% 95%',
          }}
          animate={{
            backgroundPosition: ['0% 0%, 100% 0%, 50% 0%, 25% 0%', '15% 3%, 85% 7%, 65% 3%, 40% 5%', '0% 0%, 100% 0%, 50% 0%, 25% 0%'],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Professional Atmospheric Haze */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -19,
          background: isDarkRealm ? atmosphericHazeGradients.dark : atmosphericHazeGradients.light,
        }}
        animate={{
          opacity: isDarkRealm ? [0.4, 0.6, 0.4] : [0.5, 0.8, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Professional Lightning Effect for dark mode */}
      {showLightning && isDarkRealm && (
        <>
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={`lightning-main-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0] }}
              transition={{
                duration: 0.05 + Math.random() * 0.03,
                delay: Math.random() * 0.3,
                ease: 'linear',
              }}
              style={{
                background: `
                  radial-gradient(at ${Math.random() * 100}% ${Math.random() * 30}%, rgba(180, 200, 255, 0.8) 2%, transparent 8%),
                  radial-gradient(at ${Math.random() * 100}% ${Math.random() * 30}%, rgba(160, 180, 240, 0.6) 3%, transparent 12%),
                  linear-gradient(${Math.random() * 360}deg, rgba(220, 230, 255, 0.7) 1px, transparent 2px)
                `,
                mixBlendMode: 'screen',
                zIndex: -2,
                pointerEvents: 'none',
              }}
            />
          ))}
        </>
      )}

      {/* Professional Moon - Dark mode */}
      {isDarkRealm && (
        <>
          <motion.div
            className="fixed"
            style={{
              zIndex: -18,
              width: 'clamp(60px, 10vw, 120px)',
              height: 'clamp(60px, 10vw, 120px)',
              borderRadius: '50%',
              background: sunMoonGradients.dark,
              top: 'clamp(8vh, 12vh, 16vh)',
              right: 'clamp(15vw, 20vw, 25vw)',
              boxShadow: sunMoonShadows.dark,
              opacity: 0.85,
            }}
            animate={{
              scale: [1, 1.01, 1],
              opacity: [0.8, 0.9, 0.8],
            }}
            transition={{
              scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          <motion.div
            className="fixed"
            style={{
              zIndex: -19,
              width: 'clamp(100px, 16vw, 180px)',
              height: 'clamp(100px, 16vw, 180px)',
              borderRadius: '50%',
              background: sunMoonHaloGradients.dark,
              top: 'clamp(6vh, 10vh, 14vh)',
              right: 'clamp(12vw, 17vw, 22vw)',
              opacity: 0.3,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.25, 0.35, 0.25],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      {/* Professional Sun - Light mode */}
      {!isDarkRealm && (
        <>
          <motion.div
            className="fixed"
            style={{
              zIndex: -18,
              width: 'clamp(80px, 14vw, 160px)',
              height: 'clamp(80px, 14vw, 160px)',
              borderRadius: '50%',
              background: sunMoonGradients.light,
              top: 'clamp(8vh, 12vh, 16vh)',
              right: 'clamp(15vw, 20vw, 25vw)',
              boxShadow: sunMoonShadows.light,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.95, 1, 0.95],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
            }}
          />

          <motion.div
            className="fixed"
            style={{
              zIndex: -19,
              width: 'clamp(120px, 20vw, 240px)',
              height: 'clamp(120px, 20vw, 240px)',
              borderRadius: '50%',
              background: sunMoonHaloGradients.light,
              top: 'clamp(6vh, 10vh, 14vh)',
              right: 'clamp(12vw, 17vw, 22vw)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.9, 0.7],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      {/* Professional Seagulls (Day only) */}
      {!isDarkRealm && showBirds && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 60 + 10 + '%',
                top: Math.random() * 30 + 20 + '%',
                fontSize: 'clamp(10px, 2vw, 24px)',
                color: 'rgba(60, 60, 60, 0.8)',
                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
                transform: `scaleX(${Math.random() > 0.5 ? 1 : -1})`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                x: [0, 150 + Math.random() * 200, 300 + Math.random() * 300],
                y: [0, -30 + Math.random() * 60, -20 + Math.random() * 40],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 15,
                ease: 'linear',
              }}
            >
              <svg
                width="clamp(10px, 2vw, 24px)"
                height="clamp(6px, 1.2vw, 16px)"
                viewBox="0 0 100 60"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 30 C 20 5, 35 5, 50 30 C 65 5, 80 5, 100 30 C 80 40, 65 40, 50 30 C 35 40, 20 40, 0 30 Z" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Professional Stars (Night only) */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${Math.random() * 0.15 + 0.05}vw, 2px)`,
                height: `clamp(1px, ${Math.random() * 0.15 + 0.05}vw, 2px)`,
                background: `hsl(${200 + Math.random() * 40}, 70%, ${80 + Math.random() * 20}%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 40 + '%',
                boxShadow: '0 0 clamp(1px, 0.3vw, 3px) rgba(200, 220, 255, 0.5)',
                opacity: 0.7,
              }}
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Professional Horizon Line */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16,
          height: 'clamp(1px, 0.15vw, 2px)',
          background: isDarkRealm ? horizonLineGradients.dark : horizonLineGradients.light,
          top: `calc(100% - clamp(30vh, 35vh, 40vh))`,
          filter: 'blur(clamp(0.3px, 0.1vw, 1px))',
          opacity: isDarkRealm ? 0.8 : 1,
        }}
        animate={{
          opacity: isDarkRealm ? [0.7, 0.9, 0.7] : [0.9, 1, 0.9],
          scaleX: [1, 1.02, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Professional Ocean */}
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
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Professional Water wave patterns */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: 'clamp(25vh, 30vh, 35vh)',
          background: isDarkRealm ? waterWaveGradients1.dark : waterWaveGradients1.light,
        }}
        animate={{
          x: [0, -200, 0],
          opacity: isDarkRealm ? [0.6, 0.8, 0.6] : [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(20vh, 25vh, 30vh)',
          background: isDarkRealm ? waterWaveGradients2.dark : waterWaveGradients2.light,
        }}
        animate={{
          x: [0, 200, 0],
          opacity: isDarkRealm ? [0.4, 0.6, 0.4] : [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Professional Reflection effect */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -12,
          height: 'clamp(15vh, 20vh, 25vh)',
          background: isDarkRealm ? reflectionGradients.dark : reflectionGradients.light,
          mixBlendMode: isDarkRealm ? 'soft-light' : 'overlay',
        }}
        animate={{
          opacity: isDarkRealm ? [0.3, 0.5, 0.3] : [0.4, 0.6, 0.4],
          scaleY: [1, 1.03, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Professional Beach Sand */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -10,
          height: 'clamp(12vh, 15vh, 18vh)',
          background: isDarkRealm ? beachSandGradients.dark : beachSandGradients.light,
        }}
        animate={{
          opacity: [1, 0.98, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Professional Sand Texture */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9,
          height: 'clamp(12vh, 15vh, 18vh)',
          background: isDarkRealm ? sandTextureGradients.dark : sandTextureGradients.light,
          backgroundSize: 'clamp(40px, 8vw, 100px) clamp(40px, 8vw, 100px)',
          opacity: isDarkRealm ? 0.3 : 0.6,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '3% 3%', '0% 0%'],
          opacity: isDarkRealm ? [0.25, 0.35, 0.25] : [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Professional Wet Sand Edge */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -11,
          height: 'clamp(2vh, 3vh, 4vh)',
          background: isDarkRealm ? wetSandEdgeGradients.dark : wetSandEdgeGradients.light,
          top: `calc(100% - clamp(16vh, 20vh, 24vh))`,
          filter: 'blur(clamp(0.3px, 0.08vw, 0.8px))',
          opacity: isDarkRealm ? 0.6 : 0.9,
        }}
        animate={{
          opacity: isDarkRealm ? [0.5, 0.7, 0.5] : [0.8, 1, 0.8],
          scaleX: [1, 1.005, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Professional Dunes/Hills */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -8,
          height: 'clamp(10vh, 12vh, 15vh)',
          background: isDarkRealm ? duneGradients.dark : duneGradients.light,
          top: `calc(100% - clamp(28vh, 32vh, 36vh))`,
          maskImage: `
            radial-gradient(ellipse at 20% 100%, black 45%, transparent 45%),
            radial-gradient(ellipse at 50% 100%, black 45%, transparent 45%),
            radial-gradient(ellipse at 80% 100%, black 45%, transparent 45%)
          `,
          maskSize: '35% 100%, 40% 100%, 35% 100%',
          maskRepeat: 'no-repeat',
          maskPosition: '0% 0%, 30% 0%, 65% 0%',
          opacity: isDarkRealm ? 0.7 : 1,
        }}
        animate={{
          opacity: isDarkRealm ? [0.6, 0.8, 0.6] : [0.9, 1, 0.9],
          scaleX: [1, 1.02, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
};

export default BackgroundEffects;