import { User } from '.prisma/client'
import { PrismaClient } from '.prisma/client'
import { RedisClient } from 'redis'

declare module '@kondah/core' {
  // interface AppContext {}
  // interface IAppConfig {
  // }
}

declare module '@kondah/http-context' {
  interface HttpContext<T = any> {
    data: T
  }
}

export {}
