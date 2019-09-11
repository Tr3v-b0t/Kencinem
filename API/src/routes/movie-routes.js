import express from 'express';
import movieControllers from '../controllers/movie';
import Filter from '../middleware/filter';

const router = express.Router();

router.get('/movie', Filter, movieControllers.getAll);
router.get('/movie/:id', movieControllers.getOne);
export default router;
