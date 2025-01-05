import { Level } from '../../../types/chart';

const MERGE_THRESHOLD = 2.5;

export function mergeSimilarLevels(levels: Level[]): Level[] {
  const merged: Level[] = [];
  
  levels.sort((a, b) => a.price - b.price);

  for (const level of levels) {
    const similar = merged.find(m => 
      Math.abs(m.price - level.price) < MERGE_THRESHOLD && 
      m.type === level.type
    );

    if (similar) {
      similar.strength = Math.max(similar.strength, level.strength);
      similar.price = (similar.price + level.price) / 2;
    } else {
      merged.push({ ...level });
    }
  }

  return merged;
}