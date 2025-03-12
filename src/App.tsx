import { useState } from 'react'
import UrlInput from './components/UrlInput'
import AnalysisSteps from './components/AnalysisSteps'
import TrustScore from './components/TrustScore'
import FactsList from './components/FactsList'
import SourceRating from './components/SourceRating'
import NarrativeAnalysis from './components/NarrativeAnalysis'
import EmotionalAnalysis from './components/EmotionalAnalysis'
import { dummyData } from './data/dummyData'

function App() {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [data] = useState(dummyData)

  // Berechne die Gesamtzahl der Quellen
  const countQuellen = () => {
    return data.analyse.fakten.reduce((sum, fakt) => sum + fakt.quellen.length, 0)
  }

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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-2">FactsBot</h1>
          <h2 className="text-3xl font-semibold mb-6">KI-gestützte Faktenprüfung</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Geben Sie eine URL ein, um deren Inhalt auf Fakten, Voreingenommenheit und Glaubwürdigkeit zu analysieren.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 flex-grow">
        <div className="bg-card p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6">Faktencheck für jede URL</h3>
          
          <UrlInput onSubmit={handleUrlSubmit} disabled={isAnalyzing} />
        </div>

        <div className="mt-8">
          {(isAnalyzing || showResults) && (
            <AnalysisSteps 
              steps={data.analyse.schritte} 
              isAnalyzing={isAnalyzing} 
              title="Analyseschritte" 
            />
          )}
        </div>

        {showResults && (
          <div className="mt-8 space-y-8">
            <TrustScore score={data.analyse.vertrauensbewertung} />
            
            <SourceRating rating={data.analyse.quellenbewertung} />
            
            <FactsList facts={data.analyse.fakten} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NarrativeAnalysis analysis={data.analyse.narrativanalyse} />
              <EmotionalAnalysis analysis={data.analyse.emotionale_analyse} />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t w-full mt-auto">
        <div className="container mx-auto py-4 text-center text-muted-foreground">
          <p>© 2025 FactsBot - Ein KI-gestütztes Fact-Checking-Tool</p>
        </div>
      </footer>
    </div>
  )
}

export default App 