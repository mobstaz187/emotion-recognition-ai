import React from 'react';
import { EmotionResults } from '../EmotionResults';
import { useEmotionContext } from '../../contexts/EmotionContext';

export const ResultsPanel: React.FC = () => {
  const { detections } = useEmotionContext();

  return (
    <div className="bg-black/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">Analysis Results</h2>
      <EmotionResults detections={detections} />
    </div>
  );
}