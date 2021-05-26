import { ICreateUserDto } from '@cohdex/shared'
import { Injectable } from '@kondah/core'
import { UserRepository } from '../repositories/user.repository'

@Injectable()
export class UserService {
  constructor(private readonly _userRepo: UserRepository) {}

  async createOrUpdate(data: ICreateUserDto) {
    return this._userRepo.createOrUpdate(data)
  }
}
