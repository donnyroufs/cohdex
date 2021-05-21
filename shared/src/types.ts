import { User, Map } from '@prisma/client'

export interface IUser extends Pick<User, 'id' | 'avatar' | 'profileUrl'> {}
export interface IMap extends Pick<Map, 'id' | 'name'> {}

export interface IGetMeResponseDto {
  user: IUser
}

export interface IGetMapsResponseDto {
  maps: IMap[]
}

export interface BaseHttpResponse<T, U = string> {
  data: T
  error: U
}
