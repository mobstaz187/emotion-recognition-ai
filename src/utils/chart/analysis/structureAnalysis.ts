import { Level } from '../../../types/chart';

export function analyzeStructure(levels: Level[]): Level[] {
  return levels.map(level => ({
    ...level,
    strength: calculateStrength(level)
  }));
}

function calculateStrength(level: Level): number {
  // Strength calculation logic
  return level.strength;
}