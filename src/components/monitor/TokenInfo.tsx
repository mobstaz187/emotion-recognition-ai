import React from 'react';
import { TokenData } from '../../types/token';
import { formatNumber } from '../../utils/formatNumber';
import { TokenSentiment } from './TokenSentiment';
import { TradingButtons } from './TradingButtons';

interface Props {
  data: TokenData;
  address: string;
}

export const TokenInfo: React.FC<Props> = ({ data, address }) => {
  const formattedPrice = data.price < 0.0001 
    ? data.price.toFixed(12)
    : formatNumber(data.price);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm text-gray-400 mb-1">Market Cap</h3>
          <p className="text-xl font-semibold text-gray-200">
            ${formatNumber(data.marketCap)}
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm text-gray-400 mb-1">Price</h3>
          <p className="text-xl font-semibold text-gray-200">
            ${formattedPrice}
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm text-gray-400 mb-1">24h Volume</h3>
          <p className="text-xl font-semibold text-gray-200">
            ${formatNumber(data.volume24h)}
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-sm text-gray-400 mb-1">Price Change 24h</h3>
          <p className={`text-xl font-semibold ${
            data.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {data.priceChange24h > 0 ? '+' : ''}{data.priceChange24h.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <h3 className="text-sm text-gray-400 mb-3">Trading Platforms</h3>
        <TradingButtons address={address} />
      </div>

      <TokenSentiment data={data} />
    </div>
  );
};