import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Calendar, MapPin, Users } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AudioVisualizer from '../components/AudioVisualizer';
import { biography } from '../data/biography';

const upcomingEvents = [
  {
    title: "WAVE Night",
    date: "Coming Soon",
    location: "Miami, FL",
    description: "A night of deep progressive sounds and visual experiences.",
    capacity: "500",
    status: "Announced Soon"
  },
  {
    title: "WAVE Festival",
    date: "Coming Soon",
    location: "New York, NY",
    description: "A full day of electronic music and art installations.",
    capacity: "2000",
    status: "Announced Soon"
  },
  {
    title: "WAVE Underground",
    date: "Coming Soon",
    location: "Los Angeles, CA",
    description: "An intimate underground gathering of WAVE movement followers.",
    capacity: "300",
    status: "Announced Soon"
  }
];

const WaveEventsPage = () => {
  const { isDarkMode } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4"
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
            WAVE Events
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Join the movement. We are not ravers, we are WAVERS.
          </p>
        </motion.div>

        {/* Movement Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-8 mb-12 ${
            isDarkMode 
              ? 'bg-gray-900/60 border border-gray-800' 
              : 'bg-white/80 border border-gray-200'
          } backdrop-blur-sm shadow-xl text-center`}
        >
          <Waves 
            size={48} 
            className={`mx-auto mb-6 ${
              isDarkMode ? 'text-primary-400' : 'text-primary-600'
            }`} 
          />
          <h2 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            The WAVE Movement
          </h2>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            WAVE events represent a new era in electronic music culture. 
            We combine cutting-edge sound design with immersive visual experiences 
            to create unforgettable moments of connection and transformation.
          </p>
          <AudioVisualizer 
            height={40} 
            barCount={12}
            color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
          />
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className={`text-2xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Upcoming Events
          </h2>

          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`rounded-2xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-900/60 border border-gray-800' 
                  : 'bg-white/80 border border-gray-200'
              } backdrop-blur-sm shadow-xl cursor-pointer`}
              onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {event.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center">
                      <Calendar size={16} className={
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      } />
                      <span className={`ml-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {event.date}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin size={16} className={
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      } />
                      <span className={`ml-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {event.location}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users size={16} className={
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      } />
                      <span className={`ml-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Capacity: {event.capacity}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.button
                  className={`px-6 py-2 rounded-full ${
                    isDarkMode 
                      ? 'bg-primary-600 hover:bg-primary-500' 
                      : 'bg-primary-500 hover:bg-primary-400'
                  } text-white`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {event.status}
                </motion.button>
              </div>

              {selectedEvent === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <p className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {event.description}
                  </p>
                  <AudioVisualizer 
                    height={30} 
                    barCount={8}
                    color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`mt-12 rounded-2xl p-8 ${
            isDarkMode 
              ? 'bg-gray-900/60 border border-gray-800' 
              : 'bg-white/80 border border-gray-200'
          } backdrop-blur-sm shadow-xl text-center`}
        >
          <h2 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Stay Updated
          </h2>
          <p className={`mb-6 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Subscribe to receive updates about upcoming WAVE events
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } border focus:ring-2 focus:ring-primary-500 outline-none`}
            />
            <motion.button
              type="submit"
              className={`px-6 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-primary-600 hover:bg-primary-500' 
                  : 'bg-primary-500 hover:bg-primary-400'
              } text-white font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>

        {/* Credit */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
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
    </motion.div>
  );
};

export default WaveEventsPage;
