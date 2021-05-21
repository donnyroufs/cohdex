export class BaseHttpResponse<T = unknown> {
  constructor(public readonly data?: T, public readonly error?: T) {}
}
