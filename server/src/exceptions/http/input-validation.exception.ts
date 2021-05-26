import { ValidationError } from 'class-validator'
import { HttpException } from '../../lib'

export class InputValidationException extends HttpException {
  constructor(public readonly detail: ValidationError[]) {
    super('User input failed', 400)
  }
}
