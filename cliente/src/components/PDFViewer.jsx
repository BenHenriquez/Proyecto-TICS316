import React from 'react'

export default function PDFViewer({ pdfUrl, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold truncate">{title}</h2>
          <div className="flex gap-2">
            
              href={pdfUrl}
              download
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              📥 Descargar
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ✕ Cerrar
            </button>
          </div>
        </div>

        {/* Visor PDF */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title={title}
          />
        </div>
      </div>
    </div>
  )
}