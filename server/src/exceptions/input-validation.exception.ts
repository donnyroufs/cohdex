import { ValidationError } from 'class-validator'
import { BadRequestException } from './bad-request.exception'

export class InputValidationException extends BadRequestException {
  constructor(public errors: ValidationError[]) {
    super()
    this.errors = errors
  }
}
