import express from 'express';
import userControllers from '../controllers/user';

const router = express.Router();

router.post('/auth/signup', userControllers.signUp);
export default router;
