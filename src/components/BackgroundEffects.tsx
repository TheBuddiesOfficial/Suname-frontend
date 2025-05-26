import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);

  // Trigger lightning on mode change
  useEffect(() => {
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1200); // Increased lightning duration for more impact
      setPrevMode(isDarkRealm);
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  return (
    <>
      {/* Lightning/Thunder transition effect - more dramatic flashes */}
      {showLightning && (
        <>
          <motion.div
            className="fixed inset-0 -z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0, 0.7, 0, 0.5, 0] }} // More intense flashes
            transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }}
            style={{
              background: 'radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(200, 200, 255, 0.7) 30%, transparent 60%)',
              mixBlendMode: 'screen',
            }}
          />
          <motion.div
            className="fixed inset-0 -z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0, 0.9, 0, 0.6, 0] }} // Secondary flashes
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }}
            style={{
              background: 'radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.9) 0%, rgba(200, 220, 255, 0.5) 30%, transparent 60%)',
              mixBlendMode: 'screen',
            }}
          />
        </>
      )}

      {/* Main background gradient - smoother, more distinct transitions */}
      <motion.div
        className="fixed inset-0 -z-20"
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #334155 100%)' // Darker, less varying night
            : 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 30%, #F0E68C 70%, #DEB887 100%)', // Brighter, classic day
        }}
        transition={{ duration: 3, ease: 'easeInOut' }} // Faster, impactful transition
      />

      {/* Simple atmosphere overlay - subtle color shift */}
      <motion.div
        className="fixed inset-0 -z-19"
        style={{
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.25), transparent 70%)' // Slightly more visible dark aura
            : 'radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.2), transparent 70%)', // Slightly more visible light aura
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4], // More dynamic pulse
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sun/Moon - enhanced glow and movement */}
      <motion.div
        className="fixed -z-10"
        style={{
          width: 'min(140px, 15vw)', // Max 140px, or 15% of viewport width
          height: 'min(140px, 15vw)',// Max 140px, or 15% of viewport width
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 30%, #F8F8FF 0%, #E0E0E0 50%, #A9A9A9 100%)'
            : 'radial-gradient(circle at 35% 35%, #FFFAF0 0%, #FFD700 30%, #FFA500 70%, #FF8C00 100%)',
          top: 'min(18%, 20vh)', // Keep roughly 18% from top, or 20% of viewport height
          right: 'min(18%, 20vw)', // Keep roughly 18% from right, or 20% of viewport width
          filter: isDarkRealm ? 'blur(2px)' : 'blur(1px)', // Increased blur for moon
          boxShadow: isDarkRealm
            ? '0 0 80px rgba(248, 248, 255, 0.5), inset -15px -15px 25px rgba(160, 160, 160, 0.4)' // Stronger moon glow
            : '0 0 120px rgba(255, 215, 0, 0.6), 0 0 250px rgba(255, 165, 0, 0.4)', // Stronger sun glow
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
          rotate: isDarkRealm ? [0, 5, 0] : [0, 360], // Moon slightly rocking, sun spinning
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: {
            duration: isDarkRealm ? 40 : 120, // Adjusted rotation duration
            repeat: Infinity,
            ease: isDarkRealm ? "easeInOut" : "linear"
          }
        }}
      />

      {/* Sun/Moon glow - more pronounced and tied to main object */}
      <motion.div
        className="fixed -z-11"
        style={{
          width: 'min(200px, 20vw)', // Max 200px, or 20% of viewport width
          height: 'min(200px, 20vw)',// Max 200px, or 20% of viewport width
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 30%, rgba(248, 248, 255, 0.15) 40%, transparent 70%)'
            : 'radial-gradient(circle, transparent 30%, rgba(255, 215, 0, 0.2) 40%, transparent 70%)',
          top: 'min(15%, 17vh)', // Adjusted
          right: 'min(15%, 17vw)',// Adjusted
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7], // More dynamic glow
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Simple birds for day mode (more dynamic) */}
      {!isDarkRealm && (
        <div className="fixed inset-0 -z-10">
          {[...Array(7)].map((_, i) => ( // Increased bird count slightly
            <motion.div
              key={`bird-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 80 + 10 + '%',
                top: Math.random() * 25 + 15 + '%', // Birds slightly higher
                fontSize: 'clamp(10px, 1.5vw, 18px)', // Responsive font size
                color: 'rgba(0, 0, 0, 0.4)', // Slightly darker for better visibility
              }}
              animate={{
                x: [0, 150 + Math.random() * 200, 300 + Math.random() * 300], // Longer flight path
                y: [0, -30 + Math.random() * 60, -20 + Math.random() * 40], // More varied vertical movement
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 18 + Math.random() * 10, // Longer, more varied flight duration
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear" // Linear flight for natural movement
              }}
            >
              &#10021; {/* A slightly more aesthetic bird character */}
            </motion.div>
          ))}
        </div>
      )}

      {/* Stars for night mode (more abundant and subtle twinkle) */}
      {isDarkRealm && (
        <div className="fixed inset-0 -z-10">
          {[...Array(60)].map((_, i) => ( // Increased star count
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, 0.3vw, 2px)`, // Responsive star size
                height: `clamp(1px, 0.3vw, 2px)`, // Responsive star size
                background: '#FFFFFF',
                left: Math.random() * 100 + '%',
                top: Math.random() * 60 + '%', // Stars concentrated in upper half
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.7)', // Slightly softer glow
              }}
              animate={{
                opacity: [0.3, 0.9, 0.3], // Subtle twinkle
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 2 + 1, // Faster, more varied twinkle
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Shooting star - more impactful and less frequent */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 'clamp(1px, 0.2vw, 3px)',
              height: 'clamp(1px, 0.2vw, 3px)',
              background: 'white',
              left: '-10%', // Starts off-screen
              top: '20%',
              boxShadow: '0 0 15px #ffffff, 2px 0 30px rgba(255, 255, 255, 0.7)', // Stronger trail
            }}
            animate={{
              x: ['-10%', '110%'], // Travels across the screen
              y: ['20%', '35%'], // Diagonal path
              opacity: [0, 1, 1, 0], // Stays visible longer in the middle
            }}
            transition={{
              duration: 2.5, // Slower travel
              repeat: Infinity,
              repeatDelay: 10 + Math.random() * 5, // Less frequent, more random
              ease: "easeOut"
            }}
          />
        </div>
      )}

      {/* Horizon line - subtle and integrated */}
      <motion.div
        className="fixed left-0 right-0 h-px -z-10"
        style={{
          background: isDarkRealm
            ? 'rgba(100, 116, 139, 0.7)' // Slightly stronger for dark mode
            : 'rgba(30, 144, 255, 0.5)', // Slightly stronger for light mode
          top: '65%',
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5], // More dynamic pulse
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Ocean - deeper and more dynamic */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-10"
        style={{
          height: '35vh',
          background: isDarkRealm
            ? 'linear-gradient(to top, rgba(10, 30, 70, 0.9) 0%, rgba(30, 80, 150, 0.6) 50%, transparent 100%)' // Deeper, more intense dark ocean
            : 'linear-gradient(to top, rgba(0, 100, 150, 0.9) 0%, rgba(30, 160, 220, 0.7) 50%, transparent 100%)', // Brighter, more vibrant light ocean
        }}
        animate={{
          opacity: [0.9, 1, 0.9], // Subtle breathing effect
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Simple wave effects - more realistic shimmer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-10"
        style={{
          height: '25vh',
          background: isDarkRealm
            ? 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(59, 130, 246, 0.1) 100px, rgba(59, 130, 246, 0.1) 200px)' // Wider, more subtle dark waves
            : 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(0, 191, 255, 0.15) 100px, rgba(0, 191, 255, 0.15) 200px)', // Wider, more subtle light waves
        }}
        animate={{
          x: [-100, 100, -100], // Larger horizontal movement
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 7, // Slower wave movement
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Beach sand - subtle texture variation */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-15"
        style={{
          height: '18vh',
          background: isDarkRealm
            ? 'linear-gradient(to top, rgba(80, 90, 100, 0.5) 0%, rgba(120, 130, 140, 0.3) 60%, transparent 100%)' // Darker, more muted sand
            : 'linear-gradient(to top, rgba(240, 210, 180, 0.6) 0%, rgba(255, 230, 200, 0.4) 60%, transparent 100%)', // Lighter, more vibrant sand
        }}
        animate={{
          opacity: [0.7, 1, 0.7], // Subtle breathing effect
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Simple floating particles - more refined and varied */}
      <div className="fixed inset-0 -z-10">
        {[...Array(12)].map((_, i) => ( // Increased particle count
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${Math.random() * 0.4 + 0.1}vw, 4px)`, // Responsive particle size
              height: `clamp(1px, ${Math.random() * 0.4 + 0.1}vw, 4px)`, // Responsive particle size
              background: isDarkRealm
                ? 'rgba(170, 200, 255, 0.7)' // Slightly brighter, more visible in dark mode
                : 'rgba(255, 255, 255, 0.8)', // Slightly brighter in light mode
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(0.8px)', // Less blur for sharper look
            }}
            animate={{
              y: [0, -40, 0], // Larger vertical float
              x: [0, Math.random() * 30 - 15, 0], // More varied horizontal drift
              opacity: [0.4, 0.9, 0.4], // More dynamic opacity pulse
            }}
            transition={{
              duration: Math.random() * 6 + 4, // More varied, slightly longer float duration
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Water sparkles - more subtle and widespread */}
      <div className="fixed bottom-0 left-0 right-0 -z-10" style={{ height: '30vh' }}>
        {[...Array(10)].map((_, i) => ( // Increased sparkle count
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 'clamp(1px, 0.2vw, 2px)', // Responsive sparkle size
              height: 'clamp(1px, 0.2vw, 2px)', // Responsive sparkle size
              background: isDarkRealm ? '#E0F2F7' : '#FFFFFF', // Brighter sparkles
              left: Math.random() * 100 + '%',
              top: Math.random() * 90 + 5 + '%', // Sparkles closer to the surface
              boxShadow: isDarkRealm
                ? '0 0 6px rgba(224, 242, 247, 0.7)'
                : '0 0 6px rgba(255, 255, 255, 0.8)',
            }}
            animate={{
              opacity: [0, 0.8, 0], // Slightly less intense flash
              scale: [0.8, 1.2, 0.8], // More subtle scale variation
            }}
            transition={{
              duration: 1.5, // Faster twinkle
              repeat: Infinity,
              delay: Math.random() * 3, // Varied delay for natural look
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;