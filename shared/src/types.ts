import { User } from '@prisma/client'

export interface IUser extends Omit<User, 'id'> {}

export interface IGetMeResponseDto {
  data: {
    user: IUser
  }
}
