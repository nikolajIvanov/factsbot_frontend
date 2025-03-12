interface TrustScoreProps {
  score: number
}

const TrustScore = ({ score }: TrustScoreProps) => {
  // Bestimme die Farbe basierend auf dem Score
  const getScoreColor = () => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    if (score >= 40) return 'text-orange-500'
    return 'text-red-500'
  }
  
  // Bestimme die Füllfarbe für den inneren Kreis
  const getFillColor = () => {
    if (score >= 80) return 'fill-green-500'
    if (score >= 60) return 'fill-yellow-500'
    if (score >= 40) return 'fill-orange-500'
    return 'fill-red-500'
  }

  // Bestimme den Text basierend auf dem Score
  const getScoreText = () => {
    if (score >= 80) return 'Sehr vertrauenswürdig'
    if (score >= 60) return 'Vertrauenswürdig'
    if (score >= 40) return 'Teilweise vertrauenswürdig'
    return 'Wenig vertrauenswürdig'
  }

  // Bestimme die Textfarbe für besseren Kontrast
  const getTextColor = () => {
    return 'fill-white'
  }

  // Bestimme die Hintergrundfarbe für den Kreis
  const getCircleBackgroundColor = () => {
    if (score >= 80) return 'fill-green-100'
    if (score >= 60) return 'fill-yellow-100'
    if (score >= 40) return 'fill-orange-100'
    return 'fill-red-100'
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Vertrauensbewertung</h3>
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Hintergrundkreis mit leichter Färbung */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className={getCircleBackgroundColor()}
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            {/* Fortschrittskreis */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={getScoreColor().replace('text-', 'stroke-')}
              strokeWidth="10"
              strokeDasharray={`${score * 2.83} 283`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
            {/* Innerer Kreis für den Prozentsatz */}
            <circle
              cx="50"
              cy="50"
              r="35"
              className={getFillColor()}
            />
            <text
              x="50"
              y="50"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="24"
              fontWeight="bold"
              className={getTextColor()}
            >
              {score}%
            </text>
          </svg>
        </div>
        <div>
          <p className="text-xl font-semibold">{getScoreText()}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Basierend auf der Analyse der Fakten und Quellen
          </p>
        </div>
      </div>
    </div>
  )
}

export default TrustScore 