import React, { useRef } from 'react';
import { useChartUpload } from '../../hooks/useChartUpload';
import { useProfile } from '../../contexts/ProfileContext';

interface Props {
  onImageSelect: (imageUrl: string) => void;
}

export const ChartUpload: React.FC<Props> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFileChange } = useChartUpload(onImageSelect);
  const { currentProfile } = useProfile();
  const buttonColor = currentProfile?.color || '#3B82F6';

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{ backgroundColor: buttonColor }}
        className="px-6 py-3 text-white rounded-lg hover:opacity-90 
          transition-colors flex items-center gap-2 font-medium"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Upload Chart
      </button>
    </div>
  );
};