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
import { PrismaService } from './core/prisma.service'
import {
  BadRequestException,
  NotAuthenticatedException,
} from './web/exceptions'
import { StrategyRepository } from './core/strategies/strategy.repository'
import { StrategyService } from './core/strategies/strategy.service'
import { UserService } from './core/users/user.service'
import { UserRepository } from './core/users/user.repository'
import { CreateUserDto } from './core/users/dtos/create-user.dto'
import { InputValidationException } from './web/exceptions/input-validation.exception'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {
    services.setDefaultScope('singleton')

    services.register(PrismaService)

    services.register(UserRepository)
    services.register(UserService)

    services.register(StrategyRepository)
    services.register(StrategyService)
  }

  protected async setup({
    server,
    addControllers,
    energizor,
    addToHttpContext,
  }: AppContext) {
    const prisma = energizor.get(PrismaService)

    const RedisStore = connectRedis(session)
    const store = new RedisStore({ client: redis.createClient() })

    const csrf = csurf({
      cookie: true,
    })

    server.addGlobalMiddleware(
      morgan('short'),
      cookieParser(),
      express.json(),
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
      }),
      cors({
        origin: process.env.ORIGIN,
        credentials: true,
      }),
      passport.initialize(),
      passport.session()
    )

    if (process.env.NODE_ENV === 'prod') {
      server.addGlobalMiddleware(csrf, (req, res, next) => {
        const csrfToken = req.csrfToken()
        res.cookie('csrf-token', csrfToken)
        next()
      })
    }

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
        async (_: string, profile: SteamProfile, done: any) => {
          const user = await userService.createOrUpdate(
            CreateUserDto.from(profile)
          )

          done(null, user)
        }
      )
    )

    await addControllers('/api/v1')

    server.handleGlobalExceptions((err, req, res, next) => {
      if (err instanceof NotAuthenticatedException) {
        return res.status(err.code).json({
          error: err.message,
        })
      }

      if (err instanceof InputValidationException) {
        return res.status(err.code).json({
          error: err.errors,
        })
      } else if (err instanceof BadRequestException) {
        return res.status(err.code).json({
          error: err.message,
        })
      }

      return res.status(500).json({
        error: err.message,
      })
    })

    await prisma.connect()

    server.run(5000)
  }
}
