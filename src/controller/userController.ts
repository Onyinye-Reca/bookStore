import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { UserInstance } from '../model/userModel'
import bcrypt from 'bcryptjs'
import { generateAccessToken } from '../utility/utils'


export async function registerUser(req: Request, res: Response, next: NextFunction){
    const id = uuidv4()
    try {
        const { email, password } = req.body

        const checkIfUserExist = await UserInstance.findOne({where: {email}})
        if(checkIfUserExist){
            return res.status(400).json({
                message: 'User with email already exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 8)

        console.log("PASSWORD", hashedPassword)
        const newUserRecord = await UserInstance.create({
            id,
            ...req.body,
            password: hashedPassword
        })
        
        return res.status(201).json({
            message: 'User successfully created',
            newUserRecord
        })
        
    } catch (err) {
        console.log("ERROR", err)
        res.status(500).json({
            message: 'failed to create user',
            err
        })
    }
}


export async function getAllUsers(req: Request, res: Response, next: NextFunction){
    try{
        const userRecord = await UserInstance.findAndCountAll()

        res.status(200).json({
            message: 'Successfully fetched all Users',
            count: userRecord.count,
            record: userRecord.rows
        })

    } catch (err){
        res.status(500).json({
            message: 'failed to get users',
            err
        })
    }
}

export async function getSingleUser(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params

        const userRecord = await UserInstance.findOne({ where: { id }})

        if(!userRecord){
            return res.status(400).json({
                message: `User with id: ${id} not found`
            })
        }

        return res.status(200).json({
            message: `User with id: ${id} successfully fetched`,
            userRecord
        })
        
    } catch (err){
        res.status(500).json({
            message: `failed to user`,
            err
        })
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params

        const userRecord = await UserInstance.findOne({ where: { id }})

        if(!userRecord){
            return res.status(400).json({
                message: `User with id: ${id} not found`
            })
        }

        const newUserRecord = {
            firstname: req.body?.firstname,
            lastname: req.body?.lastname,
            email: req.body?.email,
            password: req.body?.password
        }

        const updatedRecord = await userRecord.update(newUserRecord)

        return res.status(200).json({
            message: `User with id: ${id} successfully updated`,
            updatedRecord
        })
        
    } catch (err){
        res.status(500).json({
            message: `failed to update user record`,
            err
        })
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params

        const userRecord = await UserInstance.findOne({ where: { id }})

        if(!userRecord){
            return res.status(400).json({
                message: `Book with id: ${id} not found`
            })
        }

        const deletedRecord = await userRecord.destroy()

        return res.status(200).json({
            message: `User with id: ${id} successfully deleted`,
            deletedRecord
        })
        
    } catch (err){
        res.status(500).json({
            message: `failed to delete book`,
            err
        })
    }
}


export async function loginUser(req: Request, res: Response, next: NextFunction){
    try {
        const { email, password } = req.body

        const User = await UserInstance.findOne({ where: {email}}) as unknown as {[key: string]: string}

        if(!User){
            return res.status(401).json({message: 'User does not exist'})
        }
        
        const { id } = User
        const token = generateAccessToken({id})

        const validUser = await bcrypt.compare(password, User.password)

        if(!validUser){
            return res.status(401).json({message: 'Invalid login details'})
        }

        return res.status(200).json({ 
            message: 'Login Successful',
            token,
            User
        })
        

    } catch (err) {
        res.status(500).json({
            message: `LOGIN ERROR:\n ${err}`,
            err
        })
    }
}