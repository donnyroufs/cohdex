import { User } from '@prisma/client'

export interface IUser extends Pick<User, 'id' | 'avatar' | 'profileUrl'> {}

export interface IGetMeResponseDto {
  user: IUser
}

export interface BaseHttpResponse<T, U = string> {
  data: T
  error: U
}
