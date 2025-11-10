import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import summaryRoutes from './routes/summaryRoutes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

// Asegurar carpeta uploads
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

// Archivos estáticos (PDF)
app.use('/files', express.static(uploadsDir))

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/summaries', summaryRoutes)

// Healthcheck
app.get('/', (_req, res) => res.json({ ok: true }))

// Manejo de errores genérico
app.use((err, _req, res, _next) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`))