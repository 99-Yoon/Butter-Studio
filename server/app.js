import express from 'express'
import cookieParser from 'cookie-parser'
import mainRouter from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/upload', express.static('upload'))
app.use('/api', mainRouter)

export default app