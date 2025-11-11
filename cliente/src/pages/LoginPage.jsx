import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage({ t, setPage }) {
  const { performLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError(t('loginErrorEmpty')); return }
    setLoading(true); setError('')
    try {
      await performLogin(email, password)
      setPage('home')
    } catch {
      setError(t('loginErrorGeneric'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white border rounded p-6 w-full max-w-sm space-y-3">
        <h2 className="text-xl font-bold text-center">{t('loginTitle')}</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="block text-sm mb-1">{t('loginEmail')}</label>
          <input className="w-full border rounded px-3 py-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">{t('loginPassword')}</label>
          <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
          {loading ? t('loginLoading') : t('loginButton')}
        </button>
      </form>
    </div>
  )
}