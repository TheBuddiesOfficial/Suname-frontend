import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [prevMode, setPrevMode] = useState(isDarkRealm);

  // This effect simply updates the previous mode state.
  // The lightning effect has been removed as per your request.
  useEffect(() => {
    setPrevMode(isDarkRealm);
  }, [isDarkRealm]);

  return (
    <>
      {/* Higher Resolution Background Gradient (Sky/Atmosphere) */}
      {/* This layer sets the primary sky color and gradient for day and night.
          Colors are chosen for a more nuanced and vibrant appearance to enhance resolution feel. */}
      <motion.div
        className="fixed inset-0" // Stays fixed and covers the entire viewport
        style={{ zIndex: -21 }} // Lowest z-index to be at the very back
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #01030a 0%, #080f1a 20%, #101a28 40%, #1d2b3f 60%, #293a4f 80%, #101a28 100%)' // Deeper, more subtle night blues/grays
            : 'linear-gradient(180deg, #f78c00 0%, #e06c00 25%, #cc5500 50%, #fbc54c 75%, #fbe76a 100%)', // Richer, more natural warm day colors
        }}
        transition={{ duration: 3.5, ease: 'easeInOut' }} // Slightly longer for smoother transition
      />

      {/* Smoother Atmospheric Haze/Glow Layer */}
      {/* Adds a subtle, pulsating atmospheric glow based on the realm.
          Opacities and scales are fine-tuned for a smoother, more realistic feel. */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -20, // Slightly above the main background
          background: isDarkRealm
            ? 'radial-gradient(ellipse at center top, rgba(80, 130, 190, 0.1), rgba(110, 160, 220, 0.06), transparent 80%)' // Finer, cool blue night haze
            : 'radial-gradient(ellipse at center top, rgba(250, 130, 50, 0.25), rgba(252, 170, 90, 0.15), transparent 90%)', // Subtler, warm day haze
        }}
        animate={{
          opacity: [0.35, 0.75, 0.35], // Pulsating opacity for a subtle breathing effect
          scale: [1, 1.015, 1], // Very gentle scaling for atmospheric movement
        }}
        transition={{
          duration: 10, // Slow, continuous animation
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Responsive Sun/Moon Orb - Smaller and Consistent */}
      {/* This element represents either the sun or the moon, now with responsive and smaller sizing.
          Colors and shadows are refined for a more realistic appearance. */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -18, // Above sky, below foreground elements
          width: 'clamp(30px, 5vw, 50px)', // Smaller and responsive size
          height: 'clamp(30px, 5vw, 50px)',
          borderRadius: '50%', // Makes it a perfect circle
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 30%, #f0f8ff 15%, #e0f2f7 50%, #b3e5fc 85%, #81d4fa 100%)' // Refined luminous, cool blue moon
            : 'radial-gradient(circle at 35% 35%, #fffde7 15%, #fff9c4 50%, #fff59d 85%, #ffee58 100%)', // Refined bright, warm sun
          top: 'clamp(5vh, 7vw, 40px)', // Adjusted top position, responsive
          right: 'clamp(5vw, 7vw, 40px)', // Adjusted right position, responsive
          filter: isDarkRealm ? 'blur(0.4px)' : 'blur(0.2px)', // Subtle blur for glow effect
          boxShadow: isDarkRealm
            ? '0 0 clamp(15px, 2vw, 25px) rgba(224, 247, 250, 0.5), inset -2px -2px 8px rgba(179, 229, 252, 0.2)' // Stronger, bluer moon glow
            : '0 0 clamp(20px, 3vw, 40px) rgba(255, 245, 157, 0.6), 0 0 clamp(30px, 4vw, 60px) rgba(255, 235, 59, 0.3), inset -1px -1px 6px rgba(255, 214, 0, 0.15)', // Intense, warm sun glow
        }}
        animate={{
          scale: [1, 1.03, 1], // Gentle pulse effect
          opacity: [0.92, 1, 0.92], // Subtle opacity fluctuation
          rotate: isDarkRealm ? [0, 3, 0] : [0, 360], // Moon rocks slightly, sun rotates fully
        }}
        transition={{
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: isDarkRealm ? 90 : 300, // Different rotation speeds for moon/sun
            repeat: Infinity,
            ease: isDarkRealm ? 'easeInOut' : 'linear'
          }
        }}
      />

      {/* Smoother Sun/Moon Outer Halo */}
      {/* A larger, more diffuse halo around the main orb, also responsive. */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -19, // Below the main orb
          width: 'clamp(50px, 8vw, 80px)', // Adjusted halo size, responsive
          height: 'clamp(50px, 8vw, 80px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 55%, rgba(224, 231, 255, 0.06) 65%, transparent 95%)' // Softer, cool night halo
            : 'radial-gradient(circle, transparent 45%, rgba(251, 146, 60, 0.15) 60%, rgba(253, 186, 116, 0.08) 80%, transparent 98%)', // Softer, warm day halo
          top: `calc(clamp(5vh, 7vw, 40px) - clamp(10px, 1.5vw, 15px))`, // Adjust position based on orb
          right: `calc(clamp(5vw, 7vw, 40px) - clamp(10px, 1.5vw, 15px))`,
        }}
        animate={{
          scale: [1, 1.08, 1], // Larger pulse for halo
          opacity: [0.35, 0.65, 0.35], // More noticeable opacity fluctuation
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Seagulls (Day Mode Only) */}
      {/* Animated seagull emojis for daytime realism. Reduced count for smoother performance. */}
      {!isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}> {/* Above horizon, below sun/moon */}
          {[...Array(3)].map((_, i) => ( // Reduced number for even smoother feel
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 70 + 15 + '%', // Random horizontal starting position
                top: Math.random() * 40 + 15 + '%', // Random vertical starting position
                fontSize: 'clamp(8px, 1.8vw, 20px)', // Slightly smaller, responsive size
                color: 'rgba(0, 0, 0, 0.5)', // Lighter dark gray color
                transform: 'scaleX(-1)', // Flips the emoji horizontally
              }}
              animate={{
                x: [0, 150 + Math.random() * 250, 300 + Math.random() * 350], // Flies across the screen
                y: [0, -25 + Math.random() * 50, -15 + Math.random() * 30], // Gentle up/down movement
                opacity: [0, 0.7, 0], // Smoother fade in and out
              }}
              transition={{
                duration: 40 + Math.random() * 25, // Slower, smoother flight
                repeat: Infinity, // Continuous flight
                delay: Math.random() * 20, // Staggered start times
                ease: 'linear' // Consistent speed
              }}
            >
              ︶ {/* Seagull emoji */}
            </motion.div>
          ))}
        </div>
      )}

      {/* Stars and Shooting Stars (Night Mode Only) */}
      {/* Animated stars and shooting stars for nighttime realism. Reduced count for smoother performance. */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}> {/* Above horizon, below sun/moon */}
          {/* Stars */}
          {[...Array(100)].map((_, i) => ( // Slightly reduced for performance, still dense
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(0.8px, ${Math.random() * 0.2 + 0.1}vw, 2.5px)`, // Smaller stars, responsive
                height: `clamp(0.8px, ${Math.random() * 0.2 + 0.1}vw, 2.5px)`,
                background: `hsl(${200 + Math.random() * 30}, 70%, ${85 + Math.random() * 10}%)`, // Softer, cool glow
                left: Math.random() * 100 + '%', // Random horizontal position
                top: Math.random() * 75 + '%', // Random vertical position (stars slightly lower)
                boxShadow: '0 0 clamp(1.5px, 0.3vw, 4px) rgba(255, 255, 255, 0.6)', // Softer glow
              }}
              animate={{
                opacity: [0.15, 0.6, 0.15], // Gentler twinkling effect
                scale: [0.85, 1.15, 0.85], // Subtle size change
              }}
              transition={{
                duration: Math.random() * 5 + 4, // Varied, gentler twinkling speed
                repeat: Infinity,
                delay: Math.random() * 6, // Staggered twinkling
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* Shooting Stars */}
          {[...Array(1)].map((_, i) => ( // Only one shooting star for less distraction
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 'clamp(1.2px, 0.25vw, 3px)', // Smaller, responsive
                height: 'clamp(1.2px, 0.25vw, 3px)',
                background: 'rgba(255, 255, 255, 0.7)', // Less intense white
                left: '-5%', // Starts off-screen left
                top: `${10 + i * 40}%`, // Staggered vertical starting positions
                boxShadow: '0 0 clamp(8px, 1.2vw, 12px) rgba(255, 255, 255, 0.4), 1px 0 clamp(12px, 1.8vw, 18px) rgba(255, 255, 255, 0.2)', // Softer tail effect
              }}
              animate={{
                x: ['-5%', '105%'], // Travels across the screen
                y: [`${10 + i * 40}%`, `${30 + i * 40}%`], // Descends slightly
                opacity: [0, 0.6, 0.6, 0], // Smoother appearance and disappearance
              }}
              transition={{
                duration: 4, // Slightly longer travel time
                repeat: Infinity,
                repeatDelay: 30 + Math.random() * 20, // Longer delay between appearances
                delay: i * 15, // Staggered start
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}

      {/* Smoother Horizon Line / Distant Ocean Glow */}
      {/* Creates a subtle line at the horizon, mimicking light reflection on distant water. */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16, // Above water layers, below sun/moon
          height: 'clamp(0.8px, 0.1vw, 1.5px)', // Even thinner line, responsive
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(160, 200, 230, 0.4) 20%, rgba(200, 230, 250, 0.6) 50%, rgba(160, 200, 230, 0.4) 80%, transparent 100%)' // Subtler, cool blue night horizon
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 245, 0.6) 20%, rgba(255, 240, 220, 0.7) 50%, rgba(255, 255, 245, 0.6) 80%, transparent 100%)', // Subtler, warm day horizon
          top: `calc(100% - clamp(22vh, 28vh, 32vh))`, // Slightly higher, positioned relative to bottom elements
          filter: 'blur(clamp(0.3px, 0.08vw, 1px))', // Finer blur
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4], // Pulsating opacity
          scaleX: [1, 1.02, 1], // Subtle horizontal stretch
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Realistic Ocean/Water - Smoother and Higher Detail */}
      {/* This is the deepest layer of the water, defining its primary color and depth. */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -15, // Above background, below horizon and other water layers
          height: 'clamp(22vh, 28vh, 32vh)', // Covers a significant portion of the bottom screen
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
            ` // Deeper, more nuanced night blues/purples for water
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
            `, // Warmer, more vibrant oranges/yellows for day water
        }}
        animate={{
          opacity: [0.9, 1, 0.9], // Subtle opacity pulse
        }}
        transition={{
          duration: 12, // Slow, continuous animation
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Smoother Water Wave Patterns - First Layer */}
      {/* Adds horizontal wave patterns that move to simulate water flow. */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14, // Above the main water body
          height: 'clamp(16vh, 22vh, 26vh)', // Responsive height
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
            ` // Subtle, cool night ripples
            : `
              repeating-linear-gradient(90deg,
                transparent,
                transparent clamp(45px, 7vw, 90px),
                rgba(255, 120, 50, 0.18) clamp(45px, 7vw, 90px),
                rgba(255, 120, 50, 0.18) clamp(90px, 14vw, 180px)
              )
            `, // Subtle, warm day ripples
        }}
        animate={{
          x: [0, -150, 0], // Slightly reduced movement for more smoothness
          opacity: [0.55, 0.85, 0.55], // Pulsating opacity
        }}
        transition={{
          duration: 18, // Slower movement for larger waves
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Smoother Additional Wave Layer */}
      {/* Adds diagonal wave patterns for a more complex water surface. */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13, // Above previous wave layer
          height: 'clamp(12vh, 16vh, 20vh)', // Responsive height
          background: isDarkRealm
            ? `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(18px, 2.5vw, 40px),
                rgba(60, 90, 150, 0.15) clamp(18px, 2.5vw, 40px),
                rgba(60, 90, 150, 0.15) clamp(45px, 6.5vw, 90px)
              )
            ` // Finer, cool night ripples
            : `
              repeating-linear-gradient(45deg,
                transparent,
                transparent clamp(22px, 3.5vw, 50px),
                rgba(255, 150, 70, 0.1) clamp(22px, 3.5vw, 50px),
                rgba(255, 150, 70, 0.1) clamp(50px, 7.5vw, 110px)
              )
            `, // Finer, warm day ripples
        }}
        animate={{
          x: [70, -70, 70], // Slightly reduced movement
          opacity: [0.3, 0.6, 0.3], // Pulsating opacity
        }}
        transition={{
          duration: 22, // Slower movement
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Smoother Moonlight/Sunlight Reflection on Water */}
      {/* A vertical column of light reflecting the moon/sun on the water surface. */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -12, // Above water layers
          width: 'clamp(20px, 3vw, 30px)', // Smaller reflection, responsive
          height: 'clamp(60px, 10vh, 100px)', // Responsive height
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
            ` // Subtle, cool moon reflection
            : `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(255, 140, 60, 0.25) 20%,
                rgba(255, 170, 80, 0.15) 50%,
                rgba(255, 200, 100, 0.1) 80%,
                transparent 100%
              )
            `, // Subtle, warm sun reflection
          right: 'clamp(5vw, 7vw, 40px)', // Align with smaller orb, responsive
          bottom: '0',
          filter: 'blur(clamp(0.6px, 0.3vw, 1.5px))', // Finer blur for a soft glow
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4], // Pulsating opacity
          scaleY: [1, 1.08, 1], // Vertical stretching
          scaleX: [1, 1.03, 1], // Subtle horizontal stretching
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Beach Sand - Smoother Gradients */}
      {/* This forms the base layer of the beach/land, with refined gradients. */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -11, // Above water reflections
          height: 'clamp(14vh, 18vh, 22vh)', // Height of the visible land, responsive
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(45, 55, 65, 0.85) 0%,
                rgba(65, 75, 85, 0.75) 30%,
                rgba(85, 95, 105, 0.65) 60%,
                rgba(105, 115, 125, 0.45) 90%,
                transparent 100%
              )
            ` // Darker, more nuanced night sand
            : `
              linear-gradient(to top,
                rgba(140, 70, 5, 0.8) 0%,
                rgba(160, 90, 10, 0.7) 30%,
                rgba(180, 110, 20, 0.6) 60%,
                rgba(200, 130, 30, 0.5) 90%,
                transparent 100%
              )
            `, // Warmer, earthy tones for day sand
        }}
      />

      {/* Beach Sand Texture - Finer Dots */}
      {/* Adds a subtle granular texture to the beach surface with smaller, finer dots. */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -10, // Above main sand layer
          height: 'clamp(12vh, 16vh, 20vh)', // Slightly shorter than main sand layer, responsive
          background: isDarkRealm
            ? `
              radial-gradient(circle at 25% 30%, rgba(200, 210, 220, 0.25) 0.6px, transparent 0.6px),
              radial-gradient(circle at 75% 70%, rgba(160, 170, 180, 0.15) 0.6px, transparent 0.6px),
              radial-gradient(circle at 50% 50%, rgba(180, 190, 200, 0.2) 0.6px, transparent 0.6px),
              radial-gradient(circle at 30% 80%, rgba(170, 180, 190, 0.15) 0.6px, transparent 0.6px),
              radial-gradient(circle at 80% 20%, rgba(200, 210, 220, 0.2) 0.6px, transparent 0.6px)
            ` // Finer, cool night texture
            : `
              radial-gradient(circle at 25% 30%, rgba(180, 100, 20, 0.3) 0.6px, transparent 0.6px),
              radial-gradient(circle at 75% 70%, rgba(200, 120, 30, 0.2) 0.6px, transparent 0.6px),
              radial-gradient(circle at 50% 50%, rgba(220, 140, 40, 0.25) 0.6px, transparent 0.6px),
              radial-gradient(circle at 30% 80%, rgba(230, 150, 50, 0.2) 0.6px, transparent 0.6px),
              radial-gradient(circle at 80% 20%, rgba(240, 160, 60, 0.2) 0.6px, transparent 0.6px)
            `, // Finer, warm day texture
          backgroundSize: `
            clamp(15px, 3vw, 30px) clamp(15px, 3vw, 30px),
            clamp(25px, 4vw, 40px) clamp(25px, 4vw, 40px),
            clamp(20px, 3.5vw, 35px) clamp(20px, 3.5vw, 35px),
            clamp(30px, 4.5vw, 45px) clamp(30px, 4.5vw, 45px),
            clamp(18px, 3.2vw, 32px) clamp(18px, 3.2vw, 32px)
          `,
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6], // Subtle opacity pulse
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Smoother Wet Sand Edge */}
      {/* Simulates the wet edge of the sand where water meets land, now with a finer blur. */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9, // Above texture layer
          height: 'clamp(0.5px, 0.1vw, 2px)', // Even thinner line, responsive
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(220, 230, 240, 0.6) 15%, rgba(230, 240, 250, 0.7) 35%, rgba(240, 250, 255, 0.65) 50%, rgba(230, 240, 250, 0.7) 65%, rgba(220, 230, 240, 0.6) 85%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 240, 0.65) 15%, rgba(255, 240, 220, 0.6) 35%, rgba(255, 255, 250, 0.65) 50%, rgba(255, 240, 220, 0.6) 65%, rgba(255, 255, 240, 0.65) 85%, transparent 100%)',
          top: `calc(100% - clamp(14vh, 18vh, 22vh))`, // Positioned at the top edge of the main sand layer
          filter: 'blur(clamp(0.2px, 0.05vw, 0.5px))', // Very fine blur for a subtle glow
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5], // Pulsating opacity
          scaleX: [1, 1.01, 1], // Very subtle horizontal stretch
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Beach Details - Footprints and Shells */}
      {/* Adds small, animated elements to the foreground beach. Reduced count for smoother look. */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(12vh, 16vh, 20vh)', zIndex: -8 }}> {/* Above wet sand line */}
        {/* Footprints */}
        {[...Array(8)].map((_, i) => ( // Reduced footprints for smoother look
          <motion.div
            key={`footprint-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(4px, 0.7vw, 10px)`, // Smaller, responsive
              height: `clamp(2px, 0.3vw, 5px)`,
              background: isDarkRealm
                ? 'rgba(50, 60, 70, 0.3)' // Darker, very subtle footprints for night
                : 'rgba(160, 80, 10, 0.25)', // Warm, very subtle footprints for day
              left: Math.random() * 90 + '%', // Random horizontal position
              top: Math.random() * 85 + 5 + '%', // Random vertical position within the beach area
              filter: 'blur(clamp(0.1px, 0.05vw, 0.3px))', // Very slight blur for depth
              transform: `rotate(${Math.random() * 15 - 7.5}deg)`, // Random rotation
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2], // Fading in and out
            }}
            transition={{
              duration: 18, // Slow, subtle animation
              repeat: Infinity,
              delay: Math.random() * 12, // Staggered start
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Shells */}
        {[...Array(4)].map((_, i) => ( // Reduced shells
          <motion.div
            key={`shell-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1.5px, 0.4vw, 6px)`, // Smaller, responsive
              height: `clamp(1px, 0.2vw, 4px)`,
              background: isDarkRealm
                ? `hsl(${200 + Math.random() * 15}, 10%, ${65 + Math.random() * 10}%)` // Lighter, desaturated colors for night shells
                : `hsl(${20 + Math.random() * 8}, ${30 + Math.random() * 15}%, ${55 + Math.random() * 10}%)`, // Warmer, more saturated colors for day shells
              left: Math.random() * 95 + '%', // Random horizontal position
              top: Math.random() * 75 + 10 + '%', // Random vertical position within the beach area
              borderRadius: Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%', // Random shapes (circle or irregular)
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4], // Fading in and out
              scale: [0.95, 1.02, 0.95], // Very subtle size change
            }}
            transition={{
              duration: 12, // Slow, subtle animation
              repeat: Infinity,
              delay: Math.random() * 8, // Staggered start
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Dunes/Hills - More defined and layered */}
      {/* These form the background land masses behind the main beach. Reduced count for smoother look. */}
      {[...Array(3)].map((_, i) => ( // Still 3 dunes
        <motion.div
          key={`dune-${i}`}
          className="fixed bottom-0"
          style={{
            zIndex: -6, // Above beach details, below wet sand line
            width: `clamp(70px, ${12 + Math.random() * 6}vw, 150px)`, // Responsive width, slightly smaller
            height: `clamp(15px, ${2.5 + Math.random() * 1.5}vh, 35px)`, // Responsive height, slightly smaller
            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%', // Rounded top for hill shape
            background: isDarkRealm
              ? `linear-gradient(to top, rgba(40, 50, 60, 0.75) 0%, rgba(55, 65, 75, 0.65) 50%, transparent 100%)` // Darker, more subtle silhouette for night
              : `linear-gradient(to top, rgba(150, 70, 5, 0.75) 0%, rgba(180, 100, 15, 0.65) 50%, transparent 100%)`, // Warmer, earthy tones for day
            left: `${i * 30 + (Math.random() * 6 - 3)}vw`, // Distributed horizontally with slight randomness
            transform: `translateX(-50%)`, // Centers the dune horizontally
            bottom: `clamp(14vh, 18vh, 22vh)`, // Positioned above the main beach layer
            filter: 'blur(clamp(0.3px, 0.1vw, 1px))', // Subtle blur for depth
          }}
          animate={{
            y: [0, -3, 0], // Gentle bobbing motion
            opacity: [0.5, 0.8, 0.5], // Pulsating opacity
          }}
          transition={{
            duration: 15 + Math.random() * 10, // Varied, slow animation
            repeat: Infinity,
            delay: i * 4, // Staggered start
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Beach Sparkles/Glints */}
      {/* Adds small, flickering light points on the beach surface. Reduced count for smoother performance. */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(16vh, 22vh, 26vh)', zIndex: -5 }}> {/* Above dunes */}
        {[...Array(20)].map((_, i) => ( // Reduced sparkles
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(0.6px, ${Math.random() * 0.25 + 0.1}vw, 3px)`, // Smaller, responsive
              height: `clamp(0.6px, ${Math.random() * 0.25 + 0.1}vw, 3px)`,
              background: isDarkRealm
                ? `hsl(${190 + Math.random() * 30}, ${25 + Math.random() * 25}%, ${75 + Math.random() * 15}%)` // Cooler, brighter for night luminescence
                : `hsl(${25 + Math.random() * 15}, ${40 + Math.random() * 25}%, ${80 + Math.random() * 10}%)`, // Warmer, brighter for day glints
              left: Math.random() * 100 + '%', // Random horizontal position
              top: Math.random() * 90 + '%', // Random vertical position within the beach area
              boxShadow: isDarkRealm
                ? `0 0 clamp(3px, 0.8vw, 8px) rgba(200, 210, 220, 0.65)` // Softer, bluer glow
                : `0 0 clamp(5px, 1vw, 10px) rgba(250, 150, 50, 0.75)`, // Stronger, warm glow
            }}
            animate={{
              opacity: [0.25, 0.85, 0.25], // Flickering effect
              scale: [0.8, 1.2, 0.8], // Subtle size change
            }}
            transition={{
              duration: Math.random() * 5 + 4, // Varied, slow animation
              repeat: Infinity,
              delay: Math.random() * 6, // Staggered start
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;
