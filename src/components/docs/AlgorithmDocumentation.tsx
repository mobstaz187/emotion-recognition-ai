import React from 'react';
import { FaceDetectionDocs } from './sections/FaceDetectionDocs';
import { EmotionRecognitionDocs } from './sections/EmotionRecognitionDocs';
import { ModelArchitectureDocs } from './sections/ModelArchitectureDocs';
import { TokenSentimentDocs } from './sections/TokenSentimentDocs';
import { ChartAnalysisDocs } from './sections/ChartAnalysisDocs';

export const AlgorithmDocumentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-display font-bold mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Technical Documentation
        </h1>
        
        <div className="space-y-16">
          <FaceDetectionDocs />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
          <EmotionRecognitionDocs />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
          <ModelArchitectureDocs />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
          <TokenSentimentDocs />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
          <ChartAnalysisDocs />
        </div>
      </div>
    </div>
  );
};