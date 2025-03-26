import { Fakt } from '../data/dummyData'

interface FactsListProps {
  facts: Fakt[]
}

const FactsList = ({ facts }: FactsListProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'belegt':
        return 'bg-green-50';
      case 'nicht_belegt':
        return 'bg-gray-50';
      case 'falsch':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'belegt':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case 'nicht_belegt':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      case 'falsch':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'belegt':
        return 'bg-green-500';
      case 'nicht_belegt':
        return 'bg-gray-500';
      case 'falsch':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {facts.map((fact, index) => (
        <div key={index} className="border rounded-md overflow-hidden">
          <div className={`p-5 ${getStatusStyles(fact.belegungsStatus)}`}>
            <div className="flex items-start gap-3">
              <span className={`w-6 h-6 rounded-full ${getStatusColor(fact.belegungsStatus)} text-white flex items-center justify-center mt-0.5`}>
                {getStatusIcon(fact.belegungsStatus)}
              </span>
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
  )
}

export default FactsList

 