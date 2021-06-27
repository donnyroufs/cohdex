import { DomainException } from '../../lib'

export class UnknownStrategyException extends DomainException {
  constructor() {
    super('strategy is not known')
  }
}
