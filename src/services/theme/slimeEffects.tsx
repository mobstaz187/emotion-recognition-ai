import React from 'react';

export const SlimeDrops = () => (
  <div className="fixed inset-0 pointer-events-none z-40">
    <div className="absolute top-0 left-0 right-0 h-16">
      <div className="animate-drip-1 absolute top-0 left-1/4 w-24 h-24 bg-[#50fa7b] opacity-30 blur-md" />
      <div className="animate-drip-2 absolute top-0 right-1/3 w-20 h-20 bg-[#50fa7b] opacity-20 blur-md" />
      <div className="animate-drip-3 absolute top-0 left-2/3 w-16 h-16 bg-[#50fa7b] opacity-25 blur-md" />
    </div>
  </div>
);

export const SlimeBorder = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <div className="absolute -inset-1 bg-gradient-to-r from-[#50fa7b]/30 to-[#50fa7b]/20 blur rounded-lg" />
    <div className="relative">{children}</div>
  </div>
);