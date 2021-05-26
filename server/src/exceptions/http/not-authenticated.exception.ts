import { HttpException } from '../../lib'

export class NotAuthenticatedException extends HttpException {
  constructor() {
    super('not authenticated', 401)
  }
}
