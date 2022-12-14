import { Router } from 'express';
import { genresController } from '../controllers';

const router = Router();
router.get('/', genresController.getGenres);

export default router;
