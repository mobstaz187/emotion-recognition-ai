import React from 'react';
import { motion } from 'framer-motion';
import type { Profile } from '../../contexts/ProfileContext';

interface Props {
  profile: Profile;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const ProfileAvatar: React.FC<Props> = ({ profile, size = 'md', onClick }) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-6xl'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded-xl overflow-hidden transition-all duration-200 
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
        bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10
        flex items-center justify-center relative group`}
      style={{ backgroundColor: profile.color }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span 
        className="relative z-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {profile.emoji}
      </motion.span>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at center, ${profile.color}40 0%, transparent 70%)`
        }}
      />
    </motion.button>
  );
};