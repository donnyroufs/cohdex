import { IStrategy } from '@cohdex/shared'
import { GameState, IGameData, ITacticalMapOptions } from './types'
import { Vec2 } from './math/vec2.math'
import { Renderer } from './renderer'
import { GameData } from './game-data'
import { AssetLoader } from './loaders/asset.loader'
import { BaseEntity } from './entities/base-entity'
import { BASE_ENTITY_SIZE } from './constants'
import { World } from './world'
// import { DebugUtil } from './utils/debug.util'
import { PointPosition } from './entities/point-position.entity'
import onChange from 'on-change'

// const dbug = new DebugUtil()

export class TacticalMap {
  private _state: GameState
  private _strategy: IStrategy
  private _gameData: IGameData
  private _assetLoader: AssetLoader
  private _renderer: Renderer
  private _entities: BaseEntity[] = []
  private _world: World

  init(options: ITacticalMapOptions) {
    this._state = onChange({ units: [] }, (prop, value) =>
      options.syncStateHandler(prop, value, this._state)
    )
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
    await this.preStart()
    this.update()
  }

  // TODO: Add type
  addUnit(unit: any) {
    this._state.units.push(unit)
  }

  /**
   * Used to do logic outside of TMap
   */
  getGameState() {
    return this._state
  }

  private update() {
    this._world.draw(this._gameData)
    this._entities.forEach((entity) => entity.draw(this._gameData))

    window.requestAnimationFrame(this.update.bind(this))
  }

  private async preStart() {
    await this._assetLoader.setup()
    this._renderer.calculateAndSetScale(this._strategy.Map)
    this._renderer.bindMouseEvent('mousemove', (pos) => {
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
