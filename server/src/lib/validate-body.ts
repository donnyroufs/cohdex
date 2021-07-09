import { Request } from 'express'
import { InputValidationException } from '../exceptions/http/input-validation.exception'
import { Constr, IMiddleware } from '@kondah/http-controller'
import { HttpContext } from '@kondah/http-context'
import { DTO } from './DTO'
import { ValidationError } from 'class-validator'

export type NewableDTO<T> = Constr<DTO<T>>

export class ValidateBody implements IMiddleware {
  constructor(
    private readonly _dto: NewableDTO<any>,
    private readonly _withParams = false
  ) {}

  execute({ req }: HttpContext) {
    const [data, errors] = new this._dto({
      ...req.body,
      userId: req.user!.id,
      ...this.addParamsIfRequested(req),
    }).validate()

    if (errors.length > 0) {
      throw new InputValidationException(errors as ValidationError[])
    }

    req.kondah.httpContext.data = data

    return true
  }

  private addParamsIfRequested(req: Request) {
    if (!this._withParams) {
      return {}
    }

    return Object.entries(req.params).reduce(
      (acc: Record<string, any>, [k, v]) => {
        acc[k] = parseInt(v)

        return acc
      },
      {}
    )
  }

  static with(dto: NewableDTO<any>, withParams = false) {
    return new ValidateBody(dto, withParams)
  }
}

export class ParamsToInt implements IMiddleware {
  execute({ req }: HttpContext<any>): boolean | Promise<boolean> {
    // @ts-ignore
    req.params.id = Number(req.params.id)

    return true
  }
}
