import { HttpContext } from '@kondah/http-context'
import { IMiddleware } from '@kondah/http-controller'
import { NotAuthenticatedException } from '../exceptions'

export class IsAuthGuard implements IMiddleware {
  execute({ req }: HttpContext): boolean | Promise<boolean> {
    if (!req.isAuthenticated()) {
      throw new NotAuthenticatedException()
    }

    return true
  }
}
