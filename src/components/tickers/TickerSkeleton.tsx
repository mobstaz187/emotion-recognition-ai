import React from 'react';

interface Props {
  count: number;
}

export const TickerSkeleton: React.FC<Props> = ({ count }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="h-8 w-48 bg-white/5 rounded-lg mb-6 animate-pulse" />
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="h-16 bg-white/5 rounded-xl border border-white/10 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};