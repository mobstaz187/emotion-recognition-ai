import React, { useRef, useState } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import { DetectedFace } from '../../types/emotion';
import { EmotionResults } from '../EmotionResults';
import { detectEmotions } from '../../utils/emotionDetection';

export const ImageUploadSection: React.FC = () => {
  const { currentProfile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [detections, setDetections] = useState<DetectedFace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      
      const img = new Image();
      img.src = url;
      await new Promise((resolve) => (img.onload = resolve));
      
      const results = await detectEmotions(img);
      setDetections(results);
    } catch (error) {
      console.error('Failed to analyze image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-panel p-8">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center max-w-xl">
            <h2 className="text-2xl font-bold mb-3">Upload Image for Analysis</h2>
            <p className="text-muted-foreground mb-6">
              Upload a photo to analyze facial expressions and detect emotions.
            </p>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#4D9CFF] text-white rounded-xl 
                transition-all duration-200 text-lg font-medium hover:opacity-90"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isLoading ? 'Analyzing...' : 'Upload Image'}
            </button>
            
            <p className="text-sm text-muted-foreground mt-4">
              Supported formats: JPG, PNG, GIF (max 5MB)
            </p>
          </div>

          {imageUrl && (
            <div className="w-full max-w-2xl">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
                <img 
                  src={imageUrl} 
                  alt="Uploaded" 
                  className="w-full h-full object-contain bg-card"
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="text-primary animate-pulse">Analyzing image...</div>
                  </div>
                )}
              </div>
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