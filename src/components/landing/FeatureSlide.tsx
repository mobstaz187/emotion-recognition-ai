import React from 'react';

interface Props {
  title: string;
  description: string;
  icon: string;
  color: string;
  image?: string;
  demoContent?: React.ReactNode;
}

export const FeatureSlide: React.FC<Props> = ({ 
  title, 
  description, 
  icon, 
  color,
  image,
  demoContent 
}) => {
  return (
    <div className="min-w-full px-4">
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8
        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
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
          <div className="flex-1">
            {image ? (
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : demoContent ? (
              <div className="aspect-video rounded-xl bg-black/30 backdrop-blur-xl border border-white/10 
                flex items-center justify-center">
                {demoContent}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};