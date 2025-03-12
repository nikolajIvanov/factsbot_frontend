import { Fakt } from '../data/dummyData'

interface FactsListProps {
  facts: Fakt[]
}

const FactsList = ({ facts }: FactsListProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Überprüfte Fakten</h3>
      <div className="space-y-4">
        {facts.map((fact, index) => (
          <div key={index} className="border rounded-md overflow-hidden">
            <div className={`p-4 ${fact.belegt ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-2">
                {fact.belegt ? (
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                )}
                <h4 className="font-medium">{fact.titel}</h4>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      fact.vertrauensbewertung >= 80 ? 'bg-green-500' : 
                      fact.vertrauensbewertung >= 60 ? 'bg-yellow-500' : 
                      fact.vertrauensbewertung >= 40 ? 'bg-orange-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${fact.vertrauensbewertung}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{fact.vertrauensbewertung}%</span>
              </div>
            </div>
            
            {fact.quellen.length > 0 && (
              <div className="p-4 bg-gray-50 border-t">
                <h5 className="text-sm font-medium mb-2">Quellen:</h5>
                <ul className="space-y-2">
                  {fact.quellen.map((quelle, idx) => (
                    <li key={idx} className="text-sm">
                      <a 
                        href={quelle.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <span>{quelle.name}</span>
                        <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                          {quelle.vertrauensscore}%
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FactsList

 