import { Request, Response, NextFunction } from 'express'
import { validateOrReject } from 'class-validator'
import { IValidationError } from '../../types'

// TODO: Move to kondah plugin
export function validateBody(dto: new (args: any) => any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Kondah should catch this.
    // Define DTO for input validation errors
    const data = new dto({ ...req.body, userId: req.user!.id })

    try {
      await validateOrReject(data, {
        validationError: {
          target: false,
        },
      })
    } catch (err) {
      // TODO: Fix Kondah and then throw exception and handle on top level
      return res.status(400).json({
        errors: err.map((e: IValidationError) => ({
          property: e.property,
          messages: e.constraints,
        })),
      })
    }

    // TODO: Kondah!
    // @ts-expect-error http-context does not expose this yet in middleware
    req.kondah.httpContext.data = data

    return next()
  }
}
