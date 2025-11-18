import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar({ setLang, setPage, page, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="bg-blue-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div onClick={() => { setPage('home'); setMobileMenuOpen(false) }} className="cursor-pointer flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <span className="text-blue-600 text-xl font-bold">S</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              StudyHub
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={() => setPage('home')} 
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                page==='home'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-white hover:bg-blue-700'
              }`}
            >
              {t('navHome')}
            </button>
            {user && (
              <button 
                onClick={() => setPage('summaries')} 
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  page==='summaries'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-white hover:bg-blue-700'
                }`}
              >
                {t('navSummaries')}
              </button>
            )}
            {user?.isAdmin && (
              <button 
                onClick={() => setPage('admin')} 
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  page==='admin'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-white hover:bg-blue-700'
                }`}
              >
                {t('navAdmin')}
              </button>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <select 
              onChange={(e)=>setLang(e.target.value)} 
              className="bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-800 transition-colors border-0"
            >
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
            </select>
            {user ? (
              <button 
                onClick={()=>{ logout(); setPage('home') }} 
                className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md"
              >
                {t('navLogout')}
              </button>
            ) : (
              <button 
                onClick={()=>setPage('login')} 
                className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-md"
              >
                {t('navLogin')}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <select 
              onChange={(e)=>setLang(e.target.value)} 
              className="bg-blue-700 text-white px-2 py-1 rounded-lg text-xs font-semibold border-0"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-white hover:bg-blue-700 rounded-lg">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-blue-700 pt-2">
            <button 
              onClick={()=>{setPage('home');setMobileMenuOpen(false)}} 
              className={`block w-full text-left px-4 py-3 rounded-lg font-semibold ${
                page==='home' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-700'
              }`}
            >
              {t('navHome')}
            </button>
            {user && (
              <button 
                onClick={()=>{setPage('summaries');setMobileMenuOpen(false)}} 
                className={`block w-full text-left px-4 py-3 rounded-lg font-semibold ${
                  page==='summaries' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-700'
                }`}
              >
                {t('navSummaries')}
              </button>
            )}
            {user?.isAdmin && (
              <button 
                onClick={()=>{setPage('admin');setMobileMenuOpen(false)}} 
                className={`block w-full text-left px-4 py-3 rounded-lg font-semibold ${
                  page==='admin' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-700'
                }`}
              >
                {t('navAdmin')}
              </button>
            )}
            {user ? (
              <button 
                onClick={()=>{logout(); setPage('home'); setMobileMenuOpen(false)}} 
                className="block w-full bg-red-500 text-white px-4 py-3 rounded-lg font-semibold"
              >
                {t('navLogout')}
              </button>
            ) : (
              <button 
                onClick={()=>{setPage('login'); setMobileMenuOpen(false)}} 
                className="block w-full bg-white text-blue-600 px-4 py-3 rounded-lg font-semibold"
              >
                {t('navLogin')}
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}