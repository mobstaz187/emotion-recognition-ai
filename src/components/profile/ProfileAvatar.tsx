import React from 'react';
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
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded-xl overflow-hidden transition-all duration-200 
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10
        flex items-center justify-center`}
      style={{ backgroundColor: profile.color }}
    >
      <span className="transform hover:scale-110 transition-transform duration-200">
        {profile.emoji}
      </span>
    </button>
  );
};