import { IStrategyMap } from '@cohdex/shared'
import { BaseEntity } from './entities/base-entity'
import { Vec2 } from './math/vec2.math'
import { IRendererOptions } from './types'

export class Renderer {
  public scale: number = 1
  public readonly context: CanvasRenderingContext2D

  get width() {
    return this.context.canvas.width
  }

  get height() {
    return this.context.canvas.height
  }

  constructor(options: IRendererOptions) {
    this.context = options.canvas.getContext('2d')!
    this.setCanvasSize(options.size)
    this.translateCanvasToCenter()
  }

  /**
   * Vec2(0, 0) will be the center of the canvas instead of
   * the top left.
   */
  public translateCanvasToCenter() {
    this.context.translate(this.width / 2, this.height / 2)
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
    this.context.drawImage(image, pos.x, pos.y, w, h)
  }

  public drawImage(
    image: HTMLImageElement,
    pos: Vec2,
    w = this.width,
    h = this.height
  ) {
    this.context.drawImage(image, pos.x, pos.y, w * this.scale, h * this.scale)
  }

  public drawEntity(entity: BaseEntity) {
    const { x, y } = this.getEntityPosToScreen(entity)

    this.context.drawImage(
      entity.image,
      x,
      y,
      entity.size * this.scale,
      entity.size * this.scale
    )
  }

  public setCanvasSize(size: number) {
    this.context.canvas.width = size
    this.context.canvas.height = size
  }

  public getPosToScreen(pos: Vec2) {
    const x = pos.x * this.scale
    const y = pos.y * this.scale

    return new Vec2(x, y)
  }

  // TODO: Probably move it all to PointPositionEntity
  public getEntityPosToScreen(entity: BaseEntity) {
    // TODO: Remove offset from here, they should go in the entity (pointPosition entity)
    const x = entity.x * this.scale - entity.size - 2
    const y = entity.y * this.scale - entity.size - 1

    return new Vec2(x, y)
  }

  /**
   * Make sure we know the difference between the world and canvas size
   */
  public calculateAndSetScale(world: IStrategyMap) {
    this.scale = this.calculateScale(world)
  }

  public bindMouseEvent(callback: (pos: Vec2) => void) {
    this.context.canvas.addEventListener('mousemove', (e) => {
      const pos = this.getMousePos(this.context.canvas, e)
      callback(pos)
    })
  }

  private calculateScale(world: IStrategyMap) {
    const size = Math.max(world.height, world.width)

    if (size === world.height) {
      return this.height / size
    }

    return this.width / size
  }

  private getMousePos(canvas: HTMLCanvasElement, e: MouseEvent) {
    const rect = canvas.getBoundingClientRect()

    // TODO: Refactor (dividing this.scale) this is only used for PointPositionEntities(I think?)
    return new Vec2(
      (e.clientX - rect.left - this.width / 2) / this.scale,
      (e.clientY - rect.top - this.height / 2) / this.scale
    )
  }
}
