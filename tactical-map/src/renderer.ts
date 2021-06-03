import { IStrategyMap } from '@cohdex/shared'
import { BaseEntity } from './entities/base-entity'
import { AssetLoader } from './loaders/asset.loader'
import { Vec2 } from './math/vec2.math'

export class Renderer {
  public scale: number
  private readonly _context: CanvasRenderingContext2D
  /**
   * Map name ot grab from the assetLoader
   */
  private _fileName: string

  get height() {
    return this._canvas.height
  }

  get width() {
    return this._canvas.width
  }

  get mapHeight() {
    return this._map.height
  }

  get mapWidth() {
    return this._map.width
  }

  constructor(
    private readonly _map: IStrategyMap,
    private readonly _assetLoader: AssetLoader,
    private readonly _canvas: HTMLCanvasElement,
    height: number,
    width: number
  ) {
    this.setRendererSize(height, width)

    this._context = this._canvas.getContext('2d')!
    this._fileName = AssetLoader.urlToFileName(_map.url)
  }

  setup() {
    const magicNumberThatFixesAlignment = 0.05
    this.scale = this.isSquare()
      ? 0
      : this._map.height / this.height + magicNumberThatFixesAlignment
  }

  /**
   * An entity needs to be be scaled and corrected their position
   * based on the scaled screen size
   */
  drawImageToScreen(
    image: HTMLImageElement,
    height: number,
    width: number,
    pos: Vec2
  ) {
    const size = this.getScaleX()
    // const scaleY = this.getScaleY()
    const center = this.getCenterPositionForEntity(size)
    const { x, y } = this.getWorldToScreenPos(pos)

    this.drawImage(
      image,
      height * size,
      width * size,
      new Vec2(x + center, this.flip(y) + center)
    )
  }
  // new Vec2(x + CENTER, flip(y) + CENTER)

  drawImage(
    image: HTMLImageElement,
    height: number,
    width: number,
    pos = new Vec2(0, 0)
  ) {
    this._context.drawImage(image, pos.x, pos.y, width, height)
  }

  drawMap() {
    const img = this._assetLoader.getImage(this._fileName)
    this.drawImage(img, this.getScreenHeight(), this.getScreenWidth())
  }

  // TODO: take in entity
  getCenterPositionForEntity(size: number) {
    return this.getScreenHeight() / 2 - size / 2
  }

  getWorldToScreenPos({ x, y }: Vec2) {
    const scaleX = this.getScaleX()
    const scaleY = this.getScaleY()

    return new Vec2(x * (scaleX - this.scale), y * scaleY)
  }

  /**
   * Rendered size based on scaleX
   */
  getScreenWidth() {
    return this.mapWidth * this.getScaleX()
  }

  /**
   * Rendered size based on scaleY
   */
  getScreenHeight() {
    return this.mapHeight * this.getScaleY()
  }

  /**
   * How much should it scale the width of the original image
   * to fit the canvas
   */
  getScaleX() {
    return this.width / this.mapWidth
  }

  /**
   * How much should it scale height of the original image
   * to fit the canvas
   */
  getScaleY() {
    return this.height / this.mapHeight
  }

  /**
   * Check if it's a 1:1 ratio, in that case we don't need to worry
   * about scaling issues.
   */
  private isSquare() {
    return this.mapHeight === this.mapWidth
  }

  private setRendererSize(height: number, width: number) {
    this._canvas.height = height
    this._canvas.width = width
  }

  /**
   * Map icons their pos need to be flipped
   */
  private flip(pos: number) {
    return pos < 0 ? Math.abs(pos) : 0 - pos
  }
}
