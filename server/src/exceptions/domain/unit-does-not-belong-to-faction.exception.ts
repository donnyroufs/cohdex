import { DomainException } from '../../lib'

export class UnitDoesNotBelongToFactionException extends DomainException {
  constructor() {
    super('the provided faction does not have such unit')
  }
}
