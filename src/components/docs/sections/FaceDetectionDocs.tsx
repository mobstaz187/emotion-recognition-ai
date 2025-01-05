import React from 'react';

export const FaceDetectionDocs: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-display font-bold mb-6">Face Detection Algorithm</h2>
      <div className="prose dark:prose-invert max-w-none space-y-8">
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-display font-semibold mb-4">TinyFaceDetector Model</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Single-shot detection network based on MobileNet architecture</li>
            <li>Optimized for real-time performance (60+ FPS on modern devices)</li>
            <li>Input size: 416x416 pixels</li>
            <li>Uses depthwise separable convolutions for efficiency</li>
            <li>Model size: ~190KB</li>
          </ul>
        </div>

        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-display font-semibold mb-4">Detection Pipeline</h3>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <div className="font-medium mb-2">Image preprocessing</div>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                <li>Resize input to 416x416</li>
                <li>Normalize pixel values to [-1, 1]</li>
                <li>Convert to tensor format</li>
              </ul>
            </li>
            <li>
              <div className="font-medium mb-2">Feature extraction</div>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                <li>13 convolutional layers</li>
                <li>Depthwise separable convolutions</li>
                <li>ReLU activation functions</li>
              </ul>
            </li>
            <li>
              <div className="font-medium mb-2">Detection head</div>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-300">
                <li>Confidence score prediction</li>
                <li>Bounding box regression</li>
                <li>Non-maximum suppression</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};