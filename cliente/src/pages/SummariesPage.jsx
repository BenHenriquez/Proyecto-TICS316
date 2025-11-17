import React, { useEffect, useState } from 'react'
import { fetchSummaries } from '../api/summaries.js'

export default function SummariesPage({ t }) {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSummaries()
        console.log('Summaries loaded:', data)
        setSummaries(data || [])
      } catch (e) {
        console.error('Error loading summaries', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Get unique courses for filter
  const courses = ['all', ...new Set(summaries.map(s => s.course))]
  const filteredSummaries = filter === 'all' 
    ? summaries 
    : summaries.filter(s => s.course === filter)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-green-400 text-xl font-semibold">Cargando resúmenes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-3xl">📖</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              {t('summariesTitle')}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            {t('summariesDesc')}
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex justify-center overflow-x-auto">
          <div className="inline-flex gap-2 bg-gray-800/50 backdrop-blur-sm p-2 rounded-xl border border-green-500/30">
            {courses.map(course => (
              <button
                key={course}
                onClick={() => setFilter(course)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filter === course
                    ? 'bg-green-500 text-black shadow-lg'
                    : 'text-gray-300 hover:bg-green-500/20 hover:text-green-400'
                }`}
              >
                {course === 'all' ? '📚 Todos' : course}
              </button>
            ))}
          </div>
        </div>

        {/* Summaries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSummaries.map((s) => (
            <div 
              key={s.id} 
              className="group bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-4xl">📄</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors">
                {s.title}
              </h3>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-green-400">
                  <span className="text-lg">📚</span>
                  <span className="font-semibold text-sm">{s.course}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-lg">📖</span>
                  <span className="text-sm">{s.unit}</span>
                </div>
              </div>

              {/* Button */}
              <a
                href={`http://localhost:4000${s.filepath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-green-600 text-black py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-green-500/50 group-hover:scale-105"
              >
                👁️ {t('summaryCardView')}
              </a>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSummaries.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🔍</span>
            </div>
            <p className="text-2xl text-gray-400 font-semibold">
              No hay resúmenes disponibles
            </p>
            <p className="text-gray-500 mt-2">
              {filter !== 'all' ? 'Prueba con otro filtro' : 'Pronto habrá nuevo contenido'}
            </p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-full px-8 py-4">
            <span className="text-green-400 font-bold text-2xl">{summaries.length}</span>
            <span className="text-gray-300">resúmenes disponibles</span>
          </div>
        </div>
      </div>
    </div>
  )
}