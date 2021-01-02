import { Router } from 'express';
import authController from '../controllers/authController';
import Validations from '../middlewares/validations';
import checkUser from '../middlewares/checkUser';

const router = Router();

router.post('/signup', Validations.validateSignUpData, checkUser.verifyUsedEmail, authController.signUp);
router.post('/signin', Validations.validateSignInData, authController.signIn);

export default router;
