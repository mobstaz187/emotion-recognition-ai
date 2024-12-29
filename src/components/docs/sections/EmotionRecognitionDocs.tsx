import React from 'react';

export const EmotionRecognitionDocs: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Emotion Recognition Algorithm</h2>
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-medium mb-2">CNN Architecture</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Based on MobileNet with custom emotion classification head</li>
          <li>Input: 224x224x3 RGB image</li>
          <li>Output: 7 emotion probabilities</li>
          <li>Uses transfer learning from face recognition task</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Recognition Pipeline</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Face alignment
            <ul className="list-disc pl-6 mt-1">
              <li>Extract face region using detection bounds</li>
              <li>Resize to 224x224 pixels</li>
              <li>Apply pixel normalization</li>
            </ul>
          </li>
          <li>Feature extraction
            <ul className="list-disc pl-6 mt-1">
              <li>MobileNet backbone network</li>
              <li>Global average pooling</li>
              <li>1024-dimensional feature vector</li>
            </ul>
          </li>
          <li>Emotion classification
            <ul className="list-disc pl-6 mt-1">
              <li>Fully connected layers</li>
              <li>Softmax activation</li>
              <li>7-class probability distribution</li>
            </ul>
          </li>
        </ol>

        <h3 className="text-xl font-medium mb-2">Emotion Classes</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Primary Emotions</h4>
            <ul className="list-disc pl-6">
              <li>Happy (Joy)</li>
              <li>Sad</li>
              <li>Angry</li>
              <li>Fearful</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Secondary Emotions</h4>
            <ul className="list-disc pl-6">
              <li>Disgusted</li>
              <li>Surprised</li>
              <li>Neutral</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};