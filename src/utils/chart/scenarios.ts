import { Level } from '../../types/chart';
import type { Scenario } from '../../components/chart/ScenarioSelector';

export function getScenarioLevels(levels: Level[], scenario: Scenario): Level[] {
  const supports = levels.filter(l => l.type === 'support');
  const resistances = levels.filter(l => l.type === 'resistance');

  switch (scenario) {
    case 'bullish':
      // In bullish scenario, focus on nearest support and higher resistances
      return [
        ...supports.slice(0, 1), // Nearest support
        ...resistances.filter(r => r.price > supports[0]?.price || 0)
      ];

    case 'bearish':
      // In bearish scenario, focus on nearest resistance and lower supports
      return [
        ...resistances.slice(0, 1), // Nearest resistance
        ...supports.filter(s => s.price < resistances[0]?.price || Infinity)
      ];

    case 'neutral':
      // In neutral scenario, show closest support and resistance levels
      return [
        ...supports.slice(0, 2),
        ...resistances.slice(0, 2)
      ];

    default:
      return levels;
  }
}