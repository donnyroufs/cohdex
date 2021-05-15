import { AppContext, Injectable } from '@kondah/core'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly _appContext: AppContext) {
    super()
  }

  async connect() {
    try {
      await this.$connect()
      this._appContext.logger.info('properly initialized', 'PRISMA')
    } catch (err) {
      this._appContext.logger.error('failed to initialize', 'PRISMA')
    }
  }
}
