import { IStrategy } from '@cohdex/shared'
import { AssetLoader } from './loaders/asset.loader'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'

export type GameState = {
  units: any[]
  [key: string]: any
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
