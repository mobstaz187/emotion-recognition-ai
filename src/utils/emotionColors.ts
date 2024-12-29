import { EmotionType } from './emotionTypes';

export function getEmotionColor(emotion: EmotionType): string {
  const colors: Record<EmotionType, string> = {
    happy: '#10B981',    // Green
    sad: '#6B7280',      // Gray
    angry: '#EF4444',    // Red
    fearful: '#8B5CF6',  // Purple
    disgusted: '#F59E0B', // Yellow
    surprised: '#3B82F6', // Blue
    neutral: '#6B7280'    // Gray
  };

  return colors[emotion] || colors.neutral;
}