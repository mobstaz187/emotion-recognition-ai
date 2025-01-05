import React from 'react';
import { Button } from '@mui/material';
import { useWebcam } from '../contexts/WebcamContext';
import { useProfile } from '../contexts/ProfileContext';

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
  const { currentProfile } = useProfile();
  const buttonColor = currentProfile?.color || '#3B82F6';

  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="contained"
        onClick={onToggleAnalysis}
        disabled={!isWebcamOn || isProcessing}
        sx={{
          backgroundColor: isAnalyzing ? '#EF4444' : buttonColor,
          '&:hover': {
            backgroundColor: isAnalyzing ? '#DC2626' : `${buttonColor}dd`
          }
        }}
        className="disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-xl font-medium"
      >
        {isProcessing ? 'Loading...' : isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}
      </Button>
      <Button
        variant="outlined"
        onClick={toggleWebcam}
        disabled={isProcessing}
        sx={{
          borderColor: `${buttonColor}80`,
          color: buttonColor
        }}
        className="border-2 hover:bg-white/5 font-medium px-6 py-2 rounded-xl
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isWebcamOn ? 'Turn Off Camera' : 'Turn On Camera'}
      </Button>
    </div>
  );
};