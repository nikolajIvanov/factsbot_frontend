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
import { Shield, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

function App() {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [data] = useState(dummyData)
  const [currentView, setCurrentView] = useState<ViewType>('main')
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [showScoreDetails, setShowScoreDetails] = useState(false)

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

  const toggleScoreDetails = () => {
    setShowScoreDetails(!showScoreDetails);
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            <header className="border-b py-6 bg-white shadow-sm">
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
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
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
                <div className="mt-8 space-y-6">
                  {/* Vertrauensbewertung mit integrierter Zusammenfassung */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Vertrauensbewertung</h3>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-center py-4">
                        <TrustScore 
                          score={data.analyse.vertrauensbewertung} 
                          summary={data.analyse.zusammenfassung}
                        />
                      </div>
                      
                      <div className="mt-4 border-t pt-4">
                        <button 
                          onClick={toggleScoreDetails}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {showScoreDetails ? (
                            <>
                              <ChevronUp size={18} />
                              <span>Details ausblenden</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown size={18} />
                              <span>Details zur Berechnung anzeigen</span>
                            </>
                          )}
                        </button>
                        
                        {showScoreDetails && (
                          <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                            <h4 className="font-medium mb-2">Wie wird der Vertrauenswert berechnet?</h4>
                            <p className="text-gray-700 mb-3">
                              Der Vertrauenswert wird anhand mehrerer Faktoren berechnet:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                              <li>Anzahl der überprüfbaren Fakten: {data.analyse.fakten.length}</li>
                              <li>Anteil der belegten Fakten: {Math.round((data.analyse.fakten.filter(f => f.belegt).length / data.analyse.fakten.length) * 100)}%</li>
                              <li>Qualität der Quellen: Basierend auf der Reputation und Zuverlässigkeit</li>
                              <li>Emotionale Sprache: {data.analyse.emotionale_analyse.intensität}</li>
                              <li>Narrativ: {data.analyse.narrativanalyse.ergebnis}</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Statistiken */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center transition-all hover:shadow-md hover:border-blue-200">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                          <path d="M9 14h.01"></path>
                          <path d="M13 18h.01"></path>
                          <path d="M9 22h.01"></path>
                        </svg>
                      </div>
                      <div className="text-4xl font-bold text-blue-600 mb-1">{data.analyse.fakten.length}</div>
                      <div className="text-gray-500 text-center">Überprüfte Fakten</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center transition-all hover:shadow-md hover:border-blue-200">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                      </div>
                      <div className="text-4xl font-bold text-blue-600 mb-1">{countQuellen()}</div>
                      <div className="text-gray-500 text-center">Quellen</div>
                    </div>
                  </div>
                  
                  {/* Quellenbewertung */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Bewertung der Quelle</h3>
                    <SourceRating rating={data.analyse.quellenbewertung} />
                  </div>
                  
                  {/* Fakten-Bereich */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Überprüfte Fakten</h3>
                    <FactsList facts={data.analyse.fakten} />
                  </div>
                  
                  {/* Analyse-Bereich */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24"></path>
                            <path d="M21 3v9h-9"></path>
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium">Narrativanalyse</h4>
                      </div>
                      <NarrativeAnalysis analysis={data.analyse.narrativanalyse} />
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M14 13.5A1.5 1.5 0 0 0 12.5 12"></path>
                            <path d="M20 7h-1.8c-.4 0-.8-.1-1.1-.3l-1.3-.9c-.5-.3-1.1-.5-1.7-.5h-2.2c-.6 0-1.2.2-1.7.5L8.9 6.7c-.3.2-.7.3-1.1.3H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"></path>
                            <path d="M7 14.5a3.5 3.5 0 0 0 7 0"></path>
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium">Emotionale Analyse</h4>
                      </div>
                      <EmotionalAnalysis analysis={data.analyse.emotionale_analyse} />
                    </div>
                  </div>
                </div>
              )}
            </main>

            <footer className="border-t w-full mt-auto bg-white py-4">
              <div className="container mx-auto text-center text-muted-foreground">
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