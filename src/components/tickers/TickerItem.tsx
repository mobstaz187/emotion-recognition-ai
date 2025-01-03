import React from 'react';

interface Props {
  rank: number;
  symbol: string;
  mentions: number;
  change: number;
}

export const TickerItem: React.FC<Props> = ({ rank, symbol, mentions, change }) => {
  const changeColor = change >= 0 ? 'text-green-500' : 'text-red-500';
  const changeIcon = change >= 0 ? '🚀' : '💎';

  return (
    <div className="flex items-center justify-between p-4 bg-card text-card-foreground rounded-xl border border-border hover:bg-card/80 transition-colors">
      <div className="flex items-center gap-4">
        <span className="text-foreground/60 font-mono w-6">{rank}</span>
        <span className="text-primary font-bold">${symbol}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-foreground/60">
          {mentions.toLocaleString()} mentions
        </span>
        <span className={`${changeColor} font-mono flex items-center gap-1`}>
          {changeIcon} {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
};