import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);

  useEffect(() => {
    // Trigger lightning effect when transitioning between modes
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1500); // Increased duration for the lightning sequence
      setPrevMode(isDarkRealm);
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  return (
    <>
      {/* Background Gradient (Sky/Atmosphere) - Enhanced Resolution */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -21 }}
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #010208 0%, #060c14 20%, #0e1724 40%, #1a273b 60%, #25364a 80%, #0e1724 100%)' // Deeper, richer night blues
            : 'linear-gradient(180deg, #f78c00 0%, #e06c00 25%, #cc5500 50%, #fbc54c 75%, #fbe76a 100%)', // Vibrant, natural day colors
        }}
        transition={{ duration: 4, ease: 'easeInOut' }} // Smoother transition
      />

      {/* Atmospheric Haze/Glow Layer - Smoother and Subtler */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -20,
          background: isDarkRealm
            ? 'radial-gradient(ellipse at center top, rgba(70, 120, 180, 0.08), rgba(100, 150, 210, 0.04), transparent 85%)' // Finer, cool night haze
            : 'radial-gradient(ellipse at center top, rgba(250, 120, 40, 0.2), rgba(252, 160, 80, 0.1), transparent 95%)', // Subtler, warm day haze
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Realistic Thunder Effect - More dynamic and varied */}
      {showLightning && (
        <>
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={`lightning-flash-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7 + Math.random() * 0.3, 0] }}
              transition={{
                duration: 0.08 + Math.random() * 0.15, // Very short, sharp flashes
                delay: Math.random() * 0.8, // Staggered and random delays
                ease: "linear",
              }}
              style={{
                background: `radial-gradient(circle at ${20 + Math.random() * 60}% ${10 + Math.random() * 40}%, rgba(255, 255, 255, 0.9), rgba(173, 216, 230, 0.7) 30%, transparent 70%)`,
                mixBlendMode: 'screen',
                zIndex: -3,
                pointerEvents: 'none',
              }}
            />
          ))}
          {/* Subtle screen darkening for thunder impact */}
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              zIndex: -2,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Responsive Sun/Moon Orb - Adjusted Size */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -18,
          width: 'clamp(40px, 7vw, 70px)', // Increased size, still responsive
          height: 'clamp(40px, 7vw, 70px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 30%, #f0f8ff 15%, #e0f2f7 50%, #b3e5fc 85%, #81d4fa 100%)'
            : 'radial-gradient(circle at 35% 35%, #fffde7 15%, #fff9c4 50%, #fff59d 85%, #ffee58 100%)',
          top: 'clamp(8vh, 10vw, 60px)', // Adjusted top position
          right: 'clamp(8vw, 10vw, 60px)', // Adjusted right position
          filter: isDarkRealm ? 'blur(0.6px)' : 'blur(0.3px)',
          boxShadow: isDarkRealm
            ? '0 0 clamp(20px, 3vw, 35px) rgba(224, 247, 250, 0.6), inset -3px -3px 10px rgba(179, 229, 252, 0.25)'
            : '0 0 clamp(30px, 5vw, 60px) rgba(255, 245, 157, 0.7), 0 0 clamp(50px, 8vw, 100px) rgba(255, 235, 59, 0.4), inset -2px -2px 8px rgba(255, 214, 0, 0.2)',
        }}
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.95, 1, 0.95],
          rotate: isDarkRealm ? [0, 5, 0] : [0, 360],
        }}
        transition={{
          scale: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: isDarkRealm ? 80 : 250,
            repeat: Infinity,
            ease: isDarkRealm ? 'easeInOut' : 'linear'
          }
        }}
      />

      {/* Smoother Sun/Moon Outer Halo */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -19,
          width: 'clamp(70px, 11vw, 100px)', // Adjusted halo size
          height: 'clamp(70px, 11vw, 100px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 50%, rgba(224, 231, 255, 0.08) 60%, transparent 90%)'
            : 'radial-gradient(circle, transparent 40%, rgba(251, 146, 60, 0.18) 55%, rgba(253, 186, 116, 0.09) 75%, transparent 95%)',
          top: `calc(clamp(8vh, 10vw, 60px) - clamp(15px, 2.5vw, 20px))`, // Adjust position based on orb
          right: `calc(clamp(8vw, 10vw, 60px) - clamp(15px, 2.5vw, 20px))`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Seagulls (Day Mode Only) */}
      {!isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 70 + 15 + '%',
                top: Math.random() * 40 + 15 + '%',
                fontSize: 'clamp(8px, 1.8vw, 20px)',
                color: 'rgba(0, 0, 0, 0.5)',
                transform: 'scaleX(-1)',
              }}
              animate={{
                x: [0, 150 + Math.random() * 250, 300 + Math.random() * 350],
                y: [0, -25 + Math.random() * 50, -15 + Math.random() * 30],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 40 + Math.random() * 25,
                repeat: Infinity,
                delay: Math.random() * 20,
                ease: 'linear'
              }}
            >
              ︶
            </motion.div>
          ))}
        </div>
      )}

      {/* Stars and Shooting Stars (Night Mode Only) */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(0.8px, ${Math.random() * 0.2 + 0.1}vw, 2.5px)`,
                height: `clamp(0.8px, ${Math.random() * 0.2 + 0.1}vw, 2.5px)`,
                background: `hsl(${200 + Math.random() * 30}, 70%, ${85 + Math.random() * 10}%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 75 + '%',
                boxShadow: '0 0 clamp(1.5px, 0.3vw, 4px) rgba(255, 255, 255, 0.6)',
              }}
              animate={{
                opacity: [0.15, 0.6, 0.15],
                scale: [0.85, 1.15, 0.85],
              }}
              transition={{
                duration: Math.random() * 5 + 4,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: 'easeInOut'
              }}
            />
          ))}

          {[...Array(1)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 'clamp(1.2px, 0.25vw, 3px)',
                height: 'clamp(1.2px, 0.25vw, 3px)',
                background: 'rgba(255, 255, 255, 0.7)',
                left: '-5%',
                top: `${10 + i * 40}%`,
                boxShadow: '0 0 clamp(8px, 1.2vw, 12px) rgba(255, 255, 255, 0.4), 1px 0 clamp(12px, 1.8vw, 18px) rgba(255, 255, 255, 0.2)',
              }}
              animate={{
                x: ['-5%', '105%'],
                y: [`${10 + i * 40}%`, `${30 + i * 40}%`],
                opacity: [0, 0.6, 0.6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 30 + Math.random() * 20,
                delay: i * 15,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}

      {/* Smoother Horizon Line / Distant Ocean Glow */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16,
          height: 'clamp(0.8px, 0.1vw, 1.5px)',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(160, 200, 230, 0.4) 20%, rgba(200, 230, 250, 0.6) 50%, rgba(160, 200, 230, 0.4) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 245, 0.6) 20%, rgba(255, 240, 220, 0.7) 50%, rgba(255, 255, 245, 0.6) 80%, transparent 100%)',
          top: `calc(100% - clamp(22vh, 28vh, 32vh))`,
          filter: 'blur(clamp(0.3px, 0.08vw, 1px))',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scaleX: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Realistic Ocean/Water - Smoother and Higher Detail */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -15,
          height: 'clamp(22vh, 28vh, 32vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(8, 20, 35, 0.9) 0%,
                rgba(15, 30, 50, 0.8) 20%,
                rgba(25, 45, 75, 0.7) 40%,
                rgba(35, 60, 100, 0.6) 60%,
                rgba(50, 80, 130, 0.5) 80%,
                rgba(70, 100, 160, 0.3) 95%,
                transparent 100%
              )
            `
            : `
              linear-gradient(to top,
                rgba(160, 60, 5, 0.75) 0%,
                rgba(180, 80, 10, 0.65) 20%,
                rgba(200, 100, 20, 0.55) 40%,
                rgba(220, 120, 30, 0.45) 60%,
                rgba(240, 140, 40, 0.35) 80%,
                rgba(255, 160, 60, 0.15) 95%,
                transparent 100%
              )
            `,
        }}
        animate={{
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Smoother Water Wave Patterns - First Layer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: 'clamp(16vh, 22vh, 26vh)',
          background: isDarkRealm
            ? `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(35px, 5vw, 70px),
                rgba(40, 70, 120, 0.25) clamp(35px, 5vw, 70px),
                rgba(40, 70, 120, 0.25) clamp(80px, 12vw, 140px),
                transparent clamp(80px, 12vw, 140px),
                transparent clamp(120px, 18vw, 220px)
              )
            `
            : `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(45px, 7vw, 90px),
                rgba(255, 120, 50, 0.18) clamp(45px, 7vw, 90px),
                rgba(255, 120, 50, 0.18) clamp(90px, 14vw, 180px)
              )
            `,
        }}
        animate={{
          x: [0, -150, 0],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Smoother Additional Wave Layer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(12vh, 16vh, 20vh)',
          background: isDarkRealm
            ? `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(18px, 2.5vw, 40px),
                rgba(60, 90, 150, 0.15) clamp(18px, 2.5vw, 40px),
                rgba(60, 90, 150, 0.15) clamp(45px, 6.5vw, 90px)
              )
            `
            : `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(22px, 3.5vw, 50px),
                rgba(255, 150, 70, 0.1) clamp(22px, 3.5vw, 50px),
                rgba(255, 150, 70, 0.1) clamp(50px, 7.5vw, 110px)
              )
            `,
        }}
        animate={{
          x: [70, -70, 70],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Smoother Moonlight/Sunlight Reflection on Water */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -12,
          width: 'clamp(20px, 3vw, 30px)',
          height: 'clamp(60px, 10vh, 100px)',
          background: isDarkRealm
            ? `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(240, 248, 255, 0.25) 10%,
                rgba(219, 234, 254, 0.4) 30%,
                rgba(192, 219, 254, 0.3) 50%,
                rgba(147, 197, 253, 0.2) 70%,
                transparent 100%
              )
            `
            : `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(255, 140, 60, 0.25) 20%,
                rgba(255, 170, 80, 0.15) 50%,
                rgba(255, 200, 100, 0.1) 80%,
                transparent 100%
              )
            `,
          right: 'clamp(5vw, 7vw, 40px)',
          bottom: '0',
          filter: 'blur(clamp(0.6px, 0.3vw, 1.5px))',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scaleY: [1, 1.08, 1],
          scaleX: [1, 1.03, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Beach Sand - Smoother Gradients */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -11,
          height: 'clamp(14vh, 18vh, 22vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(45, 55, 65, 0.85) 0%,
                rgba(65, 75, 85, 0.75) 30%,
                rgba(85, 95, 105, 0.65) 60%,
                rgba(105, 115, 125, 0.45) 90%,
                transparent 100%
              )
            `
            : `
              linear-gradient(to top,
                rgba(140, 70, 5, 0.8) 0%,
                rgba(160, 90, 10, 0.7) 30%,
                rgba(180, 110, 20, 0.6) 60%,
                rgba(200, 130, 30, 0.5) 90%,
                transparent 100%
              )
            `,
        }}
      />

      {/* Beach Sand Texture - Finer Dots */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -10,
          height: 'clamp(12vh, 16vh, 20vh)',
          background: isDarkRealm
            ? `
              radial-gradient(circle at 25% 30%, rgba(200, 210, 220, 0.25) 0.6px, transparent 0.6px),
              radial-gradient(circle at 75% 70%, rgba(160, 170, 180, 0.15) 0.6px, transparent 0.6px),
              radial-gradient(circle at 50% 50%, rgba(180, 190, 200, 0.2) 0.6px, transparent 0.6px),
              radial-gradient(circle at 30% 80%, rgba(170, 180, 190, 0.15) 0.6px, transparent 0.6px),
              radial-gradient(circle at 80% 20%, rgba(200, 210, 220, 0.2) 0.6px, transparent 0.6px)
            `
            : `
              radial-gradient(circle at 25% 30%, rgba(180, 100, 20, 0.3) 0.6px, transparent 0.6px),
              radial-gradient(circle at 75% 70%, rgba(200, 120, 30, 0.2) 0.6px, transparent 0.6px),
              radial-gradient(circle at 50% 50%, rgba(220, 140, 40, 0.25) 0.6px, transparent 0.6px),
              radial-gradient(circle at 30% 80%, rgba(230, 150, 50, 0.2) 0.6px, transparent 0.6px),
              radial-gradient(circle at 80% 20%, rgba(240, 160, 60, 0.2) 0.6px, transparent 0.6px)
            `,
          backgroundSize: `
            clamp(15px, 3vw, 30px) clamp(15px, 3vw, 30px),
            clamp(25px, 4vw, 40px) clamp(25px, 4vw, 40px),
            clamp(20px, 3.5vw, 35px) clamp(20px, 3.5vw, 35px),
            clamp(30px, 4.5vw, 45px) clamp(30px, 4.5vw, 45px),
            clamp(18px, 3.2vw, 32px) clamp(18px, 3.2vw, 32px)
          `,
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Smoother Wet Sand Edge */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9,
          height: 'clamp(0.5px, 0.1vw, 2px)',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(220, 230, 240, 0.6) 15%, rgba(230, 240, 250, 0.7) 35%, rgba(240, 250, 255, 0.65) 50%, rgba(230, 240, 250, 0.7) 65%, rgba(220, 230, 240, 0.6) 85%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 240, 0.65) 15%, rgba(255, 240, 220, 0.6) 35%, rgba(255, 255, 250, 0.65) 50%, rgba(255, 240, 220, 0.6) 65%, rgba(255, 255, 240, 0.65) 85%, transparent 100%)',
          top: `calc(100% - clamp(14vh, 18vh, 22vh))`,
          filter: 'blur(clamp(0.2px, 0.05vw, 0.5px))',
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scaleX: [1, 1.01, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Beach Details - Footprints and Shells */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(12vh, 16vh, 20vh)', zIndex: -8 }}>
        {/* Footprints */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`footprint-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(4px, 0.7vw, 10px)`,
              height: `clamp(2px, 0.3vw, 5px)`,
              background: isDarkRealm
                ? 'rgba(50, 60, 70, 0.3)'
                : 'rgba(160, 80, 10, 0.25)',
              left: Math.random() * 90 + '%',
              top: Math.random() * 85 + 5 + '%',
              filter: 'blur(clamp(0.1px, 0.05vw, 0.3px))',
              transform: `rotate(${Math.random() * 15 - 7.5}deg)`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              delay: Math.random() * 12,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Shells */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`shell-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1.5px, 0.4vw, 6px)`,
              height: `clamp(1px, 0.2vw, 4px)`,
              background: isDarkRealm
                ? `hsl(${200 + Math.random() * 15}, 10%, ${65 + Math.random() * 10}%)`
                : `hsl(${20 + Math.random() * 8}, ${30 + Math.random() * 15}%, ${55 + Math.random() * 10}%)`,
              left: Math.random() * 95 + '%',
              top: Math.random() * 75 + 10 + '%',
              borderRadius: Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%',
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [0.95, 1.02, 0.95],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Dunes/Hills - More defined and layered */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`dune-${i}`}
          className="fixed bottom-0"
          style={{
            zIndex: -6,
            width: `clamp(70px, ${12 + Math.random() * 6}vw, 150px)`,
            height: `clamp(15px, ${2.5 + Math.random() * 1.5}vh, 35px)`,
            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
            background: isDarkRealm
              ? `linear-gradient(to top, rgba(40, 50, 60, 0.75) 0%, rgba(55, 65, 75, 0.65) 50%, transparent 100%)`
              : `linear-gradient(to top, rgba(150, 70, 5, 0.75) 0%, rgba(180, 100, 15, 0.65) 50%, transparent 100%)`,
            left: `${i * 30 + (Math.random() * 6 - 3)}vw`,
            transform: `translateX(-50%)`,
            bottom: `clamp(14vh, 18vh, 22vh)`,
            filter: 'blur(clamp(0.3px, 0.1vw, 1px))',
          }}
          animate={{
            y: [0, -3, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 4,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Beach Sparkles/Glints */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(16vh, 22vh, 26vh)', zIndex: -5 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(0.6px, ${Math.random() * 0.25 + 0.1}vw, 3px)`,
              height: `clamp(0.6px, ${Math.random() * 0.25 + 0.1}vw, 3px)`,
              background: isDarkRealm
                ? `hsl(${190 + Math.random() * 30}, ${25 + Math.random() * 25}%, ${75 + Math.random() * 15}%)`
                : `hsl(${25 + Math.random() * 15}, ${40 + Math.random() * 25}%, ${80 + Math.random() * 10}%)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 90 + '%',
              boxShadow: isDarkRealm
                ? `0 0 clamp(3px, 0.8vw, 8px) rgba(200, 210, 220, 0.65)`
                : `0 0 clamp(5px, 1vw, 10px) rgba(250, 150, 50, 0.75)`,
            }}
            animate={{
              opacity: [0.25, 0.85, 0.25],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;
