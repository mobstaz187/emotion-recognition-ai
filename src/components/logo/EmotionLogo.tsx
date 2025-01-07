import React from 'react';

export const EmotionLogo: React.FC = () => {
  return (
    <div className="relative">
      <span className="text-4xl font-black tracking-normal bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent 
        relative z-10 font-display uppercase">
        PELIOS
      </span>
      <div className="absolute -inset-1 bg-gradient-to-r from-[#4F46E5]/20 to-[#7C3AED]/20 blur-lg rounded-lg" />
    </div>
  );
};