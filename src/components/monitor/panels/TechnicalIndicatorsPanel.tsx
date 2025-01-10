import React from 'react';
import { TechnicalIndicators } from '../../../types/token';

interface Props {
  indicators: TechnicalIndicators;
}

export const TechnicalIndicatorsPanel: React.FC<Props> = ({ indicators }) => {
  return (
    <div className="bg-card/80 backdrop-blur-xl rounded-xl border border-border p-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Technical Analysis</h3>
      
      <div className="space-y-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-2">RSI (14)</div>
          <div className="text-xl font-semibold text-foreground">
            {indicators.rsi.toFixed(2)}
          </div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-2">MACD</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Value</div>
              <div className="text-sm font-medium text-foreground">{indicators.macd.value.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Signal</div>
              <div className="text-sm font-medium text-foreground">{indicators.macd.signal.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Histogram</div>
              <div className="text-sm font-medium text-foreground">{indicators.macd.histogram.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-2">Bollinger Bands</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Upper</div>
              <div className="text-sm font-medium text-foreground">
                {Number(indicators.bollingerBands.upper).toFixed(4)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Middle</div>
              <div className="text-sm font-medium text-foreground">
                {Number(indicators.bollingerBands.middle).toFixed(4)}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Lower</div>
              <div className="text-sm font-medium text-foreground">
                {Number(indicators.bollingerBands.lower).toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};