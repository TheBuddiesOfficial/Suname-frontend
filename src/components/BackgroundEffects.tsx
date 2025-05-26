import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);

  // Memoize particle arrays for better performance
  const particles = useMemo(() => 
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.4 + 0.1,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      opacity: Math.random() * 0.6 + 0.3
    })), []
  );

  const floatingElements = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.3 + 0.1,
      delay: Math.random() * 6,
      duration: Math.random() * 8 + 6
    })), []
  );

  const birds = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startX: Math.random() * 20 - 10,
      startY: Math.random() * 30 + 10,
      delay: Math.random() * 12,
      duration: Math.random() * 8 + 20,
      path: Math.random() * 200 + 400
    })), []
  );

  // Enhanced lightning effect with smoother transitions
  useEffect(() => {
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1500);
      setPrevMode(isDarkRealm);
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  return (
    <>
      {/* Enhanced Lightning Effect */}
      <AnimatePresence>
        {showLightning && (
          <>
            <motion.div
              className="fixed inset-0 -z-5"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.95, 0.1, 0.8, 0.05, 0.6, 0, 0.4, 0] 
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: [0.4, 0, 0.2, 1], 
                times: [0, 0.08, 0.15, 0.22, 0.3, 0.4, 0.5, 0.7, 1] 
              }}
              style={{
                background: 'radial-gradient(ellipse at 35% 25%, rgba(255, 255, 255, 0.98) 0%, rgba(220, 230, 255, 0.8) 25%, rgba(180, 200, 255, 0.4) 50%, transparent 75%)',
                mixBlendMode: 'screen',
                filter: 'blur(0.5px)'
              }}
            />
            <motion.div
              className="fixed inset-0 -z-5"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0, 0.85, 0.1, 0.9, 0.05, 0.7, 0, 0.3, 0] 
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.1,
                ease: [0.4, 0, 0.2, 1], 
                times: [0, 0.05, 0.12, 0.2, 0.25, 0.35, 0.45, 0.6, 0.8, 1] 
              }}
              style={{
                background: 'radial-gradient(ellipse at 65% 75%, rgba(255, 255, 255, 0.92) 0%, rgba(200, 220, 255, 0.6) 30%, rgba(160, 190, 255, 0.3) 60%, transparent 80%)',
                mixBlendMode: 'screen',
                filter: 'blur(1px)'
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Background Gradient */}
      <motion.div
        className="fixed inset-0 -z-20"
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #0a0e1a 0%, #1e293b 30%, #334155 70%, #475569 100%)'
            : 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 25%, #B8E6B8 50%, #F0E68C 75%, #DEB887 100%)',
        }}
        transition={{ duration: 4, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Enhanced Atmospheric Glow */}
      <motion.div
        className="fixed inset-0 -z-19"
        style={{
          background: isDarkRealm
            ? 'radial-gradient(ellipse at 25% 35%, rgba(59, 130, 246, 0.3) 0%, rgba(147, 197, 253, 0.15) 40%, transparent 80%)'
            : 'radial-gradient(ellipse at 25% 35%, rgba(251, 191, 36, 0.25) 0%, rgba(253, 224, 71, 0.15) 40%, transparent 80%)',
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced Sun/Moon */}
      <motion.div
        className="fixed -z-10"
        style={{
          width: 'clamp(120px, 14vw, 160px)',
          height: 'clamp(120px, 14vw, 160px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 30%, #FFFAF0 0%, #F0F8FF 40%, #E6E6FA 70%, #D3D3D3 100%)'
            : 'radial-gradient(circle at 35% 35%, #FFFEF7 0%, #FFD700 25%, #FFA500 60%, #FF8C00 85%, #FF6347 100%)',
          top: 'clamp(15vh, 18%, 25vh)',
          right: 'clamp(15vw, 18%, 25vw)',
          filter: isDarkRealm ? 'blur(1.5px) brightness(0.9)' : 'blur(0.8px) brightness(1.1)',
          boxShadow: isDarkRealm
            ? '0 0 60px rgba(248, 248, 255, 0.6), 0 0 120px rgba(220, 220, 255, 0.3), inset -12px -12px 20px rgba(160, 160, 160, 0.3)'
            : '0 0 80px rgba(255, 215, 0, 0.7), 0 0 160px rgba(255, 165, 0, 0.5), 0 0 240px rgba(255, 140, 0, 0.3)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.85, 1, 0.85],
          rotate: isDarkRealm ? [0, 8, 0] : [0, 360],
          filter: [
            isDarkRealm ? 'blur(1.5px) brightness(0.9)' : 'blur(0.8px) brightness(1.1)',
            isDarkRealm ? 'blur(2px) brightness(0.95)' : 'blur(0.5px) brightness(1.15)',
            isDarkRealm ? 'blur(1.5px) brightness(0.9)' : 'blur(0.8px) brightness(1.1)'
          ]
        }}
        transition={{
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: {
            duration: isDarkRealm ? 50 : 150,
            repeat: Infinity,
            ease: isDarkRealm ? "easeInOut" : "linear"
          },
          filter: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Enhanced Celestial Aura */}
      <motion.div
        className="fixed -z-11"
        style={{
          width: 'clamp(180px, 18vw, 220px)',
          height: 'clamp(180px, 18vw, 220px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 25%, rgba(248, 248, 255, 0.12) 35%, rgba(220, 230, 255, 0.08) 55%, transparent 75%)'
            : 'radial-gradient(circle, transparent 25%, rgba(255, 215, 0, 0.18) 35%, rgba(255, 165, 0, 0.12) 55%, transparent 75%)',
          top: 'clamp(12vh, 15%, 22vh)',
          right: 'clamp(12vw, 15%, 22vw)',
        }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.6, 1, 0.6],
          rotate: [0, 360]
        }}
        transition={{
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 40, repeat: Infinity, ease: "linear" }
        }}
      />

      {/* Enhanced Birds/Flying Elements */}
      {!isDarkRealm && (
        <div className="fixed inset-0 -z-10">
          {birds.map((bird) => (
            <motion.div
              key={`bird-${bird.id}`}
              className="absolute"
              style={{
                left: bird.startX + '%',
                top: bird.startY + '%',
                fontSize: 'clamp(8px, 1.2vw, 16px)',
                color: 'rgba(0, 0, 0, 0.3)',
                filter: 'blur(0.3px)'
              }}
              animate={{
                x: [0, bird.path * 0.3, bird.path * 0.7, bird.path],
                y: [0, -25, -15, -35],
                opacity: [0, 0.8, 0.9, 0],
                scale: [0.8, 1, 1.1, 0.9]
              }}
              transition={{
                duration: bird.duration,
                repeat: Infinity,
                delay: bird.delay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              ◊
            </motion.div>
          ))}
        </div>
      )}

      {/* Enhanced Stars */}
      {isDarkRealm && (
        <div className="fixed inset-0 -z-10">
          {particles.slice(0, 60).map((particle) => (
            <motion.div
              key={`star-${particle.id}`}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${particle.size}vw, 3px)`,
                height: `clamp(1px, ${particle.size}vw, 3px)`,
                background: '#FFFFFF',
                left: particle.x + '%',
                top: particle.y + '%',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(200, 220, 255, 0.4)',
              }}
              animate={{
                opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Enhanced Shooting Star */}
          <motion.div
            className="absolute"
            style={{
              width: 'clamp(2px, 0.3vw, 4px)',
              height: 'clamp(1px, 0.15vw, 2px)',
              background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)',
              left: '-15%',
              top: '15%',
              borderRadius: '50%',
              boxShadow: '0 0 20px #ffffff, 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(200, 220, 255, 0.4)',
            }}
            animate={{
              x: ['-15%', '120%'],
              y: ['15%', '45%'],
              opacity: [0, 1, 1, 0.8, 0],
              scaleX: [0.5, 1.5, 2, 1.5, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 15,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        </div>
      )}

      {/* Enhanced Horizon Line */}
      <motion.div
        className="fixed left-0 right-0 -z-10"
        style={{
          height: '2px',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(100, 116, 139, 0.8) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(30, 144, 255, 0.6) 50%, transparent 100%)',
          top: '65%',
          filter: 'blur(0.5px)'
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scaleY: [1, 1.5, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced Sea Base Layer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-10"
        style={{
          height: '40vh',
          background: isDarkRealm
            ? 'linear-gradient(to top, rgba(8, 25, 60, 0.98) 0%, rgba(15, 35, 80, 0.9) 20%, rgba(25, 60, 120, 0.7) 50%, rgba(40, 90, 160, 0.4) 80%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0, 100, 160, 0.98) 0%, rgba(0, 120, 180, 0.9) 20%, rgba(20, 140, 200, 0.7) 50%, rgba(60, 170, 220, 0.4) 80%, transparent 100%)',
        }}
        animate={{
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sea Surface Waves Layer 1 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-9"
        style={{
          height: '30vh',
          background: isDarkRealm
            ? 'repeating-linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.15) 40px, rgba(79, 150, 255, 0.25) 80px, rgba(59, 130, 246, 0.15) 120px, transparent 160px)'
            : 'repeating-linear-gradient(90deg, transparent 0%, rgba(0, 191, 255, 0.2) 40px, rgba(30, 200, 255, 0.35) 80px, rgba(0, 191, 255, 0.2) 120px, transparent 160px)',
          filter: 'blur(0.5px)'
        }}
        animate={{
          x: [-60, 120, -60],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sea Surface Waves Layer 2 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-9"
        style={{
          height: '25vh',
          background: isDarkRealm
            ? 'repeating-linear-gradient(90deg, transparent 0%, rgba(100, 150, 255, 0.08) 30px, rgba(120, 170, 255, 0.18) 60px, rgba(100, 150, 255, 0.08) 90px, transparent 120px)'
            : 'repeating-linear-gradient(90deg, transparent 0%, rgba(50, 200, 255, 0.15) 30px, rgba(80, 220, 255, 0.28) 60px, rgba(50, 200, 255, 0.15) 90px, transparent 120px)',
          filter: 'blur(0.3px)'
        }}
        animate={{
          x: [40, -80, 40],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Sea Surface Waves Layer 3 - Fine Ripples */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-9"
        style={{
          height: '20vh',
          background: isDarkRealm
            ? 'repeating-linear-gradient(90deg, transparent 0%, rgba(150, 180, 255, 0.06) 15px, rgba(170, 200, 255, 0.12) 30px, rgba(150, 180, 255, 0.06) 45px, transparent 60px)'
            : 'repeating-linear-gradient(90deg, transparent 0%, rgba(100, 220, 255, 0.12) 15px, rgba(130, 240, 255, 0.22) 30px, rgba(100, 220, 255, 0.12) 45px, transparent 60px)',
          filter: 'blur(0.2px)'
        }}
        animate={{
          x: [-30, 60, -30],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Celestial Reflection in Water */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-8"
        style={{
          height: '35vh',
          background: isDarkRealm
            ? 'radial-gradient(ellipse at 82% 100%, rgba(248, 248, 255, 0.15) 0%, rgba(220, 230, 255, 0.08) 30%, transparent 60%)'
            : 'radial-gradient(ellipse at 82% 100%, rgba(255, 215, 0, 0.25) 0%, rgba(255, 165, 0, 0.15) 30%, rgba(255, 140, 0, 0.08) 50%, transparent 70%)',
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scaleX: [1, 1.1, 1],
          x: [0, -10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Wave Foam and Caps */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-8"
        style={{
          height: '8vh',
          background: isDarkRealm
            ? 'repeating-linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 20px, rgba(240, 248, 255, 0.12) 25px, rgba(255, 255, 255, 0.05) 30px, transparent 50px)'
            : 'repeating-linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 20px, rgba(255, 255, 255, 0.25) 25px, rgba(255, 255, 255, 0.15) 30px, transparent 50px)',
          filter: 'blur(0.8px)'
        }}
        animate={{
          x: [0, -50, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Dynamic Wave Crests */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`wave-crest-${i}`}
          className="fixed bottom-0 -z-8"
          style={{
            width: '150px',
            height: '12px',
            background: isDarkRealm
              ? 'linear-gradient(90deg, transparent 0%, rgba(200, 220, 255, 0.3) 50%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
            left: (i * 15 - 10) + '%',
            bottom: Math.sin(i * 0.5) * 8 + 15 + 'px',
            borderRadius: '50%',
            filter: 'blur(1px)'
          }}
          animate={{
            x: [-20, 100, -20],
            opacity: [0, 0.8, 0],
            scaleX: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 6 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Sea Depth Gradient */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-12"
        style={{
          height: '45vh',
          background: isDarkRealm
            ? 'radial-gradient(ellipse at center bottom, rgba(5, 15, 40, 0.9) 0%, rgba(10, 25, 60, 0.7) 40%, rgba(20, 50, 100, 0.4) 70%, transparent 100%)'
            : 'radial-gradient(ellipse at center bottom, rgba(0, 80, 140, 0.9) 0%, rgba(0, 100, 160, 0.7) 40%, rgba(20, 130, 190, 0.4) 70%, transparent 100%)',
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
          scaleY: [1, 1.05, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced Ground/Shore */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-15"
        style={{
          height: '20vh',
          background: isDarkRealm
            ? 'linear-gradient(to top, rgba(70, 80, 90, 0.6) 0%, rgba(100, 110, 120, 0.4) 50%, rgba(130, 140, 150, 0.2) 80%, transparent 100%)'
            : 'linear-gradient(to top, rgba(240, 210, 180, 0.7) 0%, rgba(255, 230, 200, 0.5) 50%, rgba(255, 245, 220, 0.3) 80%, transparent 100%)',
          filter: 'blur(0.5px)'
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced Floating Particles */}
      <div className="fixed inset-0 -z-10">
        {floatingElements.map((element) => (
          <motion.div
            key={`float-${element.id}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${element.size}vw, 3px)`,
              height: `clamp(1px, ${element.size}vw, 3px)`,
              background: isDarkRealm
                ? 'rgba(170, 200, 255, 0.6)'
                : 'rgba(255, 255, 255, 0.7)',
              left: element.x + '%',
              top: element.y + '%',
              filter: 'blur(0.5px)',
              boxShadow: isDarkRealm
                ? '0 0 4px rgba(170, 200, 255, 0.4)'
                : '0 0 4px rgba(255, 255, 255, 0.5)'
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.sin(element.id) * 20, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced Water Sparkles and Reflections */}
      <div className="fixed bottom-0 left-0 right-0 -z-10" style={{ height: '35vh' }}>
        {particles.slice(60).map((particle) => (
          <motion.div
            key={`sparkle-${particle.id}`}
            className="absolute rounded-full"
            style={{
              width: 'clamp(1px, 0.15vw, 2px)',
              height: 'clamp(1px, 0.15vw, 2px)',
              background: isDarkRealm ? '#E0F2F7' : '#FFFFFF',
              left: particle.x + '%',
              top: particle.y + '%',
              boxShadow: isDarkRealm
                ? '0 0 8px rgba(224, 242, 247, 0.8), 0 0 16px rgba(200, 230, 255, 0.4)'
                : '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.5)',
            }}
            animate={{
              opacity: [0, particle.opacity, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Large Water Sparkles */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={`water-sparkle-${i}`}
            className="absolute"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 80 + 10 + '%',
              fontSize: 'clamp(8px, 0.8vw, 14px)',
              color: isDarkRealm ? 'rgba(200, 230, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)',
              filter: 'blur(0.3px)'
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0.3, 1.2, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          >
            ✦
          </motion.div>
        ))}

        {/* Underwater Light Rays */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`light-ray-${i}`}
            className="absolute"
            style={{
              width: '2px',
              height: '25vh',
              background: isDarkRealm
                ? 'linear-gradient(to bottom, transparent 0%, rgba(100, 150, 255, 0.15) 30%, rgba(150, 200, 255, 0.25) 60%, transparent 100%)'
                : 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 200, 0.35) 60%, transparent 100%)',
              left: (i * 16 + 5) + '%',
              bottom: '0',
              transformOrigin: 'bottom',
              filter: 'blur(1px)'
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [0.8, 1.2, 0.8],
              skewX: [Math.sin(i) * 5, Math.sin(i) * -5, Math.sin(i) * 5]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating Bubbles */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(2px, ${0.2 + Math.random() * 0.3}vw, 6px)`,
              height: `clamp(2px, ${0.2 + Math.random() * 0.3}vw, 6px)`,
              background: isDarkRealm
                ? 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(200, 230, 255, 0.3))'
                : 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))',
              left: Math.random() * 100 + '%',
              top: Math.random() * 70 + 20 + '%',
              border: isDarkRealm ? '1px solid rgba(200, 230, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: isDarkRealm
                ? '0 0 4px rgba(200, 230, 255, 0.4), inset 0 0 2px rgba(255, 255, 255, 0.3)'
                : '0 0 4px rgba(255, 255, 255, 0.5), inset 0 0 2px rgba(255, 255, 255, 0.4)'
            }}
            animate={{
              y: [0, -40, -80],
              x: [0, Math.sin(i) * 15, Math.sin(i * 2) * 10],
              opacity: [0.8, 0.6, 0],
              scale: [0.8, 1, 1.2]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Surface Foam Particles */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={`foam-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${0.1 + Math.random() * 0.2}vw, 3px)`,
              height: `clamp(1px, ${0.1 + Math.random() * 0.2}vw, 3px)`,
              background: isDarkRealm ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 15 + '%',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)'
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 10 - 5],
              opacity: [0.4, 0.9, 0.4],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;