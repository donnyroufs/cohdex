import { DomainException } from '../../lib'

export class InvalidTeamsException extends DomainException {
  constructor() {
    super('Should have atleast on alliedFaction and one axis faction')
  }
}
