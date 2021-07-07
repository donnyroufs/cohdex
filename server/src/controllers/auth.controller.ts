import { HttpContext } from '@kondah/http-context'
import { Controller, Delete, Get, Middleware } from '@kondah/http-controller'

import { IGetMeResponseDto, IUser } from '@cohdex/shared'
import { IsAuthGuard } from '../guards/is-auth.guard'
import { BaseHttpResponse } from '../lib/base-http-response'
import { PassportAdapter } from '../adapters/passport.adapter'

@Controller('/auth')
export class AuthController {
  @Get('/login')
  @Middleware([PassportAdapter.with('steam')])
  login(ctx: HttpContext) {}

  @Delete('/logout')
  logout(ctx: HttpContext) {
    ctx.req.logout()
    ctx.res.sendStatus(204)
  }

  @Get('/callback')
  @Middleware([PassportAdapter.toCallback('steam')])
  callback(ctx: HttpContext) {}

  @Get('/me')
  @Middleware([IsAuthGuard])
  async me({ req, res }: HttpContext) {
    res.json(
      new BaseHttpResponse<Partial<IGetMeResponseDto>>({
        user: req.user as IUser,
      })
    )
  }
}
