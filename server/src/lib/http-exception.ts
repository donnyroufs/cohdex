export function HttpException(message = '', code = 500) {
  return class HttpException extends Error {
    public readonly code: number

    constructor() {
      super()
      this.code = code
      this.message = message
    }
  }
}
