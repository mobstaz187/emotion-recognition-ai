import React, { createContext, useContext, useState } from 'react';
import { DetectedFace } from '../types/emotion';

interface EmotionContextType {
  detections: DetectedFace[];
  setDetections: (detections: DetectedFace[]) => void;
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export const EmotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [detections, setDetections] = useState<DetectedFace[]>([]);

  return (
    <EmotionContext.Provider value={{ detections, setDetections }}>
      {children}
    </EmotionContext.Provider>
  );
};

export const useEmotionContext = () => {
  const context = useContext(EmotionContext);
  if (context === undefined) {
    throw new Error('useEmotionContext must be used within an EmotionProvider');
  }
  return context;
};