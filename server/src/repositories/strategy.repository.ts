import {
  ICreateStrategyDto,
  ICreateStrategyUnitDto,
  IRemoveUnitFromStrategyDto,
} from '@cohdex/shared'
import { Injectable } from '@kondah/core'
import { Unit, Visibility } from '@prisma/client'
import slugify from 'slugify'
import {
  AddCommandToStrategyUnitDto,
  ChooseSpawnPointDto,
  GetOneStrategyDto,
  RemoveCommandFromStrategyUnitDto,
  UpdateStrategyVisibilityDto,
} from '../dtos'
import { UpdateStrategyUnitColourDto } from '../dtos/update-strategy-unit-colour.dto'
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

  async findOne({ slug, id }: GetOneStrategyDto) {
    const strategy = await this.strategy.findFirst({
      where: {
        id,
        slug,
      },
      select: {
        id: true,
        factionId: true,
        title: true,
        spawnPoint: true,
        userId: true,
        visibility: true,
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
            colour: true,
          },
        },
        User: {
          select: {
            displayName: true,
          },
        },
      },
    })

    if (!strategy) {
      return null
    }

    const units = await this.getUnitsByFactionId(strategy.factionId)

    // TODO: Implement with class-transformer
    return {
      ...strategy,
      units,
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
        visibility: true,
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
        id: true,
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
  async removeUnitFromStrategy(data: IRemoveUnitFromStrategyDto) {
    // TODO:
    // if first unit then we cannot delete
    await this.command.deleteMany({
      where: {
        strategyUnitsId: data.id,
      },
    })

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
        updatedAt: true,
        createdAt: true,
      },
    })
  }

  async removeCommandFromStrategyUnit(data: RemoveCommandFromStrategyUnitDto) {
    return this.command.deleteMany({
      where: {
        id: data.id,
        userId: data.userId,
      },
    })
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

  private async getUnitsByFactionId(factionId: number) {
    return this.unit.findMany({
      where: {
        factionId,
      },
    })
  }

  async updateStrategyUnitColour(data: UpdateStrategyUnitColourDto) {
    return this.strategyUnits.update({
      where: {
        id: data.id,
      },
      data: {
        colour: data.colour,
      },
    })
  }

  // Used internally
  async getUnitById(id: number) {
    return this.unit.findUnique({
      where: {
        id,
      },
      select: {
        startingUnit: true,
      },
    })
  }

  async updateStrategyVisibility(data: UpdateStrategyVisibilityDto) {
    await this.strategy.update({
      where: {
        id: data.strategyId,
      },
      data: {
        visibility: data.visibility,
      },
    })

    return true
  }

  async getByUserId(id: number, userId: number) {
    return this.strategy.findFirst({
      where: {
        id,
        userId,
      },
    })
  }

  async getRecentPublicStrategies() {
    return this.strategy.findMany({
      where: {
        visibility: Visibility.PUBLIC,
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
        Faction: {
          select: {
            id: true,
            name: true,
            abbreviation: true,
          },
        },
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
        User: {
          select: {
            displayName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })
  }
}
