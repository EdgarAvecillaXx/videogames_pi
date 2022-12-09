import { Error } from '../types';

export default function ErrorHandler(
  error: any,
  service?: string,
  type?: string,
  message?: string,
  status?: number
): Error {
  const err: Error = {
    error,
    service: service || 'unknown',
    type: type || error?.name || 'default error',
    message: message || 'unknown',
    status: status || 500,
  };
  return err;
}
