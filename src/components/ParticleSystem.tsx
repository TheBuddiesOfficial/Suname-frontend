import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Music,
  Disc,
  Headphones,
  Radio,
  Mic,
  Speaker,
  Music2,
  Music4,
} from 'lucide-react';

interface ParticleSystemProps {
  particleCount?: number;
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  particleCount = 20,
  className = '',
}) => {
  const getRandomIcon = useCallback((index: number) => {
    const icons = [Music, Disc, Headphones, Radio, Mic, Speaker, Music2, Music4];
    return icons[index % icons.length];
  }, []);

  return (
    // <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}> // Option 1: Comment out the entire return content
    //   ...
    // </div>
    // Option 2: Return null
    null
  );
};

export default ParticleSystem;