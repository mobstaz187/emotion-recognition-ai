import React from 'react';
import { ColorThresholds } from '../../../types/chart';

interface Props {
  thresholds: ColorThresholds;
  onChange: (thresholds: ColorThresholds) => void;
  isAnalyzing?: boolean;
}

export const ThresholdControls: React.FC<Props> = ({ thresholds, onChange, isAnalyzing }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h4 className="text-lg font-semibold text-foreground">Color Detection</h4>
        <div className="group relative">
          <svg 
            className="w-4 h-4 text-muted-foreground cursor-help" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-card border border-border rounded-lg 
            text-sm text-foreground opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            Tweak the color range for optimal detection
          </div>
        </div>
        {isAnalyzing && (
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin ml-2" />
        )}
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="text-red-500 font-medium">Red Channel</span>
            <span className="text-muted-foreground font-mono">{thresholds.red}</span>
          </label>
          <div className="relative">
            <div 
              className="absolute top-1/2 left-0 h-2 bg-red-500/20 rounded-lg -translate-y-1/2"
              style={{ width: `${(thresholds.red / 200) * 100}%` }}
            />
            <input
              type="range"
              min="50"
              max="200"
              value={thresholds.red}
              onChange={(e) => onChange({ ...thresholds, red: Number(e.target.value) })}
              className="relative w-full h-2 bg-background border border-border rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background
                [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(239,68,68,0.3)]
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-red-500
                [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background
                [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="text-green-500 font-medium">Green Channel</span>
            <span className="text-muted-foreground font-mono">{thresholds.green}</span>
          </label>
          <div className="relative">
            <div 
              className="absolute top-1/2 left-0 h-2 bg-green-500/20 rounded-lg -translate-y-1/2"
              style={{ width: `${(thresholds.green / 200) * 100}%` }}
            />
            <input
              type="range"
              min="50"
              max="200"
              value={thresholds.green}
              onChange={(e) => onChange({ ...thresholds, green: Number(e.target.value) })}
              className="relative w-full h-2 bg-background border border-border rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background
                [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(34,197,94,0.3)]
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500
                [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background
                [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};