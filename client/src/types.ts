import React, { FunctionComponent, ReactNode } from 'react'
import { IFaction, IGetAllUserStrategies, IMap, IUser } from '@cohdex/shared'
import { RouteComponentProps } from 'react-router-dom'

export interface IAuthState {
  isLoading: boolean
  user: IUser | null
}

export interface IStrategiesState {
  status: StrategiesLoadingType
  slug: string | null
  maps: IMap[]
  error: string | null
  factions: IFaction[]
  strategies: IGetAllUserStrategies[]
}

export interface IRoute {
  path: string
  component: FunctionComponent
  withAuth: boolean
  exact: boolean
  layout?: FunctionComponent
}

export type CompoundComponent<T, U = Object> = React.FC<U> & T

export type WithChildren<Props = Record<string, unknown>> = Props & {
  children: ReactNode
}

export interface IAuthRouteProps {
  component: React.FC<RouteComponentProps>
  withAuth: boolean
}

export type Identifier = string | number

export interface IFactionOptions {
  id: Identifier
  imgUrl: string
  alt: FactionTeam
}

export type OnFactionSelectFn = (id: Identifier, team: FactionTeam) => void

export type FactionTeam = 'ALLIES' | 'AXIS'

export interface IStrategiesLocalState {
  title?: string
  alliedFactionId?: Identifier
  axisFactionId?: Identifier
  factionId?: Identifier
  mapId?: Identifier
}

export type MissingFieldsState = Partial<
  keyof Omit<IStrategiesLocalState, 'factionId'>
>

export type StrategiesLoadingType =
  | 'init'
  | 'idle'
  | 'create-strategy'
  | 'loading-strategies'
