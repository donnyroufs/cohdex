import { HttpException } from '../lib'

export class BadRequestException extends HttpException('bad request', 400) {
  constructor(message?: string) {
    super()

    if (message) {
      this.message = message
    }
  }
}
