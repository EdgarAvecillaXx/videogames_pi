//* Dependencies
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import middleware from './middleware';

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

//? Error catching endware.
server.use(middleware.ErrorHandling);
