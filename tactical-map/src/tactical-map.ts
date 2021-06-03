import { IStrategy } from '@cohdex/shared'
import { IGameData, ITacticalMapOptions } from './types'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { GameData } from './game-data'
import { AssetLoader } from './loaders/asset.loader'
import { World } from './world'

export class TacticalMap {
  private readonly _renderer: Renderer
  private readonly _strategy: IStrategy
  private readonly _gameData: IGameData
  private readonly _assetLoader: AssetLoader
  private readonly _world: World

  constructor(options: ITacticalMapOptions) {
    this._strategy = options.strategy
    this._renderer = new Renderer(options.rendererOptions)
    this._assetLoader = new AssetLoader(
      this._strategy.Map.url,
      AssetLoader.toAssetsToLoad(
        this._strategy.Map.pointPositions,
        options.basePath
      )
    )
    this._world = new World(this._strategy.Map, this._renderer)
    this._gameData = new GameData(this._renderer, this._assetLoader)
  }

  async start() {
    // Load all required assets for strategy
    await this._assetLoader.setup()
    this._world.setup()

    // TODO: Rename and move renderer

    this._world.draw(this._gameData)

    // TODO: Should become capturableEntities
    const points = this._strategy.Map.pointPositions

    // TODO: Becomes entities and should be rendered in the render loop
    for (const point of points) {
      const { x, y } = this._world.getWorldToScreenPos(
        new Vec2(point.x, point.y)
      )

      // TODO: Size goes in an entity
      // TODO: Renderer should do * scaleX
      const SIZE = 15 * this._world.getScaleX()

      // TODO: Move to renderer
      const flip = (pos: number) => (pos < 0 ? Math.abs(pos) : 0 - pos)

      const img = this._assetLoader.getImage(point.fileName)

      const CENTER = this._world.getCenterPositionForEntity(SIZE)

      // TODO: Create an assets loader
      this._renderer.drawImage(
        img,
        SIZE,
        SIZE,
        new Vec2(x + CENTER, flip(y) + CENTER)
      )
    }
  }
}
