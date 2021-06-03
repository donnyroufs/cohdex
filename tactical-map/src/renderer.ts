import { IRendererOptions } from './types'
import { Vec2 } from './math/vec2.math'

export class Renderer {
  public readonly context: CanvasRenderingContext2D
  private readonly _canvas: HTMLCanvasElement

  get height() {
    return this._canvas.height
  }

  get width() {
    return this._canvas.width
  }

  constructor(options: IRendererOptions) {
    this._canvas = options.canvas
    this.context = this._canvas.getContext('2d')!
    this.setRendererSize(options.height, options.width)
  }

  drawImage(
    image: HTMLImageElement,
    height: number,
    width: number,
    pos = new Vec2(0, 0)
  ) {
    this.context.drawImage(image, pos.x, pos.y, width, height)
  }

  getScreenSize() {
    return {
      height: this.height,
      width: this.width,
    }
  }

  setRendererSize(height: number, width: number) {
    this._canvas.height = height
    this._canvas.width = width
  }
}
