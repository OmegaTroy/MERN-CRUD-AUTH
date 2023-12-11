import { Router } from 'express'
import { authRegisted } from '../middlewares/validateToken.js';
import { createTask, deleteTask, getTask, getTasks, updeteTask } from '../controllers/task.controller.js'

const router = Router();

router.get('/tasks', authRegisted, getTasks)

router.get('/task/:id', authRegisted, getTask)

router.post('/tasks', authRegisted, createTask)

router.delete('/task/:id', authRegisted, deleteTask)

router.put('/task/:id', authRegisted, updeteTask)


export default router