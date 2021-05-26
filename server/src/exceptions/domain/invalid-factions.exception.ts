import { DomainException } from '../../lib'

export class InvalidFactionsException extends DomainException {
  constructor() {
    super('Invalid factions')
  }
}
