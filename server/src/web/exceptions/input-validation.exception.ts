import { IValidationError } from '../../types'
import { BadRequestException } from './bad-request.exception'

export class InputValidationException extends BadRequestException {
  constructor(public errors: IValidationError[]) {
    super()
    this.errors = errors
  }
}
