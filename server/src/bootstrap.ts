import 'dotenv/config'

import { Logger } from '@kondah/core'
import { HttpControllerPlugin } from '@kondah/http-controller'

import path from 'path'
import { milliseconds } from 'date-fns'

import { Application } from './application'
import { PrismaPlugin } from './plugins/prisma.plugin'
import { SteamAuthPlugin } from './plugins/steam-auth.plugin'
import { CorsPlugin } from './plugins/cors.plugin'
import { CsrfPlugin } from './plugins/csrf.plugin'

console.clear()

new Application({
  logger: new Logger('border'),
  plugins: [
    HttpControllerPlugin,
    PrismaPlugin,
    SteamAuthPlugin,
    CorsPlugin,
    CsrfPlugin,
  ],
  config: {
    'http-controller': {
      controllersPath: [path.join(__dirname, '../src/controllers')],
      catchExceptions: true,
    },
    session: {
      secret: process.env.SESSION_SECRET,
      name: 'sid',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: milliseconds({ days: 7 }),
        secure: process.env.NODE_ENV === 'prod',
        httpOnly: true,
        sameSite: true,
      },
    },
    cors: {
      origin: process.env.ORIGIN,
      credentials: true,
    },
    'rest-api': {
      morgan: 'tiny',
    },
  },
})
