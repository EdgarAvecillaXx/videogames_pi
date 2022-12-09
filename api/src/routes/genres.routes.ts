import { Router } from 'express';
import { genresController } from '../controllers';
import { Genre } from '../db';

const router = Router();
const controller = new genresController(Genre);
router.get('/', controller.getGenres);

export default router;
