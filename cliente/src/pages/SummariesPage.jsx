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

  if (loading) return <div className="p-6">Cargando…</div>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t('summariesTitle')}</h1>
      <p className="text-gray-600 mb-6">{t('summariesDesc')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaries.map(s => (
          <div key={s.id} className="border rounded p-4">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-600">📚 {s.course}</p>
            <p className="text-sm text-gray-500">📖 {s.unit}</p>
            <a
              className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded"
              href={`http://localhost:4000${s.filepath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('summaryCardView')}
            </a>
          </div>
        ))}
      </div>

      {summaries.length === 0 && <p className="text-gray-500 mt-6">No hay resúmenes disponibles aún</p>}
    </div>
  )
}