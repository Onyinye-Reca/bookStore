import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { BooksInstance } from '../model/booksModel'


export async function createBooks(req: Request, res: Response, next: NextFunction){
    const id = uuidv4()
    try{
        const titleCheck = req.body.title.toUpperCase()
        const checkUniqueRecord = await BooksInstance.findOne({ where: { title: titleCheck }})

        if(checkUniqueRecord){
            return res.status(400).json({
                message: 'Book already exists'
            })
        }

        const record = await BooksInstance.create({
            id,
            ...req.body,
            title: req.body.title.toUpperCase(),
        })
        return res.status(201).json({
            message: 'Book record successfully created', 
            record
        })
    } catch (err) {
        return res.status(500).json({
            message: 'failed to create books',
            err
        })
    }
}

export async function getAllBooks(req: Request, res: Response, next: NextFunction){
    try{
        const bookRecord = await BooksInstance.findAndCountAll()

        // return res.status(200).json({
        //     message: 'Successfully fetched all Books',
        //     count: bookRecord.count,
        //     record: bookRecord.rows
        // })
        return res.render('index', {books: bookRecord.rows})

    } catch (err){
        return res.status(500).json({
            message: 'failed to get books',
            err
        })
    }
}

export async function getSingleBooks(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params

        const bookRecord = await BooksInstance.findOne({ where: { id }})

        if(!bookRecord){
            return res.status(400).json({
                message: `Book with id: ${id} not found`
            })
        }

        return res.status(200).json({
            message: `Book with id: ${id} successfully fetched`,
            bookRecord
        })
        
    } catch (err){
        res.status(500).json({
            message: `failed to book`,
            err
        })
    }
}

export async function updateBook(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params

        const bookRecord = await BooksInstance.findOne({ where: { id }})

        if(!bookRecord){
            return res.status(400).json({
                message: `Book with id: ${id} not found`
            })
        }

        const newBookRecord = {
            title: req.body?.title,
            author: req.body?.author,
            datePublished: req.body?.datePublished,
            description: req.body?.description,
            pageCount: req.body?.pageCount,
            genre: req.body?.genre,
            bookId: req.body?.bookId,
            publisher: req.body?.publisher
        }

        const updatedRecord = await bookRecord.update(newBookRecord)

        return res.status(200).json({
            message: `Book with id: ${id} successfully updated`,
            updatedRecord
        })
        
    } catch (err){
        res.status(500).json({
            message: `failed to book`,
            err
        })
    }
}

export async function deleteBooks(req: Request, res: Response, next: NextFunction){
    try{
        const {id} = req.params

        const bookRecord = await BooksInstance.findOne({ where: { id }})

        if(!bookRecord){
            return res.status(400).json({
                message: `Book with id: ${id} not found`
            })
        }

        const deletedRecord = await bookRecord.destroy()

        return res.status(200).json({
            message: `Book with id: ${id} successfully deleted`,
            deletedRecord
        })
        
    } catch (err){
        res.status(500).json({
            message: `failed to delete book`,
            err
        })
    }
}