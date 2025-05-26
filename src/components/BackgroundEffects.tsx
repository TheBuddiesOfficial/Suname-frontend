import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);

  useEffect(() => {
    // Trigger lightning effect when switching realms
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1200); // Duration of lightning animation
      setPrevMode(isDarkRealm);
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  return (
    <>
      {/* Lightning transition effect - Appears briefly during realm switch */}
      {showLightning && (
        <>
          <motion.div
            className="fixed inset-0"
            style={{
              // Radial gradient for a bright, central flash
              background: 'radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 215, 0, 0.7) 30%, transparent 60%)',
              mixBlendMode: 'screen', // Blends with background for a glowing effect
              zIndex: -4, // Closest to the foreground for the transition
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0, 0.7, 0, 0.5, 0] }} // Flashing animation
            transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }}
          />
          <motion.div
            className="fixed inset-0"
            style={{
              // Secondary flash for added depth
              background: 'radial-gradient(circle at 60% 70%, rgba(255, 107, 53, 0.9) 0%, rgba(238, 64, 53, 0.5) 30%, transparent 60%)',
              mixBlendMode: 'screen',
              zIndex: -4,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0, 0.9, 0, 0.6, 0] }} // Offset flashing animation
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }}
          />
        </>
      )}

      {/* Main sky gradient - Changes based on realm */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -20 }} // Farthest back
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #0a0e1a 0%, #1a1e2e 20%, #2d3748 40%, #374151 60%, #4a5568 80%, #2d3748 100%)' // Dark, deep blues/greys
            : 'linear-gradient(180deg, #ff6b35 0%, #f7931e 25%, #ffd23f 50%, #ff8c42 75%, #ee4035 100%)', // Vibrant sunset colors
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      {/* Atmospheric glow - Subtle pulsating light */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -19, // Just in front of the sky
          background: isDarkRealm
            ? 'radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.15), rgba(147, 197, 253, 0.1), transparent 70%)' // Cool blue glow for dark mode
            : 'radial-gradient(ellipse at center top, rgba(255, 215, 0, 0.3), rgba(255, 107, 53, 0.2), transparent 80%)', // Warm glow for light mode
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6], // Pulsating opacity
          scale: [1, 1.1, 1], // Subtle scale animation
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sun/Moon - Fully Responsive and animated */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -17, // In front of atmospheric glow
          width: 'clamp(80px, 15vw, 200px)', // Responsive width
          height: 'clamp(80px, 15vw, 200px)', // Responsive height
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 30%, #f8fafc 5%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)' // Moon gradient
            : 'radial-gradient(circle at 35% 35%, #ffffff 0%, #ffd23f 20%, #ff6b35 60%, #ee4035 100%)', // Sun gradient
          top: 'clamp(10vh, 15vh, 20vh)', // Responsive vertical position
          right: 'clamp(15vw, 20vw, 25vw)', // Responsive horizontal position
          filter: isDarkRealm ? 'blur(1px)' : 'blur(0.5px)', // Subtle blur for moon
          boxShadow: isDarkRealm
            ? '0 0 clamp(40px, 8vw, 80px) rgba(248, 250, 252, 0.6), inset -8px -8px 20px rgba(148, 163, 184, 0.4)' // Moon glow
            : '0 0 clamp(80px, 15vw, 200px) rgba(255, 107, 53, 0.8), 0 0 clamp(150px, 25vw, 400px) rgba(238, 64, 53, 0.5), inset -5px -5px 15px rgba(238, 64, 53, 0.3)', // Sun glow
        }}
        animate={{
          scale: [1, 1.08, 1], // Subtle pulsating scale
          opacity: [0.85, 1, 0.85], // Subtle pulsating opacity
          rotate: isDarkRealm ? [0, 8, 0] : [0, 360], // Moon rocks slightly, Sun rotates
        }}
        transition={{
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: {
            duration: isDarkRealm ? 50 : 200, // Slower rotation for moon
            repeat: Infinity,
            ease: isDarkRealm ? "easeInOut" : "linear"
          }
        }}
      />

      {/* Sun/Moon outer glow - Responsive and animated */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -18, // Behind sun/moon
          width: 'clamp(120px, 22vw, 280px)', // Larger responsive size
          height: 'clamp(120px, 22vw, 280px)', // Larger responsive size
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 40%, rgba(248, 250, 252, 0.08) 50%, transparent 80%)' // Faint moon halo
            : 'radial-gradient(circle, transparent 30%, rgba(255, 107, 53, 0.25) 45%, rgba(238, 64, 53, 0.15) 70%, transparent 90%)', // Sun halo
          top: 'clamp(8vh, 12vh, 17vh)', // Responsive position relative to sun/moon
          right: 'clamp(12vw, 17vw, 22vw)', // Responsive position relative to sun/moon
        }}
        animate={{
          scale: [1, 1.15, 1], // Pulsating scale
          opacity: [0.5, 0.8, 0.5], // Pulsating opacity
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Seagulls for light mode - Responsive and animated */}
      {!isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -16 }}> {/* Behind horizon */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 60 + 10 + '%', // Random horizontal start position
                top: Math.random() * 30 + 20 + '%', // Random vertical start position
                fontSize: 'clamp(10px, 2.5vw, 28px)', // Responsive size
                color: 'rgba(0, 0, 0, 0.6)',
                transform: 'scaleX(-1)', // Flip horizontally for varied look
              }}
              animate={{
                x: [0, 200 + Math.random() * 300, 400 + Math.random() * 400], // Horizontal flight path
                y: [0, -40 + Math.random() * 80, -30 + Math.random() * 60], // Vertical bobbing
                opacity: [0, 1, 0], // Fade in/out
              }}
              transition={{
                duration: 25 + Math.random() * 15, // Varied flight duration
                repeat: Infinity,
                delay: Math.random() * 12, // Staggered entry
                ease: "linear"
              }}
            >
              ︶ {/* Simple seagull shape */}
            </motion.div>
          ))}
        </div>
      )}

      {/* Enhanced Stars for dark mode - Responsive and animated */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -16 }}> {/* Behind horizon */}
          {[...Array(120)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${Math.random() * 0.3 + 0.15}vw, 4px)`, // Responsive star size
                height: `clamp(1px, ${Math.random() * 0.3 + 0.15}vw, 4px)`, // Responsive star size
                background: `hsl(${200 + Math.random() * 60}, 100%, ${80 + Math.random() * 20}%)`, // Blueish-white stars
                left: Math.random() * 100 + '%', // Random horizontal position
                top: Math.random() * 60 + '%', // Random vertical position (upper part of sky)
                boxShadow: '0 0 clamp(4px, 1vw, 10px) rgba(255, 255, 255, 0.8)', // Glowing effect
              }}
              animate={{
                opacity: [0.3, 1, 0.3], // Twinkling effect
                scale: [0.8, 1.4, 0.8], // Subtle size change
              }}
              transition={{
                duration: Math.random() * 3 + 2, // Varied twinkling speed
                repeat: Infinity,
                delay: Math.random() * 4, // Staggered twinkling
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Multiple shooting stars - Animated */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 'clamp(2px, 0.4vw, 5px)', // Responsive size
                height: 'clamp(2px, 0.4vw, 5px)', // Responsive size
                background: 'white',
                left: '-10%', // Start off-screen left
                top: `${10 + i * 25}%`, // Vary vertical start position
                boxShadow: '0 0 clamp(15px, 3vw, 30px) #ffffff, 2px 0 clamp(25px, 5vw, 50px) rgba(255, 255, 255, 0.6)', // Trail effect
              }}
              animate={{
                x: ['-10%', '110%'], // Traverse screen horizontally
                y: [`${10 + i * 25}%`, `${35 + i * 25}%`], // Diagonal path
                opacity: [0, 1, 1, 0], // Fade in, stay, fade out
              }}
              transition={{
                duration: 2.5, // Fast movement
                repeat: Infinity,
                repeatDelay: 20 + Math.random() * 15, // Long delay between appearances
                delay: i * 10, // Staggered appearance
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Horizon line - Responsive and animated */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -15, // In front of stars/seagulls
          height: 'clamp(1px, 0.2vw, 3px)', // Responsive thickness
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.6) 20%, rgba(203, 213, 225, 0.8) 50%, rgba(148, 163, 184, 0.6) 80%, transparent 100%)' // Subtle grey for dark mode
            : 'linear-gradient(90deg, transparent 0%, rgba(238, 64, 53, 0.5) 20%, rgba(255, 107, 53, 0.7) 50%, rgba(238, 64, 53, 0.5) 80%, transparent 100%)', // Warm colors for light mode
          top: 'clamp(65%, 68%, 70%)', // Responsive vertical position
          boxShadow: isDarkRealm
            ? '0 0 clamp(8px, 2vw, 15px) rgba(148, 163, 184, 0.4)'
            : '0 0 clamp(10px, 2vw, 20px) rgba(238, 64, 53, 0.4)', // Subtle glow
        }}
        animate={{
          opacity: [0.6, 1, 0.6], // Pulsating opacity
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* COMPLETELY REDESIGNED REALISTIC OCEAN/WATER for Dark Mode - Multiple layers for depth */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14, // Behind the beach, in front of horizon
          height: 'clamp(25vh, 32vh, 35vh)', // Responsive height
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(30, 58, 138, 0.95) 0%, /* Deepest blue at the bottom */
                rgba(37, 99, 235, 0.85) 15%,
                rgba(59, 130, 246, 0.75) 30%,
                rgba(96, 165, 250, 0.65) 45%,
                rgba(147, 197, 253, 0.55) 60%,
                rgba(186, 230, 253, 0.4) 75%,
                rgba(224, 242, 254, 0.25) 90%, /* Lighter near the top (horizon) */
                transparent 100%
              )
            `
            : `
              linear-gradient(to top,
                rgba(238, 64, 53, 0.8) 0%,
                rgba(255, 107, 53, 0.6) 25%,
                rgba(247, 147, 30, 0.5) 50%,
                rgba(255, 210, 63, 0.4) 75%,
                rgba(255, 251, 235, 0.2) 90%,
                transparent 100%
              )
            `,
        }}
        animate={{
          opacity: [0.9, 1, 0.9], // Subtle pulsating opacity
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Realistic water wave patterns - First layer for depth */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13, // In front of main ocean body
          height: 'clamp(20vh, 28vh, 32vh)', // Responsive height
          background: isDarkRealm
            ? `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(40px, 8vw, 100px),
                rgba(59, 130, 246, 0.3) clamp(40px, 8vw, 100px),
                rgba(59, 130, 246, 0.3) clamp(80px, 16vw, 200px),
                transparent clamp(80px, 16vw, 200px),
                transparent clamp(120px, 24vw, 300px)
              )
            ` // Horizontal wave pattern for dark mode
            : `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(40px, 8vw, 100px),
                rgba(255, 107, 53, 0.25) clamp(40px, 8vw, 100px),
                rgba(255, 107, 53, 0.25) clamp(80px, 16vw, 200px)
              )
            `, // Horizontal wave pattern for light mode
        }}
        animate={{
          x: [0, -200, 0], // Horizontal wave movement
          opacity: [0.7, 1, 0.7], // Pulsating opacity
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
          zIndex: -12, // In front of previous wave layer
          height: 'clamp(15vh, 22vh, 28vh)', // Responsive height
          background: isDarkRealm
            ? `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(20px, 4vw, 60px),
                rgba(96, 165, 250, 0.2) clamp(20px, 4vw, 60px),
                rgba(96, 165, 250, 0.2) clamp(40px, 8vw, 120px)
              )
            ` // Diagonal wave pattern for dark mode
            : `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(20px, 4vw, 60px),
                rgba(247, 147, 30, 0.2) clamp(20px, 4vw, 60px),
                rgba(247, 147, 30, 0.2) clamp(40px, 8vw, 120px)
              )
            `, // Diagonal wave pattern for light mode
        }}
        animate={{
          x: [100, -100, 100], // Diagonal wave movement
          opacity: [0.5, 0.8, 0.5], // Pulsating opacity
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Moonlight/Sunlight reflection on water - Enhanced and responsive */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -11, // In front of wave layers
          width: 'clamp(40px, 8vw, 80px)', // Responsive width
          height: 'clamp(120px, 25vh, 250px)', // Responsive height
          background: isDarkRealm
            ? `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(248, 250, 252, 0.4) 20%,
                rgba(226, 232, 240, 0.6) 40%,
                rgba(203, 213, 225, 0.5) 60%,
                rgba(148, 163, 184, 0.4) 80%,
                transparent 100%
              )
            ` // Moonlight reflection
            : `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(255, 107, 53, 0.5) 20%,
                rgba(238, 64, 53, 0.4) 50%,
                rgba(255, 107, 53, 0.3) 80%,
                transparent 100%
              )
            `, // Sunlight reflection
          right: 'clamp(17vw, 22vw, 27vw)', // Position aligned with sun/moon
          bottom: '0',
          filter: 'blur(clamp(1px, 0.5vw, 3px))', // Soft blur for realistic glow
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6], // Pulsating opacity
          scaleY: [1, 1.15, 1], // Subtle vertical stretch
          scaleX: [1, 1.1, 1], // Subtle horizontal stretch
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced Beach/Shore - Multiple responsive layers for depth */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -10, // In front of ocean
          height: 'clamp(18vh, 25vh, 30vh)', // Responsive height
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(71, 85, 105, 0.95) 0%, /* Darker sand at bottom */
                rgba(100, 116, 139, 0.85) 20%,
                rgba(148, 163, 184, 0.75) 40%,
                rgba(203, 213, 225, 0.6) 60%,
                rgba(241, 245, 249, 0.4) 80%, /* Lighter sand near water */
                transparent 100%
              )
            `
            : `
              linear-gradient(to top,
                rgba(180, 83, 9, 1) 0%,
                rgba(194, 146, 91, 0.95) 15%,
                rgba(217, 177, 130, 0.9) 30%,
                rgba(244, 206, 167, 0.8) 50%,
                rgba(254, 235, 200, 0.7) 70%,
                rgba(255, 251, 235, 0.5) 85%,
                transparent 100%
              )
            `,
        }}
      />

      {/* Beach sand texture - Responsive grain pattern */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9, // In front of base beach layer
          height: 'clamp(16vh, 22vh, 28vh)', // Responsive height
          background: isDarkRealm
            ? `
              radial-gradient(circle at 25% 30%, rgba(203, 213, 225, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 75% 70%, rgba(148, 163, 184, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(226, 232, 240, 0.35) 1px, transparent 1px),
              radial-gradient(circle at 30% 80%, rgba(156, 163, 175, 0.25) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(203, 213, 225, 0.3) 1px, transparent 1px)
            ` // Subtle grey/blue grains for dark mode
            : `
              radial-gradient(circle at 25% 30%, rgba(180, 83, 9, 0.5) 1px, transparent 1px),
              radial-gradient(circle at 75% 70%, rgba(217, 119, 6, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.45) 1px, transparent 1px),
              radial-gradient(circle at 30% 80%, rgba(251, 191, 36, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(254, 215, 170, 0.35) 1px, transparent 1px)
            `, // Warm, sandy grains for light mode
          backgroundSize: `
            clamp(25px, 5vw, 60px) clamp(25px, 5vw, 60px),
            clamp(35px, 7vw, 80px) clamp(35px, 7vw, 80px),
            clamp(30px, 6vw, 70px) clamp(30px, 6vw, 70px),
            clamp(40px, 8vw, 90px) clamp(40px, 8vw, 90px),
            clamp(28px, 5.5vw, 65px) clamp(28px, 5.5vw, 65px)
          `, // Responsive grain size
        }}
        animate={{
          opacity: [0.8, 1, 0.8], // Subtle pulsating opacity
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Beach wave foam line - Enhanced and responsive */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -8, // In front of sand texture
          height: 'clamp(2px, 0.5vw, 4px)', // Responsive thickness
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(241, 245, 249, 0.9) 15%, rgba(248, 250, 252, 1) 35%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 250, 252, 1) 65%, rgba(241, 245, 249, 0.9) 85%, transparent 100%)' // White/light grey foam
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 15%, rgba(254, 249, 195, 0.9) 35%, rgba(255, 255, 255, 1) 50%, rgba(254, 249, 195, 0.9) 65%, rgba(255, 255, 255, 0.95) 85%, transparent 100%)', // White/yellow foam
          top: `calc(100% - clamp(18vh, 25vh, 30vh))`, // Position at the top of the beach layer
          filter: 'blur(clamp(0.5px, 0.2vw, 2px))', // Soft blur
        }}
        animate={{
          opacity: [0.7, 1, 0.7], // Pulsating opacity
          scaleX: [1, 1.08, 1], // Subtle horizontal stretch
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced beach details (footprints, shells/rocks) - Responsive */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(15vh, 20vh, 25vh)', zIndex: -7 }}> {/* In front of foam line */}
        {/* Footprints */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`footprint-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(6px, 1.2vw, 18px)`, // Responsive size
              height: `clamp(3px, 0.6vw, 10px)`, // Responsive size
              background: isDarkRealm
                ? 'rgba(71, 85, 105, 0.5)' // Darker grey for dark mode footprints
                : 'rgba(180, 83, 9, 0.4)', // Brownish for light mode footprints
              left: Math.random() * 85 + 5 + '%', // Random horizontal position
              top: Math.random() * 70 + 15 + '%', // Random vertical position within beach area
              filter: 'blur(clamp(0.3px, 0.1vw, 1px))', // Subtle blur
              transform: `rotate(${Math.random() * 30 - 15}deg)`, // Random rotation
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4], // Subtle pulsating opacity
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: Math.random() * 6, // Staggered appearance
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Shell/rock details */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shell-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(3px, 0.8vw, 12px)`, // Responsive size
              height: `clamp(2px, 0.6vw, 8px)`, // Responsive size
              background: isDarkRealm
                ? `hsl(${210 + Math.random() * 30}, 15%, ${70 + Math.random() * 20}%)` // Grey/blueish for dark mode
                : `hsl(${25 + Math.random() * 15}, ${40 + Math.random() * 30}%, ${60 + Math.random() * 25}%)`, // Earthy tones for light mode
              left: Math.random() * 90 + 5 + '%', // Random horizontal position
              top: Math.random() * 60 + 20 + '%', // Random vertical position within beach area
              borderRadius: Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%', // Varied shapes
            }}
            animate={{
              opacity: [0.6, 1, 0.6], // Subtle pulsating opacity
              scale: [0.8, 1.1, 0.8], // Subtle size change
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: Math.random() * 4, // Staggered appearance
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Responsive beach dunes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`dune-${i}`}
          className="fixed bottom-0"
          style={{
            zIndex: -6, // In front of beach details
            width: `clamp(80px, ${15 + Math.random() * 10}vw, 200px)`, // Varying responsive width
            height: `clamp(20px, ${4 + Math.random() * 3}vh, 50px)`, // Varying responsive height
            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%', // Dune shape
            background: isDarkRealm
              ? `linear-gradient(to top, rgba(55, 65, 81, 0.9) 0%, rgba(71, 85, 105, 0.8) 50%, transparent 100%)` // Darker grey for dark mode dunes
              : `linear-gradient(to top, rgba(161, 98, 7, 0.9) 0%, rgba(202, 138, 4, 0.8) 50%, transparent 100%)`, // Brownish for light mode dunes
            left: `${i * 25 + (Math.random() * 10 - 5)}vw`, // Distribute horizontally with slight randomness
            transform: `translateX(-50%)`, // Center the dune based on its left position
            bottom: `clamp(16vh, 22vh, 28vh)`, // Position just above the sand texture
            filter: 'blur(clamp(0.5px, 0.2vw, 2px))', // Soften edges
          }}
          animate={{
            y: [0, -5, 0], // Subtle vertical movement
            opacity: [0.7, 1, 0.7], // Subtle pulsating opacity
          }}
          transition={{
            duration: 8 + Math.random() * 5, // Varied animation duration
            repeat: Infinity,
            delay: i * 2, // Staggered entry
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Enhanced sparkles (on beach/water edge) - Fully responsive */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(20vh, 30vh, 35vh)', zIndex: -5 }}> {/* Closest to foreground, behind lightning */}
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`, // Responsive sparkle size
              height: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`, // Responsive sparkle size
              background: isDarkRealm
                ? `hsl(${200 + Math.random() * 40}, ${30 + Math.random() * 40}%, ${75 + Math.random() * 20}%)` // Blueish/white sparkles
                : `hsl(${35 + Math.random() * 25}, ${50 + Math.random() * 40}%, ${80 + Math.random() * 15}%)`, // Yellowish/orange sparkles
              left: Math.random() * 100 + '%', // Random horizontal position
              top: Math.random() * 85 + 5 + '%', // Random vertical position within beach/water area
              boxShadow: isDarkRealm
                ? `0 0 clamp(4px, 1vw, 10px) rgba(226, 232, 240, 0.7)` // White/blue glow
                : `0 0 clamp(6px, 1.2vw, 12px) rgba(251, 191, 36, 0.8)`, // Yellow/orange glow
            }}
            animate={{
              opacity: [0.3, 0.9, 0.3], // Twinkling effect
              scale: [0.7, 1.3, 0.7], // Subtle size change
            }}
            transition={{
              duration: Math.random() * 4 + 3, // Varied twinkling speed
              repeat: Infinity,
              delay: Math.random() * 5, // Staggered twinkling
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;
