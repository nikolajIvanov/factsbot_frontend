import { useState } from 'react'
import UrlInput from './components/UrlInput'
import AnalysisSteps from './components/AnalysisSteps'
import TrustScore from './components/TrustScore'
import FactsList from './components/FactsList'
import NarrativeAnalysis from './components/NarrativeAnalysis'
import EmotionalAnalysis from './components/EmotionalAnalysis'
import { dummyData } from './data/dummyData'

function App() {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [data] = useState(dummyData)

  const handleUrlSubmit = (submittedUrl: string) => {
    setUrl(submittedUrl)
    setIsAnalyzing(true)
    
    // Simuliere den Analyseprozess
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold">FactsBot</h1>
          <p className="text-muted-foreground">KI-gestütztes Fact-Checking-Tool</p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <UrlInput onSubmit={handleUrlSubmit} disabled={isAnalyzing} />

        {isAnalyzing && (
          <div className="mt-8">
            <AnalysisSteps steps={data.analyse.schritte} isAnalyzing={true} />
          </div>
        )}

        {showResults && (
          <div className="mt-8 space-y-8">
            <div className="bg-card p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Analyseergebnis für {url}</h2>
              <p className="text-muted-foreground mb-4">{data.analyse.zusammenfassung}</p>
              <AnalysisSteps steps={data.analyse.schritte} isAnalyzing={false} />
            </div>

            <TrustScore score={data.analyse.vertrauensbewertung} />
            
            <FactsList facts={data.analyse.fakten} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NarrativeAnalysis analysis={data.analyse.narrativanalyse} />
              <EmotionalAnalysis analysis={data.analyse.emotionale_analyse} />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto py-4 text-center text-muted-foreground">
          <p>© 2025 FactsBot - Ein KI-gestütztes Fact-Checking-Tool</p>
        </div>
      </footer>
    </div>
  )
}

export default App 