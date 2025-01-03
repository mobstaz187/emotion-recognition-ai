import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { FeatureSection } from './sections/FeatureSection';
import { TechnologySection } from './sections/TechnologySection';

export const LandingPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <HeroSection />
      <FeatureSection />
      <TechnologySection />
    </div>
  );
};