import { IStrategyMap } from '@cohdex/shared'
import { PointPositionEntity } from './entities'
import { BaseEntity } from './entities/base-entity'
import { AssetLoader } from './loaders/asset.loader'
import { Vec2 } from './math/vec2.math'
import { IRendererOptions } from './types'

export class Renderer {
  public scale = 1
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

  clearCanvas() {
    this.context.clearRect(
      this.getTopLeftPos().getDistance(new Vec2(0, 0)),
      this.width,
      this.width,
      this.height
    )
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

  // TODO: Refactor
  public drawEntity(entity: PointPositionEntity, assetLoader?: AssetLoader) {
    const { x, y } = this.getEntityPosToScreen(entity)

    this.context.drawImage(
      assetLoader!.getImage(entity.imageUrl),
      x,
      y,
      entity.width * this.scale,
      entity.height * this.scale
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

  public getEntityPosToScreen(entity: BaseEntity) {
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

  public bindMouseEvent(event: string, callback: (pos: Vec2) => void) {
    this.context.canvas.addEventListener(event, (e: any) => {
      const pos = this.getMousePos(this.context.canvas, e)
      callback(pos)
    })
  }

  public drawCollisionBox(entity: BaseEntity) {
    const { x, y } = this.getEntityPosToScreen(entity)
    this.context.strokeRect(
      x,
      y,
      entity.size * this.scale,
      entity.size * this.scale
    )
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

    return new Vec2(
      (e.clientX - rect.left - this.width / 2) / this.scale,
      (e.clientY - rect.top - this.height / 2) / this.scale
    )
  }
}
