// Typdefinitionen für die Verlaufseinträge
export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  date: string;
  trustScore: number;
}

// Typdefinitionen für die Ansichten
export type ViewType = 'main' | 'history'; 