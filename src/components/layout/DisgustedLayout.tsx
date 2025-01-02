import React from 'react';
import { SlimeDrops, SlimeBorder } from '../../services/theme/slimeEffects';

interface Props {
  children: React.ReactNode;
}

export const DisgustedLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1a1b1c] text-gray-100">
      <SlimeDrops />
      <div className="relative z-50">
        <SlimeBorder>
          {children}
        </SlimeBorder>
      </div>
    </div>
  );
};