import React from 'react'

export default function HomePage({ setPage, t }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold">{t('homeTitle')}</h1>
      <p className="text-gray-600">{t('homeSubtitle')}</p>
      <button onClick={()=>setPage('summaries')} className="bg-blue-600 text-white px-4 py-2 rounded">
        {t('homeCTA')}
      </button>
    </div>
  )
}