import React from 'react';

export const LandingHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Welcome to Emotion AI
      </h1>
      <p className="text-lg text-gray-400">
        Discover the power of emotion recognition technology
      </p>
    </div>
  );
};