// Constants for threshold calculations
export const THRESHOLD_CONFIG = {
  baseMultiplier: 0.02,
  supportSensitivity: 0.7,  // 30% more sensitive
  resistanceSensitivity: 0.8
};

export interface DetectionThresholds {
  support: number;
  resistance: number;
}

export function calculateThresholds(width: number): DetectionThresholds {
  const baseThreshold = width * THRESHOLD_CONFIG.baseMultiplier;
  
  return {
    support: baseThreshold * THRESHOLD_CONFIG.supportSensitivity,
    resistance: baseThreshold * THRESHOLD_CONFIG.resistanceSensitivity
  };
}