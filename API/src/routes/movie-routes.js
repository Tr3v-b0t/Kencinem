import express from 'express';
import movieControllers from '../controllers/movie';
import checkDuplicates from '../middleware/duplicate-movies';
import Filter from '../middleware/filter';
import Validate from '../middleware/validate';
import upload from '../middleware/upload';

const router = express.Router();

router.get('/movie', Filter, movieControllers.getAll);
router.get('/movie/:id', movieControllers.getOne);
router.post(
    '/movie',
    upload,
    Validate.movie,
    checkDuplicates,
    movieControllers.createMovie
);
export default router;
