import { EmotionaleAnalyse } from '../data/dummyData'

interface EmotionalAnalysisProps {
  analysis: EmotionaleAnalyse
}

const EmotionalAnalysis = ({ analysis }: EmotionalAnalysisProps) => {
  // Bestimme die Farbe basierend auf der Intensität
  const getIntensityColor = () => {
    switch (analysis.intensität.toLowerCase()) {
      case 'hoch':
        return 'bg-red-100 text-red-800'
      case 'mittel':
        return 'bg-yellow-100 text-yellow-800'
      case 'niedrig':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Bestimme das Icon basierend auf der Intensität
  const getIntensityIcon = () => {
    switch (analysis.intensität.toLowerCase()) {
      case 'hoch':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
          </svg>
        )
      case 'mittel':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 15h8"></path>
            <path d="M9 9h.01"></path>
            <path d="M15 9h.01"></path>
          </svg>
        )
      case 'niedrig':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <path d="M9 9h.01"></path>
            <path d="M15 9h.01"></path>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col">
      <p className="text-sm text-muted-foreground mb-4">
        Die emotionale Analyse bewertet die Stärke der emotionalen Sprache und Ausdrucksweise im Text.
      </p>
      <div className="mt-auto flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getIntensityColor()}`}>
          {getIntensityIcon()}
          Intensität: {analysis.intensität}
        </span>
      </div>
    </div>
  )
}

export default EmotionalAnalysis 