import { Router } from 'express';
import genresRoutes from './genres.routes';
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genres', genresRoutes);

export default router;
