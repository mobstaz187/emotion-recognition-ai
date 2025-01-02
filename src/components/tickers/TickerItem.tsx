import React from 'react';

interface Props {
  rank: number;
  symbol: string;
  mentions: number;
  change: number;
}

export const TickerItem: React.FC<Props> = ({ rank, symbol, mentions, change }) => {
  const changeColor = change >= 0 ? 'text-green-400' : 'text-red-400';
  const changeIcon = change >= 0 ? '🚀' : '💎';

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <span className="text-gray-400 font-mono w-6">{rank}</span>
        <span className="text-blue-400 font-bold">${symbol}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-gray-400">
          {mentions.toLocaleString()} mentions
        </span>
        <span className={`${changeColor} font-mono flex items-center gap-1`}>
          {changeIcon} {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
};