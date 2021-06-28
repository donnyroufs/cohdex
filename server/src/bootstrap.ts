import 'dotenv/config'

import { Logger } from '@kondah/core'
import { HttpControllerPlugin } from '@kondah/http-controller'

import { Application } from './application'
import { AppConfig } from './app.config'

console.clear()

new Application({
  logger: new Logger('border'),
  plugins: [HttpControllerPlugin],
  config: AppConfig,
})
