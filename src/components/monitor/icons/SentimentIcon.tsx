import React from 'react';
import { EmotionType } from '../../../utils/emotionTypes';
import { emotionPaths } from './paths';

interface Props {
  emotion: EmotionType;
  className?: string;
  color: string;
}

export const SentimentIcon: React.FC<Props> = ({ emotion, className, color }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill={color}
  >
    <path d={emotionPaths[emotion]} />
  </svg>
);