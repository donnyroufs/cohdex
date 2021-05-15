import { AddToContext, KondahPlugin } from '@kondah/core'
import { PrismaClient } from '@prisma/client'

export class PrismaPlugin extends KondahPlugin {
  name = 'prisma-plugin'
  private _prismaClient: PrismaClient

  protected setup(): void | Promise<void> {
    this._prismaClient = new PrismaClient()
  }

  @AddToContext()
  getPrisma() {
    return this._prismaClient
  }
}
