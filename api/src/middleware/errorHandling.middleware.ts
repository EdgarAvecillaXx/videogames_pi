import { NextFunction, Request, Response } from 'express';
import { Error } from '../types';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { error, status, message, service, type } = err;
  console.error(err);
  res.status(status).send({ error, message, service, type });
};
