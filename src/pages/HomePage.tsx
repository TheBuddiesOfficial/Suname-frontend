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

  // Animation variants for initial load
  const initialFadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  };

  // Animation variants for sections
  const sectionFadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  };

  // Animation variant for social icons
  const iconBounce = {
    whileHover: { scale: 1.1, y: -5, transition: { duration: 0.2 } },
    whileTap: { scale: 0.9 },
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
    <div className="min-h-screen overflow-x-hidden">
      <ParticleSystem />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4">
        <motion.div
          className="container mx-auto text-center relative z-10"
          variants={initialFadeIn}
          initial="initial"
          animate={isMounted ? "animate" : "initial"}
        >
          {/* Logo - Subtle pulse animation on load */}

          {/* Artist Photo with Border Animation - Subtle zoom on hover */}
          <motion.div
            className="relative w-72 h-72 mx-auto mb-10 cursor-pointer"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: isDarkRealm
                  ? ['linear-gradient(0deg, rgba(30,61,89,0.8), transparent)',
                     'linear-gradient(180deg, rgba(30,61,89,0.8), transparent)',
                     'linear-gradient(360deg, rgba(30,61,89,0.8), transparent)']
                  : ['linear-gradient(0deg, rgba(255,127,80,0.8), transparent)',
                     'linear-gradient(180deg, rgba(255,127,80,0.8), transparent)',
                     'linear-gradient(360deg, rgba(255,127,80,0.8), transparent)']
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <motion.img
              src="/images/artist_main.jpg"
              alt="SUNAME"
              className="w-full h-full object-cover rounded-full border-4"
              style={{
                borderColor: isDarkRealm ? 'rgba(30,61,89,0.8)' : 'rgba(255,127,80,0.8)'
              }}
            />
          </motion.div>

          <motion.h1
            className={`text-6xl font-bold mb-4 ${isDarkRealm ? 'text-white' : 'text-gray-900'}`}
            variants={initialFadeIn}
            initial="initial"
            animate={isMounted ? "animate" : "initial"}
            transition={{ ...initialFadeIn.transition, delay: 0.2 }}
          >
            SUNAME
          </motion.h1>

          <motion.p
            className={`text-xl mb-8 ${isDarkRealm ? 'text-gray-300' : 'text-gray-700'}`}
            variants={initialFadeIn}
            initial="initial"
            animate={isMounted ? "animate" : "initial"}
            transition={{ ...initialFadeIn.transition, delay: 0.4 }}
          >
            {biography.tagline}
          </motion.p>

          {/* Social Icons - Bounce on hover */}
          <motion.div
            className="flex justify-center space-x-6 mb-12"
            variants={initialFadeIn}
            initial="initial"
            animate={isMounted ? "animate" : "initial"}
            transition={{ ...initialFadeIn.transition, delay: 0.6 }}
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
                className={`text-3xl ${isDarkRealm ? 'text-white' : 'text-gray-900'} hover:text-primary-500 transition-colors`}
                variants={iconBounce}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Latest Mixes Section - Fade in on scroll */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl font-bold mb-12 text-center ${isDarkRealm ? 'text-white' : 'text-gray-900'}`}
            variants={sectionFadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={sectionFadeIn.viewport}
          >
            Latest Mixes
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {mixes.map((mix, index) => (
              <motion.div key={index} variants={sectionFadeIn}>
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

      {/* Artist Photos Section - Slide in from sides on scroll */}
      <section className="py-20 px-4 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: isDarkRealm
              ? ['linear-gradient(0deg, rgba(30,61,89,0.2), transparent)',
                 'linear-gradient(180deg, rgba(30,61,89,0.2), transparent)']
              : ['linear-gradient(0deg, rgba(255,127,80,0.2), transparent)',
                 'linear-gradient(180deg, rgba(255,127,80,0.2), transparent)']
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl font-bold mb-12 text-center ${isDarkRealm ? 'text-white' : 'text-gray-900'}`}
            variants={{
              initial: { opacity: 0, y: 60 },
              whileInView: { opacity: 1, y: 0 },
            }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            Gallery
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              initial: { opacity: 0 },
              whileInView: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden"
                variants={{
                  initial: { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
                  whileInView: { x: 0, opacity: 1 },
                }}
                transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={`/images/artist_main.jpg`}
                  alt={`SUNAME ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity"
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section - Fade in with a slight delay */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            className={`text-3xl font-bold italic mb-8 ${isDarkRealm ? 'text-primary-400' : 'text-primary-600'}`}
            variants={{
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
            }}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            "{biography.motto}"
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
            viewport={{ once: true }}
          >
            <AudioVisualizer
              height={60}
              barCount={24}
              color={isDarkRealm ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer - Subtle fade in */}
      <footer className="py-8 text-center">
        <motion.p
          className={`text-sm ${isDarkRealm ? 'text-gray-400' : 'text-gray-600'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Artwork & Website by{' '}
          <motion.a
            href={biography.designer.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {biography.designer.name}
          </motion.a>
        </motion.p>
      </footer>
    </div>
  );
};

export default HomePage;