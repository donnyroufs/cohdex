import { DomainException } from '../../lib'

export class ChosenFactionDoesNotExistException extends DomainException {
  constructor() {
    super('Chosen faction does not exist')
  }
}
