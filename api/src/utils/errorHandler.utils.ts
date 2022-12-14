import { Error } from '../types';

export default function ErrorHandler(
  error: any,
  status: number = 500,
  service: string = 'unknown',
  type: string = error?.name || 'default error',
  message: string = error?.message || 'default error message'
): Error {
  const err: Error = {
    error: error.toString(),
    service,
    type,
    message,
    status,
  };
  return err;
}
