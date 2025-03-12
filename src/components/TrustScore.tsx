interface TrustScoreProps {
  score: number
}

const TrustScore = ({ score }: TrustScoreProps) => {
  // Bestimme die Farbe basierend auf dem Score
  const getScoreColor = () => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  // Bestimme den Text basierend auf dem Score
  const getScoreText = () => {
    if (score >= 80) return 'Sehr vertrauenswürdig'
    if (score >= 60) return 'Vertrauenswürdig'
    if (score >= 40) return 'Teilweise vertrauenswürdig'
    return 'Wenig vertrauenswürdig'
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Vertrauensbewertung</h3>
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Hintergrundkreis */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            {/* Fortschrittskreis */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={getScoreColor().replace('bg-', 'text-')}
              strokeWidth="10"
              strokeDasharray={`${score * 2.83} 283`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
              className={getScoreColor()}
            />
            <text
              x="50"
              y="50"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="24"
              fontWeight="bold"
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