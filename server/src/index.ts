//import express
import express from 'express'
import jwt from 'jsonwebtoken'

import postRouter from './routes/post/post.js'
import machineRouter from './routes/machineStatus/index.js'

const app = express()

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
    res.send('Hello World!')
    res.status(200)
})

/* app.get('/api/post', (req, res) => {
    res.send('Hello World!')
    res.status(200)
}) */
