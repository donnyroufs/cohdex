import { AppContext, Energizor, Kondah } from '@kondah/core'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import path from 'path'
// import redis from 'redis'
// import connectRedis from 'connect-redis'
import { milliseconds } from 'date-fns'
import { Strategy as SteamStrategy } from 'passport-steam'
import passport from 'passport'

import { SteamProfile, DoneFn, IGameDataService } from './types'
import { PrismaService } from './services/prisma.service'
import { StrategyRepository } from './repositories/strategy.repository'
import { StrategyService } from './services/strategy.service'
import { UserService } from './services/user.service'
import { UserRepository } from './repositories/user.repository'
import { CreateUserDto } from './dtos/create-user.dto'
import { InputValidationException } from './exceptions/http/input-validation.exception'
import { BaseHttpResponse } from './lib/base-http-response'
import { DomainInputValidationException } from './exceptions/domain/domain-input-validation.exception'
import { GameDataService } from './services/game-data.service'
import { DITypes } from './di-types'
import { errorCodeToHttpStatus } from './lib'

export const API_VERSION = 1

export class Application extends Kondah {
  protected async configureServices(services: Energizor): Promise<void> {
    services.setDefaultScope('singleton')

    services.register(PrismaService)

    services.register(UserRepository)
    services.register(UserService)

    services.register(StrategyRepository)
    services.register(StrategyService)

    services.register<IGameDataService>(DITypes.GameDataService, {
      asClass: GameDataService,
    })
  }

  protected async setup({ server, addControllers, energizor }: AppContext) {
    const prisma = energizor.get(PrismaService)

    // const RedisStore = connectRedis(session)
    // const store = new RedisStore({ client: redis.createClient() })

    server.addMiddleware(
      '/public',
      express.static(path.join(__dirname, '../public'))
    )

    if (process.env.NODE_ENV !== 'test') {
      server.addGlobalMiddleware(morgan('dev'))
    }

    server.addGlobalMiddleware(
      cookieParser(),
      express.json(),
      session({
        secret: process.env.SESSION_SECRET,
        name: 'sid',
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
          maxAge: milliseconds({ days: 7 }),
          secure: process.env.NODE_ENV === 'prod',
          httpOnly: true,
          sameSite: 'strict',
        },
      }),
      cors({
        origin: process.env.ORIGIN,
        credentials: true,
      }),
      passport.initialize(),
      passport.session()
    )

    passport.serializeUser(function (user, done) {
      done(null, user)
    })

    passport.deserializeUser(function (obj: any, done) {
      done(null, obj)
    })

    const userService = energizor.get(UserService)

    passport.use(
      new SteamStrategy(
        {
          returnURL: process.env.CALLBACK_URI,
          realm: process.env.BASE_URI,
          apiKey: process.env.API_KEY_STEAM,
        },
        async (_: string, profile: SteamProfile, done: DoneFn) => {
          const user = await userService.createOrUpdate(
            new CreateUserDto({
              avatar: profile._json.avatarfull,
              profileUrl: profile._json.profileurl,
              steamId: profile._json.steamid,
            }).validateAndThrow()
          )

          done(null, user)
        }
      )
    )

    await addControllers('/api/v' + API_VERSION)

    server.handleGlobalExceptions(
      (err: Error & { code?: number }, req, res, next) => {
        const code = errorCodeToHttpStatus(err?.code)

        let response = new BaseHttpResponse(
          undefined,
          err.message || 'Something unknown happend'
        )

        if (
          err instanceof InputValidationException ||
          err instanceof DomainInputValidationException
        ) {
          const error = err.detail[0]
          response = new BaseHttpResponse<string>(
            undefined,
            error.constraints != null ? Object.values(error.constraints)[0] : ''
          )
        }

        return res.status(code).json(response)
      }
    )

    await energizor.get<IGameDataService>(DITypes.GameDataService).syncMaps()
    await prisma.connect()
    server.run(process.env.PORT || 5000)
  }
}
