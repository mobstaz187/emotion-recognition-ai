import { SocialMetrics } from '../../types/token';

export function analyzeSocialMetrics(metrics: SocialMetrics) {
  const insights: string[] = [];
  let score = 0;

  // Twitter analysis
  if (metrics.twitterFollowers > 50000) {
    score += 50;
    insights.push('Strong Twitter following');
  } else if (metrics.twitterFollowers > 10000) {
    score += 30;
    insights.push('Growing Twitter presence');
  }

  if (metrics.twitterEngagement > 5000) {
    score += 50;
    insights.push('High Twitter engagement');
  } else if (metrics.twitterEngagement > 1000) {
    score += 30;
    insights.push('Active Twitter community');
  }

  return {
    score: Math.min(Math.round(score), 100),
    insights
  };
}