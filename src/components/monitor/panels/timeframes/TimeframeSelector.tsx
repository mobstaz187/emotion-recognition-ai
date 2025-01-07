import React from 'react';

interface Props {
  selected: string;
  onChange: (timeframe: string) => void;
}

export const TimeframeSelector: React.FC<Props> = ({ selected, onChange }) => {
  const timeframes = [
    { value: '1m', label: '1M' },
    { value: '15m', label: '15M' },
    { value: '30m', label: '30M' },
    { value: '1h', label: '1H' },
    { value: '4h', label: '4H' },
    { value: '24h', label: '24H' }
  ];

  return (
    <div className="flex bg-background/50 rounded-lg p-1 border border-border">
      {timeframes.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${selected === value 
              ? 'bg-primary text-white' 
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
};