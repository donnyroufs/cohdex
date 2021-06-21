import {
  ICreateStrategyDto,
  ICreateStrategyUnitDto,
  IRemoveUnitFromStrategyDto,
} from '@cohdex/shared'
import { Injectable } from '@kondah/core'
import { Unit } from '@prisma/client'
import slugify from 'slugify'
import {
  AddCommandToStrategyUnitDto,
  ChooseSpawnPointDto,
  RemoveCommandFromStrategyUnitDto,
} from '../dtos'
import { PrismaService } from '../services/prisma.service'

@Injectable()
export class StrategyRepository {
  get command() {
    return this._prismaService.command
  }

  get unit() {
    return this._prismaService.unit
  }

  get strategyUnits() {
    return this._prismaService.strategyUnits
  }

  get strategy() {
    return this._prismaService.strategy
  }

  get faction() {
    return this._prismaService.faction
  }

  get map() {
    return this._prismaService.map
  }

  constructor(private readonly _prismaService: PrismaService) {}

  async findOne(userId: number, slug: string) {
    const strategy = await this.strategy.findFirst({
      where: {
        userId,
        slug,
      },
      select: {
        id: true,
        factionId: true,
        title: true,
        spawnPoint: true,
        AxisFaction: {
          select: {
            id: true,
            name: true,
            abbreviation: true,
          },
        },
        AlliedFaction: {
          select: {
            id: true,
            name: true,
            abbreviation: true,
          },
        },
        Map: {
          select: {
            name: true,
            url: true,
            height: true,
            width: true,
            pointPositions: true,
          },
        },
        StrategyUnits: {
          select: {
            id: true,
            unit: true,
            commands: true,
          },
        },
      },
    })

    if (!strategy) {
      return null
    }

    // TODO: Implement with class-transformer
    return {
      ...strategy,
      StrategyUnits: strategy.StrategyUnits.map((unit) => ({
        ...unit,
        unit: {
          ...unit.unit,
          commands: unit.commands,
        },
      })),
    }
  }

  async all(id: number) {
    return this.strategy.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        spawnPoint: true,
        Map: {
          select: {
            name: true,
          },
        },
        AxisFaction: {
          select: {
            name: true,
            abbreviation: true,
          },
        },
        AlliedFaction: {
          select: {
            name: true,
            abbreviation: true,
          },
        },
        Faction: {
          select: {
            name: true,
            abbreviation: true,
          },
        },
      },
    })
  }

  async create(data: ICreateStrategyDto, startingUnit: Unit) {
    const createdStrategy = await this.strategy.create({
      data: {
        ...data,
        slug: slugify(data.title, {
          lower: true,
        }),
        StrategyUnits: {
          create: {
            unitId: startingUnit.id,
          },
        },
      },
      select: {
        slug: true,
      },
    })

    return createdStrategy
  }

  async getAllFactions() {
    return this.faction.findMany({
      select: {
        abbreviation: true,
        id: true,
        imgUrl: true,
        name: true,
        team: true,
      },
    })
  }

  async notUnique(data: ICreateStrategyDto) {
    const result = await this.strategy.findFirst({
      where: {
        ...data,
      },
    })

    return result != null
  }

  async getAllMaps() {
    return this.map.findMany({
      select: {
        id: true,
        name: true,
      },
    })
  }

  // TODO: Add user validation
  async addUnit(data: ICreateStrategyUnitDto) {
    return this.strategyUnits.create({
      data,
      select: {
        id: true,
      },
    })
  }

  async getUnitsByFaction() {
    return this.faction.findMany({
      select: {
        id: true,
        units: true,
      },
    })
  }

  async getFactionByStrategyId(id: number) {
    return this.strategy.findFirst({
      where: {
        id,
      },
      select: {
        Faction: true,
      },
    })
  }

  async getStartingUnitForFactionById(factionId: number) {
    return this.unit.findFirst({
      where: {
        factionId,
        startingUnit: true,
      },
    })
  }

  // TODO: Add user validation
  // TODO: Implement in service / create DTO
  async removeUnitFromStrategy(data: IRemoveUnitFromStrategyDto) {
    await this.strategyUnits.delete({
      where: {
        id: data.id,
      },
    })
  }

  async addCommandToStrategyUnit(data: AddCommandToStrategyUnitDto) {
    return this.command.create({
      data,
      select: {
        id: true,
      },
    })
  }

  // TODO: Implement
  async removeCommandFromStrategyUnit(data: RemoveCommandFromStrategyUnitDto) {
    return !!this.command.delete({ where: { ...data } })
  }

  async chooseSpawnpoint(data: ChooseSpawnPointDto) {
    await this.strategy.update({
      where: {
        id: data.strategyId,
      },
      data: {
        spawnPoint: data.spawnpoint,
      },
    })

    return true
  }
}
