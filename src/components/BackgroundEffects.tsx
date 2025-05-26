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
      {showLightning && (
        <>
          <motion.div
            className="fixed inset-0 -z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0, 0.7, 0, 0.5, 0] }}
            transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }}
            style={{
              background: 'radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(200, 200, 255, 0.7) 30%, transparent 60%)',
              mixBlendMode: 'screen',
            }}
          />
          <motion.div
            className="fixed inset-0 -z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0, 0.9, 0, 0.6, 0] }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }}
            style={{
              background: 'radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.9) 0%, rgba(200, 220, 255, 0.5) 30%, transparent 60%)',
              mixBlendMode: 'screen',
            }}
          />
        </>
      )}

      <motion.div
        className="fixed inset-0 -z-20"
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 40%, #334155 100%)'
            : 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 30%, #F0E68C 70%, #DEB887 100%)',
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      <motion.div
        className="fixed inset-0 -z-19"
        style={{
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.25), transparent 70%)'
            : 'radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.2), transparent 70%)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="fixed -z-10"
        style={{
          width: 'min(140px, 15vw)',
          height: 'min(140px, 15vw)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 30%, #F8F8FF 0%, #E0E0E0 50%, #A9A9A9 100%)'
            : 'radial-gradient(circle at 35% 35%, #FFFAF0 0%, #FFD700 30%, #FFA500 70%, #FF8C00 100%)',
          top: 'min(18%, 20vh)',
          right: 'min(18%, 20vw)',
          filter: isDarkRealm ? 'blur(2px)' : 'blur(1px)',
          boxShadow: isDarkRealm
            ? '0 0 80px rgba(248, 248, 255, 0.5), inset -15px -15px 25px rgba(160, 160, 160, 0.4)'
            : '0 0 120px rgba(255, 215, 0, 0.6), 0 0 250px rgba(255, 165, 0, 0.4)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
          rotate: isDarkRealm ? [0, 5, 0] : [0, 360],
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: {
            duration: isDarkRealm ? 40 : 120,
            repeat: Infinity,
            ease: isDarkRealm ? "easeInOut" : "linear"
          }
        }}
      />

      <motion.div
        className="fixed -z-11"
        style={{
          width: 'min(200px, 20vw)',
          height: 'min(200px, 20vw)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 30%, rgba(248, 248, 255, 0.15) 40%, transparent 70%)'
            : 'radial-gradient(circle, transparent 30%, rgba(255, 215, 0, 0.2) 40%, transparent 70%)',
          top: 'min(15%, 17vh)',
          right: 'min(15%, 17vw)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {!isDarkRealm && (
        <div className="fixed inset-0 -z-10">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`bird-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 80 + 10 + '%',
                top: Math.random() * 25 + 15 + '%',
                fontSize: 'clamp(10px, 1.5vw, 18px)',
                color: 'rgba(0, 0, 0, 0.4)',
              }}
              animate={{
                x: [0, 150 + Math.random() * 200, 300 + Math.random() * 300],
                y: [0, -30 + Math.random() * 60, -20 + Math.random() * 40],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 18 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
            >
              &#10021;
            </motion.div>
          ))}
        </div>
      )}

      {isDarkRealm && (
        <div className="fixed inset-0 -z-10">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, 0.3vw, 2px)`,
                height: `clamp(1px, 0.3vw, 2px)`,
                background: '#FFFFFF',
                left: Math.random() * 100 + '%',
                top: Math.random() * 60 + '%',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.7)',
              }}
              animate={{
                opacity: [0.3, 0.9, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}

          <motion.div
            className="absolute rounded-full"
            style={{
              width: 'clamp(1px, 0.2vw, 3px)',
              height: 'clamp(1px, 0.2vw, 3px)',
              background: 'white',
              left: '-10%',
              top: '20%',
              boxShadow: '0 0 15px #ffffff, 2px 0 30px rgba(255, 255, 255, 0.7)',
            }}
            animate={{
              x: ['-10%', '110%'],
              y: ['20%', '35%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 10 + Math.random() * 5,
              ease: "easeOut"
            }}
          />
        </div>
      )}

      <motion.div
        className="fixed left-0 right-0 h-px -z-10"
        style={{
          background: isDarkRealm
            ? 'rgba(100, 116, 139, 0.7)'
            : 'rgba(30, 144, 255, 0.5)',
          top: '65%',
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-10"
        style={{
          height: '35vh',
          background: isDarkRealm
            ? 'linear-gradient(to top, rgba(10, 30, 70, 0.9) 0%, rgba(30, 80, 150, 0.6) 50%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0, 100, 150, 0.9) 0%, rgba(30, 160, 220, 0.7) 50%, transparent 100%)',
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
        className="fixed bottom-0 left-0 right-0 -z-10"
        style={{
          height: '25vh',
          background: isDarkRealm
            ? 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(59, 130, 246, 0.1) 100px, rgba(59, 130, 246, 0.1) 200px)'
            : 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(0, 191, 255, 0.15) 100px, rgba(0, 191, 255, 0.15) 200px)',
        }}
        animate={{
          x: [-100, 100, -100],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-15"
        style={{
          height: '18vh',
          background: isDarkRealm
            ? 'linear-gradient(to top, rgba(80, 90, 100, 0.5) 0%, rgba(120, 130, 140, 0.3) 60%, transparent 100%)'
            : 'linear-gradient(to top, rgba(240, 210, 180, 0.6) 0%, rgba(255, 230, 200, 0.4) 60%, transparent 100%)',
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="fixed inset-0 -z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${Math.random() * 0.4 + 0.1}vw, 4px)`,
              height: `clamp(1px, ${Math.random() * 0.4 + 0.1}vw, 4px)`,
              background: isDarkRealm
                ? 'rgba(170, 200, 255, 0.7)'
                : 'rgba(255, 255, 255, 0.8)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(0.8px)',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 -z-10" style={{ height: '30vh' }}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 'clamp(1px, 0.2vw, 2px)',
              height: 'clamp(1px, 0.2vw, 2px)',
              background: isDarkRealm ? '#E0F2F7' : '#FFFFFF',
              left: Math.random() * 100 + '%',
              top: Math.random() * 90 + 5 + '%',
              boxShadow: isDarkRealm
                ? '0 0 6px rgba(224, 242, 247, 0.7)'
                : '0 0 6px rgba(255, 255, 255, 0.8)',
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
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