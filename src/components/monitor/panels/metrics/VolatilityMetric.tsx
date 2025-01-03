import React from 'react';
import { formatNumber } from '../../../../utils/formatNumber';

interface Props {
  volatility: number;
  liquidity: number;
}

export const VolatilityMetric: React.FC<Props> = ({ volatility, liquidity }) => (
  <div className="bg-white/5 rounded-lg p-4">
    <div className="text-sm text-gray-400 mb-1">Volatility (24h)</div>
    <div className="text-lg font-semibold">{(volatility * 100).toFixed(2)}%</div>
    <div className="mt-2 text-sm text-gray-400">Liquidity</div>
    <div className="text-base font-medium">${formatNumber(liquidity)}</div>
  </div>
);