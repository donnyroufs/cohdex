import { Exception } from './exception'

export class ChosenFactionDoesNotExistException extends Exception(
  'Chosen faction does not exist'
) {}
