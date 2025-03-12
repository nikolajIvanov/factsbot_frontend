import { useState } from 'react';
import { Schritt } from '../data/dummyData'

interface AnalysisStepsProps {
  steps: Schritt[]
  isAnalyzing: boolean
  title?: string
}

const AnalysisSteps = ({ steps, isAnalyzing, title = "Analyseschritte" }: AnalysisStepsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isAnalyzing) {
    return (
      <div className="bg-card rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-md">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                step.status === 'erledigt' 
                  ? 'bg-green-500 text-white' 
                  : isAnalyzing 
                    ? 'bg-blue-500 text-white animate-pulse' 
                    : 'bg-gray-200'
              }`}>
                {step.status === 'erledigt' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <div>
                <h4 className="font-medium">{step.stufe}</h4>
                <p className="text-sm text-muted-foreground">{step.beschreibung}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer" 
        onClick={toggleExpanded}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{step.stufe}</h4>
                  <p className="text-gray-600 mt-1">{step.beschreibung}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisSteps 