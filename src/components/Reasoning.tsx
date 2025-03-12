import { useState } from 'react';
import { ReasoningSchritt, Schritt } from '../data/dummyData';

interface ReasoningProps {
  steps: ReasoningSchritt[];
  analyseSchritte: Schritt[];
  title?: string;
  quellenCount?: number;
}

const Reasoning = ({ steps, analyseSchritte, title = "Schritte", quellenCount = 1 }: ReasoningProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Gruppiere die Reasoning-Schritte nach Analyseschritten
  const getReasoningForStep = (stepIndex: number) => {
    // Einfache Zuordnung basierend auf der ID
    // In einer echten Anwendung würde hier eine bessere Zuordnungslogik stehen
    const stepsPerAnalyseSchritt = Math.ceil(steps.length / analyseSchritte.length);
    const startIndex = stepIndex * stepsPerAnalyseSchritt;
    const endIndex = Math.min(startIndex + stepsPerAnalyseSchritt, steps.length);
    
    return steps.slice(startIndex, endIndex);
  };

  return (
    <div className={`bg-black text-white p-4 rounded-lg ${isExpanded ? 'shadow-lg' : ''}`}>
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </span>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{quellenCount} Quellen</span>
          <button className="text-gray-400 hover:text-white transition-colors">
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
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-8">
          {analyseSchritte.map((schritt, index) => (
            <div key={index} className="relative">
              <h4 className="text-white font-semibold mb-3">{schritt.stufe}</h4>
              <div className="pl-5 border-l-2 border-gray-700 space-y-4 ml-1">
                {getReasoningForStep(index).map((step) => (
                  <p key={step.id} className="text-gray-300 mb-2">{step.text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reasoning; 