import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);

  // Trigger lightning effect only when transitioning from day to night
  useEffect(() => {
    if (!prevMode && isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
    setPrevMode(isDarkRealm);
  }, [isDarkRealm, prevMode]);

  return (
    <>
      {/* Lightning Effect (remains the same as it's a specific transition effect) */}
      {showLightning && (
        <>
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0, 0.8, 0, 0.6, 0] }}
            transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }}
            style={{
              background: 'radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 215, 0, 0.8) 30%, transparent 60%)',
              mixBlendMode: 'screen',
              zIndex: -4,
            }}
          />
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.85, 0, 0.9, 0, 0.7, 0] }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }}
            style={{
              background: 'radial-gradient(circle at 60% 70%, rgba(255, 107, 53, 0.95) 0%, rgba(238, 64, 53, 0.6) 30%, transparent 60%)',
              mixBlendMode: 'screen',
              zIndex: -4,
            }}
          />
        </>
      )}

      {/* Main Background Gradient (Sky/Atmosphere) */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -20 }}
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #000015 0%, #030820 20%, #061030 40%, #0a1840 60%, #0f2250 80%, #061030 100%)' // Deeper, more varied night blue
            : 'linear-gradient(180deg, #4a0030 0%, #ff5733 25%, #ff8c1a 50%, #ffc300 75%, #ffe100 100%)',
        }}
        transition={{ duration: 2.5, ease: 'easeInOut' }} // Slightly faster transition
      />

      {/* Atmospheric Glow/Haze */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -19,
          background: isDarkRealm
            ? 'radial-gradient(ellipse at center top, rgba(70, 120, 180, 0.15), rgba(120, 170, 230, 0.1), transparent 75%)' // Subtler, cooler night haze
            : 'radial-gradient(ellipse at center top, rgba(255, 165, 0, 0.25), rgba(255, 69, 0, 0.2), transparent 80%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5], // Adjusted opacity for a more noticeable glow
          scale: [1, 1.03, 1], // Subtle scale for atmospheric movement
        }}
        transition={{
          duration: 7, // Slightly faster for a more dynamic feel
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sun/Moon Orb */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -14,
          width: 'clamp(80px, 15vw, 200px)',
          height: 'clamp(80px, 15vw, 200px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 40% 40%, #e0f0ff 0%, #c0d0e0 30%, #90a0b0 60%, #607080 100%)' // More distinct moon with subtle blue/grey
            : 'radial-gradient(circle at 35% 35%, #ffffff 0%, #ffd23f 20%, #ff6b35 60%, #ee4035 100%)',
          top: 'clamp(10vh, 15vh, 20vh)',
          right: 'clamp(15vw, 20vw, 25vw)',
          filter: 'blur(0.5px)',
          boxShadow: isDarkRealm
            ? '0 0 clamp(30px, 6vw, 60px) rgba(150, 180, 200, 0.7), inset -6px -6px 15px rgba(80, 100, 120, 0.4)' // Sharper moon glow
            : '0 0 clamp(80px, 15vw, 200px) rgba(255, 107, 53, 0.8), 0 0 clamp(150px, 25vw, 400px) rgba(238, 64, 53, 0.5), inset -5px -5px 15px rgba(238, 64, 53, 0.3)',
        }}
        animate={{
          scale: [1, 1.06, 1], // Subtle pulse for both
          opacity: [0.9, 1, 0.9], // Consistent opacity
          rotate: isDarkRealm ? [0, 5, 0] : [0, 360], // Slower rotation for moon, faster for sun
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: {
            duration: isDarkRealm ? 60 : 150, // Adjusted speeds
            repeat: Infinity,
            ease: isDarkRealm ? "easeInOut" : "linear"
          }
        }}
      />

      {/* Outer Halo of Sun/Moon */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -15,
          width: 'clamp(120px, 22vw, 280px)',
          height: 'clamp(120px, 22vw, 280px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 40%, rgba(120, 160, 200, 0.2) 50%, transparent 85%)' // More diffuse night halo
            : 'radial-gradient(circle, transparent 30%, rgba(255, 107, 53, 0.3) 45%, rgba(238, 64, 53, 0.2) 70%, transparent 90%)',
          top: 'clamp(8vh, 12vh, 17vh)',
          right: 'clamp(12vw, 17vw, 22vw)',
        }}
        animate={{
          scale: [1, 1.1, 1], // Subtle pulse for halo
          opacity: [0.6, 0.9, 0.6], // More pronounced halo effect
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Day Mode: Seagulls */}
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

      {/* Night Mode: Stars and Shooting Stars */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -16 }}>
          {/* Stars */}
          {[...Array(150)].map((_, i) => ( // Increased number of stars
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${Math.random() * 0.2 + 0.1}vw, 3px)`, // Smaller, more subtle stars
                height: `clamp(1px, ${Math.random() * 0.2 + 0.1}vw, 3px)`,
                background: `hsl(${200 + Math.random() * 60}, 100%, ${90 + Math.random() * 10}%)`, // Brighter, bluer stars
                left: Math.random() * 100 + '%',
                top: Math.random() * 70 + '%', // Stars appear higher
                boxShadow: '0 0 clamp(3px, 0.8vw, 8px) rgba(255, 255, 255, 0.7)', // Softer glow
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2], // Gentle twinkling
                scale: [0.9, 1.2, 0.9],
              }}
              transition={{
                duration: Math.random() * 2 + 1.5, // Faster twinkling
                repeat: Infinity,
                delay: Math.random() * 3,
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
                boxShadow: '0 0 clamp(10px, 2vw, 20px) #ffffff, 2px 0 clamp(20px, 4vw, 40px) rgba(255, 255, 255, 0.5)', // Adjusted glow
              }}
              animate={{
                x: ['-10%', '110%'],
                y: [`${10 + i * 25}%`, `${35 + i * 25}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.2, // Slightly faster shooting stars
                repeat: Infinity,
                repeatDelay: 15 + Math.random() * 10, // More frequent shooting stars
                delay: i * 8,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Horizon Line / Distant Ocean Glow */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16,
          height: 'clamp(1px, 0.2vw, 3px)',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(120, 150, 180, 0.7) 15%, rgba(180, 200, 220, 0.9) 35%, rgba(200, 220, 240, 0.85) 50%, rgba(180, 200, 220, 0.9) 65%, rgba(120, 150, 180, 0.7) 85%, transparent 100%)' // Cooler, subtle moonlit water
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 180, 0, 0.7) 15%, rgba(255, 200, 50, 0.8) 35%, rgba(255, 220, 100, 0.9) 50%, rgba(255, 200, 50, 0.8) 65%, rgba(255, 180, 0, 0.7) 85%, transparent 100%)',
          top: `calc(100% - clamp(25vh, 32vh, 35vh) - clamp(2px, 0.5vw, 4px) - 20px)`, // Positioned slightly above the land/water base
          filter: 'blur(clamp(0.5px, 0.2vw, 2px))',
          // Adjusted top calculation to ensure it sits above the base elements
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scaleX: [1, 1.05, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Water/Ocean Layer 1 (Darker/Distant) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(25vh, 32vh, 35vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(0, 0, 10, 0.98) 0%,
                rgba(2, 5, 18, 0.9) 15%,
                rgba(5, 12, 30, 0.8) 30%,
                rgba(10, 20, 45, 0.7) 45%,
                rgba(18, 35, 60, 0.6) 60%,
                rgba(30, 50, 80, 0.5) 75%,
                rgba(50, 75, 110, 0.3) 90%,
                transparent 100%
              )
            ` // Darker, bluer water with subtle depth
            : `
              linear-gradient(to top,
                rgba(180, 50, 0, 0.95) 0%,
                rgba(220, 100, 0, 0.9) 25%,
                rgba(255, 150, 0, 0.8) 50%,
                rgba(255, 190, 0, 0.7) 75%,
                rgba(255, 230, 0, 0.4) 90%,
                transparent 100%
              )
            `,
        }}
        animate={{
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Water/Ocean Layer 2 (Mid-ground ripples/patterns) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -12,
          height: 'clamp(20vh, 28vh, 32vh)',
          background: isDarkRealm
            ? `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(30px, 6vw, 80px),
                rgba(10, 25, 45, 0.35) clamp(30px, 6vw, 80px),
                rgba(10, 25, 45, 0.35) clamp(70px, 14vw, 160px),
                transparent clamp(70px, 14vw, 160px),
                transparent clamp(110px, 22vw, 240px)
              )
            ` // Subtle, darker ripples for night
            : `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(40px, 8vw, 100px),
                rgba(255, 120, 0, 0.25) clamp(40px, 8vw, 100px),
                rgba(255, 120, 0, 0.25) clamp(80px, 16vw, 200px)
              )
            `,
        }}
        animate={{
          x: [0, -150, 0], // Reduced x movement for smoother water
          opacity: [0.7, 0.95, 0.7],
        }}
        transition={{
          duration: 10, // Slower movement
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Water/Ocean Layer 3 (Foreground ripples/patterns) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -11,
          height: 'clamp(15vh, 22vh, 28vh)',
          background: isDarkRealm
            ? `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(15px, 3vw, 50px),
                rgba(15, 30, 55, 0.25) clamp(15px, 3vw, 50px),
                rgba(15, 30, 55, 0.25) clamp(35px, 7vw, 100px)
              )
            ` // Darker, more defined foreground ripples for night
            : `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(20px, 4vw, 60px),
                rgba(255, 160, 0, 0.2) clamp(20px, 4vw, 60px),
                rgba(255, 160, 0, 0.2) clamp(40px, 8vw, 120px)
              )
            `,
        }}
        animate={{
          x: [80, -80, 80], // Reduced x movement
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 13, // Slower movement
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Tall Reflection/Light Column (e.g., from moon/sun on water) */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -10,
          width: 'clamp(30px, 6vw, 60px)', // Slightly narrower for moon
          height: 'clamp(100px, 20vh, 200px)', // Shorter for moon
          background: isDarkRealm
            ? `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(150, 180, 200, 0.6) 10%,
                rgba(130, 160, 180, 0.7) 30%,
                rgba(110, 140, 160, 0.6) 50%,
                rgba(80, 100, 120, 0.5) 70%,
                transparent 100%
              )
            ` // Cooler, more diffuse moon reflection
            : `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(255, 140, 0, 0.6) 20%,
                rgba(255, 180, 0, 0.5) 50%,
                rgba(255, 210, 0, 0.4) 80%,
                transparent 100%
              )
            `,
          right: 'clamp(17vw, 22vw, 27vw)',
          bottom: '0',
          filter: 'blur(clamp(0.5px, 0.2vw, 2px))',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scaleY: [1, 1.1, 1], // Less exaggerated pulse
          scaleX: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Foreground Land Mass / Beach Layer 1 (Darker, more opaque) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9,
          height: 'clamp(18vh, 25vh, 30vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(15, 20, 25, 0.98) 0%,
                rgba(25, 30, 35, 0.9) 20%,
                rgba(35, 40, 45, 0.8) 40%,
                rgba(50, 55, 60, 0.7) 60%,
                rgba(65, 70, 75, 0.5) 80%,
                transparent 100%
              )
            ` // Darker, more desaturated land for night
            : `
              linear-gradient(to top,
                #5a3010 0%,
                #7a451a 15%,
                #9a602a 30%,
                #b57b3a 50%,
                #d0964a 70%,
                #e8b05a 85%,
                transparent 100%
              )
            `,
        }}
        animate={{
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 1.5, // Faster transition for solid ground
          ease: "easeInOut"
        }}
      />

      {/* Foreground Land Mass / Beach Layer 2 (Texture/Detail) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -8,
          height: 'clamp(16vh, 22vh, 28vh)',
          background: isDarkRealm
            ? `
              radial-gradient(circle at 25% 30%, rgba(50, 60, 70, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 75% 70%, rgba(40, 50, 60, 0.25) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(60, 70, 80, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 30% 80%, rgba(45, 55, 65, 0.2) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(55, 65, 75, 0.25) 1px, transparent 1px)
            ` // Darker, less vibrant texture for night
            : `
              radial-gradient(circle at 25% 30%, rgba(100, 50, 10, 0.5) 1px, transparent 1px),
              radial-gradient(circle at 75% 70%, rgba(140, 80, 20, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(180, 110, 30, 0.45) 1px, transparent 1px),
              radial-gradient(circle at 30% 80%, rgba(200, 140, 50, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(220, 170, 70, 0.35) 1px, transparent 1px)
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
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Beach Texture / Footprints & Shells */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(15vh, 20vh, 25vh)', zIndex: -6 }}>
        {[...Array(15)].map((_, i) => ( // More footprints
          <motion.div
            key={`footprint-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(6px, 1.2vw, 18px)`,
              height: `clamp(3px, 0.6vw, 10px)`,
              background: isDarkRealm
                ? 'rgba(25, 35, 45, 0.6)' // Darker, more subtle footprints
                : 'rgba(80, 50, 20, 0.6)',
              left: Math.random() * 85 + 5 + '%',
              top: Math.random() * 70 + 15 + '%',
              filter: 'blur(clamp(0.3px, 0.1vw, 1px))',
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3], // Subtle fading
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {[...Array(10)].map((_, i) => ( // More shells
          <motion.div
            key={`shell-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(3px, 0.8vw, 12px)`,
              height: `clamp(2px, 0.6vw, 8px)`,
              background: isDarkRealm
                ? `hsl(${210 + Math.random() * 30}, 10%, ${40 + Math.random() * 15}%)` // Darker, desaturated shells
                : `hsl(${30 + Math.random() * 20}, ${30 + Math.random() * 30}%, ${50 + Math.random() * 25}%)`,
              left: Math.random() * 90 + 5 + '%',
              top: Math.random() * 60 + 20 + '%',
              borderRadius: Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%',
            }}
            animate={{
              opacity: [0.5, 0.9, 0.5], // Subtle fading
              scale: [0.9, 1.05, 0.9],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Distant Dunes/Hills */}
      {[...Array(5)].map((_, i) => ( // More dunes for better visual variety
        <motion.div
          key={`dune-${i}`}
          className="fixed bottom-0"
          style={{
            zIndex: -5,
            width: `clamp(80px, ${15 + Math.random() * 10}vw, 200px)`,
            height: `clamp(20px, ${4 + Math.random() * 3}vh, 50px)`,
            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
            background: isDarkRealm
              ? `linear-gradient(to top, rgba(10, 15, 20, 0.8) 0%, rgba(20, 30, 35, 0.7) 50%, transparent 100%)` // Darker, more silhouette-like for night
              : `linear-gradient(to top, #45250a 0%, #6a3a15 50%, transparent 100%)`,
            left: `${i * 20 + (Math.random() * 10 - 5)}vw`, // Adjusted distribution
            transform: `translateX(-50%)`,
            bottom: `clamp(16vh, 22vh, 28vh)`, // Same height as land layer 2
            filter: 'blur(clamp(0.5px, 0.2vw, 2px))',
          }}
          animate={{
            y: [0, -3, 0], // Subtle bobbing
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 9 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Beach Sparkles / Luminescence */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(20vh, 30vh, 35vh)', zIndex: -4 }}>
        {[...Array(50)].map((_, i) => ( // Increased number of sparkles
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${Math.random() * 0.3 + 0.1}vw, 4px)`, // Smaller, more subtle sparkles
              height: `clamp(1px, ${Math.random() * 0.3 + 0.1}vw, 4px)`,
              background: isDarkRealm
                ? `hsl(${200 + Math.random() * 40}, ${30 + Math.random() * 20}%, ${90 + Math.random() * 5}%)` // Cooler, brighter for night luminescence
                : `hsl(${40 + Math.random() * 20}, ${70 + Math.random() * 20}%, ${90 + Math.random() * 5}%)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 85 + 5 + '%',
              boxShadow: isDarkRealm
                ? `0 0 clamp(3px, 0.8vw, 8px) rgba(200, 220, 255, 0.8)` // Softer, bluer glow
                : `0 0 clamp(6px, 1.2vw, 12px) rgba(255, 190, 0, 0.9)`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2], // Gentle flickering
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;