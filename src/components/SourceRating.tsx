import { QuellenBewertung } from '../data/dummyData'

interface SourceRatingProps {
  rating: QuellenBewertung
}

const SourceRating = ({ rating }: SourceRatingProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Bewertung der Quelle</h3>
      <div className="border rounded-md overflow-hidden">
        <div className="p-5 bg-blue-50">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </span>
            <div className="flex-1">
              <h4 className="font-medium text-lg mb-2">{rating.domain}</h4>
              <p className="text-gray-700">{rating.bewertung}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SourceRating 