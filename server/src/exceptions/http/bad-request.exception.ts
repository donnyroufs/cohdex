import { HttpException } from '../../lib'

export class BadRequestException extends HttpException {
  constructor() {
    super('bad request', 400)
  }
}
