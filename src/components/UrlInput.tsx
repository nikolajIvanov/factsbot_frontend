import { useState, FormEvent } from 'react'

interface UrlInputProps {
  onSubmit: (url: string) => void
  disabled?: boolean
}

const UrlInput = ({ onSubmit, disabled = false }: UrlInputProps) => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL zur Analyse eingeben..."
            className="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            required
            disabled={disabled}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        <button
          type="submit"
          className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
          disabled={disabled}
        >
          {disabled ? 'Analysiere...' : 'Analysieren'}
        </button>
      </div>
    </form>
  )
}

export default UrlInput 