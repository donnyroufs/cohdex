import { AppContext, Energizor, Kondah } from '@kondah/core'
import express from 'express'
import cors from 'cors'
import csurf from 'csurf'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import { milliseconds } from 'date-fns'
import { Strategy as SteamStrategy } from 'passport-steam'
import passport from 'passport'

import { SteamProfile } from './types'
import { PrismaService } from './services/prisma.service'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {
    services.register(PrismaService)
  }

  protected async setup({ server, addControllers, energizor }: AppContext) {
    const prisma = energizor.get(PrismaService)

    server.addGlobalMiddleware(morgan('short'), cookieParser(), express.json())
    server.addGlobalMiddleware(
      cors({
        origin: process.env.ORIGIN,
        credentials: true,
      })
    )

    const RedisStore = connectRedis(session)
    const store = new RedisStore({ client: redis.createClient() })

    server.addGlobalMiddleware(
      session({
        secret: process.env.SESSION_SECRET,
        name: 'sid',
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
          maxAge: milliseconds({ days: 7 }),
          secure: process.env.NODE_ENV === 'prod',
          httpOnly: true,
          sameSite: true,
        },
      })
    )
    passport.serializeUser(function (user, done) {
      done(null, user)
    })

    passport.deserializeUser(function (obj: any, done) {
      done(null, obj)
    })

    await prisma.connect()

    passport.use(
      new SteamStrategy(
        {
          returnURL: process.env.CALLBACK_URI,
          realm: process.env.BASE_URI,
          apiKey: process.env.API_KEY_STEAM,
        },
        async (identifier: string, profile: SteamProfile, done: any) => {
          const user = await prisma.client.user.upsert({
            where: {
              steamId: profile._json.steamid,
            },
            create: {
              avatar: profile._json.avatarfull,
              profileUrl: profile._json.profileurl,
              steamId: profile._json.steamid,
            },
            update: {
              profileUrl: profile._json.profileurl,
            },
            select: {
              avatar: true,
              profileUrl: true,
              steamId: true,
            },
          })

          done(null, user)
        }
      )
    )

    server.addGlobalMiddleware(passport.initialize())
    server.addGlobalMiddleware(passport.session())

    const csrf = csurf({
      cookie: {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'prod',
      },
    })

    server.addGlobalMiddleware(csrf, (req, res, next) => {
      const csrfToken = req.csrfToken()
      console.log(req.cookies)
      res.cookie('xsrf-token', csrfToken)
      next()
    })

    server.addGlobalMiddleware(csrf)

    await addControllers('/api/v1')

    server.run(5000)
  }
}
