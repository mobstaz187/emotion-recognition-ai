import React from 'react';
import { ColorThresholds } from '../../../types/chart';

interface Props {
  thresholds: ColorThresholds;
  onChange: (thresholds: ColorThresholds) => void;
}

export const ThresholdControls: React.FC<Props> = ({ thresholds, onChange }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-medium text-gray-300">Color Detection</h4>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="text-red-400">Red Channel</span>
            <span className="text-gray-400">{thresholds.red}</span>
          </label>
          <input
            type="range"
            min="50"
            max="200"
            value={thresholds.red}
            onChange={(e) => onChange({ ...thresholds, red: Number(e.target.value) })}
            className="w-full h-2 accent-red-500 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="text-green-400">Green Channel</span>
            <span className="text-gray-400">{thresholds.green}</span>
          </label>
          <input
            type="range"
            min="50"
            max="200"
            value={thresholds.green}
            onChange={(e) => onChange({ ...thresholds, green: Number(e.target.value) })}
            className="w-full h-2 accent-green-500 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};