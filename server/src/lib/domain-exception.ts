export class DomainException extends Error {
  constructor(message: string) {
    super(message || 'Something went wrong in the domain layer')
  }
}
