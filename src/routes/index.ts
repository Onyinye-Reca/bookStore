import express, {Request, Response, NextFunction} from 'express';
import { createBooks, deleteBooks, getAllBooks, getSingleBooks, updateBook } from '../controller/booksController';
import { validate } from '../middleware/validator';
import { createBookValidator, updateBookValidator } from '../utility/utils';
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/create', validate(createBookValidator), createBooks);
router.get('/getAll', getAllBooks);
router.get('/getOne/:id', getSingleBooks);
router.patch('/update/:id', validate(updateBookValidator), updateBook);
router.delete('/delete/:id', deleteBooks);


router.get('/', getAllBooks);

export default router;
