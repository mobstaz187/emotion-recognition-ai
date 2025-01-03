import React from 'react';
import { useProfile } from '../../contexts/ProfileContext';

export const GetStartedButton: React.FC = () => {
  const { setCurrentProfile } = useProfile();

  return (
    <div className="text-center">
      <button
        onClick={() => setCurrentProfile(null)}
        className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 
          text-white rounded-xl overflow-hidden transition-all duration-300
          hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transform hover:scale-105"
      >
        <span className="relative z-10">Get Started</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 
          transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      </button>
    </div>
  );
};