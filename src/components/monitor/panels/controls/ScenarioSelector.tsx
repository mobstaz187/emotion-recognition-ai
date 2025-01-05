import React from 'react';
import { motion } from 'framer-motion';

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
        <motion.button
          key={id}
          onClick={() => onScenarioChange(id as Scenario)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors
            ${scenario === id 
              ? `bg-${color}-500 text-white shadow-[0_0_15px_rgba(var(--${color}-500-rgb),0.3)]` 
              : 'bg-card border border-border text-foreground hover:bg-background'
            }
          `}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </motion.button>
      ))}
    </div>
  );
};