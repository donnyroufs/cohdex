import { HttpContext } from '@kondah/http-context'
import { Controller, Get } from '@kondah/http-controller'

@Controller()
export class AuthController {
  @Get('/')
  index(httpContext: HttpContext) {
    httpContext.res.send('hello from kondah!')
  }
}
