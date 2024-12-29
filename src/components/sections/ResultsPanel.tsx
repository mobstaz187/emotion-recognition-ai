import React from 'react';
import { EmotionResults } from '../EmotionResults';
import { useEmotionContext } from '../../contexts/EmotionContext';

export const ResultsPanel: React.FC = () => {
  const { detections } = useEmotionContext();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analysis Results</h2>
      <EmotionResults detections={detections} />
    </div>
  );
}