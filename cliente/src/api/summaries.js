import { authFetch } from './utilAuthFetch.js'

const BASE = 'http://localhost:4000/api/summaries'

export const listSummaries = () => authFetch(BASE)
export const createSummary = (formData) =>
  authFetch(BASE, { method: 'POST', body: formData, isForm: true })
export const updateSummary = (id, data) =>
  authFetch(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteSummaryApi = (id) =>
  authFetch(`${BASE}/${id}`, { method: 'DELETE' })

export async function fetchSummaries() {
  try {
    const res = await fetch('http://localhost:4000/api/summaries')
    if (!res.ok) {
      console.error('GET /api/summaries failed:', res.status)
      return []
    }
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (e) {
    console.error('Error fetching summaries:', e)
    return []
  }
}