import { Router } from 'express';
import genresRoutes from './genres.routes';
import videogamesRoutes from './videogames.routes';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genres', genresRoutes);
router.use('/videogames', videogamesRoutes);

export default router;
