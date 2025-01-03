import React from 'react';

interface Props {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const FeatureSlide: React.FC<Props> = ({ title, description, icon, color }) => {
  return (
    <div className="min-w-full px-4">
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8
        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <span className="text-5xl mb-6 transform transition-all duration-300 hover:scale-110">{icon}</span>
          <h3 
            className="text-2xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent
              transition-all duration-300"
            style={{ 
              backgroundImage: `linear-gradient(to right, ${color}, ${color}CC)`
            }}
          >
            {title}
          </h3>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};