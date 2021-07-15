import { HttpControllerPlugin } from '@kondah/http-controller'
import { AppConfig } from '../src/app.config'
import { Application, API_VERSION } from '../src/application'
import { PrismaService } from '../src/services/prisma.service'
import * as Fixtures from '../prisma/seed.utils'
import { AppContext, ILogger } from '@kondah/core'
import supertest, { SuperTest, Test as SuperTestType } from 'supertest'
import { StrategyService } from '../src/services/strategy.service'
import { BaseHttpResponse } from '../src/lib/base-http-response'
import {
  IAddCommandToStrategyUnitDto,
  IChooseSpawnpointDto,
  ICreateStrategyResponseDto,
  ICreateStrategyUnitDto,
  IGetFactionsResponseDto,
  IGetMapsResponseDto,
  IRemoveUnitFromStrategyDto,
  IUpdateStrategyUnitColourDto,
} from '@cohdex/shared'
import { CreateStrategyDto } from '../src/dtos'
import {
  AfterAll,
  BeforeAll,
  BeforeEach,
  Describe,
  Test,
} from '@jest-decorated/core'

const PREFIX = '/api/v' + API_VERSION

@Describe()
export class StrategyController {
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
  request: SuperTest<SuperTestType>
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

    await Fixtures.seedFactions(this.prisma)
    await Fixtures.seedUnits(this.prisma)
    await Fixtures.seedMaps(this.prisma)

    const _unit = await this.prisma.unit.findFirst()
    const _map = await this.prisma.map.findFirst()

    await this.prisma.strategy.create({
      data: {
        title: 'my first strategy',
        slug: 'my-first-strategy',
        factionId: 1,
        mapId: _map!.id,
        userId: 1,
        axisFactionId: 1,
        alliedFactionId: 1,
        spawnPoint: 1,
        StrategyUnits: {
          create: {
            unitId: _unit!.id,
          },
        },
      },
    })
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
    expect(res.body.data.strategy.slug).toBe('some-awesome-title')
  }

  @Test()
  async AddUnitToStrategy() {
    const strategy = await this.prisma.strategy.findFirst()
    const unit = await this.prisma.unit.findFirst()

    if (!strategy || !unit) {
      return
    }

    const dto: ICreateStrategyUnitDto = {
      colour: 'green',
      strategyId: strategy.id,
      unitId: unit.id,
    }

    const res = await this.request.post(PREFIX + `/strategies/unit`).send(dto)

    expect(res.status).toBe(200)
    expect(res.body.data).toBeDefined()
  }

  @Test()
  async RemoveUnitFromStrategy() {
    const strategyUnit = await this.prisma.strategyUnits.findFirst()

    const dto: IRemoveUnitFromStrategyDto = {
      id: strategyUnit!.id,
    }

    const res = await this.request
      .delete(PREFIX + `/strategies/unit/${strategyUnit!.id}`)
      .send(dto)

    expect(res.status).toBe(204)
  }

  @Test()
  async UpdateStrategyUnitColour() {
    const strategyUnit = await this.prisma.strategyUnits.findFirst()

    const dto: IUpdateStrategyUnitColourDto = {
      colour: 'purple',
    }

    const res = await this.request
      .patch(PREFIX + `/strategies/unit/${strategyUnit!.id}/colour`)
      .send(dto)

    expect(res.status).toBe(204)
  }

  // @Patch('/:strategyId/spawnpoint')
  @Test()
  async SetsTheSpawnPointForStrategy() {
    const strategy = await this.prisma.strategy.findFirst()

    if (!strategy) return

    const dto: IChooseSpawnpointDto = {
      spawnpoint: 1,
    }

    const res = await this.request
      .patch(PREFIX + `/strategies/${strategy.id}/spawnpoint`)
      .send(dto)

    expect(res.status).toBe(204)
  }

  @Test()
  async AddACommandToAStrategyUnit() {
    const strategyUnit = await this.prisma.strategyUnits.findFirst()

    if (!strategyUnit) return

    const dto: IAddCommandToStrategyUnitDto = {
      description: '',
      strategyUnitsId: strategyUnit.id,
      targetX: 0,
      targetY: 0,
      type: 'CAPTURE',
    }

    const res = await this.request
      .post(PREFIX + `/strategies/command`)
      .send(dto)

    expect(res.status).toBe(200)
    expect(res.body.data).toBeDefined()
  }

  @Test()
  async RemoveCommand() {
    const command = await this.prisma.command.findFirst()

    if (!command) return

    const res = await this.request.delete(
      PREFIX + `/strategies/command/${command.id}`
    )

    expect(res.status).toBe(204)
  }

  @Test()
  async GetSingleUserStrategy() {
    const strategy = await this.prisma.strategy.findFirst()

    if (!strategy) return

    const res = await this.request.get(
      PREFIX + `/strategies/${strategy.id}/${strategy.slug}`
    )

    expect(res.status).toBe(200)
    expect(res.body.data).toBeDefined()
  }

  @AfterAll()
  async WhenDone() {
    await this.prisma.command.deleteMany({})
    await this.prisma.pointPosition.deleteMany({})
    await this.prisma.strategyUnits.deleteMany({})
    await this.prisma.strategy.deleteMany({})
    await this.prisma.user.deleteMany({})
    await this.prisma.unit.deleteMany({})
    await this.prisma.faction.deleteMany({})
    await this.prisma.map.deleteMany({})

    await this.prisma.$disconnect()
  }
}
