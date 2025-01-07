import React from 'react';
import { EmotionResults } from '../EmotionResults';
import { useEmotionContext } from '../../contexts/EmotionContext';

export const ResultsPanel: React.FC = () => {
  const { detections } = useEmotionContext();

  return (
    <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-2xl border border-border p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Analysis Results</h2>
      <EmotionResults detections={detections} />
    </div>
  );
}