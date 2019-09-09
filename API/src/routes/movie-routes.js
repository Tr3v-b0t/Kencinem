import express from 'express';
import movieControllers from '../controllers/movie';

const router = express.Router();

router.get('/movie', movieControllers.getAll);
router.get('/movie/:id', movieControllers.getOne);
export default router;
