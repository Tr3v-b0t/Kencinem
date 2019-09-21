import express from 'express';
import userControllers from '../controllers/user';
import Validate from '../middleware/validate';
import Reset from '../middleware/resetPassword';

const router = express.Router();

router.post('/auth/signup',Validate.user, userControllers.signUp);
router.get('/auth/verify',userControllers.verifyAccount);
router.post('/auth/login',Validate.login, userControllers.login);
router.patch('/auth/reset', Reset, userControllers.reset);
router.get('/auth/redirect', userControllers.redirect);

export default router;
