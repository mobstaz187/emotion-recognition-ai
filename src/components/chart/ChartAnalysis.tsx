import React, { useState } from 'react';
import { ChartUpload } from './ChartUpload';
import { ChartDisplay } from './ChartDisplay';
import { AnalysisResults } from './AnalysisResults';
import { ThresholdControls } from './controls/ThresholdControls';
import { ScenarioSelector } from './ScenarioSelector';
import { useChartAnalysis } from '../../hooks/useChartAnalysis';
import { getScenarioLevels } from '../../utils/chart/scenarios';
import { useToken } from '../../contexts/TokenContext';

export const ChartAnalysis: React.FC = () => {
  const { 
    chartImage, 
    setChartImage,
    chartLevels,
    setChartLevels,
    chartScenario,
    setChartScenario,
    chartThresholds,
    setChartThresholds
  } = useToken();
  
  const { isAnalyzing, analyze, reset } = useChartAnalysis();
  const scenarioLevels = getScenarioLevels(chartLevels, chartScenario);

  const handleThresholdChange = async (newThresholds: ColorThresholds) => {
    setChartThresholds(newThresholds);
    if (chartImage) {
      const newLevels = await analyze(chartImage, newThresholds);
      setChartLevels(newLevels);
    }
  };

  const handleImageSelect = async (imageUrl: string) => {
    reset();
    setChartImage(imageUrl);
    setChartLevels([]);
    setChartScenario('neutral');
    
    const newLevels = await analyze(imageUrl, chartThresholds);
    setChartLevels(newLevels);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="glass-panel p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Chart Analysis</h2>
            <p className="text-muted-foreground">Upload a chart to detect support and resistance levels</p>
          </div>
          <ChartUpload onImageSelect={handleImageSelect} />
        </div>

        {chartImage ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Controls */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Analysis Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium text-foreground mb-3">Scenario</h4>
                    <ScenarioSelector 
                      scenario={chartScenario} 
                      onScenarioChange={setChartScenario} 
                    />
                  </div>
                  <ThresholdControls 
                    thresholds={chartThresholds}
                    onChange={handleThresholdChange}
                    isAnalyzing={isAnalyzing}
                  />
                </div>
              </div>
            </div>

            {/* Main Content - Chart and Results */}
            <div className="lg:col-span-3 space-y-6">
              <ChartDisplay 
                image={chartImage} 
                levels={scenarioLevels}
                isAnalyzing={isAnalyzing}
                isInitialAnalysis={chartLevels.length === 0}
              />
              <AnalysisResults 
                levels={scenarioLevels} 
                scenario={chartScenario}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[400px] bg-card rounded-lg border-2 border-dashed border-border">
            <div className="text-center">
              <p className="text-xl text-muted-foreground mb-4">No chart uploaded</p>
              <p className="text-sm text-muted-foreground">Upload a chart to begin analysis</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};