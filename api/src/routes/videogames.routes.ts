import { Router } from 'express';
import { videogamesController } from '../controllers';

const router = Router();

//$ GET
router.get('/', videogamesController.getVideogames);
router.get('/:idVideogame', videogamesController.getVideogameById);

//$ POST
router.post('/', videogamesController.addVideogame);


export default router;
