import { Request, Response, NextFunction } from 'express'
import { validateSync } from 'class-validator'
import { InputValidationException } from '../exceptions/http/input-validation.exception'
import { classToPlain } from 'class-transformer'

// TODO: Move to kondah plugin
export function validateBody(dto: new (args: any) => any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const [data, errors] = new dto({
      ...req.body,
      userId: req.user!.id,
    }).validate()

    if (errors.length > 0) {
      throw new InputValidationException(errors)
    }

    // TODO: Kondah expose types!
    // @ts-expect-error http-context does not expose this yet in middleware
    req.kondah.httpContext.data = data

    return next()
  }
}

export function validateBodyWithParamsToInt(dto: new (args: any) => any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const [data, errors] = new dto({
      ...req.body,
      userId: req.user!.id,
      [Object.keys(req.params)[0]]: +Object.values(req.params)[0],
    }).validate()

    if (errors.length > 0) {
      throw new InputValidationException(errors)
    }

    // TODO: Kondah expose types!
    // @ts-expect-error http-context does not expose this yet in middleware
    req.kondah.httpContext.data = data

    return next()
  }
}
