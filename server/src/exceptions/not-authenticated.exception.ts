import { HttpException } from '../lib'

export class NotAuthenticatedException extends HttpException(
  'not authenticated',
  401
) {}
