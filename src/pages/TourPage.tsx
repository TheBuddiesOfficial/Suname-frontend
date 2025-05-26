import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AudioVisualizer from '../components/AudioVisualizer';
import { biography } from '../data/biography';

const upcomingShows = [
  {
    date: '2024-03-15',
    venue: 'Club Nebula',
    city: 'Miami, FL',
    ticketLink: '#',
    status: 'Sold Out'
  },
  {
    date: '2024-04-01',
    venue: 'The Wave Room',
    city: 'New York, NY',
    ticketLink: '#',
    status: 'Available'
  },
  {
    date: '2024-04-15',
    venue: 'Pulse Festival',
    city: 'Los Angeles, CA',
    ticketLink: '#',
    status: 'Limited'
  }
];

const TourPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4 flex flex-col justify-between"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Tour Dates
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Join the WAVE movement at upcoming shows
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-8 ${
            isDarkMode 
              ? 'bg-gray-900/60 border border-gray-800' 
              : 'bg-white/80 border border-gray-200'
          } backdrop-blur-sm shadow-xl`}
        >
          <div className="space-y-8">
            {upcomingShows.map((show, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`flex flex-col md:flex-row items-center justify-between p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <Calendar className={`mr-4 ${
                    isDarkMode ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                  <div>
                    <h3 className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {new Date(show.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </h3>
                    <div className="flex items-center mt-1">
                      <MapPin size={16} className={
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      } />
                      <span className={`ml-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {show.venue} • {show.city}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.a
                  href={show.ticketLink}
                  className={`inline-flex items-center space-x-2 px-6 py-2 rounded-full ${
                    show.status === 'Sold Out'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : isDarkMode
                        ? 'bg-primary-600 hover:bg-primary-500'
                        : 'bg-primary-500 hover:bg-primary-400'
                  } text-white`}
                  whileHover={show.status !== 'Sold Out' ? { scale: 1.05 } : {}}
                  whileTap={show.status !== 'Sold Out' ? { scale: 0.95 } : {}}
                >
                  <Ticket size={18} />
                  <span>{show.status}</span>
                </motion.a>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <AudioVisualizer 
              height={40} 
              barCount={12}
              color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
              className="mb-8"
            />
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              More dates to be announced soon!
            </p>
          </div>
        </motion.div>
      </div>

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
    </motion.div>
  );
};

export default TourPage;
