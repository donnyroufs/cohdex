export class DTO<T> {
  constructor(props: T) {
    Object.assign(this, props)
  }
}
