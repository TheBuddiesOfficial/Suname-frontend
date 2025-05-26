import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);

  useEffect(() => {
    // Trigger lightning only when switching from light to dark mode
    if (!prevMode && isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1200); // Duration of lightning animation
      return () => clearTimeout(timer);
    }
    setPrevMode(isDarkRealm); // Update prevMode for the next comparison
  }, [isDarkRealm, prevMode]);

  return (
    <>
      {showLightning && (
        <>
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            // Varying opacity for a more natural lightning flash
            animate={{ opacity: [0, 0.95, 0, 0.8, 0, 0.6, 0] }}
            transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }}
            style={{
              // Bright white-yellow flash from top-left
              background: 'radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 215, 0, 0.8) 30%, transparent 60%)',
              mixBlendMode: 'screen', // Blends light colors
              zIndex: -4,
            }}
          />
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            // Secondary, reddish glow
            animate={{ opacity: [0, 0, 0.85, 0, 0.9, 0, 0.7, 0] }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }}
            style={{
              // Warm orange-red glow from bottom-right
              background: 'radial-gradient(circle at 60% 70%, rgba(255, 107, 53, 0.95) 0%, rgba(238, 64, 53, 0.6) 30%, transparent 60%)',
              mixBlendMode: 'screen',
              zIndex: -4,
            }}
          />
        </>
      )}

      {/* Main Background Sky/Deep Space */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -20 }}
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #0a0e1a 0%, #1a1e2e 20%, #2d3748 40%, #374151 60%, #4a5568 80%, #2d3748 100%)' // Dark realm, deep space gradient
            : 'linear-gradient(180deg, #3a0026 0%, #ff4500 25%, #ff8c00 50%, #ffc300 75%, #ffe100 100%)', // Enhanced sunset gradient
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      {/* Atmospheric/Planetary Glow */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -19,
          background: isDarkRealm
            ? 'radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.15), rgba(147, 197, 253, 0.1), transparent 70%)' // Dark realm nebula glow
            : 'radial-gradient(ellipse at center top, rgba(255, 165, 0, 0.2), rgba(255, 69, 0, 0.15), transparent 80%)', // Muted sunset glow
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sun/Moon Orb */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -17,
          width: 'clamp(80px, 15vw, 200px)',
          height: 'clamp(80px, 15vw, 200px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 30%, #f8fafc 5%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)' // Moon gradient
            : 'radial-gradient(circle at 35% 35%, #ffffff 0%, #ffd23f 20%, #ff6b35 60%, #ee4035 100%)', // Sun gradient
          top: 'clamp(10vh, 15vh, 20vh)',
          right: 'clamp(15vw, 20vw, 25vw)',
          filter: isDarkRealm ? 'blur(1px)' : 'blur(0.5px)',
          boxShadow: isDarkRealm
            ? '0 0 clamp(40px, 8vw, 80px) rgba(248, 250, 252, 0.6), inset -8px -8px 20px rgba(148, 163, 184, 0.4)' // Moon glow
            : '0 0 clamp(80px, 15vw, 200px) rgba(255, 107, 53, 0.8), 0 0 clamp(150px, 25vw, 400px) rgba(238, 64, 53, 0.5), inset -5px -5px 15px rgba(238, 64, 53, 0.3)', // Sun glow
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.85, 1, 0.85],
          rotate: isDarkRealm ? [0, 8, 0] : [0, 360], // Moon subtle rock, Sun full rotation
        }}
        transition={{
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: {
            duration: isDarkRealm ? 50 : 200,
            repeat: Infinity,
            ease: isDarkRealm ? "easeInOut" : "linear"
          }
        }}
      />

      {/* Outer Halo of Sun/Moon */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -18,
          width: 'clamp(120px, 22vw, 280px)',
          height: 'clamp(120px, 22vw, 280px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 40%, rgba(248, 250, 252, 0.08) 50%, transparent 80%)' // Moon halo
            : 'radial-gradient(circle, transparent 30%, rgba(255, 107, 53, 0.25) 45%, rgba(238, 64, 53, 0.15) 70%, transparent 90%)', // Sun halo
          top: 'clamp(8vh, 12vh, 17vh)',
          right: 'clamp(12vw, 17vw, 22vw)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Seagulls (Light Realm) */}
      {!isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -16 }}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 60 + 10 + '%',
                top: Math.random() * 30 + 20 + '%',
                fontSize: 'clamp(10px, 2.5vw, 28px)',
                color: 'rgba(0, 0, 0, 0.6)',
                transform: 'scaleX(-1)',
              }}
              animate={{
                x: [0, 200 + Math.random() * 300, 400 + Math.random() * 400],
                y: [0, -40 + Math.random() * 80, -30 + Math.random() * 60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 12,
                ease: "linear"
              }}
            >
              ︶
            </motion.div>
          ))}
        </div>
      )}

      {/* Stars & Shooting Stars (Dark Realm) */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -16 }}>
          {/* Stars */}
          {[...Array(120)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${Math.random() * 0.3 + 0.15}vw, 4px)`,
                height: `clamp(1px, ${Math.random() * 0.3 + 0.15}vw, 4px)`,
                background: `hsl(${200 + Math.random() * 60}, 100%, ${80 + Math.random() * 20}%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 60 + '%',
                boxShadow: '0 0 clamp(4px, 1vw, 10px) rgba(255, 255, 255, 0.8)',
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Shooting Stars */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 'clamp(2px, 0.4vw, 5px)',
                height: 'clamp(2px, 0.4vw, 5px)',
                background: 'white',
                left: '-10%',
                top: `${10 + i * 25}%`,
                boxShadow: '0 0 clamp(15px, 3vw, 30px) #ffffff, 2px 0 clamp(25px, 5vw, 50px) rgba(255, 255, 255, 0.6)',
              }}
              animate={{
                x: ['-10%', '110%'],
                y: [`${10 + i * 25}%`, `${35 + i * 25}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 20 + Math.random() * 15,
                delay: i * 10,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Horizon Line / Distant Glow */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -15,
          height: 'clamp(1px, 0.2vw, 3px)',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.6) 20%, rgba(203, 213, 225, 0.8) 50%, rgba(148, 163, 184, 0.6) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 100, 0, 0.5) 20%, rgba(255, 140, 0, 0.7) 50%, rgba(255, 100, 0, 0.5) 80%, transparent 100%)', // Sunset horizon glow
          top: 'clamp(65%, 68%, 70%)',
          boxShadow: isDarkRealm
            ? '0 0 clamp(8px, 2vw, 15px) rgba(148, 163, 184, 0.4)'
            : '0 0 clamp(10px, 2vw, 20px) rgba(255, 140, 0, 0.4)', // Sunset glow shadow
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Realistic Ocean/Water - Main body with clearer gradients */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: 'clamp(25vh, 32vh, 35vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(10, 20, 40, 0.98) 0%, /* Deeper, more opaque blue at bottom */
                rgba(20, 40, 80, 0.9) 15%,
                rgba(30, 60, 120, 0.8) 30%,
                rgba(40, 80, 160, 0.7) 45%,
                rgba(60, 100, 180, 0.6) 60%,
                rgba(80, 120, 200, 0.5) 75%,
                rgba(100, 140, 220, 0.3) 90%, /* Lighter, more transparent near horizon */
                transparent 100%
              )
            `
            : `
              linear-gradient(to top,
                rgba(150, 40, 0, 0.9) 0%, /* Deeper sunset red/orange */
                rgba(200, 80, 0, 0.8) 25%,
                rgba(255, 120, 0, 0.7) 50%,
                rgba(255, 160, 0, 0.6) 75%,
                rgba(255, 200, 0, 0.3) 90%, /* Fading yellow near horizon */
                transparent 100%
              )
            `,
        }}
        animate={{
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Realistic water wave patterns - First layer, more distinct */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(20vh, 28vh, 32vh)',
          background: isDarkRealm
            ? `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(30px, 6vw, 80px),
                rgba(50, 100, 180, 0.35) clamp(30px, 6vw, 80px),
                rgba(50, 100, 180, 0.35) clamp(70px, 14vw, 160px),
                transparent clamp(70px, 14vw, 160px),
                transparent clamp(110px, 22vw, 240px)
              )
            `
            : `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(40px, 8vw, 100px),
                rgba(255, 120, 0, 0.2) clamp(40px, 8vw, 100px), /* Sunset orange waves */
                rgba(255, 120, 0, 0.2) clamp(80px, 16vw, 200px)
              )
            `,
        }}
        animate={{
          x: [0, -200, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional wave layer for more depth and realism */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -12,
          height: 'clamp(15vh, 22vh, 28vh)',
          background: isDarkRealm
            ? `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(15px, 3vw, 50px),
                rgba(80, 130, 210, 0.25) clamp(15px, 3vw, 50px),
                rgba(80, 130, 210, 0.25) clamp(35px, 7vw, 100px)
              )
            `
            : `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(20px, 4vw, 60px),
                rgba(255, 160, 0, 0.15) clamp(20px, 4vw, 60px), /* Muted yellow-orange waves */
                rgba(255, 160, 0, 0.15) clamp(40px, 8vw, 120px)
              )
            `,
        }}
        animate={{
          x: [100, -100, 100],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Moonlight/Sunlight reflection on water - Enhanced */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -11,
          width: 'clamp(40px, 8vw, 80px)',
          height: 'clamp(120px, 25vh, 250px)',
          background: isDarkRealm
            ? `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(248, 250, 252, 0.5) 10%, /* Brighter, more defined reflection */
                rgba(226, 232, 240, 0.7) 30%,
                rgba(203, 213, 225, 0.6) 50%,
                rgba(148, 163, 184, 0.5) 70%,
                transparent 100%
              )
            `
            : `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(255, 140, 0, 0.5) 20%, /* Sunset orange reflection */
                rgba(255, 180, 0, 0.4) 50%, /* Golden reflection */
                rgba(255, 210, 0, 0.3) 80%, /* Yellow reflection */
                transparent 100%
              )
            `,
          right: 'clamp(17vw, 22vw, 27vw)',
          bottom: '0',
          filter: 'blur(clamp(1px, 0.5vw, 3px))',
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scaleY: [1, 1.15, 1],
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Realistic Beach Sand - Main body */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -10,
          height: 'clamp(18vh, 25vh, 30vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(71, 85, 105, 0.95) 0%, /* Darker, cooler sand for moonlit beach */
                rgba(100, 116, 139, 0.85) 20%,
                rgba(148, 163, 184, 0.75) 40%,
                rgba(203, 213, 225, 0.6) 60%,
                rgba(241, 245, 249, 0.4) 80%,
                transparent 100%
              )
            `
            : `
              linear-gradient(to top,
                #6c4217 0%, /* Deep reddish-brown for wet sand */
                #8a5e2f 15%,
                #a87d47 30%,
                #c69c60 50%, /* Mid-tone golden sand */
                #e2bc8a 70%,
                #f5e0b6 85%, /* Lighter, drier sand near top */
                transparent 100%
              )
            `,
        }}
      />

      {/* Beach Texture / Grain */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9,
          height: 'clamp(16vh, 22vh, 28vh)',
          background: isDarkRealm
            ? `
              radial-gradient(circle at 25% 30%, rgba(203, 213, 225, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 75% 70%, rgba(148, 163, 184, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(226, 232, 240, 0.35) 1px, transparent 1px),
              radial-gradient(circle at 30% 80%, rgba(156, 163, 175, 0.25) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(203, 213, 225, 0.3) 1px, transparent 1px)
            `
            : `
              radial-gradient(circle at 25% 30%, rgba(130, 80, 30, 0.5) 1px, transparent 1px), /* Darker sand texture */
              radial-gradient(circle at 75% 70%, rgba(180, 120, 60, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(220, 160, 90, 0.45) 1px, transparent 1px),
              radial-gradient(circle at 30% 80%, rgba(240, 190, 120, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(250, 220, 150, 0.35) 1px, transparent 1px)
            `,
          backgroundSize: `
            clamp(25px, 5vw, 60px) clamp(25px, 5vw, 60px),
            clamp(35px, 7vw, 80px) clamp(35px, 7vw, 80px),
            clamp(30px, 6vw, 70px) clamp(30px, 6vw, 70px),
            clamp(40px, 8vw, 90px) clamp(40px, 8vw, 90px),
            clamp(28px, 5.5vw, 65px) clamp(28px, 5.5vw, 65px)
          `,
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Shoreline Foam/Wet sand line */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -8,
          height: 'clamp(2px, 0.5vw, 4px)',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(241, 245, 249, 0.9) 15%, rgba(248, 250, 252, 1) 35%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 250, 252, 1) 65%, rgba(241, 245, 249, 0.9) 85%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 200, 0, 0.7) 15%, rgba(255, 220, 50, 0.8) 35%, rgba(255, 240, 100, 0.9) 50%, rgba(255, 220, 50, 0.8) 65%, rgba(255, 200, 0, 0.7) 85%, transparent 100%)', // Golden wet line for sunset
          top: `calc(100% - clamp(18vh, 25vh, 30vh))`,
          filter: 'blur(clamp(0.5px, 0.2vw, 2px))',
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scaleX: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Beach Details: Footprints & Shells */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(15vh, 20vh, 25vh)', zIndex: -7 }}>
        {/* Footprints */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`footprint-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(6px, 1.2vw, 18px)`,
              height: `clamp(3px, 0.6vw, 10px)`,
              background: isDarkRealm
                ? 'rgba(71, 85, 105, 0.5)' // Darker, cool tone for moonlit footprints
                : 'rgba(100, 70, 30, 0.5)', // Muted brown for sunset footprints
              left: Math.random() * 85 + 5 + '%',
              top: Math.random() * 70 + 15 + '%',
              filter: 'blur(clamp(0.3px, 0.1vw, 1px))',
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Shells */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shell-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(3px, 0.8vw, 12px)`,
              height: `clamp(2px, 0.6vw, 8px)`,
              background: isDarkRealm
                ? `hsl(${210 + Math.random() * 30}, 15%, ${70 + Math.random() * 20}%)` // Muted cool colors for moonlit shells
                : `hsl(${30 + Math.random() * 20}, ${20 + Math.random() * 30}%, ${40 + Math.random() * 30}%)`, // More natural, desaturated warm tones for sunset shells
              left: Math.random() * 90 + 5 + '%',
              top: Math.random() * 60 + 20 + '%',
              borderRadius: Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%', // Varied shapes
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Sand Dunes / Beach undulations */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`dune-${i}`}
          className="fixed bottom-0"
          style={{
            zIndex: -6,
            width: `clamp(80px, ${15 + Math.random() * 10}vw, 200px)`,
            height: `clamp(20px, ${4 + Math.random() * 3}vh, 50px)`,
            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
            background: isDarkRealm
              ? `linear-gradient(to top, rgba(55, 65, 81, 0.9) 0%, rgba(71, 85, 105, 0.8) 50%, transparent 100%)` // Darker dunes for moonlit beach
              : `linear-gradient(to top, #55351a 0%, #7b4c2b 50%, transparent 100%)`, // More shadowed, natural brown for sunset dunes
            left: `${i * 25 + (Math.random() * 10 - 5)}vw`,
            transform: `translateX(-50%)`,
            bottom: `clamp(16vh, 22vh, 28vh)`,
            filter: 'blur(clamp(0.5px, 0.2vw, 2px))',
          }}
          animate={{
            y: [0, -5, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Beach Sparkles / Glimmer */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(20vh, 30vh, 35vh)', zIndex: -5 }}>
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
              height: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
              background: isDarkRealm
                ? `hsl(${200 + Math.random() * 40}, ${30 + Math.random() * 40}%, ${75 + Math.random() * 20}%)` // Cool white sparkles for moonlit beach
                : `hsl(${40 + Math.random() * 20}, ${60 + Math.random() * 30}%, ${85 + Math.random() * 10}%)`, // Warm golden sparkles for sunset beach
              left: Math.random() * 100 + '%',
              top: Math.random() * 85 + 5 + '%',
              boxShadow: isDarkRealm
                ? `0 0 clamp(4px, 1vw, 10px) rgba(226, 232, 240, 0.7)`
                : `0 0 clamp(6px, 1.2vw, 12px) rgba(255, 190, 0, 0.8)`, // Golden glow for sunset sparkles
            }}
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;