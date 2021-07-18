import { HttpContext } from '@kondah/http-context'
import { Controller, Post } from '@kondah/http-controller'

@Controller('/hooks')
export class HooksController {
  @Post('/assets')
  syncAssets(ctx: HttpContext) {
    // TODO: Implement: Hook is working
    // ctx.logger.info(JSON.stringify(ctx.req.body), 'CLOUDINARY WEB HOOK')
  }
}
