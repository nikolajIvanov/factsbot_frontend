import { useState } from 'react';
import { Search, Calendar, ArrowUpDown } from 'lucide-react';
import { HistoryItem } from '../types';

// Beispieldaten für den Verlauf (mehr Einträge für die vollständige Ansicht)
const dummyHistory: HistoryItem[] = [
  {
    id: '1',
    title: 'Klimawandel-Bericht zeigt alarmierende Trends',
    url: 'https://example.com/news/climate-report',
    date: '15.03.2024',
    trustScore: 85
  },
  {
    id: '2',
    title: 'Neue Studie zu COVID-19-Impfstoffen veröffentlicht',
    url: 'https://example.com/news/covid-vaccine-study',
    date: '12.03.2024',
    trustScore: 92
  },
  {
    id: '3',
    title: 'Wirtschaftsprognose für das kommende Quartal',
    url: 'https://example.com/news/economic-forecast',
    date: '10.03.2024',
    trustScore: 78
  },
  {
    id: '4',
    title: 'Technologieunternehmen kündigt neues Produkt an',
    url: 'https://example.com/news/tech-announcement',
    date: '08.03.2024',
    trustScore: 88
  },
  {
    id: '5',
    title: 'Politische Entwicklungen im Nahen Osten',
    url: 'https://example.com/news/middle-east-politics',
    date: '05.03.2024',
    trustScore: 75
  },
  {
    id: '6',
    title: 'Neue Forschungsergebnisse zur künstlichen Intelligenz',
    url: 'https://example.com/news/ai-research',
    date: '03.03.2024',
    trustScore: 90
  },
  {
    id: '7',
    title: 'Umweltschutzmaßnahmen in Europa',
    url: 'https://example.com/news/environmental-protection',
    date: '01.03.2024',
    trustScore: 82
  },
  {
    id: '8',
    title: 'Sportliche Großereignisse im Sommer',
    url: 'https://example.com/news/sports-events',
    date: '28.02.2024',
    trustScore: 95
  },
  {
    id: '9',
    title: 'Bildungspolitik und neue Schulreformen',
    url: 'https://example.com/news/education-policy',
    date: '25.02.2024',
    trustScore: 70
  },
  {
    id: '10',
    title: 'Gesundheitssystem unter Druck',
    url: 'https://example.com/news/healthcare-system',
    date: '22.02.2024',
    trustScore: 65
  }
];

interface HistoryViewProps {
  onSelectHistoryItem?: (item: HistoryItem) => void;
}

const HistoryView = ({ onSelectHistoryItem }: HistoryViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filtern und Sortieren der Verlaufseinträge
  const filteredAndSortedHistory = [...dummyHistory]
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.url.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        // Datum-Sortierung (Format: DD.MM.YYYY)
        const dateA = a.date.split('.').reverse().join('');
        const dateB = b.date.split('.').reverse().join('');
        return sortDirection === 'asc' 
          ? dateA.localeCompare(dateB) 
          : dateB.localeCompare(dateA);
      } else {
        // Score-Sortierung
        return sortDirection === 'asc' 
          ? a.trustScore - b.trustScore 
          : b.trustScore - a.trustScore;
      }
    });

  const toggleSort = (field: 'date' | 'score') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header mit Titel und Suchleiste */}
      <div className="bg-white pt-6 px-6 pb-4 sticky top-0 z-20">
        <h1 className="text-3xl font-bold mb-6">Verlauf</h1>
        
        {/* Suchleiste */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Suche nach Titel oder URL..."
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Tabelle mit Verlaufseinträgen */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titel
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('date')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Datum</span>
                    <Calendar size={14} />
                    {sortBy === 'date' && (
                      <ArrowUpDown size={14} className={`transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('score')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Vertrauenswert</span>
                    {sortBy === 'score' && (
                      <ArrowUpDown size={14} className={`transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedHistory.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelectHistoryItem && onSelectHistoryItem(item)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500 truncate">{item.url}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.trustScore >= 80 ? 'bg-green-100 text-green-800' : 
                      item.trustScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.trustScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryView; 