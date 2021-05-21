import { Request, Response, NextFunction } from 'express'
import { validateOrReject } from 'class-validator'
import { IValidationError } from '../../types'
import { InputValidationException } from '../exceptions/input-validation.exception'

// TODO: Move to kondah plugin
export function validateBody(dto: new (args: any) => any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Define DTO for input validation errors
    const data = new dto({ ...req.body, userId: req.user!.id })

    await validateOrReject(data, {
      validationError: {
        target: false,
      },
    }).catch((err) => {
      throw new InputValidationException(err)
    })

    // TODO: Kondah expose types!
    // @ts-expect-error http-context does not expose this yet in middleware
    req.kondah.httpContext.data = data

    return next()
  }
}
