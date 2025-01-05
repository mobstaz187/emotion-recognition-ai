export interface Level {
  type: 'support' | 'resistance';
  price: number;
  strength: number;
}

export interface ColorThresholds {
  red: number;
  green: number;
}