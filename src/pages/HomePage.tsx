import React, { useState, useEffect, useRef } from 'react';
 import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
 import { Link } from 'react-router-dom';
 import { ArrowRight, Play, Pause } from 'lucide-react';
 import { FaSoundcloud, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';
 import { biography } from '../data/biography';
 import AudioVisualizer from '../components/AudioVisualizer';
 import ParticleSystem from '../components/ParticleSystem';
 import MusicCard from '../components/MusicCard'; // Assuming MusicCard is a separate component

 // Define the props interface for the HomePage component
 interface HomePageProps {
  isDarkRealm: boolean; // Prop to determine if the theme is dark or light
 }

 // HomePage functional component
 const HomePage: React.FC<HomePageProps> = ({ isDarkRealm }) => {
  // State to manage which mix is currently active/playing
  const [activeMix, setActiveMix] = useState<number | null>(null);
  // State to trigger animations after the component has mounted
  const [isMounted, setIsMounted] = useState(false);
  // Ref for the hero section to track its scroll position for parallax effects
  const heroRef = useRef<HTMLElement>(null);

  // --- Parallax Scroll Effects for Hero Section ---
  // Tracks scroll progress relative to the hero section
  const { scrollYProgress } = useScroll({
    target: heroRef, // The element to track scroll for
    offset: ["start start", "end start"] // When to start and end tracking scroll
  });

  // Transforms scrollYProgress into vertical movement for the hero image (softer movement)
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Transforms scrollYProgress into vertical movement for hero text (softer movement)
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Transforms scrollYProgress into opacity for hero text (fades out as scrolled)
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // --- Mouse-based Subtle Tilt for the Artist Photo ---
  // Motion values to track mouse position relative to the photo center
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Transforms mouse Y position into rotation around X axis (tilt up/down)
  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  // Transforms mouse X position into rotation around Y axis (tilt left/right)
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  // Handler for mouse movement over the artist photo to calculate tilt
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect(); // Get element's size and position
    // Calculate mouse position relative to the center of the element
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  // Handler for mouse leaving the artist photo, resets tilt
  function handleMouseLeave() {
    x.set(0); // Reset X position
    y.set(0); // Reset Y position
  }

  // Effect to set isMounted to true once the component mounts, triggering initial animations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Animation Variants ---

  // Hero Section Elements Reveal - Gentle Fade and Slide Up
  const heroReveal = {
    hidden: { opacity: 0, y: 30, scale: 0.98 }, // Initial hidden state
    visible: {
      opacity: 1, // Visible state
      y: 0, // Reset Y position
      scale: 1, // Reset scale
      transition: {
        duration: 1.2, // Animation duration
        ease: [0.2, 0.8, 0.2, 1], // Custom easing curve
        staggerChildren: 0.1, // Stagger children animations
        delayChildren: 0.4 // Delay before children animations start
      },
    },
  };

  // Section Heading Reveal - Soft Slide Up with blur effect
  const sectionHeadingReveal = {
    hidden: { opacity: 0, y: 50, filter: 'blur(8px)' }, // Initial hidden state with blur
    visible: {
      opacity: 1, // Visible state
      y: 0, // Reset Y position
      filter: 'blur(0px)', // Remove blur
      transition: {
        duration: 1.0, // Animation duration
        ease: [0.2, 0.8, 0.2, 1], // Custom easing curve
      },
    },
  };

  // Card / Item Entrance Animation - Gentle Fade Up
  const itemGentleRise = {
    hidden: { opacity: 0, y: 60 }, // Initial hidden state
    visible: {
      opacity: 1, // Visible state
      y: 0, // Reset Y position
      transition: {
        duration: 0.9, // Animation duration
        ease: [0.2, 0.8, 0.2, 1], // Custom easing curve
      },
    },
  };

  // --- MAIN HEADING "SUNAME" - Character Ripple Reveal with Neon Glow ---
  const sunameCharReveal = {
    hidden: { opacity: 0, y: 20, scale: 0.9 }, // Softer initial state for individual characters
    visible: {
      opacity: 1, // Visible state
      y: 0, // Reset Y position
      scale: 1, // Reset scale
      transition: {
        duration: 0.8, // Animation duration
        ease: [0.2, 0.8, 0.2, 1], // Custom easing curve
      },
    },
  };

  // "SUNAME" Active Text Animation - Enhanced with dynamic neon and pulse
  const sunameActiveTextAnimation = {
    animate: isDarkRealm
      ? { // Dark Realm: Vibrant Purple Neon Pulse
          color: ['#E0BBE4', '#FFFFFF', '#E0BBE4'], // Light purple to white pulse
          textShadow: [
            '0 0 10px rgba(139,92,246,0.8), 0 0 20px rgba(139,92,246,0.6), 0 0 30px rgba(139,92,246,0.4)',
            '0 0 15px rgba(139,92,246,1), 0 0 25px rgba(139,92,246,0.8), 0 0 35px rgba(139,92,246,0.6)',
            '0 0 10px rgba(139,92,246,0.8), 0 0 20px rgba(139,92,246,0.6), 0 0 30px rgba(139,92,246,0.4)'
          ],
          transition: {
            repeat: Infinity, // Repeat animation infinitely
            duration: 3.5, // Duration of one cycle
            ease: "easeInOut", // Easing function
            repeatType: "mirror" // Reverse animation on repeat
          }
        }
      : { // Light Realm: Vibrant Orange Neon Pulse (Enhanced)
          color: ['#FFDDC1', '#FFFFFF', '#FFDDC1'], // Light orange to white pulse
          textShadow: [
            '0 0 12px rgba(255,165,0,0.9), 0 0 22px rgba(255,165,0,0.7), 0 0 32px rgba(255,165,0,0.5)', // Stronger, clearer glow
            '0 0 18px rgba(255,165,0,1), 0 0 28px rgba(255,165,0,0.8), 0 0 38px rgba(255,165,0,0.6)',
            '0 0 12px rgba(255,165,0,0.9), 0 0 22px rgba(255,165,0,0.7), 0 0 32px rgba(255,165,0,0.5)'
          ],
          transition: {
            repeat: Infinity, // Repeat animation infinitely
            duration: 4, // Slightly faster pulse duration
            ease: "easeInOut", // Easing function
            repeatType: "mirror" // Reverse animation on repeat
          }
        }
  };


  // --- TAGLINE - Gentle Wave Color Shift and Glow ---
  const taglineActiveTextAnimation = {
    animate: isDarkRealm
      ? { // Dark Realm: Subtle wave-like color shift (White to Light Purple) + subtle glow
          color: ['#FFFFFF', '#B39DDB', '#FFFFFF'],
          textShadow: [
            '0 0 4px rgba(179,157,219,0.5)',
            '0 0 8px rgba(179,157,219,0.8)',
            '0 0 4px rgba(179,157,219,0.5)'
          ],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror", delay: 0.1 } // Staggered start delay
        }
      : { // Light Realm: ENHANCED: Gentle Light Color Shift (Orange-tinted light to light gray) + subtle glow
          color: ['#FFC074', '#FFAA66', '#FFC074'], // More vibrant light orange colors
          textShadow: [
            '0 0 5px rgba(255,165,0,0.4)', // Slightly stronger glow for readability
            '0 0 10px rgba(255,165,0,0.6)',
            '0 0 5px rgba(255,165,0,0.4)'
          ],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror", delay: 0.1 } // Slightly faster and more noticeable
        }
  };

  // Tagline Word by Word Reveal animation
  const taglineWordReveal = {
    hidden: { opacity: 0, y: 15 }, // Subtle slide up initial state
    visible: {
      opacity: 1, // Visible state
      y: 0, // Reset Y position
      transition: {
        duration: 0.7, // Animation duration
        ease: [0.2, 0.8, 0.2, 1], // Custom easing curve
      },
    },
  };


  // --- QUOTE - Ethereal Fade & Color Breath (REFINED) ---
  const quoteActiveTextAnimation = {
    animate: isDarkRealm
      ? { // Dark Realm: Fading glow with slight color change
          color: ['#FFFFFF', 'rgba(179,157,219,0.9)', '#FFFFFF'], // White to light purple color animation
          textShadow: ['0 0 5px rgba(139,92,246,0.3)', '0 0 10px rgba(139,92,246,0.6)', '0 0 5px rgba(139,92,246,0.3)'], // Subtle glow effect
          transition: {
            repeat: Infinity, // Repeat animation infinitely
            duration: 6, // Duration of one cycle
            ease: "easeInOut", // Easing function
            repeatType: "mirror" // Reverse animation on repeat
          }
        }
      : { // Light Realm: ENHANCED: Dynamic color shift with a subtle shadow for depth
          color: ['#3A404F', '#2A2E3D', '#3A404F'], // Darker tones for contrast, but with movement
          textShadow: [
            '0 0 2px rgba(0,0,0,0.1)', '0 0 4px rgba(0,0,0,0.2)', '0 0 2px rgba(0,0,0,0.1)' // Very subtle dark shadow
          ],
          transition: {
            repeat: Infinity, // Repeat animation infinitely
            duration: 6, // Maintain a gentle breath duration
            ease: "easeInOut", // Easing function
            repeatType: "mirror" // Reverse animation on repeat
          }
        }
  };

  // Quote Line Reveal animation for a staggered entrance
  const quoteLineReveal = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' }, // Initial hidden state with blur
    visible: {
      opacity: 1, // Visible state
      y: 0, // Reset Y position
      filter: 'blur(0px)', // Remove blur
      transition: {
        duration: 1.0, // Animation duration
        ease: [0.2, 0.8, 0.2, 1] // Custom easing curve
      },
    },
  };

  // Dynamic Text Shadow/Outline for White Text - Simplified for clarity
  const getDynamicWhiteTextStyle = (isDark: boolean) => {
    return {
      // Adjusted text shadow for light mode for better visibility
      textShadow: isDark
        ? '0 0 8px rgba(255,255,255,0.1), 0 0 10px rgba(139,92,246,0.1)' // Glow for dark mode
        : '0 0 5px rgba(255,165,0,0.4), 0 0 8px rgba(255,165,0,0.2)' // Added subtle orange glow for light mode
    };
  };

  // Sample mix data for the "Latest Mixes" section
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
      url: "httpscloud.com/sunamemusic/elixr-full-set-preview",
      image: "https://i1.sndcdn.com/artworks-gDPWvhZZKXtYBHGz-5ZtXyg-t500x500.jpg"
    }
  ];

  // Split the tagline from biography data into words for staggered animation
  const splitTagline = biography.tagline.split(" ");
  // The specific tagline text for the quote section
  const quoteTagline = "WITHIN EVERY DARK REALM, THERE IS LIGHT – SUNAME";


  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Particle system as dynamic background, with colors based on the theme */}
      <ParticleSystem
        isDarkRealm={isDarkRealm}
        customColors={isDarkRealm ? ['#303F9F', '#42A5F5', '#8B5CF6'] : ['#FFD180', '#FFA07A', '#FF7043']}
      />

      {/* --- BACKGROUND WAVE - Animated SVG for a dynamic background element --- */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-80 md:h-96 z-0"
        viewBox="0 0 350 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0, y: 200 }} // Initial hidden state
        animate={{ opacity: 1, y: 0 }} // Animates into view
        transition={{ duration: 2.5, delay: 1 }} // Animation duration and delay
        style={{
          fill: isDarkRealm ? 'rgba(48,63,159,0.4)' : 'rgba(255,165,0,0.2)' // Fill color based on theme
        }}
      >
        <motion.path
          d="M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z"
          // Animates the 'd' attribute of the SVG path for a continuous wave motion
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
            duration: 12, // Duration of the wave animation cycle
            repeat: Infinity, // Repeat indefinitely
            ease: "easeInOut", // Easing function for smooth motion
          }}
        />
      </motion.svg>


      {/* Hero Section - Main content area for artist introduction */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 z-10 overflow-hidden perspective-1000">
        <motion.div
          className="container mx-auto text-center relative z-20"
          initial="hidden" // Initial animation state
          animate={isMounted ? "visible" : "hidden"} // Animate based on component mount state
          variants={heroReveal} // Apply hero reveal animation variants
        >
          {/* Artist Photo with Border Animation & Subtle 3D Tilt */}
          <motion.div
            className="relative w-80 h-80 mx-auto mb-10 cursor-grab active:cursor-grabbing rounded-full overflow-hidden"
            onMouseMove={handleMouseMove} // Handle mouse movement for tilt effect
            onMouseLeave={handleMouseLeave} // Handle mouse leave to reset tilt
            style={{ rotateX, rotateY, y: heroImageY, scale: 1 }} // Apply tilt and parallax Y
            animate={{ rotate: [0, 10, -10, 5, -5, 0] }} // Subtle continuous rotation for added dynamism
            transition={{
              duration: 8, // Duration of the rotation
              repeat: Infinity, // Repeat indefinitely
              ease: "linear", // Linear easing for continuous motion
            }}
          >
            {/* Animated border effect around the artist photo */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: isDarkRealm // Dynamic background gradient based on theme
                  ? ['linear-gradient(0deg, rgba(48,63,159,0.6), transparent)',
                     'linear-gradient(90deg, rgba(48,63,159,0.6), transparent)',
                     'linear-gradient(180deg, rgba(48,63,159,0.6), transparent)',
                     'linear-gradient(270deg, rgba(48,63,159,0.6), transparent)']
                  : ['linear-gradient(0deg, rgba(255,165,0,0.6), transparent)',
                     'linear-gradient(90deg, rgba(255,165,0,0.6), transparent)',
                     'linear-gradient(180deg, rgba(255,165,0,0.6), transparent)',
                     'linear-gradient(270deg, rgba(255,165,0,0.6), transparent)']
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }} // Continuous animation
            />
            {/* Artist image */}
            <motion.img
              src="/images/artist_main.jpg"
              alt="SUNAME"
              className="w-full h-full object-cover rounded-full border-4 transition-colors duration-300"
              style={{
                borderColor: isDarkRealm ? 'rgba(48,63,159,0.8)' : 'rgba(255,165,0,0.8)' // Border color based on theme
              }}
            />
            {/* Subtle background blur/glow effect for the photo */}
            <div className={`absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-300 ${isDarkRealm ? 'bg-primary-500/50' : 'bg-orange-400/50'}`} />
          </motion.div>

          {/* SUNAME Heading - Character Ripple Reveal with Neon Glow */}
          <motion.h1
            className={`text-7xl md:text-8xl font-extrabold mb-4 relative leading-none text-white`}
            style={{ y: heroTextY, opacity: heroTextOpacity }} // Apply parallax effects
          >
            <motion.span
              className="relative z-0 inline-block overflow-hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.08, // Stagger animation for individual characters
                    delayChildren: 0.8 // Delay before characters start animating
                  }
                }
              }}
            >
              {"SUNAME".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={sunameCharReveal} // Apply individual character reveal
                  animate={isMounted ? sunameActiveTextAnimation.animate : undefined} // Apply active text animation when mounted
                >
                  {char === " " ? "\u00A0" : char} {/* Render space character correctly */}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>


          {/* Tagline - Word by Word Reveal with Gentle Wave Color Shift and Glow */}
          <motion.p
            className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white`}
            style={{ y: heroTextY, opacity: heroTextOpacity }} // Apply parallax effects
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.05, // Stagger animation for individual words
                        delayChildren: 1.2 // Delay before words start animating
                    }
                }
            }}
          >
            {splitTagline.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                variants={taglineWordReveal} // Apply individual word reveal
                animate={isMounted ? taglineActiveTextAnimation.animate : undefined} // Apply active text animation when mounted
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Social Icons - Glow only when hovered, immediate stop on hover end */}
          <motion.div
            className="flex justify-center space-x-8 mb-12"
            variants={{
              hidden: { opacity: 0, y: 50 }, // Initial hidden state
              visible: {
                opacity: 1, // Visible state
                y: 0, // Reset Y position
                transition: {
                  delay: 1.5, // Delay before icons appear
                  staggerChildren: 0.1 // Stagger the initial entry of icons
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
                className="text-4xl md:text-5xl" // Initial size for the icon container
                initial={{ opacity: 0, y: 50, scale: 0.9 }} // Initial entrance animation
                animate={{ opacity: 1, y: 0, scale: 1 }} // Animate into view
                transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 1.5 + index * 0.1 }} // Entrance transition
              >
                <motion.span
                  className="inline-block" // Essential for `scale` and `filter` transforms
                  style={{ color: isDarkRealm ? '#FFFFFF' : '#1A202C' }} // Explicitly set initial color based on theme
                  whileHover={{ // Define hover effects directly here for dynamic `isDarkRealm` access
                    scale: 1.2, // Scale up on hover
                    color: isDarkRealm ? '#8B5CF6' : '#FF7043', // Dynamic color change on hover
                    filter: isDarkRealm
                      ? 'drop-shadow(0px 0px 8px rgba(139,92,246,0.9)) drop-shadow(0px 0px 15px rgba(139,92,246,0.7)) drop-shadow(0px 0px 25px rgba(139,92,246,0.5))' // Glow for dark mode
                      : 'drop-shadow(0px 0px 8px rgba(255,165,0,0.9)) drop-shadow(0px 0px 15px rgba(255,165,0,0.7)) drop-shadow(0px 0px 25px rgba(255,165,0,0.5))', // Glow for light mode
                  }}
                  onHoverEnd={() => {
                    // This function is called when the mouse leaves the element.
                    // We return the target state to ensure immediate reset.
                    return {
                      scale: 1, // Reset scale immediately
                      color: isDarkRealm ? '#FFFFFF' : '#1A202C', // Reset color immediately
                      filter: 'none' // Remove the drop-shadow (glow) immediately
                    };
                  }}
                  transition={{
                    // Apply a very quick transition for filter and color to ensure immediate stop.
                    // The scale transition remains a spring for a subtle bounce effect.
                    filter: { duration: 0.001, ease: "easeOut" }, // Ultra-fast transition for glow off
                    color: { duration: 0.001, ease: "easeOut" }, // Ultra-fast transition for color off
                    scale: { type: "spring", stiffness: 400, damping: 30, duration: 0.15 } // Keep spring for scale animation
                  }}
                >
                  <Icon /> {/* Render the Lucide icon */}
                </motion.span>
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
            variants={sectionHeadingReveal} // Apply heading reveal animation
            initial="hidden" // Initial animation state
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% in view
          >
            Latest Mixes
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden" // Initial animation state
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.3 }} // Trigger once when 30% in view
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }} // Stagger children for grid items
          >
            {mixes.map((mix, index) => (
              <motion.div key={index} variants={itemGentleRise}> {/* Apply item entrance animation */}
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
            variants={sectionHeadingReveal} // Apply heading reveal animation
            initial="hidden" // Initial animation state
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% in view
          >
            Gallery
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden" // Initial animation state
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.3 }} // Trigger once when 30% in view
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }} // Stagger children for grid items
          >
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden shadow-lg"
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 50 }, // Initial hidden state
                  visible: {
                    opacity: 1, // Visible state
                    scale: 1, // Reset scale
                    y: 0, // Reset Y position
                    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.05 } // Entrance transition
                  },
                }}
                whileHover={{ scale: 1.05, z: 10, // Scale up and bring to front on hover
                  boxShadow: isDarkRealm ? '0px 0px 20px rgba(139,92,246,0.5)' : '0px 0px 20px rgba(255,127,80,0.6)' // Dynamic shadow on hover
                }}
              >
                <img
                  src={`/images/artist_main.jpg`}
                  alt={`SUNAME ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity flex items-end p-4"
                  whileHover={{ opacity: 1 }} // Fade in overlay on hover
                >
                  <p className="text-white text-lg font-semibold" style={getDynamicWhiteTextStyle(isDarkRealm)}>
                    Beach Set {index + 1}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section - Ethereal Fade & Color Breath */}
      <section className="py-20 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            className={`text-3xl md:text-4xl font-bold italic mb-8 relative`}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1, // Stagger children (words)
                        delayChildren: 0.2 // Delay before words start animating
                    }
                }
            }}
            initial="hidden" // Initial animation state
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.6 }} // Trigger once when 60% in view
          >
            {/* Animated opening quote mark */}
            <motion.span
              className={`absolute -top-6 left-1/2 -translate-x-1/2 text-7xl opacity-20 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}
              initial={{ scale: 0, opacity: 0 }} // Initial state
              animate={{ scale: 1, opacity: 0.2 }} // Animate into view
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} // Transition properties
            >
                &ldquo; {/* HTML entity for left double quotation mark */}
            </motion.span>
            {/* Use the new quoteTagline for this section, split into words */}
            {quoteTagline.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mx-0.5" // Adjust spacing as needed
                  variants={quoteLineReveal} // Apply word reveal animation
                  animate={isMounted ? quoteActiveTextAnimation.animate : undefined} // Apply active text animation when mounted
                  style={{ color: isDarkRealm ? '#FFFFFF' : '#1A202C' }} // Dynamic color based on theme
                >
                    {word}
                </motion.span>
            ))}
            {/* Animated closing quote mark */}
            <motion.span
              className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-7xl opacity-20 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}
              initial={{ scale: 0, opacity: 0 }} // Initial state
              animate={{ scale: 1, opacity: 0.2 }} // Animate into view
              transition={{ duration: 0.8, ease: "easeOut", delay: quoteTagline.split(" ").length * 0.05 + 0.3 }} // Adjust delay based on word count
            >
                &rdquo; {/* HTML entity for right double quotation mark */}
            </motion.span>
          </motion.blockquote>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 }, // Initial state for AudioVisualizer
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 } } // Animate into view
            }}
            initial="hidden" // Initial animation state
            whileInView="visible" // Animate when in view
            viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% in view
          >
            <AudioVisualizer
              height={80} // Height of the visualizer
              barCount={48} // Number of bars in the visualizer
              color={isDarkRealm ? 'rgb(139, 92, 246)' : 'rgb(255,127,80)'} // Color of the bars based on theme
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center z-10 relative">
        <motion.p
          className={`text-base`}
          style={{ color: isDarkRealm ? '#FFFFFF' : '#1A202C' }} // Dynamic text color
          initial={{ opacity: 0, y: 30 }} // Initial state for footer text
          whileInView={{ opacity: 1, y: 0 }} // Animate into view
          viewport={{ once: true, amount: 0.8 }} // Trigger once when 80% in view
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }} // Transition properties
        >
          Artwork & Website by{' '}
          <motion.a
            href={biography.designer.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400 font-semibold"
            whileHover={{ scale: 1.03, textShadow: isDarkRealm ? '0px 0px 5px rgba(139, 92, 246, 0.5)' : '0px 0px 5px rgba(0,0,0,0.5)' }} // Hover effects for the link
            transition={{ duration: 0.15 }} // Transition for hover
          >
            JimmyDesigns
          </motion.a>
        </motion.p>
      </footer>
    </div>
  );
 };

 export default HomePage;