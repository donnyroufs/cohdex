import { Exception } from './exception'

export class InvalidTeamsException extends Exception(
  'Should have atleast one allies faction and one axis faction'
) {}
