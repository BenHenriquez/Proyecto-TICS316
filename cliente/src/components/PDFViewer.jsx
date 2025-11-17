import React from 'react'

export default function PDFViewer({ pdfUrl, title, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border-2 border-green-500/50 rounded-2xl w-full h-full max-w-6xl max-h-screen flex flex-col shadow-2xl shadow-green-500/30">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-green-500/30 bg-gray-800/50">
          <h2 className="text-xl font-bold text-white truncate flex items-center gap-2">
            <span className="text-2xl">📄</span>
            {title}
          </h2>
          <div className="flex gap-2">
            <a
              href={pdfUrl}
              download
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-black rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/50"
            >
              📥 Descargar
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
            >
              ✕ Cerrar
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-gray-800">
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