import {
  User,
  Map,
  Faction,
  Strategy,
  StrategyUnits,
  Unit,
  Command,
} from '@prisma/client'
import { Visibility } from '.'
export { Visibility } from '@prisma/client'

export interface BaseHttpResponse<T, U = string> {
  data: T
  error: U
}

export interface IUser
  extends Pick<
    User,
    'id' | 'avatar' | 'profileUrl' | 'displayName' | 'hasConfirmedDisplayName'
  > {}
export interface IMap extends Pick<Map, 'id' | 'name'> {}
export interface IUnit extends Unit {}

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
  extends Omit<
    Strategy,
    'id' | 'slug' | 'createdAt' | 'updatedAt' | 'spawnPoint' | 'visibility'
  > {}

export interface ICreateStrategyUnitDto extends Omit<StrategyUnits, 'id'> {}

export interface ICreateStrategyUnitResponseDto {
  strategyUnit: {
    id: number
  }
}

export interface ICreateStrategyResponseDto {
  strategy: Pick<Strategy, 'slug' | 'id'>
}

export interface ICreateUserDto {
  displayName: string
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
  spawnPoint: number | null
  visibility: Visibility
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
  userId: number
  title: string
  spawnPoint: number | null
  visibility: Visibility
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
  StrategyUnits: IStrategyUnit[]
  units: IUnit[]
  User: {
    displayName: string
  }
}

export interface IStrategyUnit {
  id: number
  colour: string
  unit: IUnitWithCommands
}

export interface IUnitWithCommands extends Unit {
  commands: ICommand[]
}

export interface ICommand extends Command {}

export interface IStrategyMap {
  name: string
  height: number
  width: number
  url: string
  pointPositions: IPointPosition[]
}

export interface IPointPosition {
  id: number
  x: number
  y: number
  ownerId: number
  fileName: string
  mapId: number
  url: string
}

export interface IGetStrategyResponseDto {
  strategy: IStrategy
}

export interface IRemoveUnitFromStrategyDto {
  id: number
}

export interface IAddCommandToStrategyUnitDto
  extends Omit<Command, 'createdAt' | 'updatedAt' | 'id' | 'userId'> {}

export interface IRemoveCommandFromStrategyUnit {
  id: number
}

export interface IAddCommandToStrategyUnitResponseDto {
  command: {
    id: number
    createdAt: Date
    updatedAt: Date
  }
}

export interface IChooseSpawnpointDto {
  /**
   * Either 1 or 2
   */
  spawnpoint: number
}

export interface IUpdateStrategyUnitColourDto {
  colour: string
}

export interface IGetStrategyDto {
  id: number
  slug: string
}

export interface IUpdateStrategyVisibilityDto {
  visibility: Visibility
  strategyId: number
}

export interface IConfirmUserDisplayNameDto {
  displayName: string
}
