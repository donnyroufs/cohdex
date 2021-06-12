import { IStrategy, IStrategyMap, IStrategyUnit } from '@cohdex/shared'
import { AssetLoader } from './loaders/asset.loader'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { SceneContext } from './scene.context'
import { SceneHandler } from './scene.handler'
import { Scene } from './scenes/scene'

export type GameState = {
  units: IStrategyUnit[]
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
  name: string
  height: number
  width: number
  pos: Vec2
  // Should maybe be a string? e.g. path
  image: HTMLImageElement
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
}

export interface IGameSceneContext extends SceneContext {
  map: IStrategyMap
}
