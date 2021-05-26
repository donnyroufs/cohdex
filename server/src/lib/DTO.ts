import { classToPlain } from 'class-transformer'
import { validateSync } from 'class-validator'
import { DomainInputValidationException } from '../exceptions/domain/domain-input-validation.exception'

export class DTO<T> {
  constructor(props: T) {
    Object.assign(this, props)
  }

  validate() {
    const errors = validateSync(this)
    const data = classToPlain(this, {
      excludeExtraneousValues: true,
    })

    return [data, errors]
  }

  validateAndThrow() {
    const errors = validateSync(this)
    const data = classToPlain(this, {
      excludeExtraneousValues: true,
    })

    if (errors.length > 0) {
      throw new DomainInputValidationException(errors)
    }

    return data as T
  }
}
