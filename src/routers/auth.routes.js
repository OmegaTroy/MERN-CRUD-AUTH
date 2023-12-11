import { Router } from 'express'
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRegisted } from '../middlewares/validateToken.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { validatorSchema } from '../middlewares/validator.middleware.js'
const router = Router();

router.post('/register', validatorSchema(registerSchema), register)

router.post('/login', validatorSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/profile', authRegisted, profile)

router.get('/verify', verifyToken)

export default router