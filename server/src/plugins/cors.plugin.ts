import { IAppConfig, KondahPlugin } from '@kondah/core'
import cors from 'cors'

export class CorsPlugin extends KondahPlugin<IAppConfig['cors']> {
  name = 'cors'

  protected setup(): void | Promise<void> {
    this.appContext.server.addGlobalMiddleware(cors(this.config))
  }
}
