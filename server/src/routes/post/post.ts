//import router from 'express';
import * as dotenv from 'dotenv'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { Router } from 'express'

const router = Router()

export interface ServerStatus {
    status: 'OK' | 'ERROR'
    message: string
    auth: boolean
}

const serverStatus = {
    status: 'OK',
    message: 'Server is running',
    auth: false,
}

router.get('/status', (req, res) => {
    res.status(200).send(serverStatus)
})

/* router.post(
    '/login',
    (req, res, next) => {
        //Access denied
        return res.sendStatus(401).send('Access denied')
        next()
    },
    (req, res) => {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(400).send({
                status: 'ERROR',
                message: 'Username or password is missing',
                auth: false,
            })
            return
        }

        // @ts-ignore
        const accesssToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accesssToken })
    }
) */

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    // @ts-ignore
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        next()
    })
}

router.post('/update', authenticateToken, (req, res, next) => {
    res.status(200).send('Update')
    console.log(req.body)
    next()
})

export default router
