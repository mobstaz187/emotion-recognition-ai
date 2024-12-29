import React from 'react';

export const ModelArchitectureDocs: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Model Architecture Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Technical Specifications</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Framework: TensorFlow.js</li>
            <li>Base Network: MobileNet</li>
            <li>Model Size: ~2MB total</li>
            <li>Inference Time: ~30ms</li>
            <li>FLOPs: 569M</li>
            <li>Parameters: 3.2M</li>
          </ul>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Performance Metrics</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Accuracy: ~90% on FER2013</li>
            <li>FPS: 30-60 (device dependent)</li>
            <li>Min Face Size: 20x20 pixels</li>
            <li>Max Faces: No fixed limit</li>
            <li>Latency: 30-50ms</li>
          </ul>
        </div>
      </div>
    </section>
  );
};