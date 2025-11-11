import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SummariesPage from './pages/SummariesPage.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import useTranslation from './hooks/useTranslation.js'

function AppContent() {
  const [page, setPage] = useState('home')
  const [lang, setLang] = useState('es')
  const { user, loading } = useAuth()
  const t = useTranslation(lang)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setLang={setLang} setPage={setPage} page={page} t={t} />
      {page === 'home' && <HomePage setPage={setPage} t={t} />}
      {page === 'login' && !user && <LoginPage t={t} setPage={setPage} />}
      {page === 'summaries' && user && <SummariesPage t={t} />}
      {page === 'admin' && user?.isAdmin && <AdminPanel t={t} />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}