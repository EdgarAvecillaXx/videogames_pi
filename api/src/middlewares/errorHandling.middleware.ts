//* Types
import { NextFunction, Request, Response } from 'express';
import { Error } from 'types';
// * Dependencies
import utils from 'utils';

export default (err: Error | any, req: Request, res: Response, next: NextFunction) => {
  if ([err.status, err.service, err.type].includes(undefined)) err = utils.ErrorHandler(err, 500, 'Express');
  console.error(err);
  const { error, service, type, status, message } = err;
  res.status(status).send({ error, message, service, type });
};
