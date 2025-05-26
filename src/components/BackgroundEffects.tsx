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
      {/* Lightning effect */}
      {showLightning && (
        <motion.div
          className="fixed inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0, 0.7, 0] }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.95), transparent)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Main background */}
      <motion.div
        className="fixed inset-0 -z-20"
        animate={{
          background: isDarkRealm
            ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
            : 'linear-gradient(to bottom, #87CEEB, #F0E68C)',
        }}
        transition={{ duration: 1.5 }}
      />

      {/* Beach/Ocean effect */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 -z-10"
        style={{
          height: '40vh',
          background: isDarkRealm
            ? 'linear-gradient(to top, rgba(30, 61, 89, 0.8), transparent)'
            : 'linear-gradient(to top, rgba(255, 218, 185, 0.8), transparent)',
        }}
      >
        {/* Wave animation */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: isDarkRealm
              ? 'repeating-linear-gradient(45deg, rgba(30, 61, 89, 0.2) 0px, transparent 30px)'
              : 'repeating-linear-gradient(45deg, rgba(255, 218, 185, 0.2) 0px, transparent 30px)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            background: isDarkRealm ? '#ffffff' : '#FFD700',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );
};

export default BackgroundEffects;