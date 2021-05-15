import { HttpContext } from '@kondah/http-context'
import { Controller, Delete, Get, Middleware } from '@kondah/http-controller'

import { Request, Response } from 'express'
import passport from 'passport'

@Controller('/auth')
export class AuthController {
  @Get('/login')
  @Middleware([passport.authenticate('steam')])
  login(ctx: HttpContext) {}

  @Delete('/logout')
  logout(ctx: HttpContext) {
    ctx.req.logout()
    ctx.res.sendStatus(204)
  }

  @Get('/callback')
  @Middleware([
    passport.authenticate('steam'),
    (req: Request, res: Response) => res.redirect(process.env.REDIRECT_URI),
  ])
  callback(ctx: HttpContext) {}
}
