import { HttpContext } from '@kondah/http-context'
import { Controller, Post } from '@kondah/http-controller'

@Controller('/hooks')
export class HooksController {
  @Post('/assets')
  syncAssets(ctx: HttpContext) {
    ctx.logger.info(ctx.req.body, 'CLOUDINARY WEB HOOK')
  }
}
