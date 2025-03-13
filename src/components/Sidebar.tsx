import { useState } from 'react';
import { History, Home, User, ChevronRight, Menu, X, Shield, CheckCircle } from 'lucide-react';
import { HistoryItem, ViewType } from '../types';

// Beispieldaten für den Verlauf
const dummyHistory: HistoryItem[] = [
  {
    id: '1',
    title: 'Klimawandel-Bericht zeigt alarmi...',
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
  }
];

interface SidebarProps {
  onSelectHistoryItem?: (item: HistoryItem) => void;
  onViewChange?: (view: ViewType) => void;
  onToggleSidebar?: (isOpen: boolean) => void;
}

const Sidebar = ({ onSelectHistoryItem, onViewChange, onToggleSidebar }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleHistoryItemClick = (item: HistoryItem) => {
    if (onSelectHistoryItem) {
      onSelectHistoryItem(item);
    }
  };

  const handleViewChange = (view: ViewType) => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggleSidebar) {
      onToggleSidebar(!newState); // Wir geben den gegenteiligen Wert zurück (isOpen)
    }
  };

  return (
    <>
      {/* Toggle-Button für mobile/collapsed Ansicht */}
      <button 
        className={`fixed top-4 ${isCollapsed ? 'left-4' : 'left-[260px]'} z-20 bg-gray-800 text-white p-2 rounded-full shadow-lg transition-all duration-300`}
        onClick={toggleSidebar}
      >
        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col z-10 transition-all duration-300 ${
          isCollapsed ? 'w-0 opacity-0 -translate-x-full' : 'w-64 opacity-100 translate-x-0'
        }`}
      >
        {/* Logo-Bereich */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-center space-x-2">
          <div className="flex items-center justify-center bg-blue-600 rounded-full p-1">
            <Shield size={24} className="text-white" />
            <CheckCircle size={12} className="text-white absolute" />
          </div>
          <h1 className="text-2xl font-bold">FactsBot</h1>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b border-gray-700">
          <div 
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleViewChange('main')}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </div>
        </div>

        {/* Verlauf-Bereich */}
        <div className="flex-grow overflow-hidden flex flex-col">
          <div 
            className="p-4 border-b border-gray-700 flex items-center justify-between cursor-pointer hover:bg-gray-800"
            onClick={() => handleViewChange('history')}
          >
            <div className="flex items-center space-x-2">
              <History size={20} />
              <span>Verlauf</span>
            </div>
            <ChevronRight size={20} />
          </div>

          {/* Verlaufseinträge direkt anzeigen */}
          <div className="overflow-y-auto flex-grow">
            {dummyHistory.slice(0, 5).map((item) => (
              <div 
                key={item.id}
                className="p-3 border-b border-gray-700 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleHistoryItemClick(item)}
              >
                <div className="text-sm font-medium truncate">{item.title}</div>
                <div className="text-xs text-gray-400 mt-1 flex justify-between">
                  <span>{item.date}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    item.trustScore >= 80 ? 'bg-green-900 text-green-200' : 
                    item.trustScore >= 60 ? 'bg-yellow-900 text-yellow-200' : 
                    'bg-red-900 text-red-200'
                  }`}>
                    {item.trustScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profil-Bereich */}
        <div className="p-4 border-t border-gray-700 flex items-center space-x-3 cursor-pointer hover:bg-gray-800">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <User size={20} />
          </div>
          <div>
            <div className="font-medium">Max Mustermann</div>
            <div className="text-xs text-gray-400">Premium-Nutzer</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 