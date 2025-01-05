import React from 'react';

export type Scenario = 'bullish' | 'bearish' | 'neutral';

interface Props {
  scenario: Scenario;
  onScenarioChange: (scenario: Scenario) => void;
}

export const ScenarioSelector: React.FC<Props> = ({ scenario, onScenarioChange }) => {
  return (
    <div className="flex flex-col gap-2">
      {[
        { id: 'bullish', color: 'green' },
        { id: 'bearish', color: 'red' },
        { id: 'neutral', color: 'blue' }
      ].map(({ id, color }) => (
        <button
          key={id}
          onClick={() => onScenarioChange(id as Scenario)}
          className={`
            w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors
            ${scenario === id 
              ? `bg-${color}-500 text-white` 
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }
          `}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </button>
      ))}
    </div>
  );
};