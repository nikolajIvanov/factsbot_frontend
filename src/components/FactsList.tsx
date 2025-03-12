import { Fakt } from '../data/dummyData'

interface FactsListProps {
  facts: Fakt[]
}

const FactsList = ({ facts }: FactsListProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Überprüfte Fakten</h3>
      <div className="space-y-6">
        {facts.map((fact, index) => (
          <div key={index} className="border rounded-md overflow-hidden">
            <div className={`p-5 ${fact.belegt ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-start gap-3">
                {fact.belegt ? (
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-lg mb-2">{fact.titel}</h4>
                  <p className="text-gray-700 mb-3">{fact.erklaerung}</p>
                  
                  {fact.quellen.length > 0 ? (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium mb-2">Quellen:</h5>
                      <ul className="space-y-1 list-decimal pl-5">
                        {fact.quellen.map((quelle, idx) => (
                          <li key={idx} className="text-sm">
                            <a 
                              href={quelle.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {quelle.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FactsList

 