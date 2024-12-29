import React from 'react';
import { Button } from '@mui/material';
import { useWebcam } from '../contexts/WebcamContext';

interface Props {
  isAnalyzing: boolean;
  onToggleAnalysis: () => void;
  isProcessing: boolean;
}

export const WebcamControls: React.FC<Props> = ({ 
  isAnalyzing,
  onToggleAnalysis,
  isProcessing
}) => {
  const { isWebcamOn, toggleWebcam } = useWebcam();

  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="contained"
        onClick={onToggleAnalysis}
        disabled={!isWebcamOn || isProcessing}
        className={`${
          isAnalyzing 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
        } disabled:opacity-50`}
      >
        {isProcessing ? 'Loading...' : isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}
      </Button>
      <Button
        variant="outlined"
        onClick={toggleWebcam}
        disabled={isProcessing}
        className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        {isWebcamOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </Button>
    </div>
  );
};