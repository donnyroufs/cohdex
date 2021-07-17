import { Injectable } from '@kondah/core'
import { PrismaService } from '../services/prisma.service'
import { ICreateUserDto } from '@cohdex/shared'
import { ConfirmUserDisplayNameDto } from '../dtos'

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
      select: {
        id: true,
        profileUrl: true,
        avatar: true,
        displayName: true,
        hasConfirmedDisplayName: true,
      },
    })
  }

  async confirmUserDisplayName(data: ConfirmUserDisplayNameDto) {
    return this.user.update({
      where: {
        id: data.userId,
      },
      data: {
        displayName: data.displayName,
        hasConfirmedDisplayName: true,
      },
    })
  }

  async createOrUpdate(data: ICreateUserDto) {
    return this.user.upsert({
      where: {
        steamId: data.steamId,
      },
      create: {
        displayName: data.displayName,
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
        displayName: true,
      },
    })
  }

  // Used internally
  async findOneBySteamId(steamId: string) {
    return this.user.findFirst({
      where: {
        steamId,
      },
      select: {
        id: true,
        displayName: true,
      },
    })
  }
}
