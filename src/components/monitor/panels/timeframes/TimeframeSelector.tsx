import React from 'react';

interface Props {
  selected: string;
  onChange: (timeframe: any) => void;
}

export const TimeframeSelector: React.FC<Props> = ({ selected, onChange }) => {
  const timeframes = [
    { value: '15m', label: '15M' },
    { value: '30m', label: '30M' },
    { value: '1h', label: '1H' }
  ];

  return (
    <div className="flex bg-white/5 rounded-lg p-1">
      {timeframes.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`
            px-4 py-1.5 rounded-md text-sm font-medium transition-colors
            ${selected === value 
              ? 'bg-primary text-white' 
              : 'text-gray-400 hover:text-gray-300'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};