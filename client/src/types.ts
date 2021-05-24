import React, { FunctionComponent, ReactNode } from 'react'
import { IFaction, IMap, IUser } from '@cohdex/shared'
import { RouteComponentProps } from 'react-router-dom'

export interface IAuthState {
  isLoading: boolean
  user: IUser | null
}

export interface IStrategiesState {
  isLoading: boolean
  maps: IMap[]
  factions: IFaction[]
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
  alliesFactionId?: Identifier
  axisFactionId?: Identifier
  factionId?: Identifier
  mapId?: Identifier
}
