import express from 'express';
import userControllers from '../controllers/user';

const router = express.Router();

router.get('/', userControllers.signUp);
export default router;
