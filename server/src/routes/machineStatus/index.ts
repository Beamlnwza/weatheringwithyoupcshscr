//import express, router and jwt
import express, { Router } from 'express'
import jwt from 'jsonwebtoken'

//import the interface
import { ServerStatus } from '../post/post.js'

const router = Router()

const Status: ServerStatus = {
    status: 'OK',
    message: 'Machine is not',
    auth: false,
}

router.get('/status', (req, res) => {
    res.status(200).send(Status)
})

router.post('/update', (req, res, next) => {
    //auth with jwt first
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    // @ts-ignore
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        next()
    })

    //if auth is successful, update the status
    const { status, message } = req.body
    if (!status || !message) {
        res.status(400).send({
            status: 'ERROR',
            message: 'Status or message is missing',
            auth: false,
        })
        return
    }
    Status.status = status
    Status.message = message
    res.status(200).send(Status)
})

export default router
