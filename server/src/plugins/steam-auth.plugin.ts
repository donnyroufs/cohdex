import { KondahPlugin } from '@kondah/core'
import { Strategy as SteamStrategy } from 'passport-steam'
import { SteamProfile } from '../types'
import passport from 'passport'
import { PrismaPlugin } from './prisma.plugin'
import { SessionPlugin } from './session.plugin'
import { CorsPlugin } from './cors.plugin'

export class SteamAuthPlugin extends KondahPlugin {
  name = 'steam-auth'
  dependencies = [PrismaPlugin, SessionPlugin, CorsPlugin]

  protected setup(): void | Promise<void> {
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
          const user = await this.appContext.getPrisma().user.upsert({
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

    this.appContext.server.addGlobalMiddleware(passport.initialize())
    this.appContext.server.addGlobalMiddleware(passport.session())
  }
}
