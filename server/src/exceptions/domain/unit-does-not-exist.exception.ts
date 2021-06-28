import { DomainException } from '../../lib'

export class UnitDoesNotExistException extends DomainException {
  constructor() {
    super('the provided unit does not exist in our database')
  }
}
