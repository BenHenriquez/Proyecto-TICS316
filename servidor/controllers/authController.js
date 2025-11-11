import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const users = []

export function register(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Campos requeridos' })
  if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Usuario ya existe' })
  
  const hash = bcrypt.hashSync(password, 10)
  
  // 🔥 NUEVO: Primer usuario registrado es admin
  const isAdmin = users.length === 0
  
  users.push({ 
    id: Date.now(), 
    email, 
    password: hash, 
    subscribed: false,
    isAdmin // 🔥 Agregamos el rol
  })
  
  res.json({ message: 'Registrado' })
}

export function login(req, res) {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' })
  
  const ok = bcrypt.compareSync(password, user.password)
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' })
  
  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin }, // 🔥 Incluir isAdmin en token
    process.env.JWT_SECRET, 
    { expiresIn: '2h' }
  )
  
  res.json({ token, isAdmin: user.isAdmin }) // 🔥 Enviar isAdmin al frontend
}

export function me(req, res) {
  const user = users.find(u => u.id === req.user.id)
  res.json({ 
    user: { 
      id: user.id, 
      email: user.email, 
      subscribed: user.subscribed,
      isAdmin: user.isAdmin 
    } 
  })
}

export function activateSubscription(req, res) {
  const user = users.find(u => u.id === req.user.id)
  user.subscribed = true
  res.json({ subscribed: true })
}