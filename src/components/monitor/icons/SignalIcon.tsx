import React from 'react';

type SignalType = 'bullish' | 'bearish' | 'neutral';

interface Props {
  type: SignalType;
  className?: string;
}

export const SignalIcon: React.FC<Props> = ({ type, className = "w-4 h-4" }) => {
  const paths = {
    bullish: "M7 14l5-5 5 5H7z",
    bearish: "M7 10l5 5 5-5H7z",
    neutral: "M5 11h14v2H5z"
  };

  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d={paths[type]} />
    </svg>
  );
};