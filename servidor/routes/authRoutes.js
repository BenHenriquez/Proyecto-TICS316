import { Router } from 'express'
import { register, login, me, activateSubscription } from '../controllers/authController.js'
import { authMiddleware } from '../utils/authMiddleware.js'

const router = Router()
router.post('/register', register)
router.post('/login', login)
router.get('/me', authMiddleware, me)
router.post('/subscribe', authMiddleware, activateSubscription)

export default router