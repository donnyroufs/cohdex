import { HttpContext } from '@kondah/http-context'
import { IMiddleware } from '@kondah/http-controller'
import passport from 'passport'
import { IUser } from '../../../shared/dist'
import { NotAuthenticatedException } from '../exceptions'

export class PassportAdapter implements IMiddleware {
  constructor(private readonly _strategy: string) {}

  async execute(httpContext: HttpContext) {
    await passport.authenticate(this._strategy)(
      httpContext.req,
      httpContext.res,
      httpContext.req.next
    )

    return true
  }

  static toCallback(strategy: string) {
    return new PassportCallback(strategy)
  }

  static with(strategy: string) {
    return new PassportAdapter(strategy)
  }
}

export class PassportCallback implements IMiddleware {
  constructor(private readonly _strategy: string) {}

  async execute(httpContext: HttpContext) {
    await passport.authenticate(
      this._strategy,
      async (err: any, user: IUser, info: any) => {
        if (!user) throw new NotAuthenticatedException()

        httpContext.req.login(user, (err) => {
          if (err) throw new NotAuthenticatedException()
          return httpContext.res.redirect(process.env.REDIRECT_URI)
        })
      }
    )(httpContext.req, httpContext.res, httpContext.req.next)

    return true
  }
}
