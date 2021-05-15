import 'dotenv/config'

import { AddToContext, IAppConfig, KondahPlugin } from '@kondah/core'
import session from 'express-session'
import connectRedis from 'connect-redis'
import redis from 'redis'

export class SessionPlugin extends KondahPlugin<IAppConfig['session']> {
  public readonly name = 'session'
  private readonly _redis = redis.createClient()

  protected setup(): void | Promise<void> {
    const RedisStore = connectRedis(session)
    const store = new RedisStore({ client: this._redis })

    this.appContext.server.addGlobalMiddleware(
      session({
        ...this.config,
        store,
      })
    )
  }

  @AddToContext()
  getRedis() {
    return this._redis
  }
}
