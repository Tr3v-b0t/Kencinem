import express from 'express';
import cinemaControllers from '../controllers/cinema';

const router = express.Router();

router.get('/cinema', cinemaControllers.getAll);
router.get('/cinema/:id', cinemaControllers.getOne);
export default router;
