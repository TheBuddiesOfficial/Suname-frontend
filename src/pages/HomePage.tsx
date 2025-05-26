import React, { useState } from 'react';
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

const ARTIST_MAIN_PHOTO = '/images/artist_main.jpg';
const MIX_COVER_1 = '/images/mix_cover_01.jpg';
const MIX_COVER_2 = '/images/mix_cover_02.jpg';
const GALLERY_PHOTO_1 = '/images/gallery_01.jpg';
const GALLERY_PHOTO_2 = '/images/gallery_02.jpg';
const GALLERY_PHOTO_3 = '/images/gallery_03.jpg';

const HomePage: React.FC<HomePageProps> = ({ isDarkRealm }) => {
  const [isVinylPlaying, setIsVinylPlaying] = useState(false);
  const [activeMix, setActiveMix] = useState<number | null>(null);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const sunameTitleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
        type: "spring",
        stiffness: 70,
        damping: 10,
      },
    },
  };

  const taglineWordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const taglineWords = biography.tagline.split(' ');

  const displayMixes = biography.mixes.length > 0 ? biography.mixes : [
    { title: 'Summer Grooves Mix', image: MIX_COVER_1, url: 'https://soundcloud.com/your-mix-1' },
    { title: 'Deep House Session', image: MIX_COVER_2, url: 'https://soundcloud.com/your-mix-2' },
  ];

  const displayGalleryPhotos = biography.artistPhotos.additional.length > 0 ? biography.artistPhotos.additional : [
    GALLERY_PHOTO_1,
    GALLERY_PHOTO_2,
    GALLERY_PHOTO_3,
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <ParticleSystem isDarkRealm={isDarkRealm} />

      <section className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
        <motion.div
          className="container mx-auto text-center px-4 sm:px-6 lg:px-8"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="relative w-72 h-72 mx-auto mb-10 rounded-full overflow-hidden border-4 border-current shadow-2xl"
            variants={itemVariants}
            transition={{ ...itemVariants.visible.transition, duration: 1.2, type: "spring", stiffness: 80, damping: 15 }}
          >
            <motion.img
              src={ARTIST_MAIN_PHOTO}
              alt="SUNAME"
              className="w-full h-full object-cover"
              animate={{
                scale: [1, 1.04, 1],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: isDarkRealm
                  ? ['linear-gradient(45deg, rgba(50,80,120,0.5), transparent)',
                    'linear-gradient(225deg, rgba(50,80,120,0.5), transparent)']
                  : ['linear-gradient(45deg, rgba(255,140,0,0.5), transparent)',
                    'linear-gradient(225deg, rgba(255,140,0,0.5), transparent)'],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute inset-0 rounded-full border-4`}
              style={{ borderColor: isDarkRealm ? 'rgba(70,130,180,0.7)' : 'rgba(255,165,0,0.7)' }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5
              }}
            />
          </motion.div>

          <motion.h1
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-4 tracking-tighter transition-colors duration-500 ease-in-out relative
              ${isDarkRealm ? 'text-white drop-shadow-lg' : 'text-gray-900 drop-shadow-md'}`}
            variants={sunameTitleVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...sunameTitleVariants.visible.transition, delay: 0.3 }}
          >
            SUNAME
            <motion.span
              className="absolute inset-0 z-0"
              style={{
                filter: 'blur(10px)',
                background: isDarkRealm
                  ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(255,223,0,0.4) 0%, transparent 70%)',
                mixBlendMode: 'screen',
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </motion.h1>

          <motion.p
            className={`text-lg md:text-2xl lg:text-3xl mb-8 font-light max-w-2xl mx-auto transition-colors duration-500 ease-in-out relative
              ${isDarkRealm ? 'text-gray-300' : 'text-gray-700'}`}
          >
            <motion.span
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.8 } },
                hidden: {  },
              }}
            >
              {taglineWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={taglineWordVariants}
                  style={{ display: 'inline-block', marginRight: '0.4em' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
                className="absolute inset-0 -z-10"
                animate={{ y: [0, 5, 0], x: [0, 2, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-7 mb-12"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: FaSoundcloud, url: biography.socials.soundcloud },
              { icon: FaInstagram, url: biography.socials.instagram },
              { icon: FaTwitter, url: biography.socials.twitter },
              { icon: FaTiktok, url: biography.socials.tiktok },
              { icon: FaYoutube, url: biography.socials.youtube },
              { icon: FaSpotify, url: biography.socials.spotify },
              { icon: FaApple, url: biography.socials.appleMusic },
            ].map(({ icon: Icon, url }, index) => (
              <motion.a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-3xl sm:text-4xl ${
                  isDarkRealm ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
                } transition-colors duration-200`}
                variants={itemVariants}
                transition={{ ...itemVariants.visible.transition, delay: 0.7 + index * 0.08 }}
                whileHover={{ scale: 1.4, rotate: [0, 15, -15, 0], filter: 'drop-shadow(0px 0px 8px rgba(0,0,0,0.3))' }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            transition={{ ...itemVariants.visible.transition, delay: 1.2 }}
          >
            <Link
              to="/music"
              className={`inline-flex items-center px-6 py-3 sm:px-10 sm:py-5 text-lg sm:text-xl font-bold rounded-full shadow-lg relative overflow-hidden group transition-all duration-300
                ${isDarkRealm
                  ? 'bg-gradient-to-r from-blue-700 to-purple-700 text-white'
                  : 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                }`}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Music <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-200" />
              <motion.span
                className="absolute inset-0 bg-white opacity-20"
                initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.4, 0],
                  x: ['-50%', '150%', '-50%'],
                  y: ['-50%', '150%', '-50%'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.5
                }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-16 text-center transition-colors duration-500 ease-in-out ${
              isDarkRealm ? 'text-white' : 'text-gray-900'
            }`}
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            Latest Mixes
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            <AnimatePresence>
              {displayMixes.map((mix, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  exit="hidden"
                  transition={{ ...cardVariants.visible.transition, delay: index * 0.15 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                >
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
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 flex justify-center items-center">
        <VinylRecord
          isPlaying={isVinylPlaying}
          onTogglePlay={() => setIsVinylPlaying(!isVinylPlaying)}
          albumArt={biography.mixes[0]?.image || MIX_COVER_1}
          isDarkRealm={isDarkRealm}
        />
      </section>

      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-transparent to-gray-900/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-16 text-center transition-colors duration-500 ease-in-out ${
              isDarkRealm ? 'text-white' : 'text-gray-900'
            }`}
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            Gallery
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            <AnimatePresence>
              {displayGalleryPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-2xl group cursor-pointer"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  exit="hidden"
                  transition={{ ...cardVariants.visible.transition, delay: index * 0.18 }}
                  whileHover={{ scale: 1.05, rotate: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={photo}
                    alt={`SUNAME ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 flex items-end p-4 sm:p-6 text-white font-semibold text-base sm:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: isDarkRealm
                        ? 'linear-gradient(to top, rgba(30,61,89,0.9), transparent)'
                        : 'linear-gradient(to top, rgba(255,127,80,0.9), transparent)'
                    }}
                  >
                    <p>Photo {index + 1}</p>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            className={`text-2xl md:text-3xl lg:text-5xl font-bold italic leading-tight mb-8 sm:mb-12 transition-colors duration-500 ease-in-out ${
              isDarkRealm ? 'text-primary-300' : 'text-primary-700'
            }`}
            variants={sectionHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
          >
            "{biography.motto}"
          </motion.blockquote>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...itemVariants.visible.transition, delay: 0.3 }}
          >
            <AudioVisualizer
              height={70}
              barCount={48}
              color={isDarkRealm ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-8 text-center">
        <p className={`text-xs sm:text-sm transition-colors duration-500 ease-in-out ${isDarkRealm ? 'text-gray-400' : 'text-gray-600'}`}>
          Artwork & Website by{' '}
          <a
            href={biography.designer.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400 transition-colors duration-200"
          >
            {biography.designer.name}
          </a>
        </p>
      </section>
    </div>
  );
};

export default HomePage;