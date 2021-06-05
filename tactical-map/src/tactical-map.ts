import { IStrategy } from '@cohdex/shared'
import { IGameData, ITacticalMapOptions } from './types'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { GameData } from './game-data'
import { AssetLoader } from './loaders/asset.loader'
import { BaseEntity } from './entities/base-entity'
import { BASE_ENTITY_SIZE } from './constants'
import { World } from './world'
// import { DebugUtil } from './utils/debug.util'
import { PointPosition } from './entities/point-position.entity'

// const dbug = new DebugUtil()

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
    this._renderer.bindMouseEvent((pos) => {
      const collidedEntity = this._entities.some(
        (entity) => entity.pos.getDistance(pos) <= entity.size / 2
      )

      if (collidedEntity) {
        document.body.style.cursor = 'pointer'
        return
      }

      document.body.style.cursor = 'default'
    })
    this.setupEntities()
    this.draw()
  }

  private draw() {
    this._world.draw(this._gameData)
    this._entities.forEach((entity) => entity.draw(this._gameData))
  }

  private setupEntities() {
    this._strategy.Map.pointPositions.forEach((point, index) => {
      this._entities.push(
        new PointPosition({
          name: point.fileName,
          height: BASE_ENTITY_SIZE,
          width: BASE_ENTITY_SIZE,
          image: this._assetLoader.getImage(point.fileName),
          pos: new Vec2(point.x, point.y),
        })
      )
    })
  }
}
