import { IStrategy } from '@cohdex/shared'
import { IGameData, ITacticalMapOptions } from './types'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { GameData } from './game-data'
import { AssetLoader } from './loaders/asset.loader'

export class TacticalMap {
  private readonly _renderer: Renderer
  private readonly _strategy: IStrategy
  private readonly _gameData: IGameData
  private readonly _assetLoader: AssetLoader

  constructor(options: ITacticalMapOptions) {
    this._strategy = options.strategy
    this._renderer = new Renderer(options.rendererOptions)
    this._gameData = new GameData(this._renderer)

    this._assetLoader = new AssetLoader(
      this._strategy.Map.url,
      AssetLoader.toAssetsToLoad(
        this._strategy.Map.pointPositions,
        options.basePath
      )
    )
  }

  async start() {
    const { height: mapHeight, width: mapWidth, url } = this._strategy.Map

    // Load all required assets for strategy
    await this._assetLoader.setup()

    // TODO: Move to World.ts
    const img = this._assetLoader.getImage(AssetLoader.urlToFileName(url))

    // TODO: Move to renderer
    const { scaleX, scaleY } = this.calculateScale(mapHeight, mapWidth)

    // TODO: Rename and move renderer
    const CANVAS_HEIGHT = mapHeight * scaleY
    const CANVAS_WIDTH = mapWidth * scaleX

    // Should be abstracted to World.ts
    this._renderer.drawImage(img, CANVAS_WIDTH, CANVAS_HEIGHT)

    // TODO: Should become capturableEntities
    const points = this._strategy.Map.pointPositions

    // TODO: Should be moved to World.ts
    const RATIO_SCALE = this.isSquare(mapHeight, mapWidth)
      ? 0
      : mapHeight / this._renderer.height + 0.05

    // TODO: Becomes entities and should be rendered in the render loop
    for (const point of points) {
      // TODO: Abstract to it's own method inside renderer
      const x = point.x * (scaleX - RATIO_SCALE)
      const y = point.y * scaleY

      // TODO: Size goes in an entity
      // TODO: Renderer should do * scaleX
      const SIZE = 15 * scaleX

      // TODO: Belongs in renderer
      const CENTER = CANVAS_HEIGHT / 2 - SIZE / 2

      // TODO: Move to renderer
      const flip = (pos: number) => (pos < 0 ? Math.abs(pos) : 0 - pos)

      // TODO: Create an assets loader
      // const img = await ImageUtil.loadAsyncImage(
      //   `${process.env.REACT_APP_BASE_URL}/public/${point.fileName}.png`
      // )

      // TODO: We are storing the assets by url and not by key therefore we need to prefix it with the base url
      const img = this._assetLoader.getImage(point.fileName)

      // TODO: Create an assets loader
      this._renderer.drawImage(
        img,
        SIZE,
        SIZE,
        new Vec2(x + CENTER, flip(y) + CENTER)
      )
    }
  }

  /**
   * How much should it scale width and height of the original image
   * to fit the canvas
   */
  // TODO: Move to renderer and give proper name
  private calculateScale(mapHeight: number, mapWidth: number) {
    return {
      scaleX: this._renderer.width / mapWidth,
      scaleY: this._renderer.height / mapHeight,
    }
  }

  /**
   * Check if it's a 1:1 ratio, in that case we don't need to worry
   * about scaling issues.
   */
  // TODO: Move to renderer and give proper name
  private isSquare(mapHeight: number, mapWidth: number) {
    return mapHeight === mapWidth
  }
}
