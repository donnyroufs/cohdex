import { IStrategy } from '@cohdex/shared'
import { ITacticalMapOptions } from './types'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { ImageUtil } from './utils/image.util'

export class TacticalMap {
  private readonly _renderer: Renderer
  private readonly _strategy: IStrategy

  constructor(options: ITacticalMapOptions) {
    this._strategy = options.strategy
    this._renderer = new Renderer(options.rendererOptions)
  }

  async start() {
    const { height: mapHeight, width: mapWidth, url } = this._strategy.Map

    const img = await ImageUtil.loadAsyncImage(url.replace('tga', 'png'))

    const { scaleX, scaleY } = this.calculateScale(mapHeight, mapWidth)

    // mhm? scaled size?
    const CANVAS_HEIGHT = mapHeight * scaleY
    const CANVAS_WIDTH = mapWidth * scaleX

    this._renderer.drawImage(img, CANVAS_WIDTH, CANVAS_HEIGHT)

    const points = this._strategy.Map.pointPositions

    const RATIO_SCALE = this.isSquare(mapHeight, mapWidth)
      ? 0
      : mapHeight / this._renderer.height + 0.05

    for (const point of points) {
      const x = point.x * (scaleX - RATIO_SCALE)
      const y = point.y * scaleY

      const SIZE = 15 * scaleX

      const CENTER = CANVAS_HEIGHT / 2 - SIZE / 2

      const flip = (pos: number) => (pos < 0 ? Math.abs(pos) : 0 - pos)

      const img = await ImageUtil.loadAsyncImage(
        `${process.env.REACT_APP_BASE_URL}/public/${point.fileName}.png`
      )

      this._renderer.drawImage(
        img,
        SIZE,
        SIZE,
        new Vec2(x + CENTER, flip(y) + CENTER)
      )
    }
  }

  private calculateScale(mapHeight: number, mapWidth: number) {
    return {
      scaleX: this._renderer.width / mapWidth,
      scaleY: this._renderer.height / mapHeight,
    }
  }

  private isSquare(mapHeight: number, mapWidth: number) {
    return mapHeight === mapWidth
  }
}
