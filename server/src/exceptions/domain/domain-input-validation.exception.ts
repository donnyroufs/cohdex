import { ValidationError } from 'class-validator'
import { DomainException } from '../../lib'

export class DomainInputValidationException extends DomainException {
  constructor(public readonly detail: ValidationError[]) {
    super('User input failed')
  }
}
