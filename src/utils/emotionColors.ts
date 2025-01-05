import { EmotionType } from './emotionTypes';

export function getEmotionColor(emotion: EmotionType): string {
  const colors: Record<EmotionType, string> = {
    happy: '#D97706',    // Darker Yellow
    sad: '#3B82F6',      // Blue
    angry: '#EF4444',    // Red
    fearful: '#8B5CF6',  // Purple
    disgusted: '#10B981', // Green
    surprised: '#EC4899', // Pink
    neutral: '#6B7280'    // Gray
  };

  return colors[emotion] || colors.neutral;
}