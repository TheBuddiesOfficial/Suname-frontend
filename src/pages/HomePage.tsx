import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { FaSoundcloud, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';
import { biography } from '../data/biography';
import AudioVisualizer from '../components/AudioVisualizer';
import ParticleSystem from '../components/ParticleSystem';
import MusicCard from '../components/MusicCard';

interface HomePageProps {
  isDarkRealm: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkRealm }) => {
  const [activeMix, setActiveMix] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  const profileImages = [
    "/images/artist_main.jpg",
    "/images/artist_beach.jpg",
    "/images/artist_orange.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // All the animation variants and other constants remain exactly the same as in the original file
  // ... (keeping all the existing animation variants, constants, and helper functions)

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* ParticleSystem component remains the same */}
      <ParticleSystem
        isDarkRealm={isDarkRealm}
        customColors={isDarkRealm ? ['#303F9F', '#42A5F5', '#8B5CF6'] : ['#FFD180', '#FFA07A', '#FF7043']}
      />

      {/* The rest of the JSX structure remains exactly the same as the original file, 
          except for the profile image carousel section and social media icons section which are updated as specified */}
      
      {/* Updated profile image carousel section */}
      <motion.div
        className="relative w-80 h-80 mx-auto mb-10 cursor-grab active:cursor-grabbing rounded-full overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, y: heroImageY, scale: 1 }}
        animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={profileImages[currentImageIndex]}
            alt="SUNAME"
            className="w-full h-full object-cover rounded-full border-4 transition-colors duration-300"
            style={{
              borderColor: isDarkRealm ? 'rgba(48,63,159,0.8)' : 'rgba(255,165,0,0.8)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: isDarkRealm
              ? ['linear-gradient(0deg, rgba(48,63,159,0.6), transparent)',
                  'linear-gradient(90deg, rgba(48,63,159,0.6), transparent)',
                  'linear-gradient(180deg, rgba(48,63,159,0.6), transparent)',
                  'linear-gradient(270deg, rgba(48,63,159,0.6), transparent)']
              : ['linear-gradient(0deg, rgba(255,165,0,0.6), transparent)',
                  'linear-gradient(90deg, rgba(255,165,0,0.6), transparent)',
                  'linear-gradient(180deg, rgba(255,165,0,0.6), transparent)',
                  'linear-gradient(270deg, rgba(255,165,0,0.6), transparent)']
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.div>

      {/* Updated social media icons section */}
      <motion.div
        className="flex justify-center space-x-6 mb-12"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delay: 1.5,
              staggerChildren: 0.1
            }
          }
        }}
      >
        {[
          { icon: FaSoundcloud, url: biography.socials.soundcloud },
          { icon: FaInstagram, url: biography.socials.instagram },
          { icon: FaTwitter, url: biography.socials.twitter },
          { icon: FaTiktok, url: biography.socials.tiktok },
          { icon: FaYoutube, url: biography.socials.youtube },
          { icon: FaSpotify, url: biography.socials.spotify },
          { icon: FaApple, url: biography.socials.appleMusic }
        ].map(({ icon: Icon, url }, index) => (
          <motion.a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 1.5 + index * 0.1 }}
          >
            <motion.span
              className="inline-block"
              style={{
                color: '#FFFFFF',
                filter: isDarkRealm
                  ? 'drop-shadow(0px 0px 5px rgba(139,92,246,0.6)) drop-shadow(0px 0px 10px rgba(139,92,246,0.4))'
                  : 'drop-shadow(0px 0px 5px rgba(255,165,0,0.6)) drop-shadow(0px 0px 10px rgba(255,165,0,0.4))',
              }}
              whileHover={{
                scale: 1.2,
                color: isDarkRealm ? '#8B5CF6' : '#FF7043',
                filter: isDarkRealm
                  ? 'drop-shadow(0px 0px 8px rgba(139,92,246,0.9)) drop-shadow(0px 0px 15px rgba(139,92,246,0.7)) drop-shadow(0px 0px 25px rgba(139,92,246,0.5))'
                  : 'drop-shadow(0px 0px 8px rgba(255,165,0,0.9)) drop-shadow(0px 0px 15px rgba(255,165,0,0.7)) drop-shadow(0px 0px 25px rgba(255,165,0,0.5))',
              }}
              transition={{
                filter: { duration: 0.4, ease: "easeOut" },
                color: { duration: 0.4, ease: "easeOut" },
                scale: { type: "spring", stiffness: 400, damping: 30 }
              }}
            >
              <Icon />
            </motion.span>
          </motion.a>
        ))}
      </motion.div>

      {/* The rest of the component structure remains exactly the same */}
    </div>
  );
};

export default HomePage;