import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler'; // Keep Howl for explosionSound

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const IntroAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState<'buildup' | 'explosion' | 'fade'>('buildup');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shockwaveRadius, setShockwaveRadius] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const explosionSoundRef = useRef<Howl | null>(null); // Ref to hold the explosion sound instance

  // Particle system
  const createParticles = () => {
    const newParticles: Particle[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Reduced particle count for smoother performance
    for (let i = 0; i < 100; i++) { // Changed from 150 to 100 particles
      const angle = (Math.PI * 2 * i) / 100; // Adjusted for new particle count
      const velocity = 2 + Math.random() * 7; // Slightly reduced max velocity for smoother spread
      const size = 2 + Math.random() * 4; // Slightly reduced max size
      const colors = ['#ff6b35', '#f7931e', '#ffd23f', '#ee4035', '#7bc043'];

      newParticles.push({
        id: i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 200, // Reduced life for faster fade, can be adjusted
        maxLife: 200
      });
    }
    setParticles(newParticles);
  };

  // Animate particles
  const animateParticles = () => {
    setParticles(prev => prev.map(particle => ({
      ...particle,
      x: particle.x + particle.vx,
      y: particle.y + particle.vy,
      vy: particle.vy + 0.08, // Slightly reduced gravity for smoother fall
      life: particle.life - 2, // Reduced life decay for smoother fade
      size: particle.size * 0.985 // Slower size reduction
    })).filter(particle => particle.life > 0));

    setShockwaveRadius(prev => prev + 12); // Slightly reduced shockwave speed
  };

  // Canvas animation loop
  useEffect(() => {
    if (stage === 'explosion') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw shockwave
        if (shockwaveRadius < Math.max(canvas.width, canvas.height) * 0.7) { // Cap shockwave size
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;

          ctx.beginPath();
          ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
          // Smoother opacity transition for shockwave
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, 1 - shockwaveRadius / (Math.max(canvas.width, canvas.height) * 0.7))})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Draw particles
        particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(')', `, ${particle.life / particle.maxLife})`).replace('rgb', 'rgba');
          ctx.fill();

          // Reduced shadow blur for performance and smoother look
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = 5; // Reduced from 10
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        animateParticles();
        animationRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [stage, particles, shockwaveRadius]);

  useEffect(() => {
    // Only initialize explosionSound once
    explosionSoundRef.current = new Howl({
      src: ['https://assets.mixkit.co/active_storage/sfx/2669/2669.wav'],
      volume: 0.7,
    });

    // Animation sequence
    const explosionTimer = setTimeout(() => {
      explosionSoundRef.current?.play(); // Play explosion sound
      setStage('explosion');
      createParticles();
    }, 2800); // Slightly earlier explosion for better sync with visual buildup

    const fadeTimer = setTimeout(() => {
      setStage('fade');
    }, 4200); // Adjusted fade timing

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5500); // Adjusted complete timing

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      explosionSoundRef.current?.unload(); // Unload only the explosion sound
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          background: stage === 'buildup'
            ? 'radial-gradient(circle at center, #ff4757, #2f1b14, #000000)'
            : stage === 'explosion'
              ? 'radial-gradient(circle at center, #ffffff, #ff6b35, #ee4035, #000000)'
              : 'linear-gradient(45deg, #000000, #1a1a1a)'
        }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        {/* Canvas for particles and effects */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ opacity: stage === 'explosion' ? 1 : 0 }}
        />

        {/* Central orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: stage === 'buildup' ? 1 : stage === 'explosion' ? 0 : 0,
              rotate: stage === 'buildup' ? 360 : 0
            }}
            transition={{
              duration: stage === 'buildup' ? 2.8 : 0.5, // Slightly faster buildup duration
              ease: "easeInOut",
              rotate: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          >
            {/* Multiple layered orbs */}
            <motion.div
              className="absolute w-40 h-40 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #fff, #ff6b35, #ee4035)',
                filter: 'blur(2px)'
              }}
              animate={{
                scale: stage === 'buildup' ? [0.8, 1.3, 0.8] : 1,
                opacity: stage === 'buildup' ? [0.3, 0.8, 0.3] : 0
              }}
              transition={{
                duration: 1.8, // Slightly faster transition
                repeat: stage === 'buildup' ? Infinity : 0,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="w-32 h-32 rounded-full relative z-10"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #ffffff, #ffd23f, #ff6b35)',
                boxShadow: '0 0 60px #ff6b35, inset 0 0 60px rgba(255,255,255,0.3)'
              }}
              animate={{
                scale: stage === 'buildup' ? [1, 1.2, 1] : stage === 'explosion' ? 15 : 1,
                opacity: stage === 'explosion' ? 0 : 1,
                boxShadow: stage === 'buildup'
                  ? [
                    '0 0 60px #ff6b35, inset 0 0 60px rgba(255,255,255,0.3)',
                    '0 0 120px #ff6b35, 0 0 180px #ee4035, inset 0 0 60px rgba(255,255,255,0.8)',
                    '0 0 60px #ff6b35, inset 0 0 60px rgba(255,255,255,0.3)'
                  ]
                  : '0 0 300px #ffffff'
              }}
              transition={{
                duration: stage === 'buildup' ? 1.3 : 0.3, // Slightly faster buildup transition
                repeat: stage === 'buildup' ? Infinity : 0,
                ease: stage === 'explosion' ? "easeOut" : "easeInOut"
              }}
            />

            {/* Energy rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2"
                style={{
                  width: `${200 + i * 50}px`,
                  height: `${200 + i * 50}px`,
                  left: `${-100 - i * 25}px`,
                  top: `${-100 - i * 25}px`,
                  borderColor: `rgba(255, 107, 53, ${0.3 - i * 0.1})`,
                  filter: 'blur(1px)'
                }}
                animate={{
                  scale: stage === 'buildup' ? [0.5, 1.5, 0.5] : 0,
                  opacity: stage === 'buildup' ? [0, 0.6, 0] : 0
                }}
                transition={{
                  duration: 1.8 + i * 0.4, // Slightly faster ring transitions
                  repeat: stage === 'buildup' ? Infinity : 0,
                  delay: i * 0.15, // Slightly reduced delay
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Screen flash effect */}
        {stage === 'explosion' && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.25, times: [0, 0.1, 1] }} // Slightly faster flash
          />
        )}

        {/* Fade overlay */}
        {stage === 'fade' && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }} // Slightly faster fade
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;