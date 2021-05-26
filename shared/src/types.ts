import { User, Map, Faction, Strategy } from '@prisma/client'

export interface BaseHttpResponse<T, U = string> {
  data: T
  error: U
}

export interface IUser extends Pick<User, 'id' | 'avatar' | 'profileUrl'> {}
export interface IMap extends Pick<Map, 'id' | 'name'> {}
export interface IFaction
  extends Pick<Faction, 'id' | 'name' | 'abbreviation' | 'team' | 'imgUrl'> {}

export interface IGetMeResponseDto {
  user: IUser
}

export interface IGetMapsResponseDto {
  maps: IMap[]
}

export interface IGetFactionsResponseDto {
  factions: IFaction[]
}

export interface ICreateStrategyDto
  extends Omit<Strategy, 'id' | 'slug' | 'createdAt' | 'updatedAt'> {}

export interface ICreateStrategyResponseDto {
  strategy: Pick<Strategy, 'slug'>
}

export interface ICreateUserDto {
  steamId: string
  avatar: string
  profileUrl: string
}
