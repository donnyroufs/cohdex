import { IAppConfig, KondahPlugin } from '@kondah/core'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import express from 'express'

export class RestApiPlugin extends KondahPlugin<IAppConfig['rest-api']> {
  name = 'rest-api'

  protected setup(): void | Promise<void> {
    this.appContext.server.addGlobalMiddleware(
      morgan(this.config.morgan),
      cookieParser(),
      express.json()
    )
  }
}
