import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { biography } from '../data/biography';
import MusicCard from '../components/MusicCard';
import AudioVisualizer from '../components/AudioVisualizer';
import VinylRecord from '../components/VinylRecord';
import { ExternalLink } from 'lucide-react';

const featuredMixes = [
  {
    title: "Sunset Vibes Mix",
    description: "Deep house and melodic techno for sunset sessions",
    imageUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
    date: "February 2024"
  },
  {
    title: "Midnight Journey",
    description: "Progressive beats and hypnotic rhythms for late nights",
    imageUrl: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg",
    date: "January 2024"
  },
  {
    title: "Ethereal Dreams",
    description: "Ambient textures and downtempo explorations",
    imageUrl: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg",
    date: "December 2023"
  }
];

const MixesPage = () => {
  const { isDarkMode } = useTheme();
  const [activeMix, setActiveMix] = useState<number | null>(null);
  const [isVinylPlaying, setIsVinylPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Live Mixes
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Experience the journey through sound
          </p>
        </motion.div>

        {/* Featured Mix */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-8 mb-12 ${
            isDarkMode 
              ? 'bg-gray-900/60 border border-gray-800' 
              : 'bg-white/80 border border-gray-200'
          } backdrop-blur-sm shadow-xl`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <VinylRecord 
                size={300}
                isPlaying={isVinylPlaying}
                onTogglePlay={() => setIsVinylPlaying(!isVinylPlaying)}
                albumCover="https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg"
              />
            </div>
            
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Featured Mix
              </h2>
              <p className={`text-lg mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {biography.mixes[0].title}
              </p>
              
              <AudioVisualizer 
                height={60} 
                barCount={12}
                color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
                className="mb-8"
              />
              
              <motion.a
                href={biography.mixes[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full text-white ${
                  isDarkMode 
                    ? 'bg-primary-600 hover:bg-primary-500' 
                    : 'bg-primary-500 hover:bg-primary-400'
                } transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Listen on SoundCloud</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Recent Mixes Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={`text-2xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Mixes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMixes.map((mix, index) => (
              <MusicCard
                key={index}
                title={mix.title}
                description={mix.description}
                imageUrl={mix.imageUrl}
                isPlaying={activeMix === index}
                onTogglePlay={() => {
                  if (activeMix === index) {
                    setActiveMix(null);
                  } else {
                    setActiveMix(index);
                  }
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* SoundCloud Embed */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className={`rounded-2xl p-6 ${
            isDarkMode 
              ? 'bg-gray-900/60 border border-gray-800' 
              : 'bg-white/80 border border-gray-200'
          } backdrop-blur-sm shadow-xl`}
          >
            <iframe
              width="100%"
              height="450"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/sunamemusic&color=%239100ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            ></iframe>
          </div>
        </motion.div>

        {/* Credit Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className={`text-sm font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
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
    </motion.div>
  );
};

export default MixesPage;
