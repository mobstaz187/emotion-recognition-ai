import React from 'react';

export const FaceDetectionDocs: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Face Detection Algorithm</h2>
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-medium mb-2">TinyFaceDetector Model</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Single-shot detection network based on MobileNet architecture</li>
          <li>Optimized for real-time performance (60+ FPS on modern devices)</li>
          <li>Input size: 416x416 pixels</li>
          <li>Uses depthwise separable convolutions for efficiency</li>
          <li>Model size: ~190KB</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Detection Pipeline</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Image preprocessing
            <ul className="list-disc pl-6 mt-1">
              <li>Resize input to 416x416</li>
              <li>Normalize pixel values to [-1, 1]</li>
              <li>Convert to tensor format</li>
            </ul>
          </li>
          <li>Feature extraction
            <ul className="list-disc pl-6 mt-1">
              <li>13 convolutional layers</li>
              <li>Depthwise separable convolutions</li>
              <li>ReLU activation functions</li>
            </ul>
          </li>
          <li>Detection head
            <ul className="list-disc pl-6 mt-1">
              <li>Confidence score prediction</li>
              <li>Bounding box regression</li>
              <li>Non-maximum suppression</li>
            </ul>
          </li>
        </ol>
      </div>
    </section>
  );
};