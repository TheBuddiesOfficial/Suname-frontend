import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);

  useEffect(() => {
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1200);
      setPrevMode(isDarkRealm);
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  return (
    <>
      {/* Background Gradient - Deeper and richer */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -21 }}
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #03071e 0%, #111827 20%, #1f2937 40%, #374151 60%, #4b5563 80%, #1f2937 100%)' // Deeper, more textured night
            : 'linear-gradient(180deg, #f97316 0%, #ea580c 25%, #d97706 50%, #facc15 75%, #fde047 100%)', // Richer day
        }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />

      {/* Atmospheric Haze/Glow */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -20,
          background: isDarkRealm
            ? 'radial-gradient(ellipse at center top, rgba(94, 144, 204, 0.18), rgba(129, 179, 244, 0.12), transparent 70%)' // Softer night haze
            : 'radial-gradient(ellipse at center top, rgba(251, 146, 60, 0.35), rgba(253, 186, 116, 0.25), transparent 80%)', // Warmer day haze
        }}
        animate={{
          opacity: [0.55, 0.9, 0.55],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Lightning Effect */}
      {showLightning && (
        <>
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={`lightning-main-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8 + Math.random() * 0.2, 0] }}
              transition={{
                duration: 0.1 + Math.random() * 0.2,
                delay: Math.random() * 0.5,
                ease: "linear",
              }}
              style={{
                background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 50}%, rgba(255, 255, 255, 0.8), transparent 5%)`,
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
              animate={{ opacity: [0, 0.5 + Math.random() * 0.3, 0] }}
              transition={{
                duration: 0.15 + Math.random() * 0.25,
                delay: 0.2 + Math.random() * 0.6,
                ease: "linear",
              }}
              style={{
                background: `radial-gradient(ellipse at ${Math.random() * 100}% ${Math.random() * 70}%, rgba(173, 216, 230, 0.6), transparent 10%)`,
                mixBlendMode: 'screen',
                zIndex: -3,
                pointerEvents: 'none',
              }}
            />
          ))}
          {/* Subtle darkening during lightning */}
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              zIndex: -2,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Sun/Moon */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -18,
          width: 'clamp(90px, 16vw, 210px)',
          height: 'clamp(90px, 16vw, 210px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 30%, #f0f4f8 5%, #e0e7ff 25%, #c3daff 50%, #a5b4fc 75%, #818cf8 100%)' // Brighter night moon
            : 'radial-gradient(circle at 35% 35%, #fff7ed 0%, #ffedd5 20%, #fdba74 60%, #f97316 100%)', // Warmer sun
          top: 'clamp(12vh, 17vh, 22vh)',
          right: 'clamp(16vw, 21vw, 26vw)',
          filter: isDarkRealm ? 'blur(0.8px)' : 'blur(0.4px)',
          boxShadow: isDarkRealm
            ? '0 0 clamp(45px, 9vw, 90px) rgba(224, 231, 255, 0.7), inset -9px -9px 22px rgba(165, 180, 252, 0.4)' // Stronger moon glow
            : '0 0 clamp(90px, 16vw, 210px) rgba(253, 186, 116, 0.8), 0 0 clamp(160px, 26vw, 420px) rgba(251, 146, 60, 0.5), inset -6px -6px 16px rgba(251, 146, 60, 0.3)',
        }}
        animate={{
          scale: [1, 1.09, 1],
          opacity: [0.88, 1, 0.88],
          rotate: isDarkRealm ? [0, 7, 0] : [0, 360],
        }}
        transition={{
          scale: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          rotate: {
            duration: isDarkRealm ? 55 : 180,
            repeat: Infinity,
            ease: isDarkRealm ? "easeInOut" : "linear"
          }
        }}
      />

      {/* Sun/Moon Halo */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -19,
          width: 'clamp(130px, 23vw, 290px)',
          height: 'clamp(130px, 23vw, 290px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 40%, rgba(224, 231, 255, 0.1) 50%, transparent 80%)' // More subtle night halo
            : 'radial-gradient(circle, transparent 30%, rgba(251, 146, 60, 0.3) 45%, rgba(253, 186, 116, 0.2) 70%, transparent 90%)', // Warmer day halo
          top: 'clamp(10vh, 15vh, 20vh)',
          right: 'clamp(13vw, 18vw, 23vw)',
        }}
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Seagulls (Day) */}
      {!isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 70 + 5 + '%',
                top: Math.random() * 40 + 15 + '%',
                fontSize: 'clamp(11px, 2.6vw, 29px)',
                color: 'rgba(0, 0, 0, 0.7)',
                transform: 'scaleX(-1)',
              }}
              animate={{
                x: [0, 220 + Math.random() * 350, 440 + Math.random() * 450],
                y: [0, -45 + Math.random() * 90, -35 + Math.random() * 70],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 28 + Math.random() * 18,
                repeat: Infinity,
                delay: Math.random() * 14,
                ease: "linear"
              }}
            >
              ︶
            </motion.div>
          ))}
        </div>
      )}

      {/* Stars and Shooting Stars (Night) */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(180)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1.2px, ${Math.random() * 0.35 + 0.2}vw, 4.5px)`,
                height: `clamp(1.2px, ${Math.random() * 0.35 + 0.2}vw, 4.5px)`,
                background: `hsl(${210 + Math.random() * 50}, 100%, ${85 + Math.random() * 15}%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 75 + '%',
                boxShadow: '0 0 clamp(4.5px, 1.1vw, 11px) rgba(255, 255, 255, 0.85)',
              }}
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.75, 1.5, 0.75],
              }}
              transition={{
                duration: Math.random() * 3.5 + 2.5,
                repeat: Infinity,
                delay: Math.random() * 4.5,
                ease: "easeInOut"
              }}
            />
          ))}

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 'clamp(2.5px, 0.5vw, 6px)',
                height: 'clamp(2.5px, 0.5vw, 6px)',
                background: 'white',
                left: '-10%',
                top: `${15 + i * 20}%`,
                boxShadow: '0 0 clamp(18px, 3.5vw, 35px) #ffffff, 2px 0 clamp(30px, 5.5vw, 55px) rgba(255, 255, 255, 0.7)',
              }}
              animate={{
                x: ['-10%', '110%'],
                y: [`${15 + i * 20}%`, `${40 + i * 20}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                repeatDelay: 18 + Math.random() * 12,
                delay: i * 9,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Horizon Line - Enhanced */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16,
          height: 'clamp(1.5px, 0.3vw, 4px)',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(173, 216, 230, 0.7) 20%, rgba(224, 255, 255, 0.9) 50%, rgba(173, 216, 230, 0.7) 80%, transparent 100%)' // Lighter night horizon
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 240, 0.9) 20%, rgba(255, 245, 235, 1) 50%, rgba(255, 255, 240, 0.9) 80%, transparent 100%)', // Brighter day horizon
          top: `calc(100% - clamp(28vh, 35vh, 38vh))`,
          filter: 'blur(clamp(0.8px, 0.3vw, 2.5px))',
        }}
        animate={{
          opacity: [0.65, 1, 0.65],
          scaleX: [1, 1.06, 1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Realistic Ocean/Water - Main body with clearer gradients */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -15,
          height: 'clamp(28vh, 35vh, 38vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(15, 35, 65, 0.98) 0%,
                rgba(25, 50, 90, 0.9) 15%,
                rgba(40, 70, 120, 0.8) 30%,
                rgba(60, 95, 150, 0.7) 45%,
                rgba(80, 120, 180, 0.6) 60%,
                rgba(100, 145, 210, 0.5) 75%,
                rgba(130, 170, 240, 0.3) 90%,
                transparent 100%
              )
            `
            : `
              linear-gradient(to top,
                rgba(220, 80, 20, 0.85) 0%,
                rgba(240, 120, 40, 0.75) 25%,
                rgba(255, 160, 60, 0.65) 50%,
                rgba(255, 200, 80, 0.55) 75%,
                rgba(255, 235, 120, 0.35) 90%,
                transparent 100%
              )
            `,
        }}
        animate={{
          opacity: [0.92, 1, 0.92],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Realistic water wave patterns - First layer, more distinct */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: 'clamp(22vh, 30vh, 34vh)',
          background: isDarkRealm
            ? `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(35px, 7vw, 90px),
                rgba(60, 110, 190, 0.38) clamp(35px, 7vw, 90px),
                rgba(60, 110, 190, 0.38) clamp(80px, 16vw, 170px),
                transparent clamp(80px, 16vw, 170px),
                transparent clamp(120px, 24vw, 250px)
              )
            `
            : `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(45px, 9vw, 110px),
                rgba(255, 120, 50, 0.28) clamp(45px, 9vw, 110px),
                rgba(255, 120, 50, 0.28) clamp(90px, 18vw, 220px)
              )
            `,
        }}
        animate={{
          x: [0, -220, 0],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional wave layer for more depth and realism */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(17vh, 24vh, 30vh)',
          background: isDarkRealm
            ? `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(18px, 3.5vw, 55px),
                rgba(90, 140, 220, 0.28) clamp(18px, 3.5vw, 55px),
                rgba(90, 140, 220, 0.28) clamp(40px, 8vw, 110px)
              )
            `
            : `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(22px, 4.5vw, 65px),
                rgba(255, 170, 70, 0.23) clamp(22px, 4.5vw, 65px),
                rgba(255, 170, 70, 0.23) clamp(45px, 9vw, 130px)
              )
            `,
        }}
        animate={{
          x: [110, -110, 110],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Moonlight/Sunlight reflection on water - Enhanced */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -12,
          width: 'clamp(45px, 9vw, 90px)',
          height: 'clamp(130px, 27vh, 270px)',
          background: isDarkRealm
            ? `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(240, 248, 255, 0.55) 10%,
                rgba(219, 234, 254, 0.75) 30%,
                rgba(192, 219, 254, 0.65) 50%,
                rgba(147, 197, 253, 0.55) 70%,
                transparent 100%
              )
            `
            : `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(255, 160, 70, 0.55) 20%,
                rgba(255, 190, 90, 0.45) 50%,
                rgba(255, 220, 110, 0.35) 80%,
                transparent 100%
              )
            `,
          right: 'clamp(18vw, 23vw, 28vw)',
          bottom: '0',
          filter: 'blur(clamp(1.2px, 0.6vw, 3.5px))',
        }}
        animate={{
          opacity: [0.65, 0.95, 0.65],
          scaleY: [1, 1.18, 1],
          scaleX: [1, 1.12, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Beach Sand - Main body with clearer gradients and deeper colors */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -11,
          height: 'clamp(20vh, 27vh, 32vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(64, 78, 98, 0.96) 0%,
                rgba(96, 112, 138, 0.88) 20%,
                rgba(134, 150, 179, 0.78) 40%,
                rgba(179, 195, 224, 0.62) 60%,
                rgba(226, 232, 240, 0.45) 80%,
                transparent 100%
              )
            `
            : `
              linear-gradient(to top,
                rgba(179, 64, 0, 1) 0%,
                rgba(204, 121, 54, 0.92) 15%,
                rgba(230, 159, 100, 0.84) 30%,
                rgba(255, 193, 140, 0.72) 50%,
                rgba(255, 219, 177, 0.6) 70%,
                rgba(255, 240, 217, 0.45) 85%,
                transparent 100%
              )
            `,
        }}
      />

      {/* Beach Sand Texture/Details - Random dots for granular feel */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -10,
          height: 'clamp(18vh, 25vh, 30vh)',
          background: isDarkRealm
            ? `
              radial-gradient(circle at 25% 30%, rgba(224, 232, 240, 0.45) 1.2px, transparent 1.2px),
              radial-gradient(circle at 75% 70%, rgba(179, 195, 224, 0.35) 1.2px, transparent 1.2px),
              radial-gradient(circle at 50% 50%, rgba(203, 213, 225, 0.4) 1.2px, transparent 1.2px),
              radial-gradient(circle at 30% 80%, rgba(188, 199, 214, 0.3) 1.2px, transparent 1.2px),
              radial-gradient(circle at 80% 20%, rgba(224, 232, 240, 0.35) 1.2px, transparent 1.2px)
            `
            : `
              radial-gradient(circle at 25% 30%, rgba(204, 121, 54, 0.55) 1.2px, transparent 1.2px),
              radial-gradient(circle at 75% 70%, rgba(230, 159, 100, 0.45) 1.2px, transparent 1.2px),
              radial-gradient(circle at 50% 50%, rgba(255, 193, 140, 0.5) 1.2px, transparent 1.2px),
              radial-gradient(circle at 30% 80%, rgba(255, 204, 153, 0.45) 1.2px, transparent 1.2px),
              radial-gradient(circle at 80% 20%, rgba(255, 224, 189, 0.4) 1.2px, transparent 1.2px)
            `,
          backgroundSize: `
            clamp(28px, 5.5vw, 65px) clamp(28px, 5.5vw, 65px),
            clamp(38px, 7.5vw, 85px) clamp(38px, 7.5vw, 85px),
            clamp(32px, 6.5vw, 75px) clamp(32px, 6.5vw, 75px),
            clamp(42px, 8.5vw, 95px) clamp(42px, 8.5vw, 95px),
            clamp(30px, 6vw, 70px) clamp(30px, 6vw, 70px)
          `,
        }}
        animate={{
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Wet Sand Reflection/Edge - Sharper, more defined line */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9,
          height: 'clamp(2.5px, 0.6vw, 5px)',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(241, 245, 249, 0.92) 15%, rgba(248, 250, 252, 1) 35%, rgba(255, 255, 255, 0.98) 50%, rgba(248, 250, 252, 1) 65%, rgba(241, 245, 249, 0.92) 85%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 250, 0.98) 15%, rgba(255, 247, 230, 0.95) 35%, rgba(255, 255, 255, 1) 50%, rgba(255, 247, 230, 0.95) 65%, rgba(255, 255, 250, 0.98) 85%, transparent 100%)',
          top: `calc(100% - clamp(20vh, 27vh, 32vh))`,
          filter: 'blur(clamp(0.9px, 0.4vw, 2.8px))',
        }}
        animate={{
          opacity: [0.75, 1, 0.75],
          scaleX: [1, 1.09, 1],
        }}
        transition={{
          duration: 5.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Beach Details - Footprints and Shells */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(17vh, 22vh, 27vh)', zIndex: -8 }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`footprint-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(7px, 1.3vw, 20px)`,
              height: `clamp(3.5px, 0.7vw, 11px)`,
              background: isDarkRealm
                ? 'rgba(64, 78, 98, 0.55)'
                : 'rgba(179, 64, 0, 0.45)',
              left: Math.random() * 88 + 3 + '%',
              top: Math.random() * 75 + 12 + '%',
              filter: 'blur(clamp(0.4px, 0.15vw, 1.2px))',
              transform: `rotate(${Math.random() * 35 - 17.5}deg)`,
            }}
            animate={{
              opacity: [0.45, 0.85, 0.45],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              delay: Math.random() * 7,
              ease: "easeInOut"
            }}
          />
        ))}

        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`shell-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(3.5px, 0.9vw, 13px)`,
              height: `clamp(2.5px, 0.7vw, 9px)`,
              background: isDarkRealm
                ? `hsl(${215 + Math.random() * 25}, 18%, ${75 + Math.random() * 18}%)`
                : `hsl(${28 + Math.random() * 12}, ${45 + Math.random() * 25}%, ${65 + Math.random() * 20}%)`,
              left: Math.random() * 92 + 3 + '%',
              top: Math.random() * 65 + 17 + '%',
              borderRadius: Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%',
            }}
            animate={{
              opacity: [0.65, 1, 0.65],
              scale: [0.85, 1.15, 0.85],
            }}
            transition={{
              duration: 8.5,
              repeat: Infinity,
              delay: Math.random() * 4.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Dunes/Hills - More defined and layered */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`dune-${i}`}
          className="fixed bottom-0"
          style={{
            zIndex: -6,
            width: `clamp(90px, ${16 + Math.random() * 12}vw, 220px)`,
            height: `clamp(22px, ${4.5 + Math.random() * 3.5}vh, 55px)`,
            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
            background: isDarkRealm
              ? `linear-gradient(to top, rgba(55, 65, 81, 0.92) 0%, rgba(71, 85, 105, 0.85) 50%, transparent 100%)`
              : `linear-gradient(to top, rgba(161, 98, 7, 0.92) 0%, rgba(202, 138, 4, 0.85) 50%, transparent 100%)`,
            left: `${i * 25 + (Math.random() * 10 - 5)}vw`,
            transform: `translateX(-50%)`,
            bottom: `clamp(18vh, 24vh, 30vh)`,
            filter: 'blur(clamp(0.6px, 0.25vw, 2.5px))',
          }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 9 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 2.2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Beach Sparkles/Glints */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(22vh, 32vh, 37vh)', zIndex: -5 }}>
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1.2px, ${Math.random() * 0.45 + 0.25}vw, 5.5px)`,
              height: `clamp(1.2px, ${Math.random() * 0.45 + 0.25}vw, 5.5px)`,
              background: isDarkRealm
                ? `hsl(${205 + Math.random() * 35}, ${35 + Math.random() * 35}%, ${78 + Math.random() * 18}%)`
                : `hsl(${38 + Math.random() * 22}, ${55 + Math.random() * 35}%, ${82 + Math.random() * 13}%)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 88 + 3 + '%',
              boxShadow: isDarkRealm
                ? `0 0 clamp(4.5px, 1.1vw, 11px) rgba(226, 232, 240, 0.75)`
                : `0 0 clamp(7px, 1.3vw, 13px) rgba(251, 191, 36, 0.85)`,
            }}
            animate={{
              opacity: [0.35, 0.95, 0.35],
              scale: [0.75, 1.35, 0.75],
            }}
            transition={{
              duration: Math.random() * 4.5 + 3.5,
              repeat: Infinity,
              delay: Math.random() * 5.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;