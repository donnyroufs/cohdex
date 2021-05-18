import { Injectable } from '@kondah/core'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly _userRepo: UserRepository) {}

  async createOrUpdate(data: CreateUserDto) {
    return this._userRepo.createOrUpdate(data)
  }
}
