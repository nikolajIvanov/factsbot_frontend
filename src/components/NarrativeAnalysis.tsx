import { NarrativAnalyse } from '../data/dummyData'

interface NarrativeAnalysisProps {
  analysis: NarrativAnalyse
}

const NarrativeAnalysis = ({ analysis }: NarrativeAnalysisProps) => {
  // Bestimme die Farbe basierend auf dem Ergebnis
  const getResultColor = () => {
    switch (analysis.ergebnis.toLowerCase()) {
      case 'neutral':
        return 'bg-blue-100 text-blue-800'
      case 'positiv':
        return 'bg-green-100 text-green-800'
      case 'negativ':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow h-full">
      <h3 className="text-lg font-medium mb-4">Narrativanalyse</h3>
      <div className="flex flex-col h-full">
        <p className="text-sm text-muted-foreground mb-4">
          Die Narrativanalyse untersucht, wie die Informationen präsentiert werden und welche Erzählperspektive eingenommen wird.
        </p>
        <div className="mt-auto">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getResultColor()}`}>
            {analysis.ergebnis}
          </span>
        </div>
      </div>
    </div>
  )
}

export default NarrativeAnalysis 