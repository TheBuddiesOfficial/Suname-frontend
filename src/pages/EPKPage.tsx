import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ExternalLink,
  Instagram,
  Twitter,
  Youtube,
  Music,
  Cloud,
} from 'lucide-react';
import { biography } from '../data/biography';
import { useTheme } from '../context/ThemeContext';
import AudioVisualizer from '../components/AudioVisualizer';
import VinylRecord from '../components/VinylRecord';

// Map socials to icons
const socialIcons: Record<string, JSX.Element> = {
  instagram: <Instagram size={16} />,
  twitter: <Twitter size={16} />,
  youtube: <Youtube size={16} />,
  spotify: <Music size={16} />,
  soundcloud: <Cloud size={16} />,
  tiktok: <Youtube size={16} />, // Placeholder icon for TikTok
  appleMusic: <Music size={16} />,
};

const EPKPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [showFullBio, setShowFullBio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Change document title on load
  useEffect(() => {
    document.title = "SUNAME WAVE - Electronic Press Kit";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="fixed top-0 right-0 w-full h-full pointer-events-none z-0"
      >
        <div className="absolute top-60 right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl animate-pulse delay-500" />
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1500" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            SUNAME WAVE
          </h1>
        </motion.div>

        <div className="space-y-12">
          {/* Artist Info */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl p-8 ${
              isDarkMode
                ? 'bg-gray-900/60 border border-gray-800'
                : 'bg-white/80 border border-gray-200'
            } backdrop-blur-sm shadow-xl`}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)' }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex-shrink-0"
              >
                <VinylRecord size={200} />
              </motion.div>

              <div>
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {biography.name}
                </h2>

                <p
                  className={`text-lg mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {biography.bio}
                </p>

                {/* Show More / Less Biography */}
                <div className={`text-gray-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  {showFullBio ? (
                    <p className="whitespace-pre-line">{biography.fullBio}</p>
                  ) : null}
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="mt-2 text-primary-500 hover:underline focus:outline-none"
                    aria-expanded={showFullBio}
                  >
                    {showFullBio ? 'Show Less' : 'Show More'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {biography.genres.map((genre) => (
                    <span
                      key={genre}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode
                          ? 'bg-gray-800 text-gray-200'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4"
                >
                  {[
                    { title: 'Age', value: biography.age + ' years old' },
                    { title: 'Location', value: biography.location },
                    { title: 'Movement', value: biography.movementName },
                    { title: 'Tagline', value: `"${biography.tagline}"` },
                    { title: 'Genres', value: biography.genres.join(' | ') },
                  ].map(({ title, value }) => (
                    <motion.div
                      key={title}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 12px #8b5cf6' }}
                      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                      className={`p-4 rounded-xl shadow-xl transform transition-transform duration-300 ${
                        isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <h4 className="text-sm uppercase font-semibold mb-1 tracking-wider opacity-80">
                        {title}
                      </h4>
                      <p className="text-lg font-medium">{value}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Quote */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-8"
          >
            <blockquote
              className={`text-2xl font-bold italic ${
                isDarkMode ? 'text-primary-400' : 'text-primary-600'
              }`}
            >
              "{biography.quote}"
            </blockquote>
          </motion.section>

          {/* Movement */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`rounded-2xl p-8 ${
              isDarkMode
                ? 'bg-gray-900/60 border border-gray-800'
                : 'bg-white/80 border border-gray-200'
            } backdrop-blur-sm shadow-xl text-center`}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)' }}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {biography.movementName}
            </h2>
            <p
              className={`text-xl mb-6 ${
                isDarkMode ? 'text-primary-400' : 'text-primary-600'
              }`}
            >
              {biography.motto}
            </p>
            <AudioVisualizer
              height={40}
              barCount={12}
              color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
            />
          </motion.section>

          {/* Electronic Kit - Artist Photos */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`rounded-2xl p-8 ${
              isDarkMode
                ? 'bg-gray-900/60 border border-gray-800'
                : 'bg-white/80 border border-gray-200'
            } backdrop-blur-sm shadow-xl`}
            whileHover={{ scale: 1.01, boxShadow: '0 15px 35px rgba(139, 92, 246, 0.2)' }}
          >
            <motion.h2
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className={`text-3xl font-bold mb-2 text-center ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Electronic Kit
            </motion.h2>
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`text-center mb-8 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Professional artist photos and promotional materials
            </motion.p>

            {/* Photo Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Main Hero Photo */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: '0 25px 50px rgba(139, 92, 246, 0.4)',
                  transition: { type: 'spring', stiffness: 300 }
                }}
                className="md:col-span-2 lg:col-span-1 lg:row-span-2"
              >
                <div className={`
                  relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-3
                  ${isDarkMode
                    ? 'border-purple-500/30 bg-gradient-to-br from-gray-800 via-gray-900 to-black'
                    : 'border-purple-300/50 bg-gradient-to-br from-gray-50 via-white to-gray-100'
                  }
                  shadow-2xl group cursor-pointer
                `}>
                  {/* Animated background */}
                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                        'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
                        'linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
                        'linear-gradient(315deg, rgba(16, 185, 129, 0.1), rgba(236, 72, 153, 0.1))',
                        'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  />

                  {/* Placeholder content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className={`w-20 h-20 mx-auto mb-4 rounded-full border-4 flex items-center justify-center ${
                          isDarkMode ? 'border-purple-400 bg-purple-900/30' : 'border-purple-600 bg-purple-100/50'
                        }`}
                      >
                        <Music size={32} className={isDarkMode ? 'text-purple-300' : 'text-purple-700'} />
                      </motion.div>
                      <h3 className={`text-lg font-bold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Main Portrait
                      </h3>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        High-res artist photo
                      </p>
                    </motion.div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-purple-600/60 via-purple-500/20 to-transparent"
                  />

                  {/* Floating particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, Math.sin(i) * 10, 0],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeInOut'
                      }}
                      className={`absolute w-2 h-2 rounded-full ${
                        i % 3 === 0 ? 'bg-purple-400' :
                        i % 3 === 1 ? 'bg-blue-400' : 'bg-pink-400'
                      }`}
                      style={{
                        left: `${15 + i * 12}%`,
                        top: `${20 + (i % 3) * 20}%`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Action Shot */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                }}
                className="aspect-square"
              >
                <div className={`
                  relative w-full h-full rounded-xl overflow-hidden border-2
                  ${isDarkMode
                    ? 'border-blue-500/30 bg-gradient-to-br from-blue-900/50 to-gray-900'
                    : 'border-blue-300/50 bg-gradient-to-br from-blue-50 to-white'
                  }
                  shadow-xl group cursor-pointer
                `}>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full border-2 flex items-center justify-center ${
                        isDarkMode ? 'border-blue-400 bg-blue-900/40' : 'border-blue-600 bg-blue-100/60'
                      }`}>
                        <Music size={24} className={isDarkMode ? 'text-blue-300' : 'text-blue-700'} />
                      </div>
                      <h3 className={`font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Performance
                      </h3>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Live action shot
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Studio Shot */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: -2,
                  boxShadow: '0 20px 40px rgba(236, 72, 153, 0.3)',
                }}
                className="aspect-square"
              >
                <div className={`
                  relative w-full h-full rounded-xl overflow-hidden border-2
                  ${isDarkMode
                    ? 'border-pink-500/30 bg-gradient-to-br from-pink-900/50 to-gray-900'
                    : 'border-pink-300/50 bg-gradient-to-br from-pink-50 to-white'
                  }
                  shadow-xl group cursor-pointer
                `}>
                  <motion.div
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.1), transparent)',
                        'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1), transparent)',
                        'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1), transparent)',
                        'radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1), transparent)',
                        'radial-gradient(circle at 20% 20%, rgba(236, 72, 153, 0.1), transparent)',
                      ]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ x: [-3, 3, -3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full border-2 flex items-center justify-center ${
                        isDarkMode ? 'border-pink-400 bg-pink-900/40' : 'border-pink-600 bg-pink-100/60'
                      }`}>
                        <Music size={24} className={isDarkMode ? 'text-pink-300' : 'text-pink-700'} />
                      </div>
                      <h3 className={`font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Studio Session
                      </h3>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Behind the scenes
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Artistic Shot */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)',
                }}
                className="aspect-square"
              >
                <div className={`
                  relative w-full h-full rounded-xl overflow-hidden border-2
                  ${isDarkMode
                    ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-900/50 to-gray-900'
                    : 'border-emerald-300/50 bg-gradient-to-br from-emerald-50 to-white'
                  }
                  shadow-xl group cursor-pointer
                `}>
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full border-2 flex items-center justify-center ${
                        isDarkMode ? 'border-emerald-400 bg-emerald-900/40' : 'border-emerald-600 bg-emerald-100/60'
                      }`}>
                        <Music size={24} className={isDarkMode ? 'text-emerald-300' : 'text-emerald-700'} />
                      </div>
                      <h3 className={`font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Artistic
                      </h3>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Creative portrait
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Candid Shot */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: '0 20px 40px rgba(251, 146, 60, 0.3)',
                }}
                className="aspect-square"
              >
                <div className={`
                  relative w-full h-full rounded-xl overflow-hidden border-2
                  ${isDarkMode
                    ? 'border-orange-500/30 bg-gradient-to-br from-orange-900/50 to-gray-900'
                    : 'border-orange-300/50 bg-gradient-to-br from-orange-50 to-white'
                  }
                  shadow-xl group cursor-pointer
                `}>
                  <motion.div
                    animate={{
                      x: [0, 10, -10, 0],
                      y: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-bl from-orange-500/15 to-red-500/15"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-center"
                    >
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full border-2 flex items-center justify-center ${
                        isDarkMode ? 'border-orange-400 bg-orange-900/40' : 'border-orange-600 bg-orange-100/60'
                      }`}>
                        <Music size={24} className={isDarkMode ? 'text-orange-300' : 'text-orange-700'} />
                      </div>
                      <h3 className={`font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Candid
                      </h3>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Natural moment
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Download Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-8"
            >
              <a
                href="/kit/Suname-Electronic-Kit"
                download="Suname-Electronic-Kit.zip"
                className={`inline-block px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                } shadow-lg`}
              >
                Download Electronic Kit
              </a>
            </motion.div>
          </motion.section>

          {/* Social Links */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={`rounded-2xl p-8 ${
              isDarkMode
                ? 'bg-gray-900/60 border border-gray-800'
                : 'bg-white/80 border border-gray-200'
            } backdrop-blur-sm shadow-xl`}
          >
            <h2
              className={`text-2xl font-bold mb-6 text-center ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Connect with SUNAME
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(biography.socials).map(([platform, url]) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg cursor-pointer ${
                    isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                  whileHover={{ scale: 1.07, boxShadow: '0 0 10px #8b5cf6' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {socialIcons[platform] || <Music size={16} />}
                  <span
                    className={`capitalize ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {platform}
                  </span>
                  <ExternalLink size={16} />
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* Credit */}
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <p
              className={`text-sm font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Artwork & Website by{' '}
              <a
                href={biography.designer.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-primary-500 hover:text-primary-400"
              >
                {biography.designer.name}
              </a>
            </p>
          </motion.section>
        </div> 
      </div> 
    </motion.div> 
  );
};

export default EPKPage;
