import { Request, Response, NextFunction } from 'express'
import { NotAuthenticatedException } from '../exceptions'

export function isAuthGuard(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    throw new NotAuthenticatedException()
  }

  return next()
}
