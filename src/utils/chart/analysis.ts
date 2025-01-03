import type { ChartAnalysisResult } from '../../types/chart';
import { CHART_PATTERNS } from './patterns';

export async function analyzeChart(file: File): Promise<ChartAnalysisResult> {
  const imageUrl = URL.createObjectURL(file);

  // Select a random pattern excluding previously used ones
  const usedPatterns = new Set<string>();
  let pattern;
  do {
    pattern = CHART_PATTERNS[Math.floor(Math.random() * CHART_PATTERNS.length)];
  } while (usedPatterns.has(pattern.name));
  usedPatterns.add(pattern.name);

  const mockAnalysis: ChartAnalysisResult = {
    sentiment: pattern.type,
    confidence: pattern.reliability,
    signals: [
      {
        type: pattern.type,
        message: `${pattern.name} pattern identified with ${Math.round(pattern.reliability * 100)}% confidence`
      },
      {
        type: pattern.type,
        message: pattern.type === 'bullish' 
          ? 'Volume increasing, supporting the bullish scenario'
          : 'Declining volume suggests continued bearish pressure'
      }
    ],
    pattern,
    imageUrl
  };

  await new Promise(resolve => setTimeout(resolve, 1500));
  return mockAnalysis;
}