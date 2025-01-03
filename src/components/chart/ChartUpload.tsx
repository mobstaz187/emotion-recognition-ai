import React, { useRef } from 'react';

interface Props {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const ChartUpload: React.FC<Props> = ({ onUpload, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isAnalyzing}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 
          text-white rounded-xl transition-colors"
      >
        {isAnalyzing ? 'Analyzing...' : 'Upload Chart'}
      </button>
      <p className="text-sm text-gray-400">
        Upload a chart image to analyze. (Use the analysis at your own risk. AI is still dumb and needs more datasets for training as there will be times that it will recognize other part of the chart)
      </p>
    </div>
  );
};