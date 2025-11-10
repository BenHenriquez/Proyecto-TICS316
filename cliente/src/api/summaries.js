import { authFetch } from './utilAuthFetch.js'

const BASE = 'http://localhost:4000/api/summaries'

export const listSummaries = () => authFetch(BASE)
export const createSummary = (formData) =>
  authFetch(BASE, { method: 'POST', body: formData, isForm: true })
export const updateSummary = (id, data) =>
  authFetch(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteSummaryApi = (id) =>
  authFetch(`${BASE}/${id}`, { method: 'DELETE' })