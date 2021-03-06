import React, { FunctionComponent, ReactNode } from 'react'
import {
  IFaction,
  IGetAllUserStrategies,
  IMap,
  IStrategy,
  IUser,
} from '@cohdex/shared'
import { RouteComponentProps } from 'react-router-dom'
import { StrategyService } from './services/StrategyService'
import { InteractiveUnit } from './models/InteractiveUnit'

export interface IAuthState {
  isLoading: boolean
  user: IUser | null
}

export type StrategyLoadingType =
  | 'init'
  | 'idle'
  | 'adding-unit'
  | 'updating-spawnpoint'

export interface IStrategySliceState {
  status: StrategyLoadingType
  data: IStrategy
}

export interface IStrategiesState {
  id: number | null
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

export interface IRendererOptions {
  canvas: HTMLCanvasElement
  height: number
  width: number
}

export interface ITacticalMapOptions {
  strategy: IStrategy
  rendererOptions: IRendererOptions
}

export type Display = 'circle' | 'rectangle'

export interface IAppContext {
  strategyService: StrategyService
}

export type GameState = {
  units: InteractiveUnit[]
  spawnpoint: null | number
  strategyData: IStrategy | null
}

export type Tick = number
