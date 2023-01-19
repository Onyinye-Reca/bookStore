import express, {Request, Response, NextFunction} from 'express';
import { deleteUser, getAllUsers, getSingleUser, loginUser, registerUser, updateUser } from '../controller/userController';
import { auth } from '../middleware/auth';
import { validate } from '../middleware/validator';
import { loginValidator, registerUserValidator, updateUserValidator } from '../utility/utils';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', validate(registerUserValidator), registerUser);
router.get('/getAll', getAllUsers);
router.get('/getOne/:id', auth, getSingleUser);
router.patch('/update/:id', validate(updateUserValidator), auth, updateUser);
router.delete('/delete/:id', auth, deleteUser);

router.post('/login', validate(loginValidator), loginUser);

export default router;
