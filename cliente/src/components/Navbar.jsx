// Ejemplo de mejora responsive para el Navbar
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar({ setLang, setPage, page, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div onClick={() => { setPage('home'); setMobileMenuOpen(false) }} className="cursor-pointer">
            <h1 className="text-xl sm:text-2xl font-bold">StudyHub</h1>
          </div>

          <div className="hidden md:flex space-x-4">
            <button onClick={() => setPage('home')} className={`px-3 py-2 rounded ${page==='home'?'bg-blue-700':''}`}>{t('navHome')}</button>
            {user && <button onClick={() => setPage('summaries')} className={`px-3 py-2 rounded ${page==='summaries'?'bg-blue-700':''}`}>{t('navSummaries')}</button>}
            {user?.isAdmin && <button onClick={() => setPage('admin')} className={`px-3 py-2 rounded ${page==='admin'?'bg-blue-700':''}`}>{t('navAdmin')}</button>}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <select onChange={(e)=>setLang(e.target.value)} className="bg-blue-700 px-2 py-1 rounded">
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            {user ? (
              <button onClick={()=>{ logout(); setPage('home') }} className="bg-red-500 px-4 py-2 rounded">{t('navLogout')}</button>
            ) : (
              <button onClick={()=>setPage('login')} className="bg-green-500 px-4 py-2 rounded">{t('navLogin')}</button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <select onChange={(e)=>setLang(e.target.value)} className="bg-blue-700 px-2 py-1 rounded text-xs">
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={()=>{setPage('home');setMobileMenuOpen(false)}} className={`block w-full text-left px-3 py-2 rounded ${page==='home'?'bg-blue-700':''}`}>{t('navHome')}</button>
            {user && <button onClick={()=>{setPage('summaries');setMobileMenuOpen(false)}} className={`block w-full text-left px-3 py-2 rounded ${page==='summaries'?'bg-blue-700':''}`}>{t('navSummaries')}</button>}
            {user?.isAdmin && <button onClick={()=>{setPage('admin');setMobileMenuOpen(false)}} className={`block w-full text-left px-3 py-2 rounded ${page==='admin'?'bg-blue-700':''}`}>{t('navAdmin')}</button>}
            {user ? (
              <button onClick={()=>{logout(); setPage('home'); setMobileMenuOpen(false)}} className="block w-full bg-red-500 px-3 py-2 rounded">{t('navLogout')}</button>
            ) : (
              <button onClick={()=>{setPage('login'); setMobileMenuOpen(false)}} className="block w-full bg-green-500 px-3 py-2 rounded">{t('navLogin')}</button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}