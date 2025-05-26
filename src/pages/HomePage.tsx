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

  // Parallax scroll effects for hero section - Softer movement
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Less aggressive parallax
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]); // Smoother fade out

  // Mouse-based subtle tilt for the artist photo
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [3, -3]); // Reduced tilt angle for subtlety
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

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

  // Hero Section Elements - Gentle Fade and Slide Up
  const heroReveal = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2, // Smooth, longer duration
        ease: [0.2, 0.8, 0.2, 1], // Classic ease-out for smoothness
        staggerChildren: 0.1,
        delayChildren: 0.4
      },
    },
  };

  // Section Heading Reveal - Soft Slide Up with blur
  const sectionHeadingReveal = {
    hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.0,
        ease: [0.2, 0.8, 0.2, 1], // Smooth ease
      },
    },
  };

  // Card / Item entrance animation - Gentle Fade Up
  const itemGentleRise = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.2, 0.8, 0.2, 1], // Smooth ease
      },
    },
  };

  // Social Icon Hover Effect - Subtle Scale & Glow
  const iconHover = {
    scale: 1.15,
    textShadow: isDarkRealm
      ? '0px 0px 15px rgba(139,92,246,0.6)'
      : '0px 0px 15px rgba(255,127,80,0.8)',
    transition: { type: "spring", stiffness: 300, damping: 15 }
  };

  // --- Main Heading "SUNAME" - Character Ripple/Wave Reveal ---
  const sunameCharReveal = {
    hidden: { opacity: 0, y: 30, rotateX: 20 }, // Subtle initial rotation
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  // Tagline (Word by Word) - Gentle Slide
  const taglineWordReveal = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  // Quote (Line by Line) - Soft Fade & Slide
  const quoteLineReveal = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  // --- Dynamic Text Shadow/Outline for White Text (Refined for smoothness) ---
  const getDynamicWhiteTextStyle = (isDark: boolean) => {
    return {
      textShadow: isDark
        ? '0 0 10px rgba(255,255,255,0.2), 0 0 12px rgba(139,92,246,0.2)' // Softer glow
        : '0 0 4px rgba(0,0,0,0.5), 0 0 6px rgba(0,0,0,0.3)', // Subtle, smooth dark shadow
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

  const splitTagline = biography.tagline.split(" ");
  // Note: Splitting by ". " can sometimes drop the last period. Ensure re-addition if necessary.
  const splitQuote = "WE ARE NOT RAVERS, WE ARE WAVERS. WE FLOOD CITIES THEN BRING PURE SUNLIGHT - SUNAME".split(". ");


  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Particle system as dynamic background - Sunset/Beach colors */}
      <ParticleSystem
        isDarkRealm={isDarkRealm}
        customColors={isDarkRealm ? ['#303F9F', '#42A5F5', '#8B5CF6'] : ['#FFD180', '#FFA07A', '#FF7043']} // Deep blues/purples for dark sunset, warm oranges for light sunset
      />

      {/* --- BACKGROUND WAVE - Karachi Sunset --- */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-80 md:h-96 z-0" // Larger, more dominant wave
        viewBox="0 0 350 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, delay: 1 }}
        style={{
          fill: isDarkRealm ? 'rgba(48,63,159,0.4)' : 'rgba(255,165,0,0.2)' // Muted blue for dark, soft orange for light
        }}
      >
        <motion.path
          d="M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z"
          animate={{
            d: [
              "M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z",
              "M0 70 C 150 120 250 20 350 80 L 350 100 L 0 100 Z",
              "M0 50 C 80 0 220 110 300 60 L 300 100 L 0 100 Z",
              "M0 65 C 120 20 230 90 350 50 L 350 100 L 0 100 Z",
              "M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z"
            ]
          }}
          transition={{
            duration: 12, // Even slower, more majestic wave motion
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>


      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 z-10 overflow-hidden perspective-1000">
        <motion.div
          className="container mx-auto text-center relative z-20"
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={heroReveal} // Using heroReveal for overall stagger and initial animation
        >
          {/* Artist Photo with Border Animation & Subtle 3D Tilt */}
          <motion.div
            className="relative w-80 h-80 mx-auto mb-10 cursor-grab active:cursor-grabbing group rounded-full overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, y: heroImageY, scale: 1 }} // Initial scale 1, no chaotic entry
            whileHover={{ scale: 1.05, boxShadow: isDarkRealm ? '0px 0px 25px rgba(139,92,246,0.6)' : '0px 0px 25px rgba(255,127,80,0.7)' }} // Softer glow
            transition={{ type: "spring", stiffness: 100, damping: 20 }} // Softer spring
          >
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
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }} // Smoother, slower border animation
            />
            <motion.img
              src="/images/artist_main.jpg"
              alt="SUNAME"
              className="w-full h-full object-cover rounded-full border-4 transition-colors duration-300"
              style={{
                borderColor: isDarkRealm ? 'rgba(48,63,159,0.8)' : 'rgba(255,165,0,0.8)' // Border color matching sunset theme
              }}
            />
            <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300
                            ${isDarkRealm ? 'bg-primary-500/50' : 'bg-orange-400/50'}`} /> {/* Softer blur/opacity */}
          </motion.div>

          {/* SUNAME Heading - Character Ripple Reveal */}
          <motion.h1
            className={`text-7xl md:text-8xl font-extrabold mb-4 relative text-white leading-none`}
            style={{ ...getDynamicWhiteTextStyle(isDarkRealm), y: heroTextY, opacity: heroTextOpacity }}
          >
            <motion.span
              className="relative z-0 inline-block overflow-hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08, // Gentle stagger
                    delayChildren: 0.8 // Delay after initial hero reveal
                  }
                }
              }}
            >
              {"SUNAME".split("").map((char, index) => (
                <motion.span key={index} className="inline-block" variants={sunameCharReveal}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>


          {/* Tagline - Word by Word Reveal */}
          <motion.p
            className={`text-xl md:text-2xl mb-8 text-white max-w-2xl mx-auto`}
            style={{ ...getDynamicWhiteTextStyle(isDarkRealm), y: heroTextY, opacity: heroTextOpacity }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.05, // Gentle stagger
                        delayChildren: 1.2 // Delay after SUNAME reveal
                    }
                }
            }}
          >
            {splitTagline.map((word, index) => (
              <motion.span key={index} className="inline-block mr-2" variants={taglineWordReveal}>
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Social Icons */}
          <motion.div
            className="flex justify-center space-x-8 mb-12"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1.5, // Delay after tagline
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
                className={`text-4xl md:text-5xl text-white`}
                style={{
                  textShadow: !isDarkRealm ? '0 0 10px rgba(255,127,80,0.5)' : 'none' // Soft orange glow for light mode
                }}
                whileHover={iconHover}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Latest Mixes Section */}
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
              <motion.div key={index} variants={itemGentleRise}> {/* GentleRise */}
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

      {/* Artist Photos Section */}
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
                  hidden: { opacity: 0, scale: 0.9, y: 50 }, // Smoother initial state
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.05 }
                  },
                }}
                whileHover={{ scale: 1.05, z: 10, // Softer hover scale
                  boxShadow: isDarkRealm ? '0px 0px 20px rgba(139,92,246,0.5)' : '0px 0px 20px rgba(255,127,80,0.6)' // Softer glow
                }}
              >
                <img
                  src={`/images/artist_main.jpg`}
                  alt={`SUNAME ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity flex items-end p-4" // Lighter overlay
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white text-lg font-semibold" style={getDynamicWhiteTextStyle(isDarkRealm)}>
                    Beach Set {index + 1} {/* Changed text to reflect beach theme */}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section - Soft Fade & Slide */}
      <section className="py-20 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            className={`text-3xl md:text-4xl font-bold italic mb-8 relative text-white`}
            style={getDynamicWhiteTextStyle(isDarkRealm)}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1, // Softer stagger
                        delayChildren: 0.2
                    }
                }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-7xl opacity-20 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}>&ldquo;</span>
            {splitQuote.map((line, index) => (
                <motion.span key={index} className="block mb-2" variants={quoteLineReveal}>
                    {line}
                    {index < splitQuote.length - 1 && "."}
                </motion.span>
            ))}
            <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-7xl opacity-20 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}>&rdquo;</span>
          </motion.blockquote>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 }, // Simple slide up
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <AudioVisualizer
              height={80}
              barCount={48}
              color={isDarkRealm ? 'rgb(139, 92, 246)' : 'rgb(255,127,80)'} // Orange for light mode
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center z-10 relative">
        <motion.p
          className={`text-base text-white`}
          style={getDynamicWhiteTextStyle(isDarkRealm)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
        >
          Artwork & Website by{' '}
          <motion.a
            href={biography.designer.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400 font-semibold"
            whileHover={{ scale: 1.05, textShadow: isDarkRealm ? '0px 0px 8px rgba(139, 92, 246, 0.5)' : '0px 0px 8px rgba(255,127,80,0.6)' }} // Softer glow
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