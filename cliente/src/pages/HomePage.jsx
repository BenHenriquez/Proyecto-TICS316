import React from 'react'

export default function HomePage({ setPage, t }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8 animate-bounce">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-5xl">📚</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900">
          {t('homeTitle')}
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t('homeSubtitle')}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">📖</div>
            <h3 className="text-blue-600 font-bold text-lg mb-2">Resúmenes</h3>
            <p className="text-gray-600 text-sm">Material organizado y actualizado</p>
          </div>
          
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-blue-600 font-bold text-lg mb-2">Fácil Acceso</h3>
            <p className="text-gray-600 text-sm">Encuentra lo que necesitas rápido</p>
          </div>
          
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-blue-600 font-bold text-lg mb-2">Actualizado</h3>
            <p className="text-gray-600 text-sm">Contenido siempre al día</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <button 
            onClick={()=>setPage('summaries')} 
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-blue-600 hover:to-blue-800 transition-all shadow-2xl hover:scale-105"
          >
            <span>{t('homeCTA')}</span>
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex justify-center gap-8 flex-wrap">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">100+</div>
            <div className="text-gray-600 text-sm">Resúmenes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">10+</div>
            <div className="text-gray-600 text-sm">Asignaturas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">24/7</div>
            <div className="text-gray-600 text-sm">Disponible</div>
          </div>
        </div>
      </div>
    </div>
  )
}