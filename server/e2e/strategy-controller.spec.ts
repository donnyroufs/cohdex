import { HttpControllerPlugin } from '@kondah/http-controller'
import { AppConfig } from '../src/app.config'
import { Application, API_VERSION } from '../src/application'
import { PrismaService } from '../src/services/prisma.service'
import * as Seeders from '../prisma/seed.utils'
import { AppContext, ILogger } from '@kondah/core'
import supertest, { SuperTest } from 'supertest'
import { StrategyService } from '../src/services/strategy.service'
import { BaseHttpResponse } from '../src/lib/base-http-response'
import {
  ICreateStrategyResponseDto,
  IGetFactionsResponseDto,
  IGetMapsResponseDto,
} from '@cohdex/shared'
import { CreateStrategyDto } from '../src/dtos'
import {
  AfterAll,
  AfterEach,
  BeforeAll,
  BeforeEach,
  Describe,
  Test,
} from '@jest-decorated/core'

const PREFIX = '/api/v' + API_VERSION

@Describe()
class StrategyController {
  app = new Application({
    config: AppConfig,
    mode: 'boot',
    logger: {
      error: (msg) => msg,
      info: (msg) => msg,
      success: (msg) => msg,
      warning: (msg) => msg,
    } as ILogger,
    plugins: [HttpControllerPlugin],
    disableServer: true,
  })

  context: AppContext
  request: SuperTest<any>
  prisma: PrismaService

  @BeforeAll()
  async Setup() {
    this.context = this.app.getContext()
    this.request = supertest(this.context.server.getRawServer())
    this.prisma = this.context.energizor.get(PrismaService)

    this.context.server.addGlobalMiddleware((req, res, next) => {
      req.user = { id: 1 }
      next()
    })

    await this.prisma.connect()
  }

  @BeforeEach()
  async Seed() {
    await this.prisma.user.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        id: 1,
        avatar: '/',
        profileUrl: '/',
        steamId: '/',
      },
    })

    await Seeders.seedFactions(this.prisma)
    await Seeders.seedUnits(this.prisma)
    await Seeders.seedMaps(this.prisma)
  }

  @AfterEach()
  async Cleanup() {
    await this.prisma.pointPosition.deleteMany({})
    await this.prisma.strategyUnits.deleteMany({})
    await this.prisma.strategy.deleteMany({})
    await this.prisma.user.deleteMany({})
    await this.prisma.unit.deleteMany({})
    await this.prisma.faction.deleteMany({})
    await this.prisma.map.deleteMany({})
  }

  @AfterAll()
  async WhenDone() {
    await this.prisma.$disconnect()
  }

  @Test()
  async ReturnAllFactions() {
    const service = this.context.energizor.get(StrategyService)
    const factions = await service.getAllFactions()

    const res = await this.request.get(PREFIX + '/strategies/factions')

    expect(res.body).toEqual(
      new BaseHttpResponse<IGetFactionsResponseDto>({
        factions,
      })
    )
  }

  @Test()
  async ReturnAllMaps() {
    const service = this.context.energizor.get(StrategyService)
    const maps = await service.getAllMaps()

    const res = await this.request.get(PREFIX + '/strategies/maps')

    expect(res.body).toEqual(
      new BaseHttpResponse<IGetMapsResponseDto>({
        maps,
      })
    )
  }

  @Test()
  async CreateAStrategy() {
    const dto = new CreateStrategyDto({
      alliedFactionId: 3,
      axisFactionId: 1,
      factionId: 1,
      mapId: 1,
      title: 'some awesome title',
      userId: 1,
    })

    const res = await this.request.post(PREFIX + '/strategies').send(dto)

    expect(res.body).toEqual(
      new BaseHttpResponse<ICreateStrategyResponseDto>({
        strategy: {
          slug: 'some-awesome-title',
        },
      })
    )
  }
}
