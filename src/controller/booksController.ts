import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import Book from "../model/booksModel";


const secret = process.env.JWT_SECRET as string;

interface book {
  docTitle: string,
  Title: string,
  imageURL: string,
  Author: string
  pageCount: string,
  Genre: string,
  Publisher: string,
  bookId: string
}

export async function createBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const titleCheck = req.body.title.toUpperCase();
    const checkUniqueRecord = await Book.findOne({ title: titleCheck });
  

    if (checkUniqueRecord) {
      return res.status(400).json({
        message: "Book already exists",
      });
    }

    const record = await Book.create({
      id,
      userId: req._id,
      ...req.body,
      title: req.body.title.toUpperCase(),
    });
    
    return res.status(201).json({
      message: "Book record successfully created",
      record,
    });
     //return res.redirect("/dashboard")
    
  } catch (err) {
    return res.status(500).json({
      message: "failed to create books",
      err,
    });
  }
}

export async function getAllBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page: number = +(req.query.page || 1)
const limit: number = +(req.query.limit || 50)
const skip= (page - 1) * limit;
let query = Book.find({}).sort({createdAt: -1});
query = query.skip(skip).limit(limit)

let numberOfDocument = await Book.countDocuments() 

if (req.query.page) {
  if (skip > numberOfDocument) {
    return res.status(400).json({
      message: "Page does not exist"
    })
  }
}
    const books = await query

      return res.status(200).json({
          message: "Successfully fetched all Books",
          count: books.length,
          books
        });
     //return res.render("index", { books: books });
  } catch (err) {
    return res.status(500).json({
      message: "failed to get books",
      err,
    });
  }
}
export async function updateSingleBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: value } = req.params;
    // const value = req.params.id

    const book = await Book.findOne({ _id: value } );

    if (!book) {
      return res.status(400).json({
        message: `Book with id: ${value} not found`,
      });
    }

    res.render("add-edit", {
      book: book,
      editing: true,
      docTitle: "update"
    });
  } catch (err) {
    res.status(500).json({
      message: `failed to book`,
      err,
    });
  }
}

export async function getSingleBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res.status(400).json({
        message: `Book with id: ${id} not found`,
      });
    }

    // return res.status(200).json({
    //   message: `Book with id: ${id} successfully fetched`,
    //   book,
    // });
    res.render("detail", {
      book,
    });
  } catch (err) {
    res.status(500).json({
      message: `failed to book`,
      err,
    });
  }
}

export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res.status(400).json({
        message: `Book with id: ${id} not found`,
      });
    }

    const newBook = {
      title: req.body?.title,
      author: req.body?.author,
      datePublished: req.body?.datePublished,
      description: req.body?.description,
      pageCount: req.body?.pageCount,
      genre: req.body?.genre,
      bookId: req.body?.bookId,
      publisher: req.body?.publisher,
    };

    const updatedBook = await Book.findByIdAndUpdate({_id: id}, newBook, {new: true});

    // return res.status(200).json({
    //   message: `Book with id: ${id} successfully updated`,
    //   updatedBook,
    // });

  
     return res.redirect("/books/dashboard")
  } catch (err) {
    return res.status(500).json({
      message: `failed to update book`,
      err,
    });
  }
}

export async function deleteBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const { id } = req.params;
    const id = req.body.bookId;
    console.log(id);

    const book = await Book.findById(id);

    if (!book) {
      return res.status(400).json({
        message: `Book with id: ${id} not found`,
      });
    }

    await Book.findByIdAndDelete(id)
    // return res.status(200).json({
    //   message: `Book with id: ${id} successfully deleted`,
    
    // });
    res.redirect("/books/dashboard");
  } catch (err) {
    return res.status(500).json({
      message: `failed to delete book`,
      err,
    });
  }
}

export async function getBooksByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    
    // const authorization: any = req.headers.authorization;
    // const token = authorization.split(" ")[1];
    // console.log(token);

    // const decodedToken: any = jwt.verify(token, secret);
    // console.log(decodedToken);

    // const { id } = decodedToken;

    const userId = req._id
    console.log(userId);

    const userBooks = await Book.find({ userId: userId });
    console.log(userBooks);

    return res.status(200).json({
      message: `Books with userId: ${userId} successfully fetched`,
      userBooks,
    });

    // const getSpecificUserBooks = books.filter(el => id);
    // console.log(getSpecificUserBooks);
  } catch (error) {}
}
