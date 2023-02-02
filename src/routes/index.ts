import express, { Request, Response, NextFunction } from "express";
import {
  createBooks,
  deleteBooks,
  getAllBooks,
  getSingleBooks,
  updateBook,
  getBooksByUser,
  updateSingleBook,
} from "../controller/booksController";
import { auth } from "../middleware/auth";
import { validate } from "../middleware/validator";
import { createBookValidator, updateBookValidator } from "../utility/utils";
const router = express.Router();

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
const book: book = {
    docTitle: "addBook",
    Title: "book",
    imageURL: "images",
    Author: "author",
    pageCount: "pages",
    Genre: "genre",
    Publisher: "publish",
    bookId: "bookid"
  }

/* GET home page. */
router.get('/edit', function(req, res, next) {
  res.render('add-edit', {book: book, editing: false});
});

router.post("/create", validate(createBookValidator), createBooks);
router.get("/getAll", getAllBooks);
router.get("/getOne/:id", getSingleBooks);
router.post("/update/:id", validate(updateBookValidator), updateBook);

router.post("/delete/:id", deleteBooks);
router.get("/getUserBooks", auth, getBooksByUser);

router.get("/dashboard", getAllBooks);
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("signup-login");
});

router.get("/add-book", (req: Request, res: Response, next: NextFunction) => {
    res.render("add");
  });

router.get("/edit/:id", updateSingleBook)

export default router;
