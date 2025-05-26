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
      {/* Lightning transition effect */}
      {showLightning && (
        <>
          <motion.div
            className="fixed inset-0 -z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0, 0.7, 0, 0.5, 0] }}
            transition={{ duration: 1.2, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }}
            style={{
              background: 'radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 215, 0, 0.7) 30%, transparent 60%)',
              mixBlendMode: 'screen',
            }}
          />
          <motion.div
            className="fixed inset-0 -z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.8, 0, 0.9, 0, 0.6, 0] }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut", times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }}
            style={{
              background: 'radial-gradient(circle at 60% 70%, rgba(255, 107, 53, 0.9) 0%, rgba(238, 64, 53, 0.5) 30%, transparent 60%)',
              mixBlendMode: 'screen',
            }}
          />
        </>
      )}

      {/* Main sky gradient */}
      <motion.div
        className="fixed inset-0 -z-20"
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(180deg, #0c0f1a 0%, #1a1d29 30%, #2a2f3f 60%, #1e293b 100%)'
            : 'linear-gradient(180deg, #ff6b35 0%, #f7931e 25%, #ffd23f 50%, #ff8c42 75%, #ee4035 100%)',
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      {/* Atmospheric glow */}
      <motion.div
        className="fixed inset-0 -z-19"
        style={{
          background: isDarkRealm
            ? 'radial-gradient(ellipse at center top, rgba(47, 27, 20, 0.4), transparent 70%)'
            : 'radial-gradient(ellipse at center top, rgba(255, 215, 0, 0.3), rgba(255, 107, 53, 0.2), transparent 80%)',
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sun/Moon */}
      <motion.div
        className="fixed -z-10"
        style={{
          width: 'min(180px, 18vw)',
          height: 'min(180px, 18vw)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle at 30% 30%, #e6e6fa 10%, #d3d3d3 40%, #a0a0a0 80%, #708090 100%)'
            : 'radial-gradient(circle at 35% 35%, #ffffff 0%, #ffd23f 20%, #ff6b35 60%, #ee4035 100%)',
          top: 'min(15%, 15vh)',
          right: 'min(20%, 22vw)',
          filter: isDarkRealm ? 'blur(1.5px)' : 'blur(0.5px)',
          boxShadow: isDarkRealm
            ? '0 0 60px rgba(230, 230, 250, 0.4), inset -10px -10px 20px rgba(160, 160, 160, 0.3)'
            : '0 0 150px rgba(255, 107, 53, 0.8), 0 0 300px rgba(238, 64, 53, 0.5), inset -5px -5px 15px rgba(238, 64, 53, 0.3)',
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

      {/* Sun/Moon outer glow */}
      <motion.div
        className="fixed -z-11"
        style={{
          width: 'min(260px, 26vw)',
          height: 'min(260px, 26vw)',
          borderRadius: '50%',
          background: isDarkRealm
            ? 'radial-gradient(circle, transparent 40%, rgba(230, 230, 250, 0.1) 50%, transparent 80%)'
            : 'radial-gradient(circle, transparent 30%, rgba(255, 107, 53, 0.25) 45%, rgba(238, 64, 53, 0.15) 70%, transparent 90%)',
          top: 'min(11%, 11vh)',
          right: 'min(17%, 19vw)',
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

      {/* Seagulls for light mode */}
      {!isDarkRealm && (
        <div className="fixed inset-0 -z-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`seagull-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 60 + 10 + '%',
                top: Math.random() * 30 + 20 + '%',
                fontSize: 'clamp(12px, 2vw, 24px)',
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

      {/* Stars for dark mode */}
      {isDarkRealm && (
        <div className="fixed inset-0 -z-10">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 3px)`,
                height: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 3px)`,
                background: '#ffffff',
                left: Math.random() * 100 + '%',
                top: Math.random() * 50 + '%',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
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

          {/* Shooting star */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 'clamp(2px, 0.3vw, 4px)',
              height: 'clamp(2px, 0.3vw, 4px)',
              background: 'white',
              left: '-5%',
              top: '15%',
              boxShadow: '0 0 20px #ffffff, 2px 0 40px rgba(255, 255, 255, 0.8)',
            }}
            animate={{
              x: ['-5%', '105%'],
              y: ['15%', '45%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 15 + Math.random() * 10,
              ease: "easeOut"
            }}
          />
        </div>
      )}

      {/* Horizon line */}
      <motion.div
        className="fixed left-0 right-0 h-0.5 -z-10"
        style={{
          background: isDarkRealm
            ? 'rgba(100, 116, 139, 0.8)'
            : 'rgba(238, 64, 53, 0.6)',
          top: '68%',
          boxShadow: isDarkRealm 
            ? '0 0 10px rgba(100, 116, 139, 0.5)'
            : '0 0 15px rgba(238, 64, 53, 0.4)',
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

      {/* Ocean/Water */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-10"
        style={{
          height: '32vh',
          background: isDarkRealm
            ? 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.8) 30%, rgba(51, 65, 85, 0.6) 70%, transparent 100%)'
            : 'linear-gradient(to top, rgba(238, 64, 53, 0.7) 0%, rgba(255, 107, 53, 0.5) 25%, rgba(247, 147, 30, 0.4) 50%, rgba(255, 210, 63, 0.3) 75%, transparent 100%)',
        }}
        animate={{
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Water reflection patterns */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-10"
        style={{
          height: '25vh',
          background: isDarkRealm
            ? 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(100, 116, 139, 0.15) 80px, rgba(100, 116, 139, 0.15) 160px)'
            : 'repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255, 107, 53, 0.2) 80px, rgba(255, 107, 53, 0.2) 160px)',
        }}
        animate={{
          x: [-80, 80, -80],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Beach/Shore */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-15"
        style={{
          height: '15vh',
          background: isDarkRealm
            ? 'linear-gradient(to top, rgba(71, 85, 105, 0.6) 0%, rgba(100, 116, 139, 0.4) 60%, transparent 100%)'
            : 'linear-gradient(to top, rgba(245, 158, 11, 0.8) 0%, rgba(251, 191, 36, 0.6) 40%, rgba(254, 215, 170, 0.4) 80%, transparent 100%)',
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles/sparkles */}
      <div className="fixed inset-0 -z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${Math.random() * 0.5 + 0.2}vw, 5px)`,
              height: `clamp(1px, ${Math.random() * 0.5 + 0.2}vw, 5px)`,
              background: isDarkRealm
                ? 'rgba(226, 232, 240, 0.8)'
                : 'rgba(255, 255, 255, 0.9)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(1px)',
              boxShadow: isDarkRealm
                ? '0 0 8px rgba(226, 232, 240, 0.6)'
                : '0 0 10px rgba(255, 255, 255, 0.8)',
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Beach sparkles/sand particles */}
      <div className="fixed bottom-0 left-0 right-0 -z-10" style={{ height: '25vh' }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 'clamp(1px, 0.25vw, 3px)',
              height: 'clamp(1px, 0.25vw, 3px)',
              background: isDarkRealm ? '#e2e8f0' : '#fff7ed',
              left: Math.random() * 100 + '%',
              top: Math.random() * 80 + 10 + '%',
              boxShadow: isDarkRealm
                ? '0 0 8px rgba(226, 232, 240, 0.7)'
                : '0 0 10px rgba(255, 247, 237, 0.9)',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.6, 1.4, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Sun/Moon reflection on water */}
      <motion.div
        className="fixed -z-8"
        style={{
          width: 'min(60px, 6vw)',
          height: 'min(200px, 20vh)',
          background: isDarkRealm
            ? 'linear-gradient(to bottom, transparent 0%, rgba(230, 230, 250, 0.3) 30%, rgba(230, 230, 250, 0.2) 70%, transparent 100%)'
            : 'linear-gradient(to bottom, transparent 0%, rgba(255, 107, 53, 0.4) 30%, rgba(238, 64, 53, 0.3) 70%, transparent 100%)',
          right: 'min(22%, 24vw)',
          bottom: '0',
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scaleY: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
};

export default BackgroundEffects;