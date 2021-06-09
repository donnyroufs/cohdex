import { IStrategyMap } from '@cohdex/shared'
import { BASE_ENTITY_SIZE } from '../constants'
import { BaseEntity } from '../entities/base-entity'
import { PointPosition } from '../entities/point-position.entity'
import { GameData } from '../game-data'
import { AssetLoader } from '../loaders/asset.loader'
import { Vec2 } from '../math/vec2.math'
import { IGameSceneContext } from '../types'
import { World } from '../world'
import { Scene } from './scene'

export class GameScene extends Scene {
  private readonly _entities: BaseEntity[] = []
  private _gameData: GameData
  private _world: World

  setup({
    renderer,
    assetLoader,
    map,
  }: IGameSceneContext): void | Promise<void> {
    this._world = new World(map)
    this._gameData = new GameData(renderer, assetLoader)

    renderer.bindMouseEvent('mousemove', (pos) => {
      const collidedEntity = this._entities.some(
        (entity) => entity.pos.getDistance(pos) <= entity.size / 2
      )

      if (collidedEntity) {
        document.body.style.cursor = 'pointer'
        return
      }

      document.body.style.cursor = 'default'
    })

    this.setupEntities(map, assetLoader)

    this.update()
  }

  update() {
    this._world.draw(this._gameData)
    this._entities.forEach((entity) => entity.draw(this._gameData))

    window.requestAnimationFrame(this.update.bind(this))
  }

  private setupEntities(map: IStrategyMap, assetLoader: AssetLoader) {
    map.pointPositions.forEach((point, index) => {
      this._entities.push(
        new PointPosition({
          name: point.fileName,
          height: BASE_ENTITY_SIZE,
          width: BASE_ENTITY_SIZE,
          image: assetLoader.getImage(point.fileName),
          pos: new Vec2(point.x, point.y),
        })
      )
    })
  }
}
