import { ICreateUserDto, IUser } from '@cohdex/shared'
import { Injectable } from '@kondah/core'
import { UserRepository } from '../repositories/user.repository'
import faker from 'faker'
import { ConfirmUserDisplayNameDto } from '../dtos'
import { DisplayNameExistsException } from '../exceptions'

@Injectable()
export class UserService {
  constructor(private readonly _userRepo: UserRepository) {}

  async findUser(id: number) {
    return this._userRepo.findOne(id)
  }

  async confirmUserDisplayName(data: ConfirmUserDisplayNameDto) {
    const updatedUser = await this._userRepo.confirmUserDisplayName(data)

    if (!updatedUser) {
      throw new DisplayNameExistsException()
    }

    return true
  }

  async createOrUpdate(data: ICreateUserDto) {
    const user = (await this._userRepo.findOneBySteamId(data.steamId)) as IUser

    this.preventDuplicateDisplayName(user, data)

    return this._userRepo.createOrUpdate(data)
  }

  private preventDuplicateDisplayName(user: IUser, data: ICreateUserDto) {
    if (user && user.displayName === data.displayName) {
      data.displayName = faker.internet.userName(data.displayName)
    }
  }
}
