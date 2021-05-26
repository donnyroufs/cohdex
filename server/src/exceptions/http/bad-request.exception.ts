import { HttpException } from '../../lib'

export class BadRequestException extends HttpException {
  constructor(message = 'bad request') {
    super(message, 400)
  }
}
