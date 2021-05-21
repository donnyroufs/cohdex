import { Exception } from '../lib'

export class StrategyAlreadyExistsException extends Exception(
  'The strategy you are trying to create already exists'
) {}
