import React from 'react';
import { formatNumber } from '../../../../utils/formatNumber';

interface Props {
  marketCap: number;
  holders: number;
}

export const MarketCapMetric: React.FC<Props> = ({ marketCap, holders }) => (
  <div className="bg-white/5 rounded-lg p-4">
    <div className="text-sm text-gray-400 mb-1">Market Cap</div>
    <div className="text-lg font-semibold">${formatNumber(marketCap)}</div>
    <div className="mt-2 text-sm text-gray-400">Holders</div>
    <div className="text-base font-medium">{holders.toLocaleString()}</div>
  </div>
);