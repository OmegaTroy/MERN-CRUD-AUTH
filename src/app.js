import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRouter from './routers/auth.routes.js'
import tasksRouter from './routers/tasks.routes.js'
import cookieParser from 'cookie-parser'

const app = express();

app.use(morgan('dev'))

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())

app.use(express.urlencoded({ extended: false }));


app.use(cookieParser())

app.use('/api', authRouter)
app.use('/api', tasksRouter)

export default app