import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { detectEmotions } from '../../utils/emotionDetection';
import { EmotionResults } from '../EmotionResults';
import { DetectedFace } from '../../types/emotion';

export const ImageUploadSection: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [detections, setDetections] = useState<DetectedFace[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageLoad = async () => {
    if (imageRef.current) {
      try {
        setIsProcessing(true);
        setError(null);
        const results = await detectEmotions(imageRef.current);
        setDetections(results);
        
        if (results.length === 0) {
          setError('No faces detected. Try another image.');
        }
      } catch (err) {
        setError('Analysis failed. Please try again.');
        setDetections([]);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(null);
      setDetections([]);
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image too large. Maximum size is 5MB.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.onerror = () => setError('Failed to read image.');
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center gap-8">
          <div className="w-full">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-4">
              <Button
                variant="contained"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Choose Image
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supported formats: JPG, PNG, GIF (max 5MB)
              </p>
            </div>
          </div>

          {image && (
            <div className="relative w-full">
              <img
                ref={imageRef}
                src={image}
                alt="Uploaded"
                className="w-full rounded-lg shadow-md"
                onLoad={handleImageLoad}
                crossOrigin="anonymous"
              />
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
                  <div className="text-white text-lg animate-pulse">Analyzing...</div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          {detections.length > 0 && (
            <div className="w-full">
              <EmotionResults detections={detections} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};