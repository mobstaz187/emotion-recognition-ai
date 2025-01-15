import React, { createContext, useContext, useState } from 'react';
import { TokenData } from '../types/token';
import { Level, ColorThresholds, WeightSettings } from '../types/chart';

interface TokenContextType {
  tokenData: TokenData | null;
  setTokenData: (data: TokenData | null) => void;
  address: string;
  setAddress: (address: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  // Chart state
  chartImage: string | null;
  setChartImage: (image: string | null) => void;
  chartLevels: Level[];
  setChartLevels: (levels: Level[]) => void;
  chartScenario: 'bullish' | 'bearish' | 'neutral';
  setChartScenario: (scenario: 'bullish' | 'bearish' | 'neutral') => void;
  chartThresholds: ColorThresholds;
  setChartThresholds: (thresholds: ColorThresholds) => void;
  weightSettings: WeightSettings;
  setWeightSettings: (settings: WeightSettings) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Chart state
  const [chartImage, setChartImage] = useState<string | null>(null);
  const [chartLevels, setChartLevels] = useState<Level[]>([]);
  const [chartScenario, setChartScenario] = useState<'bullish' | 'bearish' | 'neutral'>('neutral');
  const [chartThresholds, setChartThresholds] = useState<ColorThresholds>({
    red: 110,
    green: 95
  });
  const [weightSettings, setWeightSettings] = useState<WeightSettings>({
    bounce: 0.3,
    stability: 0.4
  });

  return (
    <TokenContext.Provider value={{
      tokenData,
      setTokenData,
      address,
      setAddress,
      isLoading,
      setIsLoading,
      error,
      setError,
      chartImage,
      setChartImage,
      chartLevels,
      setChartLevels,
      chartScenario,
      setChartScenario,
      chartThresholds,
      setChartThresholds,
      weightSettings,
      setWeightSettings
    }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};