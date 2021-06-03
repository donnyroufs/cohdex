import { IStrategyMap } from '@cohdex/shared'
import { AssetLoader } from './loaders/asset.loader'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { IGameData } from './types'

export class World {
  public scale: number
  private _fileName: string

  get height() {
    return this._map.height
  }

  get width() {
    return this._map.width
  }

  constructor(
    private readonly _map: IStrategyMap,
    private readonly _renderer: Renderer
  ) {
    this._fileName = AssetLoader.urlToFileName(_map.url)
  }

  setup() {
    const magicNumberThatFixesAlignment = 0.05
    this.scale = this.isSquare(this._map.height, this._map.width)
      ? 0
      : this._map.height / this._renderer.height + magicNumberThatFixesAlignment
  }

  draw(gameData: IGameData) {
    const img = gameData.assetLoader.getImage(this._fileName)
    gameData.renderer.drawImage(
      img,
      this.getScreenHeight(),
      this.getScreenWidth()
    )
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
    return this.width * this.getScaleX()
  }

  /**
   * Rendered size based on scaleY
   */
  getScreenHeight() {
    return this.height * this.getScaleY()
  }

  /**
   * How much should it scale the width of the original image
   * to fit the canvas
   */
  getScaleX() {
    return this._renderer.width / this.width
  }

  /**
   * How much should it scale height of the original image
   * to fit the canvas
   */
  getScaleY() {
    return this._renderer.height / this.height
  }

  /**
   * Check if it's a 1:1 ratio, in that case we don't need to worry
   * about scaling issues.
   */
  private isSquare(mapHeight: number, mapWidth: number) {
    return mapHeight === mapWidth
  }
}
