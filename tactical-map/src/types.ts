import {
  ICommand,
  IStrategy,
  IStrategyMap,
  IStrategyUnit,
} from '@cohdex/shared'
import { BaseEntity } from './entities/base-entity'
import { UnitEntity } from './entities/unit.entity'
import { AssetLoader } from './loaders/asset.loader'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { SceneContext } from './scene.context'
import { SceneHandler } from './scene.handler'
import { Scene } from './scenes/scene'

export type GameState = {
  entities: BaseEntity[]
  spawnpoint: number | null
  [key: string]: unknown
}

export interface IRendererOptions {
  canvas: HTMLCanvasElement
  size: number
}

export type SyncStateHandlerFn = (
  prop: string,
  value: any,
  state: GameState
) => void

export interface ITacticalMapOptions {
  strategy: IStrategy
  rendererOptions: IRendererOptions
  basePath: string
  syncStateHandler: SyncStateHandlerFn
}

export interface IBaseEntityProps {
  id: number
  name: string
  height: number
  width: number
  pos: Vec2
}

export interface IPointPositionEntity extends IBaseEntityProps {
  imageUrl: string
  image: HTMLImageElement
}

export interface IUnitEntityProps extends IBaseEntityProps {
  imageUrl: string
}

export interface IGameData {
  renderer: Renderer
  assetLoader: AssetLoader
}

export type NewableScene = new (sceneHandler: SceneHandler) => Scene

export interface IPreloadSetupProps {
  renderer: Renderer
  assetLoader: AssetLoader
  strategy: IStrategy
  basePath: string
  gameState: GameState
}

export interface IGameSceneContext extends SceneContext {
  map: IStrategyMap
  gameState: GameState
  units: IStrategyUnit[]
}

export interface IUnitEntityProps extends IBaseEntityProps {
  id: number
  cappingSpeed: number
  imageUrl: string
  movementSpeed: number
  isActive: boolean
  commands: ICommand[]
}

export type Tick = number
