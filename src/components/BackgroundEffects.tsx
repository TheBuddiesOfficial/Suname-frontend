import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);

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

      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -20 }}
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #000208 0%, #050a15 20%, #0a1425 40%, #101e30 60%, #182c40 80%, #0a1425 100%)'
            : 'linear-gradient(180deg, #4a0030 0%, #ff5733 25%, #ff8c1a 50%, #ffc300 75%, #ffe100 100%)',
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -19,
          background: isDarkRealm
            ? 'radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.18), rgba(147, 197, 253, 0.12), transparent 70%)'
            : 'radial-gradient(ellipse at center top, rgba(255, 165, 0, 0.25), rgba(255, 69, 0, 0.2), transparent 80%)',
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
          zIndex: -14,
          width: 'clamp(80px, 15vw, 200px)',
          height: 'clamp(80px, 15vw, 200px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 40% 40%, #c0c0c0 0%, #808080 30%, #404040 60%, #202020 100%)' // Moon: Grey tones for craters/texture
            : 'radial-gradient(circle at 35% 35%, #ffffff 0%, #ffd23f 20%, #ff6b35 60%, #ee4035 100%)',
          top: 'clamp(10vh, 15vh, 20vh)',
          right: 'clamp(15vw, 20vw, 25vw)',
          filter: isDarkRealm ? 'blur(0.5px)' : 'blur(0.5px)', // Slightly less blur for moon
          boxShadow: isDarkRealm
            ? '0 0 clamp(30px, 6vw, 60px) rgba(180, 200, 220, 0.7), inset -5px -5px 15px rgba(50, 60, 70, 0.4)' // Moon glow: softer, cooler
            : '0 0 clamp(80px, 15vw, 200px) rgba(255, 107, 53, 0.8), 0 0 clamp(150px, 25vw, 400px) rgba(238, 64, 53, 0.5), inset -5px -5px 15px rgba(238, 64, 53, 0.3)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.85, 1, 0.85],
          rotate: isDarkRealm ? [0, 8, 0] : [0, 360],
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
          zIndex: -15,
          width: 'clamp(120px, 22vw, 280px)',
          height: 'clamp(120px, 22vw, 280px)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 40%, rgba(150, 180, 220, 0.15) 50%, transparent 80%)' // Moon halo: subtle blue glow
            : 'radial-gradient(circle, transparent 30%, rgba(255, 107, 53, 0.3) 45%, rgba(238, 64, 53, 0.2) 70%, transparent 90%)',
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

      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -16 }}>
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

      <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16,
          height: 'clamp(1px, 0.2vw, 3px)',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.6) 20%, rgba(203, 213, 225, 0.8) 50%, rgba(148, 163, 184, 0.6) 80%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 100, 0, 0.6) 20%, rgba(255, 140, 0, 0.8) 50%, rgba(255, 100, 0, 0.6) 80%, transparent 100%)',
          top: 'clamp(65%, 68%, 70%)',
          boxShadow: isDarkRealm
            ? '0 0 clamp(8px, 2vw, 15px) rgba(148, 163, 184, 0.4)'
            : '0 0 clamp(10px, 2vw, 20px) rgba(255, 140, 0, 0.5)',
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

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(25vh, 32vh, 35vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(5, 15, 35, 0.98) 0%,
                rgba(10, 25, 55, 0.9) 15%,
                rgba(20, 40, 80, 0.8) 30%,
                rgba(30, 60, 120, 0.7) 45%,
                rgba(40, 80, 160, 0.6) 60%,
                rgba(60, 100, 180, 0.5) 75%,
                rgba(80, 120, 200, 0.3) 90%,
                transparent 100%
              )
            `
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
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

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
                rgba(40, 80, 160, 0.4) clamp(30px, 6vw, 80px),
                rgba(40, 80, 160, 0.4) clamp(70px, 14vw, 160px),
                transparent clamp(70px, 14vw, 160px),
                transparent clamp(110px, 22vw, 240px)
              )
            `
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
          x: [0, -200, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

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
                rgba(60, 100, 180, 0.3) clamp(15px, 3vw, 50px),
                rgba(60, 100, 180, 0.3) clamp(35px, 7vw, 100px)
              )
            `
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
          x: [100, -100, 100],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="fixed"
        style={{
          zIndex: -10,
          width: 'clamp(40px, 8vw, 80px)',
          height: 'clamp(120px, 25vh, 250px)',
          background: isDarkRealm
            ? `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(248, 250, 252, 0.6) 10%,
                rgba(226, 232, 240, 0.8) 30%,
                rgba(203, 213, 225, 0.7) 50%,
                rgba(148, 163, 184, 0.6) 70%,
                transparent 100%
              )
            `
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

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9,
          height: 'clamp(18vh, 25vh, 30vh)',
          background: isDarkRealm
            ? `
              linear-gradient(to top,
                rgba(50, 60, 70, 0.98) 0%,
                rgba(70, 80, 90, 0.9) 20%,
                rgba(100, 110, 120, 0.8) 40%,
                rgba(130, 140, 150, 0.7) 60%,
                rgba(160, 170, 180, 0.5) 80%,
                transparent 100%
              )
            `
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
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -8,
          height: 'clamp(16vh, 22vh, 28vh)',
          background: isDarkRealm
            ? `
              radial-gradient(circle at 25% 30%, rgba(130, 140, 150, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 75% 70%, rgba(100, 110, 120, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(160, 170, 180, 0.35) 1px, transparent 1px),
              radial-gradient(circle at 30% 80%, rgba(110, 120, 130, 0.25) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(140, 150, 160, 0.3) 1px, transparent 1px)
            `
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
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -7,
          height: 'clamp(2px, 0.5vw, 4px)',
          background: isDarkRealm
            ? 'linear-gradient(90deg, transparent 0%, rgba(241, 245, 249, 0.9) 15%, rgba(248, 250, 252, 1) 35%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 250, 252, 1) 65%, rgba(241, 245, 249, 0.9) 85%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 180, 0, 0.7) 15%, rgba(255, 200, 50, 0.8) 35%, rgba(255, 220, 100, 0.9) 50%, rgba(255, 200, 50, 0.8) 65%, rgba(255, 180, 0, 0.7) 85%, transparent 100%)',
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

      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(15vh, 20vh, 25vh)', zIndex: -6 }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`footprint-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(6px, 1.2vw, 18px)`,
              height: `clamp(3px, 0.6vw, 10px)`,
              background: isDarkRealm
                ? 'rgba(60, 70, 80, 0.6)'
                : 'rgba(80, 50, 20, 0.6)',
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

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shell-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(3px, 0.8vw, 12px)`,
              height: `clamp(2px, 0.6vw, 8px)`,
              background: isDarkRealm
                ? `hsl(${210 + Math.random() * 30}, 10%, ${60 + Math.random() * 20}%)`
                : `hsl(${30 + Math.random() * 20}, ${30 + Math.random() * 30}%, ${50 + Math.random() * 25}%)`,
              left: Math.random() * 90 + 5 + '%',
              top: Math.random() * 60 + 20 + '%',
              borderRadius: Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%',
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

      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`dune-${i}`}
          className="fixed bottom-0"
          style={{
            zIndex: -5,
            width: `clamp(80px, ${15 + Math.random() * 10}vw, 200px)`,
            height: `clamp(20px, ${4 + Math.random() * 3}vh, 50px)`,
            borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
            background: isDarkRealm
              ? `linear-gradient(to top, rgba(40, 50, 60, 0.9) 0%, rgba(60, 70, 80, 0.8) 50%, transparent 100%)`
              : `linear-gradient(to top, #45250a 0%, #6a3a15 50%, transparent 100%)`,
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

      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(20vh, 30vh, 35vh)', zIndex: -4 }}>
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
              height: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
              background: isDarkRealm
                ? `hsl(${200 + Math.random() * 40}, ${30 + Math.random() * 40}%, ${80 + Math.random() * 15}%)`
                : `hsl(${40 + Math.random() * 20}, ${70 + Math.random() * 20}%, ${90 + Math.random() * 5}%)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 85 + 5 + '%',
              boxShadow: isDarkRealm
                ? `0 0 clamp(4px, 1vw, 10px) rgba(226, 232, 240, 0.8)`
                : `0 0 clamp(6px, 1.2vw, 12px) rgba(255, 190, 0, 0.9)`,
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
