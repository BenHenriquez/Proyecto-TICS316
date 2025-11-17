import { Router } from 'express'
import { authMiddleware } from '../utils/authMiddleware.js'
import multer from 'multer'
import path from 'path'

// Configurar multer para mantener la extensión del archivo
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Solo se permiten archivos PDF'))
    }
  }
})

const router = Router()

let summaries = [
  // Cálculo I
  { 
    id: 1, 
    course: 'Cálculo I', 
    unit: 'Unidad 1', 
    title: 'Límites y Continuidad',
    filepath: '/uploads/ejemplo.pdf'
  },
  
  // Redes de Computadores
  { 
    id: 2, 
    course: 'Redes de Computadores', 
    unit: 'Unidad 1', 
    title: 'Introducción a TCP/IP',
    filepath: '/uploads/redes-tcp-ip.pdf'
  },
  { 
    id: 3, 
    course: 'Redes de Computadores', 
    unit: 'Unidad 2', 
    title: 'Protocolos de Red',
    filepath: '/uploads/redes-protocolos.pdf'
  },
  
  // Investigación de Operaciones
  { 
    id: 4, 
    course: 'Investigación de Operaciones', 
    unit: 'Unidad 1', 
    title: 'Programación Lineal',
    filepath: '/uploads/io-programacion-lineal.pdf'
  },
  { 
    id: 5, 
    course: 'Investigación de Operaciones', 
    unit: 'Unidad 2', 
    title: 'Método Simplex',
    filepath: '/uploads/io-simplex.pdf'
  },
  
  // Diseño de Software
  { 
    id: 6, 
    course: 'Diseño de Software', 
    unit: 'Unidad 1', 
    title: 'Patrones de Diseño',
    filepath: '/uploads/software-patrones.pdf'
  },
  { 
    id: 7, 
    course: 'Diseño de Software', 
    unit: 'Unidad 2', 
    title: 'Diagramas UML',
    filepath: '/uploads/software-uml.pdf'
  }
]

// 🔥 Permitir acceso público para visualizar
router.get('/', (req, res) => {
  res.json(summaries)
})

router.post('/', authMiddleware, upload.single('file'), (req, res) => {
  const { course, unit, title } = req.body
  if (!course || !unit || !title || !req.file) {
    return res.status(400).json({ error: 'Datos incompletos' })
  }
  
  const summary = {
    id: Date.now(),
    course,
    unit,
    title,
    filepath: `/uploads/${req.file.filename}` // Ruta completa
  }
  
  summaries.unshift(summary)
  res.json(summary)
})

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  const { course, unit, title } = req.body
  const idx = summaries.findIndex(s => s.id === Number(id))
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' })
  summaries[idx] = { ...summaries[idx], course, unit, title }
  res.json(summaries[idx])
})

router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params
  summaries = summaries.filter(s => s.id !== Number(id))
  res.json({ deleted: true })
})

export default router