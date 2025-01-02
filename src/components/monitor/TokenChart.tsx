import React from 'react';

interface Props {
  address: string;
}

export const TokenChart: React.FC<Props> = ({ address }) => {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10">
      <iframe
        src={`https://dexscreener.com/solana/${address}?embed=1&theme=dark`}
        className="w-full h-full"
        title="DEXScreener Chart"
      />
    </div>
  );
};