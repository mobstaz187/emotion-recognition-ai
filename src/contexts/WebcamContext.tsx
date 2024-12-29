import React, { createContext, useContext, useState } from 'react';

interface WebcamContextType {
  isWebcamOn: boolean;
  toggleWebcam: () => void;
}

const WebcamContext = createContext<WebcamContextType | undefined>(undefined);

export const WebcamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize camera as off by default
  const [isWebcamOn, setIsWebcamOn] = useState(false);

  const toggleWebcam = () => setIsWebcamOn(!isWebcamOn);

  return (
    <WebcamContext.Provider value={{ isWebcamOn, toggleWebcam }}>
      {children}
    </WebcamContext.Provider>
  );
};

export const useWebcam = () => {
  const context = useContext(WebcamContext);
  if (context === undefined) {
    throw new Error('useWebcam must be used within a WebcamProvider');
  }
  return context;
};