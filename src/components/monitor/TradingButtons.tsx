import React from 'react';

interface Props {
  address: string;
}

export const TradingButtons: React.FC<Props> = ({ address }) => {
  const platforms = [
    {
      name: 'DEXScreener',
      url: `https://dexscreener.com/solana/${address}`,
    },
    {
      name: 'GMGN.ai',
      url: `https://gmgn.ai/sol/token/${address}`,
    },
    {
      name: 'Jupiter',
      url: `https://jup.ag/swap/${address}-SOL`,
    }
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary/10 hover:bg-primary/20 
            text-primary rounded-lg transition-colors duration-200 border border-primary/20"
        >
          {platform.name}
        </a>
      ))}
    </div>
  );
};