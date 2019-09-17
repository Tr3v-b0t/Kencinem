import express from 'express';
import userControllers from '../controllers/user';
import Validate from '../middleware/validate'

const router = express.Router();

router.post('/auth/signup',Validate.user, userControllers.signUp);
router.get('/auth/verify',userControllers.verifyAccount)
export default router;
