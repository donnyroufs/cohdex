import { Injectable } from '@kondah/core'
import slugify from 'slugify'
import { PrismaService } from '../prisma.service'
import { CreateStrategyDto } from '../dtos/create-strategy.dto'

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

  async create(data: CreateStrategyDto) {
    await this.strategy.create({
      data: {
        ...data,
        slug: slugify(data.title, {
          lower: true,
        }),
      },
    })

    return true
  }

  async getAllFactions() {
    return this.faction.findMany({})
  }

  async notUnique(data: CreateStrategyDto) {
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
