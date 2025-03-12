import { Schritt } from '../data/dummyData'

interface AnalysisStepsProps {
  steps: Schritt[]
  isAnalyzing: boolean
}

const AnalysisSteps = ({ steps, isAnalyzing }: AnalysisStepsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Analyseschritte</h3>
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
  )
}

export default AnalysisSteps 