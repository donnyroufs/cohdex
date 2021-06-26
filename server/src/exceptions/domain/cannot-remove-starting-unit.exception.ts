import { DomainException } from '../../lib'

export class CannotRemoveStartingUnitException extends DomainException {
  constructor() {
    super(
      'the unit you are trying to remove is a starting unit, therefore you cannot remove it.'
    )
  }
}
