import { DomainException } from '../../lib'

export class IsNotOwnerException extends DomainException {
  constructor() {
    super('You are not the owner of the given resource.')
  }
}
