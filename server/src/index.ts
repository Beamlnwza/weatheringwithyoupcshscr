//import express
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import postRouter from './routes/post/post.js'
import machineRouter from './routes/machineStatus/index.js'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/post', postRouter)
app.use('/api/machine', machineRouter)
// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} -> http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../src/site/index.html'))
    res.status(200)
})

/* app.get('/api/post', (req, res) => {
    res.send('Hello World!')
    res.status(200)
}) */
