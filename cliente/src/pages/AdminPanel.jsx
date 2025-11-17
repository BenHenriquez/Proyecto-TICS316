import React, { useState, useEffect } from 'react'
import { fetchSummaries } from '../api/summaries.js'

export default function AdminPanel({ t }) {
  const [summaries, setSummaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    unit: '',
    file: null
  })

  useEffect(() => {
    loadSummaries()
  }, [])

  const loadSummaries = async () => {
    try {
      const data = await fetchSummaries()
      setSummaries(data || [])
    } catch (e) {
      console.error('Error loading summaries', e)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.course || !formData.unit || !formData.file) {
      alert('Por favor completa todos los campos')
      return
    }

    setUploading(true)
    const form = new FormData()
    form.append('title', formData.title)
    form.append('course', formData.course)
    form.append('unit', formData.unit)
    form.append('file', formData.file)

    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:4000/api/summaries', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      })

      if (res.ok) {
        alert('✅ Resumen subido exitosamente')
        setFormData({ title: '', course: '', unit: '', file: null })
        loadSummaries()
      } else {
        alert('❌ Error al subir resumen')
      }
    } catch (e) {
      console.error('Upload error', e)
      alert('❌ Error de conexión')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este resumen?')) return

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:4000/api/summaries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        alert('✅ Resumen eliminado')
        loadSummaries()
      } else {
        alert('❌ Error al eliminar')
      }
    } catch (e) {
      console.error('Delete error', e)
      alert('❌ Error de conexión')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-3xl">⚙️</span>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Panel de Administración
            </span>
          </h1>
          <p className="text-gray-400">Gestiona los resúmenes disponibles</p>
        </div>

        {/* Upload Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-400 mb-6">📤 Subir Nuevo Resumen</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-900/50 border border-green-500/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Ej: Resumen de Cálculo I"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Curso</label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={e => setFormData({...formData, course: e.target.value})}
                  className="w-full bg-gray-900/50 border border-green-500/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Ej: Cálculo I"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Unidad</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={e => setFormData({...formData, unit: e.target.value})}
                  className="w-full bg-gray-900/50 border border-green-500/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Ej: Unidad 1"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Archivo PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={e => setFormData({...formData, file: e.target.files[0]})}
                  className="w-full bg-gray-900/50 border border-green-500/30 text-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-500 file:text-black file:font-semibold file:cursor-pointer hover:file:bg-green-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-black py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/50 disabled:opacity-50"
            >
              {uploading ? '⏳ Subiendo...' : '📤 Subir Resumen'}
            </button>
          </form>
        </div>

        {/* Summaries List */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-green-400 mb-6">📚 Resúmenes Existentes ({summaries.length})</h2>
          
          {loading ? (
            <div className="text-center py-12 text-gray-400">Cargando...</div>
          ) : summaries.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No hay resúmenes aún</div>
          ) : (
            <div className="space-y-4">
              {summaries.map(s => (
                <div key={s.id} className="bg-gray-900/50 border border-green-500/20 rounded-xl p-4 flex items-center justify-between hover:border-green-500/50 transition-all">
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">{s.title}</h3>
                    <div className="flex gap-4 text-sm">
                      <span className="text-green-400">📚 {s.course}</span>
                      <span className="text-gray-400">📖 {s.unit}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`http://localhost:4000${s.filepath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      👁️ Ver
                    </a>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}