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
  const heroRef = useRef<HTMLElement>(null);

  // Parallax scroll effects for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]); // Image moves faster for more parallax
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]); // Fade out faster

  // Mouse-based tilt for the artist photo (Interactive Depth)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

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

  // --- Animation Variants ---

  // Hero Section Elements - More aggressive, layered reveal
  const heroReveal = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5, // Longer, more impactful entrance
        ease: [0.6, 0.05, 0.01, 0.9], // Dramatic custom ease (expoOut-like)
        staggerChildren: 0.1,
        delayChildren: 0.4 // More significant delay
      },
    },
  };

  // Section Heading Reveal - Explodes into view
  const sectionHeadingReveal = {
    hidden: { opacity: 0, y: 100, scale: 0.8, rotateX: 90, transformOrigin: 'bottom center' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.0,
        ease: [0.6, 0.05, 0.01, 0.99], // Aggressive ease
      },
    },
  };

  // Card / Item entrance animation - More chaotic spring
  const itemChaosSpring = {
    hidden: { opacity: 0, y: 150, rotateZ: (Math.random() - 0.5) * 60, scale: 0.6 }, // Random initial rotation
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        mass: 1,
        restDelta: 0.001 // Ensure it settles
      },
    },
  };

  // Social Icon Hover Effect - More intense feedback
  const iconHover = {
    scale: 1.6, // Even larger scale
    rotate: [0, 20, -20, 0, 10, -10, 0], // More pronounced, slightly chaotic rotation
    y: -20,
    transition: { type: "spring", stiffness: 500, damping: 8, mass: 0.8, duration: 0.4 } // Faster, snappier
  };

  // --- Hero Text Glitch Effect Colors ---
  const glitchColors = {
    primaryGlitch: '#8b5cf6', // Purple
    secondaryGlitch: '#ec4899', // Pink
  };

  const glitchVariants = {
    animate: {
      opacity: [1, 0.8, 1, 0.6, 1],
      x: [0, 8, -8, 5, 0], // More aggressive horizontal glitch
      y: [0, 5, -5, 3, 0], // More aggressive vertical glitch
      textShadow: [
        `0 0 0 ${glitchColors.primaryGlitch}, 0 0 0 ${glitchColors.secondaryGlitch}`,
        `4px 4px 0 ${glitchColors.primaryGlitch}, -4px -4px 0 ${glitchColors.secondaryGlitch}`, // Larger shadow offset
        `0 0 0 ${glitchColors.primaryGlitch}, 0 0 0 ${glitchColors.secondaryGlitch}`,
        `2px -2px 0 ${glitchColors.primaryGlitch}, -2px 2px 0 ${glitchColors.secondaryGlitch}`,
        `0 0 0 ${glitchColors.primaryGlitch}, 0 0 0 ${glitchColors.secondaryGlitch}`
      ],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 0.3, // Faster, more frantic glitch
        ease: "easeOut",
        delay: 2, // Start glitch slightly earlier
        repeatDelay: 1.5 // Shorter repeat delay
      },
    },
  };

  // --- Dynamic Text Shadow/Outline for White Text (More pronounced) ---
  const getDynamicWhiteTextStyle = (isDark: boolean) => {
    return {
      textShadow: isDark
        ? '0 0 16px rgba(255,255,255,0.4), 0 0 20px rgba(139,92,246,0.4)' // Stronger glow for dark mode
        : '2px 2px 4px rgba(0,0,0,1), -2px -2px 4px rgba(0,0,0,1), 2px -2px 4px rgba(0,0,0,1), -2px 2px 4px rgba(0,0,0,1)', // Max contrast dark outline
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
      {/* Particle system as dynamic background */}
      <ParticleSystem isDarkRealm={isDarkRealm} />

      {/* --- BACKGROUND WAVE (More vibrant & visually impactful) --- */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-64 md:h-80 z-0" // Even larger wave area
        viewBox="0 0 350 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0, y: 150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1 }} // Slower, more majestic entry
        style={{ fill: isDarkRealm ? 'rgba(64,64,128,0.6)' : 'rgba(255,165,0,0.3)' }} // Deeper dark wave, more vibrant light wave
      >
        <motion.path
          d="M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z"
          animate={{
            d: [
              "M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z",
              "M0 70 C 150 120 250 20 350 80 L 350 100 L 0 100 Z",
              "M0 50 C 80 0 220 110 300 60 L 300 100 L 0 100 Z",
              "M0 65 C 120 20 230 90 350 50 L 350 100 L 0 100 Z", // Added another keyframe for variety
              "M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z"
            ]
          }}
          transition={{
            duration: 10, // Even slower, grander wave motion
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>


      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 z-10 overflow-hidden perspective-1000"> {/* Added perspective for 3D */}
        <motion.div
          className="container mx-auto text-center relative z-20"
          variants={heroReveal}
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
        >
          {/* Artist Photo with Border Animation & Interactive 3D Tilt */}
          <motion.div
            className="relative w-80 h-80 mx-auto mb-10 cursor-grab active:cursor-grabbing group rounded-full overflow-hidden" // Larger image, rounded corners
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, y: heroImageY, scale: 1.1 }} // Apply 3D tilt, parallax, and slight initial scale
            variants={itemChaosSpring} // A bit chaotic intro
            whileHover={{ scale: 1.15, boxShadow: isDarkRealm ? '0px 0px 30px rgba(139,92,246,0.9)' : '0px 0px 30px rgba(255,127,80,0.9)' }} // Even stronger, more active glow
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
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
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }} // Faster, more dynamic border animation
            />
            <motion.img
              src="/images/artist_main.jpg"
              alt="SUNAME"
              className="w-full h-full object-cover rounded-full border-4 transition-colors duration-300"
              style={{
                borderColor: isDarkRealm ? 'rgba(30,61,89,0.8)' : 'rgba(255,127,80,0.8)'
              }}
            />
             {/* Dynamic Glow effect around the border on hover */}
            <div className={`absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-300
                            ${isDarkRealm ? 'bg-primary-500/70' : 'bg-orange-400/70'}`} />
          </motion.div>

          {/* SUNAME Heading - White with dynamic shadow and parallax */}
          <motion.h1
            className={`text-7xl md:text-8xl font-extrabold mb-4 relative text-white leading-none`} // Larger, tighter leading
            style={{ ...getDynamicWhiteTextStyle(isDarkRealm), y: heroTextY, opacity: heroTextOpacity }}
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


          {/* Tagline - White with dynamic shadow and parallax */}
          <motion.p
            className={`text-xl md:text-2xl mb-8 text-white max-w-2xl mx-auto`}
            style={{ ...getDynamicWhiteTextStyle(isDarkRealm), y: heroTextY, opacity: heroTextOpacity }}
            variants={heroReveal}
          >
            Within every dark realm, there is light – SUNAME
          </motion.p>

          {/* Social Icons - White with dynamic hover glow */}
          <motion.div
            className="flex justify-center space-x-8 mb-12" // Increased spacing
            variants={heroReveal}
            style={{ y: heroTextY, opacity: heroTextOpacity }}
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
                className={`text-4xl md:text-5xl text-white`} // Larger icons
                style={{
                  textShadow: !isDarkRealm ? '0 0 15px rgba(255,127,80,0.8), 0 0 25px rgba(255,127,80,0.6)' : 'none' // Stronger glow
                }}
                whileHover={iconHover}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.08 }} // Slightly faster stagger
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
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${isDarkRealm ? 'text-white' : 'text-gray-900'}`}
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
              <motion.div key={index} variants={itemChaosSpring}> {/* Use itemChaosSpring */}
                <MusicCard
                  title={mix.title}
                  imageUrl={mix.image}
                  link={mix.url}
                  isPlaying={activeMix === index}
                  onTogglePlay={() => setActiveMix(activeMix === index ? null : index)}
                  isDarkRealm={isDarkRealm}
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
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${isDarkRealm ? 'text-white' : 'text-gray-900'}`}
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
                  hidden: { opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -10 : 10 }, // More initial rotation
                  visible: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: { type: "spring", stiffness: 100, damping: 10, delay: index * 0.05 }
                  },
                }}
                whileHover={{ scale: 1.12, rotate: index % 2 === 0 ? 5 : -5, z: 10, // More aggressive hover
                  boxShadow: isDarkRealm ? '0px 0px 35px rgba(139,92,246,1)' : '0px 0px 35px rgba(255,127,80,1)' // Intense hover glow
                }}
              >
                <img
                  src={`/images/artist_main.jpg`}
                  alt={`SUNAME ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity flex items-end p-4" // Darker overlay
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white text-lg font-semibold" style={getDynamicWhiteTextStyle(isDarkRealm)}>
                    Live Set {index + 1}
                  </p>
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
            style={getDynamicWhiteTextStyle(isDarkRealm)}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.9 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 70,
                  damping: 10,
                  delay: 0.3
                }
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-7xl opacity-30 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}>&ldquo;</span> {/* Larger quotes */}
            "WE ARE NOT RAVERS, WE ARE WAVERS. WE FLOOD CITIES THEN BRING PURE SUNLIGHT - SUNAME"
            <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-7xl opacity-30 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}>&rdquo;</span>
          </motion.blockquote>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.6, rotateX: 90 }, // Rotate in
              visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <AudioVisualizer
              height={80} // Taller visualizer
              barCount={48} // More bars
              color={isDarkRealm ? 'rgb(139, 92, 246)' : 'rgb(255,127,80)'}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer - White with dynamic shadow */}
      <footer className="py-8 text-center z-10 relative">
        <motion.p
          className={`text-base text-white`} // Slightly larger font for footer
          style={getDynamicWhiteTextStyle(isDarkRealm)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        >
          Artwork & Website by{' '}
          <motion.a
            href={biography.designer.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400 font-semibold"
            whileHover={{ scale: 1.1, textShadow: isDarkRealm ? '0px 0px 10px rgba(139, 92, 246, 0.7)' : '0px 0px 10px rgba(255,127,80,0.7)' }} // Stronger hover glow
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