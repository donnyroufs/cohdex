export class HttpException extends Error {
  constructor(message: string, public readonly code: number) {
    super(message || 'Something went wrong in the http layer')
  }
}
