import React, { useEffect, useState } from 'react'
import { fetchSummaries } from '../api/summaries.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function SummariesPage({ t }) {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSummaries()
        setSummaries(data || [])
      } catch (e) {
        console.error('Error loading summaries', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {t('summariesTitle')}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {t('summariesDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {summaries.map((s) => (
            <div 
              key={s.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-4 sm:p-6"
            >
              <div className="text-3xl mb-3">📄</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                {s.title}
              </h3>
              <div className="space-y-1 mb-4">
                <p className="text-sm text-blue-600 font-medium">📚 {s.course}</p>
                <p className="text-sm text-gray-500">📖 {s.unit}</p>
              </div>
              <a
                href={`http://localhost:4000${s.filepath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('summaryCardView')}
              </a>
            </div>
          ))}
        </div>

        {summaries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              No hay resúmenes disponibles aún
            </p>
          </div>
        )}
      </div>
    </div>
  )
}