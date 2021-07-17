import { DomainException } from '../../lib'

export class StrategyIsNotPublicException extends DomainException {
  constructor() {
    super('Strategy is not public and you are not the owner')
  }
}
