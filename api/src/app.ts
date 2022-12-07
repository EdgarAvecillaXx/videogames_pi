import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import middleware from './middleware';
import { Error } from './types';
import { Genre, Videogame } from './db';

export const server = express();

//(server.name as String) = 'API';
Object.defineProperty(server, 'name', { value: 'API' });

//? middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(middleware.headersConfig);

//$routes
server.use('/', routes);
server.get('/', async (req, res) => {
  await Genre.create({
    id: 1,
    name: 'ejemplo',
  });
  res.send('se creo el genero');
});

// Error catching endware.
server.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
