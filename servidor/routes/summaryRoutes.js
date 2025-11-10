import { Router } from 'express'
import { authMiddleware } from '../utils/authMiddleware.js'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })
const router = Router()

let summaries = [
  { id: 1, course: 'Cálculo I', unit: 'Unidad 1', title: 'Límites', fileName: 'limites.pdf' }
]

router.get('/', authMiddleware, (req, res) => {
  res.json(summaries)
})

router.post('/', authMiddleware, upload.single('file'), (req, res) => {
  const { course, unit, title } = req.body
  if (!course || !unit || !title || !req.file) return res.status(400).json({ error: 'Datos incompletos' })
  const summary = {
    id: Date.now(),
    course,
    unit,
    title,
    fileName: req.file.originalname,
    storageName: req.file.filename
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