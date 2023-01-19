import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserInstance } from '../model/userModel'

const secret = process.env.JWT_SECRET as string

export async function auth(req: Request | any, res: Response, next: NextFunction){
    try {
        const authorization = req.headers.authorization

        if(!authorization){
            return res.status(400).json({
                message: 'Kindly log in to continue'
            })
        }

        const token = authorization?.split(' ')[1].toString() as string

        let verified = jwt.verify(token, secret)

        if(!verified){
            return res.status(401).json({ message: 'Acess denied! User not verified'})
        }

        const  {id} = verified as {[key: string]: string}

        const user = await UserInstance.findOne({ where: {id}})

        if(!user){
            return res.status(400).json({ message: 'User not verified' })
        }

        req.user = verified
        next()

    } catch (err){
        return res.status(500).json({ message: 'User not logged in', err})
    }
}