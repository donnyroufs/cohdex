import { DomainException } from '../../lib'

export class DisplayNameExistsException extends DomainException {
  constructor() {
    super('The given display name already exists.')
  }
}
