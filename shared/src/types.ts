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

export interface IGetAllUserStrategiesResponseDto {
  strategies: IGetAllUserStrategies[]
}

export interface IGetAllUserStrategies {
  id: number
  slug: string
  title: string
  Map: {
    name: string
  }
  AxisFaction: {
    name: string
    abbreviation: string
  }
  AlliedFaction: {
    name: string
    abbreviation: string
  }
  Faction: {
    name: string
    abbreviation: string
  }
}

export interface IStrategy {
  id: number
  factionId: number
  AxisFaction: {
    id: number
    name: string
    abbreviation: string
  }
  AlliedFaction: {
    id: number
    name: string
    abbreviation: string
  }
  Map: IStrategyMap
}

export interface IStrategyMap {
  name: string
  height: number
  width: number
  url: string
  pointPositions: Array<{
    id: number
    x: number
    y: number
    ownerId: number
    fileName: string
    mapId: number
    url: string
  }>
}

export interface IGetStrategyResponseDto {
  strategy: IStrategy
}
