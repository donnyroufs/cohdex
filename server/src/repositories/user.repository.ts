import { Injectable } from '@kondah/core'
import { PrismaService } from '../services/prisma.service'
import { ICreateUserDto } from '@cohdex/shared'

@Injectable()
export class UserRepository {
  get user() {
    return this._prismaService.user
  }

  constructor(private readonly _prismaService: PrismaService) {}

  async findOne(id: number) {
    return this.user.findFirst({
      where: {
        id,
      },
    })
  }

  async createOrUpdate(data: ICreateUserDto) {
    return this.user.upsert({
      where: {
        steamId: data.steamId,
      },
      create: {
        avatar: data.avatar,
        profileUrl: data.profileUrl,
        steamId: data.steamId,
      },
      update: {
        profileUrl: data.profileUrl,
      },
      select: {
        id: true,
        avatar: true,
        profileUrl: true,
        steamId: true,
      },
    })
  }
}
