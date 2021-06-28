import { PrismaClient } from '@prisma/client'
import { AppContext, Injectable } from '@kondah/core'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly _appContext: AppContext) {
    super()
  }

  async connect() {
    try {
      await this.$connect()
      this._appContext.logger.info('initialized', 'PRISMA')
    } catch (err) {
      this._appContext.logger.error('could not initialize', 'PRISMA')
    }
  }
}
