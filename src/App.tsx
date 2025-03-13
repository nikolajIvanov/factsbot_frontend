import { useState } from 'react'
import UrlInput from './components/UrlInput'
import AnalysisSteps from './components/AnalysisSteps'
import TrustScore from './components/TrustScore'
import FactsList from './components/FactsList'
import SourceRating from './components/SourceRating'
import NarrativeAnalysis from './components/NarrativeAnalysis'
import EmotionalAnalysis from './components/EmotionalAnalysis'
import Sidebar from './components/Sidebar'
import HistoryView from './components/HistoryView'
import { dummyData } from './data/dummyData'
import { HistoryItem, ViewType } from './types'
import { Shield, CheckCircle } from 'lucide-react'

function App() {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [data] = useState(dummyData)
  const [currentView, setCurrentView] = useState<ViewType>('main')
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Berechne die Gesamtzahl der Quellen
  const countQuellen = () => {
    return data.analyse.fakten.reduce((sum: number, fakt: any) => sum + fakt.quellen.length, 0)
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

  const handleHistoryItemSelect = (item: HistoryItem) => {
    setSelectedHistoryItem(item);
    // Hier könnten Sie die Daten für diesen Verlaufseintrag laden
    // Für dieses Beispiel setzen wir einfach die URL und zeigen die Ergebnisse an
    setUrl(item.url);
    setShowResults(true);
    setCurrentView('main');
  }

  const handleToggleSidebar = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        onSelectHistoryItem={handleHistoryItemSelect}
        onViewChange={(view) => setCurrentView(view)}
        onToggleSidebar={handleToggleSidebar}
      />
      
      {/* Hauptinhalt */}
      <div 
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {currentView === 'main' ? (
          <>
            <header className="border-b py-6">
              <div className="container mx-auto text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center justify-center bg-blue-600 rounded-full p-1 mr-3">
                    <Shield size={32} className="text-white" />
                    <CheckCircle size={16} className="text-white absolute" />
                  </div>
                  <h1 className="text-5xl font-bold">FactsBot</h1>
                </div>
                <h2 className="text-3xl font-semibold mb-6">KI-gestützte Faktenprüfung</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Geben Sie eine URL ein, um deren Inhalt auf Fakten, Voreingenommenheit und Glaubwürdigkeit zu analysieren.
                </p>
              </div>
            </header>

            <main className="container mx-auto py-12 px-4 flex-grow overflow-y-auto">
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
          </>
        ) : (
          <div className="flex flex-col h-screen">
            <HistoryView onSelectHistoryItem={handleHistoryItemSelect} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App 