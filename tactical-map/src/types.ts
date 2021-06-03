import { IMap, IStrategy, IStrategyMap } from '@cohdex/shared'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'

export interface IRendererOptions {
  canvas: HTMLCanvasElement
  height: number
  width: number
}

export interface ITacticalMapOptions {
  strategy: IStrategy
  rendererOptions: IRendererOptions
  basePath: string
}

export interface IBaseEntityProps {
  height: number
  width: number
  pos: Vec2
  // Should maybe be a string? e.g. path
  image: HTMLImageElement
}

export interface IGameData {
  renderer: Renderer
}
