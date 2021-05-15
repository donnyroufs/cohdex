import csurf from 'csurf'
import { KondahPlugin } from '@kondah/core'
import { RestApiPlugin } from './rest-api.plugin'

export class CsrfPlugin extends KondahPlugin {
  name = 'csrf'
  dependencies = [RestApiPlugin]

  protected setup(): void | Promise<void> {
    const csrf = csurf({
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
      },
    })

    this.appContext.server.addGlobalMiddleware(csrf, (req, res, next) => {
      const csrfToken = req.csrfToken()
      res.cookie('csurf', csrfToken)
      next()
    })
  }
}
