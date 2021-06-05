import { IStrategy } from '@cohdex/shared'
import { AssetLoader } from './loaders/asset.loader'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'

export interface IRendererOptions {
  canvas: HTMLCanvasElement
  size: number
}

export interface ITacticalMapOptions {
  strategy: IStrategy
  rendererOptions: IRendererOptions
  basePath: string
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
