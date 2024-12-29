import React, { useRef } from 'react';
import { Button } from '@mui/material';

interface Props {
  onUpload: (file: File) => void;
}

export const ImageUpload: React.FC<Props> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />
      <Button 
        variant="outlined" 
        onClick={handleClick}
        className="border-blue-500 text-blue-500 hover:bg-blue-50"
      >
        Upload Image
      </Button>
    </div>
  );
};