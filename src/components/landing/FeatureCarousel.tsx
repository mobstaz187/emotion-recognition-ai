import React, { useState, useEffect } from 'react';
import { FeatureSlide } from './FeatureSlide';
import { features } from './featureData';

export const FeatureCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % features.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handlePrevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleDotClick = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="relative mb-12 select-none">
      <div className="overflow-hidden rounded-2xl relative">
        <div 
          className="flex transition-transform duration-500 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {features.map((feature, index) => (
            <FeatureSlide key={index} {...feature} />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/75 
            hover:bg-black/70 hover:text-white transition-all transform hover:scale-110
            backdrop-blur-sm border border-white/10"
          disabled={isTransitioning}
        >
          ←
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/75 
            hover:bg-black/70 hover:text-white transition-all transform hover:scale-110
            backdrop-blur-sm border border-white/10"
          disabled={isTransitioning}
        >
          →
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform
              ${currentSlide === index 
                ? 'bg-blue-500 scale-110' 
                : 'bg-gray-600 hover:bg-gray-500 hover:scale-105'
              }`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
};