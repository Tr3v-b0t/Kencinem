import express from 'express';
import userControllers from '../controllers/user';

const router = express.Router();

router.get('/auth/signup', userControllers.signUp);
export default router;
