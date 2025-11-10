export async function authFetch(url, options = {}) {
  const token = localStorage.getItem('token')
  const headers = options.isForm
    ? { Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const res = await fetch(url, { ...options, headers })
  if (!res.ok) throw new Error(await res.text())
  return res.headers.get('content-type')?.includes('application/json') ? res.json() : res.text()
}