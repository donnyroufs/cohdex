import 'dotenv/config'

import { Logger } from '@kondah/core'
import { HttpControllerPlugin } from '@kondah/http-controller'
import { HttpContextPlugin } from '@kondah/http-context'

import path from 'path'

import { Application } from './application'

console.clear()

new Application({
  logger: new Logger('border'),
  plugins: [HttpControllerPlugin, HttpContextPlugin],
  config: {
    'http-controller': {
      controllersPath: [path.join(__dirname, '../src/controllers')],
      catchExceptions: true,
    },
  },
})
