import { DomainException } from '../../lib'

export class StrategyAlreadyExistsException extends DomainException {
  constructor() {
    super('The strategy you are trying to create already exists')
  }
}
