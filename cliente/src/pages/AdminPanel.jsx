import React, { useState } from 'react'
import { createSummary, deleteSummaryApi, updateSummary } from '../api/summaries.js'

export default function AdminPanel({ t, summaries, setSummaries }) {
  const [form, setForm] = useState({ course: '', unit: '', title: '', file: null })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ course: '', unit: '', title: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('course', form.course)
    fd.append('unit', form.unit)
    fd.append('title', form.title)
    fd.append('file', form.file)
    try {
      const created = await createSummary(fd)
      setSummaries(prev => [created, ...prev])
      setForm({ course: '', unit: '', title: '', file: null })
      alert('Creado')
    } catch (err) {
      alert('Error al crear')
    }
  }

  const startEdit = (s) => {
    setEditingId(s.id)
    setEditForm({ course: s.course, unit: s.unit, title: s.title })
  }

  const confirmEdit = async () => {
    try {
      const updated = await updateSummary(editingId, editForm)
      setSummaries(prev => prev.map(s => s.id === editingId ? updated : s))
      setEditingId(null)
      alert('Actualizado')
    } catch {
      alert('Error al actualizar')
    }
  }

  const remove = async (id) => {
    if (!confirm('Eliminar?')) return
    try {
      await deleteSummaryApi(id)
      setSummaries(prev => prev.filter(s => s.id !== id))
    } catch {
      alert('Error al eliminar')
    }
  }

  return (
    <div className="p-4 grid gap-8 lg:grid-cols-2">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">{t('adminFormTitle')}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full px-4 py-2 border rounded" placeholder={t('adminFormCourse')} value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} />
          <input className="w-full px-4 py-2 border rounded" placeholder={t('adminFormUnit')} value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} />
            <input className="w-full px-4 py-2 border rounded" placeholder={t('adminFormTitlePlaceholder')} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input type="file" accept=".pdf" onChange={e => setForm({ ...form, file: e.target.files[0] })} />
          <button className="w-full bg-green-600 text-white py-2 rounded">{t('adminFormSave')}</button>
        </form>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">{t('adminExistingTitle')}</h3>
        <ul className="space-y-3">
          {summaries.map(s => (
            <li key={s.id} className="p-3 border rounded flex flex-col gap-2">
              {editingId === s.id ? (
                <>
                  <input className="border px-2 py-1" value={editForm.course} onChange={e => setEditForm({ ...editForm, course: e.target.value })} />
                  <input className="border px-2 py-1" value={editForm.unit} onChange={e => setEditForm({ ...editForm, unit: e.target.value })} />
                  <input className="border px-2 py-1" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
                  <div className="flex gap-2">
                    <button onClick={confirmEdit} className="bg-blue-600 text-white px-3 py-1 rounded">{t('adminExistingEdit')}</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-gray-500">{s.course} | {s.unit}</p>
                  <div className="flex gap-3">
                    <button onClick={() => startEdit(s)} className="text-blue-600">{t('adminExistingEdit')}</button>
                    <button onClick={() => remove(s.id)} className="text-red-600">{t('adminExistingDelete')}</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}