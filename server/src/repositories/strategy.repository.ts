import { ICreateStrategyDto } from '@cohdex/shared'
import { Injectable } from '@kondah/core'
import slugify from 'slugify'
import { PrismaService } from '../services/prisma.service'

@Injectable()
export class StrategyRepository {
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
    return this.strategy.findFirst({
      where: {
        userId,
        slug,
      },
      select: {
        id: true,
        factionId: true,
        title: true,
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
      },
    })
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

  async create(data: ICreateStrategyDto) {
    const createdStrategy = await this.strategy.create({
      data: {
        ...data,
        slug: slugify(data.title, {
          lower: true,
        }),
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
}
