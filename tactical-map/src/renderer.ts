import { IStrategyMap } from '@cohdex/shared'
import { BaseEntity } from './entities/base-entity'
import { Vec2 } from './math/vec2.math'
import { IRendererOptions } from './types'

export class Renderer {
  public scale: number = 1
  private readonly _context: CanvasRenderingContext2D

  get width() {
    return this._context.canvas.width
  }

  get height() {
    return this._context.canvas.height
  }

  constructor(options: IRendererOptions) {
    this._context = options.canvas.getContext('2d')!
    this.setCanvasSize(options.size)
    this.translateCanvasToCenter()
  }

  /**
   * Vec2(0, 0) will be the center of the canvas instead of
   * the top left.
   */
  public translateCanvasToCenter() {
    this._context.translate(this.width / 2, this.height / 2)
  }

  /**
   * Used for rendering the world, that way we don't need to do
   * calculations somewhere else.
   */
  public getTopLeftPos() {
    return new Vec2(-this.width / 2, -this.height / 2)
  }

  public drawUnscaledImage(
    image: HTMLImageElement,
    pos: Vec2,
    w = this.width,
    h = this.height
  ) {
    this._context.drawImage(image, pos.x, pos.y, w, h)
  }

  public drawImage(
    image: HTMLImageElement,
    pos: Vec2,
    w = this.width,
    h = this.height
  ) {
    this._context.drawImage(image, pos.x, pos.y, w * this.scale, h * this.scale)
  }

  public drawEntity(entity: BaseEntity) {
    const { x, y } = this.getPosToScreen(entity)

    this._context.drawImage(
      entity.image,
      x,
      y,
      entity.width * this.scale,
      entity.height * this.scale
    )
  }

  public setCanvasSize(size: number) {
    this._context.canvas.width = size
    this._context.canvas.height = size
  }

  public getPosToScreen(entity: BaseEntity) {
    const x = entity.x * this.scale - entity.size
    const y = entity.y * this.scale - entity.size

    return new Vec2(x, y)
  }

  /**
   * Make sure we know the difference between the world and canvas size
   */
  public calculateAndSetScale(world: IStrategyMap) {
    this.scale = this.calculateScale(world)
  }

  private calculateScale(world: IStrategyMap) {
    const size = Math.max(world.height, world.width)

    if (size === world.height) {
      return this.height / size
    }

    return this.width / size
  }
}
