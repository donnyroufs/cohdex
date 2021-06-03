import { IStrategy} from '@cohdex/shared'

export interface IRendererOptions {
  canvas: HTMLCanvasElement
  height: number
  width: number
}

export interface ITacticalMapOptions {
  strategy: IStrategy
  rendererOptions: IRendererOptions
}
