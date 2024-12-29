import React from 'react';
import type { Profile } from '../../contexts/ProfileContext';

interface Props {
  profile: Profile;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const ProfileAvatar: React.FC<Props> = ({ profile, size = 'md', onClick }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} rounded-lg overflow-hidden transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      style={{ backgroundColor: profile.color }}
    >
      <div className="w-full h-full flex items-center justify-center text-white text-4xl">
        {profile.avatar}
      </div>
    </button>
  );
};