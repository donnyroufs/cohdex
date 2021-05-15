import { AppContext, Energizor, Kondah } from '@kondah/core'

import morgan from 'morgan'

import session from 'express-session'
import cors from 'cors'

import redis from 'redis'
import connectRedis from 'connect-redis'
import uuid from 'uuid'

import { milliseconds } from 'date-fns'
import passport from 'passport'

import { Strategy as SteamStrategy } from 'passport-steam'
import { SteamProfile } from './types'
import { PrismaService } from './prisma.service'

export class Application extends Kondah {
  private readonly _isProd = process.env.NODE_ENV === 'prod'

  protected async configureServices(services: Energizor) {
    services.register(PrismaService)
  }

  protected async $afterInstallPlugins(ctx: AppContext) {}

  protected async setup(ctx: AppContext) {
    // TODO: Should be plugin
    const prisma = ctx.energizor.get(PrismaService)
    await prisma.connect()

    passport.serializeUser(function (user, done) {
      done(null, user)
    })

    passport.deserializeUser(function (obj: any, done) {
      done(null, obj)
    })

    passport.use(
      new SteamStrategy(
        {
          returnURL: 'http://localhost:5000/auth/callback',
          realm: 'http://localhost:5000/',
          apiKey: process.env.API_KEY_STEAM,
        },
        async (identifier: string, profile: SteamProfile, done: any) => {
          await prisma.user.upsert({
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
          })
          done(null, profile)
        }
      )
    )

    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    const corsOptions = {
      origin: process.env.ORIGIN,
      credentials: true,
    }

    ctx.server.addGlobalMiddleware(cors(corsOptions))

    ctx.server.addGlobalMiddleware(
      session({
        secret: process.env.SESSION_SECRET,
        name: 'sid',
        // TODO: Revisit both options
        resave: true,
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: true,
        cookie: {
          maxAge: milliseconds({ days: 7 }),
          secure: this._isProd,
          httpOnly: true,
          sameSite: true,
        },
      })
    )

    ctx.server.addGlobalMiddleware(morgan('dev'))

    ctx.server.addGlobalMiddleware(passport.initialize())
    ctx.server.addGlobalMiddleware(passport.session())

    // ctx.server.addGlobalMiddleware(
    //   session({
    //     genid: () => uuid.v4(),
    //     name: 'sid',
    //     store: new RedisStore({ client: redisClient }),
    //     secret: process.env.SESSION_SECRET,
    //     resave: false,
    //     saveUninitialized: false,
    //     cookie: {
    //       maxAge: milliseconds({ days: 1 }),
    //       secure: this._isProd,
    //     },
    //   })
    // )

    await ctx.addControllers()
    ctx.server.run(5000)
  }
}
