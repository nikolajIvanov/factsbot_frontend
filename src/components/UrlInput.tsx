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
    <div className="bg-card p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Webseite analysieren</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium mb-1">
            URL eingeben
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={disabled}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          {disabled ? 'Analysiere...' : 'Analysieren'}
        </button>
      </form>
    </div>
  )
}

export default UrlInput 