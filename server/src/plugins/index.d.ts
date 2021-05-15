import { PrismaClient } from '.prisma/client'
import { RedisClient } from 'redis'

declare module '@kondah/core' {
  interface AppContext {
    getPrisma(): PrismaClient
    getRedis(): RedisClient
  }
  interface IAppConfig {
    session: {
      secret: string
      name: string
      resave: boolean
      saveUninitialized: boolean
      cookie: {
        maxAge: number
        secure: boolean
        httpOnly: boolean
        sameSite: boolean
      }
    }

    cors: {
      [key: string]: any
    }

    'rest-api': {
      morgan: 'combined' | 'common' | 'dev' | 'short' | 'tiny'
    }
  }
}

export {}
