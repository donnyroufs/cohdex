import { IStrategy } from '@cohdex/shared'
import { IGameData, ITacticalMapOptions } from './types'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { GameData } from './game-data'
import { AssetLoader } from './loaders/asset.loader'
import { BaseEntity } from './entities/base-entity'
import { BASE_ENTITY_SIZE } from './constants'

export class TacticalMap {
  private readonly _strategy: IStrategy
  private readonly _gameData: IGameData
  private readonly _assetLoader: AssetLoader
  private readonly _renderer: Renderer
  private readonly entities: BaseEntity[] = []

  constructor(options: ITacticalMapOptions) {
    this._strategy = options.strategy
    this._assetLoader = new AssetLoader(
      this._strategy.Map.url,
      AssetLoader.toAssetsToLoad(
        this._strategy.Map.pointPositions,
        options.basePath
      )
    )
    this._renderer = new Renderer(
      this._strategy.Map,
      this._assetLoader,
      options.rendererOptions.canvas,
      options.rendererOptions.height,
      options.rendererOptions.width
    )
    this._gameData = new GameData(this._renderer, this._assetLoader)
  }

  async start() {
    await this.loadAsyncData()

    this.setupEntities()

    this._renderer.setup()

    this._renderer.drawMap()
    this.draw()
  }

  private async loadAsyncData() {
    await this._assetLoader.setup()
  }

  private draw() {
    this.entities.forEach((entity) => entity.draw(this._gameData))
  }

  private setupEntities() {
    this._strategy.Map.pointPositions.forEach((point) =>
      this.entities.push(
        new BaseEntity({
          height: BASE_ENTITY_SIZE,
          width: BASE_ENTITY_SIZE,
          image: this._assetLoader.getImage(point.fileName),
          pos: new Vec2(point.x, point.y),
        })
      )
    )
  }
}
