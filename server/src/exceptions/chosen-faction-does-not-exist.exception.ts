import { Exception } from '../lib'

export class ChosenFactionDoesNotExistException extends Exception(
  'Chosen faction does not exist'
) {}
