import { User, Map, Faction } from '@prisma/client'

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

export interface BaseHttpResponse<T, U = string> {
  data: T
  error: U
}

export interface IGetFactionsResponseDto {
  factions: IFaction[]
}

// TOOD: Link with server
export interface ICreateStrategyRequestDto {
  title: string
  alliesFactionId: number
  axisFactionId: number
  factionId: number
  mapId: number
}
