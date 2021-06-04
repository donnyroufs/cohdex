import { IStrategy } from '@cohdex/shared'
import { IGameData, ITacticalMapOptions } from './types'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { GameData } from './game-data'
import { AssetLoader } from './loaders/asset.loader'
import { BaseEntity } from './entities/base-entity'
import { BASE_ENTITY_SIZE } from './constants'
import { World } from './world'

export class TacticalMap {
  private readonly _strategy: IStrategy
  private readonly _gameData: IGameData
  private readonly _assetLoader: AssetLoader
  private readonly _renderer: Renderer
  private readonly _entities: BaseEntity[] = []
  private readonly _world: World

  constructor(options: ITacticalMapOptions) {
    this._strategy = options.strategy
    this._assetLoader = new AssetLoader(
      {
        fileName: this._strategy.Map.name,
        url: this._strategy.Map.url,
      },
      AssetLoader.toAssetsToLoad(
        this._strategy.Map.pointPositions,
        options.basePath
      )
    )
    this._renderer = new Renderer(options.rendererOptions)
    this._world = new World(this._strategy.Map)
    this._gameData = new GameData(this._renderer, this._assetLoader)
  }

  async start() {
    await this._assetLoader.setup()
    this._renderer.calculateAndSetScale(this._strategy.Map)
    this.setupEntities()
    this.draw()
  }

  private draw() {
    this._world.draw(this._gameData)
    this._entities.forEach((entity) => entity.draw(this._gameData))
  }

  private setupEntities() {
    this._strategy.Map.pointPositions.forEach((point) =>
      this._entities.push(
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
