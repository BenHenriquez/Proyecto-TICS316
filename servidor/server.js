import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import summaryRoutes from './routes/summaryRoutes.js'

dotenv.config()

const app = express()

// IMPORTANTE: Configuración de CORS mejorada
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 🔥 NUEVO: Servir archivos PDF con headers correctos
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.pdf')) {
      res.set('Content-Type', 'application/pdf')
      res.set('Content-Disposition', 'inline') // Para visualizar en navegador
    }
  }
}))

app.use('/api/auth', authRoutes)
app.use('/api/summaries', summaryRoutes)

app.get('/', (_req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Backend escuchando en puerto', PORT))