import { useCallback } from 'react';
import { readImageFile } from '../utils/chart/fileReader';

export function useChartUpload(onImageSelect: (imageUrl: string) => void) {
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await readImageFile(file);
        onImageSelect(imageUrl);
      } catch (error) {
        console.error('Failed to read image file:', error);
      }
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  }, [onImageSelect]);

  return { handleFileChange };
}