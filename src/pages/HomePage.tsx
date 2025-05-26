import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaSoundcloud, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';
import { biography } from '../data/biography';
import AudioVisualizer from '../components/AudioVisualizer';
import VinylRecord from '../components/VinylRecord';
import ParticleSystem from '../components/ParticleSystem';
import MusicCard from '../components/MusicCard';

interface HomePageProps {
  isDarkRealm: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkRealm }) => {
  const [activeMix, setActiveMix] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Animation Variants ---

  // Hero Section Elements Fade In & Up
  const heroReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.2, 0.65, 0.3, 0.9],
        staggerChildren: 0.15,
        delayChildren: 0.2
      },
    },
  };

  // Section Heading Reveal
  const sectionHeadingReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  // Card / Item entrance animation
  const itemFadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  // Social Icon Hover Effect
  const iconHover = {
    scale: 1.25,
    rotateY: 20,
    y: -10,
    transition: { type: "spring", stiffness: 300, damping: 10 }
  };

  // --- Adjusted: Hero Text Glitch Effect Colors ---
  // Glitch colors remain consistent as they are effects, not primary text color
  const glitchColors = {
    primaryGlitch: '#8b5cf6', // Purple
    secondaryGlitch: '#ec4899', // Pink
  };

  const glitchVariants = {
    animate: {
      opacity: [1, 0.8, 1, 0.6, 1],
      x: [0, 5, -5, 3, 0],
      y: [0, 3, -3, 2, 0],
      textShadow: [
        `0 0 0 ${glitchColors.primaryGlitch}, 0 0 0 ${glitchColors.secondaryGlitch}`,
        `2px 2px 0 ${glitchColors.primaryGlitch}, -2px -2px 0 ${glitchColors.secondaryGlitch}`,
        `0 0 0 ${glitchColors.primaryGlitch}, 0 0 0 ${glitchColors.secondaryGlitch}`,
        `1px -1px 0 ${glitchColors.primaryGlitch}, -1px 1px 0 ${glitchColors.secondaryGlitch}`,
        `0 0 0 ${glitchColors.primaryGlitch}, 0 0 0 ${glitchColors.secondaryGlitch}`
      ],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 0.5,
        ease: "easeOut",
        delay: 3,
        repeatDelay: 2
      },
    },
  };

  // --- NEW: Dynamic Text Shadow/Outline for White Text ---
  // This function will apply a text shadow based on the current realm
  const getDynamicWhiteTextStyle = (isDark: boolean) => {
    return {
      // In dark mode, white text is fine, maybe a subtle glow or no shadow
      // In light mode, add a dark outline/shadow to make white text readable
      textShadow: isDark
        ? '0 0 8px rgba(255,255,255,0.2), 0 0 10px rgba(139,92,246,0.2)' // Subtle white glow with primary color hint
        : '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', // Strong dark outline
    };
  };

  const mixes = [
    {
      title: "SUNAME @ Elixr Orlando December Set",
      url: "https://soundcloud.com/sunamemusic/suname-elixr-orlando-december-set",
      image: "https://i1.sndcdn.com/artworks-gDPWvhZZKXtYBHGz-5ZtXyg-t500x500.jpg"
    },
    {
      title: "Elixir Set 20",
      url: "https://soundcloud.com/sunamemusic/elixir-set-20",
      image: "https://i1.sndcdn.com/artworks-gDPWvhZZKXtYBHGz-5ZtXyg-t500x500.jpg"
    },
    {
      title: "Elixr Full Set Preview",
      url: "https://soundcloud.com/sunamemusic/elixr-full-set-preview",
      image: "https://i1.sndcdn.com/artworks-gDPWvhZZKXtYBHGz-5ZtXyg-t500x500.jpg"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden relative">
      <ParticleSystem isDarkRealm={isDarkRealm} />

      {/* --- BACKGROUND WAVE --- */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-32 md:h-48 z-0"
        viewBox="0 0 350 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{ fill: isDarkRealm ? 'rgba(30,61,89,0.3)' : 'rgba(255,127,80,0.08)' }}
      >
        <motion.path
          d="M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z"
          animate={{ d: ["M0 70 C 150 120 250 20 350 80 L 350 100 L 0 100 Z", "M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z"] }} // Changed to cycle between two paths
          transition={{
            duration: 5, // Slower wave motion
            yoyo: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>


      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 z-10">
        <motion.div
          className="container mx-auto text-center relative z-20"
          variants={heroReveal}
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
        >
          {/* Artist Photo with Border Animation & Bounce */}
          <motion.div
            className="relative w-72 h-72 mx-auto mb-10 cursor-pointer group"
            variants={itemFadeUp}
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 150, damping: 10 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: isDarkRealm
                  ? ['linear-gradient(0deg, rgba(30,61,89,0.8), transparent)',
                     'linear-gradient(90deg, rgba(30,61,89,0.8), transparent)',
                     'linear-gradient(180deg, rgba(30,61,89,0.8), transparent)',
                     'linear-gradient(270deg, rgba(30,61,89,0.8), transparent)']
                  : ['linear-gradient(0deg, rgba(255,127,80,0.8), transparent)',
                     'linear-gradient(90deg, rgba(255,127,80,0.8), transparent)',
                     'linear-gradient(180deg, rgba(255,127,80,0.8), transparent)',
                     'linear-gradient(270deg, rgba(255,127,80,0.8), transparent)']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.img
              src="/images/artist_main.jpg"
              alt="SUNAME"
              className="w-full h-full object-cover rounded-full border-4 transition-colors duration-300"
              style={{
                borderColor: isDarkRealm ? 'rgba(30,61,89,0.8)' : 'rgba(255,127,80,0.8)'
              }}
            />
             {/* Glow effect on hover */}
            <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300
                            ${isDarkRealm ? 'bg-primary-500/50' : 'bg-orange-400/50'}`} />
          </motion.div>

          {/* SUNAME Heading - White with dynamic shadow */}
          <motion.h1
            className={`text-6xl md:text-7xl font-extrabold mb-4 relative text-white`}
            style={getDynamicWhiteTextStyle(isDarkRealm)} // Apply dynamic text shadow
            variants={heroReveal}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="absolute inset-0 block"
              style={{
                color: glitchColors.primaryGlitch,
                zIndex: -1,
                transform: 'translateZ(0)'
              }}
              animate={glitchVariants.animate}
            >
              SUNAME
            </motion.span>
            <motion.span
              className="absolute inset-0 block"
              style={{
                color: glitchColors.secondaryGlitch,
                zIndex: -2,
                transform: 'translateZ(0)'
              }}
              animate={glitchVariants.animate}
              transition={{ ...glitchVariants.animate.transition, delay: glitchVariants.animate.transition.delay + 0.05 }}
            >
              SUNAME
            </motion.span>
            <span className="relative z-0">SUNAME</span>
          </motion.h1>


          {/* Tagline - White with dynamic shadow */}
          <motion.p
            className={`text-xl md:text-2xl mb-8 text-white`}
            style={getDynamicWhiteTextStyle(isDarkRealm)} // Apply dynamic text shadow
            variants={heroReveal}
          >
            Within every dark realm, there is light – SUNAME
          </motion.p>

          {/* Social Icons - White with dynamic hover glow */}
          <motion.div
            className="flex justify-center space-x-6 mb-12"
            variants={heroReveal}
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
                className={`text-3xl md:text-4xl text-white`}
                style={{ // Add a subtle glow for light mode on icons
                  textShadow: !isDarkRealm ? '0 0 10px rgba(255,127,80,0.6), 0 0 20px rgba(255,127,80,0.4)' : 'none'
                }}
                whileHover={iconHover}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Latest Mixes Section - Titles remain adaptive for contrast */}
      <section className="py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl font-bold mb-12 text-center ${isDarkRealm ? 'text-white' : 'text-gray-900'}`}
            variants={sectionHeadingReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Latest Mixes
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {mixes.map((mix, index) => (
              <motion.div key={index} variants={itemFadeUp}>
                <MusicCard
                  title={mix.title}
                  imageUrl={mix.image}
                  link={mix.url}
                  isPlaying={activeMix === index}
                  onTogglePlay={() => setActiveMix(activeMix === index ? null : index)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Artist Photos Section - Titles remain adaptive for contrast */}
      <section className="py-20 px-4 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl font-bold mb-12 text-center ${isDarkRealm ? 'text-white' : 'text-gray-900'}`}
            variants={sectionHeadingReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Gallery
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden shadow-lg"
                variants={{
                  hidden: { opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 100, damping: 10, delay: index * 0.05 }
                  },
                }}
                whileHover={{ scale: 1.08, rotate: index % 2 === 0 ? 3 : -3, z: 10 }}
              >
                <img
                  src={`/images/artist_main.jpg`}
                  alt={`SUNAME ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity"
                  whileHover={{ opacity: 1 }}
                >
                  <p className="absolute bottom-4 left-4 text-white text-lg font-semibold">Live Set {index + 1}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section - White with dynamic shadow */}
      <section className="py-20 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            className={`text-3xl md:text-4xl font-bold italic mb-8 relative text-white`}
            style={getDynamicWhiteTextStyle(isDarkRealm)} // Apply dynamic text shadow
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 80,
                  damping: 10,
                  delay: 0.2
                }
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-6xl opacity-20 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}>&ldquo;</span>
            "WE ARE NOT RAVERS, WE ARE WAVERS. WE FLOOD CITIES THEN BRING PURE SUNLIGHT - SUNAME"
            <span className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-6xl opacity-20 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}>&rdquo;</span>
          </motion.blockquote>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.7 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.4 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <AudioVisualizer
              height={60}
              barCount={32}
              color={isDarkRealm ? 'rgb(139, 92, 246)' : 'rgb(255,127,80)'}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer - White with dynamic shadow */}
      <footer className="py-8 text-center z-10 relative">
        <motion.p
          className={`text-sm text-white`}
          style={getDynamicWhiteTextStyle(isDarkRealm)} // Apply dynamic text shadow
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9], delay: 0.1 }}
        >
          Artwork & Website by{' '}
          <motion.a
            href={biography.designer.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400 font-semibold"
            whileHover={{ scale: 1.1, textShadow: isDarkRealm ? '0px 0px 8px rgba(139, 92, 246, 0.5)' : '0px 0px 8px rgba(255,127,80,0.5)' }}
            transition={{ duration: 0.2 }}
          >
            JimmyDesigns
          </motion.a>
        </motion.p>
      </footer>
    </div>
  );
};

export default HomePage;