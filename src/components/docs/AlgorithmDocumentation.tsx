import React from 'react';
import { FaceDetectionDocs } from './sections/FaceDetectionDocs';
import { EmotionRecognitionDocs } from './sections/EmotionRecognitionDocs';
import { ModelArchitectureDocs } from './sections/ModelArchitectureDocs';

export const AlgorithmDocumentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Technical Documentation
        </h1>
        <FaceDetectionDocs />
        <EmotionRecognitionDocs />
        <ModelArchitectureDocs />
      </div>
    </div>
  );
};